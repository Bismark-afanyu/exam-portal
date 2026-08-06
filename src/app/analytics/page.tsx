import { PieChart } from 'lucide-react';

export default function AnalyticsPage() {
    return (
        <div className="w-full space-y-6 animate-fade-in">
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                    Analytics
                </h1>
                <p className="text-xs md:text-sm text-muted-fg mt-1">
                    Detailed insights into your exam performance, topic distribution, and difficulty trends.
                </p>
            </div>

            <div className="p-12 rounded-2xl bg-card-bg border border-border-subtle card-shadow text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl text-primary flex items-center justify-center">
                    <PieChart size={24} />
                </div>
                <div>
                    <h2 className="text-base font-bold text-foreground">Analytics Engine Coming Soon</h2>
                    <p className="text-xs text-muted-fg mt-1 max-w-sm">
                        Detailed performance metrics, topic heatmaps, and extraction history trends will appear here.
                    </p>
                </div>
            </div>
        </div>
    );
}
