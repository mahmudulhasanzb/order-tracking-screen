'use client';

import React from 'react';
import { ArrowLeft, Copy, Share2, HelpCircle } from 'lucide-react';
import { useToast } from './Toast';

interface HeaderNavProps {
  orderId: string;
  badgeLabel: string;
  badgeColor: 'emerald' | 'amber' | 'blue' | 'purple' | 'red' | 'zinc';
  onOpenSupport: () => void;
  onResetView?: () => void;
}

export function HeaderNav({
  orderId,
  badgeLabel,
  badgeColor,
  onOpenSupport,
  onResetView,
}: HeaderNavProps) {
  const { showToast } = useToast();

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    showToast(`Order ID ${orderId} copied!`, 'info');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Order Tracking ${orderId}`,
        text: `Track order ${orderId} live delivery progress.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Live tracking link copied to clipboard!', 'success');
    }
  };

  const badgeColorClasses = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    red: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    zinc: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30',
  }[badgeColor];

  return (
    <header className="w-full px-4 pt-3 pb-3 border-b border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30 transition-colors">
      <div className="flex items-center justify-between gap-2">
        {/* Back and Title */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onResetView}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors active:scale-95"
            aria-label="Back to orders"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                {orderId}
              </span>
              <button
                onClick={handleCopyOrderId}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors p-0.5"
                title="Copy Order ID"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Order Tracking</p>
          </div>
        </div>

        {/* Right Status Badge and Actions */}
        <div className="flex items-center gap-1.5">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${badgeColorClasses}`}
          >
            {badgeLabel}
          </span>
          <button
            onClick={handleShare}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            title="Share Tracking"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onOpenSupport}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            title="Get Help & Support"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
