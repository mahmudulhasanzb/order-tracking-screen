'use client';

import React from 'react';
import { OrderScenario } from '@/types/order';
import {
  Smartphone,
  Maximize2,
  Moon,
  Sun,
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
  const scenarios: { id: OrderScenario; label: string }[] = [
    { id: 'out_for_delivery', label: 'Out for Delivery' },
    { id: 'delayed', label: 'Delayed Order' },
    { id: 'delivered_unreceived', label: 'Delivered (Not Received)' },
    { id: 'tracking_pending', label: 'Tracking Pending' },
    { id: 'loading', label: 'Loading' },
    { id: 'error', label: 'Error' },
  ];

  return (
    <div className="w-full bg-zinc-950 border-b border-zinc-800/80 text-zinc-100 py-2 px-3 sm:px-6 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Scenario Pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 max-w-full">
          {scenarios.map((s) => {
            const isSelected = currentScenario === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectScenario(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                  isSelected
                    ? 'bg-zinc-100 text-zinc-900 border-zinc-100 font-semibold'
                    : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Viewport & Theme controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onToggleMobileFrame}
            title={isMobileFrame ? 'Full width view' : 'Mobile frame view'}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850 transition-colors"
          >
            {isMobileFrame ? (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">390px</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Fluid</span>
              </>
            )}
          </button>

          <button
            onClick={onToggleDarkMode}
            title="Toggle theme"
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850 transition-colors"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
