import { useState } from 'react'
import Topbar from '../components/Topbar.jsx'
import { Icon } from '../components/Icons.jsx'
import { useNav } from '../nav.jsx'
import {
  tickets, siteById, engineerById, rankCandidates,
  ticketTypeMeta, ticketStatusMeta, stageMeta, severityMeta,
  feStatusMeta, patChecklist, pmrChecklist,
} from '../data.js'
import { slaState, fmtDur } from '../util.js'

export default function TicketDetails() {
  const { params, navigate } = useNav()
  const t = tickets.find(x => x.id === params.id) || tickets[0]
  const site = siteById(t.siteId)
  const fe = engineerById(t.assignedFe)
  const candidates = rankCandidates(t)
  const sla = slaState(t)
  const tm = ticketTypeMeta[t.type]

  const [checks, setChecks] = useState({})
  const toggle = key => setChecks(c => ({ ...c, [key]: !c[key] }))

  const [open, setOpen] = useState(null)

  return (
    <>
      <Topbar title="Ticket Details" showBack />
      <div className="content wide page">
        <div className="grid" style={{ gridTemplateColumns: '1.7fr 1fr', alignItems: 'start' }}>

          {/* ---- LEFT ---- */}
          <div className="col">
            {/* header */}
            <div className="card card-pad">
              <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                <span className={'badge ' + tm.badge}><Icon name={tm.icon} size={13} /> {tm.full}</span>
                <span className={'badge ' + ticketStatusMeta[t.status].badge}>{ticketStatusMeta[t.status].label}</span>
                <span className="badge badge-gray">{t.priority}</span>
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.4px' }}>{t.title}</div>
              <div className="muted" style={{ marginTop: 6 }}>{t.id} · {site.id} {site.name} · {site.city}, {site.region}</div>
              <p style={{ marginTop: 14, marginBottom: 0, lineHeight: 1.6, color: 'var(--ink)' }}>{t.description}</p>
            </div>

            {/* fault summary */}
            {t.faultType && (
              <div className="card card-pad">
                <div className="card-head"><h3>Fault summary</h3></div>
                <div className="grid grid-2" style={{ gap: 10 }}>
                  <div className="kv"><span className="k">Fault type</span><span className="v">{t.faultType}</span></div>
                  <div className="kv"><span className="k">Severity</span><span className={'badge ' + severityMeta[t.faultSeverity].badge}>{t.faultSeverity}</span></div>
                </div>
              </div>
            )}

            {/* field journey tracker */}
            <div className="card card-pad">
              <div className="card-head"><h3>Field journey</h3><span className={'sla-label sla-' + sla.state} style={{ fontWeight: 700 }}>{sla.label}</span></div>
              <div className="tracker">
                {t.progress.map(step => (
                  <div key={step.key} className={'tracker-step' + (step.done ? ' done' : '') + (step.current ? ' current' : '')}>
                    <div className="tracker-dot"><Icon name={stageMeta[step.key].icon} size={16} /></div>
                    <div className="tracker-main">
                      <div className="tracker-label">{step.label}</div>
                      <div className="tracker-time">{step.at ? `${step.at} · ${t.dateStr}` : step.current ? 'In progress…' : 'Pending'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* engineer report */}
            <div className="card card-pad">
              <div className="card-head"><h3>Engineer report</h3></div>
              {t.report ? (
                <>
                  <div style={{ lineHeight: 1.6, color: 'var(--ink)' }}>{t.report.summary}</div>
                  <div className="dim" style={{ marginTop: 4, marginBottom: 14 }}>{t.report.submittedBy} · {t.report.submittedAt}</div>
                  {t.report.items.map((item, i) => (
                    <div key={i} className={'acc' + (open === i ? ' open' : '')}>
                      <button className="acc-head" onClick={() => setOpen(open === i ? null : i)}>
                        <span className="chip-icon chip-green" style={{ width: 34, height: 34 }}><Icon name={item.icon} size={17} /></span>
                        <span className="acc-title">{item.title}</span>
                        <Icon name="chevron" size={16} className="acc-chev" />
                      </button>
                      {open === i && <div className="acc-body">{item.detail}</div>}
                    </div>
                  ))}
                </>
              ) : (
                <div className="muted">Awaiting engineer submission.</div>
              )}
            </div>

            {/* type-specific content */}
            {t.type === 'PAT' && (
              <div className="card card-pad">
                <div className="card-head"><h3>Acceptance checklist</h3><span className="pill">{Object.values(checks).filter(Boolean).length} done</span></div>
                {patChecklist.map(g => (
                  <div key={g.group} style={{ marginBottom: 16 }}>
                    <div className="section-title" style={{ marginBottom: 8 }}>{g.group}</div>
                    {g.items.map(it => {
                      const key = g.group + '|' + it, on = !!checks[key]
                      return (
                        <button key={key} onClick={() => toggle(key)} className="row" style={{ width: '100%', textAlign: 'left', padding: '9px 4px', cursor: 'pointer' }}>
                          <Icon name={on ? 'check-circle' : 'dot'} size={20} style={{ color: on ? 'var(--green)' : 'var(--muted-2)' }} />
                          <span style={{ color: on ? 'var(--navy)' : 'var(--ink)', fontWeight: on ? 600 : 400 }}>{it}</span>
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>
            )}

            {t.type === 'PMR' && (
              <div className="card card-pad">
                <div className="card-head"><h3>Preventive routine checklist</h3><span className="pill">{Object.values(checks).filter(Boolean).length}/{pmrChecklist.length}</span></div>
                {pmrChecklist.map(it => {
                  const on = !!checks[it]
                  return (
                    <button key={it} onClick={() => toggle(it)} className="row" style={{ width: '100%', textAlign: 'left', padding: '11px 4px', cursor: 'pointer' }}>
                      <Icon name={on ? 'check-circle' : 'dot'} size={20} style={{ color: on ? 'var(--green)' : 'var(--muted-2)' }} />
                      <span style={{ color: on ? 'var(--navy)' : 'var(--ink)', fontWeight: on ? 600 : 400 }}>{it}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* ---- RIGHT ---- */}
          <div className="col">
            {/* SLA */}
            <div className="card card-pad">
              <div className="card-head"><h3>SLA</h3><span className="badge badge-gray">{t.priority} · {fmtDur(t.slaTargetMin)}</span></div>
              <div className="metric-row"><div className={'stat-num sla-' + sla.state} style={{ fontSize: 30, color: sla.state === 'bad' ? 'var(--red)' : sla.state === 'warn' ? '#C77700' : 'var(--green-dark)' }}>{sla.breached ? 'Breach' : fmtDur(sla.remain)}</div><span className="dim">{sla.breached ? 'over target' : 'remaining'}</span></div>
              <div className={'sla sla-' + sla.state} style={{ marginTop: 12 }}>
                <span className="sla-track"><span className="sla-fill" style={{ width: `${sla.pct}%` }} /></span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12 }} className="muted">
                <span>Elapsed {fmtDur(t.slaElapsedMin)}</span><span>Target {fmtDur(t.slaTargetMin)}</span>
              </div>
            </div>

            {/* assigned FE */}
            {fe && (
              <div className="card card-pad">
                <div className="card-head"><h3>Assigned engineer</h3></div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div className="avatar" style={{ width: 48, height: 48, fontSize: 16 }}>{fe.initials}</div>
                  <div>
                    <div className="td-strong">{fe.name}</div>
                    <div className="status-cell"><span className={'sdot sdot-' + feStatusMeta[fe.status].color} />{feStatusMeta[fe.status].label} · ★ {fe.rating}</div>
                  </div>
                </div>
                <div style={{ margin: '14px 0' }}>
                  {t.skillsNeeded.map(s => <span key={s} className={'tag ' + (fe.skills.includes(s) ? 'tag-on' : 'tag-miss')}>{s}{fe.skills.includes(s) ? ' ✓' : ''}</span>)}
                </div>
                <div className="grid grid-2" style={{ gap: 10 }}>
                  <div className="kv"><span className="k">Distance</span><span className="v">{candidates.find(c => c.id === fe.id)?.dist ?? '—'} km</span></div>
                  <div className="kv"><span className="k">Base</span><span className="v">{fe.base}</span></div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                  <button className="btn btn-primary" style={{ flex: 1 }}><Icon name="phone" size={16} /> Call</button>
                  <button className="btn btn-ghost" style={{ flex: 1 }}><Icon name="route" size={16} /> Track</button>
                </div>
              </div>
            )}

            {/* candidate ranking */}
            <div className="card card-pad">
              <div className="card-head"><h3>Assignment ranking</h3><span className="pill">avail · skills · nearest</span></div>
              {candidates.slice(0, 4).map(c => (
                <div key={c.id} className={'cand' + (c.id === t.assignedFe ? ' chosen' : '')}>
                  <div className="avatar" style={{ width: 36, height: 36, fontSize: 12 }}>{c.initials}</div>
                  <div>
                    <div className="td-strong" style={{ fontSize: 13.5 }}>{c.name}{c.id === t.assignedFe ? ' · dispatched' : ''}</div>
                    <div className="dim">{c.skillPct}% skill · {c.dist} km · {feStatusMeta[c.status].label}</div>
                  </div>
                  <div className="score"><b>{c.score}</b><div className="dim">score</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
