'use client';

import { useAppSelector } from '@/lib/hooks';
import AdminDashboard from '@/components/AdminDashboard';
import StudentDashboard from '@/components/StudentDashboard';
import Onboarding from '@/components/Onboarding';

export default function RootPage() {
  const { role, level } = useAppSelector((state) => state.user);

  if (role === 'student' && !level) {
    return <Onboarding />;
  }

  return (
    <div className="w-full min-h-full">
      {role === 'admin' || role === 'editor' ? <AdminDashboard /> : <StudentDashboard />}
    </div>
  );
}

