'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { OrderScenario, OrderData } from '@/types/order';
import { mockOrders } from '@/data/mockOrders';
import { ToastProvider } from '@/components/Toast';
import { ScenarioSwitcher } from '@/components/ScenarioSwitcher';
import { HeaderNav } from '@/components/HeaderNav';
import { StatusHero } from '@/components/StatusHero';
import { LiveCourierCard } from '@/components/LiveCourierCard';
import { DelayedActionCard } from '@/components/DelayedActionCard';
import { DeliveredUnreceivedCard } from '@/components/DeliveredUnreceivedCard';
import { TrackingPendingCard } from '@/components/TrackingPendingCard';
import { TimelineProgress } from '@/components/TimelineProgress';
import { QuickActionsRow } from '@/components/QuickActionsRow';
import { ProductSummaryCard } from '@/components/ProductSummaryCard';
import { DeliveryAddressCard } from '@/components/DeliveryAddressCard';
import { BottomActionBar } from '@/components/BottomActionBar';
import { SupportModal } from '@/components/SupportModal';
import { DisputeClaimModal } from '@/components/DisputeClaimModal';
import { RescheduleModal } from '@/components/RescheduleModal';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { ErrorStateCard } from '@/components/ErrorStateCard';
import { Wifi, Battery } from 'lucide-react';

