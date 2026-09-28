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
  Zap,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import { useToast } from './Toast';

interface DelayedActionCardProps {
  delay: DelayTelemetry;
  onOpenSupport: () => void;
  onOpenReschedule: () => void;
  onExpediteRequest: () => void;
}

export function DelayedActionCard({
  delay,
  onOpenSupport,
  onOpenReschedule,
  onExpediteRequest,
}: DelayedActionCardProps) {
  const { showToast } = useToast();
  const [copiedVoucher, setCopiedVoucher] = useState(false);
  const [expedited, setExpedited] = useState(false);

  const handleCopyVoucher = () => {
    navigator.clipboard.writeText(delay.apologyCreditCode);
    setCopiedVoucher(true);
    showToast(`Voucher ${delay.apologyCreditCode} copied! Applied to your account.`, 'success');
    setTimeout(() => setCopiedVoucher(false), 2500);
  };

  const handleExpedite = () => {
    setExpedited(true);
    onExpediteRequest();
    showToast('Priority expedite flag attached to parcel #ORD-76192-DL', 'success');
  };

  return (
    <div className="mx-4 sm:mx-5 mb-4 rounded-2xl border border-amber-500/40 bg-zinc-900/90 overflow-hidden shadow-lg">
      {/* Alert Header */}
      <div className="bg-gradient-to-r from-amber-600/30 via-amber-500/20 to-transparent p-4 border-b border-amber-500/30 flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
              Requirement 1 • Delayed Order Handled
            </span>
          </div>
          <h2 className="text-base font-bold text-white mt-1">
            {delay.headline}
          </h2>
          <p className="text-xs text-amber-200/90 mt-1 leading-relaxed">
            {delay.reason}
          </p>
        </div>
      </div>

      {/* Comparison Grid: Original vs Revised */}
      <div className="p-4 grid grid-cols-2 gap-3 bg-zinc-950/60 border-b border-zinc-800">
        <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
            Original ETA
          </span>
          <div className="flex items-center gap-1.5 text-zinc-400 line-through text-xs font-medium">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>{delay.originalEstimate}</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
          <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block mb-1">
            Revised Delivery
          </span>
          <div className="flex items-center gap-1.5 text-amber-200 text-xs font-bold">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{delay.revisedEstimate}</span>
          </div>
        </div>
      </div>

      {/* Current Location telemetry */}
      <div className="px-4 py-3 bg-zinc-900/50 border-b border-zinc-800 flex items-center justify-between text-xs text-zinc-300">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Current Transit Location:</span>
        </div>
        <span className="font-mono text-zinc-200 font-semibold text-[11px]">
          {delay.currentHub}
        </span>
      </div>

      {/* Apology Compensation Credit */}
      <div className="p-4 bg-gradient-to-r from-amber-500/5 to-transparent border-b border-zinc-800">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-100">
                Inconvenience Credit Offered
              </p>
              <p className="text-[11px] text-zinc-400">
                {delay.creditAmount} automatically credited for future orders.
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyVoucher}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-colors shrink-0"
          >
            {copiedVoucher ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>{delay.apologyCreditCode}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Actionable Next Steps */}
      <div className="p-4 space-y-2 bg-zinc-950/40">
        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
          Available Next Steps
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Action 1: Reschedule window */}
          <button
            onClick={onOpenReschedule}
            className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-700/80 hover:border-amber-500/50 hover:bg-zinc-850 text-left transition-all group"
          >
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-200 group-hover:text-amber-300">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Change Delivery Day/Time</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Hold at nearby locker or change time slot
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Action 2: Priority Courier Expedite */}
          <button
            onClick={handleExpedite}
            disabled={expedited}
            className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all group ${
              expedited
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                : 'bg-zinc-900 border-zinc-700/80 hover:border-amber-500/50 hover:bg-zinc-850'
            }`}
          >
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-200 group-hover:text-amber-300">
                <Zap className={`w-3.5 h-3.5 ${expedited ? 'text-emerald-400' : 'text-amber-400'}`} />
                <span>{expedited ? 'Priority Requested ✓' : 'Request Rush Priority'}</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                {expedited ? 'Flagged for first morning dispatch' : 'Courier station flag for morning delivery'}
              </p>
            </div>
            {!expedited && (
              <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            )}
          </button>
        </div>

        {/* Action 3: Live agent priority line */}
        <button
          onClick={onOpenSupport}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-md active:scale-[0.99]"
        >
          <Headphones className="w-4 h-4" />
          <span>Connect with Delay Resolution Specialist</span>
        </button>
      </div>
    </div>
  );
}
