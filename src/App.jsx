import { useState, useCallback } from 'react'
import { NavContext } from './nav.jsx'
import Sidebar from './components/Sidebar.jsx'

import Login from './pages/Login.jsx'
import LoggedOut from './pages/LoggedOut.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Tickets from './pages/Tickets.jsx'
import TicketDetails from './pages/TicketDetails.jsx'
import LiveMap from './pages/LiveMap.jsx'
import FieldEngineers from './pages/FieldEngineers.jsx'
import Sites from './pages/Sites.jsx'
import SiteDetails from './pages/SiteDetails.jsx'
import Reports from './pages/Reports.jsx'
import Admin from './pages/Admin.jsx'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import ChangePassword from './pages/ChangePassword.jsx'
import HelpSupport from './pages/HelpSupport.jsx'

const PAGES = {
  dashboard: Dashboard,
  tickets: Tickets,
  ticketDetails: TicketDetails,
  map: LiveMap,
  engineers: FieldEngineers,
  sites: Sites,
  siteDetails: SiteDetails,
  reports: Reports,
  admin: Admin,
  profile: Profile,
  settings: Settings,
  changePassword: ChangePassword,
  help: HelpSupport,
}

const FULLSCREEN = { login: Login, loggedOut: LoggedOut }

export default function App() {
  const [stack, setStack] = useState([{ route: 'login', params: {} }])
  const current = stack[stack.length - 1]

  const navigate = useCallback((route, params = {}) => {
    setStack(s => {
      if (route === 'login' || route === 'dashboard' || route === 'loggedOut') {
        return [{ route, params }]
      }
      return [...s, { route, params }]
    })
  }, [])

  const back = useCallback(() => {
    setStack(s => (s.length > 1 ? s.slice(0, -1) : s))
  }, [])

  const ctx = { route: current.route, params: current.params, navigate, back }

  if (FULLSCREEN[current.route]) {
    const Full = FULLSCREEN[current.route]
    return (
      <NavContext.Provider value={ctx}>
        <Full key={current.route} />
      </NavContext.Provider>
    )
  }

  const Page = PAGES[current.route] || Dashboard
  return (
    <NavContext.Provider value={ctx}>
      <div className="app-shell">
        <Sidebar />
        <main className="main">
          <div key={current.route + JSON.stringify(current.params)} className="fade-in" style={{ display: 'contents' }}>
            <Page />
          </div>
        </main>
      </div>
    </NavContext.Provider>
  )
}
