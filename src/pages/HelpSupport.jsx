import { useState } from 'react'
import Topbar from '../components/Topbar.jsx'
import { Icon } from '../components/Icons.jsx'
import { faqs } from '../data.js'

const contacts = [
  { id: 'ticket', icon: 'ticket', chip: 'chip-green', title: 'Create a Support Ticket', sub: 'Log an issue and track its progress' },
  { id: 'call',   icon: 'phone',  chip: 'chip-blue',  title: 'Call Support',            sub: '+966 800 123 4567' },
  { id: 'email',  icon: 'mail',   chip: 'chip-amber', title: 'Email Support',           sub: 'support@aramcodigital.com' },
]

export default function HelpSupport() {
  const [open, setOpen] = useState(0)

  return (
    <>
      <Topbar title="Help & Support" sub="We’re here to help" />
      <div className="content page">

        <div className="grid" style={{ gridTemplateColumns: '1.6fr 1fr', alignItems: 'start' }}>

          {/* LEFT — FAQ accordion */}
          <div className="card card-pad">
            <div className="card-head">
              <h3>Frequently Asked Questions</h3>
            </div>
            <div className="list">
              {faqs.map((f, i) => {
                const isOpen = open === i
                return (
                  <div key={f.q} style={{ borderBottom: i < faqs.length - 1 ? '1px solid var(--line)' : 'none' }}>
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', textAlign: 'left', padding: '16px 2px' }}
                      aria-expanded={isOpen}
                    >
                      <span style={{ flex: 1, fontWeight: 700, fontSize: 14, color: 'var(--navy)' }}>{f.q}</span>
                      <Icon
                        name="chevron-down"
                        size={18}
                        className="chev"
                        style={{ transition: 'transform .18s ease', transform: isOpen ? 'rotate(180deg)' : 'none' }}
                      />
                    </button>
                    {isOpen && (
                      <p className="muted fade-in" style={{ margin: '0 2px 16px', fontSize: 13.5, lineHeight: 1.55 }}>
                        {f.a}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* RIGHT — Contact support */}
          <div className="col">
            <div className="card card-pad">
              <div className="card-head">
                <h3>Contact Support</h3>
              </div>
              <div className="list">
                {contacts.map(c => (
                  <div className="row row-link" key={c.id}>
                    <div className={'chip-icon ' + c.chip} style={{ width: 42, height: 42 }}>
                      <Icon name={c.icon} size={20} />
                    </div>
                    <div className="row-main">
                      <div className="row-title">{c.title}</div>
                      <div className="row-sub">{c.sub}</div>
                    </div>
                    <Icon name="chevron" size={18} className="chev" />
                  </div>
                ))}
              </div>
            </div>

            <div className="card card-pad" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className="chip-icon chip-green" style={{ width: 42, height: 42 }}>
                <Icon name="clock" size={20} />
              </div>
              <div className="row-main">
                <div className="row-title" style={{ fontSize: 13.5 }}>Avg response under 2 hours</div>
                <div className="row-sub">Support available Sun–Thu, 8 AM – 6 PM (AST)</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
