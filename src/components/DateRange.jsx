import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icons.jsx'

/**
 * DateRange — ONE trigger, ONE calendar.
 * Click the field to open a single calendar; the first click picks "from",
 * the second picks "to" (clicking earlier than "from" swaps them). The range
 * is shown as a band with green endpoints, like an iOS-style range picker.
 *
 * Props (unchanged from the previous version, so callers keep working):
 *   from, to   'YYYY-MM-DD' strings (controlled)
 *   onChange   ({ from, to }) => void
 */

const DOW = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

const pad = n => String(n).padStart(2, '0')
const keyOf = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const dateOf = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d) }
const label = k => {
  if (!k) return null
  const d = dateOf(k)
  return `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}`
}

function buildGrid(year, month) {
  // 6 fixed weeks starting on Sunday; includes leading/trailing days.
  const first = new Date(year, month, 1)
  const start = new Date(year, month, 1 - first.getDay())
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)
    return { key: keyOf(d), day: d.getDate(), inMonth: d.getMonth() === month }
  })
}

export default function DateRange({ from = '', to = '', onChange, className = '', style }) {
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState('')
  const today = keyOf(new Date())
  const init = dateOf(from || today)
  const [view, setView] = useState({ y: init.getFullYear(), m: init.getMonth() })
  const ref = useRef(null)

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return
    const onDoc = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onKey = e => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey) }
  }, [open])

  const openCal = () => {
    const base = dateOf(from || today)
    setView({ y: base.getFullYear(), m: base.getMonth() })
    setHover('')
    setOpen(o => !o)
  }

  const emit = (f, t) => onChange?.({ from: f, to: t })

  const pick = k => {
    if (!from || (from && to)) { emit(k, ''); setHover('') }         // start a new range
    else if (k < from) emit(k, from)                                  // clicked before start → swap
    else emit(from, k)                                                // complete the range
  }

  const shiftMonth = dir => setView(v => {
    const d = new Date(v.y, v.m + dir, 1)
    return { y: d.getFullYear(), m: d.getMonth() }
  })

  // Effective range for painting (uses hover preview while picking "to").
  let lo = from, hi = to
  if (from && !to && hover) { lo = hover < from ? hover : from; hi = hover < from ? from : hover }
  const hasBand = lo && hi && lo !== hi

  const cells = buildGrid(view.y, view.m)

  return (
    <div className={'date-range' + (className ? ' ' + className : '')} style={style} ref={ref}>
      <button type="button" className="drp-trigger" onClick={openCal} aria-haspopup="dialog" aria-expanded={open}>
        <Icon name="calendar" size={16} className="input-icon" />
        {from
          ? <span>{label(from)} <span className="drp-arrow">→</span> {to ? label(to) : <span className="ph">pick end…</span>}</span>
          : <span className="ph">Select date range</span>}
      </button>

      {open && (
        <div className="drp-pop" role="dialog" aria-label="Choose date range">
          <div className="drp-head">
            <button type="button" className="drp-navbtn" onClick={() => shiftMonth(-1)} aria-label="Previous month">‹</button>
            <div className="drp-title">{MONTHS[view.m]} {view.y}</div>
            <button type="button" className="drp-navbtn" onClick={() => shiftMonth(1)} aria-label="Next month">›</button>
          </div>

          <div className="drp-dow">{DOW.map(d => <span key={d}>{d}</span>)}</div>

          <div className="drp-grid" onMouseLeave={() => setHover('')}>
            {cells.map(c => {
              const isFrom = c.key === lo, isTo = c.key === hi
              const inMid = hasBand && c.key > lo && c.key < hi
              let cellCls = 'drp-cell'
              if (inMid) cellCls += ' band'
              else if (hasBand && isFrom) cellCls += ' band-r'
              else if (hasBand && isTo) cellCls += ' band-l'
              let dayCls = 'drp-day'
              if (!c.inMonth) dayCls += ' dim'
              if (c.key === today) dayCls += ' today'
              if (isFrom || isTo) dayCls += ' sel'
              return (
                <div className={cellCls} key={c.key}>
                  <button
                    type="button"
                    className={dayCls}
                    onClick={() => pick(c.key)}
                    onMouseEnter={() => from && !to && setHover(c.key)}
                  >{c.day}</button>
                </div>
              )
            })}
          </div>

          <div className="drp-foot">
            <span className="drp-range-label">
              {from ? `${label(from)}${to ? ' → ' + label(to) : ' → …'}` : 'Click a start date, then an end date'}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => { emit('', ''); setHover('') }}>Clear</button>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setOpen(false)}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
