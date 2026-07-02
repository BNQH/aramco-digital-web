import { useState } from 'react'
import Topbar from '../components/Topbar.jsx'
import { Icon } from '../components/Icons.jsx'
import ExportButton from '../components/ExportButton.jsx'
import { useNav } from '../nav.jsx'
import {
  tickets, siteById, engineerById,
  ticketTypeMeta, ticketStatusMeta, feStatusMeta,
} from '../data.js'
import { slaState, fmtDur } from '../util.js'

const isActive = t => t.status !== 'resolved' && t.status !== 'breached'

export default function Tickets() {
  const { navigate } = useNav()
  const [type, setType] = useState('All')
  const [group, setGroup] = useState('all')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const typeSegs = [
    ['All', 'All', tickets.length],
    ['CM', 'CM', tickets.filter(t => t.type === 'CM').length],
    ['PAT', 'PAT', tickets.filter(t => t.type === 'PAT').length],
    ['PMR', 'PMR', tickets.filter(t => t.type === 'PMR').length],
  ]
  const groupSegs = [
    ['all', 'All', tickets.length],
    ['active', 'Active', tickets.filter(isActive).length],
    ['resolved', 'Resolved', tickets.filter(t => t.status === 'resolved').length],
    ['breached', 'Breached', tickets.filter(t => t.status === 'breached').length],
  ]

  const inRange = (t) => {
    const d = new Date(t.dateStr)
    if (from) {
      const f = new Date(from)
      f.setHours(0, 0, 0, 0)
      if (d < f) return false
    }
    if (to) {
      const e = new Date(to)
      e.setHours(23, 59, 59, 999)
      if (d > e) return false
    }
    return true
  }

  const rows = tickets.filter(t =>
    (type === 'All' || t.type === type) &&
    (group === 'all'
      || (group === 'active' && isActive(t))
      || (group === 'resolved' && t.status === 'resolved')
      || (group === 'breached' && t.status === 'breached')) &&
    inRange(t)
  )

  const exportColumns = [
    { key: 'id', label: 'Ticket' },
    { key: 'title', label: 'Title' },
    { label: 'Type', value: t => t.type },
    { label: 'Site', value: t => t.siteId + ' ' + siteById(t.siteId).name },
    { key: 'priority', label: 'Priority' },
    { label: 'Engineer', value: t => t.assignedFe ? engineerById(t.assignedFe).name : 'Unassigned' },
    { label: 'Status', value: t => t.status },
    { label: 'Created', value: t => t.dateStr + ' ' + t.createdAt },
  ]

  return (
    <>
      <Topbar title="Tickets" sub="Provisional Acceptance · Corrective · Preventive" />
      <div className="content wide page">
        <div className="toolbar">
          <div className="seg">
            {typeSegs.map(([v, l, n]) => (
              <button key={v} className={type === v ? 'active' : ''} onClick={() => setType(v)}>{l} {n}</button>
            ))}
          </div>
          <div className="seg">
            {groupSegs.map(([v, l, n]) => (
              <button key={v} className={group === v ? 'active' : ''} onClick={() => setGroup(v)}>{l} {n}</button>
            ))}
          </div>
          <div className="input-wrap" style={{ padding: '7px 12px' }}>
            <Icon name="calendar" size={16} />
            <input type="date" aria-label="From" value={from} onChange={e => setFrom(e.target.value)} />
          </div>
          <div className="input-wrap" style={{ padding: '7px 12px' }}>
            <Icon name="calendar" size={16} />
            <input type="date" aria-label="To" value={to} onChange={e => setTo(e.target.value)} />
          </div>
          <button className="btn btn-ghost" onClick={() => { setFrom(''); setTo('') }}>Clear</button>
          <ExportButton rows={rows} filename="tickets.csv" columns={exportColumns} label="Export" />
          <div className="grow" />
          <button className="btn btn-primary"><Icon name="plus" size={16} /> New ticket</button>
        </div>

        <div className="card card-pad">
          <table className="table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Type</th>
                <th>Site</th>
                <th>Priority</th>
                <th>Engineer</th>
                <th>SLA</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(t => {
                const tm = ticketTypeMeta[t.type]
                const site = siteById(t.siteId)
                const fe = t.assignedFe ? engineerById(t.assignedFe) : null
                const s = slaState(t)
                return (
                  <tr key={t.id} className="clickable" onClick={() => navigate('ticketDetails', { id: t.id })}>
                    <td>
                      <div className="td-mono">{t.id}</div>
                      <div className="td-strong">{t.title}</div>
                    </td>
                    <td><span className={'badge ' + tm.badge}><Icon name={tm.icon} size={13} /> {tm.label}</span></td>
                    <td>
                      <div className="td-strong" style={{ fontWeight: 600 }}>{site.id}</div>
                      <div className="muted" style={{ fontSize: 12 }}>{site.name}</div>
                    </td>
                    <td><span className="badge badge-gray">{t.priority}</span></td>
                    <td>
                      {fe ? (
                        <div className="status-cell">
                          <div className="avatar" style={{ width: 28, height: 28, fontSize: 11 }}>{fe.initials}</div>
                          <span>{fe.name}</span>
                        </div>
                      ) : (
                        <span className="muted">Unassigned</span>
                      )}
                    </td>
                    <td>
                      <div className={'sla sla-' + s.state}>
                        <span className="sla-label">{s.label}</span>
                        <span className="sla-track"><span className="sla-fill" style={{ width: `${s.pct}%` }} /></span>
                      </div>
                    </td>
                    <td><span className={'badge ' + ticketStatusMeta[t.status].badge}>{ticketStatusMeta[t.status].label}</span></td>
                  </tr>
                )
              })}
              {rows.length === 0 && (
                <tr><td colSpan={7}><div className="muted" style={{ padding: 12 }}>No tickets match these filters.</div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
