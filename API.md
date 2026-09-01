# API Architecture (API.md)

**Project:** LogiMove Logistics — Corporate Website
**Version:** 1.0
**Status:** Draft for review — v1 is **fully static**; these endpoints are the future-facing
contract and are not all implemented yet.
**Date:** 2026-08-04

---

## 1. Design Principles

1. **Envelope-first.** Every response uses one consistent JSON envelope.
2. **Validation at the edge.** Every request body is validated with a typed schema before any
   handler logic runs.
3. **Versioned.** All routes live under `/api/v1/`.
4. **Public by default, protected when stateful.** Read-only marketing content is public; write
   and admin operations require auth.
5. **Future-proof contract.** The v1 static site implements the *client* side of the same
   shapes (see §7) so switching to server endpoints later is additive.

---

## 2. Base URL & Conventions

```
Base URL:  https://logimove.example.com/api/v1
Content:   application/json; charset=utf-8
Versioning: v1 in the path. Breaking changes → new major version.
```

### 2.1 Standard response envelope

```jsonc
// Success
{ "success": true, "data": { }, "error": null, "meta": { } }

// Failure
{ "success": false, "data": null, "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [ ... ] }, "meta": { } }
```

- `meta` carries pagination `{ total, page, limit }` and rate-limit headers info.
- All error `details` entries are machine-readable field paths (e.g. `"body.email"`).

---

## 3. Authentication Strategy (future-ready)

| Aspect | Design |
|--------|--------|
| Auth method | **JWT** (short-lived access token 15 min + refresh token 14 d, httpOnly cookie or `Authorization: Bearer`) |
| Hashing | Argon2id for passwords (never bcrypt-plain, never plaintext) |
| Roles | `admin`, `editor`, `sales`, `support` (see `ERD.md` → `users`) |
| Scopes | Role-based: `content:read`, `content:write`, `leads:read`, `leads:write`, `users:manage` |
| Public routes | `GET /services`, `GET /testimonials`, `GET /partners`, `GET /faqs`, `GET /stats`, `POST /contact`, `POST /quotes` |
| Protected routes | All `/admin/**`, `POST/PATCH/DELETE` on content and lead resources |
| Rate limiting | Per IP + per token; token bucket (e.g. 60 req/min public, 120 req/min authed) |

Auth endpoints (future):
| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/login` | Email + password → tokens |
| POST | `/auth/refresh` | Rotate refresh token |
| POST | `/auth/logout` | Revoke refresh token |
| POST | `/auth/forgot-password` | Send reset link |

---

## 4. Endpoints

### 4.1 Content (public, read-only)

**`GET /services`** — list active services
```jsonc
// Response data
{ "items": [ { "id": "…", "code": "AIR_FREIGHT", "name": "Air Freight", "description": "…", "icon": "plane" } ] }
```

**`GET /services/:code`** — single service detail.

**`GET /testimonials`** — published testimonials
```jsonc
{ "items": [ { "id": "…", "content": "…", "rating": 5, "customerName": "…", "position": "…", "serviceCode": "AIR_FREIGHT" } ] }
```

**`GET /partners`** — active partners `{ items: [ { id, name, logoUrl, websiteUrl } ] }`.

**`GET /faqs`** — FAQ items grouped by category
```jsonc
{ "items": [ { "id": "…", "category": "Shipping", "question": "…", "answer": "…" } ] }
```

**`GET /stats`** — homepage statistics `{ items: [ { id, value, suffix, label } ] }`.

### 4.2 Leads (public write)

**`POST /contact`** — create a contact request
```jsonc
// Request body
{
  "name": "Daniel Okafor",
  "company": "Acme Retail Ltd.",
  "email": "daniel@acme.example",
  "phone": "+1 234 555 0199",
  "message": "Looking for ocean freight rates to Rotterdam."
}
```
```jsonc
// Response data (201)
{ "id": "…", "status": "new", "createdAt": "2026-08-04T13:00:00Z" }
```

**`POST /quotes`** — create a quote request
```jsonc
// Request body
{
  "customer": { "name": "…", "company": "…", "email": "…", "phone": "…" },
  "serviceCode": "OCEAN_FCL",
  "origin": "Shanghai",
  "destination": "Los Angeles",
  "weightKg": "12500",
  "volumeCbm": "58",
  "incoterm": "FOB",
  "notes": "…"
}
```
```jsonc
// Response data (201)
{ "id": "…", "quoteRef": "QT-2026-081", "status": "pending", "createdAt": "…" }
```

### 4.3 Future (protected / admin)

| Method | Path | Scope |
|--------|------|-------|
| GET/POST/PATCH/DELETE | `/admin/services` | `content:write` |
| GET/POST/PATCH/DELETE | `/admin/testimonials`, `/admin/partners`, `/admin/faqs` | `content:write` |
| GET/PATCH | `/admin/leads` (contact_requests) | `leads:read` / `leads:write` |
| GET/PATCH | `/admin/quotes` | `leads:read` / `leads:write` |
| GET | `/admin/shipments/:trackingNumber` | `leads:read` |
| GET | `/shipments/:trackingNumber` | public (future tracking portal) |

**Pagination** (GET lists): `?page=1&limit=20` → `meta: { total, page, limit }`.

---

## 5. Validation

All bodies validated with **Zod** schemas shared between server and (future) client.

### 5.1 `contactSchema`
```ts
{ name: string().trim().min(2).max(120),
  company: string().trim().max(120).optional(),
  email: string().trim().email().max(254),
  phone: string().trim().regex(/^\+?[0-9 ()-]{7,20}$/).optional(),
  message: string().trim().min(1).max(2000) }
