import { useState } from 'react'
import { Icon } from './Icons.jsx'

export const PERIODS = [
  { id: 'daily',   label: 'Daily',   sub: 'last 24h' },
  { id: 'weekly',  label: 'Weekly',  sub: 'last 7 days' },
  { id: 'monthly', label: 'Monthly', sub: 'last 30 days' },
  { id: 'custom',  label: 'Custom',  sub: 'custom range' },
]

/**
 * Segmented period control (Daily / Weekly / Monthly / Custom).
 * Custom reveals two date inputs. Calls onChange({id, sub, from, to}).
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
        <div className="toolbar" style={{ gap: 8 }}>
          <div className="input-wrap" style={{ padding: '7px 12px' }}>
            <Icon name="calendar" size={16} className="input-icon" />
            <input type="date" value={from} onChange={e => { setFrom(e.target.value); onChange?.({ id: 'custom', sub: 'custom range', from: e.target.value, to }) }} style={{ width: 130 }} />
          </div>
          <span className="dim">to</span>
          <div className="input-wrap" style={{ padding: '7px 12px' }}>
            <Icon name="calendar" size={16} className="input-icon" />
            <input type="date" value={to} onChange={e => { setTo(e.target.value); onChange?.({ id: 'custom', sub: 'custom range', from, to: e.target.value }) }} style={{ width: 130 }} />
          </div>
        </div>
      )}
    </div>
  )
}
