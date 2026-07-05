import { Icon, BrandLockup } from './Icons.jsx'
import { useNav } from '../nav.jsx'
import { tickets } from '../data.js'
import { session } from '../session.js'

const openCount = tickets.filter(t => !['resolved'].includes(t.status)).length

const mainNav = [
  { id: 'dashboard', label: 'Dashboard',       icon: 'activity' },
  { id: 'tickets',   label: 'Tickets',         icon: 'clipboard', badge: openCount },
  { id: 'map',       label: 'Live Map',        icon: 'map' },
  { id: 'engineers', label: 'Field Engineers', icon: 'user' },
  { id: 'sites',     label: 'Sites',           icon: 'tower' },
  { id: 'reports',   label: 'Reports',         icon: 'doc' },
]

// Visible only to admin roles (session.isAdmin).
const adminNav = { id: 'admin', label: 'Administration', icon: 'shield' }

const subNav = [
  { id: 'settings', label: 'Settings',       icon: 'settings' },
  { id: 'help',     label: 'Help & Support', icon: 'help' },
]

const rootOf = {
  dashboard: 'dashboard', tickets: 'tickets', ticketDetails: 'tickets',
  map: 'map', engineers: 'engineers', sites: 'sites', siteDetails: 'sites', reports: 'reports',
  admin: 'admin',
  settings: 'settings', changePassword: 'settings', help: 'help', profile: 'profile',
}

export default function Sidebar() {
  const { route, navigate } = useNav()
  const active = rootOf[route] || route
  const nav = session.isAdmin ? [...mainNav, adminNav] : mainNav
  return (
    <aside className="sidebar">
      <div className="sidebar-brand" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
        <BrandLockup height={32} />
        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted-2)', paddingLeft: 2 }}>
          Network Operations
        </div>
      </div>

      <nav className="side-section">
        {nav.map(n => (
          <button key={n.id} className={'nav-item' + (active === n.id ? ' active' : '')} onClick={() => navigate(n.id)}>
            <Icon name={n.icon} />
            <span>{n.label}</span>
            {n.badge ? <span className="nav-badge">{n.badge}</span> : null}
          </button>
        ))}
        <div className="side-label">Workspace</div>
        {subNav.map(n => (
          <button key={n.id} className={'nav-item' + (active === n.id ? ' active' : '')} onClick={() => navigate(n.id)}>
            <Icon name={n.icon} />
            <span>{n.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-foot">
        <button className="side-user" onClick={() => navigate('profile')}>
          <div className="avatar" style={{ width: 38, height: 38, fontSize: 15 }}>{session.initials}</div>
          <div style={{ textAlign: 'left' }}>
            <div className="su-name">{session.name}</div>
            <div className="su-role">{session.role} · {session.team}</div>
          </div>
        </button>
      </div>
    </aside>
  )
}
