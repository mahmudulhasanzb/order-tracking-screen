'use client';

import React, { useState } from 'react';
import { TrackingPendingTelemetry } from '@/types/order';
import {
  Clock,
  Package,
  Layers,
  BellRing,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useToast } from './Toast';

interface TrackingPendingCardProps {
  pending: TrackingPendingTelemetry;
  onOpenSupport: () => void;
}

export function TrackingPendingCard({ pending, onOpenSupport }: TrackingPendingCardProps) {
  const { showToast } = useToast();
  const [alertsEnabled, setAlertsEnabled] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 234-8901');
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  const handleToggleAlerts = () => {
    const newState = !alertsEnabled;
    setAlertsEnabled(newState);
    if (newState) {
      showToast(`Real-time tracking alerts enabled for ${phoneNumber}!`, 'success');
    } else {
      showToast('Tracking alerts disabled.', 'info');
    }
  };

  return (
    <div className="mx-4 sm:mx-5 mb-4 rounded-2xl border border-purple-500/40 bg-zinc-900/90 overflow-hidden shadow-lg">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600/25 via-zinc-900 to-zinc-950 p-4 border-b border-zinc-800">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30">
            Requirement 3 • Tracking Not Available Yet
          </span>
          <span className="text-[11px] font-mono text-zinc-400">Order Placed 35m ago</span>
        </div>
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Package className="w-5 h-5 text-purple-400 shrink-0" />
          <span>Fulfillment in Progress</span>
        </h2>
        <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
          Your order is confirmed and currently being prepared in our automated fulfillment center.
          Tracking activates upon carrier intake scan.
        </p>
      </div>

      {/* Real-time Fulfillment Pipeline */}
      <div className="p-4 bg-zinc-950/60 border-b border-zinc-800 space-y-3">
        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
          Current Warehouse Stage
        </span>

        {/* Multi-step Mini Bar */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-zinc-900 border border-emerald-500/40 text-emerald-400">
            <CheckCircle2 className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
            <span className="font-semibold block text-[11px]">1. Payment Verified</span>
            <span className="text-[9px] text-zinc-400 font-mono">12:45 PM</span>
          </div>

          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/40 text-purple-300 ring-1 ring-purple-500/20">
            <Layers className="w-4 h-4 mx-auto mb-1 text-purple-400 animate-pulse" />
            <span className="font-semibold block text-[11px]">2. Picking & Boxing</span>
            <span className="text-[9px] text-purple-300 font-mono">Active Now</span>
          </div>

          <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-500">
            <Clock className="w-4 h-4 mx-auto mb-1 text-zinc-600" />
            <span className="font-semibold block text-[11px]">3. Courier Sync</span>
            <span className="text-[9px] text-zinc-600 font-mono">~4:30 PM</span>
          </div>
        </div>

        {/* Live Facility Telemetry */}
        <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1.5 text-xs text-zinc-300">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Logistics Hub:</span>
            <span className="font-mono text-zinc-200 font-semibold">{pending.warehouseLocation}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Activity Note:</span>
            <span className="text-zinc-300 text-right">{pending.currentActivity}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Scheduled Dispatch:</span>
            <span className="font-mono text-purple-400 font-semibold">{pending.expectedDispatch}</span>
          </div>
        </div>
      </div>

      {/* Tracking Notification Opt-in Box */}
      <div className="p-4 bg-gradient-to-r from-purple-500/5 to-transparent border-b border-zinc-800">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
              <BellRing className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-100 flex items-center gap-1.5">
                <span>Instant Tracking Alert</span>
                <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[9px] font-mono uppercase">
                  SMS & Push
                </span>
              </p>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Receive an automatic SMS link with live driver map the second courier scans the parcel.
              </p>

              {/* Phone display / edit */}
              <div className="mt-2 flex items-center gap-2">
                {isEditingPhone ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-100 focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={() => setIsEditingPhone(false)}
                      className="text-xs font-mono text-purple-400 underline"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono">
                    <span>Target Phone: <strong className="text-zinc-200">{phoneNumber}</strong></span>
                    <button
                      onClick={() => setIsEditingPhone(true)}
                      className="text-purple-400 hover:text-purple-300 underline text-[10px]"
                    >
                      Change
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            onClick={handleToggleAlerts}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 mt-1 ${
              alertsEnabled ? 'bg-purple-600' : 'bg-zinc-700'
            }`}
            aria-label="Toggle notifications"
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                alertsEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Explanatory Reassurance & Support */}
      <div className="p-4 bg-zinc-950/40 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>No action needed. On track for Oct 1 - Oct 2 delivery.</span>
        </div>

        <button
          onClick={onOpenSupport}
          className="text-xs font-mono text-purple-400 hover:text-purple-300 flex items-center gap-1 shrink-0 underline underline-offset-2"
        >
          <span>Ask Question</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
