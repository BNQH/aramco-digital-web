// =============================================================
//  aramco digital — Network Operations Platform
//  Ticket-centric field-maintenance automation.
//  Tickets (PAT / CM / PMR) -> FE assignment (availability +
//  skills + proximity) -> SLA tracking. (Alarm feature removed.)
// =============================================================

// ---- Current user ----
export const user = {
  name: 'Ahmad Hudis',
  role: 'NOC Operator',
  perspective: 'Vendor',
  employeeId: '1003456',
  email: 'ahmad.hudis@aramcodigital.com',
  phone: '+966 50 123 4567',
  team: 'NOC — Central',
  initials: 'A',
}

// ---- Geo helper (great-circle km) ----
export const haversineKm = (a, b) => {
  const R = 6371, toRad = d => (d * Math.PI) / 180
  const dLat = toRad(b[0] - a[0]), dLng = toRad(b[1] - a[1])
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) ** 2
  return Math.round(2 * R * Math.asin(Math.sqrt(s)) * 10) / 10
}

export const regions = ['Central', 'Eastern', 'Western']
export const vendors = ['Ericsson', 'Nokia', 'Huawei', 'ZTE']
export const skillSet = ['RF', 'Transmission', 'Power', 'Fiber', 'Antenna/VSWR', 'BSS', 'IP/Core', 'Civil']

// ---- Site condition (replaces old "status") ----
export const siteConditionMeta = {
  'On air':      { dot: 'green', badge: 'badge-green' },
  'Degraded':    { dot: 'amber', badge: 'badge-amber' },
  'Outage':      { dot: 'red',   badge: 'badge-red' },
  'Maintenance': { dot: 'blue',  badge: 'badge-blue' },
  'Acceptance':  { dot: 'gray',  badge: 'badge-gray' },
}

