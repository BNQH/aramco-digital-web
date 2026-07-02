import { BrandLockup, Icon } from '../components/Icons.jsx'
import { useNav } from '../nav.jsx'

export default function LoggedOut() {
  const { navigate } = useNav()

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--brand-grad)', color: '#fff' }}>
      <div style={{ textAlign: 'center', maxWidth: 420, padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
          <BrandLockup height={52} light />
        </div>

        <div style={{
          width: 96, height: 96, borderRadius: '50%', background: 'rgba(255,255,255,.15)',
          display: 'grid', placeItems: 'center', margin: '0 auto 28px', color: '#fff'
        }}>
          <Icon name="check" size={44} />
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 12px', color: '#fff' }}>
          You have been logged out
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,.78)', margin: '0 0 34px' }}>
          Thank you for using Aramco Digital
        </p>

        <button
          className="btn btn-light btn-block btn-lg"
          style={{ maxWidth: 300, margin: '0 auto' }}
          onClick={() => navigate('login')}
        >
          Login Again
        </button>
      </div>
    </div>
  )
}
