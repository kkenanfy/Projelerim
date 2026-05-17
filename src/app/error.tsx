"use client";

import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
        <AlertTriangle size={36} className="text-red-500" />
      </div>
      <h1 className="text-2xl font-bold mb-3">Bir Hata Oluştu</h1>
      <p className="text-gray-500 mb-2 max-w-sm text-sm">
        {error.message || "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin."}
      </p>
      {error.digest && (
        <p className="text-gray-700 text-xs mb-6 font-mono">
          Hata Kodu: {error.digest}
        </p>
      )}
      <div className="flex gap-3">
        <button onClick={reset} className="btn-primary">
          <RefreshCw size={16} />
          Tekrar Dene
        </button>
        <Link href="/">
          <button className="btn-secondary">Ana Sayfa</button>
        </Link>
      </div>
    </div>
  );
}