// ---- Sites (full attribute set) ----
export const sites = [
  { id: 'RUH-0421', name: 'Olaya North', city: 'Riyadh', region: 'Central', coord: [24.6908, 46.6850], priority: 'P1', vendor: 'Ericsson', tech: ['4G', '5G'],
    condition: 'Outage', accepted: 'Yes', mc: 'Riyadh MC', accessType: 'Roof Top', transportType: 'Fiber', redundancyType: 'MW', isVip: 'Yes', isHub: 'No',
    feCoveredSiteId: 'RUH-0188', siteMaintainer: 'Bader', active: 'Yes', siteAddress: 'Olaya St, Riyadh', acceptanceDate: '2025-11-12', siteAccessType: 'Normal',
    lastPmr: '2026-03-12', nextPmr: '2026-09-12' },
  { id: 'RUH-0188', name: 'King Fahd Rd', city: 'Riyadh', region: 'Central', coord: [24.7205, 46.6700], priority: 'P1', vendor: 'Nokia', tech: ['4G', '5G'],
    condition: 'On air', accepted: 'Yes', mc: 'Riyadh MC', accessType: 'Roof Top', transportType: 'Fiber', redundancyType: 'MW', isVip: 'Yes', isHub: 'Yes',
    feCoveredSiteId: 'RUH-0421', siteMaintainer: 'Bader', active: 'Yes', siteAddress: 'King Fahd Rd, Riyadh', acceptanceDate: '2025-08-02', siteAccessType: 'Normal',
    lastPmr: '2026-02-02', nextPmr: '2026-08-02' },
  { id: 'RUH-0312', name: 'Diplomatic Quarter', city: 'Riyadh', region: 'Central', coord: [24.6790, 46.6210], priority: 'P2', vendor: 'Huawei', tech: ['4G'],
    condition: 'On air', accepted: 'Yes', mc: 'Riyadh MC', accessType: 'Greenfield', transportType: 'Fiber', redundancyType: '—', isVip: 'No', isHub: 'No',
    feCoveredSiteId: 'RUH-0099', siteMaintainer: 'Ahmad', active: 'Yes', siteAddress: 'DQ, Riyadh', acceptanceDate: '2025-06-20', siteAccessType: 'Permit',
    lastPmr: '2026-01-20', nextPmr: '2026-07-20' },
  { id: 'RUH-0507', name: 'Qurtubah East', city: 'Riyadh', region: 'Central', coord: [24.8000, 46.7900], priority: 'P3', vendor: 'Ericsson', tech: ['4G'],
    condition: 'Maintenance', accepted: 'Yes', mc: 'Riyadh MC', accessType: 'Roof Top', transportType: 'MW', redundancyType: 'MW', isVip: 'No', isHub: 'No',
    feCoveredSiteId: 'RUH-0640', siteMaintainer: 'Retal', active: 'Yes', siteAddress: 'Qurtubah, Riyadh', acceptanceDate: '2025-05-15', siteAccessType: 'Normal',
    lastPmr: '2025-12-15', nextPmr: '2026-06-15' },
  { id: 'RUH-0233', name: 'Namar West', city: 'Riyadh', region: 'Central', coord: [24.6100, 46.5400], priority: 'P2', vendor: 'ZTE', tech: ['4G', '5G'],
    condition: 'Degraded', accepted: 'Yes', mc: 'Riyadh MC', accessType: 'Greenfield', transportType: 'Fiber', redundancyType: 'MW', isVip: 'No', isHub: 'No',
    feCoveredSiteId: 'RUH-0099', siteMaintainer: 'Dania', active: 'Yes', siteAddress: 'Namar, Riyadh', acceptanceDate: '2026-01-05', siteAccessType: 'Normal',
    lastPmr: '2026-04-01', nextPmr: '2026-10-01' },
  { id: 'RUH-0640', name: 'Airport North', city: 'Riyadh', region: 'Central', coord: [24.9300, 46.7000], priority: 'P1', vendor: 'Nokia', tech: ['4G', '5G'],
    condition: 'Acceptance', accepted: 'No', mc: 'Riyadh MC', accessType: 'Greenfield', transportType: 'Fiber', redundancyType: 'MW', isVip: 'Yes', isHub: 'No',
    feCoveredSiteId: 'RUH-0188', siteMaintainer: 'Bader', active: 'No', siteAddress: 'Airport Rd, Riyadh', acceptanceDate: '—', siteAccessType: 'Permit',
    lastPmr: '—', nextPmr: '—' },
  { id: 'RUH-0099', name: 'Diriyah NW', city: 'Riyadh', region: 'Central', coord: [24.7370, 46.5750], priority: 'P3', vendor: 'Huawei', tech: ['4G'],
    condition: 'On air', accepted: 'Yes', mc: 'Riyadh MC', accessType: 'Roof Top', transportType: 'MW', redundancyType: '—', isVip: 'No', isHub: 'No',
    feCoveredSiteId: 'RUH-0312', siteMaintainer: 'Ahmad', active: 'Yes', siteAddress: 'Diriyah, Riyadh', acceptanceDate: '2025-09-28', siteAccessType: 'Normal',
    lastPmr: '2026-03-28', nextPmr: '2026-09-28' },
  { id: 'DMM-0410', name: 'Dammam Corniche', city: 'Dammam', region: 'Eastern', coord: [26.4207, 50.0888], priority: 'P1', vendor: 'Ericsson', tech: ['4G', '5G'],
    condition: 'Outage', accepted: 'Yes', mc: 'Dammam MC', accessType: 'Roof Top', transportType: 'Fiber', redundancyType: 'MW', isVip: 'Yes', isHub: 'Yes',
    feCoveredSiteId: 'KHB-0277', siteMaintainer: 'Tariq', active: 'Yes', siteAddress: 'Corniche, Dammam', acceptanceDate: '2025-08-18', siteAccessType: 'Normal',
    lastPmr: '2026-02-18', nextPmr: '2026-08-18' },
  { id: 'KHB-0277', name: 'Khobar Olaya', city: 'Khobar', region: 'Eastern', coord: [26.2794, 50.2083], priority: 'P2', vendor: 'Nokia', tech: ['4G'],
    condition: 'On air', accepted: 'Yes', mc: 'Dammam MC', accessType: 'Roof Top', transportType: 'Fiber', redundancyType: '—', isVip: 'No', isHub: 'No',
    feCoveredSiteId: 'DMM-0410', siteMaintainer: 'Nawaf', active: 'Yes', siteAddress: 'Olaya, Khobar', acceptanceDate: '2025-07-10', siteAccessType: 'Normal',
    lastPmr: '2026-01-10', nextPmr: '2026-07-10' },
  { id: 'JUB-0061', name: 'Jubail Industrial', city: 'Jubail', region: 'Eastern', coord: [27.0046, 49.6583], priority: 'P1', vendor: 'Huawei', tech: ['4G', '5G'],
    condition: 'Acceptance', accepted: 'No', mc: 'Dammam MC', accessType: 'Greenfield', transportType: 'MW', redundancyType: 'MW', isVip: 'Yes', isHub: 'No',
    feCoveredSiteId: 'KHB-0277', siteMaintainer: 'Bandar', active: 'No', siteAddress: 'Industrial Area, Jubail', acceptanceDate: '—', siteAccessType: 'Permit',
    lastPmr: '—', nextPmr: '—' },
]

