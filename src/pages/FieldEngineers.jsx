import { useState } from 'react'
import Topbar from '../components/Topbar.jsx'
import { Icon } from '../components/Icons.jsx'
import { useNav } from '../nav.jsx'
import { engineers, feStatusMeta, regions } from '../data.js'

export default function FieldEngineers() {
  const { navigate } = useNav()
  const [region, setRegion] = useState('All')
  const [statusFilter, setStatusFilter] = useState('all')

  const counts = {
    available: engineers.filter(e => e.status === 'available').length,
    en_route: engineers.filter(e => e.status === 'en_route').length,
    on_site: engineers.filter(e => e.status === 'on_site').length,
    off: engineers.filter(e => e.status === 'off').length,
  }

  const roster = engineers.filter(e =>
    (region === 'All' || e.region === region) &&
    (statusFilter === 'all' || e.status === statusFilter)
  )

  return (
    <>
      <Topbar title="Field Engineers" sub="Availability · skills · location" />
      <div className="content wide page">

        {/* status stat cards */}
        <div className="grid grid-4">
          {[['available', 'Available', 'green'], ['en_route', 'En route', 'blue'], ['on_site', 'On site', 'amber'], ['off', 'Off duty', 'gray']].map(([k, l, c]) => (
            <div className="card card-pad" key={k}>
              <div className="metric-row"><span className={'sdot sdot-' + c} /><b style={{ fontSize: 28, color: 'var(--navy)' }}>{counts[k]}</b></div>
              <div className="dim">{l}</div>
            </div>
          ))}
        </div>

        {/* filters */}
        <div className="toolbar">
          <div className="seg">
            {['All', ...regions].map(r => (
              <button key={r} className={region === r ? 'active' : ''} onClick={() => setRegion(r)}>{r}</button>
            ))}
          </div>
          <div className="seg">
            {[['all', 'All'], ['available', 'Available'], ['en_route', 'En route'], ['on_site', 'On site'], ['off', 'Off duty']].map(([v, l]) => (
              <button key={v} className={statusFilter === v ? 'active' : ''} onClick={() => setStatusFilter(v)}>{l}</button>
            ))}
          </div>
          <div className="grow" />
          <span className="pill">{roster.length} engineers</span>
        </div>

        {/* roster table */}
        <div className="card card-pad">
          <div className="card-head"><h3>Engineer roster {region !== 'All' ? `· ${region}` : ''}</h3></div>
          <table className="table">
            <thead>
              <tr>
                <th>Engineer</th>
                <th>Region</th>
                <th>Skills</th>
                <th>Status</th>
                <th>Current</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {roster.map(e => {
                const meta = feStatusMeta[e.status]
                return (
                  <tr key={e.id}>
                    <td>
                      <div style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
                        <div className="avatar" style={{ width: 34, height: 34, fontSize: 12 }}>{e.initials}</div>
                        <div>
                          <div className="td-strong">{e.name}</div>
                          <div className="td-mono dim">{e.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="td-strong" style={{ fontWeight: 600 }}>{e.region}</div>
                      <div className="dim">{e.base}</div>
                    </td>
                    <td style={{ maxWidth: 220 }}>
                      {e.skills.map(s => <span key={s} className="tag">{s}</span>)}
                    </td>
                    <td>
                      <span className="status-cell"><span className={'sdot sdot-' + meta.color} />{meta.label}</span>
                    </td>
                    <td>
                      {e.currentTicket
                        ? <button className="link-green" onClick={() => navigate('ticketDetails', { id: e.currentTicket })}>{e.currentTicket}</button>
                        : <span className="dim">Idle</span>}
                    </td>
                    <td><span className="td-strong" style={{ fontWeight: 600 }}>★ {e.rating}</span></td>
                    <td><button className="link-green" onClick={() => navigate('map')}><Icon name="mappin" size={14} /> Locate</button></td>
                  </tr>
                )
              })}
              {roster.length === 0 && (
                <tr><td colSpan={7} className="muted" style={{ textAlign: 'center', padding: 22 }}>No engineers match these filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}
