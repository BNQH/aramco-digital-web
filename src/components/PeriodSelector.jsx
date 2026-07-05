import { useState } from 'react'
import DateRange from './DateRange.jsx'

export const PERIODS = [
  { id: 'daily',   label: 'Daily',   sub: 'last 24h' },
  { id: 'weekly',  label: 'Weekly',  sub: 'last 7 days' },
  { id: 'monthly', label: 'Monthly', sub: 'last 30 days' },
  { id: 'custom',  label: 'Custom',  sub: 'custom range' },
]

/**
 * Segmented period control (Daily / Weekly / Monthly / Custom).
 * Custom reveals a single-frame from→to date range. Calls onChange({id, sub, from, to}).
 */
export default function PeriodSelector({ value = 'daily', onChange }) {
  const [sel, setSel] = useState(value)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const pick = (id) => {
    setSel(id)
    const p = PERIODS.find(x => x.id === id)
    onChange?.({ id, sub: p.sub, from, to })
  }

  return (
    <div className="toolbar" style={{ gap: 10 }}>
      <div className="seg">
        {PERIODS.map(p => (
          <button key={p.id} className={sel === p.id ? 'active' : ''} onClick={() => pick(p.id)}>{p.label}</button>
        ))}
      </div>
      {sel === 'custom' && (
        <DateRange
          from={from}
          to={to}
          onChange={r => {
            setFrom(r.from); setTo(r.to)
            onChange?.({ id: 'custom', sub: 'custom range', from: r.from, to: r.to })
          }}
        />
      )}
    </div>
  )
}
