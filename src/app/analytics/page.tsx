import { PieChart } from 'lucide-react';

export default function AnalyticsPage() {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4 text-center">
            <div className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center mb-4">
                <PieChart size={40} className="text-green-500" />
            </div>
            <h1 className="text-3xl font-black text-foreground">Analytics</h1>
            <p className="text-muted-fg max-w-md">
                Detailed insights into your exam performance, topic distribution, and difficulty trends will be available here soon.
            </p>
        </div>
    );
}