```

### 5.2 `quoteSchema`
```ts
{ customer: z.object({ name: …, company: ….optional(), email: email(), phone: ….optional() }),
  serviceCode: z.enum(["AIR_FREIGHT","OCEAN_FCL","OCEAN_LCL","ROAD","RAIL","EXPRESS"]).optional(),
  origin: string().min(2).max(120), destination: string().min(2).max(120),
  weightKg: z.union([z.string(), z.number()]).optional(),
  volumeCbm: z.union([z.string(), z.number()]).optional(),
  incoterm: z.enum(["EXW","FOB","CIF","DDP","DAP"]).optional(),
  notes: string().max(2000).optional() }
```

Validation failure → `400 VALIDATION_ERROR` with per-field details.

---

## 6. Error Codes

| Code | HTTP | Meaning |
|------|------|---------|
| `VALIDATION_ERROR` | 400 | Schema violation; `details` lists fields |
| `UNAUTHORIZED` | 401 | Missing/invalid/expired token |
| `FORBIDDEN` | 403 | Valid token, insufficient scope |
| `NOT_FOUND` | 404 | Resource or route missing |
| `RATE_LIMITED` | 429 | Too many requests; honor `Retry-After` |
| `CONFLICT` | 409 | Duplicate (e.g., email already exists) |
| `INTERNAL_ERROR` | 500 | Unexpected; never leaks internals in `message` |

Error body always: `{ success:false, data:null, error:{ code, message, details? }, meta:{} }`.

---

## 7. WhatsApp Integration Flow (v1 — client-side)

WhatsApp is the **primary contact channel** in v1. The flow is 100% client-side and requires no
API.

### 7.1 Click-to-Chat format (official)

```
https://wa.me/<PHONE>?text=<URL-ENCODED-MESSAGE>
```

- `<PHONE>` = digits only (country code + number, no `+`, spaces, or parentheses).
- Destination number comes **only** from configuration:

```ts
// src/config/site.ts (single source of truth)
export const site = {
  whatsappNumber: "12345550199",          // E.164 digits only
  whatsappDisplay: "+1 234 555-0199",
  siteUrl: "https://logimove.example.com",
  // ...
}
```

### 7.2 Contact form processing (`src/lib/whatsapp.ts`)

1. User fills **Name, Company, Email, Phone, Message** and clicks **Contact Us**.
2. Client validates against `contactSchema` (mirrored in TS). On failure: inline field errors.
3. On success, build a structured, pre-filled message:

```text
Hello LogiMove! 👋
Name: Daniel Okafor
Company: Acme Retail Ltd.
Email: daniel@acme.example
Phone: +1 234 555-0199

Message:
Looking for ocean freight rates to Rotterdam.
```

4. `encodeURIComponent(message)` → `window.open("https://wa.me/12345550199?text=" + encoded, "_blank")`.
5. Show `aria-live` confirmation ("Opening WhatsApp…").
6. Fallback: a **copy-to-clipboard** button + `mailto:` link if the user is on desktop without
   WhatsApp Web.

> v1 does **not** call any server. The same payload shape maps directly to
> `POST /api/v1/contact` when a backend lands (see `ERD.md` → `contact_requests`).

### 7.3 Quote request flow

Identical mechanics to contact, with a quote-specific template:

```text
Hello LogiMove! I'd like a quote.
Service: Ocean FCL
Origin: Shanghai
Destination: Los Angeles
Weight: 12500 kg | Volume: 58 cbm | Incoterm: FOB
Name: … | Email: … | Phone: …

Notes:
…
```

- A "Get a Quote" CTA on a service card pre-selects `serviceCode` in the template.
- Contact page accepts `?service=OCEAN_FCL` to pre-fill the service line.

### 7.4 Floating WhatsApp button
- Rendered from the same `whatsappNumber` config with a generic greeting
  (`"Hello LogiMove! I'd like to ask about your services."`).
- Present on all pages; `aria-label="Contact us on WhatsApp"`.

---

## 8. Future Server Flow (when API ships)

1. `POST /contact` / `POST /quotes` persist to `contact_requests` / `quotes`.
2. A webhook/email provider notifies the sales team (and the WhatsApp Business API can send a
   templated reply).
3. Admin UI (protected) lists leads with status transitions `new → assigned → quoted → won/lost`.
4. Public tracking: `GET /shipments/:trackingNumber` reads `shipment_events`.

---

## 9. Security & Operational Notes

- Rate limiting on all public writes; honeypot field on forms for bot mitigation.
- CORS restricted to the site origin.
- Security headers via host config (see `TRD.md` §5).
- All responses cacheable per resource; public GETs served from CDN cache.
- Structured logging for errors: `{ reqId, method, path, status, durationMs }`.

---

*End of API.*
