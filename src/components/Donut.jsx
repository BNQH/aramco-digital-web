// Donut / pie chart. props: data=[{label,value,color}], size, thickness, centerValue, centerLabel, legend
export default function Donut({ data = [], size = 170, thickness = 26, centerValue, centerLabel, legend = true }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1
  const r = (size - thickness) / 2
  const C = 2 * Math.PI * r
  let offset = 0
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flex: 'none' }}>
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EEF2F7" strokeWidth={thickness} />
          {data.map((d, i) => {
            const len = (d.value / total) * C
            const el = (
              <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={d.color} strokeWidth={thickness}
                strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset} />
            )
            offset += len
            return el
          })}
        </g>
        {centerValue != null && <text x="50%" y="48%" textAnchor="middle" dominantBaseline="middle" fontSize={size * 0.22} fontWeight="800" fill="#16263F">{centerValue}</text>}
        {centerLabel && <text x="50%" y="63%" textAnchor="middle" fontSize={size * 0.082} fill="#6B7787">{centerLabel}</text>}
      </svg>
      {legend && (
        <div style={{ minWidth: 150 }}>
          {data.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
              <span style={{ width: 11, height: 11, borderRadius: 3, background: d.color, flex: 'none' }} />
              <span style={{ color: 'var(--ink)', fontWeight: 600, fontSize: 13 }}>{d.label}</span>
              <b style={{ marginLeft: 'auto', color: 'var(--navy)' }}>{d.value}</b>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
