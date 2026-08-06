import { Skeleton } from '@/components/ui/Skeleton';

export default function PaperViewSkeleton() {
  return (
    <div className="animate-fade-in pb-20">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 pt-4 pb-2">
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Paper container */}
      <div className="max-w-4xl mx-auto mt-8 rounded-3xl shadow-2xl overflow-hidden border border-border-subtle bg-card-bg">
        {/* Paper header */}
        <div className="px-8 md:px-16 py-10 md:py-14 text-center border-b-2 border-border-subtle space-y-4">
          <Skeleton className="h-3 w-64 mx-auto" />
          <Skeleton className="h-6 w-28 mx-auto rounded-full" />
          <Skeleton className="h-10 w-64 mx-auto" />
          <div className="flex items-center justify-center gap-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-0.5 w-24 mx-auto rounded-full" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>

        {/* Questions */}
        <div className="px-6 md:px-12 lg:px-16 py-10 space-y-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="py-8 border-b border-border-subtle last:border-0">
              <div className="flex justify-between items-start mb-4">
                <Skeleton className="w-10 h-10 rounded-xl" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              {i % 2 === 0 && (
                <Skeleton className="h-32 w-full mt-6 rounded-2xl" />
              )}
              {i % 3 === 0 && (
                <div className="mt-5 space-y-3 pl-6 md:pl-10">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="flex gap-3">
                      <Skeleton className="h-4 w-6 shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Paper footer */}
        <div className="px-8 md:px-16 py-8 text-center border-t-2 border-border-subtle">
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      </div>
    </div>
  );
}
