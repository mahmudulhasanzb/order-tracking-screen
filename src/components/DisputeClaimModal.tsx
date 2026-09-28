'use client';

import React, { useState } from 'react';
import {
  X,
  ShieldAlert,
  CheckCircle2,
  RotateCcw,
  DollarSign,
  Search,
  Loader2,
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
    initialReason || 'Package not received'
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
        sla: '2 hours',
      });
      setIsSubmitting(false);
      showToast(`Claim ${generatedClaimId} submitted`, 'success');
    }, 1000);
  };

  const handleResetAndClose = () => {
    setSubmittedClaim(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-zinc-900 border border-zinc-700/80 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <div>
              <h3 className="text-sm font-semibold text-white">Report Delivery Issue</h3>
              <p className="text-[10px] text-zinc-400 font-mono">Order {orderId}</p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submittedClaim ? (
          /* Confirmation Screen */
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-base font-semibold text-white">
                Claim Submitted ({submittedClaim.claimId})
              </h4>
              <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
                We have received your report. A support specialist will follow up within{' '}
                {submittedClaim.sla}.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-zinc-500">Issue:</span>
                <span className="text-zinc-200">{reason}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Requested Resolution:</span>
                <span className="text-emerald-400 font-medium">
                  {resolution === 'reship'
                    ? 'Free Replacement'
                    : resolution === 'refund'
                    ? `Full Refund ($${orderTotal.toFixed(2)})`
                    : 'Driver Investigation'}
                </span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-white text-xs font-semibold transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          /* Dispute Form */
          <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-4 text-xs">
            {/* Reason */}
            <div>
              <label className="font-semibold text-zinc-200 block mb-2">
                What is the issue?
              </label>
              <div className="space-y-1.5">
                {[
                  'Package marked delivered but not received',
                  'Order significantly delayed',
                  'Item damaged or tampered',
                ].map((item) => (
                  <label
                    key={item}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                      reason === item
                        ? 'bg-rose-500/10 border-rose-500/40 text-white font-medium'
                        : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="claimReason"
                      value={item}
                      checked={reason === item}
                      onChange={(e) => setReason(e.target.value)}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Resolution */}
            <div>
              <label className="font-semibold text-zinc-200 block mb-2">
                Preferred resolution:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setResolution('reship')}
                  className={`p-2.5 rounded-xl border text-left flex flex-col justify-between gap-1 transition-all ${
                    resolution === 'reship'
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <RotateCcw className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-zinc-100 text-[11px]">Free Replacement</span>
                </button>

                <button
                  type="button"
                  onClick={() => setResolution('refund')}
                  className={`p-2.5 rounded-xl border text-left flex flex-col justify-between gap-1 transition-all ${
                    resolution === 'refund'
                      ? 'bg-rose-500/15 border-rose-500 text-rose-300'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <DollarSign className="w-4 h-4 text-rose-400" />
                  <span className="font-semibold text-zinc-100 text-[11px]">Full Refund</span>
                </button>

                <button
                  type="button"
                  onClick={() => setResolution('investigate')}
                  className={`p-2.5 rounded-xl border text-left flex flex-col justify-between gap-1 transition-all ${
                    resolution === 'investigate'
                      ? 'bg-blue-500/15 border-blue-500 text-blue-300'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <Search className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold text-zinc-100 text-[11px]">Investigate</span>
                </button>
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="font-semibold text-zinc-200 block mb-1">
                Additional details (optional):
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Provide any helpful context..."
                rows={2}
                className="w-full p-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500 resize-none"
              />
            </div>

            {/* Submit */}
            <div className="pt-2 border-t border-zinc-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 rounded-xl text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold transition-colors flex items-center gap-1.5"
              >
                {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{isSubmitting ? 'Submitting...' : 'Submit Claim'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
