'use client';

import { useEffect, useRef, useState } from 'react';
// Define types locally or import @types/pdfjs-dist if available
interface PDFPageRendererProps {
  url: string;
  onPagesRendered: (pageImages: string[]) => void;
}

export default function PDFPageRenderer({ url, onPagesRendered }: PDFPageRendererProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function renderPDF() {
      try {
        setLoading(true);
        // Dynamic import to avoid SSR issues
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        const pageImages: string[] = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2.0 }); // High resolution for extraction
          
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          if (!context) continue;

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({
            canvasContext: context,
            viewport: viewport,
            canvas: canvas as any, // Cast to any to bypass strict type checking if mismatch
          }).promise;

          pageImages.push(canvas.toDataURL('image/png'));
        }

        onPagesRendered(pageImages);
        setLoading(false);
      } catch (err: any) {
        console.error('Error rendering PDF:', err);
        setError('Failed to render PDF. Please try again.');
        setLoading(false);
      }
    }

    if (url) {
      renderPDF();
    }
  }, [url, onPagesRendered]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 glass rounded-3xl animate-pulse">
        <div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin mb-4"></div>
        <p className="text-muted-fg font-medium">Processing PDF pages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 glass rounded-3xl border border-red-500/20 text-center">
        <p className="text-red-400 font-medium">{error}</p>
      </div>
    );
  }

  return null;
}
