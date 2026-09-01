# Entity Relationship Document (ERD)

**Project:** LogiMove Logistics — Corporate Website
**Version:** 1.0
**Status:** Draft for review — v1 has **no database**; this model is the future-growth target.
**Date:** 2026-08-04

---

## 1. Purpose & Scope

v1 ships as a static site: marketing content lives in typed data files
(`src/content/**`) and the contact flow redirects to WhatsApp — nothing is persisted.

This document defines the **target relational model** so that a future CMS, admin panel,
quote engine, and shipment-tracking portal can be added without redesign. When a database is
introduced, the content files above become seed data.

**Conventions used below:**
- `PK` = primary key · `FK` = foreign key · `UQ` = unique · `idx` = recommended index.
- `timestamps` = `created_at`, `updated_at`.
- Enums are stored as constrained text/check values for readability.

---

## 2. Entity Relationship Diagram

```mermaid
erDiagram
    CUSTOMER ||--o{ CONTACT_REQUEST : "submits"
    CUSTOMER ||--o{ QUOTE : "requests"
    CUSTOMER ||--o{ SHIPMENT : "owns"
    CUSTOMER ||--o{ TESTIMONIAL : "provides"

    SERVICE ||--o{ QUOTE : "applies to"
    SERVICE ||--o{ TESTIMONIAL : "referenced by"

    QUOTE ||--o{ SHIPMENT : "converts to"
    SHIPMENT ||--o{ SHIPMENT_EVENT : "has timeline of"

    EMPLOYEE ||--o{ SHIPMENT : "assigned as handler"

    USER ||--o{ CONTACT_REQUEST : "reviews"
    USER ||--o{ QUOTE : "owns as sales owner"

    FAQ_ITEM }o--|| FAQ_CATEGORY : "belongs to"

    CUSTOMER {
        uuid id PK
        string full_name
        string company
        string email UQ
        string phone
        string country
        string tax_id
        boolean is_active
        timestamps
    }
    CONTACT_REQUEST {
        uuid id PK
        uuid customer_id FK
        uuid assigned_user_id FK
        string name
        string company
        string email
        string phone
        text message
        enum status
        enum source
        timestamps
    }
    SERVICE {
        uuid id PK
        string code UQ
        string name
        text description
        string icon
        boolean is_active
        int sort_order
        timestamps
    }
    QUOTE {
        uuid id PK
        uuid customer_id FK
        uuid service_id FK
        uuid sales_owner_id FK
        string origin
        string destination
        string mode
        string weight_kg
        string volume_cbm
        string incoterm
        decimal estimated_cost
        string currency
        enum status
        date valid_until
        timestamps
    }
    SHIPMENT {
        uuid id PK
        uuid quote_id FK
        uuid customer_id FK
        uuid handler_employee_id FK
        string tracking_number UQ
        enum status
        string origin
        string destination
        string carrier
        date estimated_delivery
        datetime delivered_at
        timestamps
    }
    SHIPMENT_EVENT {
        uuid id PK
        uuid shipment_id FK
        enum status
        string location
        text description
        datetime occurred_at
    }
    EMPLOYEE {
        uuid id PK
        string first_name
        string last_name
        enum role
        string email UQ
        string phone
        string department
        string photo_url
        boolean is_active
        timestamps
    }
    TESTIMONIAL {
        uuid id PK
        uuid customer_id FK
        uuid service_id FK
        text content
        smallint rating
        string position
        boolean is_published
        datetime published_at
        timestamps
    }
    PARTNER {
        uuid id PK
        string name
        string logo_url
        string website_url
        enum partnership_type
        boolean is_active
        int sort_order
        timestamps
    }
    USER {
        uuid id PK
        string email UQ
        string password_hash
        enum role
        boolean is_active
        datetime last_login_at
        timestamps
    }
    FAQ_ITEM {
        uuid id PK
        uuid category_id FK
        string question
        text answer
        int sort_order
        boolean is_active
        timestamps
    }
    FAQ_CATEGORY {
        uuid id PK
        string name
        string slug UQ
        int sort_order
    }
```

---

## 3. Entity Definitions

