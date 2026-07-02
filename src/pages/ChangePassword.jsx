import { useState } from 'react'
import Topbar from '../components/Topbar.jsx'
import { Icon } from '../components/Icons.jsx'
import { useNav } from '../nav.jsx'

function PwdField({ label, value, onChange, show, setShow, placeholder }) {
  return (
    <div className="field">
      <label>{label}</label>
      <div className="input-wrap">
        <span className="input-icon"><Icon name="lock" size={18} /></span>
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
        />
        <button type="button" className="toggle-eye" onClick={() => setShow(s => !s)} aria-label="Toggle password">
          <Icon name={show ? 'eye-off' : 'eye'} size={18} />
        </button>
      </div>
    </div>
  )
}

export default function ChangePassword() {
  const { back } = useNav()

  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')

  const [showCurrent, setShowCurrent] = useState(false)
  const [showNext, setShowNext] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const rules = [
    { label: 'Minimum 8 characters', met: next.length >= 8 },
    { label: 'At least one number', met: /[0-9]/.test(next) },
    { label: 'At least one uppercase letter', met: /[A-Z]/.test(next) },
    { label: 'At least one special character', met: /[^A-Za-z0-9]/.test(next) },
  ]

  return (
    <>
      <Topbar title="Change Password" sub="Keep your account secure." showBack />
      <div className="content narrow page">

        <div className="card card-pad" style={{ maxWidth: 520, width: '100%', margin: '0 auto' }}>
          <div className="card-head">
            <h3>Update your password</h3>
            <div className="chip-icon chip-green" style={{ width: 40, height: 40 }}>
              <Icon name="shield" size={20} />
            </div>
          </div>

          <PwdField
            label="Current Password"
            value={current}
            onChange={setCurrent}
            show={showCurrent}
            setShow={setShowCurrent}
            placeholder="Enter current password"
          />
          <PwdField
            label="New Password"
            value={next}
            onChange={setNext}
            show={showNext}
            setShow={setShowNext}
            placeholder="Enter new password"
          />
          <PwdField
            label="Confirm New Password"
            value={confirm}
            onChange={setConfirm}
            show={showConfirm}
            setShow={setShowConfirm}
            placeholder="Re-enter new password"
          />

          <div style={{ marginTop: 4, marginBottom: 22 }}>
            <div className="section-title" style={{ marginBottom: 12 }}>Password must contain:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {rules.map(r => (
                <div
                  key={r.label}
                  className={r.met ? 'text-green' : 'muted-2'}
                  style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, fontWeight: r.met ? 700 : 600 }}
                >
                  <Icon name="check-circle" size={18} style={{ color: r.met ? 'var(--green)' : 'var(--muted-2)' }} />
                  {r.label}
                </div>
              ))}
            </div>
          </div>

          <button className="btn btn-primary btn-block btn-lg" onClick={() => back()}>
            Update Password
          </button>
        </div>

      </div>
    </>
  )
}
