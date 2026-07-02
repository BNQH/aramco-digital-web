import { useState } from 'react'
import Topbar from '../components/Topbar.jsx'
import { Icon } from '../components/Icons.jsx'
import { useNav } from '../nav.jsx'

function NavRow({ icon, chip, title, sub, value, onClick }) {
  return (
    <div className="row row-link" onClick={onClick}>
      <div className={'chip-icon ' + chip} style={{ width: 42, height: 42 }}><Icon name={icon} size={20} /></div>
      <div className="row-main">
        <div className="row-title">{title}</div>
        {sub && <div className="row-sub">{sub}</div>}
      </div>
      {value && <span className="muted-2" style={{ fontWeight: 700, fontSize: 13 }}>{value}</span>}
      <Icon name="chevron" size={18} className="chev" />
    </div>
  )
}

function ToggleRow({ icon, chip, title, sub, on, onToggle }) {
  return (
    <div className="row">
      <div className={'chip-icon ' + chip} style={{ width: 42, height: 42 }}><Icon name={icon} size={20} /></div>
      <div className="row-main">
        <div className="row-title">{title}</div>
        {sub && <div className="row-sub">{sub}</div>}
      </div>
      <button
        className={'switch' + (on ? ' on' : '')}
        onClick={onToggle}
        role="switch"
        aria-checked={on}
        aria-label={title}
      />
    </div>
  )
}

export default function Settings() {
  const { navigate } = useNav()
  const [push, setPush] = useState(true)
  const [email, setEmail] = useState(true)
  const [dark, setDark] = useState(false)
  const [twoFa, setTwoFa] = useState(false)

  return (
    <>
      <Topbar title="Settings" sub="Preferences & security" />
      <div className="content page">

        <div className="grid grid-2" style={{ alignItems: 'start' }}>
          {/* General */}
          <div className="card card-pad">
            <div className="card-head">
              <h3 className="section-title">General</h3>
            </div>
            <div className="list">
              <NavRow icon="globe" chip="chip-blue" title="Language" sub="App display language" value="English" onClick={() => {}} />
              <NavRow icon="clock" chip="chip-amber" title="Date & Time" sub="Format & timezone" value="Auto" onClick={() => {}} />
              <NavRow icon="info" chip="chip-green" title="Units" sub="Measurement system" value="Metric" onClick={() => {}} />
            </div>
          </div>

          {/* Preferences */}
          <div className="card card-pad">
            <div className="card-head">
              <h3 className="section-title">Preferences</h3>
            </div>
            <div className="list">
              <ToggleRow icon="bell" chip="chip-green" title="Push Notifications" sub="Alerts on this device" on={push} onToggle={() => setPush(v => !v)} />
              <ToggleRow icon="mail" chip="chip-blue" title="Email Notifications" sub="Summaries to your inbox" on={email} onToggle={() => setEmail(v => !v)} />
              <ToggleRow icon="apps" chip="chip-amber" title="Dark Mode" sub="Reduce screen brightness" on={dark} onToggle={() => setDark(v => !v)} />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="card card-pad">
          <div className="card-head">
            <h3 className="section-title">Security</h3>
          </div>
          <div className="list">
            <NavRow icon="lock" chip="chip-red" title="Change Password" sub="Update your account password" onClick={() => navigate('changePassword')} />
            <ToggleRow icon="shield" chip="chip-blue" title="Two-Factor Authentication" sub="Extra layer of account protection" on={twoFa} onToggle={() => setTwoFa(v => !v)} />
          </div>
        </div>

      </div>
    </>
  )
}
