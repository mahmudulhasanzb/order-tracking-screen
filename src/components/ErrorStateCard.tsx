'use client';

import React from 'react';
import { RotateCw, Headphones, WifiOff } from 'lucide-react';

interface ErrorStateCardProps {
  onRetry: () => void;
  onOpenSupport: () => void;
}

export function ErrorStateCard({ onRetry, onOpenSupport }: ErrorStateCardProps) {
  return (
    <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[500px]">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
        <WifiOff className="w-8 h-8" />
      </div>

      <div className="max-w-sm space-y-1.5">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
          Telemetry Offline
        </span>
        <h3 className="text-lg font-bold text-white mt-2">
          Unable to Load Live Tracking
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          We encountered an issue syncing real-time GPS telemetry from the carrier API. Your parcel
          remains secure in transit.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5 w-full max-w-xs pt-2">
        <button
          onClick={onRetry}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-md"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Retry Sync</span>
        </button>

        <button
          onClick={onOpenSupport}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-200 font-semibold text-xs border border-zinc-700 transition-colors"
        >
          <Headphones className="w-3.5 h-3.5 text-zinc-400" />
          <span>Helpdesk</span>
        </button>
      </div>

      <p className="text-[11px] font-mono text-zinc-500">Error Code: ERR_CARRIER_SYNC_TIMEOUT_504</p>
    </div>
  );
}
