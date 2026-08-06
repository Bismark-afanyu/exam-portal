import { Skeleton } from '@/components/ui/Skeleton';

export default function NewExtractionLoading() {
  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-6 animate-fade-in">
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="p-8 rounded-2xl border-2 border-dashed border-border-subtle bg-card-bg">
          <div className="flex flex-col items-center gap-4 py-8">
            <Skeleton className="w-16 h-16 rounded-2xl" />
            <div className="space-y-2 text-center">
              <Skeleton className="h-4 w-48 mx-auto" />
              <Skeleton className="h-3 w-64 mx-auto" />
            </div>
            <Skeleton className="h-10 w-36 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
