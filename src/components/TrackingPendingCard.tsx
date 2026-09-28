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
      showToast(`Tracking alerts enabled for ${phoneNumber}`, 'success');
    } else {
      showToast('Tracking alerts disabled', 'info');
    }
  };

  return (
    <div className="mx-4 sm:mx-5 mb-4 rounded-2xl border border-purple-500/30 bg-zinc-900 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-semibold text-white">Preparing for Shipment</h3>
        </div>
        <span className="text-[11px] font-mono text-zinc-400">Order Confirmed</span>
      </div>

      {/* Fulfillment Stages */}
      <div className="p-4 bg-zinc-950/50 border-b border-zinc-800 space-y-3">
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-zinc-900 border border-emerald-500/40 text-emerald-400">
            <CheckCircle2 className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
            <span className="font-semibold block text-[11px]">Confirmed</span>
            <span className="text-[10px] text-zinc-400 font-mono">12:45 PM</span>
          </div>

          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/40 text-purple-300">
            <Layers className="w-4 h-4 mx-auto mb-1 text-purple-400" />
            <span className="font-semibold block text-[11px]">Packaging</span>
            <span className="text-[10px] text-purple-300 font-mono">In Progress</span>
          </div>

          <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-500">
            <Clock className="w-4 h-4 mx-auto mb-1 text-zinc-600" />
            <span className="font-semibold block text-[11px]">Pickup</span>
            <span className="text-[10px] text-zinc-500 font-mono">~4:30 PM</span>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed">
          {pending.currentActivity} Tracking number will activate automatically once scanned by the
          carrier.
        </p>
      </div>

      {/* SMS Alert Opt-in */}
      <div className="p-3.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <BellRing className="w-4 h-4 text-purple-400 shrink-0" />
          <div>
            <span className="text-xs font-semibold text-zinc-200 block">SMS Tracking Alert</span>
            {isEditingPhone ? (
              <div className="flex items-center gap-1.5 mt-1">
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-100 focus:outline-none"
                />
                <button
                  onClick={() => setIsEditingPhone(false)}
                  className="text-xs text-purple-400 underline font-mono"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                <span>{phoneNumber}</span>
                <button
                  onClick={() => setIsEditingPhone(true)}
                  className="text-purple-400 underline text-[10px]"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleToggleAlerts}
          className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors shrink-0 ${
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

      {/* Support link */}
      <div className="p-3 bg-zinc-950/70 flex items-center justify-between text-xs">
        <span className="text-zinc-400">Expected delivery: Oct 1 - Oct 2</span>
        <button
          onClick={onOpenSupport}
          className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1"
        >
          <span>Help</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
