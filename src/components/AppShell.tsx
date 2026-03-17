'use client';

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Menu } from "lucide-react";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isCollapsed, setCollapsed] = useState(false);

    return (
        <div className="flex h-screen w-full relative bg-background">
            <Sidebar
                isOpen={isSidebarOpen}
                isCollapsed={isCollapsed}
                onClose={() => setSidebarOpen(false)}
                onToggleCollapse={() => setCollapsed(!isCollapsed)}
            />

            <main className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
                {/* Header (Desktop Toggle & Mobile Menu) */}
                <header className="h-16 border-b border-border-subtle flex items-center px-6 justify-between shrink-0 glass z-30">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 lg:hidden">
                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/20">
                                <span className="text-black font-black text-sm">Ŋ</span>
                            </div>
                            <span className="font-bold tracking-tight text-foreground">Ŋwà'</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 text-muted-fg hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                    >
                        <Menu size={24} />
                    </button>

                    {/* Placeholder for Profile/Actions */}
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-secondary border border-border-subtle" />
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto px-6 lg:px-12 py-12 scroll-smooth">
                    {children}
                </div>
            </main>
        </div>
    );
}
