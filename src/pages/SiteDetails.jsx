import Topbar from '../components/Topbar.jsx'
import MapView from '../components/MapView.jsx'
import { Icon } from '../components/Icons.jsx'
import { useNav } from '../nav.jsx'
import { sites, siteById, siteConditionMeta } from '../data.js'

const KV = ({ k, v }) => (
  <div className="kv"><span className="k">{k}</span><span className="v">{v ?? '—'}</span></div>
)

export default function SiteDetails() {
  const { params, navigate } = useNav()
  const s = siteById(params.id) || sites[0]
  const cond = siteConditionMeta[s.condition] || { dot: 'gray', badge: 'badge-gray' }

  const freq = s.priority === 'P1' ? 'Every 3 months' : s.priority === 'P2' ? 'Every 6 months' : 'Every 12 months'

  return (
    <>
      <Topbar title="Site Details" showBack />
      <div className="content wide page">
        <div className="grid" style={{ gridTemplateColumns: '1.7fr 1fr', alignItems: 'start' }}>

          {/* LEFT */}
          <div className="col">
            <div className="card card-pad">
              <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                <span className={'badge ' + cond.badge}><span className={'sdot sdot-' + cond.dot} /> {s.condition}</span>
                <span className="badge badge-gray">{s.priority}</span>
                <span className={'badge ' + (s.accepted === 'Yes' ? 'badge-green' : 'badge-amber')}>{s.accepted === 'Yes' ? 'Accepted' : 'Acceptance pending'}</span>
                {s.isVip === 'Yes' && <span className="badge badge-blue">VIP</span>}
                {s.isHub === 'Yes' && <span className="badge badge-blue">Hub</span>}
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.4px' }}>{s.id} · {s.name}</div>
              <div className="muted" style={{ marginTop: 6 }}>{s.siteAddress} · {s.city}, {s.region}</div>
            </div>

            <div className="card card-pad">
              <div className="card-head"><h3>Site attributes</h3></div>
              <div className="grid grid-2" style={{ gap: '0 24px' }}>
                <KV k="Site ID" v={s.id} />
                <KV k="Site Name" v={s.name} />
                <KV k="MC" v={s.mc} />
                <KV k="Region" v={s.region} />
                <KV k="Latitude" v={s.coord[0]} />
                <KV k="Longitude" v={s.coord[1]} />
                <KV k="Access Type" v={s.accessType} />
                <KV k="Transport Type" v={s.transportType} />
                <KV k="Redundancy Type" v={s.redundancyType} />
                <KV k="Vendor" v={s.vendor} />
                <KV k="Site Priority" v={s.priority} />
                <KV k="Technology" v={s.tech.join(' · ')} />
                <KV k="Is VIP" v={s.isVip} />
                <KV k="Is Hub" v={s.isHub} />
                <KV k="FE Covered Site ID" v={s.feCoveredSiteId} />
                <KV k="Site Maintainer" v={s.siteMaintainer} />
                <KV k="Active" v={s.active} />
                <KV k="Site Access Type" v={s.siteAccessType} />
                <KV k="Acceptance Site" v={s.accepted} />
                <KV k="Acceptance Date" v={s.acceptanceDate} />
              </div>
            </div>

            <div className="card card-pad">
              <div className="card-head"><h3>PMR schedule</h3><span className="pill">{freq}</span></div>
              <div className="grid grid-3" style={{ gap: 12 }}>
                <div className="card card-pad" style={{ padding: '14px 16px' }}>
                  <div className="dim">Frequency</div><div className="td-strong" style={{ marginTop: 4 }}>{freq}</div>
                </div>
                <div className="card card-pad" style={{ padding: '14px 16px' }}>
                  <div className="dim">Last PMR</div><div className="td-strong" style={{ marginTop: 4 }}>{s.lastPmr}</div>
                </div>
                <div className="card card-pad" style={{ padding: '14px 16px' }}>
                  <div className="dim">Next PMR due</div><div className="td-strong" style={{ marginTop: 4, color: 'var(--green-dark)' }}>{s.nextPmr}</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col">
            <div className="card card-pad">
              <div className="card-head"><h3>Location</h3></div>
              <div className="map-canvas" style={{ height: 240, minHeight: 0 }}>
                <MapView engineers={[]} sites={[s]} interactive={false} />
              </div>
              <div className="dim" style={{ marginTop: 10 }}>{s.coord[0]}, {s.coord[1]}</div>
            </div>

            <div className="card card-pad">
              <div className="card-head"><h3>Quick facts</h3></div>
              <KV k="Condition" v={s.condition} />
              <KV k="Vendor" v={s.vendor} />
              <KV k="Maintainer" v={s.siteMaintainer} />
              <KV k="Covered by site" v={s.feCoveredSiteId} />
              <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => navigate('tickets')}><Icon name="plus" size={16} /> New ticket</button>
                <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => navigate('map')}><Icon name="map" size={16} /> Map</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