export const siteById = id => sites.find(s => s.id === id)

// ---- Hub assignment ----
// Every region has a transport hub. Hub sites reference themselves; every other
// site is back-hauled to its region's hub. This powers the hub star on the map
// and the "Hub ID / Hub coordinates" shown on the site details page.
const regionHubId = {}
sites.forEach(s => { if (s.isHub === 'Yes') regionHubId[s.region] = s.id })
sites.forEach(s => { s.hubId = s.isHub === 'Yes' ? s.id : (regionHubId[s.region] || null) })

// Resolve a site's serving hub (its own record when the site itself is a hub).
export const hubForSite = site => (site && site.hubId ? siteById(site.hubId) : null)

// ---- Field Engineers ----
export const engineers = [
  { id: 'FE-07', name: 'Khalid Al-Otaibi', initials: 'KO', region: 'Central', base: 'Riyadh', coord: [24.7000, 46.6800], skills: ['RF', 'Transmission', 'Power'],     status: 'available', rating: 4.8, phone: '+966 55 111 2233', currentTicket: null },
  { id: 'FE-03', name: 'Saad Al-Harbi',    initials: 'SH', region: 'Central', base: 'Riyadh', coord: [24.6650, 46.7200], skills: ['Antenna/VSWR', 'RF', 'Fiber'],      status: 'en_route',  rating: 4.6, phone: '+966 55 222 3344', currentTicket: 'TCK-2043' },
  { id: 'FE-11', name: 'Yousef Nasser',    initials: 'YN', region: 'Central', base: 'Riyadh', coord: [24.8100, 46.7600], skills: ['Power', 'Civil', 'BSS'],            status: 'on_site',   rating: 4.9, phone: '+966 55 333 4455', currentTicket: 'TCK-2039' },
  { id: 'FE-05', name: 'Majed Al-Dossari', initials: 'MD', region: 'Central', base: 'Riyadh', coord: [24.6200, 46.5600], skills: ['IP/Core', 'Transmission', 'Fiber'], status: 'available', rating: 4.5, phone: '+966 55 444 5566', currentTicket: null },
  { id: 'FE-14', name: 'Fahad Al-Qahtani', initials: 'FQ', region: 'Central', base: 'Riyadh', coord: [24.9100, 46.6900], skills: ['RF', 'Antenna/VSWR', 'BSS'],        status: 'off',       rating: 4.4, phone: '+966 55 555 6677', currentTicket: null },
  { id: 'FE-21', name: 'Tariq Al-Shehri',  initials: 'TS', region: 'Eastern', base: 'Dammam', coord: [26.4100, 50.1000], skills: ['RF', 'Power', 'Transmission'],      status: 'available', rating: 4.7, phone: '+966 55 666 7788', currentTicket: null },
  { id: 'FE-24', name: 'Nawaf Al-Ghamdi',  initials: 'NG', region: 'Eastern', base: 'Khobar', coord: [26.2850, 50.2000], skills: ['Fiber', 'IP/Core', 'Civil'],        status: 'on_site',   rating: 4.8, phone: '+966 55 777 8899', currentTicket: 'TCK-2044' },
  { id: 'FE-28', name: 'Bandar Al-Mutairi',initials: 'BM', region: 'Eastern', base: 'Jubail', coord: [26.9800, 49.6700], skills: ['Civil', 'Power', 'Antenna/VSWR'],   status: 'available', rating: 4.3, phone: '+966 55 888 9900', currentTicket: null },
]

