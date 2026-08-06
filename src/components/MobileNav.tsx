'use client';

import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileCheck, Sparkles, MessageSquare, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Home', href: '/dashboard' },
  { icon: FileCheck, label: 'Papers', href: '/student/junes' },
  { icon: Sparkles, label: 'AI Tutor', href: '/student/chat' },
  { icon: MessageSquare, label: 'Community', href: '/student/community' },
  { icon: User, label: 'Profile', href: '/student/settings' },
];

export default function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card-bg border-t border-border-subtle safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <button
              key={`${item.label}-${index}`}
              onClick={() => router.push(item.href)}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-colors",
                isActive ? "text-primary" : "text-muted-fg"
              )}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
