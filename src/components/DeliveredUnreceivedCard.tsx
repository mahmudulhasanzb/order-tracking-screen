'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProofOfDelivery } from '@/types/order';
import {
  PackageCheck,
  MapPin,
  Camera,
  AlertCircle,
  HelpCircle,
  PhoneCall,
  Maximize2,
  X,
} from 'lucide-react';

interface DeliveredUnreceivedCardProps {
  proof: ProofOfDelivery;
  onOpenDisputeModal: () => void;
  onOpenSupport: () => void;
}

export function DeliveredUnreceivedCard({
  proof,
  onOpenDisputeModal,
  onOpenSupport,
}: DeliveredUnreceivedCardProps) {
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const checklist = [
    { id: 1, text: 'Check porch, mailbox, and secondary entryways' },
    { id: 2, text: 'Check with neighbors or front desk / building lobby' },
    { id: 3, text: 'Allow 30 minutes in case driver marked delivered early' },
  ];

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="mx-4 sm:mx-5 mb-4 rounded-2xl border border-rose-500/30 bg-zinc-900 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PackageCheck className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-semibold text-white">Proof of Delivery</h3>
        </div>
        <span className="text-[11px] font-mono text-zinc-400">{proof.deliveredAt}</span>
      </div>

      {/* Proof Photo & Details */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 bg-zinc-950/50 border-b border-zinc-800">
        <div
          className="sm:col-span-1 h-28 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700/80 relative group cursor-pointer"
          onClick={() => setIsPhotoOpen(true)}
        >
          <Image
            src={proof.photoUrl}
            alt="Delivery proof"
            width={200}
            height={120}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-medium text-white flex items-center gap-1 bg-black/60 px-2 py-1 rounded">
              <Maximize2 className="w-3 h-3" /> View
            </span>
          </div>
          <div className="absolute bottom-1.5 left-1.5 bg-black/70 px-1.5 py-0.5 rounded text-[10px] font-mono text-zinc-300 flex items-center gap-1">
            <Camera className="w-3 h-3 text-blue-400" /> Photo
          </div>
        </div>

        <div className="sm:col-span-2 flex flex-col justify-between py-0.5 text-xs space-y-2">
          <div>
            <span className="text-[10px] font-mono uppercase text-zinc-500 block">Location</span>
            <p className="font-medium text-zinc-200 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
              <span>{proof.locationNote}</span>
            </p>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-zinc-500 block">GPS Telemetry</span>
            <p className="font-mono text-[11px] text-zinc-400 mt-0.5">{proof.gpsCoordinates}</p>
          </div>

          <div className="text-[11px] text-zinc-500">
            Note: <span className="text-zinc-300">{proof.receivedBy}</span>
          </div>
        </div>
      </div>

      {/* Verification Checklist */}
      <div className="p-4 bg-zinc-900 border-b border-zinc-800">
        <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5 mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
          <span>Cannot locate package? Check these first:</span>
        </span>

        <div className="space-y-1.5">
          {checklist.map((item) => (
            <label
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className="flex items-start gap-2.5 p-2 rounded-lg bg-zinc-950/60 border border-zinc-800 hover:border-zinc-700 cursor-pointer text-xs text-zinc-300"
            >
              <input
                type="checkbox"
                checked={!!checkedItems[item.id]}
                onChange={() => {}}
                className="mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-500"
              />
              <span className={checkedItems[item.id] ? 'line-through text-zinc-500' : ''}>
                {item.text}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-3 bg-zinc-950/70 grid grid-cols-2 gap-2">
        <button
          onClick={onOpenDisputeModal}
          className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Report Missing</span>
        </button>

        <button
          onClick={onOpenSupport}
          className="py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-200 text-xs font-semibold border border-zinc-700 transition-colors flex items-center justify-center gap-1.5"
        >
          <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
          <span>Contact Carrier</span>
        </button>
      </div>

      {/* Lightbox Modal */}
      {isPhotoOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsPhotoOpen(false)}
        >
          <div
            className="relative max-w-lg w-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 border-b border-zinc-800 flex items-center justify-between text-xs">
              <span className="font-mono text-zinc-200">Delivery Photo</span>
              <button
                onClick={() => setIsPhotoOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <Image
              src={proof.photoUrl}
              alt="Delivery proof"
              width={600}
              height={400}
              className="w-full max-h-[70vh] object-cover"
              unoptimized
            />
            <div className="p-3 bg-zinc-950 text-xs text-zinc-400 flex items-center justify-between">
              <span>{proof.locationNote}</span>
              <span className="font-mono text-[10px] text-zinc-500">{proof.gpsCoordinates}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
