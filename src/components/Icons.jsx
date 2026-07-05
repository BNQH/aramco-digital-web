import { useId } from 'react'

// Lightweight inline icon set (stroke-based, inherits currentColor)
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const Icon = ({ name, size = 20, ...rest }) => {
  const p = { width: size, height: size, viewBox: '0 0 24 24', ...S, ...rest }
  switch (name) {
    case 'home': return <svg {...p}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/></svg>
    case 'tasks': return <svg {...p}><rect x="4" y="3" width="16" height="18" rx="2.5"/><path d="M8.5 8.5h7M8.5 12.5h7M8.5 16.5h4"/></svg>
    case 'apps': return <svg {...p}><rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/></svg>
    case 'messages': return <svg {...p}><path d="M4 5h16v11H8l-4 4z"/></svg>
    case 'profile': return <svg {...p}><circle cx="12" cy="8" r="3.6"/><path d="M5 20c.8-3.6 3.7-5.4 7-5.4s6.2 1.8 7 5.4"/></svg>
    case 'settings': return <svg {...p}><circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M18.4 18.4l-2.1-2.1M7.7 7.7 5.6 5.6"/></svg>
    case 'help': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M9.4 9.2a2.6 2.6 0 0 1 5 .9c0 1.7-2.4 2.2-2.4 3.9"/><circle cx="12" cy="17" r=".6" fill="currentColor" stroke="none"/></svg>
    case 'search': return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>
    case 'bell': return <svg {...p}><path d="M18 9a6 6 0 1 0-12 0c0 6-2.5 7-2.5 7h17S18 15 18 9z"/><path d="M10 19a2 2 0 0 0 4 0"/></svg>
    case 'eye': return <svg {...p}><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="2.8"/></svg>
    case 'eye-off': return <svg {...p}><path d="M10.6 6.2A9.7 9.7 0 0 1 12 6c6 0 10 6 10 6a16 16 0 0 1-3 3.4M6.3 7.8A16 16 0 0 0 2 12s3.6 7 10 7a9.5 9.5 0 0 0 4-.9"/><path d="m4 4 16 16"/></svg>
    case 'mail': return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/></svg>
    case 'lock': return <svg {...p}><rect x="5" y="11" width="14" height="9" rx="2.2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
    case 'user': return <svg {...p}><circle cx="12" cy="8" r="3.6"/><path d="M5 20c.8-3.6 3.7-5.4 7-5.4s6.2 1.8 7 5.4"/></svg>
    case 'sso': return <svg {...p}><rect x="3" y="6" width="18" height="12" rx="2.5"/><path d="M7 12h5M14.5 12h2.5M9.5 9.5 7 12l2.5 2.5"/></svg>
    case 'check': return <svg {...p}><path d="m5 12.5 4.5 4.5L19 6.5"/></svg>
    case 'check-circle': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="m8 12.2 2.6 2.6L16 9.5"/></svg>
    case 'clock': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/></svg>
    case 'alert': return <svg {...p}><path d="M12 3 2.5 20h19L12 3z"/><path d="M12 10v4"/><circle cx="12" cy="17" r=".6" fill="currentColor" stroke="none"/></svg>
    case 'wrench': return <svg {...p}><path d="M14.7 6.3a4 4 0 0 0-5.2 5.2L4 17l3 3 5.5-5.5a4 4 0 0 0 5.2-5.2l-2.4 2.4-2.3-2.3 2.4-2.4z"/></svg>
    case 'calendar': return <svg {...p}><rect x="3.5" y="4.5" width="17" height="16" rx="2.5"/><path d="M3.5 9h17M8 3v3M16 3v3"/></svg>
    case 'refresh': return <svg {...p}><path d="M20 11a8 8 0 0 0-14-4.5L4 8M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14 4.5L20 16M20 20v-4h-4"/></svg>
    case 'clipboard': return <svg {...p}><rect x="5" y="5" width="14" height="16" rx="2.2"/><path d="M9 5V3.6h6V5M9 11h6M9 15h4"/></svg>
    case 'doc': return <svg {...p}><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M9.5 13h5M9.5 16.5h5"/></svg>
    case 'file': return <svg {...p}><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/></svg>
    case 'download': return <svg {...p}><path d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14"/></svg>
    case 'share': return <svg {...p}><circle cx="6" cy="12" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="18" cy="18" r="2.4"/><path d="m8.1 10.9 7.8-3.8M8.1 13.1l7.8 3.8"/></svg>
    case 'megaphone': return <svg {...p}><path d="M4 10v4l2 .5V9.5L4 10z"/><path d="M6 9.5 16 5v14L6 14.5"/><path d="M16 8.5a3 3 0 0 1 0 7"/><path d="M8 15v3.5h2.5L9 15"/></svg>
    case 'logout': return <svg {...p}><path d="M14 4h-7v16h7"/><path d="M10 12h10m0 0-3.5-3.5M20 12l-3.5 3.5"/></svg>
    case 'chevron': return <svg {...p}><path d="m9 5 7 7-7 7"/></svg>
    case 'chevron-down': return <svg {...p}><path d="m5 9 7 7 7-7"/></svg>
    case 'back': return <svg {...p}><path d="M15 5 8 12l7 7"/></svg>
    case 'plus': return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>
    case 'filter': return <svg {...p}><path d="M4 6h16M7 12h10M10 18h4"/></svg>
    case 'briefcase': return <svg {...p}><rect x="3.5" y="7.5" width="17" height="12" rx="2.2"/><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3.5 13h17"/></svg>
    case 'award': return <svg {...p}><circle cx="12" cy="9" r="5"/><path d="m8.5 13-1.5 7 5-2.5 5 2.5-1.5-7"/></svg>
    case 'info': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="8" r=".6" fill="currentColor" stroke="none"/></svg>
    case 'phone': return <svg {...p}><path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 1-2z"/></svg>
    case 'ticket': return <svg {...p}><path d="M4 7h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z"/><path d="M13 7v10" strokeDasharray="2 2"/></svg>
    case 'globe': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.5 2.6 15 0 18M12 3c-2.6 2.5-2.6 15 0 18"/></svg>
    case 'camera': return <svg {...p}><path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.2"/></svg>
    case 'shield': return <svg {...p}><path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z"/><path d="m9 12 2 2 4-4"/></svg>
    case 'truck': return <svg {...p}><path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17.5" cy="17.5" r="1.6"/></svg>
    case 'mappin': return <svg {...p}><path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>
    case 'map': return <svg {...p}><path d="m9 4-6 2.5v13L9 17l6 2.5 6-2.5v-13L15 7 9 4.5z"/><path d="M9 4.5v12.5M15 7v12.5"/></svg>
    case 'activity': return <svg {...p}><path d="M3 12h4l2.5 7 5-14 2.5 7H21"/></svg>
    case 'signal': return <svg {...p}><path d="M4 20v-4M9 20v-8M14 20v-12M19 20V4"/></svg>
    case 'radio': return <svg {...p}><circle cx="12" cy="12" r="2.4"/><path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M6 6a8 8 0 0 0 0 12M18 6a8 8 0 0 1 0 12"/></svg>
    case 'zap': return <svg {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>
    case 'gauge': return <svg {...p}><path d="M4 18a8 8 0 1 1 16 0"/><path d="m12 14 4-3.5"/><circle cx="12" cy="14" r="1" fill="currentColor" stroke="none"/></svg>
    case 'route': return <svg {...p}><circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="6" r="2.2"/><path d="M8 18h6a3 3 0 0 0 0-6H10a3 3 0 0 1 0-6h6"/></svg>
    case 'layers': return <svg {...p}><path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5"/></svg>
    case 'list': return <svg {...p}><path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/></svg>
    case 'ban': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="m6 6 12 12"/></svg>
    case 'tower': return <svg {...p}><path d="M12 8v13M8 21h8M7 4l10 10M17 4 7 14"/><circle cx="12" cy="6" r="1.4"/></svg>
    case 'sliders': return <svg {...p}><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/></svg>
    case 'dot': return <svg {...p}><circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/></svg>
    case 'users': return <svg {...p}><circle cx="9" cy="8" r="3.2"/><path d="M3.5 20c.7-3.2 3.1-4.9 5.5-4.9s4.8 1.7 5.5 4.9"/><path d="M16 5.2a3 3 0 0 1 0 5.7"/><path d="M17.6 20c-.2-1.7-.8-3-1.8-3.9 2 .2 3.7 1.7 4.2 3.9"/></svg>
    case 'star': return <svg {...p}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 18.9 6.6 20l1-6.1L3.2 9.5l6.1-.9z"/></svg>
    case 'edit': return <svg {...p}><path d="M4 20h4l10.5-10.5a2 2 0 0 0 0-2.8l-1.2-1.2a2 2 0 0 0-2.8 0L4 16v4z"/><path d="M13.5 6.5l4 4"/></svg>
    default: return <svg {...p}><circle cx="12" cy="12" r="9"/></svg>
  }
}

// Aramco Digital emblem — blue→green gradient rounded square with the white energy burst
export const LogoBurst = ({ size = 30 }) => {
  const gid = useId()
  return (
    <svg className="logo-burst" width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="4" y1="10" x2="44" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0B4EA2" />
          <stop offset="0.5" stopColor="#158AA6" />
          <stop offset="1" stopColor="#5DB947" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="9" fill={`url(#${gid})`} />
      {/* white energy burst */}
      <path d="M24 8 L27 21 L40 24 L27 27 L24 40 L21 27 L8 24 L21 21 Z" fill="#ffffff" />
      <rect x="30.4" y="12.4" width="2.4" height="2.4" rx="0.5" fill="#ffffff" opacity="0.9" />
      <rect x="14.6" y="32.6" width="2.4" height="2.4" rx="0.5" fill="#ffffff" opacity="0.9" />
      <rect x="32.4" y="31.4" width="1.9" height="1.9" rx="0.4" fill="#ffffff" opacity="0.8" />
      <rect x="13.4" y="13.4" width="1.9" height="1.9" rx="0.4" fill="#ffffff" opacity="0.8" />
    </svg>
  )
}

// Official Aramco Digital lockup (image asset in /public).
// Pass `light` for use on the brand gradient / dark backgrounds (wraps in a white chip so the grey wordmark stays legible).
export const BrandLockup = ({ height = 34, light = false }) => {
  const img = (
    <img
      src="/aramco-digital.png"
      alt="aramco digital"
      width={Math.round(height * 2.53)}
      height={height}
      style={{ display: 'block', height, width: 'auto' }}
    />
  )
  if (light) {
    return (
      <span style={{ background: '#fff', borderRadius: 12, padding: '10px 14px', display: 'inline-flex', boxShadow: '0 2px 12px rgba(0,0,0,.14)' }}>
        {img}
      </span>
    )
  }
  return <span style={{ display: 'inline-flex', alignItems: 'center' }}>{img}</span>
}