### 3.1 `customers`
People/companies who reach out. Created lazily (upsert on first contact or quote).

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | |
| full_name | varchar(120) | NOT NULL | |
| company | varchar(120) | NULL | Optional for individuals |
| email | varchar(254) | NOT NULL, UQ | Lowercased |
| phone | varchar(32) | NULL | E.164 preferred |
| country | varchar(64) | NULL | ISO country name/code |
| tax_id | varchar(64) | NULL | For B2B billing later |
| is_active | boolean | NOT NULL DEFAULT true | Soft-disable |
| timestamps | | | created_at, updated_at |

**Relationships:** 1—N `contact_requests`, 1—N `quotes`, 1—N `shipments`, 1—N `testimonials`.

### 3.2 `contact_requests`
Every inbound contact/WhatsApp lead. Even in v1 (client-side only) this table captures the same
shape a future API would persist.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | |
| customer_id | UUID | FK → customers | NULL until matched |
| assigned_user_id | UUID | FK → users | NULL; sales assignment |
| name | varchar(120) | NOT NULL | Snapshot (free text at capture time) |
| company | varchar(120) | NULL | |
| email | varchar(254) | NOT NULL | |
| phone | varchar(32) | NULL | |
| message | text | NULL | |
| status | enum | NOT NULL DEFAULT 'new' | new → assigned → quoted → won → lost |
| source | enum | NOT NULL DEFAULT 'contact_form' | contact_form, quote_form, whatsapp_button |
| timestamps | | | |

### 3.3 `services`
The service catalog rendered on Home/Services pages.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | |
| code | varchar(32) | UQ | e.g. `AIR_FREIGHT` |
| name | varchar(80) | NOT NULL | |
| description | text | NOT NULL | |
| icon | varchar(32) | NOT NULL | Lucide icon key |
| is_active | boolean | NOT NULL DEFAULT true | |
| sort_order | int | NOT NULL DEFAULT 0 | |
| timestamps | | | |

### 3.4 `quotes`
Quote requests. A future quote wizard writes here; the WhatsApp flow pre-fills the same fields.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | |
| customer_id | UUID | FK → customers | |
| service_id | UUID | FK → services | NULL if general inquiry |
| sales_owner_id | UUID | FK → users | Assigned sales rep |
| origin | varchar(120) | NOT NULL | |
| destination | varchar(120) | NOT NULL | |
| mode | enum | NOT NULL | air, ocean_fcl, ocean_lcl, road, rail, express |
| weight_kg | varchar/num | NULL | Free-text in v1 form |
| volume_cbm | varchar/num | NULL | |
| incoterm | varchar(16) | NULL | EXW, FOB, CIF, DDP… |
| estimated_cost | decimal(12,2) | NULL | |
| currency | varchar(3) | DEFAULT 'USD' | |
| status | enum | DEFAULT 'pending' | pending → quoted → accepted → rejected → expired |
| valid_until | date | NULL | Quote validity window |
| timestamps | | | |

### 3.5 `shipments`
Created when a quote converts to an actual shipment (future tracking feature).

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | |
| quote_id | UUID | FK → quotes | NULL if direct booking |
| customer_id | UUID | FK → customers | |
| handler_employee_id | UUID | FK → employees | Account/ops handler |
| tracking_number | varchar(64) | UQ, NOT NULL | Customer-facing |
| status | enum | NOT NULL | booked → in_transit → customs → delivered |
| origin | varchar(120) | NOT NULL | |
| destination | varchar(120) | NOT NULL | |
| carrier | varchar(80) | NULL | |
| estimated_delivery | date | NULL | |
| delivered_at | timestamp | NULL | |
| timestamps | | | |

### 3.6 `shipment_events`
Event-sourced timeline for a shipment (the "tracking history").

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | |
| shipment_id | UUID | FK → shipments | |
| status | enum | NOT NULL | Mirrors shipment.status |
| location | varchar(120) | NULL | Port / city / checkpoint |
| description | text | NULL | |
| occurred_at | timestamp | NOT NULL | Event time (may differ from insert) |

