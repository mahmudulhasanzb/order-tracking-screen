'use client';

import React, { useState } from 'react';
import {
  X,
  ShieldAlert,
  CheckCircle2,
  RotateCcw,
  DollarSign,
  Search,
  FileCheck,
  Loader2,
  Clock,
} from 'lucide-react';
import { useToast } from './Toast';

interface DisputeClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  orderTotal: number;
  initialReason?: string;
}

export function DisputeClaimModal({
  isOpen,
  onClose,
  orderId,
  orderTotal,
  initialReason,
}: DisputeClaimModalProps) {
  const { showToast } = useToast();
  const [reason, setReason] = useState<string>(
    initialReason || 'Delivered but Not Received'
  );
  const [resolution, setResolution] = useState<'reship' | 'refund' | 'investigate'>('reship');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedClaim, setSubmittedClaim] = useState<{
    claimId: string;
    sla: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedClaimId = `CLM-${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmittedClaim({
        claimId: generatedClaimId,
        sla: 'Within 2 hours',
      });
      setIsSubmitting(false);
      showToast(`Claim ${generatedClaimId} registered successfully!`, 'success');
    }, 1200);
  };

  const handleDownloadReceipt = () => {
    showToast(`Claim certificate #${submittedClaim?.claimId} saved.`, 'info');
  };

  const handleResetAndClose = () => {
    setSubmittedClaim(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-zinc-900 border border-zinc-700/80 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Delivery Resolution Desk</h3>
              <p className="text-[11px] text-zinc-400 font-mono">Order {orderId} • Claim Protection</p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submittedClaim ? (
          /* Confirmation Screen */
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                Claim Registered
              </span>
              <h4 className="text-lg font-bold text-white mt-2">
                Protection Case {submittedClaim.claimId}
              </h4>
              <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto leading-relaxed">
                Your claim has been submitted and auto-prioritized under our Customer Guarantee. A
                dedicated support specialist will finalize resolution within {submittedClaim.sla}.
              </p>
            </div>

            {/* Claim Summary Box */}
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">Selected Issue:</span>
                <span className="font-semibold text-zinc-200">{reason}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Requested Outcome:</span>
                <span className="font-semibold text-emerald-400 uppercase font-mono text-[11px]">
                  {resolution === 'reship'
                    ? 'Free Express Replacement'
                    : resolution === 'refund'
                    ? `Full Refund ($${orderTotal.toFixed(2)})`
                    : 'Courier Investigation'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Response SLA:</span>
                <span className="font-mono text-zinc-300 font-semibold">{submittedClaim.sla}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleDownloadReceipt}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-200 text-xs font-semibold border border-zinc-700 transition-colors"
              >
                <FileCheck className="w-3.5 h-3.5 text-zinc-400" />
                <span>Save Claim Receipt</span>
              </button>

              <button
                onClick={handleResetAndClose}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Dispute Form */
          <form onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto space-y-4">
            {/* Step 1: Reason */}
            <div>
              <label className="text-xs font-semibold text-zinc-200 block mb-2">
                1. What is the delivery issue?
              </label>
              <div className="space-y-1.5 text-xs">
                {[
                  'Delivered but Not Received (Package missing at delivery location)',
                  'Transit Delay Exceeds Guarantee (Need revised shipment)',
                  'Package Arrived Damaged / Box Crushed',
                  'Wrong Delivery Address / Delivered to Wrong Residence',
                ].map((item) => (
                  <label
                    key={item}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                      reason === item.split(' (')[0]
                        ? 'bg-rose-500/10 border-rose-500/40 text-white font-medium'
                        : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="claimReason"
                      value={item.split(' (')[0]}
                      checked={reason === item.split(' (')[0]}
                      onChange={(e) => setReason(e.target.value)}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 2: Preferred Resolution */}
            <div>
              <label className="text-xs font-semibold text-zinc-200 block mb-2">
                2. How would you like us to resolve this?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {/* Option 1: Free Reshipment */}
                <button
                  type="button"
                  onClick={() => setResolution('reship')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between gap-1 transition-all ${
                    resolution === 'reship'
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/30'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <RotateCcw className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="font-bold text-zinc-100 block">Free Replacement</span>
                    <span className="text-[10px] text-zinc-400 leading-tight block mt-0.5">
                      Priority Next-Day Air reshipment
                    </span>
                  </div>
                </button>

                {/* Option 2: 100% Refund */}
                <button
                  type="button"
                  onClick={() => setResolution('refund')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between gap-1 transition-all ${
                    resolution === 'refund'
                      ? 'bg-rose-500/15 border-rose-500 text-rose-300 ring-1 ring-rose-500/30'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <DollarSign className="w-4 h-4 text-rose-400" />
                  <div>
                    <span className="font-bold text-zinc-100 block">Full Refund</span>
                    <span className="text-[10px] text-zinc-400 leading-tight block mt-0.5">
                      ${orderTotal.toFixed(2)} to payment method
                    </span>
                  </div>
                </button>

                {/* Option 3: Investigation */}
                <button
                  type="button"
                  onClick={() => setResolution('investigate')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between gap-1 transition-all ${
                    resolution === 'investigate'
                      ? 'bg-blue-500/15 border-blue-500 text-blue-300 ring-1 ring-blue-500/30'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <Search className="w-4 h-4 text-blue-400" />
                  <div>
                    <span className="font-bold text-zinc-100 block">Trace Driver</span>
                    <span className="text-[10px] text-zinc-400 leading-tight block mt-0.5">
                      Supervisor GPS verification
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 3: Optional notes */}
            <div>
              <label className="text-xs font-semibold text-zinc-200 block mb-1">
                3. Additional details or location note:
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Looked at front porch, mailbox, and neighbor door. Nothing was left."
                rows={2}
                className="w-full p-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500 resize-none"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between gap-3">
              <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                <span>Protected under buyer shield</span>
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="py-2.5 px-5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-lg disabled:opacity-50"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{isSubmitting ? 'Registering Claim...' : 'Submit Official Claim'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
