export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  /** Path under /public to a representative cover photo for this post. */
  coverImage: string;
  coverImageAlt: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "air-freight-vs-ocean-freight-choosing-right-mode",
    title: "Air Freight vs. Ocean Freight: How to Choose the Right Mode for Your Shipment",
    excerpt:
      "Choosing between air and ocean freight depends on urgency, cost, cargo type, and destination. Learn the key factors to decide which mode fits your business needs.",
    content: `When it comes to international shipping, choosing between air and ocean freight is one of the most important decisions you'll make. Each mode has distinct advantages depending on your priorities.

## Speed vs. Cost

Air freight is the fastest option, with typical transit times of 1-5 days for international shipments. Ocean freight, on the other hand, takes 2-6 weeks depending on the route. If your cargo is time-sensitive (perishable goods, high-demand retail inventory, emergency parts), air freight is the clear choice.

However, ocean freight costs 4-6 times less per kilogram than air freight. For bulk shipments where timeline flexibility exists, ocean freight delivers significant cost savings.

## Cargo Considerations

Air freight has strict weight and size limitations. Standard aircraft cargo holds can accommodate pallets up to 1.5m × 3.2m, and weight limits vary by aircraft type. Ocean freight handles virtually any cargo size, from a single pallet to thousands of containers.

Hazardous materials, oversized cargo, and heavy machinery typically require ocean freight due to aircraft restrictions. Meanwhile, high-value electronics, pharmaceuticals, and fashion goods often travel by air to minimize theft risk and reduce inventory holding costs.

## When to Choose Air Freight

- Urgent shipments with tight deadlines
- High-value, low-volume cargo
- Perishable goods requiring climate control
- Just-in-time inventory replenishment
- Shipments to landlocked destinations

## When to Choose Ocean Freight

- Large or heavy cargo
- Cost-sensitive shipments
- Non-urgent replenishment stock
- Oversized or project cargo
- Regular, recurring shipments on established lanes

## The Hybrid Approach

Many successful supply chains use both modes strategically. Air freight handles urgent replenishment while ocean freight manages baseline inventory. This hybrid approach optimizes both cost and responsiveness.

At LogiMove, we help clients design multi-modal solutions that balance speed and cost. Our team analyzes your shipment patterns and recommends the optimal mix of air and ocean freight for your specific needs.`,
    publishedAt: "2026-08-15",
    readTime: "5 min read",
    category: "Shipping Modes",
    tags: ["air freight", "ocean freight", "shipping modes", "logistics strategy"],
    coverImage: "/images/logistics/blog-air-vs-ocean.jpg",
    coverImageAlt: "A Cargolux Boeing 747 cargo freighter climbing after takeoff.",
  },
  {
    slug: "customs-clearance-documentation-guide",
    title: "Customs Clearance 101: Essential Documents for International Shipping",
    excerpt:
      "Missing or incorrect customs documentation is the #1 cause of shipment delays. Here's a complete guide to the documents you need for smooth border crossings.",
    content: `Customs clearance is the process of getting goods through international borders legally and efficiently. Proper documentation is critical: even minor errors can cause delays, fines, or shipment seizure.

## Core Documents Required

### 1. Commercial Invoice
The commercial invoice is the foundation of customs documentation. It must include:
- Full names and addresses of shipper and consignee
- Detailed description of goods (not generic terms)
- Quantity and unit price
- Total value and currency
- Incoterms (FOB, CIF, DDP, etc.)
- Country of origin

### 2. Packing List
A detailed packing list accompanies the commercial invoice and describes:
- Number of packages
- Weight and dimensions of each package
- Contents of each package
- Marks and numbers for identification

### 3. Bill of Lading (Ocean) or Air Waybill (Air)
This document serves as:
- A receipt for the cargo
- Evidence of the carriage contract
- A document of title (for ocean freight)

### 4. Certificate of Origin
Some countries require proof of where goods were manufactured. This can affect:
- Duty rates (preferential vs. standard)
- Trade agreement eligibility
- Import restrictions

## Country-Specific Requirements

Each country has unique import regulations. Common additional documents include:
- Phytosanitary certificates (agricultural products)
- Safety data sheets (chemicals)
- Test certificates (electronics, textiles)
- Import licenses (controlled goods)

## Common Mistakes to Avoid

1. **Vague descriptions**: "Electronics" is insufficient. Specify "wireless Bluetooth speakers, model XYZ"
2. **Incorrect valuation**: Must match the commercial invoice exactly
3. **Missing signatures**: All documents require proper authorization
4. **Wrong HS codes**: Harmonized System codes determine duty rates
5. **Expired certificates**: Many documents have validity periods

## How LogiMove Helps

Our licensed customs brokers handle documentation end-to-end. We:
- Pre-check all documents before shipment
- Classify goods with accurate HS codes
- Manage duty calculations and payments
- Coordinate with customs authorities
- Resolve issues in real-time via WhatsApp

Proper documentation isn't just about compliance. It's about speed. Well-prepared shipments clear customs in hours, not days.`,
    publishedAt: "2026-08-10",
    readTime: "6 min read",
    category: "Customs & Compliance",
    tags: ["customs", "documentation", "compliance", "import", "export"],
    coverImage: "/images/logistics/blog-customs-docs.jpg",
    coverImageAlt: "A hand signing a customs document on a clipboard.",
  },
  {
    slug: "reduce-shipping-costs-optimization-tips",
    title: "7 Proven Ways to Reduce Your International Shipping Costs",
    excerpt:
      "From consolidating shipments to optimizing packaging, these strategies can cut your logistics costs by 15-30% without sacrificing service quality.",
    content: `International shipping costs eat into margins, but smart optimization can yield significant savings. Here are seven proven strategies we've seen work across hundreds of client accounts.

## 1. Consolidate Shipments

Instead of sending multiple small shipments, consolidate them into fewer, larger ones. LCL (Less than Container Load) shipments cost more per unit than FCL (Full Container Load). If you're shipping more than 15 cubic meters regularly, FCL is almost always cheaper.

**Action item**: Review your last 3 months of shipments and identify consolidation opportunities.

## 2. Optimize Packaging

Overpackaging wastes space and increases dimensional weight charges. Work with your logistics provider to:
- Right-size boxes for your products
- Use void-fill alternatives (air pillows vs. packing peanuts)
- Stack efficiently on pallets
- Consider flat-pack options where possible

## 3. Negotiate Volume Rates

Carriers offer significant discounts for volume commitments. If you ship regularly on the same lanes, negotiate annual contracts. Even a 5% rate improvement compounds significantly over time.

## 4. Choose Incoterms Wisely

The Incoterms you negotiate affect who pays for what:
- **FOB** (Free on Board): You control freight costs from port
- **CIF** (Cost, Insurance, Freight): Seller covers to destination port
- **DDP** (Delivered Duty Paid): Seller covers everything

Understanding which Incoterms give you the most cost control is key.

## 5. Reduce Demurrage and Detention

Demurrage (container at port) and detention (container outside port) fees add up fast. Prevent them by:
- Having customs clearance ready before arrival
- Scheduling pickup promptly
- Maintaining accurate documentation

## 6. Leverage Trade Agreements

Many countries have free trade agreements that reduce or eliminate duties. If your goods qualify under rules of origin, you can save 5-25% on duties.

## 7. Use a Freight Forwarder

A good freight forwarder consolidates buying power across multiple clients. We negotiate rates that individual shippers can't access, and we pass those savings to you.

## Real Results

Our clients typically see 15-30% cost reduction within the first year of optimization. The key is systematic analysis: not just chasing the lowest rate, but optimizing the entire supply chain.`,
    publishedAt: "2026-08-05",
    readTime: "5 min read",
    category: "Cost Optimization",
    tags: ["cost reduction", "optimization", "freight rates", "supply chain"],
    coverImage: "/images/logistics/blog-reduce-costs.jpg",
    coverImageAlt: "An overhead view of warehouse workers moving inventory between shelves.",
  },
  {
    slug: "supply-chain-resilience-strategies",
    title: "Building Supply Chain Resilience: Lessons from Global Disruptions",
    excerpt:
      "Recent global events have exposed fragile supply chains. Learn how to build redundancy, flexibility, and visibility into your logistics operations.",
    content: `The past few years have taught every supply chain professional the same lesson: resilience isn't optional. From port congestion to geopolitical disruptions, the ability to adapt quickly separates thriving businesses from struggling ones.

## The Cost of Fragility

Supply chain disruptions cost businesses an average of $184 million annually. Beyond direct costs, companies face:
- Lost sales and customer trust
- Increased carrying costs
- Emergency sourcing at premium rates
- Contract penalties and SLA breaches

## Four Pillars of Resilience

### 1. Diversified Sourcing

Relying on a single supplier or region creates single points of failure. Resilient supply chains:
- Maintain 2-3 qualified suppliers per critical component
- Source from multiple geographic regions
- Have backup logistics providers for key lanes

### 2. Strategic Inventory

The "just-in-time" model works until it doesn't. Consider:
- Safety stock for critical items (2-4 weeks buffer)
- Pre-positioned inventory near key markets
- Vendor-managed inventory programs

### 3. Real-Time Visibility

You can't manage what you can't see. Invest in:
- GPS tracking across all shipments
- Automated exception alerts
- Dashboard visibility into inventory levels
- Predictive analytics for demand planning

### 4. Flexible Logistics

Build optionality into your logistics network:
- Multi-modal capabilities (air, ocean, road)
- Multiple port options for key lanes
- Cross-docking and transshipment options
- Emergency air freight budgets

## Practical Steps

**Week 1**: Map your supply chain end-to-end. Identify single points of failure.
**Week 2**: Assess your inventory strategy. Where are the biggest gaps?
**Week 3**: Evaluate your logistics partners. Do you have backup options?
**Week 4**: Create an incident response playbook. Who does what when disruption hits?

## How LogiMove Supports Resilience

We help clients build resilient supply chains by:
- Offering multi-modal solutions on every lane
- Providing real-time tracking and proactive alerts
- Maintaining relationships with multiple carriers
- Offering flexible warehousing and distribution

The goal isn't to eliminate all risk. It's to build the capacity to respond quickly when disruptions occur.`,
    publishedAt: "2026-07-28",
    readTime: "6 min read",
    category: "Supply Chain Strategy",
    tags: ["supply chain", "resilience", "risk management", "strategy"],
    coverImage: "/images/logistics/blog-supply-chain.jpg",
    coverImageAlt: "A large container ship docked at an industrial port surrounded by cranes.",
  },
  {
    slug: "ecommerce-cross-border-shipping-guide",
    title: "Cross-Border E-Commerce Shipping: A Complete Guide for Online Sellers",
    excerpt:
      "Expanding internationally? Here's everything you need to know about cross-border shipping, from customs to last-mile delivery.",
    content: `Cross-border e-commerce is growing at 25% annually, but many sellers hesitate because international shipping seems complex. Here's a straightforward guide to getting it right.

## Understanding the Basics

Cross-border shipping involves moving goods from one country to another for e-commerce fulfillment. Unlike traditional B2B freight, e-commerce shipments are typically:
- Smaller parcels (under 30 kg)
- Higher frequency
- Consumer-facing (branded unboxing experience matters)
- Time-sensitive (customers expect fast delivery)

## Key Decisions

### 1. Fulfillment Model

**Direct shipping**: Ship from your home country. Simple but slow and expensive for distant markets.

**Local warehousing**: Store inventory in target markets. Faster delivery but higher carrying costs.

**Hybrid**: Use direct shipping for long-tail items and local warehousing for bestsellers.

### 2. Customs and Duties

Two models for handling customs:
- **DDP (Delivered Duty Paid)**: You pay all duties and taxes. Customer sees one price, no surprises at delivery.
- **DDU/DAP (Delivered Duty Unpaid)**: Customer pays duties on delivery. Lower upfront cost but creates friction and returns.

DDP is strongly preferred for customer experience. Build duty costs into your pricing.

### 3. Last-Mile Delivery

The final delivery leg varies dramatically by country. Options include:
- National postal services (cheapest, slowest)
- Private carriers (DHL, FedEx, UPS): reliable but expensive
- Local couriers (market-specific, often best value)
- Pickup points and lockers (growing in Europe and Asia)

## Documentation Requirements

E-commerce shipments need:
- Commercial invoice with accurate product descriptions
- HS codes for duty calculation
- Country of origin declaration
- Customer contact information for customs clearance

## Common Pitfalls

1. **Incorrect product descriptions**: "Gift" or "sample" won't fool customs
2. **Undervaluation**: Customs fines far exceed duty savings
3. **Ignoring restricted items**: Some products require import licenses
4. **No tracking**: Customers need visibility into international shipments
5. **Returns complexity**: Plan for cross-border returns from day one

## Getting Started with LogiMove

We help e-commerce sellers:
- Set up international shipping workflows
- Navigate customs requirements
- Find cost-effective last-mile solutions
- Manage returns across borders
- Scale fulfillment as orders grow

The key is starting with one market, optimizing, then expanding. Don't try to ship everywhere on day one.`,
    publishedAt: "2026-07-20",
    readTime: "7 min read",
    category: "E-Commerce",
    tags: ["e-commerce", "cross-border", "shipping", "fulfillment", "customs"],
    coverImage: "/images/logistics/blog-ecommerce.jpg",
    coverImageAlt: "An open delivery van packed with cardboard parcels ready for shipment.",
  },
];
