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
  FileCheck,
  ShieldAlert,
} from 'lucide-react';
import { useToast } from './Toast';

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
  const { showToast } = useToast();
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const checklist = [
    { id: 1, text: 'Checked around porch, behind potted plants, and inside parcel lockbox' },
    { id: 2, text: 'Checked with neighbors, building lobby, or reception/concierge' },
    { id: 3, text: 'Allowed 30-minute buffer (some drivers scan upon arriving in block)' },
  ];

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDownloadProof = () => {
    showToast('Delivery verification document generated (#DLV-PROOF-8821)', 'info');
  };

  return (
    <div className="mx-4 sm:mx-5 mb-4 rounded-2xl border border-rose-500/40 bg-zinc-900/90 overflow-hidden shadow-lg">
      {/* Proof Header */}
      <div className="bg-gradient-to-r from-blue-600/20 via-zinc-900 to-zinc-950 p-4 border-b border-zinc-800">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/30">
            Requirement 2 • Missing Delivery Resolution
          </span>
          <span className="text-[11px] font-mono text-zinc-400">{proof.deliveredAt}</span>
        </div>
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <PackageCheck className="w-5 h-5 text-blue-400 shrink-0" />
          <span>Proof of Delivery Recorded</span>
        </h2>
        <p className="text-xs text-zinc-300 mt-1">
          Courier confirmed drop-off. If you do not have the package, follow resolution steps below.
        </p>
      </div>

      {/* Proof of Delivery Details with Photo Stamp */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 bg-zinc-950/60 border-b border-zinc-800">
        {/* Photo Thumbnail */}
        <div className="sm:col-span-1 relative group cursor-pointer" onClick={() => setIsPhotoOpen(true)}>
          <div className="h-28 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700 relative">
            <Image
              src={proof.photoUrl}
              alt="Proof of delivery captured by courier"
              width={200}
              height={120}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-semibold text-white flex items-center gap-1 bg-black/60 px-2 py-1 rounded-lg">
                <Maximize2 className="w-3 h-3" /> View Photo
              </span>
            </div>
            <div className="absolute bottom-1.5 left-1.5 bg-black/70 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-mono text-zinc-200 flex items-center gap-1">
              <Camera className="w-3 h-3 text-blue-400" /> Driver Stamp
            </div>
          </div>
        </div>

        {/* Location & GPS Info */}
        <div className="sm:col-span-2 flex flex-col justify-between py-0.5 space-y-2">
          <div>
            <span className="text-[10px] font-mono uppercase text-zinc-400 block">
              Recorded Drop Location
            </span>
            <p className="text-xs font-semibold text-zinc-200 mt-0.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>{proof.locationNote}</span>
            </p>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-zinc-400 block">
              Driver GPS Telemetry
            </span>
            <p className="text-[11px] font-mono text-zinc-300 bg-zinc-900/90 px-2 py-1 rounded border border-zinc-800 mt-0.5">
              {proof.gpsCoordinates}
            </p>
          </div>

          <div className="text-[11px] text-zinc-400">
            Recipient Note: <span className="text-zinc-300">{proof.receivedBy}</span>
          </div>
        </div>
      </div>

      {/* Guided Verification Checklist */}
      <div className="p-4 bg-zinc-900/40 border-b border-zinc-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Before Filing a Claim, Please Check:</span>
          </span>
          <span className="text-[10px] font-mono text-zinc-400">
            {Object.values(checkedItems).filter(Boolean).length}/3 checked
          </span>
        </div>

        <div className="space-y-1.5">
          {checklist.map((item) => (
            <label
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className="flex items-start gap-2.5 p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-colors text-xs text-zinc-300"
            >
              <input
                type="checkbox"
                checked={!!checkedItems[item.id]}
                onChange={() => {}}
                className="mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-500 focus:ring-blue-500/20"
              />
              <span className={checkedItems[item.id] ? 'line-through text-zinc-500' : ''}>
                {item.text}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Resolution CTA: Report Missing Order */}
      <div className="p-4 bg-gradient-to-b from-rose-950/20 to-zinc-950/90 space-y-2.5">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
          <span className="text-xs font-bold text-rose-300 uppercase tracking-wider font-mono">
            Package Still Not Found?
          </span>
        </div>
        <p className="text-xs text-zinc-300 leading-relaxed">
          You are fully protected under our <strong>Guaranteed Delivery Shield</strong>. If your
          package is missing, file a dispute now for an immediate free reshipment or 100% refund.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          <button
            onClick={onOpenDisputeModal}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors shadow-lg active:scale-[0.99]"
          >
            <AlertCircle className="w-4 h-4" />
            <span>Report Package Not Received</span>
          </button>

          <button
            onClick={onOpenSupport}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs border border-zinc-700 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
            <span>Call Courier Station</span>
          </button>
        </div>

        <button
          onClick={handleDownloadProof}
          className="w-full text-center text-[11px] font-mono text-zinc-400 hover:text-zinc-200 transition-colors pt-1 flex items-center justify-center gap-1"
        >
          <FileCheck className="w-3.5 h-3.5 text-zinc-400" />
          <span>Save Proof of Delivery Certificate (#DLV-PROOF-8821)</span>
        </button>
      </div>

      {/* Lightbox Modal for Photo */}
      {isPhotoOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsPhotoOpen(false)}
        >
          <div
            className="relative max-w-lg w-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 border-b border-zinc-800 flex items-center justify-between text-xs">
              <span className="font-mono text-zinc-200">Courier Drop Timestamp: {proof.deliveredAt}</span>
              <button
                onClick={() => setIsPhotoOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <Image
              src={proof.photoUrl}
              alt="Full size delivery proof"
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
