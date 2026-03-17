import { HelpCircle } from 'lucide-react';

export default function HelpPage() {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4 text-center">
            <div className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center mb-4">
                <HelpCircle size={40} className="text-green-500" />
            </div>
            <h1 className="text-3xl font-black text-foreground">Help & Support</h1>
            <p className="text-muted-fg max-w-md">
                Need help? Check out our documentation or contact support for assistance with your extractions.
            </p>
        </div>
    );
}
