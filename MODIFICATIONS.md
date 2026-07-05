# Modifications — Aramco Digital Network Operations (v2.1)

Three change requests from the review note (Note_2_Jul_2026) were implemented.

## 1. Single-frame date range picker (Tickets + Reports)
The two separate calendar inputs were replaced with one control that holds
**from → to inside a single frame**.

- New reusable component: `src/components/DateRange.jsx`
- `src/pages/Tickets.jsx` — the two "From"/"To" date boxes are now one `DateRange`.
- `src/components/PeriodSelector.jsx` — the Reports page "Custom" range (which
  previously showed two calendars) now uses the same single-frame `DateRange`,
  so both pages behave identically.
- Styling added in `src/styles.css` (`.date-range`, `.date-range-sep`).
- The picker also constrains the range (the "to" field can't precede "from").

## 2. Two clear containers on the Live Map
The status summary tiles are now grouped into two titled cards so it is obvious
which figures belong to engineers and which to sites.

- `src/pages/LiveMap.jsx` — the four engineer tiles sit in a **"Field Engineers"**
  container and the four site tiles in a **"Sites"** container (each with an icon
  and a total count).
- Styling added in `src/styles.css` (`.summary-box`, `.stat-tile`).
- Two icons added to `src/components/Icons.jsx` (`users`, `star`).

## 3. Hub star on the map + Hub ID / Hub coordinates on Site Details
- `src/data.js` — every site now carries a `hubId`. Hub sites reference
  themselves; every other site is assigned its region's hub (Central → RUH-0188,
  Eastern → DMM-0410). Helper `hubForSite(site)` resolves the hub record.
- `src/components/MapView.jsx` — hub sites render with a **★ star marker**
  (with a gold ring and "Hub" note in the popup) instead of the tower glyph.
  This applies to the Live Map and the Site Details mini-map.
- `src/pages/LiveMap.jsx` — legend now includes **⭐ Hub**.
- `src/pages/SiteDetails.jsx` — added **Hub ID** and **Hub Coordinates** to both
  the Site attributes grid and the Quick facts panel. For a site that is itself a
  hub, the Hub ID reads "<id> (this site)".

## Running the project
`node_modules` is not included (it is platform-specific). To run locally:

```
npm install
npm run dev      # development server
npm run build    # production build → dist/
npm run preview  # serve the built dist/
```

A fresh production build is already included in `dist/`.

---

# Round 2 — Review refinements

Based on the second review (localhost screenshots), three follow-ups were made.

## R2.1 Hub marker — keep the site logo, just flag it
The hub marker no longer replaces the tower with a star. It keeps the normal
🗼 site glyph and adds **both** cues: a **gold ring** around the marker and a
small **gold star badge** in the corner.
- `src/components/MapView.jsx` — tower glyph retained; star badge added.
- `src/styles.css` — `.site-hub` (gold ring) + `.site-hub-star` (corner badge).
- Sites roster rows on the Live Map also show a small gold star on the tower
  chip for hub sites (`.hub-badge`).

## R2.2 Live Map — one container per side
The status summary (top) and the roster list (bottom) are now combined into a
**single container** for engineers, and another single container for sites, so
the two areas are clearly distinguishable. (The yellow/cyan in the review was
only illustrative — subtle neutral containers with a thin top accent are used
instead: blue accent for engineers, green for sites.)
- `src/pages/LiveMap.jsx` — each side is one `.map-group` holding the header,
  status tiles, a divider, and the roster list.
- `src/styles.css` — `.map-group`, `.map-group-fe`, `.map-group-site`,
  `.map-group-sep`, `.map-group-sub`.

## R2.3 Admin — change a user's role
The Role column is now editable. A pencil button next to each role opens an
inline dropdown; the options are scoped to the user's side (Vendor → NOC /
Help Desk / FE, ISP → Head / Region Manager). Selecting a role updates the user.
- `src/pages/Admin.jsx` — `editingRoleId` state, `setUserRole`, inline `<select>`.
- `src/components/Icons.jsx` — added `edit` (pencil) icon.
- `src/styles.css` — `.role-cell`, `.role-edit-btn`, `.role-select`.

---

# Round 3 — Review refinements

## R3.1 Hub marker respects the condition color
The golden highlight no longer overrides the marker's condition color. The
border keeps its condition color (green = on air, red = outage, etc.) and the
gold appears as a soft double glow AROUND that border, plus the corner star
badge stays.
- `src/styles.css` — `.site-hub` no longer forces `border-color`; glow only.

## R3.2 One-calendar range picker (all pages)
The from/to selection is now ONE field that opens ONE calendar. Click a start
date, then an end date — the range is drawn as a band with green endpoints
(matching the reference screenshot). Clicking a date before the start swaps;
a third click starts a new range. Includes month navigation, hover preview,
today outline, Clear and Done, Esc/outside-click to close.
- `src/components/DateRange.jsx` — fully rewritten as a popover calendar.
  Same props as before, so the Tickets page and the Reports/Dashboard period
  selector (both use this component) upgraded automatically.
- `src/styles.css` — `.drp-*` styles; removed the old two-input styles.

## R3.3 Admin-only "Administration" sidebar item (no backend)
A client-side session is created at sign-in and drives role-based UI:
- `src/session.js` — new demo session module. `signIn(identifier)` matches the
  entered email/ID against admin accounts; everyone else gets the default NOC
  session. Swap this for the real auth response when a backend exists.
- Admin accounts: `admin@aramcodigital.com` (or ID `admin` / `U-1000`) and
  `sara.alamri@aramcodigital.com` (Head role, which has Admin access in the
  role matrix).
- `src/components/Sidebar.jsx` — shows an "Administration" item (shield icon)
  only when `session.isAdmin`; footer shows the signed-in user.
- `src/components/Topbar.jsx` — avatar reflects the session.
- `src/pages/Login.jsx` — sign-in (form, SSO) sets the session; the old
  "Open Admin Console" button became "Sign in as Administrator (demo)" with a
  hint listing the admin account.
- `src/pages/Admin.jsx` — non-admin sessions see an "Access restricted" notice.
