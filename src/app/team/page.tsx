'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAppSelector } from '@/lib/hooks';
import { UserPlus, Users, ShieldCheck, Edit3, Trash2, Mail, Lock, Loader2, X, Save } from 'lucide-react';
import { teamService, TeamMember, TeamMemberCreate } from '@/services/teamService';
import { cn } from '@/lib/utils';

const EMPTY_FORM: TeamMemberCreate = {
    full_name: '',
    email: '',
    password: '',
    role: 'editor',
};

export default function TeamPage() {
    const currentUser = useAppSelector((state) => state.user);
    const isAdmin = currentUser.role === 'admin';
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const [form, setForm] = useState<TeamMemberCreate>(EMPTY_FORM);
    const [isInviting, setIsInviting] = useState(false);
    const [inviteError, setInviteError] = useState('');
    const [inviteSuccess, setInviteSuccess] = useState('');

    const [editing, setEditing] = useState<TeamMember | null>(null);
    const [editFullName, setEditFullName] = useState('');
    const [editRole, setEditRole] = useState<'admin' | 'editor'>('editor');
    const [editPassword, setEditPassword] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [editError, setEditError] = useState('');

    const [deletingEmail, setDeletingEmail] = useState<string | null>(null);

    const loadMembers = useCallback(async () => {
        if (!isAdmin) {
            setIsLoading(false);
            return;
        }
        try {
            setError('');
            const data = await teamService.listMembers();
            setMembers(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load team members.');
        } finally {
            setIsLoading(false);
        }
    }, [isAdmin]);

    useEffect(() => {
        loadMembers();
    }, [loadMembers]);

    if (!isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
                <div className="p-4 bg-primary/10 rounded-full text-primary">
                    <ShieldCheck size={40} />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Admins Only</h2>
                <p className="text-muted-fg text-sm">You don&apos;t have permission to manage the team.</p>
            </div>
        );
    }

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isInviting) return;
        setIsInviting(true);
        setInviteError('');
        setInviteSuccess('');
        try {
            await teamService.createMember(form);
            setInviteSuccess(`Invited ${form.full_name || form.email}. They can now sign in with the password you set.`);
            setForm(EMPTY_FORM);
            await loadMembers();
        } catch (err) {
            setInviteError(err instanceof Error ? err.message : 'Failed to invite team member.');
        } finally {
            setIsInviting(false);
        }
    };

    const openEdit = (member: TeamMember) => {
        setEditing(member);
        setEditFullName(member.full_name);
        setEditRole(member.role === 'admin' ? 'admin' : 'editor');
        setEditPassword('');
        setEditError('');
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editing || isSaving) return;
        setIsSaving(true);
        setEditError('');
        try {
            const updated = await teamService.updateMember(editing.email, {
                full_name: editFullName,
                role: editRole,
                ...(editPassword ? { password: editPassword } : {}),
            });
            setMembers((prev) =>
                prev.map((m) => (m.email === editing.email ? { ...m, ...updated } : m))
            );
            setEditing(null);
        } catch (err) {
            setEditError(err instanceof Error ? err.message : 'Failed to update team member.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (member: TeamMember) => {
        if (deletingEmail) return;
        const confirmed = window.confirm(
            `Remove ${member.full_name} (${member.email}) from the team? Their account will no longer be able to sign in.`
        );
        if (!confirmed) return;
        setDeletingEmail(member.email);
        try {
            await teamService.deleteMember(member.email);
            setMembers((prev) => prev.filter((m) => m.email !== member.email));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to remove team member.');
        } finally {
            setDeletingEmail(null);
        }
    };

    return (
        <div className="w-full space-y-6 animate-fade-in">
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Team</h1>
                <p className="text-xs md:text-sm text-muted-fg mt-1">
                    Invite admins and editors to help manage the platform. Editors can sign in but cannot manage the team.
                </p>
            </div>

            {error && (
                <div className="flex items-center justify-between gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-600 dark:text-red-400">
                    <span>{error}</span>
                    <button onClick={() => setError('')} className="hover:opacity-70">
                        <X size={14} />
                    </button>
                </div>
            )}

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Invite form */}
                <form
                    onSubmit={handleInvite}
                    className="lg:col-span-1 p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow h-fit"
                >
                    <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                            <UserPlus size={16} />
                        </div>
                        <h2 className="font-bold text-sm text-foreground">Invite Team Member</h2>
                    </div>

                    {inviteSuccess && (
                        <div className="mb-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                            {inviteSuccess}
                        </div>
                    )}
                    {inviteError && (
                        <div className="mb-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-[11px] font-medium text-red-600 dark:text-red-400">
                            {inviteError}
                        </div>
                    )}

                    <div className="space-y-3">
                        <div>
                            <label className="text-[11px] font-semibold text-muted-fg block mb-1">Full Name</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Mary Ateh"
                                value={form.full_name}
                                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                                className="w-full px-3 py-2.5 bg-muted border border-border-subtle rounded-xl text-xs font-medium text-foreground placeholder:text-muted-fg outline-none focus:border-primary/40 transition-all"
                            />
                        </div>
                        <div>
                            <label className="text-[11px] font-semibold text-muted-fg block mb-1">Email</label>
                            <div className="relative">
                                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-fg" />
                                <input
                                    type="email"
                                    required
                                    placeholder="name@example.com"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full pl-9 pr-3 py-2.5 bg-muted border border-border-subtle rounded-xl text-xs font-medium text-foreground placeholder:text-muted-fg outline-none focus:border-primary/40 transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-[11px] font-semibold text-muted-fg block mb-1">Password</label>
                            <div className="relative">
                                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-fg" />
                                <input
                                    type="text"
                                    required
                                    minLength={6}
                                    placeholder="Set their sign-in password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="w-full pl-9 pr-3 py-2.5 bg-muted border border-border-subtle rounded-xl text-xs font-medium text-foreground placeholder:text-muted-fg outline-none focus:border-primary/40 transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-[11px] font-semibold text-muted-fg block mb-1">Role</label>
                            <select
                                value={form.role}
                                onChange={(e) => setForm({ ...form, role: e.target.value as 'admin' | 'editor' })}
                                className="w-full px-3 py-2.5 bg-muted border border-border-subtle rounded-xl text-xs font-medium text-foreground outline-none focus:border-primary/40 transition-all"
                            >
                                <option value="editor">Editor</option>
                                <option value="admin">Admin</option>
                            </select>
                            <p className="text-[10px] text-muted-fg mt-1.5">
                                Admins can manage the team; editors get portal access only.
                            </p>
                        </div>
                        <button
                            type="submit"
                            disabled={isInviting}
                            className="w-full py-2.5 bg-primary hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            {isInviting && <Loader2 size={14} className="animate-spin" />}
                            {isInviting ? 'Inviting...' : 'Send Invite'}
                        </button>
                    </div>
                </form>

                {/* Members list */}
                <div className="lg:col-span-2 p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow">
                    <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                            <Users size={16} />
                        </div>
                        <h2 className="font-bold text-sm text-foreground">Team Members</h2>
                        <span className="ml-auto text-[11px] font-semibold text-muted-fg">{members.length}</span>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 size={20} className="animate-spin text-muted-fg" />
                        </div>
                    ) : members.length === 0 ? (
                        <div className="text-center py-12 text-xs text-muted-fg">
                            No team members yet. Invite someone to get started.
                        </div>
                    ) : (
                        <div className="divide-y divide-border-subtle">
                            {members.map((member) => {
                                const isSelf = member.email === currentUser.email;
                                return (
                                    <div
                                        key={member.email}
                                        className="py-3 flex items-center justify-between gap-3 hover:bg-muted/40 transition-colors px-2 rounded-lg"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div
                                                className={cn(
                                                    'w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 text-xs font-bold',
                                                    member.role === 'admin'
                                                        ? 'bg-emerald-600/80'
                                                        : 'bg-primary/70'
                                                )}
                                            >
                                                {member.full_name
                                                    ? member.full_name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
                                                    : member.email.slice(0, 2).toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="font-bold text-xs text-foreground truncate">
                                                    {member.full_name}
                                                    {isSelf && <span className="text-muted-fg font-medium"> (you)</span>}
                                                </div>
                                                <div className="text-[10px] text-muted-fg mt-0.5 truncate">{member.email}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            <span
                                                className={cn(
                                                    'flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full',
                                                    member.role === 'admin'
                                                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                                        : 'bg-primary/10 text-primary border border-primary/20'
                                                )}
                                            >
                                                {member.role === 'admin' && <ShieldCheck size={11} />}
                                                {member.role === 'admin' ? 'Admin' : 'Editor'}
                                            </span>
                                            <button
                                                onClick={() => openEdit(member)}
                                                className="p-2 text-muted-fg hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                title="Edit member"
                                            >
                                                <Edit3 size={15} />
                                            </button>
                                            {!isSelf && (
                                                <button
                                                    onClick={() => handleDelete(member)}
                                                    disabled={deletingEmail === member.email}
                                                    className="p-2 text-muted-fg hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Remove member"
                                                >
                                                    {deletingEmail === member.email ? (
                                                        <Loader2 size={15} className="animate-spin" />
                                                    ) : (
                                                        <Trash2 size={15} />
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Edit modal */}
            {editing && (
                <div
                    className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setEditing(null)}
                >
                    <div
                        className="w-full max-w-md bg-card-bg border border-border-subtle rounded-2xl p-6 card-shadow"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-sm text-foreground">Edit {editing.full_name}</h3>
                            <button onClick={() => setEditing(null)} className="p-1.5 text-muted-fg hover:text-foreground rounded-lg hover:bg-muted">
                                <X size={16} />
                            </button>
                        </div>

                        {editError && (
                            <div className="mb-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-[11px] font-medium text-red-600 dark:text-red-400">
                                {editError}
                            </div>
                        )}

                        <form onSubmit={handleUpdate} className="space-y-3">
                            <div>
                                <label className="text-[11px] font-semibold text-muted-fg block mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={editFullName}
                                    onChange={(e) => setEditFullName(e.target.value)}
                                    className="w-full px-3 py-2.5 bg-muted border border-border-subtle rounded-xl text-xs font-medium text-foreground outline-none focus:border-primary/40 transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-semibold text-muted-fg block mb-1">Role</label>
                                <select
                                    value={editRole}
                                    disabled={editing.email === currentUser.email}
                                    onChange={(e) => setEditRole(e.target.value as 'admin' | 'editor')}
                                    className="w-full px-3 py-2.5 bg-muted border border-border-subtle rounded-xl text-xs font-medium text-foreground outline-none focus:border-primary/40 transition-all disabled:opacity-50"
                                >
                                    <option value="editor">Editor</option>
                                    <option value="admin">Admin</option>
                                </select>
                                {editing.email === currentUser.email && (
                                    <p className="text-[10px] text-muted-fg mt-1">You cannot change your own role.</p>
                                )}
                            </div>
                            <div>
                                <label className="text-[11px] font-semibold text-muted-fg block mb-1">
                                    Reset Password <span className="font-normal">(optional)</span>
                                </label>
                                <input
                                    type="text"
                                    minLength={6}
                                    placeholder="Leave blank to keep current password"
                                    value={editPassword}
                                    onChange={(e) => setEditPassword(e.target.value)}
                                    className="w-full px-3 py-2.5 bg-muted border border-border-subtle rounded-xl text-xs font-medium text-foreground placeholder:text-muted-fg outline-none focus:border-primary/40 transition-all"
                                />
                            </div>
                            <div className="flex gap-2 pt-1">
                                <button
                                    type="button"
                                    onClick={() => setEditing(null)}
                                    className="flex-1 py-2.5 bg-muted hover:bg-secondary text-muted-fg font-bold text-xs rounded-xl transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-1 py-2.5 bg-primary hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                                >
                                    {isSaving && <Loader2 size={14} className="animate-spin" />}
                                    <Save size={13} />
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