function OrderTrackingContent() {
  const searchParams = useSearchParams();
  const initialScenario = (searchParams.get('scenario') as OrderScenario) || 'out_for_delivery';

  const [currentScenario, setCurrentScenario] = useState<OrderScenario>(initialScenario);
  const [isMobileFrame, setIsMobileFrame] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Modals
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);

  // Simulated temporary loading state when switching
  const [isLoadingTransition, setIsLoadingTransition] = useState(false);

  const handleScenarioChange = (scenario: OrderScenario) => {
    setIsLoadingTransition(true);
    setCurrentScenario(scenario);
    setTimeout(() => {
      setIsLoadingTransition(false);
    }, 280);
  };

  const activeOrder: OrderData | undefined =
    currentScenario !== 'loading' && currentScenario !== 'error'
      ? mockOrders[currentScenario]
      : mockOrders.out_for_delivery;

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${
        isDarkMode ? 'dark bg-zinc-950 text-zinc-100' : 'bg-zinc-100 text-zinc-900'
      }`}
    >
      {/* Top Reviewer / Evaluator Control Bar */}
      <ScenarioSwitcher
        currentScenario={currentScenario}
        onSelectScenario={handleScenarioChange}
        isMobileFrame={isMobileFrame}
        onToggleMobileFrame={() => setIsMobileFrame(!isMobileFrame)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Showcase Container */}
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-6 lg:p-8">
        <div
          className={`w-full transition-all duration-300 ${
            isMobileFrame
              ? 'max-w-[420px] rounded-[48px] border-[10px] border-zinc-900 dark:border-zinc-800 shadow-[0_25px_70px_rgba(0,0,0,0.6)] overflow-hidden bg-white dark:bg-zinc-950 relative my-auto ring-1 ring-white/10'
              : 'max-w-2xl rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl overflow-hidden'
          }`}
        >
          {/* Mobile Hardware Frame Simulation (Status bar & Dynamic Island) */}
          {isMobileFrame && (
            <div className="w-full bg-white dark:bg-zinc-950 pt-2.5 pb-1 px-7 flex items-center justify-between text-zinc-800 dark:text-zinc-200 select-none z-40 border-b border-zinc-100 dark:border-zinc-900/60">
              <span className="text-xs font-semibold font-mono tracking-tight">9:41</span>

              {/* Dynamic Island pill */}
              <div className="w-24 h-4 bg-black rounded-full mx-auto relative flex items-center justify-end px-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4" />
              </div>
            </div>
          )}

          {/* Screen Body */}
          <div className="flex flex-col min-h-[720px] max-h-[85vh] overflow-y-auto no-scrollbar relative">
            {/* Header Navigation */}
            <HeaderNav
              orderId={activeOrder?.orderId || 'ORD-89241-NX'}
              badgeLabel={activeOrder?.badgeLabel || 'ON SCHEDULE'}
              badgeColor={activeOrder?.badgeColor || 'emerald'}
              onOpenSupport={() => setIsSupportModalOpen(true)}
              onResetView={() => handleScenarioChange('out_for_delivery')}
            />

            {/* State Handling: Loading */}
            {(currentScenario === 'loading' || isLoadingTransition) && <LoadingSkeleton />}

            {/* State Handling: Error */}
            {currentScenario === 'error' && !isLoadingTransition && (
              <ErrorStateCard
                onRetry={() => handleScenarioChange('out_for_delivery')}
                onOpenSupport={() => setIsSupportModalOpen(true)}
              />
            )}

            {/* Standard and Adaptive Order Tracking Screen Content */}
            {currentScenario !== 'loading' &&
              currentScenario !== 'error' &&
              !isLoadingTransition &&
              activeOrder && (
                <div className="flex-1 flex flex-col pb-4">
                  {/* Status Hero: Delivery progress & estimated arrival date/time at a glance */}
                  <StatusHero
                    order={activeOrder}
                    onOpenReportModal={() => setIsDisputeModalOpen(true)}
                    onOpenSupportModal={() => setIsSupportModalOpen(true)}
                    onScrollToTimeline={() => {
                      const el = document.getElementById('delivery-timeline');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />

                  {/* 1. Delayed Order State Specifics (Requirement 1) */}
                  {currentScenario === 'delayed' && activeOrder.delayDetails && (
                    <DelayedActionCard
                      delay={activeOrder.delayDetails}
                      onOpenSupport={() => setIsSupportModalOpen(true)}
                      onOpenReschedule={() => setIsRescheduleModalOpen(true)}
                      onExpediteRequest={() => {}}
                    />
                  )}

                  {/* 2. Delivered but Not Received Specifics (Requirement 2) */}
                  {currentScenario === 'delivered_unreceived' && activeOrder.proofOfDelivery && (
                    <DeliveredUnreceivedCard
                      proof={activeOrder.proofOfDelivery}
                      onOpenDisputeModal={() => setIsDisputeModalOpen(true)}
                      onOpenSupport={() => setIsSupportModalOpen(true)}
                    />
                  )}

                  {/* 3. Tracking Not Available Yet Specifics (Requirement 3) */}
                  {currentScenario === 'tracking_pending' && activeOrder.pendingDetails && (
                    <TrackingPendingCard
                      pending={activeOrder.pendingDetails}
                      onOpenSupport={() => setIsSupportModalOpen(true)}
                    />
                  )}

                  {/* On-Track Live Courier specifics */}
                  {currentScenario === 'out_for_delivery' && activeOrder.driver && (
                    <LiveCourierCard
                      driver={activeOrder.driver}
                      onOpenSupport={() => setIsSupportModalOpen(true)}
                    />
                  )}

                  {/* Quick Action Navigation Grid */}
                  <QuickActionsRow
                    onOpenSupport={() => setIsSupportModalOpen(true)}
                    onOpenReport={() => setIsDisputeModalOpen(true)}
                    orderId={activeOrder.orderId}
                  />

                  {/* Visual Delivery Progress & Timeline Milestones */}
                  <TimelineProgress
                    steps={activeOrder.timeline}
                  />

                  {/* Order / Product Summary with images and price breakdown */}
                  <ProductSummaryCard order={activeOrder} />

                  {/* Delivery Address & Driver Instructions */}
                  <DeliveryAddressCard
                    address={activeOrder.address}
                    carrier={activeOrder.carrier}
                  />
                </div>
              )}

            {/* Bottom Sticky Action Bar */}
            {currentScenario !== 'loading' && currentScenario !== 'error' && activeOrder && (
              <BottomActionBar
                order={activeOrder}
                onOpenSupport={() => setIsSupportModalOpen(true)}
                onOpenDispute={() => setIsDisputeModalOpen(true)}
                onOpenReschedule={() => setIsRescheduleModalOpen(true)}
              />
            )}
          </div>
        </div>
      </main>

      {/* Interactive Modals */}
      {activeOrder && (
        <>
          <SupportModal
            isOpen={isSupportModalOpen}
            onClose={() => setIsSupportModalOpen(false)}
            orderId={activeOrder.orderId}
            scenario={currentScenario}
          />

          <DisputeClaimModal
            isOpen={isDisputeModalOpen}
            onClose={() => setIsDisputeModalOpen(false)}
            orderId={activeOrder.orderId}
            orderTotal={activeOrder.total}
            initialReason={
              currentScenario === 'delivered_unreceived'
                ? 'Delivered but Not Received'
                : currentScenario === 'delayed'
                ? 'Transit Delay Exceeds Guarantee'
                : undefined
            }
          />

          <RescheduleModal
            isOpen={isRescheduleModalOpen}
            onClose={() => setIsRescheduleModalOpen(false)}
            orderId={activeOrder.orderId}
          />
        </>
      )}
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <ToastProvider>
      <Suspense fallback={<LoadingSkeleton />}>
        <OrderTrackingContent />
      </Suspense>
    </ToastProvider>
  );
}
