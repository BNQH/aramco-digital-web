// Shared helpers

export const fmtDur = (min) => {
  const m = Math.abs(Math.round(min))
  const h = Math.floor(m / 60), r = m % 60
  return h ? `${h}h ${r}m` : `${r}m`
}

// SLA state for a ticket -> { pct, remain, state:'ok'|'warn'|'bad', label }
export const slaState = (t) => {
  const pct = Math.min(100, Math.round((t.slaElapsedMin / t.slaTargetMin) * 100))
  const remain = t.slaTargetMin - t.slaElapsedMin
  const breached = t.status === 'breached' || remain < 0
  const state = breached ? 'bad' : pct >= 70 ? 'warn' : 'ok'
  const label = t.status === 'resolved'
    ? 'Resolved'
    : breached
      ? `Overdue ${fmtDur(remain)}`
      : `${fmtDur(remain)} left`
  return { pct, remain, state, label, breached }
}

// Export an array of plain objects to a spreadsheet file (CSV, opens in Excel).
// columns: [{ key, label }] (optional — defaults to object keys)
export const exportRows = (rows, filename = 'export.csv', columns) => {
  if (!rows || !rows.length) return
  const cols = columns || Object.keys(rows[0]).map(k => ({ key: k, label: k }))
  const esc = (v) => {
    const s = v == null ? '' : String(v)
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s
  }
  const head = cols.map(c => esc(c.label)).join(',')
  const body = rows.map(r => cols.map(c => esc(typeof c.value === 'function' ? c.value(r) : r[c.key])).join(',')).join('\n')
  const csv = '﻿' + head + '\n' + body // BOM for Excel UTF-8
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename.endsWith('.csv') ? filename : filename + '.csv'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
