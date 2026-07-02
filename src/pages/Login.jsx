import { useState } from 'react'
import { Icon, BrandLockup } from '../components/Icons.jsx'
import { useNav } from '../nav.jsx'

const features = [
  { icon: 'clipboard', title: 'Automated ticketing', text: 'PAT, corrective & preventive tickets in one workspace.' },
  { icon: 'route',     title: 'Smart field dispatch', text: 'Auto-assign the nearest, skill-matched engineer.' },
  { icon: 'gauge',     title: 'SLA tracking end-to-end', text: 'Follow every ticket from dispatch to resolution.' },
]

export default function Login() {
  const { navigate } = useNav()
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('ahmad.hudis@aramcodigital.com')
  const [pwd, setPwd] = useState('demo1234')

  const signIn = (e) => { e.preventDefault(); navigate('dashboard') }

  return (
    <div className="auth-wrap">
      <div className="auth-brand">
        <div className="b-top">
          <BrandLockup height={46} light />
        </div>
        <div className="b-mid">
          <div className="auth-headline">Network Operations,<br/>automated end-to-end.</div>
          <p className="auth-sub">Sign in to automate ticket creation and dispatch field teams within SLA.</p>
          <div style={{ marginTop: 30 }}>
            {features.map(f => (
              <div className="auth-feature" key={f.title}>
                <div className="af-ic"><Icon name={f.icon} size={20} /></div>
                <div>
                  <div style={{ fontWeight: 700 }}>{f.title}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,.72)' }}>{f.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="b-bottom" style={{ marginTop: 40, fontSize: 12.5, color: 'rgba(255,255,255,.6)' }}>
          © 2026 Aramco Digital · Need help? Contact IT Support
        </div>
      </div>

      <div className="auth-panel">
        <form className="auth-card" onSubmit={signIn}>
          <h2>Sign in</h2>
          <p className="muted">Use your employee ID or email to continue.</p>

          <div className="field">
            <label>Employee ID or Email</label>
            <div className="input-wrap">
              <span className="input-icon"><Icon name="user" size={18} /></span>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Employee ID or Email" />
            </div>
          </div>

          <div className="field">
            <label>Password</label>
            <div className="input-wrap">
              <span className="input-icon"><Icon name="lock" size={18} /></span>
              <input type={show ? 'text' : 'password'} value={pwd} onChange={e => setPwd(e.target.value)} placeholder="Password" />
              <button type="button" className="toggle-eye" onClick={() => setShow(s => !s)} aria-label="Toggle password">
                <Icon name={show ? 'eye-off' : 'eye'} size={18} />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '4px 0 22px' }}>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'var(--muted)' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--green)', width: 16, height: 16 }} /> Remember me
            </label>
            <a className="link-green" href="#" onClick={e => e.preventDefault()}>Forgot password?</a>
          </div>

          <button className="btn btn-primary btn-block btn-lg" type="submit">Sign in</button>

          <div className="divider-or">or</div>

          <button type="button" className="btn btn-ghost btn-block" onClick={() => navigate('dashboard')}>
            <Icon name="sso" size={18} /> Sign in with SSO
          </button>

          <button type="button" className="btn btn-ghost btn-block" style={{ marginTop: 12 }} onClick={() => navigate('admin')}>
            <Icon name="shield" size={18} /> Open Admin Console
          </button>

          <p style={{ textAlign: 'center', marginTop: 26, fontSize: 13, color: 'var(--muted)' }}>
            Need help? <a className="link-green" href="#" onClick={e => e.preventDefault()}>Contact IT Support</a>
          </p>
        </form>
      </div>
    </div>
  )
}
