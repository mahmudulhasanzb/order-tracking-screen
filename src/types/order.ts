export type OrderScenario =
  | 'out_for_delivery'
  | 'delayed'
  | 'delivered_unreceived'
  | 'tracking_pending'
  | 'loading'
  | 'error';

export type StepState = 'completed' | 'current' | 'upcoming' | 'delayed' | 'pending';

export interface TimelineStep {
  id: string;
  title: string;
  subtitle: string;
  state: StepState;
  timestamp?: string;
  location?: string;
  description: string;
  badge?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  variant: string;
  quantity: number;
  price: number;
  imageUrl: string;
  sku: string;
}

export interface CarrierInfo {
  name: string;
  service: string;
  trackingNumber: string;
  statusUrl?: string;
  phone: string;
  supportHours: string;
}

export interface CourierDriver {
  name: string;
  vehicle: string;
  plate: string;
  rating: number;
  completedDeliveries: number;
  avatar: string;
  stopsAway: number;
  liveStatus: string;
  contactPhone: string;
}

export interface DeliveryAddress {
  recipient: string;
  street: string;
  apartment?: string;
  cityStateZip: string;
  deliveryInstructions: string;
  accessCode?: string;
}

export interface ProofOfDelivery {
  deliveredAt: string;
  locationNote: string;
  receivedBy: string;
  photoUrl: string;
  gpsCoordinates: string;
}

export interface DelayTelemetry {
  category: 'weather' | 'logistics' | 'customs';
  headline: string;
  reason: string;
  originalEstimate: string;
  revisedEstimate: string;
  currentHub: string;
  apologyCreditCode: string;
  creditAmount: string;
}

export interface TrackingPendingTelemetry {
  stage: string;
  orderedAt: string;
  expectedDispatch: string;
  carrierPartner: string;
  warehouseLocation: string;
  currentActivity: string;
}

export interface OrderData {
  orderId: string;
  scenario: OrderScenario;
  statusTitle: string;
  statusHeadline: string;
  statusDescription: string;
  badgeLabel: string;
  badgeColor: 'emerald' | 'amber' | 'blue' | 'purple' | 'red' | 'zinc';
  estimatedDeliveryDate: string;
  estimatedDeliveryWindow: string;
  placedAt: string;
  paymentMethod: string;
  carrier: CarrierInfo;
  address: DeliveryAddress;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
  timeline: TimelineStep[];
  driver?: CourierDriver;
  proofOfDelivery?: ProofOfDelivery;
  delayDetails?: DelayTelemetry;
  pendingDetails?: TrackingPendingTelemetry;
}

export interface SupportClaim {
  claimId: string;
  orderId: string;
  reason: string;
  preferredResolution: 'reship' | 'refund' | 'investigate';
  customerNote: string;
  createdAt: string;
  status: 'submitted' | 'under_review' | 'resolved';
}
