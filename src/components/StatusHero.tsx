'use client';

import React from 'react';
import { OrderData } from '@/types/order';
import {
  Clock,
  Truck,
  AlertTriangle,
  Copy,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { useToast } from './Toast';

interface StatusHeroProps {
  order: OrderData;
  onOpenReportModal?: () => void;
  onOpenSupportModal?: () => void;
  onScrollToTimeline?: () => void;
}

export function StatusHero({
  order,
  onOpenReportModal,
  onOpenSupportModal,
  onScrollToTimeline,
}: StatusHeroProps) {
  const { showToast } = useToast();

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(order.carrier.trackingNumber);
    showToast(`Tracking #${order.carrier.trackingNumber} copied!`, 'info');
  };

  // Determine stage progress percentage
  const completedCount = order.timeline.filter((s) => s.state === 'completed').length;
  const currentCount = order.timeline.filter((s) => s.state === 'current' || s.state === 'delayed').length;
  const totalStages = order.timeline.length;
  const progressPercent = Math.min(
    100,
    Math.round(((completedCount + (currentCount > 0 ? 0.6 : 0)) / totalStages) * 100)
  );

  const isDelayed = order.scenario === 'delayed';
  const isDelivered = order.scenario === 'delivered_unreceived';
  const isPending = order.scenario === 'tracking_pending';

  return (
    <div className="p-4 sm:p-5">
      <div
        className={`relative overflow-hidden rounded-2xl border p-5 transition-all shadow-sm ${
          isDelayed
            ? 'bg-gradient-to-br from-amber-500/10 via-zinc-900 to-zinc-950 border-amber-500/30'
            : isDelivered
            ? 'bg-gradient-to-br from-blue-500/10 via-zinc-900 to-zinc-950 border-blue-500/30'
            : isPending
            ? 'bg-gradient-to-br from-purple-500/10 via-zinc-900 to-zinc-950 border-purple-500/30'
            : 'bg-gradient-to-br from-emerald-500/10 via-zinc-900 to-zinc-950 border-emerald-500/30'
        }`}
      >
        {/* Ambient Top Glow */}
        <div
          className={`absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-20 pointer-events-none ${
            isDelayed
              ? 'bg-amber-400'
              : isDelivered
              ? 'bg-blue-400'
              : isPending
              ? 'bg-purple-400'
              : 'bg-emerald-400'
          }`}
        />

        {/* Top telemetry row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isDelayed
                    ? 'bg-amber-400'
                    : isDelivered
                    ? 'bg-blue-400'
                    : isPending
                    ? 'bg-purple-400'
                    : 'bg-emerald-400'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isDelayed
                    ? 'bg-amber-500'
                    : isDelivered
                    ? 'bg-blue-500'
                    : isPending
                    ? 'bg-purple-500'
                    : 'bg-emerald-500'
                }`}
              />
            </span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              {order.statusTitle}
            </span>
          </div>

          {/* Carrier Tag */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded-md border border-zinc-700/50">
            <span>{order.carrier.name.split(' ')[0]}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300 font-medium">
              {order.carrier.trackingNumber.length > 15
                ? `${order.carrier.trackingNumber.slice(0, 10)}...`
                : order.carrier.trackingNumber}
            </span>
            <button
              onClick={handleCopyTracking}
              className="hover:text-white transition-colors"
              title="Copy tracking number"
            >
              <Copy className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Primary Headline & Estimated Delivery */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {order.estimatedDeliveryDate}
            </h1>
            {order.delayDetails && (
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-mono font-semibold">
                REVISED
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-sm font-medium text-zinc-300">
            <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span>{order.estimatedDeliveryWindow}</span>
          </div>
        </div>

        {/* Subtext description */}
        <p className="text-xs text-zinc-300/90 leading-relaxed mb-4">
          {order.statusDescription}
        </p>

        {/* Dynamic Progress Bar */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>
              Stage {completedCount + (currentCount > 0 ? 1 : 0)} of {totalStages}
            </span>
            <span className="font-semibold text-zinc-200">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                isDelayed
                  ? 'bg-amber-400'
                  : isDelivered
                  ? 'bg-blue-400'
                  : isPending
                  ? 'bg-purple-400'
                  : 'bg-emerald-400'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Scenario-Specific Quick Action Strip */}
        <div className="pt-2 border-t border-zinc-800/80">
          {isDelayed && (
            <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-medium">Weather hold at Chicago hub</span>
              </div>
              <button
                onClick={onOpenSupportModal}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 font-mono shrink-0"
              >
                Options <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {isDelivered && (
            <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-200">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="text-xs font-medium">Don&apos;t see your package?</span>
              </div>
              <button
                onClick={onOpenReportModal}
                className="text-xs font-bold text-rose-400 hover:text-rose-300 underline underline-offset-2 shrink-0 font-mono"
              >
                Report Missing
              </button>
            </div>
          )}

          {!isDelayed && !isDelivered && !isPending && (
            <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-zinc-850/80 border border-zinc-700/50 text-zinc-300">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium">
                  {order.driver?.liveStatus || 'Courier on delivery route'}
                </span>
              </div>
              <button
                onClick={onScrollToTimeline}
                className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono shrink-0"
              >
                Timeline <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {isPending && (
            <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs font-medium">Picking & packing in warehouse</span>
              </div>
              <span className="text-[11px] font-mono text-purple-300 shrink-0">
                ETA Sync ~2h
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
