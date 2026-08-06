import { UserRole } from '@/lib/features/user/userSlice';
import { apiClient, getErrorMessage } from '@/services/authService';

export interface TeamMember {
    id: string;
    full_name: string;
    email: string;
    role: UserRole;
    created_at?: string | null;
}

export interface TeamMemberCreate {
    full_name: string;
    email: string;
    password: string;
    role: 'admin' | 'editor';
}

export interface TeamMemberUpdate {
    full_name?: string;
    role?: 'admin' | 'editor';
    password?: string;
}

const TEAM_ROLES: readonly UserRole[] = ['admin', 'editor'];

export const isTeamRole = (role: UserRole): role is 'admin' | 'editor' => {
    return TEAM_ROLES.includes(role);
};

export const teamService = {
    listMembers: async (): Promise<TeamMember[]> => {
        try {
            const response = await apiClient.get('/team/members');
            return response.data;
        } catch (error) {
            throw new Error(getErrorMessage(error, 'Failed to load team members.'));
        }
    },

    createMember: async (data: TeamMemberCreate): Promise<TeamMember> => {
        try {
            const response = await apiClient.post('/team/members', data);
            return response.data;
        } catch (error) {
            throw new Error(getErrorMessage(error, 'Failed to invite team member.'));
        }
    },

    updateMember: async (email: string, data: TeamMemberUpdate): Promise<TeamMember> => {
        try {
            const response = await apiClient.patch(`/team/members/${encodeURIComponent(email)}`, data);
            return response.data;
        } catch (error) {
            throw new Error(getErrorMessage(error, 'Failed to update team member.'));
        }
    },

    deleteMember: async (email: string): Promise<void> => {
        try {
            await apiClient.delete(`/team/members/${encodeURIComponent(email)}`);
        } catch (error) {
            throw new Error(getErrorMessage(error, 'Failed to remove team member.'));
        }
    },
};