export const engineerById = id => engineers.find(e => e.id === id)

export const feStatusMeta = {
  available: { label: 'Available', color: 'green' },
  en_route:  { label: 'En route',  color: 'blue' },
  on_site:   { label: 'On site',   color: 'amber' },
  off:       { label: 'Off duty',  color: 'gray' },
}

// (kept for ticket fault context)
export const severityMeta = {
  Critical: { badge: 'badge-red',   dot: '#EF4444' },
  Major:    { badge: 'badge-amber', dot: '#F59E0B' },
  Minor:    { badge: 'badge-blue',  dot: '#2F80ED' },
  Warning:  { badge: 'badge-gray',  dot: '#9AA6B5' },
}

// ---- Ticket progress template ----
const STAGES = ['created', 'assigned', 'en_route', 'on_site', 'work', 'resolved']
export const stageMeta = {
  created:  { label: 'Created',     icon: 'alert' },
  assigned: { label: 'Assigned',    icon: 'user' },
  en_route: { label: 'En route',    icon: 'truck' },
  on_site:  { label: 'Arrived',     icon: 'mappin' },
  work:     { label: 'Work started',icon: 'wrench' },
  resolved: { label: 'Resolved',    icon: 'check-circle' },
}
const buildProgress = (reached, times = {}) => {
  const i = STAGES.indexOf(reached)
  return STAGES.map((k, idx) => ({ key: k, label: stageMeta[k].label, done: idx <= i, current: idx === i, at: times[k] || null }))
}

export const ticketTypeMeta = {
  CM:  { label: 'Corrective',  full: 'Corrective Maintenance',     badge: 'badge-red',   icon: 'wrench' },
  PAT: { label: 'Acceptance',  full: 'Provisional Acceptance Test',badge: 'badge-blue',  icon: 'clipboard' },
  PMR: { label: 'Preventive',  full: 'Preventive Maintenance',     badge: 'badge-green', icon: 'refresh' },
}

export const ticketStatusMeta = {
  open:     { label: 'Open',      badge: 'badge-amber' },
  assigned: { label: 'Assigned',  badge: 'badge-blue' },
  en_route: { label: 'En route',  badge: 'badge-blue' },
  on_site:  { label: 'On site',   badge: 'badge-amber' },
  resolved: { label: 'Resolved',  badge: 'badge-green' },
  breached: { label: 'SLA breach',badge: 'badge-red' },
}

// engineer completion report (dropdown on ticket details)
const report = (submittedBy, submittedAt, summary, items) => ({ submittedBy, submittedAt, summary, items })

