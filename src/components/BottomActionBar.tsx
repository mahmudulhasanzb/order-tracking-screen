'use client';

import React from 'react';
import { OrderData } from '@/types/order';
import {
  Headphones,
  ShieldAlert,
  AlertTriangle,
  BellRing,
  HelpCircle,
  FileQuestion,
} from 'lucide-react';

interface BottomActionBarProps {
  order: OrderData;
  onOpenSupport: () => void;
  onOpenDispute: () => void;
  onOpenReschedule: () => void;
}

export function BottomActionBar({
  order,
  onOpenSupport,
  onOpenDispute,
  onOpenReschedule,
}: BottomActionBarProps) {
  const isDelayed = order.scenario === 'delayed';
  const isDelivered = order.scenario === 'delivered_unreceived';
  const isPending = order.scenario === 'tracking_pending';

  return (
    <div className="sticky bottom-0 z-30 w-full p-3 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-800/80 shadow-2xl">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {isDelivered && (
          <>
            <button
              onClick={onOpenDispute}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors shadow-lg active:scale-[0.99]"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Didn&apos;t Receive Order?</span>
            </button>
            <button
              onClick={onOpenSupport}
              className="w-12 h-11 rounded-xl bg-zinc-900 border border-zinc-700/80 hover:bg-zinc-850 text-zinc-300 flex items-center justify-center transition-colors"
              title="Contact Support"
            >
              <Headphones className="w-4 h-4 text-emerald-400" />
            </button>
          </>
        )}

        {isDelayed && (
          <>
            <button
              onClick={onOpenReschedule}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors shadow-lg active:scale-[0.99]"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Resolve Delay Options</span>
            </button>
            <button
              onClick={onOpenSupport}
              className="w-12 h-11 rounded-xl bg-zinc-900 border border-zinc-700/80 hover:bg-zinc-850 text-zinc-300 flex items-center justify-center transition-colors"
              title="Live Delay Desk"
            >
              <Headphones className="w-4 h-4 text-amber-400" />
            </button>
          </>
        )}

        {isPending && (
          <>
            <button
              onClick={onOpenSupport}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors shadow-lg active:scale-[0.99]"
            >
              <BellRing className="w-4 h-4" />
              <span>Questions About Dispatch?</span>
            </button>
            <button
              onClick={onOpenSupport}
              className="w-12 h-11 rounded-xl bg-zinc-900 border border-zinc-700/80 hover:bg-zinc-850 text-zinc-300 flex items-center justify-center transition-colors"
              title="Get Support"
            >
              <HelpCircle className="w-4 h-4 text-purple-400" />
            </button>
          </>
        )}

        {!isDelayed && !isDelivered && !isPending && (
          <>
            <button
              onClick={onOpenSupport}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-lg active:scale-[0.99]"
            >
              <Headphones className="w-4 h-4" />
              <span>Contact Support / Courier</span>
            </button>
            <button
              onClick={onOpenDispute}
              className="w-12 h-11 rounded-xl bg-zinc-900 border border-zinc-700/80 hover:bg-zinc-850 text-zinc-300 flex items-center justify-center transition-colors"
              title="Report an Issue"
            >
              <FileQuestion className="w-4 h-4 text-zinc-400" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
