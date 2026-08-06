import { Skeleton } from '@/components/ui/Skeleton';

export default function DashboardSkeleton() {
  return (
    <div className="w-full animate-fade-in space-y-6">
      {/* Hero greeting skeleton */}
      <div className="rounded-2xl bg-card-bg border border-border-subtle p-6 md:p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-3 max-w-md">
            <Skeleton className="h-7 w-64" />
            <Skeleton className="h-4 w-80" />
            <div className="flex gap-3 pt-1">
              <Skeleton className="h-10 w-36 rounded-lg" />
              <Skeleton className="h-10 w-36 rounded-lg" />
            </div>
          </div>
          <Skeleton className="hidden md:block w-48 h-40 rounded-xl" />
        </div>
      </div>

      {/* Stats row skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 rounded-xl bg-card-bg border border-border-subtle">
            <div className="flex items-center justify-between mb-3">
              <Skeleton className="w-8 h-8 rounded-lg" />
              <Skeleton className="w-15 h-6" />
            </div>
            <Skeleton className="h-3 w-20 mb-1.5" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-3 w-24 mt-1.5" />
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* Continue Learning */}
          <div className="rounded-2xl bg-card-bg border border-border-subtle p-5">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl border border-border-subtle">
              <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-40" />
                <div className="flex items-center gap-3 mt-2">
                  <Skeleton className="flex-1 h-1.5 rounded-full" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
              <Skeleton className="hidden sm:block w-24 h-8 rounded-lg shrink-0" />
            </div>
          </div>

          {/* Recommended */}
          <div className="rounded-2xl bg-card-bg border border-border-subtle p-5">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-4 rounded-xl border border-border-subtle text-center space-y-2">
                  <Skeleton className="w-10 h-10 rounded-xl mx-auto" />
                  <Skeleton className="h-3 w-20 mx-auto" />
                  <Skeleton className="h-2.5 w-16 mx-auto" />
                  <Skeleton className="w-10 h-10 rounded-full mx-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="rounded-2xl bg-card-bg border border-border-subtle p-5">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-5 w-10 rounded-full" />
            </div>
            <div className="flex gap-3 overflow-hidden">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="min-w-[200px] flex-1 p-4 rounded-xl border border-border-subtle space-y-3">
                  <Skeleton className="w-10 h-10 rounded-xl" />
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-2.5 w-24" />
                  <Skeleton className="h-8 w-full rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Upcoming Exams */}
          <div className="rounded-2xl bg-card-bg border border-border-subtle p-5">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-border-subtle">
                  <Skeleton className="w-11 h-12 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-2.5 w-24" />
                  </div>
                </div>
              ))}
            </div>
            <Skeleton className="h-10 w-full mt-4 rounded-xl" />
          </div>

          {/* Performance Overview */}
          <div className="rounded-2xl bg-card-bg border border-border-subtle p-5">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="flex items-center gap-5 mb-4">
              <Skeleton className="w-[100px] h-[100px] rounded-full shrink-0" />
              <div className="flex-1 space-y-2.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-2 h-2 rounded-full" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-3 w-8" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions bar */}
      <div className="rounded-2xl bg-card-bg border border-border-subtle p-4 flex items-center gap-4">
        <Skeleton className="h-3 w-24 shrink-0" />
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-28 rounded-lg shrink-0" />
          ))}
        </div>
      </div>
    </div>
  );
}
