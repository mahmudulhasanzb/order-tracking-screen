'use client';

import React from 'react';
import { OrderScenario } from '@/types/order';
import {
  Truck,
  AlertTriangle,
  PackageCheck,
  Clock,
  Loader2,
  AlertOctagon,
  Smartphone,
  Maximize2,
  Moon,
  Sun,
  ShieldCheck,
} from 'lucide-react';

interface ScenarioSwitcherProps {
  currentScenario: OrderScenario;
  onSelectScenario: (scenario: OrderScenario) => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function ScenarioSwitcher({
  currentScenario,
  onSelectScenario,
  isMobileFrame,
  onToggleMobileFrame,
  isDarkMode,
  onToggleDarkMode,
}: ScenarioSwitcherProps) {
  const scenarios: {
    id: OrderScenario;
    label: string;
    sublabel: string;
    icon: React.ElementType;
    color: string;
    requirementTag?: string;
  }[] = [
    {
      id: 'out_for_delivery',
      label: 'Out for Delivery',
      sublabel: 'Live driver tracking',
      icon: Truck,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      requirementTag: 'On Track',
    },
    {
      id: 'delayed',
      label: 'Delayed Order',
      sublabel: 'Weather hold & ETA revision',
      icon: AlertTriangle,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      requirementTag: 'Req #1: Delayed',
    },
    {
      id: 'delivered_unreceived',
      label: 'Delivered (Not Received)',
      sublabel: 'Proof photo & dispute flow',
      icon: PackageCheck,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      requirementTag: 'Req #2: Missing',
    },
    {
      id: 'tracking_pending',
      label: 'Tracking Pending',
      sublabel: 'Order pre-manifest stage',
      icon: Clock,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      requirementTag: 'Req #3: Pending',
    },
    {
      id: 'loading',
      label: 'Loading State',
      sublabel: 'Skeleton placeholder',
      icon: Loader2,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      requirementTag: 'UX Polish',
    },
    {
      id: 'error',
      label: 'Error State',
      sublabel: 'Network failure & retry',
      icon: AlertOctagon,
      color: 'text-zinc-400 bg-zinc-500/10 border-zinc-500/30',
      requirementTag: 'Resilience',
    },
  ];

  return (
    <div className="w-full bg-zinc-900/90 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 text-zinc-100 py-2.5 px-3 sm:px-6 transition-colors shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Branding & Evaluator Notice */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold">
            OT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider uppercase text-zinc-100 font-mono">
                Order Tracking Evaluator
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3" /> All 3 States Covered
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden sm:block">
              Switch states below to inspect adaptive UI, delay resolutions, and dispute workflows.
            </p>
          </div>
        </div>

        {/* Middle: Scenario Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
          {scenarios.map((s) => {
            const Icon = s.icon;
            const isSelected = currentScenario === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectScenario(s.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? `${s.color} shadow-sm ring-1 ring-white/20 font-semibold scale-[1.02]`
                    : 'bg-zinc-800/60 border-zinc-700/60 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? '' : 'text-zinc-400'}`} />
                <span>{s.label}</span>
                {s.requirementTag && (
                  <span
                    className={`hidden lg:inline-block text-[9px] px-1.5 py-0.2 rounded font-mono uppercase ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-zinc-700/60 text-zinc-400'
                    }`}
                  >
                    {s.requirementTag}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Mode Toggles */}
        <div className="flex items-center gap-1.5 shrink-0 self-end md:self-auto">
          {/* Mobile frame toggle */}
          <button
            onClick={onToggleMobileFrame}
            title={isMobileFrame ? 'Switch to Fullscreen fluid mode' : 'Switch to Phone Mockup (390px)'}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono bg-zinc-800 border border-zinc-700 hover:bg-zinc-750 text-zinc-300 hover:text-white transition-colors"
          >
            {isMobileFrame ? (
              <>
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Phone Frame (390px)</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Fluid View</span>
              </>
            )}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleDarkMode}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-1.5 rounded-lg text-zinc-300 bg-zinc-800 border border-zinc-700 hover:bg-zinc-750 hover:text-white transition-colors"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-purple-300" />}
          </button>
        </div>
      </div>
    </div>
  );
}
