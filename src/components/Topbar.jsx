import { Icon } from './Icons.jsx'
import { useNav } from '../nav.jsx'
import { session } from '../session.js'

export default function Topbar({ title, sub, showSearch = true, showBack = false }) {
  const { back, navigate } = useNav()
  return (
    <header className="topbar">
      {showBack && (
        <button className="icon-btn" onClick={back} title="Back" aria-label="Back">
          <Icon name="back" />
        </button>
      )}
      <div>
        <h1>{title}</h1>
        {sub && <div className="sub">{sub}</div>}
      </div>
      <div className="topbar-spacer" />
      {showSearch && (
        <div className="search">
          <Icon name="search" size={18} />
          <input placeholder="Search tickets, sites, engineers…" />
        </div>
      )}
      <button className="icon-btn" onClick={() => navigate('messages')} title="Notifications" aria-label="Notifications">
        <Icon name="bell" />
        <span className="dot" />
      </button>
      <button className="avatar" onClick={() => navigate('profile')} style={{ width: 42, height: 42, fontSize: 16 }} title="Profile">
        {session.initials}
      </button>
    </header>
  )
}
