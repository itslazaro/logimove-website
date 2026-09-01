export interface Testimonial {
  id: string;
  content: string;
  rating: number;
  name: string;
  position: string;
  service: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    content:
      "LogiMove moved a full container from Shanghai to our LA warehouse ahead of schedule. Their customs team handled everything — zero delays at the border.",
    rating: 5,
    name: "Daniel Okafor",
    position: "Import Operations Manager, Acme Retail",
    service: "Ocean Freight — FCL",
  },
  {
    id: "t2",
    content:
      "The WhatsApp support is a game changer. I asked for a quote at 7am and had pricing before my morning coffee. That's how logistics should work.",
    rating: 5,
    name: "Maya Chen",
    position: "Founder, Form & Function Home",
    service: "Air Freight",
  },
  {
    id: "t3",
    content:
      "Reliable transit times and real-time tracking across every leg. Our cross-border trucking has never run this smoothly.",
    rating: 5,
    name: "Robert Lindqvist",
    position: "Procurement Lead, Nordvik Manufacturing",
    service: "Road Freight",
  },
  {
    id: "t4",
    content:
      "Their warehousing team reduced our storage costs by 18% while improving dispatch speed. Professional and transparent throughout.",
    rating: 4,
    name: "Sofia Marchetti",
    position: "Supply Chain Director, Bellini Group",
    service: "Warehousing & Distribution",
  },
];
