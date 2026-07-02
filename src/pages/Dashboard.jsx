import { useState } from 'react'
import Topbar from '../components/Topbar.jsx'
import MapView from '../components/MapView.jsx'
import Donut from '../components/Donut.jsx'
import PeriodSelector from '../components/PeriodSelector.jsx'
import { Icon } from '../components/Icons.jsx'
import { useNav } from '../nav.jsx'
import {
  user, kpis, trends, tickets, engineers, sites, siteById,
  ticketTypeMeta, ticketStatusMeta, ticketSummaryByType,
} from '../data.js'
import { slaState } from '../util.js'

const Arrow = ({ dir, delta, invertGood }) => {
  // up is "good" for compliance/tickets unless invertGood
  const good = invertGood ? dir === 'down' : dir === 'up'
  return (
    <span className={'trend-chip ' + (good ? 'trend-up' : 'trend-down')}>
      <Icon name="chevron" size={11} style={{ transform: dir === 'up' ? 'rotate(-90deg)' : 'rotate(90deg)' }} />
      {delta}% {dir === 'up' ? '↑' : '↓'}
    </span>
  )
}

export default function Dashboard() {
  const { navigate } = useNav()
  const k = kpis()
  const [period, setPeriod] = useState({ sub: 'last 24h' })
  const activeTickets = tickets.filter(t => t.status !== 'resolved')
  const typeColors = { CM: '#EF4444', PAT: '#2F80ED', PMR: '#1BA94C' }
  const maxType = Math.max(...k.byType.map(b => b.count), 1)
  const summary = ticketSummaryByType()

  return (
    <>
      <Topbar title={`Good afternoon, ${user.name.split(' ')[0]}`} sub="Network Operations · Central region · live" />
      <div className="content wide page">

        {/* period selector */}
        <div className="toolbar">
          <PeriodSelector value="daily" onChange={setPeriod} />
          <div className="grow" />
          <span className="dim">Showing data for <b style={{ color: 'var(--ink)' }}>{period.sub}</b></span>
        </div>

        {/* KPI row: Open tickets · FEs on field · CM+SLA split · PMR SLA */}
        <div className="grid grid-4">
          {/* Open tickets with trend arrow */}
          <div className="stat">
            <div className="stat-top"><div className="chip-icon chip-blue"><Icon name="clipboard" size={22} /></div></div>
            <div><div className="stat-num">{k.openTickets}</div><div className="stat-label">Open tickets</div></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="dim" style={{ color: '#C77700', fontWeight: 600 }}>{k.breached} breached · {k.atRisk} at risk</span>
              <Arrow dir={trends.openTickets.dir} delta={trends.openTickets.delta} />
            </div>
          </div>

          {/* FEs on field */}
          <div className="stat">
            <div className="stat-top"><div className="chip-icon chip-green"><Icon name="user" size={22} /></div></div>
            <div><div className="stat-num">{k.fesOnField}</div><div className="stat-label">FEs on field</div></div>
            <div className="dim" style={{ color: 'var(--green-dark)', fontWeight: 600 }}>{k.fesAvailable} available</div>
          </div>

          {/* Split card: CM repeated | SLA compliance */}
          <div className="stat">
            <div className="kpi-split">
              <div>
                <div className="chip-icon chip-red" style={{ width: 36, height: 36, marginBottom: 8 }}><Icon name="refresh" size={18} /></div>
                <div className="stat-num" style={{ fontSize: 24 }}>{trends.cmRepeated.value}%</div>
                <div className="stat-label" style={{ fontSize: 12 }}>CM repeated</div>
                <div style={{ marginTop: 4 }}><Arrow dir={trends.cmRepeated.dir} delta={trends.cmRepeated.delta} invertGood /></div>
              </div>
              <div>
                <div className="chip-icon chip-amber" style={{ width: 36, height: 36, marginBottom: 8 }}><Icon name="gauge" size={18} /></div>
                <div className="stat-num" style={{ fontSize: 24 }}>{trends.slaCompliance.value}%</div>
                <div className="stat-label" style={{ fontSize: 12 }}>SLA compliance</div>
                <div style={{ marginTop: 4 }}><Arrow dir={trends.slaCompliance.dir} delta={trends.slaCompliance.delta} /></div>
              </div>
            </div>
          </div>

          {/* PMR SLA compliance (replaces active alarms, on the right) */}
          <div className="stat">
            <div className="stat-top"><div className="chip-icon chip-green"><Icon name="shield" size={22} /></div></div>
            <div><div className="stat-num">{trends.pmrSla.value}%</div><div className="stat-label">PMR SLA compliance</div></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* <span className="dim">{period.sub}</span> */}
              <Arrow dir={trends.pmrSla.dir} delta={trends.pmrSla.delta} />
            </div>
          </div>
        </div>

        {/* Map + tickets-by-type (expanded, with per-type summary) */}
        <div className="grid" style={{ gridTemplateColumns: '1.7fr 1fr', alignItems: 'stretch' }}>
          <div className="card card-pad" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="card-head">
              <h3>Field map — team locations</h3>
              <button className="link-green" onClick={() => navigate('map')}>Open full map</button>
            </div>
            <div className="map-canvas" style={{ height: 340, minHeight: 0, flex: 1 }}>
              <MapView engineers={engineers} sites={sites} interactive={false} />
            </div>
            <div className="legend" style={{ marginTop: 14 }}>
              <span className="legend-item">👷 Field engineer</span>
              <span className="legend-item">🗼 Site</span>
              <span className="legend-item"><span className="sdot sdot-green" />On air</span>
              <span className="legend-item"><span className="sdot sdot-red" />Outage</span>
            </div>
          </div>

          <div className="card card-pad">
            <div className="card-head"><h3>Tickets by type</h3><button className="link-green" onClick={() => navigate('tickets')}>View all</button></div>
            {summary.map(s => (
              <div key={s.type} style={{ marginBottom: 16 }}>
                <div className="barrow" style={{ marginBottom: 8 }}>
                  <span className="bl"><Icon name={ticketTypeMeta[s.type].icon} size={15} />{ticketTypeMeta[s.type].full}</span>
                  <span className="bartrack"><span className="barfill" style={{ width: `${(s.total / maxType) * 100}%`, background: typeColors[s.type] }} /></span>
                  <span className="bv">{s.total}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, paddingLeft: 2, flexWrap: 'wrap' }}>
                  <span className="pill">{s.open} open</span>
                  <span className="pill">{s.onSite} on site</span>
                  <span className="badge badge-green" style={{ padding: '3px 9px' }}>{s.resolved} resolved</span>
                  {s.breached > 0 && <span className="badge badge-red" style={{ padding: '3px 9px' }}>{s.breached} breached</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active tickets + Site acceptance pie */}
        <div className="grid" style={{ gridTemplateColumns: '1.4fr 1fr', alignItems: 'start' }}>
          <div className="card card-pad">
            <div className="card-head"><h3>Active tickets</h3><button className="link-green" onClick={() => navigate('tickets')}>View all</button></div>
            <div className="list">
              {activeTickets.slice(0, 5).map(t => {
                const s = slaState(t), site = siteById(t.siteId)
                return (
                  <div className="row row-link" key={t.id} onClick={() => navigate('ticketDetails', { id: t.id })}>
                    <div className={'chip-icon chip-' + (t.type === 'CM' ? 'red' : t.type === 'PAT' ? 'blue' : 'green')} style={{ width: 40, height: 40 }}><Icon name={ticketTypeMeta[t.type].icon} size={19} /></div>
                    <div className="row-main">
                      <div className="row-title">{t.id} · {t.title}</div>
                      <div className="row-sub">{site.id} {site.name} · {t.priority}</div>
                    </div>
                    <div className={'sla sla-' + s.state} style={{ minWidth: 96 }}>
                      <span className="sla-label">{s.label}</span>
                      <span className="sla-track"><span className="sla-fill" style={{ width: `${s.pct}%` }} /></span>
                    </div>
                    <span className={'badge ' + ticketStatusMeta[t.status].badge}>{ticketStatusMeta[t.status].label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="card card-pad">
            <div className="card-head"><h3>Vendor site acceptance</h3><button className="link-green" onClick={() => navigate('sites')}>Sites</button></div>
            <div className="pie-wrap" style={{ padding: '10px 0' }}>
              <Donut
                size={168}
                centerValue={sites.length}
                centerLabel="sites"
                data={[
                  { label: 'Accepted', value: k.acceptedSites, color: '#1BA94C' },
                  { label: 'Not yet accepted', value: k.notAcceptedSites, color: '#F59E0B' },
                ]}
              />
            </div>
            <div className="dim" style={{ textAlign: 'center', marginTop: 4 }}>First-time provisional acceptance from vendor</div>
          </div>
        </div>

      </div>
    </>
  )
}
