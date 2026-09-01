export interface FaqCategory {
  id: string;
  name: string;
  items: FaqItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqCategory[] = [
  {
    id: "shipping",
    name: "Shipping & Rates",
    items: [
      {
        question: "How do I get a shipping quote?",
        answer:
          "Use the Contact page or the WhatsApp button, tell us the service, origin, and destination, and our team will send a tailored quote — usually within a few hours on business days.",
      },
      {
        question: "Which shipping method is right for me?",
        answer:
          "Air freight is fastest for urgent, high-value cargo. Ocean FCL suits large volumes, while LCL is economical for smaller shipments. Road and rail are great for regional moves. Tell us your timeline and budget and we'll recommend the best fit.",
      },
      {
        question: "Do you ship to my destination country?",
        answer:
          "We cover most major trade lanes worldwide. Send us your origin and destination and we'll confirm transit time, service levels, and any restrictions before you book.",
      },
    ],
  },
  {
    id: "customs",
    name: "Customs & Documentation",
    items: [
      {
        question: "Who handles customs clearance?",
        answer:
          "Our licensed customs brokers prepare and file all documentation and handle duties and taxes, so your cargo clears smoothly at every border crossing.",
      },
      {
        question: "What documents do I need to ship?",
        answer:
          "Typically a commercial invoice, packing list, and bill of lading or airway bill. We'll provide a checklist specific to your shipment and destination during booking.",
      },
      {
        question: "Will I be charged import duties?",
        answer:
          "Import duties and taxes depend on the destination country and the goods' classification. We calculate estimates before you ship and can advise on incoterms like DDP to manage costs.",
      },
    ],
  },
  {
    id: "tracking",
    name: "Tracking & Delivery",
    items: [
      {
        question: "How do I track my shipment?",
        answer:
          "Every shipment gets a tracking number with real-time status updates across all legs. You'll receive the link when your cargo is booked.",
      },
      {
        question: "How long will my shipment take?",
        answer:
          "Transit times vary by mode and route — air freight is days, ocean is weeks, and road/rail depends on distance. We confirm exact estimates before you book.",
      },
      {
        question: "What happens if my shipment is delayed?",
        answer:
          "We monitor every shipment proactively and notify you immediately if anything changes. Our team works to reroute or expedite and keeps you informed until delivery.",
      },
    ],
  },
  {
    id: "billing",
    name: "Billing & Support",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept bank transfer, and for eligible customers, payment by card or letter of credit. Your account manager will confirm the options for your shipment.",
      },
      {
        question: "Can I contact someone outside business hours?",
        answer:
          "Yes — WhatsApp is our primary channel and messages are answered quickly, including outside standard hours. Our team is also available by phone and email.",
      },
    ],
  },
];
