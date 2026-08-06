import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authService, AuthUser, getErrorMessage } from '@/services/authService';

export type UserRole = 'admin' | 'editor' | 'student';
export type StudentLevel = 'Ordinary' | 'Advanced' | null;
export type StudentDepartment = 'Science' | 'Arts' | 'Commercial' | null;
export type AuthStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface UserState {
    role: UserRole;
    isAuthenticated: boolean;
    name: string | null;
    email: string | null;
    level: StudentLevel;
    department: StudentDepartment;
    status: AuthStatus;
    error: string | null;
}

const initialState: UserState = {
    role: 'student',
    isAuthenticated: false,
    name: null,
    email: null,
    level: null,
    department: null,
    status: 'idle',
    error: null,
};

const applyAuth = (state: UserState, user: AuthUser) => {
    state.isAuthenticated = true;
    state.name = user.full_name;
    state.email = user.email;
    state.role = user.role;
    state.status = 'succeeded';
    state.error = null;
};

export const loginUser = createAsyncThunk(
    'user/login',
    async ({ email, password }: { email: string; password: string }) => {
        try {
            const response = await authService.login(email, password);
            authService.setToken(response.access_token);
            return response.user;
        } catch (error) {
            throw new Error(getErrorMessage(error, 'Login failed. Please try again.'));
        }
    }
);

export const registerUser = createAsyncThunk(
    'user/register',
    async ({ fullName, email, password }: { fullName: string; email: string; password: string }) => {
        try {
            const response = await authService.register(fullName, email, password);
            authService.setToken(response.access_token);
            return response.user;
        } catch (error) {
            throw new Error(getErrorMessage(error, 'Registration failed. Please try again.'));
        }
    }
);

export const googleSignInUser = createAsyncThunk('user/googleSignIn', async () => {
    try {
        const response = await authService.googleSignIn();
        authService.setToken(response.access_token);
        return response.user;
    } catch (error) {
        throw new Error(getErrorMessage(error, 'Google sign-in failed. Please try again.'));
    }
});

export const loadUser = createAsyncThunk('user/load', async () => {
    const user = await authService.getMe();
    return user;
});

export const logoutUser = createAsyncThunk('user/logout', async () => {
    authService.clearToken();
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setRole: (state, action: PayloadAction<UserRole>) => {
            state.role = action.payload;
        },
        updateOnboarding: (state, action: PayloadAction<{ level: StudentLevel; department: StudentDepartment }>) => {
            state.level = action.payload.level;
            state.department = action.payload.department;
        },
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        setUserInfo: (state, action: PayloadAction<{ name: string; role: UserRole }>) => {
            state.name = action.payload.name;
            state.role = action.payload.role;
        },
        clearAuthError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                applyAuth(state, action.payload);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Login failed. Please try again.';
            })
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                applyAuth(state, action.payload);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Registration failed. Please try again.';
            })
            .addCase(googleSignInUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(googleSignInUser.fulfilled, (state, action) => {
                applyAuth(state, action.payload);
            })
            .addCase(googleSignInUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Google sign-in failed. Please try again.';
            })
            .addCase(loadUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                applyAuth(state, action.payload);
            })
            .addCase(loadUser.rejected, (state) => {
                authService.clearToken();
                state.isAuthenticated = false;
                state.status = 'idle';
                state.name = null;
                state.email = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.status = 'idle';
                state.error = null;
                state.name = null;
                state.email = null;
                state.role = 'student';
                state.level = null;
                state.department = null;
            });
    },
});

export const { setRole, updateOnboarding, setAuthenticated, setUserInfo, clearAuthError } = userSlice.actions;
export default userSlice.reducer;
