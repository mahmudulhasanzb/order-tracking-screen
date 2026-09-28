'use client';

import React, { useState } from 'react';
import { X, Calendar, Check } from 'lucide-react';
import { useToast } from './Toast';

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

export function RescheduleModal({ isOpen, onClose, orderId }: RescheduleModalProps) {
  const { showToast } = useToast();
  const [selectedSlot, setSelectedSlot] = useState('tomorrow_pm');

  if (!isOpen) return null;

  const handleConfirm = () => {
    showToast('Delivery window rescheduled! Courier route updated.', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-zinc-900 border border-zinc-700/80 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Reschedule Delivery Window</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <p className="text-xs text-zinc-300">
            Select a new delivery preference for order <strong className="text-white font-mono">{orderId}</strong>:
          </p>

          <div className="space-y-2 text-xs">
            {/* Slot 1 */}
            <label
              className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                selectedSlot === 'tomorrow_pm'
                  ? 'bg-amber-500/15 border-amber-500 text-white'
                  : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <input
                type="radio"
                name="slot"
                checked={selectedSlot === 'tomorrow_pm'}
                onChange={() => setSelectedSlot('tomorrow_pm')}
                className="mt-0.5 text-amber-500 focus:ring-amber-500"
              />
              <div>
                <span className="font-bold text-zinc-100 block">Tomorrow Afternoon (Recommended)</span>
                <span className="text-[11px] text-zinc-400 block mt-0.5">
                  Tue, Sep 29 • 2:00 PM – 5:30 PM (Priority Ground)
                </span>
              </div>
            </label>

            {/* Slot 2 */}
            <label
              className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                selectedSlot === 'wed_am'
                  ? 'bg-amber-500/15 border-amber-500 text-white'
                  : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <input
                type="radio"
                name="slot"
                checked={selectedSlot === 'wed_am'}
                onChange={() => setSelectedSlot('wed_am')}
                className="mt-0.5 text-amber-500 focus:ring-amber-500"
              />
              <div>
                <span className="font-bold text-zinc-100 block">Wednesday Morning</span>
                <span className="text-[11px] text-zinc-400 block mt-0.5">
                  Wed, Sep 30 • 9:00 AM – 1:00 PM
                </span>
              </div>
            </label>

            {/* Slot 3 */}
            <label
              className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                selectedSlot === 'locker'
                  ? 'bg-amber-500/15 border-amber-500 text-white'
                  : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <input
                type="radio"
                name="slot"
                checked={selectedSlot === 'locker'}
                onChange={() => setSelectedSlot('locker')}
                className="mt-0.5 text-amber-500 focus:ring-amber-500"
              />
              <div>
                <span className="font-bold text-zinc-100 block">Hold at 24/7 Carrier Smart Locker</span>
                <span className="text-[11px] text-zinc-400 block mt-0.5">
                  Brooklyn Depot Locker #12 (Available tomorrow 10 AM)
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Confirm Window</span>
          </button>
        </div>
      </div>
    </div>
  );
}
