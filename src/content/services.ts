export interface Service {
  code: string;
  name: string;
  short: string;
  description: string;
  /** Lucide icon name — resolved in the UI layer. */
  icon: "Plane" | "Ship" | "Container" | "Truck" | "Warehouse" | "ShieldCheck";
  features: string[];
}

export const services: Service[] = [
  {
    code: "AIR_FREIGHT",
    name: "Air Freight",
    short: "Express air cargo for time-critical shipments worldwide.",
    description:
      "Fast, tracked air freight for urgent and high-value cargo. We secure competitive carrier rates and manage door-to-door delivery across all major trade lanes.",
    icon: "Plane",
    features: [
      "Express & standard air options",
      "Door-to-door or airport-to-airport",
      "Live shipment tracking",
      "Dangerous-goods handling on request",
    ],
  },
  {
    code: "OCEAN_FCL",
    name: "Ocean Freight — Full Container Load",
    short: "Dedicated FCL containers for large, cost-efficient volumes.",
    description:
      "Full container load (FCL) shipments with dedicated space, reliable schedules, and competitive rates on the world's busiest ocean routes.",
    icon: "Container",
    features: [
      "20' and 40' containers, dry & reefer",
      "Fixed sailing schedules",
      "Port-to-port or door-to-door",
      "Reefer and special equipment",
    ],
  },
  {
    code: "OCEAN_LCL",
    name: "Ocean Freight — Less than Container Load",
    short: "Shared containers for smaller shipments at economical rates.",
    description:
      "Less than container load (LCL) consolidation lets you ship smaller volumes economically, with cargo consolidated at origin and de-consolidated at destination.",
    icon: "Ship",
    features: [
      "Consolidation at major ports",
      "Pay only for the space you use",
      "Weekly sailings on key lanes",
      "Breakbulk handling included",
    ],
  },
  {
    code: "ROAD",
    name: "Road Freight",
    short: "Flexible trucking for regional and cross-border moves.",
    description:
      "FTL and LTL road transport across borders, with GPS tracking, customs-aware routing, and consistent transit times for regional distribution.",
    icon: "Truck",
    features: [
      "FTL & LTL options",
      "Cross-border expertise",
      "GPS-tracked fleet",
      "Time-definite delivery",
    ],
  },
  {
    code: "WAREHOUSING",
    name: "Warehousing & Distribution",
    short: "Secure storage, fulfillment, and last-mile distribution.",
    description:
      "Storage, inventory management, and distribution that keep your goods close to where they sell.",
    icon: "Warehouse",
    features: [
      "Secure, bonded & general storage",
      "Inventory management",
      "Picking, packing & labeling",
      "Nationwide distribution",
    ],
  },
  {
    code: "CUSTOMS",
    name: "Customs Clearance",
    short: "Expert brokerage that keeps your cargo moving across borders.",
    description:
      "Licensed customs brokers handle documentation, duties, and compliance so your shipments clear smoothly at every border crossing.",
    icon: "ShieldCheck",
    features: [
      "Licensed brokerage team",
      "Duty & tax calculation",
      "Tariff classification",
      "Compliance documentation",
    ],
  },
];

export type ServiceCode = (typeof services)[number]["code"];
