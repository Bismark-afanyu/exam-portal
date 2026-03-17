import { FileText } from 'lucide-react';

export default function MyFilesPage() {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4 text-center">
            <div className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center mb-4">
                <FileText size={40} className="text-green-500" />
            </div>
            <h1 className="text-3xl font-black text-foreground">My Files</h1>
            <p className="text-muted-fg max-w-md">
                This is where your processed exams will appear. You'll be able to organize, search, and export your extractions here.
            </p>
        </div>
    );
}
