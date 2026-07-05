import { useState } from 'react'
import Topbar from '../components/Topbar.jsx'
import MapView from '../components/MapView.jsx'
import { Icon } from '../components/Icons.jsx'
import { useNav } from '../nav.jsx'
import { engineers, sites, feStatusMeta, siteConditionMeta, regions } from '../data.js'

export default function LiveMap() {
  const { navigate } = useNav()
  const [region, setRegion] = useState('All')
  const [statusFilter, setStatusFilter] = useState('all')

  const fes = engineers.filter(e =>
    (region === 'All' || e.region === region) &&
    (statusFilter === 'all' || e.status === statusFilter)
  )
  const sts = sites.filter(s => region === 'All' || s.region === region)
  const mapKey = region + ':' + statusFilter

  const counts = {
    available: fes.filter(e => e.status === 'available').length,
    en_route: fes.filter(e => e.status === 'en_route').length,
    on_site: fes.filter(e => e.status === 'on_site').length,
    off: fes.filter(e => e.status === 'off').length,
  }
  const siteCounts = {
    'On air': sts.filter(s => s.condition === 'On air').length,
    'Outage': sts.filter(s => s.condition === 'Outage').length,
    'Degraded': sts.filter(s => s.condition === 'Degraded').length,
    'Maintenance': sts.filter(s => s.condition === 'Maintenance').length,
  }

  return (
    <>
      <Topbar title="Live Map" sub="Field engineer & site locations — real time" />
      <div className="content wide page">
        <div className="toolbar">
          <div className="seg">
            {['All', ...regions].map(r => (
              <button key={r} className={region === r ? 'active' : ''} onClick={() => setRegion(r)}>{r}</button>
            ))}
          </div>
          <div className="seg">
            {[['all', 'All FEs'], ['available', 'Available'], ['en_route', 'En route'], ['on_site', 'On site']].map(([v, l]) => (
              <button key={v} className={statusFilter === v ? 'active' : ''} onClick={() => setStatusFilter(v)}>{l}</button>
            ))}
          </div>
          <div className="grow" />
          <div className="legend">
            <span className="legend-item">👷 Engineer</span>
            <span className="legend-item">🗼 Site</span>
            <span className="legend-item">⭐ Hub</span>
            <span className="legend-item"><span className="sdot sdot-green" />On air</span>
            <span className="legend-item"><span className="sdot sdot-red" />Outage</span>
          </div>
        </div>

        {/* Map (full width) */}
        <div className="map-canvas" style={{ height: '52vh', minHeight: 430 }}>
          <MapView key={mapKey} engineers={fes} sites={sts} interactive />
        </div>

        {/* Two panels: Engineers | Sites */}
        <div className="grid grid-2" style={{ gap: 18 }}>

          {/* Engineers — summary + roster combined in one container */}
          <div className="map-group map-group-fe">
            <div className="card-head">
              <h3><Icon name="users" size={16} /> Field Engineers</h3>
              <span className="pill">{fes.length}</span>
            </div>
            <div className="grid grid-4" style={{ gap: 10 }}>
              {[['available', 'Available', 'green'], ['en_route', 'En route', 'blue'], ['on_site', 'On site', 'amber'], ['off', 'Off duty', 'gray']].map(([k, l, c]) => (
                <div className="stat-tile" key={k}>
                  <div className="metric-row"><span className={'sdot sdot-' + c} /><b style={{ fontSize: 20, color: 'var(--navy)' }}>{counts[k]}</b></div>
                  <div className="dim">{l}</div>
                </div>
              ))}
            </div>
            <div className="map-group-sep" />
            <div className="map-group-sub">Engineers on shift {region !== 'All' ? `· ${region}` : ''}</div>
            <div className="list">
              {fes.map(e => {
                const meta = feStatusMeta[e.status]
                return (
                  <div className="row row-link" key={e.id} onClick={() => navigate('engineers')}>
                    <div className="avatar" style={{ width: 38, height: 38, fontSize: 13 }}>{e.initials}</div>
                    <div className="row-main">
                      <div className="row-title" style={{ fontSize: 13.5 }}>{e.name}</div>
                      <div className="row-sub">{e.base} · {e.skills.slice(0, 2).join(', ')}</div>
                    </div>
                    <span className="status-cell"><span className={'sdot sdot-' + meta.color} />{meta.label}</span>
                  </div>
                )
              })}
              {fes.length === 0 && <div className="muted" style={{ padding: 12 }}>No engineers match these filters.</div>}
            </div>
          </div>

          {/* Sites — summary + roster combined in one container */}
          <div className="map-group map-group-site">
            <div className="card-head">
              <h3><Icon name="tower" size={16} /> Sites</h3>
              <span className="pill">{sts.length}</span>
            </div>
            <div className="grid grid-4" style={{ gap: 10 }}>
              {[['On air', 'On air', 'green'], ['Outage', 'Outage', 'red'], ['Degraded', 'Degraded', 'amber'], ['Maintenance', 'Maint.', 'blue']].map(([k, l, c]) => (
                <div className="stat-tile" key={k}>
                  <div className="metric-row"><span className={'sdot sdot-' + c} /><b style={{ fontSize: 20, color: 'var(--navy)' }}>{siteCounts[k]}</b></div>
                  <div className="dim">{l}</div>
                </div>
              ))}
            </div>
            <div className="map-group-sep" />
            <div className="map-group-sub">Sites {region !== 'All' ? `· ${region}` : ''}</div>
            <div className="list">
              {sts.map(s => {
                const meta = siteConditionMeta[s.condition]
                return (
                  <div className="row row-link" key={s.id} onClick={() => navigate('siteDetails', { id: s.id })}>
                    <div className="chip-icon chip-green" style={{ width: 38, height: 38, position: 'relative' }}>
                      <Icon name="tower" size={18} />
                      {s.isHub === 'Yes' && <span className="hub-badge" title="Hub site">★</span>}
                    </div>
                    <div className="row-main">
                      <div className="row-title" style={{ fontSize: 13.5 }}>{s.id} · {s.name}{s.isHub === 'Yes' ? ' · Hub' : ''}</div>
                      <div className="row-sub">{s.city} · {s.vendor}</div>
                    </div>
                    <span className="status-cell"><span className={'sdot sdot-' + meta.dot} />{s.condition}</span>
                  </div>
                )
              })}
              {sts.length === 0 && <div className="muted" style={{ padding: 12 }}>No sites match this region.</div>}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