### 3.7 `employees`
Internal staff, exposed on the About page (leadership) and used for assignment.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | |
| first_name | varchar(80) | NOT NULL | |
| last_name | varchar(80) | NOT NULL | |
| role | enum | NOT NULL | ops, sales, management, executive |
| email | varchar(254) | NOT NULL, UQ | |
| phone | varchar(32) | NULL | |
| department | varchar(80) | NULL | |
| photo_url | varchar(255) | NULL | |
| is_active | boolean | DEFAULT true | |
| timestamps | | | |

### 3.8 `testimonials`
Social proof on Home. Each references an optional customer and optional service.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | |
| customer_id | UUID | FK → customers | NULL for anonymous |
| service_id | UUID | FK → services | NULL if general |
| content | text | NOT NULL | Quote body |
| rating | smallint | CHECK 1–5 | |
| position | varchar(120) | NULL | e.g. "Procurement Lead, Acme Corp" |
| is_published | boolean | DEFAULT false | Editorial gate |
| published_at | timestamp | NULL | |
| timestamps | | | |

### 3.9 `partners`
Carriers / strategic partners on Home. No inbound FK — standalone catalog.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | |
| name | varchar(120) | NOT NULL | |
| logo_url | varchar(255) | NULL | |
| website_url | varchar(255) | NULL | |
| partnership_type | enum | NULL | carrier, alliance, technology |
| is_active | boolean | DEFAULT true | |
| sort_order | int | DEFAULT 0 | |

### 3.10 `users` (admin/auth)
Staff accounts for the future admin panel. Kept separate from `employees`.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | UUID | PK | |
| email | varchar(254) | NOT NULL, UQ | |
| password_hash | varchar(255) | NOT NULL | Argon2/bcrypt, never plaintext |
| role | enum | NOT NULL | admin, editor, sales, support |
| is_active | boolean | DEFAULT true | |
| last_login_at | timestamp | NULL | |
| timestamps | | | |

### 3.11 `faq_items` & `faq_categories`
FAQ page content.

| Table | Columns | Notes |
|-------|---------|-------|
| faq_categories | id PK, name, slug UQ, sort_order | e.g. "Shipping", "Customs", "Billing" |
| faq_items | id PK, category_id FK, question, answer, sort_order, is_active, timestamps | |

---

## 4. Relationship Summary

| Relationship | Cardinality | Notes |
|--------------|-------------|-------|
| customer → contact_request | 1—N | One customer may contact many times |
| customer → quote | 1—N | Repeat requesters |
| customer → shipment | 1—N | Account-level view |
| customer → testimonial | 1—N | Editorial approval still required |
| service → quote | 1—N | Quotes reference one service (expandable to M—N later) |
| service → testimonial | 1—N | Optional attribution |
| quote → shipment | 1—N | One quote may yield multiple legs/shipments |
| shipment → shipment_event | 1—N | Timeline (event-sourced) |
| employee → shipment | 1—N | Handler assignment |
| user → contact_request / quote | 1—N | Sales ownership/assignment |
| faq_category → faq_item | 1—N | Grouping |

---

## 5. Indexes & Integrity

- `idx_contact_requests_status (status, created_at DESC)` — lead funnel queries.
- `idx_quotes_customer (customer_id, created_at DESC)` — customer history.
- `idx_quotes_status (status, valid_until)` — expiring quote sweep.
- `idx_shipments_tracking (tracking_number)` — lookup by tracking number (already UQ).
- `idx_shipment_events_shipment (shipment_id, occurred_at DESC)` — timeline reads.
- All FKs enforce `ON DELETE` policy: **SET NULL** for optional refs, **RESTRICT** for
  mandatory refs (never CASCADE on customer-facing data without review).
- Check constraints on every enum + rating range.

---

## 6. v1 → Future Mapping

| v1 artifact | Future entity |
|-------------|---------------|
| `src/content/services.ts` | seed → `services` |
| `src/content/testimonials.ts` | seed → `testimonials` |
| `src/content/partners.ts` | seed → `partners` |
| `src/content/faqs.ts` | seed → `faq_items` + `faq_categories` |
| Contact form fields (name, company, email, phone, message) | `contact_requests` |
| Quote pre-fill message | `quotes` |

---

*End of ERD. No database is created in v1; this schema guides the CMS/API phase.*
