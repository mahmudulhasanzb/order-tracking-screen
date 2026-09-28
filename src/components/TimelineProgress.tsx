'use client';

import React, { useState } from 'react';
import { TimelineStep } from '@/types/order';
import {
  CheckCircle2,
  Circle,
  AlertTriangle,
  Clock,
  ChevronDown,
  ChevronUp,
  MapPin,
} from 'lucide-react';

interface TimelineProgressProps {
  steps: TimelineStep[];
}

export function TimelineProgress({ steps }: TimelineProgressProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div id="delivery-timeline" className="mx-4 sm:mx-5 mb-4 rounded-2xl border border-zinc-800 bg-zinc-900/90 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>Tracking History</span>
        </h2>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-white transition-colors bg-zinc-800/80 px-2.5 py-1 rounded-lg border border-zinc-700/60"
        >
          <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Timeline Steps Content */}
      {isExpanded && (
        <div className="p-4 sm:p-5">
          <div className="relative pl-6 sm:pl-7 space-y-6">
            {/* Connecting Vertical Track Line */}
            <div className="absolute top-2 bottom-4 left-2.5 sm:left-3 w-0.5 bg-zinc-800" />

            {steps.map((step, idx) => {
              const isCompleted = step.state === 'completed';
              const isCurrent = step.state === 'current';
              const isDelayed = step.state === 'delayed';
              const isPending = step.state === 'pending';

              return (
                <div key={step.id || idx} className="relative group">
                  {/* Status Indicator Icon */}
                  <div
                    className={`absolute -left-6 sm:-left-7 top-0.5 w-5 h-5 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
                      isCompleted
                        ? 'bg-emerald-500 text-zinc-950 ring-4 ring-zinc-900'
                        : isCurrent
                        ? 'bg-emerald-500 text-zinc-950 ring-4 ring-emerald-500/20 animate-pulse'
                        : isDelayed
                        ? 'bg-amber-500 text-zinc-950 ring-4 ring-amber-500/20'
                        : isPending
                        ? 'bg-purple-500/30 text-purple-300 ring-4 ring-zinc-900 border border-purple-500/50'
                        : 'bg-zinc-800 text-zinc-600 ring-4 ring-zinc-900 border border-zinc-700'
                    }`}
                  >
                    {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {isCurrent && <div className="w-2 h-2 rounded-full bg-zinc-950" />}
                    {isDelayed && <AlertTriangle className="w-3 h-3" />}
                    {isPending && <Clock className="w-3 h-3" />}
                    {!isCompleted && !isCurrent && !isDelayed && !isPending && (
                      <Circle className="w-2.5 h-2.5" />
                    )}
                  </div>

                  {/* Step Body Card */}
                  <div
                    className={`rounded-xl p-3 border transition-colors ${
                      isCurrent
                        ? 'bg-emerald-950/20 border-emerald-500/40 ring-1 ring-emerald-500/20'
                        : isDelayed
                        ? 'bg-amber-950/20 border-amber-500/40'
                        : isCompleted
                        ? 'bg-zinc-950/40 border-zinc-800/80 hover:border-zinc-750'
                        : 'bg-zinc-950/20 border-zinc-850 opacity-60'
                    }`}
                  >
                    {/* Title and timestamp */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4
                            className={`text-xs font-bold ${
                              isCurrent
                                ? 'text-emerald-300'
                                : isDelayed
                                ? 'text-amber-300'
                                : isCompleted
                                ? 'text-zinc-100'
                                : 'text-zinc-400'
                            }`}
                          >
                            {step.title}
                          </h4>

                          {step.badge && (
                            <span
                              className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${
                                isDelayed
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : isCurrent
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                              }`}
                            >
                              {step.badge}
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-zinc-400">{step.subtitle}</p>
                      </div>

                      {step.timestamp && (
                        <span className="text-[10px] font-mono text-zinc-400 whitespace-nowrap shrink-0">
                          {step.timestamp}
                        </span>
                      )}
                    </div>

                    {/* Location tag if present */}
                    {step.location && (
                      <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono text-zinc-400">
                        <MapPin className="w-3 h-3 text-zinc-500 shrink-0" />
                        <span>{step.location}</span>
                      </div>
                    )}

                    {/* Detailed explanation */}
                    <p className="text-[11px] text-zinc-300/85 mt-1.5 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
