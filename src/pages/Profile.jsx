import Topbar from '../components/Topbar.jsx'
import { Icon } from '../components/Icons.jsx'
import { useNav } from '../nav.jsx'
import { user, profileMenu } from '../data.js'

const menuChip = { settings: 'chip-blue', help: 'chip-blue', about: 'chip-blue' }

export default function Profile() {
  const { navigate } = useNav()

  return (
    <>
      <Topbar title="Profile" />
      <div className="content page">

        {/* Profile header */}
        <div className="card card-pad">
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <div style={{ position: 'relative', flex: 'none' }}>
              <div className="avatar" style={{ width: 84, height: 84, fontSize: 32 }}>{user.initials}</div>
              <button
                className="avatar"
                title="Change photo"
                aria-label="Change photo"
                style={{
                  position: 'absolute', right: -2, bottom: -2, width: 28, height: 28,
                  background: '#fff', color: 'var(--green-dark)', border: '1px solid var(--line-strong)',
                  cursor: 'pointer',
                }}
              >
                <Icon name="camera" size={15} />
              </button>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.4px' }}>{user.name}</h2>
              <div className="muted" style={{ marginTop: 3, fontSize: 14 }}>{user.role} · {user.team}</div>
              <span className="badge badge-gray" style={{ marginTop: 12 }}>ID {user.employeeId}</span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="card card-pad">
          <div className="card-head">
            <h3>Account</h3>
          </div>
          <div className="list">
            {profileMenu.map(item => (
              <div
                key={item.id}
                className={'row' + (item.go ? ' row-link' : '')}
                onClick={item.go ? () => navigate(item.go) : undefined}
                style={item.go ? undefined : { cursor: 'default' }}
              >
                <div className={'chip-icon ' + (menuChip[item.id] || 'chip-green')} style={{ width: 42, height: 42 }}>
                  <Icon name={item.icon} size={20} />
                </div>
                <div className="row-main">
                  <div className="row-title">{item.title}</div>
                  <div className="row-sub">{item.sub}</div>
                </div>
                <Icon name="chevron" size={18} className="chev" />
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button className="btn btn-danger-ghost btn-block" onClick={() => navigate('loggedOut')}>
          <Icon name="logout" size={18} /> Log Out
        </button>

      </div>
    </>
  )
}
