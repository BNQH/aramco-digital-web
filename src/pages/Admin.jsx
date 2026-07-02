import { useState } from 'react'
import Topbar from '../components/Topbar.jsx'
import ExportButton from '../components/ExportButton.jsx'
import { Icon } from '../components/Icons.jsx'
import { adminUsers, adminModules, rolePermissions } from '../data.js'

const accessMeta = {
  full: { label: 'Full', badge: 'badge-green' },
  view: { label: 'View', badge: 'badge-amber' },
  none: { label: '—',    badge: 'badge-gray' },
}
const cycle = { full: 'view', view: 'none', none: 'full' }

export default function Admin() {
  const [side, setSide] = useState('All')
  const [users, setUsers] = useState(adminUsers)
  const [perms, setPerms] = useState(rolePermissions)

  const shown = users.filter(u => side === 'All' || u.side === side)
  const toggleUser = id => setUsers(us => us.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u))
  const cyclePerm = (role, mod) => setPerms(p => ({ ...p, [role]: { ...p[role], [mod]: cycle[p[role][mod]] } }))

  const roleNames = Object.keys(perms)

  return (
    <>
      <Topbar title="Administration" sub="Users, roles & role-based access control" />
      <div className="content wide page">

        <div className="grid grid-4">
          <div className="stat"><div className="stat-num">{users.length}</div><div className="stat-label">Total users</div></div>
          <div className="stat"><div className="stat-num" style={{ color: 'var(--green-dark)' }}>{users.filter(u => u.status === 'Active').length}</div><div className="stat-label">Active</div></div>
          <div className="stat"><div className="stat-num">{roleNames.length}</div><div className="stat-label">Roles</div></div>
          <div className="stat"><div className="stat-num">{adminModules.length}</div><div className="stat-label">Modules</div></div>
        </div>

        {/* Users */}
        <div className="card card-pad">
          <div className="toolbar" style={{ marginBottom: 14 }}>
            <h3 style={{ margin: 0 }}>Users</h3>
            <div className="seg">
              {['All', 'Vendor', 'ISP'].map(s => <button key={s} className={side === s ? 'active' : ''} onClick={() => setSide(s)}>{s}</button>)}
            </div>
            <div className="grow" />
            <button className="btn btn-primary"><Icon name="plus" size={16} /> Add user</button>
            <ExportButton rows={shown} filename="users.csv" label="Export" />
          </div>
          <table className="table">
            <thead><tr><th>User</th><th>Role</th><th>Side</th><th>Region</th><th>Status</th><th>Last active</th><th>Access</th></tr></thead>
            <tbody>
              {shown.map(u => (
                <tr key={u.id}>
                  <td><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="avatar" style={{ width: 32, height: 32, fontSize: 12 }}>{u.name.split(' ').map(x => x[0]).slice(0, 2).join('')}</div>
                    <div><div className="td-strong">{u.name}</div><div className="td-mono">{u.id}</div></div>
                  </div></td>
                  <td><span className="badge badge-blue">{u.role}</span></td>
                  <td>{u.side}</td>
                  <td>{u.region}</td>
                  <td><span className={'badge ' + (u.status === 'Active' ? 'badge-green' : 'badge-red')}>{u.status}</span></td>
                  <td className="muted">{u.lastActive}</td>
                  <td><button className={'switch' + (u.status === 'Active' ? ' on' : '')} onClick={() => toggleUser(u.id)} title="Enable / suspend" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Permission matrix */}
        <div className="card card-pad">
          <div className="card-head">
            <h3>Role-based access matrix</h3>
            <span className="dim">Click a cell to cycle Full → View → None</span>
          </div>
          <table className="table">
            <thead>
              <tr><th>Role</th>{adminModules.map(m => <th key={m} style={{ textAlign: 'center' }}>{m}</th>)}</tr>
            </thead>
            <tbody>
              {roleNames.map(role => (
                <tr key={role}>
                  <td className="td-strong">{role}</td>
                  {adminModules.map(m => {
                    const a = perms[role][m]
                    return (
                      <td key={m} style={{ textAlign: 'center' }}>
                        <button className={'badge ' + accessMeta[a].badge} style={{ cursor: 'pointer', border: 'none' }} onClick={() => cyclePerm(role, m)}>{accessMeta[a].label}</button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}
