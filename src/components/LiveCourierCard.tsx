'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CourierDriver } from '@/types/order';
import {
  Truck,
  Phone,
  MessageSquare,
  Star,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { useToast } from './Toast';

interface LiveCourierCardProps {
  driver: CourierDriver;
  onOpenSupport?: () => void;
}

export function LiveCourierCard({ driver }: LiveCourierCardProps) {
  const { showToast } = useToast();
  const [sentNote, setSentNote] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [isNoteInputOpen, setIsNoteInputOpen] = useState(false);

  const handleCallDriver = () => {
    showToast(`Connecting to courier (${driver.name}) via masked line...`, 'info');
  };

  const handleSendNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setSentNote(true);
    showToast(`Note delivered to driver's handheld device: "${noteText}"`, 'success');
    setNoteText('');
    setIsNoteInputOpen(false);
  };

  return (
    <div className="mx-4 sm:mx-5 mb-4 rounded-2xl border border-zinc-800 bg-zinc-900/90 overflow-hidden shadow-lg">
      {/* Driver Header */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between gap-3 bg-gradient-to-r from-emerald-500/10 via-zinc-900 to-zinc-950">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image
              src={driver.avatar}
              alt={driver.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/50"
              unoptimized
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-zinc-900 flex items-center justify-center">
              <ShieldCheck className="w-2.5 h-2.5 text-black" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">{driver.name}</h3>
              <div className="flex items-center gap-0.5 text-xs text-amber-400 font-semibold">
                <Star className="w-3 h-3 fill-amber-400" />
                <span>{driver.rating}</span>
              </div>
            </div>
            <p className="text-xs text-zinc-400">
              {driver.vehicle} • <span className="font-mono text-[11px] text-zinc-300">{driver.plate}</span>
            </p>
          </div>
        </div>

        {/* Real-time distance telemetry */}
        <div className="text-right">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            {driver.stopsAway} stops away
          </span>
          <p className="text-[10px] text-zinc-400 mt-1 font-mono">~22 mins arrival</p>
        </div>
      </div>

      {/* Stylized Visual Route Map Graphic */}
      <div className="relative h-32 bg-zinc-950 overflow-hidden border-b border-zinc-800 flex items-center justify-center">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #71717a 1px, transparent 0)',
            backgroundSize: '16px 16px',
          }}
        />

        {/* SVG Route Track */}
        <svg
          className="w-full h-full absolute inset-0 text-zinc-800"
          viewBox="0 0 400 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Street Grid Lines */}
          <path d="M 0 30 L 400 30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 0 60 L 400 60" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 0 90 L 400 90" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 80 0 L 80 120" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 180 0 L 180 120" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 280 0 L 280 120" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />

          {/* Van Path Route Line */}
          <path
            d="M 50 60 C 110 60, 140 30, 200 30 C 260 30, 270 90, 340 70"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="6 4"
            className="animate-pulse"
          />

          {/* Past stops */}
          <circle cx="50" cy="60" r="4" fill="#71717a" />
          <circle cx="150" cy="42" r="3" fill="#71717a" />
          <circle cx="230" cy="45" r="3" fill="#71717a" />
        </svg>

        {/* Courier Van Icon (Live Pin) */}
        <div className="absolute left-[45%] top-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
          <div className="px-2 py-0.5 rounded bg-zinc-900 border border-emerald-500/50 text-[10px] font-mono text-emerald-300 shadow-lg flex items-center gap-1 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Marcus
          </div>
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            <Truck className="w-4 h-4" />
          </div>
        </div>

        {/* Destination Home Pin */}
        <div className="absolute right-8 top-[55%] -translate-y-1/2 flex flex-col items-center">
          <div className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[10px] font-mono text-zinc-300 shadow-md mb-1">
            Your Home
          </div>
          <div className="w-7 h-7 rounded-full bg-blue-500/20 border-2 border-blue-400 flex items-center justify-center text-blue-300">
            <MapPin className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-3 bg-zinc-950/60 flex items-center justify-between gap-2">
        <button
          onClick={handleCallDriver}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-100 font-semibold text-xs border border-zinc-700 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-400" />
          <span>Call Driver</span>
        </button>

        <button
          onClick={() => setIsNoteInputOpen(!isNoteInputOpen)}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-100 font-semibold text-xs border border-zinc-700 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
          <span>{sentNote ? 'Note Sent ✓' : 'Driver Note'}</span>
        </button>
      </div>

      {/* Note Input Drawer */}
      {isNoteInputOpen && (
        <form onSubmit={handleSendNote} className="p-3 bg-zinc-900 border-t border-zinc-800 animate-in fade-in">
          <label className="text-[11px] text-zinc-400 block mb-1.5">
            Add temporary drop instruction for Marcus:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Please ring doorbell 4B twice"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold"
            >
              Send
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
