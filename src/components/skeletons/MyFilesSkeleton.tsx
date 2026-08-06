import { Skeleton } from '@/components/ui/Skeleton';

export default function MyFilesSkeleton() {
  return (
    <div className="w-full space-y-6 animate-fade-in">
      {/* Header */}
      <div className="mb-6 space-y-2">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* Search bar */}
      <Skeleton className="h-10 w-full max-w-md rounded-xl" />

      {/* File list */}
      <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="py-3 flex items-center justify-between px-2">
            <div className="flex items-center gap-3 min-w-0">
              <Skeleton className="w-9 h-9 rounded-xl shrink-0" />
              <div className="space-y-1.5 min-w-0">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-2.5 w-24" />
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Skeleton className="h-8 w-28 rounded-xl" />
              <Skeleton className="h-8 w-16 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
