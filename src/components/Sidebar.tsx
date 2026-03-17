'use client';

import { LayoutDashboard, FileText, Settings, HelpCircle, FilePlus2, PieChart, Sun, Moon, X, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: FilePlus2, label: 'New Extraction', href: '/new-extraction' },
    { icon: FileText, label: 'My Files', href: '/my-files' },
    { icon: PieChart, label: 'Analytics', href: '/analytics' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: HelpCircle, label: 'Help & Support', href: '/help' },
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
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleNavigation = (href: string) => {
        router.push(href);
        if (window.innerWidth < 1024) {
            onClose();
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                    onClick={onClose}
                />
            )}

            <aside className={cn(
                "fixed lg:sticky top-0 left-0 z-50 h-screen bg-background/80 border-r border-border-subtle flex flex-col pt-8 backdrop-blur-xl transition-all duration-300 ease-in-out",
                isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                isCollapsed ? "lg:w-20" : "lg:w-64"
            )}>
                <div className={cn(
                    "px-6 mb-12 flex items-center justify-between transition-all duration-300",
                    isCollapsed ? "lg:px-0 lg:flex-col lg:gap-6" : "lg:px-6 lg:flex-row"
                )}>
                    <div className={cn(
                        "flex items-center gap-3 overflow-hidden transition-all duration-300",
                        isCollapsed && "lg:justify-center lg:w-full"
                    )}>
                        <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                            <span className="text-black font-black text-xl">Ŋ</span>
                        </div>
                        <span className={cn(
                            "text-xl font-normal tracking-tight text-foreground transition-all duration-300 whitespace-nowrap font-untitled serif",
                            isCollapsed && "lg:opacity-0 lg:w-0"
                        )}>Ŋwà'</span>
                    </div>

                    <div className={cn(
                        "flex items-center gap-1 transition-all duration-300",
                        isCollapsed && "lg:w-full lg:justify-center"
                    )}>
                        {/* Desktop Collapse Toggle */}
                        <button
                            onClick={onToggleCollapse}
                            className="hidden lg:flex p-2 text-muted-fg hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                        >
                            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                        </button>

                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 text-muted-fg hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-x-hidden">
                    {menuItems.map((item, index) => {
                        const isActive = pathname === item.href;
                        return (
                            <button
                                key={index}
                                onClick={() => handleNavigation(item.href)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all duration-200 group text-left relative",
                                    isActive
                                        ? "bg-green-500/10 text-green-500 border border-green-500/20"
                                        : "text-muted-fg hover:text-foreground hover:bg-secondary",
                                    isCollapsed && "lg:px-0 lg:justify-center"
                                )}
                            >
                                <item.icon size={20} className={cn("shrink-0", isActive && "text-green-500")} />
                                <span className={cn(
                                    "font-semibold text-sm transition-all duration-300 whitespace-nowrap",
                                    isCollapsed && "lg:opacity-0 lg:w-0"
                                )}>
                                    {item.label}
                                </span>
                                {!isCollapsed && index === 2 && (
                                    <span className="ml-auto bg-green-500 text-black text-[10px] font-black px-1.5 py-0.5 rounded-md">3</span>
                                )}
                                {isCollapsed && isActive && (
                                    <div className="hidden lg:block absolute left-0 w-1 h-6 bg-green-500 rounded-r-full" />
                                )}
                            </button>
                        );
                    })}
                </nav>

                <div className={cn(
                    "p-6 space-y-4 transition-all duration-300",
                    isCollapsed ? "lg:p-4" : "lg:p-6"
                )}>
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 w-full rounded-xl bg-secondary border border-border-subtle text-foreground hover:bg-secondary/80 transition-all group overflow-hidden",
                            isCollapsed && "lg:px-0 lg:justify-center"
                        )}
                    >
                        {mounted && (
                            <div className="shrink-0">
                                {theme === 'dark' ? (
                                    <Sun size={20} className="text-amber-400" />
                                ) : (
                                    <Moon size={20} className="text-indigo-500" />
                                )}
                            </div>
                        )}
                        <span className={cn(
                            "font-semibold text-sm transition-all duration-300 whitespace-nowrap",
                            isCollapsed && "lg:opacity-0 lg:w-0"
                        )}>
                            {mounted ? (theme === 'dark' ? 'Light Mode' : 'Dark Mode') : 'Theme'}
                        </span>
                    </button>

                    {!isCollapsed && (
                        <div className="glass p-4 rounded-2xl bg-green-500/5 border border-green-500/10 animate-fade-in transition-all">
                            <div className="text-xs font-bold text-green-500 uppercase tracking-widest mb-1">Status</div>
                            <div className="text-sm font-semibold text-foreground mb-2">Alpha v0.1</div>
                            <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full w-2/3 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}       