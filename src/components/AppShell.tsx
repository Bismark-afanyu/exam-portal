'use client';

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import { Menu, Search, Bell, CalendarDays, ChevronDown, Sun, Moon, Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { loadUser, logoutUser } from '@/lib/features/user/userSlice';
import { authService, setUnauthorizedHandler } from '@/services/authService';
import { useTheme } from 'next-themes';

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function AppShell({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isCollapsed, setCollapsed] = useState(false);
    const loadStarted = useRef(false);
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { name, level, department, isAuthenticated, role } = useAppSelector((state) => state.user);
    const { theme, setTheme } = useTheme();
    const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
    const hasToken = mounted && !!authService.getToken();

    useEffect(() => {
        setUnauthorizedHandler(() => {
            dispatch(logoutUser());
            router.replace(role === 'admin' || role === 'editor' ? '/admin' : '/login');
        });
        return () => setUnauthorizedHandler(null);
    }, [dispatch, router, role]);

    useEffect(() => {
        if (hasToken && !isAuthenticated && !loadStarted.current) {
            loadStarted.current = true;
            dispatch(loadUser());
        }
    }, [hasToken, isAuthenticated, dispatch]);

    useEffect(() => {
        if (isAuthenticated && (pathname === '/login' || pathname === '/register')) {
            router.replace('/dashboard');
            return;
        }
        const isProtected = pathname !== '/' && pathname !== '/login' && pathname !== '/register' && pathname !== '/admin';
        if (isProtected && !hasToken && !isAuthenticated) {
            router.replace('/login');
        }
    }, [hasToken, isAuthenticated, router, pathname]);

    const isAuthPage = pathname === '/' || pathname === '/login' || pathname === '/register' || pathname === '/admin';
    if (isAuthPage) {
        return <>{children}</>;
    }

    if (!hasToken || !isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen w-full bg-background">
                <Loader2 size={24} className="animate-spin text-primary" />
            </div>
        );
    }

    const initials = name
        ? name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
        : 'ST';

    const displayName = name
        ? name.split(' ').map((n: string) => n[0].toUpperCase() + n.slice(1).toLowerCase()).join(' ')
        : 'Student';

    // Shorten to first name + last initial
    const shortName = name
        ? (() => {
            const parts = name.split(' ');
            if (parts.length >= 2) return `${parts[0][0].toUpperCase()}${parts[0].slice(1).toLowerCase()} ${parts[parts.length - 1][0].toUpperCase()}.`;
            return displayName;
        })()
        : 'Student';

    return (
        <div className="flex h-screen w-full relative bg-background">
            <Sidebar
                isOpen={isSidebarOpen}
                isCollapsed={isCollapsed}
                onClose={() => setSidebarOpen(false)}
                onToggleCollapse={() => setCollapsed(!isCollapsed)}
            />

            <main className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
                {/* Header */}
                <header className="h-16 border-b border-border-subtle flex items-center px-4 lg:px-6 justify-between shrink-0 bg-card-bg z-30">
                    {/* Left: Mobile menu + Search */}
                    <div className="flex items-center gap-3 flex-1">
                        {/* Mobile logo + menu */}
                        <div className="flex items-center gap-3 lg:hidden">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-black text-sm">Ŋ</span>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="p-2 text-muted-fg hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                            >
                                <Menu size={20} />
                            </button>
                        </div>

                        {/* Search bar */}
                        <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
                            <div className="flex items-center gap-2 w-full px-3 py-2 bg-muted rounded-lg border border-border-subtle">
                                <Search size={16} className="text-muted-fg shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Search subjects, topics, past papers..."
                                    className="bg-transparent text-sm text-foreground placeholder:text-muted-fg outline-none w-full"
                                />
                                <div className="flex items-center gap-0.5 text-[10px] text-muted-fg font-medium shrink-0">
                                    <kbd className="px-1 py-0.5 bg-card-bg border border-border-subtle rounded text-[10px]">⌘</kbd>
                                    <kbd className="px-1 py-0.5 bg-card-bg border border-border-subtle rounded text-[10px]">K</kbd>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Notifications + Profile */}
                    <div className="flex items-center gap-2">
                        <button className="relative p-2 text-muted-fg hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                            <Bell size={18} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-card-bg" />
                        </button>
                        <button className="p-2 text-muted-fg hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                            <CalendarDays size={18} />
                        </button>
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 text-muted-fg hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                            aria-label="Toggle theme"
                        >
                            {mounted && (theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />)}
                        </button>

                        {/* Profile */}
                        <div className="hidden sm:flex items-center gap-2.5 pl-2 ml-1 border-l border-border-subtle cursor-pointer hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                                <span className="text-xs font-semibold text-primary">{initials}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-foreground leading-tight">{shortName}</span>
                                <span className="text-[10px] text-muted-fg leading-tight">{department || 'Science'} • {level || 'Advanced'}</span>
                            </div>
                            <ChevronDown size={14} className="text-muted-fg" />
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-6 scroll-smooth pb-20 lg:pb-6">
                    {children}
                </div>
            </main>

            <MobileNav />
        </div>
    );
}
