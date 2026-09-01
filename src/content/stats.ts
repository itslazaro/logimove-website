export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { id: "s1", value: 15, suffix: "+", label: "Years in logistics" },
  { id: "s2", value: 12000, suffix: "+", label: "Shipments delivered" },
  { id: "s3", value: 40, suffix: "+", label: "Partner carriers" },
  { id: "s4", value: 98, suffix: "%", label: "On-time delivery" },
];
