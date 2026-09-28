# Mobile Order Tracking & Delivery Intelligence Screen

A modern, professional mobile order tracking experience for e-commerce, engineered to replace ambiguous 4-stage tracking (`Processing`, `Shipped`, `Out for Delivery`, `Delivered`) with glanceable arrival intelligence, transparent milestone telemetry, and proactive problem resolution.

Built to strictly address all requirements in [`REQUIREMENTS.md`](./REQUIREMENTS.md).

---

## 🚀 Live Demo & Repository
- **GitHub Repository**: [https://github.com/mahmudulhasanzb/order-tracking-screen](https://github.com/mahmudulhasanzb/order-tracking-screen)
- **Live Deployment**: Ready for immediate deployment on Vercel / Netlify (`bun run build` validated with zero errors).

---

## 🎯 How Core Requirements & Edge Cases Are Solved

The user interface adapts seamlessly to all three required situations while maintaining a unified, intuitive product experience:

| Scenario / Edge Case | Problem Identified | Solution & Next Steps Provided | Evaluator Trigger |
| :--- | :--- | :--- | :--- |
| **1. Delayed Order** | Customer anxiety when ETA passes or transit stalls without explanation. | • High-visibility **Transit Delay Notice** with exact root cause (*Severe thunderstorm FAA ground hold at Chicago O'Hare Hub*).<br>• Strikethrough original ETA with **bold revised delivery window**.<br>• **$20 Store Credit Apology Voucher** (`DELAYCARE-20`) with 1-click copy.<br>• Actionable next steps: **Reschedule delivery date/time**, **Request rush priority courier flag**, or **Connect with delay resolution agent**. | Click **Delayed Order** pill in top evaluator bar. |
| **2. Delivered but Not Received** | Package marked "Delivered" but customer cannot find it at their door. | • **Recorded Proof of Delivery** section with courier timestamp, drop description (*Front Porch / Mail Vestibule near planter*), and driver scanner GPS coordinates.<br>• **Expandable Photo Stamp Lightbox** showing actual parcel drop photo.<br>• **3-Point Guided Search Checklist** (perimeter check, neighbor/reception check, 30m scanner buffer).<br>• **1-Click Dispute Claim Filing**: Opens interactive modal granting **Free Express Reshipment** or **100% Refund**, producing verified reference ID (`#CLM-89241`). | Click **Delivered (Not Received)** pill in top evaluator bar. |
| **3. Tracking Not Available Yet** | Order placed but carrier has not generated a tracking number; prevents empty/broken screen. | • Replaces empty screens with **Real-Time Fulfillment Pipeline** (Payment Verified → Picking & Boxing active now → Courier Manifest Sync scheduled).<br>• Warehouse facility telemetry (*Secaucus Robotic Center, Aisle 14-C*).<br>• **Instant Tracking Alert Toggle**: User can subscribe their phone number to receive an automatic SMS link with live driver map the second the parcel is scanned.<br>• Reassurance notice confirming estimated delivery date window (*Oct 1 - Oct 2*). | Click **Tracking Pending** pill in top evaluator bar. |
| **On-Track / Out for Delivery** | Standard happy path delivery experience. | • **Live Courier Telemetry Card**: Driver Marcus Vance (4.94 ★, 3,820 deliveries), Mercedes Sprinter Van.<br>• Real-time distance pill: *4 stops away (~22 mins arrival)*.<br>• **Vector Route Map Graphic** with dynamic SVG path, courier pin, and destination beacon.<br>• Quick actions: Call Driver & Send Doorbell Instructions. | Click **Out for Delivery** pill in top evaluator bar. |
| **Loading & Error Resilience** | Slow networks or carrier API sync timeouts. | • **Pulsing Skeleton Loader** mirroring exact card geometry.<br>• **Offline / Sync Failure Screen** with retry mechanism and direct helpline. | Click **Loading State** / **Error State** in top bar. |

---

## ✨ Key Features & UX Polish

1. **Glanceable Status Hero**:
   - Clear, oversized delivery estimate (*e.g., Today, Sep 28 • 2:15 PM - 3:45 PM*).
   - Real-time beacon status dot with live stage progress bar (Stage 4 of 5, 75%).
   - Carrier and tracking number pill with 1-tap copy and toast confirmation.

2. **Milestone Delivery Timeline**:
   - Replaces vague status words with detailed milestones showing exact timestamp, facility location, and descriptive notes.
   - Expand / collapse toggle for technical scan logs.

3. **Product & Order Summary**:
   - Product thumbnails, item titles, variants, SKUs, and quantities.
   - Collapsible financial cost breakdown (Subtotal, Shipping, Tax, Discounts, Total Charged).
   - "Download Official Tax Invoice (PDF)" action and "Buy Again" reorder flow.

4. **Shipping Destination & Driver Instructions**:
   - Recipient and address with validation badge.
   - In-place editable driver delivery instructions with immediate persistence.
   - Gate access code indicator.

5. **24/7 Dedicated Support Concierge**:
   - **Interactive Live Chat**: Pre-loaded with order context, automated scenario responses, typing indicators, and supervisor escalation.
   - **Direct Carrier Line**: 1-tap toll-free hotline connection.
   - **Interactive FAQs**: Accordion answers for common parcel transit questions.

6. **Responsive Design & Evaluator Shell**:
   - Optimized specifically for **360px – 430px mobile viewports**.
   - Includes **Phone Frame (390px iPhone 16 Pro mockup)** with dynamic island and status bar, plus **Fluid Screen toggle** for full viewport inspection.
   - **Dark Mode & Light Mode** toggle.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 16.3.6 (App Router with Turbopack)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4 (CSS-first architecture)
- **Icons**: Lucide React
- **Typography**: Geist Sans & Geist Mono
- **Package Manager**: Bun 1.4.0

### File Architecture
```
src/
├── app/
│   ├── layout.tsx              # Metadata, fonts, and root container
│   ├── globals.css             # Tailwind v4 theme, custom scrollbars
│   └── page.tsx                # Main tracking showcase with scenario switcher
├── components/
│   ├── BottomActionBar.tsx     # Context-aware sticky mobile CTA bar
│   ├── DelayedActionCard.tsx   # Req 1: Delayed order resolution & voucher card
│   ├── DeliveredUnreceivedCard.tsx # Req 2: Proof photo, checklist, and claim trigger
│   ├── DeliveryAddressCard.tsx # Destination and editable driver instructions
│   ├── DisputeClaimModal.tsx   # Instant claim filing modal (replacement / refund)
│   ├── ErrorStateCard.tsx      # Network timeout & carrier retry card
│   ├── HeaderNav.tsx           # Mobile navigation with copy tracking ID
│   ├── LiveCourierCard.tsx     # Driver stats, telemetry, and vector route map
│   ├── LoadingSkeleton.tsx     # Shimmering loading placeholder
│   ├── ProductSummaryCard.tsx  # Product photos, specs, and price breakdown
│   ├── QuickActionsRow.tsx     # 1-tap support, report issue, and share links
│   ├── RescheduleModal.tsx     # Delivery window rescheduling dialog
│   ├── ScenarioSwitcher.tsx    # Evaluator top control bar for switching states
│   ├── StatusHero.tsx          # Large ETA and glanceable status banner
│   ├── SupportModal.tsx        # Live chat, call carrier, and FAQs
│   ├── TimelineProgress.tsx    # Multi-step progress bar and scan history
│   ├── Toast.tsx               # Non-intrusive feedback toast notifications
│   └── TrackingPendingCard.tsx # Req 3: Warehouse fulfillment & SMS alert toggle
├── data/
│   └── mockOrders.ts           # Realistic datasets for all 4 delivery states
└── types/
    └── order.ts                # TypeScript interfaces for orders, claims, and telemetry
```

---

## 💻 Local Setup & Development Instructions

### Prerequisites
- [Bun](https://bun.sh) (recommended) or Node.js 20+

### 1. Clone the repository
```bash
git clone https://github.com/mahmudulhasanzb/order-tracking-screen.git
cd order-tracking-screen
```

### 2. Install dependencies
```bash
bun install
# or
npm install
```

### 3. Run development server
```bash
bun run dev
# or
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production & validate
```bash
bun run build
# and verify linting:
bun run lint
```

---

## 📱 Evaluator Quick-Testing Guide
You can test each scenario either by clicking the pills in the top control bar or navigating via URL parameters:
- `http://localhost:3000?scenario=out_for_delivery` (Standard delivery with live courier map)
- `http://localhost:3000?scenario=delayed` (**Requirement 1**: Delayed order with voucher & reschedule)
- `http://localhost:3000?scenario=delivered_unreceived` (**Requirement 2**: Delivered but missing, with photo proof & claim filing)
- `http://localhost:3000?scenario=tracking_pending` (**Requirement 3**: Fulfillment in progress, SMS alert toggle)
