'use client';

import { useState, useRef } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { uploadStart, uploadSuccess, uploadFailure, uploadProgress as setUploadProgress, setPdfUrl } from '@/lib/features/exam/examSlice';
import { Upload, FileText, X, AlertCircle, Sparkles } from 'lucide-react';
import axios from 'axios';
import { cn } from '@/lib/utils';
import { savePDFToLocal } from '@/lib/pdfStorage';

export default function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type === 'application/pdf') {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    dispatch(uploadStart());

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/exams/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 100));
          dispatch(setUploadProgress(progress));
        },
      });

      const pdfUrl = URL.createObjectURL(selectedFile);
      await savePDFToLocal(selectedFile);
      dispatch(setPdfUrl(pdfUrl));
      dispatch(uploadSuccess(response.data.data));
    } catch (error: any) {
      console.error('Upload failed:', error);
      dispatch(uploadFailure(error.message || 'Failed to process exam paper'));
    }
  };

  return (
    <div className="w-full mt-8 animate-fade-in">
      {!selectedFile ? (
        <div
          className={cn(
            "group relative h-96 flex flex-col items-center justify-center border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300 glass",
            isDragging
              ? "border-green-500 bg-green-500/5 scale-[1.01]"
              : "border-border-subtle hover:border-green-500/30 hover:bg-secondary/30"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".pdf"
            className="hidden"
          />
          <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Upload className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Drag & Drop Exam PDF</h3>
          <p className="text-muted-fg text-sm">or click to browse from your computer</p>
          <div className="absolute bottom-10 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-green-500/80 bg-green-500/5 px-4 py-1.5 rounded-full border border-green-500/20">
            <Sparkles size={10} className="text-green-500" /> AI-Ready Format
          </div>
        </div>
      ) : (
        <div className="glass p-10 rounded-3xl animate-fade-in border border-green-500/10 transition-colors">
          <div className="flex items-center gap-6 mb-10">
            <div className="w-16 h-16 bg-green-500/10 border border-green-500/10 rounded-2xl flex items-center justify-center">
              <FileText className="w-8 h-8 text-green-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xl font-bold text-foreground truncate">{selectedFile.name}</div>
              <div className="text-sm text-muted-fg font-medium">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to process</div>
            </div>
            <button
              className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-red-500/10 text-muted-fg hover:text-red-500 transition-colors"
              onClick={removeFile}
            >
              <X size={24} />
            </button>
          </div>
          <button
            className="w-full py-5 bg-green-500 hover:bg-green-600 text-white dark:text-black font-black text-xl rounded-2xl transition-all shadow-[0_10px_30px_-10px_rgba(34,197,94,0.3)] hover:shadow-[0_15px_35px_-10px_rgba(34,197,94,0.45)] hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2"
            onClick={handleUpload}
          >
            <Sparkles size={22} className="fill-current" />
            Start AI Extraction
          </button>
        </div>
      )}
    </div>
  );
}
