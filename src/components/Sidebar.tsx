'use client';

import { LayoutDashboard, FileText, Settings, FilePlus2, PieChart, Sun, Moon, X, ChevronLeft, ChevronRight, BookOpen, FileCheck, Sparkles, Video, Users, BrainCircuit, Trophy, Flame, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { logoutUser } from '@/lib/features/user/userSlice';

const adminMenuItems: { icon: any; label: string; href: string; badge?: string }[] = [
    { icon: LayoutDashboard, label: 'Admin Dashboard', href: '/dashboard' },
    { icon: FilePlus2, label: 'New Extraction', href: '/new-extraction' },
    { icon: FileText, label: 'My Files', href: '/my-files' },
    { icon: PieChart, label: 'Analytics', href: '/analytics' },
    { icon: Users, label: 'Team', href: '/team' },
    { icon: Settings, label: 'Settings', href: '/settings' },
];

const studentMenuItems: { icon: any; label: string; href: string; badge?: string }[] = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: FileCheck, label: 'Junes', href: '/student/junes' },
    { icon: Sparkles, label: 'AI Tutor', href: '/student/chat', badge: 'New' },
    { icon: Video, label: 'Videos', href: '/student/videos' },
    { icon: Users, label: 'Community', href: '/student/community' },
    { icon: Trophy, label: 'Achievements', href: '/student/achievements' },
    { icon: Settings, label: 'Settings', href: '/student/settings' },
];

interface SidebarProps {
    isOpen: boolean;
    isCollapsed: boolean;
    onClose: () => void;
    onToggleCollapse: () => void;
}

export default function Sidebar({ isOpen, isCollapsed, onClose, onToggleCollapse }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { role, name } = useAppSelector((state) => state.user);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const menuItems: { icon: any; label: string; href: string; badge?: string }[] =
        role === 'admin'
            ? adminMenuItems
            : role === 'editor'
                ? adminMenuItems.filter((item) => item.href !== '/team')
                : studentMenuItems;

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleNavigation = (href: string) => {
        router.push(href);
        if (window.innerWidth < 1024) {
            onClose();
        }
    };

    const handleLogout = () => {
        const target = role === 'admin' ? '/admin' : '/login';
        dispatch(logoutUser()).then(() => router.push(target));
    };

    const streakDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const streakActive = [true, true, true, true, true, false, false];

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                    onClick={onClose}
                />
            )}

            <aside className={cn(
                "fixed lg:sticky top-0 left-0 z-50 h-screen bg-card-bg border-r border-border-subtle flex flex-col transition-all duration-300 ease-in-out",
                isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                isCollapsed ? "lg:w-[72px]" : "lg:w-60"
            )}>
                {/* Logo */}
                <div className={cn(
                    "px-5 h-16 flex items-center justify-between border-b border-border-subtle",
                    isCollapsed && "lg:justify-center lg:px-0"
                )}>
                    <div className={cn(
                        "flex items-center gap-2.5 overflow-hidden transition-all duration-300",
                        isCollapsed && "lg:justify-center lg:w-full"
                    )}>
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-white font-bold text-sm">n</span>
                        </div>
                        {!isCollapsed && (
                            <span className="text-base font-semibold tracking-tight text-foreground whitespace-nowrap">Ŋwà'</span>
                        )}
                    </div>
                    <div className={cn(
                        "flex items-center transition-all duration-300",
                        isCollapsed && "lg:hidden"
                    )}>
                        <button
                            onClick={onToggleCollapse}
                            className="hidden lg:flex p-1.5 text-muted-fg hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button onClick={onClose} className="lg:hidden p-1.5 text-muted-fg hover:text-foreground rounded-lg">
                            <X size={16} />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
                    {menuItems.map((item, index) => {
                        const isActive = pathname === item.href;
                        return (
                            <button
                                key={index}
                                onClick={() => handleNavigation(item.href)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 w-full rounded-lg transition-all duration-150 text-left relative",
                                    isActive
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "text-muted-fg hover:text-foreground hover:bg-muted",
                                    isCollapsed && "lg:px-0 lg:justify-center"
                                )}
                            >
                                <item.icon size={18} className={cn("shrink-0", isActive && "text-primary")} />
                                <span className={cn(
                                    "text-sm transition-all duration-300 whitespace-nowrap",
                                    isCollapsed && "lg:opacity-0 lg:w-0"
                                )}>
                                    {item.label}
                                </span>
                                {item.badge && !isCollapsed && (
                                    <span className="ml-auto bg-primary text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                                {isActive && !isCollapsed && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary rounded-r-full hidden lg:block" />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className={cn(
                    "p-3 space-y-2 border-t border-border-subtle",
                    isCollapsed && "lg:p-2"
                )}>
                    {/* Study Streak Card */}
                    {!isCollapsed && role === 'student' && (
                        <div className="p-3 rounded-xl bg-muted">
                            <div className="flex items-center gap-1.5 mb-1">
                                <span className="text-sm">Study Streak 🔥</span>
                            </div>
                            <div className="text-2xl font-bold text-foreground leading-tight">14 <span className="text-xs font-normal text-muted-fg">days</span></div>
                            <p className="text-[11px] text-muted-fg mt-1">Keep it up! You're doing great.</p>
                            <div className="flex gap-1.5 mt-2.5">
                                {streakDays.map((day, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-medium",
                                            streakActive[i]
                                                ? "bg-primary text-white"
                                                : "bg-border-subtle text-muted-fg"
                                        )}
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-3 py-1.5 text-xs font-medium text-foreground bg-card-bg border border-border-subtle rounded-lg hover:bg-secondary transition-colors">
                                View Calendar
                            </button>
                        </div>
                    )}

                    {/* Log out & Theme */}
                    <div className={cn("flex gap-1.5", isCollapsed && "flex-col")}>
                        <button
                            onClick={handleLogout}
                            className={cn(
                                "flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-muted text-muted-fg hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all text-xs font-medium flex-1",
                                isCollapsed && "lg:px-0 lg:justify-center lg:flex-none"
                            )}
                            title="Log out"
                        >
                            <LogOut size={16} className="shrink-0" />
                            {!isCollapsed && <span>Log out</span>}
                        </button>
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-lg bg-muted text-muted-fg hover:text-foreground transition-all"
                        >
                            {mounted && (theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />)}
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
