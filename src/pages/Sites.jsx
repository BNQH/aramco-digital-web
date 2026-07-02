import { useState } from 'react'
import Topbar from '../components/Topbar.jsx'
import { Icon } from '../components/Icons.jsx'
import ExportButton from '../components/ExportButton.jsx'
import { useNav } from '../nav.jsx'
import { sites, regions, siteConditionMeta } from '../data.js'

const CONDITIONS = ['On air', 'Degraded', 'Outage', 'Maintenance', 'Acceptance']

const pmrFreq = { P1: 'Every 3 months', P2: 'Every 6 months', P3: 'Every 12 months' }

export default function Sites() {
  const { navigate } = useNav()
  const [view, setView] = useState('inventory')
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('All')
  const [condition, setCondition] = useState('All')

  const q = query.trim().toLowerCase()
  const rows = sites.filter(s =>
    (q === '' || s.id.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)) &&
    (region === 'All' || s.region === region) &&
    (condition === 'All' || s.condition === condition)
  )

  const outageCount = rows.filter(s => s.condition === 'Outage').length

  const pmrRows = [...rows].sort((a, b) => String(a.nextPmr).localeCompare(String(b.nextPmr)))

  const exportColumns = [
    { key: 'id', label: 'id' },
    { key: 'name', label: 'name' },
    { key: 'city', label: 'city' },
    { key: 'region', label: 'region' },
    { key: 'priority', label: 'priority' },
    { key: 'vendor', label: 'vendor' },
    { label: 'Tech', value: s => s.tech.join(' ') },
    { key: 'condition', label: 'condition' },
    { key: 'accepted', label: 'accepted' },
    { key: 'lastPmr', label: 'lastPmr' },
    { key: 'nextPmr', label: 'nextPmr' },
  ]

  return (
    <>
      <Topbar title="Sites" sub="Network sites · priority · PMR schedule" />
      <div className="content wide page">

        <div className="toolbar">
          <div className="seg">
            <button className={view === 'inventory' ? 'active' : ''} onClick={() => setView('inventory')}>Inventory</button>
            <button className={view === 'pmr' ? 'active' : ''} onClick={() => setView('pmr')}>PMR schedule</button>
          </div>
          <div className="input-wrap" style={{ width: 280, padding: '9px 13px' }}>
            <Icon name="search" size={18} className="input-icon" />
            <input
              placeholder="Search site id or name…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <div className="seg">
            {['All', ...regions].map(r => (
              <button key={r} className={region === r ? 'active' : ''} onClick={() => setRegion(r)}>{r}</button>
            ))}
          </div>
          <div className="seg">
            {['All', ...CONDITIONS].map(c => (
              <button key={c} className={condition === c ? 'active' : ''} onClick={() => setCondition(c)}>{c}</button>
            ))}
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <ExportButton rows={rows} filename="sites.csv" columns={exportColumns} label="Export" />
          </div>
        </div>

        <div className="card card-pad">
          <div className="card-head">
            <h3>{view === 'inventory' ? 'Site inventory' : 'PMR schedule'}</h3>
            <span className="muted" style={{ fontSize: 13, fontWeight: 600 }}>
              {rows.length} site{rows.length === 1 ? '' : 's'} · {outageCount} in outage
            </span>
          </div>

          {view === 'inventory' ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Site</th>
                  <th>Location</th>
                  <th>Priority</th>
                  <th>Vendor</th>
                  <th>Tech</th>
                  <th>Condition</th>
                  <th>Acceptance site</th>
                  <th>Last PMR</th>
                  <th>Next PMR</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(s => (
                  <tr key={s.id} className="clickable" onClick={() => navigate('siteDetails', { id: s.id })}>
                    <td>
                      <div className="td-mono">{s.id}</div>
                      <div className="td-strong">{s.name}</div>
                    </td>
                    <td>
                      {s.city}
                      <div className="dim">{s.region}</div>
                    </td>
                    <td><span className="badge badge-gray">{s.priority}</span></td>
                    <td>{s.vendor}</td>
                    <td>{s.tech.map(t => <span key={t} className="tag">{t}</span>)}</td>
                    <td>
                      <span className="status-cell">
                        <span className={'sdot sdot-' + siteConditionMeta[s.condition].dot} />{s.condition}
                      </span>
                    </td>
                    <td>
                      <span className={'badge ' + (s.accepted === 'Yes' ? 'badge-green' : 'badge-amber')}>{s.accepted}</span>
                    </td>
                    <td className="td-mono">{s.lastPmr}</td>
                    <td className="td-mono">{s.nextPmr}</td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={9} className="muted" style={{ padding: 20, textAlign: 'center' }}>
                      No sites match these filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Site</th>
                  <th>Priority</th>
                  <th>Frequency</th>
                  <th>Last PMR</th>
                  <th>Next PMR</th>
                </tr>
              </thead>
              <tbody>
                {pmrRows.map(s => (
                  <tr key={s.id} className="clickable" onClick={() => navigate('siteDetails', { id: s.id })}>
                    <td>
                      <div className="td-mono">{s.id}</div>
                      <div className="td-strong">{s.name}</div>
                    </td>
                    <td><span className="badge badge-gray">{s.priority}</span></td>
                    <td>{pmrFreq[s.priority] || '—'}</td>
                    <td className="td-mono">{s.lastPmr}</td>
                    <td className="td-mono">{s.nextPmr}</td>
                  </tr>
                ))}
                {pmrRows.length === 0 && (
                  <tr>
                    <td colSpan={5} className="muted" style={{ padding: 20, textAlign: 'center' }}>
                      No sites match these filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </>
  )
}
