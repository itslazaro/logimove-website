export interface Partner {
  id: string;
  name: string;
  category: string;
  websiteUrl?: string;
}

/** Text-based partner logos (typographic marks) — no external logo assets in v1. */
export const partners: Partner[] = [
  { id: "p1", name: "Maersk Line", category: "Ocean carrier" },
  { id: "p2", name: "DHL Global Forwarding", category: "Air partner" },
  { id: "p3", name: "Kuehne+Nagel", category: "Sea-air alliance" },
  { id: "p4", name: "UPS Supply Chain", category: "Road network" },
  { id: "p5", name: "DB Schenker", category: "Rail partner" },
  { id: "p6", name: "CMA CGM", category: "Ocean carrier" },
];
