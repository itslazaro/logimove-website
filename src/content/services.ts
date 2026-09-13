export interface Service {
  code: string;
  name: string;
  short: string;
  description: string;
  /** Lucide icon name — resolved in the UI layer. */
  icon: "Plane" | "Ship" | "Container" | "Truck" | "Warehouse" | "ShieldCheck";
  features: string[];
  /** Path under /public to a representative photo for this service. */
  image: string;
  imageAlt: string;
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
    image: "/images/logistics/air-card.jpg",
    imageAlt: "Air cargo pallet being loaded into a jet.",
  },
  {
    code: "OCEAN_FCL",
    name: "Ocean Freight: Full Container Load",
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
    image: "/images/logistics/ocean.jpg",
    imageAlt: "A cargo ship navigating calm seas with stacked containers.",
  },
  {
    code: "OCEAN_LCL",
    name: "Ocean Freight: Less than Container Load",
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
    image: "/images/logistics/ocean-lcl.jpg",
    imageAlt: "The stern of a fully loaded container ship in port.",
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
    image: "/images/logistics/road-card.jpg",
    imageAlt: "A freight truck on an open highway at sunrise.",
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
    image: "/images/logistics/warehousing-card.jpg",
    imageAlt: "Warehouse staff reviewing inventory between pallet racks.",
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
    image: "/images/logistics/customs-doc-card.jpg",
    imageAlt: "A courier reviewing a customs document on a clipboard.",
  },
];

export type ServiceCode = (typeof services)[number]["code"];
