import axios from 'axios';
import { UserRole } from '@/lib/features/user/userSlice';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1`;
const TOKEN_KEY = 'nwa_access_token';

export interface AuthUser {
    id: string;
    full_name: string;
    email: string;
    role: UserRole;
    created_at?: string | null;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user: AuthUser;
}

export const getToken = () => {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string) => {
    window.localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
    window.localStorage.removeItem(TOKEN_KEY);
};

export const getErrorMessage = (error: unknown, fallback: string): string => {
    if (axios.isAxiosError(error)) {
        const detail = error.response?.data?.detail;
        if (typeof detail === 'string' && detail) return detail;
    }
    if (error instanceof Error && error.message) return error.message;
    if (error && typeof error === 'object' && 'message' in error) {
        const message = (error as { message?: unknown }).message;
        if (typeof message === 'string' && message) return message;
    }
    return fallback;
};

let unauthorizedHandler: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: (() => void) | null) => {
    unauthorizedHandler = handler;
};

export const handleUnauthorized = () => {
    clearToken();
    unauthorizedHandler?.();
};

export const apiClient = axios.create({ baseURL: API_BASE_URL });

apiClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            const url = error.config?.url || '';
            const isAuthEndpoint =
                url.includes('/auth/login') ||
                url.includes('/auth/register') ||
                url.includes('/auth/google');
            if (!isAuthEndpoint) {
                handleUnauthorized();
            }
        }
        return Promise.reject(error);
    }
);

export const authService = {
    getToken,
    setToken,
    clearToken,

    register: async (fullName: string, email: string, password: string): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/register', {
            full_name: fullName,
            email,
            password,
        });
        return response.data;
    },

    login: async (email: string, password: string): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/login', {
            email,
            password,
        });
        return response.data;
    },

    googleSignIn: async (): Promise<AuthResponse> => {
        const { auth, googleProvider, isFirebaseConfigured } = await import(
            '@/lib/firebase'
        );
        if (!isFirebaseConfigured || !auth || !googleProvider) {
            throw new Error(
                'Google sign-in is not configured yet. Please add Firebase env vars.'
            );
        }
        const { signInWithPopup } = await import('firebase/auth');
        const result = await signInWithPopup(auth, googleProvider);
        const idToken = await result.user.getIdToken();
        const response = await apiClient.post('/auth/google', {
            id_token: idToken,
        });
        return response.data;
    },

    getMe: async (): Promise<AuthUser> => {
        const token = getToken();
        const response = await apiClient.get('/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },
};
