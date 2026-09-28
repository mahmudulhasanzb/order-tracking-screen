'use client';

import React from 'react';

export function LoadingSkeleton() {
  return (
    <div className="p-4 sm:p-5 space-y-4 animate-pulse">
      {/* Top Hero Skeleton */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-4 w-28 bg-zinc-800 rounded-md" />
          <div className="h-4 w-36 bg-zinc-800 rounded-md" />
        </div>
        <div className="space-y-2">
          <div className="h-8 w-48 bg-zinc-800 rounded-lg" />
          <div className="h-4 w-64 bg-zinc-800/70 rounded-md" />
        </div>
        <div className="h-2 w-full bg-zinc-800 rounded-full" />
        <div className="h-10 w-full bg-zinc-800/50 rounded-xl" />
      </div>

      {/* Feature Card Skeleton */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
        <div className="h-5 w-40 bg-zinc-800 rounded-md" />
        <div className="h-20 w-full bg-zinc-800/40 rounded-xl" />
        <div className="grid grid-cols-2 gap-2">
          <div className="h-9 bg-zinc-800/60 rounded-xl" />
          <div className="h-9 bg-zinc-800/60 rounded-xl" />
        </div>
      </div>

      {/* Timeline Skeleton */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
        <div className="h-5 w-44 bg-zinc-800 rounded-md" />
        <div className="space-y-4 pl-4">
          <div className="h-12 bg-zinc-800/40 rounded-xl" />
          <div className="h-12 bg-zinc-800/40 rounded-xl" />
          <div className="h-12 bg-zinc-800/40 rounded-xl" />
        </div>
      </div>

      {/* Item summary skeleton */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
        <div className="flex gap-3">
          <div className="w-16 h-16 bg-zinc-800 rounded-xl shrink-0" />
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 w-3/4 bg-zinc-800 rounded" />
            <div className="h-3 w-1/2 bg-zinc-800/70 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
