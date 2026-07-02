import { useState } from 'react'
import Topbar from '../components/Topbar.jsx'
import PeriodSelector from '../components/PeriodSelector.jsx'
import ExportButton from '../components/ExportButton.jsx'
import { Icon } from '../components/Icons.jsx'
import {
  user, kpis, tickets, siteById, engineerById,
  ticketTypeMeta, ticketStatusMeta, ticketSummaryByType, trends,
} from '../data.js'
import { fmtDur } from '../util.js'

const REPORT_TYPES = [
  { id: 'ops', label: 'Operations Summary' },
  { id: 'tickets', label: 'Tickets' },
  { id: 'sla', label: 'SLA Compliance' },
  { id: 'pmr', label: 'PMR Schedule' },
  { id: 'pat', label: 'PAT Acceptance' },
  { id: 'fe', label: 'Field Engineers' },
]

export default function Reports() {
  const [type, setType] = useState('ops')
  const [period, setPeriod] = useState({ id: 'daily', sub: 'last 24h' })
  const [generated, setGenerated] = useState(true)
  const k = kpis()
  const summary = ticketSummaryByType()
  const typeLabel = REPORT_TYPES.find(r => r.id === type).label

  const rows = tickets.map(t => ({
    ticket: t.id, type: ticketTypeMeta[t.type].full, site: `${t.siteId} ${siteById(t.siteId).name}`,
    priority: t.priority, status: ticketStatusMeta[t.status].label,
    engineer: t.assignedFe ? engineerById(t.assignedFe).name : 'Unassigned',
    created: `${t.dateStr} ${t.createdAt}`, slaTarget: fmtDur(t.slaTargetMin),
  }))

  return (
    <>
      <Topbar title="Reports" sub="Generate detailed operational reports" />
      <div className="content wide page">

        {/* Controls */}
        <div className="card card-pad">
          <div className="toolbar" style={{ marginBottom: 14 }}>
            <div className="seg">
              {REPORT_TYPES.map(r => (
                <button key={r.id} className={type === r.id ? 'active' : ''} onClick={() => { setType(r.id); setGenerated(false) }}>{r.label}</button>
              ))}
            </div>
          </div>
          <div className="toolbar">
            <PeriodSelector value="daily" onChange={p => { setPeriod(p); setGenerated(false) }} />
            <div className="grow" />
            <button className="btn btn-primary" onClick={() => setGenerated(true)}><Icon name="activity" size={16} /> Generate report</button>
            <ExportButton rows={rows} filename={`report-${type}-${period.id}.csv`} label="Export" />
          </div>
        </div>

        {!generated ? (
          <div className="card card-pad muted" style={{ textAlign: 'center', padding: 48 }}>
            <Icon name="doc" size={30} style={{ color: 'var(--muted-2)' }} />
            <div style={{ marginTop: 10 }}>Choose a report type and period, then press <b>Generate report</b>.</div>
          </div>
        ) : (
          <>
            {/* Report header */}
            <div className="card card-pad">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--navy)' }}>{typeLabel} Report</div>
                  <div className="muted" style={{ marginTop: 4 }}>Period: {period.sub} · Generated Jul 1, 2026 · by {user.name}</div>
                </div>
                <span className="badge badge-green">Ready</span>
              </div>
            </div>

            {/* KPI tiles */}
            <div className="grid grid-4">
              <div className="stat"><div className="stat-num">{k.openTickets}</div><div className="stat-label">Open tickets</div></div>
              <div className="stat"><div className="stat-num">{summary.reduce((a, s) => a + s.resolved, 0)}</div><div className="stat-label">Resolved</div></div>
              <div className="stat"><div className="stat-num" style={{ color: 'var(--red)' }}>{k.breached}</div><div className="stat-label">SLA breaches</div></div>
              <div className="stat"><div className="stat-num">{trends.slaCompliance.value}%</div><div className="stat-label">SLA compliance</div></div>
            </div>

            {/* Summary by type */}
            <div className="card card-pad">
              <div className="card-head"><h3>Summary by ticket type</h3></div>
              <table className="table">
                <thead><tr><th>Type</th><th>Total</th><th>Open</th><th>On site</th><th>Resolved</th><th>Breached</th></tr></thead>
                <tbody>
                  {summary.map(s => (
                    <tr key={s.type}>
                      <td><span className={'badge ' + ticketTypeMeta[s.type].badge}>{ticketTypeMeta[s.type].full}</span></td>
                      <td className="td-strong">{s.total}</td><td>{s.open}</td><td>{s.onSite}</td>
                      <td className="text-green fw7">{s.resolved}</td>
                      <td className={s.breached ? 'text-red fw7' : ''}>{s.breached}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Ticket log */}
            <div className="card card-pad">
              <div className="card-head"><h3>Ticket log</h3><ExportButton rows={rows} filename={`ticket-log-${period.id}.csv`} label="Export" /></div>
              <table className="table">
                <thead><tr><th>Ticket</th><th>Type</th><th>Site</th><th>Priority</th><th>Engineer</th><th>Status</th><th>Created</th></tr></thead>
                <tbody>
                  {rows.map(r => (
                    <tr key={r.ticket}>
                      <td className="td-mono">{r.ticket}</td><td>{r.type}</td><td>{r.site}</td>
                      <td>{r.priority}</td><td>{r.engineer}</td><td>{r.status}</td><td className="td-mono">{r.created}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  )
}