// ---- Tickets ----  (dateStr added for field-journey dates)
export const tickets = [
  {
    id: 'TCK-2045', type: 'CM', siteId: 'RUH-0421', title: 'Cell Down — Sector 2 carrier loss',
    priority: 'P1', status: 'assigned', createdAt: '09:43', dateStr: 'Jul 1, 2026', faultType: 'Cell Down', faultSeverity: 'Critical',
    skillsNeeded: ['RF', 'Transmission'], slaTargetMin: 120, slaElapsedMin: 38, assignedFe: 'FE-07',
    progress: buildProgress('assigned', { created: '09:43', assigned: '09:46' }),
    description: 'Sector 2 carrier down. Verify RRU, check transmission link and power feed.',
    report: null,
  },
  {
    id: 'TCK-2044', type: 'CM', siteId: 'DMM-0410', title: 'Transmission Down — microwave link',
    priority: 'P1', status: 'on_site', createdAt: '09:32', dateStr: 'Jul 1, 2026', faultType: 'Transmission Down', faultSeverity: 'Critical',
    skillsNeeded: ['Transmission', 'IP/Core'], slaTargetMin: 120, slaElapsedMin: 64, assignedFe: 'FE-24',
    progress: buildProgress('work', { created: '09:32', assigned: '09:35', en_route: '09:48', on_site: '10:21', work: '10:29' }),
    description: 'Backhaul microwave link down. Inspect ODU/IDU alignment and IP transport.',
    report: report('Nawaf Al-Ghamdi', 'Jul 1 · 10:52',
      'On site; ODU realignment in progress, IDU config verified.',
      [
        { icon: 'camera', title: 'Site photos (4)', detail: 'Cabinet, ODU alignment, IDU LEDs and grounding bar.' },
        { icon: 'doc', title: 'Interim work note', detail: 'Waveguide re-torqued, ODU swapped from spares (S/N 44821).' },
        { icon: 'gauge', title: 'Link check', detail: 'RSL improving −58 → −44 dBm; verifying stability before closeout.' },
      ]),
  },
  {
    id: 'TCK-2043', type: 'CM', siteId: 'RUH-0233', title: 'Mains Power Fail — site on battery',
    priority: 'P2', status: 'en_route', createdAt: '09:19', dateStr: 'Jul 1, 2026', faultType: 'Mains Power Fail', faultSeverity: 'Major',
    skillsNeeded: ['Power'], slaTargetMin: 240, slaElapsedMin: 52, assignedFe: 'FE-03',
    progress: buildProgress('en_route', { created: '09:19', assigned: '09:24', en_route: '09:40' }),
    description: 'Commercial power lost; battery autonomy ~4h. Restore mains or deploy generator.',
    report: null,
  },
  {
    id: 'TCK-2041', type: 'PMR', siteId: 'RUH-0188', title: 'Q3 Preventive Routine — RF & power audit',
    priority: 'P2', status: 'assigned', createdAt: '08:00', dateStr: 'Jul 1, 2026', faultType: null, faultSeverity: null,
    skillsNeeded: ['RF', 'Power'], slaTargetMin: 480, slaElapsedMin: 95, assignedFe: 'FE-03',
    progress: buildProgress('assigned', { created: '08:00', assigned: '08:05' }),
    description: 'Scheduled 6-month preventive routine: antenna alignment, VSWR sweep, battery health, grounding, HVAC.',
    report: null,
  },
  {
    id: 'TCK-2039', type: 'PAT', siteId: 'RUH-0640', title: 'PAT — new 5G site acceptance',
    priority: 'P2', status: 'on_site', createdAt: '07:30', dateStr: 'Jul 1, 2026', faultType: null, faultSeverity: null,
    skillsNeeded: ['RF', 'BSS', 'Transmission'], slaTargetMin: 480, slaElapsedMin: 180, assignedFe: 'FE-11',
    progress: buildProgress('work', { created: '07:30', assigned: '07:34', en_route: '07:55', on_site: '08:40', work: '08:52' }),
    description: 'Provisional Acceptance Test for vendor-deployed 5G site. Validate against acceptance checklist before go-live.',
    report: report('Yousef Nasser', 'Jul 1 · 11:05',
      'Acceptance walk-down underway; civil & power sections passed.',
      [
        { icon: 'camera', title: 'Acceptance photos (9)', detail: 'Tower as-built, grounding, rectifier, antenna azimuth/tilt.' },
        { icon: 'clipboard', title: 'Checklist progress', detail: 'Civil ✓, Power ✓, RF sweep in progress, KPIs pending.' },
        { icon: 'gauge', title: 'VSWR sweep', detail: 'All sectors within spec (< 1.4:1).' },
      ]),
  },
  {
    id: 'TCK-2030', type: 'CM', siteId: 'KHB-0277', title: 'Temperature High — HVAC degraded',
    priority: 'P3', status: 'resolved', createdAt: '14:10', dateStr: 'Jun 30, 2026', faultType: 'Temperature High', faultSeverity: 'Minor',
    skillsNeeded: ['Civil', 'Power'], slaTargetMin: 480, slaElapsedMin: 240, assignedFe: 'FE-24',
    progress: buildProgress('resolved', { created: '14:10', assigned: '14:15', en_route: '14:35', on_site: '15:20', work: '15:30', resolved: '18:05' }),
    description: 'Shelter temperature above threshold. HVAC compressor serviced and gas recharged.',
    report: report('Nawaf Al-Ghamdi', 'Jun 30 · 18:10',
      'HVAC compressor serviced, refrigerant recharged, temperature back to nominal.',
      [
        { icon: 'camera', title: 'Before/after photos (6)', detail: 'HVAC unit, gauges, shelter thermostat reading 23°C.' },
        { icon: 'doc', title: 'Completion report', detail: 'Cleaned condenser coil, recharged R-410A 1.2 kg, tested cooling cycle.' },
        { icon: 'gauge', title: 'Post-fix reading', detail: 'Shelter 23°C (was 41°C). Alarm cleared, site stable.' },
      ]),
  },
  {
    id: 'TCK-2025', type: 'CM', siteId: 'RUH-0507', title: 'Battery Low — string replacement',
    priority: 'P2', status: 'breached', createdAt: '11:00', dateStr: 'Jun 30, 2026', faultType: 'Battery Low', faultSeverity: 'Major',
    skillsNeeded: ['Power'], slaTargetMin: 240, slaElapsedMin: 305, assignedFe: 'FE-07',
    progress: buildProgress('work', { created: '11:00', assigned: '11:20', en_route: '12:10', on_site: '13:40', work: '13:55' }),
    description: 'Battery string below capacity. SLA breached due to access permit delay; replacement in progress.',
    report: report('Khalid Al-Otaibi', 'Jun 30 · 14:10',
      'Access permit delayed entry by ~90 min (SLA breach). Battery string replacement in progress.',
      [
        { icon: 'camera', title: 'Photos (3)', detail: 'Old battery string, permit gate log, new string delivery.' },
        { icon: 'doc', title: 'Delay note', detail: 'Permit approval at 13:30 caused breach; escalated to region manager.' },
      ]),
  },
]

