'use client';

import React, { useState } from 'react';
import { DelayTelemetry } from '@/types/order';
import {
  AlertTriangle,
  Clock,
  Calendar,
  Gift,
  Copy,
  Check,
  Headphones,
  MapPin,
} from 'lucide-react';
import { useToast } from './Toast';

interface DelayedActionCardProps {
  delay: DelayTelemetry;
  onOpenSupport: () => void;
  onOpenReschedule: () => void;
  onExpediteRequest?: () => void;
}

export function DelayedActionCard({
  delay,
  onOpenSupport,
  onOpenReschedule,
}: DelayedActionCardProps) {
  const { showToast } = useToast();
  const [copiedVoucher, setCopiedVoucher] = useState(false);

  const handleCopyVoucher = () => {
    navigator.clipboard.writeText(delay.apologyCreditCode);
    setCopiedVoucher(true);
    showToast(`Voucher ${delay.apologyCreditCode} copied`, 'success');
    setTimeout(() => setCopiedVoucher(false), 2000);
  };

  return (
    <div className="mx-4 sm:mx-5 mb-4 rounded-2xl border border-amber-500/30 bg-zinc-900 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-white">Delay Notice</h3>
            <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
              Weather Hold
            </span>
          </div>
          <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
            {delay.reason}
          </p>
        </div>
      </div>

      {/* Date Comparison */}
      <div className="p-3.5 grid grid-cols-2 gap-3 bg-zinc-950/50 border-b border-zinc-800 text-xs">
        <div>
          <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-0.5">
            Original Arrival
          </span>
          <div className="flex items-center gap-1.5 text-zinc-400 line-through">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>{delay.originalEstimate}</span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold block mb-0.5">
            Updated Arrival
          </span>
          <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{delay.revisedEstimate}</span>
          </div>
        </div>
      </div>

      {/* Current Location */}
      <div className="px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          <span>Last Location:</span>
        </div>
        <span className="font-mono text-zinc-200 text-[11px]">{delay.currentHub}</span>
      </div>

      {/* Discount Coupon */}
      <div className="p-3.5 bg-zinc-950/40 border-b border-zinc-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Gift className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <span className="text-xs font-medium text-zinc-200 block">Courtesy Credit</span>
            <span className="text-[11px] text-zinc-400">{delay.creditAmount} applied for delay</span>
          </div>
        </div>
        <button
          onClick={handleCopyVoucher}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-zinc-800 hover:bg-zinc-750 text-zinc-200 border border-zinc-700 transition-colors shrink-0"
        >
          {copiedVoucher ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{delay.apologyCreditCode}</span>
        </button>
      </div>

      {/* Actions */}
      <div className="p-3 bg-zinc-950/70 grid grid-cols-2 gap-2">
        <button
          onClick={onOpenReschedule}
          className="py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-200 text-xs font-semibold border border-zinc-700 transition-colors flex items-center justify-center gap-1.5"
        >
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>Reschedule</span>
        </button>

        <button
          onClick={onOpenSupport}
          className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
        >
          <Headphones className="w-3.5 h-3.5" />
          <span>Contact Support</span>
        </button>
      </div>
    </div>
  );
}
