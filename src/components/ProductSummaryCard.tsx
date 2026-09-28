'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { OrderData } from '@/types/order';
import {
  Package,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Download,
  RotateCcw,
} from 'lucide-react';
import { useToast } from './Toast';

interface ProductSummaryCardProps {
  order: OrderData;
}

export function ProductSummaryCard({ order }: ProductSummaryCardProps) {
  const { showToast } = useToast();
  const [showFullBreakdown, setShowFullBreakdown] = useState(false);

  const handleDownloadInvoice = () => {
    showToast(`Downloading official invoice for order ${order.orderId}...`, 'info');
  };

  const handleReorder = () => {
    showToast('Items added to cart! Proceed to checkout.', 'success');
  };

  return (
    <div className="mx-4 sm:mx-5 mb-4 rounded-2xl border border-zinc-800 bg-zinc-900/90 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Package className="w-4 h-4 text-emerald-400" />
            <span>Order Summary ({order.items.reduce((acc, i) => acc + i.quantity, 0)})</span>
          </h2>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Placed {order.placedAt}
          </p>
        </div>

        <button
          onClick={handleDownloadInvoice}
          className="flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white bg-zinc-800 px-2.5 py-1 rounded-lg border border-zinc-700/60 hover:bg-zinc-750 transition-colors"
          title="Download PDF invoice"
        >
          <Download className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden sm:inline">Invoice</span>
        </button>
      </div>

      {/* Item List */}
      <div className="p-4 space-y-3 divide-y divide-zinc-800/60">
        {order.items.map((item) => (
          <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700/60 shrink-0">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-bold text-zinc-100 truncate">{item.name}</h3>
              <p className="text-[11px] text-zinc-400 mt-0.5 truncate">{item.variant}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-1.5 py-0.2 rounded">
                  Qty: {item.quantity}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  SKU: {item.sku}
                </span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs font-bold font-mono text-white">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              {item.quantity > 1 && (
                <span className="text-[10px] font-mono text-zinc-400 block">
                  (${item.price.toFixed(2)} ea)
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Payment & Financial Summary */}
      <div className="p-4 bg-zinc-950/60 border-t border-zinc-800 space-y-2">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5 text-zinc-500" />
            <span>Paid via {order.paymentMethod}</span>
          </div>

          <button
            onClick={() => setShowFullBreakdown(!showFullBreakdown)}
            className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 hover:text-emerald-300"
          >
            <span>{showFullBreakdown ? 'Hide Breakdown' : 'Cost Breakdown'}</span>
            {showFullBreakdown ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        {/* Expandable Breakdown */}
        {showFullBreakdown && (
          <div className="pt-2 border-t border-zinc-800/80 space-y-1.5 text-xs text-zinc-300 animate-in fade-in">
            <div className="flex justify-between">
              <span className="text-zinc-400">Subtotal</span>
              <span className="font-mono">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Shipping</span>
              <span className="font-mono">
                {order.shippingCost === 0 ? 'FREE' : `$${order.shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Estimated Sales Tax</span>
              <span className="font-mono">${order.tax.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Promo Discount</span>
                <span className="font-mono">-${order.discount.toFixed(2)}</span>
              </div>
            )}
          </div>
        )}

        <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs">
          <span className="font-bold text-zinc-100">Total Charged</span>
          <span className="text-sm font-bold font-mono text-emerald-400">
            ${order.total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center justify-end gap-2">
        <button
          onClick={handleReorder}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-750 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
          <span>Buy Again</span>
        </button>
      </div>
    </div>
  );
}