// PAT / PMR checklists
export const patChecklist = [
  { group: 'Civil & Infrastructure', items: ['Tower & foundation as-built', 'Grounding & earthing < 5Ω', 'Shelter / cabinet sealing', 'Cable trays & labeling'] },
  { group: 'Power', items: ['Rectifier & breakers rated', 'Battery autonomy test', 'AC/DC distribution verified', 'Alarm extensions healthy'] },
  { group: 'RF & Transmission', items: ['Antenna azimuth & tilt', 'VSWR sweep within spec', 'Feeder / jumper integrity', 'Microwave / fiber backhaul up'] },
  { group: 'Integration & KPIs', items: ['Cells on air (all sectors)', 'Throughput & ping test', 'Handover / neighbor relations', 'Counters healthy'] },
]
export const pmrChecklist = [
  'Visual inspection (tower, shelter, fencing)',
  'Antenna alignment & VSWR sweep',
  'Battery bank health & terminal torque',
  'Rectifier / generator load test',
  'Grounding resistance measurement',
  'HVAC / cooling performance',
  'Connector weatherproofing',
  'Housekeeping & security check',
]

// ---- Dashboard KPIs + trends ----
export const kpis = () => {
  const open = tickets.filter(t => !['resolved'].includes(t.status))
  return {
    openTickets: open.length,
    breached: tickets.filter(t => t.status === 'breached').length,
    atRisk: tickets.filter(t => t.status !== 'resolved' && t.status !== 'breached' && t.slaElapsedMin / t.slaTargetMin > 0.7).length,
    fesAvailable: engineers.filter(e => e.status === 'available').length,
    fesOnField: engineers.filter(e => e.status === 'en_route' || e.status === 'on_site').length,
    acceptedSites: sites.filter(s => s.accepted === 'Yes').length,
    notAcceptedSites: sites.filter(s => s.accepted === 'No').length,
    byType: ['CM', 'PAT', 'PMR'].map(t => ({ type: t, count: tickets.filter(x => x.type === t).length })),
  }
}

