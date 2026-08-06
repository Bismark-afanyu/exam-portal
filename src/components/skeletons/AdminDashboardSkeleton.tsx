import { Skeleton } from '@/components/ui/Skeleton';

export default function AdminDashboardSkeleton() {
  return (
    <div className="w-full space-y-6 animate-fade-in">
      {/* Header */}
      <div className="mb-6 space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4 rounded-2xl bg-card-bg border border-border-subtle flex items-center justify-between">
            <div className="space-y-1.5">
              <Skeleton className="h-2.5 w-24" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-2.5 w-20" />
            </div>
            <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
          </div>
        ))}
      </div>

      {/* CTA section */}
      <div className="p-6 md:p-8 rounded-2xl bg-card-bg border border-border-subtle">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <Skeleton className="h-5 w-28 rounded-full" />
            <Skeleton className="h-6 w-72" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-36 rounded-xl shrink-0" />
        </div>
      </div>

      {/* Recent Syncs */}
      <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="divide-y divide-border-subtle">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="py-3 flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <Skeleton className="w-9 h-9 rounded-xl shrink-0" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-36" />
                  <Skeleton className="h-2.5 w-48" />
                </div>
              </div>
              <Skeleton className="w-4 h-4 rounded shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
