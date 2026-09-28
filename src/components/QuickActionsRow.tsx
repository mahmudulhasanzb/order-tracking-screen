'use client';

import React from 'react';
import {
  Headphones,
  FileWarning,
  Share2,
} from 'lucide-react';
import { useToast } from './Toast';

interface QuickActionsRowProps {
  onOpenSupport: () => void;
  onOpenReport: () => void;
  orderId: string;
}

export function QuickActionsRow({
  onOpenSupport,
  onOpenReport,
  orderId,
}: QuickActionsRowProps) {
  const { showToast } = useToast();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Order Tracking ${orderId}`,
        text: `Live tracking for order ${orderId}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Live tracking link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="mx-4 sm:mx-5 mb-4 grid grid-cols-3 gap-2">
      {/* Action 1: Contact Support */}
      <button
        onClick={onOpenSupport}
        className="p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 flex flex-col items-center justify-center text-center gap-1.5 transition-all group active:scale-95"
      >
        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20">
          <Headphones className="w-4 h-4" />
        </div>
        <span className="text-[11px] font-semibold text-zinc-200">Support</span>
      </button>

      {/* Action 2: Report Issue */}
      <button
        onClick={onOpenReport}
        className="p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 flex flex-col items-center justify-center text-center gap-1.5 transition-all group active:scale-95"
      >
        <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:bg-rose-500/20">
          <FileWarning className="w-4 h-4" />
        </div>
        <span className="text-[11px] font-semibold text-zinc-200">Report Issue</span>
      </button>

      {/* Action 3: Share Tracking */}
      <button
        onClick={handleShare}
        className="p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 flex flex-col items-center justify-center text-center gap-1.5 transition-all group active:scale-95"
      >
        <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:bg-sky-500/20">
          <Share2 className="w-4 h-4" />
        </div>
        <span className="text-[11px] font-semibold text-zinc-200">Share Link</span>
      </button>
    </div>
  );
}