// Trend metrics vs previous period (used for arrow indicators)
export const trends = {
  openTickets:   { delta: 2.1, dir: 'up' },
  cmRepeated:    { value: 14, delta: 3.0, dir: 'up' },
  slaCompliance: { value: 86, delta: 1.2, dir: 'down' },
  pmrSla:        { value: 92, delta: 0.8, dir: 'up' },
}

// Per-type ticket summary (open / resolved / on site / breached)
export const ticketSummaryByType = () => ['CM', 'PAT', 'PMR'].map(type => {
  const list = tickets.filter(t => t.type === type)
  return {
    type, total: list.length,
    open: list.filter(t => !['resolved', 'breached'].includes(t.status)).length,
    resolved: list.filter(t => t.status === 'resolved').length,
    onSite: list.filter(t => t.status === 'on_site').length,
    breached: list.filter(t => t.status === 'breached').length,
  }
})

// ---- FE ranking (availability + skills + proximity) ----
export const rankCandidates = (ticket) => {
  const site = siteById(ticket.siteId)
  return engineers
    .map(e => {
      const dist = haversineKm(e.coord, site.coord)
      const matched = ticket.skillsNeeded.filter(s => e.skills.includes(s)).length
      const skillPct = Math.round((matched / ticket.skillsNeeded.length) * 100)
      const availScore = e.status === 'available' ? 1 : e.status === 'off' ? 0 : 0.4
      const score = Math.round((skillPct * 0.5 + availScore * 30 + Math.max(0, 40 - dist) * 1.2))
      return { ...e, dist, skillPct, score, eligible: e.region === site.region }
    })
    .filter(c => c.eligible)
    .sort((a, b) => b.score - a.score)
}

// ---- Roles / Admin (role-based access) ----
export const roles = {
  vendor: [
    { id: 'noc', name: 'NOC', scope: 'Monitors tickets, runs assignment & tracks SLA' },
    { id: 'hd',  name: 'Help Desk', scope: 'First-line triage, customer comms, ticket follow-up' },
    { id: 'fe',  name: 'Field Engineer', scope: 'Receives tickets, travels to site, executes & closes work' },
  ],
  isp: [
    { id: 'head',   name: 'Head', scope: 'Full privilege across all regions & vendors' },
    { id: 'region', name: 'Region Manager', scope: 'Full privilege scoped to a single region' },
  ],
}

export const adminModules = ['Dashboard', 'Tickets', 'Live Map', 'Field Engineers', 'Sites', 'Reports', 'Admin']

