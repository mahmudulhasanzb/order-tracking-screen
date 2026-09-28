'use client';

import React, { useState } from 'react';
import { DeliveryAddress, CarrierInfo } from '@/types/order';
import {
  MapPin,
  Truck,
  Edit3,
  Phone,
  Check,
} from 'lucide-react';
import { useToast } from './Toast';

interface DeliveryAddressCardProps {
  address: DeliveryAddress;
  carrier: CarrierInfo;
}

export function DeliveryAddressCard({ address, carrier }: DeliveryAddressCardProps) {
  const { showToast } = useToast();
  const [instructions, setInstructions] = useState(address.deliveryInstructions);
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(instructions);

  const handleSaveInstructions = () => {
    setInstructions(tempText);
    setIsEditing(false);
    showToast('Delivery notes updated for courier dispatch.', 'success');
  };

  return (
    <div className="mx-4 sm:mx-5 mb-4 rounded-2xl border border-zinc-800 bg-zinc-900/90 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Delivery Address</span>
          </h2>
        </div>

        <button
          onClick={() => {
            setTempText(instructions);
            setIsEditing(!isEditing);
          }}
          className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white bg-zinc-800 px-2.5 py-1 rounded-lg border border-zinc-700/60 hover:bg-zinc-750 transition-colors"
        >
          <Edit3 className="w-3.5 h-3.5 text-zinc-400" />
          <span>{isEditing ? 'Cancel' : 'Edit Note'}</span>
        </button>
      </div>

      {/* Address Content */}
      <div className="p-4 space-y-3">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-100">{address.recipient}</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Address Validated
            </span>
          </div>
          <p className="text-xs text-zinc-300 mt-1">
            {address.street} {address.apartment && `• ${address.apartment}`}
          </p>
          <p className="text-xs text-zinc-400">{address.cityStateZip}</p>
        </div>

        {/* Delivery Note */}
        <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
          <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
            Driver Instructions
          </span>

          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={tempText}
                onChange={(e) => setTempText(e.target.value)}
                rows={2}
                className="w-full p-2 text-xs rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-emerald-500 resize-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-2.5 py-1 rounded-md text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveInstructions}
                  className="px-3 py-1 rounded-md text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1"
                >
                  <Check className="w-3 h-3" /> Save Note
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-zinc-300 italic">&ldquo;{instructions}&rdquo;</p>
          )}

          {address.accessCode && (
            <div className="mt-2 pt-2 border-t border-zinc-850 flex items-center justify-between text-[11px] font-mono">
              <span className="text-zinc-500">Security / Door Code:</span>
              <span className="text-zinc-200 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                {address.accessCode}
              </span>
            </div>
          )}
        </div>

        {/* Carrier Details Footer */}
        <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-zinc-500" />
            <span>Carrier: <strong className="text-zinc-200">{carrier.name}</strong></span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <Phone className="w-3 h-3 text-zinc-500" />
            <span>{carrier.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