// role -> module -> access level ('full' | 'view' | 'none')
export const rolePermissions = {
  Head:             { Dashboard: 'full', Tickets: 'full', 'Live Map': 'full', 'Field Engineers': 'full', Sites: 'full', Reports: 'full', Admin: 'full' },
  'Region Manager': { Dashboard: 'full', Tickets: 'full', 'Live Map': 'full', 'Field Engineers': 'full', Sites: 'full', Reports: 'full', Admin: 'none' },
  NOC:              { Dashboard: 'full', Tickets: 'full', 'Live Map': 'full', 'Field Engineers': 'full', Sites: 'view', Reports: 'view', Admin: 'none' },
  'Help Desk':      { Dashboard: 'view', Tickets: 'full', 'Live Map': 'view', 'Field Engineers': 'view', Sites: 'view', Reports: 'none', Admin: 'none' },
  FE:               { Dashboard: 'none', Tickets: 'view', 'Live Map': 'view', 'Field Engineers': 'none', Sites: 'view', Reports: 'none', Admin: 'none' },
}

export const adminUsers = [
  { id: 'U-1001', name: 'Ahmad Hudis',     role: 'NOC',            region: 'Central', side: 'Vendor', status: 'Active',    lastActive: '2 min ago' },
  { id: 'U-1002', name: 'Sara Al-Amri',    role: 'Head',           region: 'All',     side: 'ISP',    status: 'Active',    lastActive: '15 min ago' },
  { id: 'U-1003', name: 'Omar Al-Zahrani', role: 'Region Manager', region: 'Eastern', side: 'ISP',    status: 'Active',    lastActive: '1 h ago' },
  { id: 'U-1004', name: 'Layla Al-Fahad',  role: 'Help Desk',      region: 'Central', side: 'Vendor', status: 'Active',    lastActive: '3 h ago' },
  { id: 'U-1005', name: 'Khalid Al-Otaibi',role: 'FE',             region: 'Central', side: 'Vendor', status: 'Active',    lastActive: 'On site now' },
  { id: 'U-1006', name: 'Nawaf Al-Ghamdi', role: 'FE',             region: 'Eastern', side: 'Vendor', status: 'Active',    lastActive: 'On site now' },
  { id: 'U-1007', name: 'Faisal Noor',     role: 'Help Desk',      region: 'Western', side: 'Vendor', status: 'Suspended', lastActive: '4 d ago' },
]

export const faqs = [
  { q: 'How is a Field Engineer chosen for a ticket?', a: 'Candidates in the site’s region are ranked by skill match to the fault, current availability, and proximity (great-circle distance). The top eligible FE is dispatched.' },
  { q: 'What counts as an SLA breach?', a: 'Every ticket has an SLA target by priority (P1 120m, P2 240m, P3 480m). If resolution exceeds the target the ticket is flagged as breached and escalated.' },
  { q: 'What is the difference between PAT, CM and PMR?', a: 'PAT validates a newly deployed site before go-live, CM fixes faults, and PMR is the scheduled periodic maintenance routine driven by site priority.' },
  { q: 'How do I export data?', a: 'Use the Export button on the Tickets, Sites, Field Engineers and Reports pages to download the current view as a spreadsheet (CSV / Excel).' },
]

export const profileMenu = [
  { id: 'personal', icon: 'user',      title: 'Personal Information', sub: 'Name, contact, employee ID' },
  { id: 'team',     icon: 'briefcase', title: 'Team & Role',          sub: 'NOC — Central · Vendor' },
  { id: 'skills',   icon: 'award',     title: 'Certifications',       sub: 'NOC & dispatch credentials' },
  { id: 'settings', icon: 'settings',  title: 'Settings',             sub: 'Preferences & security', go: 'settings' },
  { id: 'help',     icon: 'help',      title: 'Help & Support',       sub: 'FAQ & contact support', go: 'help' },
  { id: 'about',    icon: 'info',      title: 'About the platform',   sub: 'Version 2.0.0' },
]
