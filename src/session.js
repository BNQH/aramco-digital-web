import { user as defaultUser } from './data.js'

/**
 * Demo session (no backend).
 * Whoever signs in determines the session role; `isAdmin` gates admin-only UI
 * such as the "Administration" item in the sidebar. When a real backend is
 * added, replace `signIn` with the auth response and keep the same shape.
 */

// Accounts that carry the admin privilege. Matching is by email or user ID.
const ADMIN_ACCOUNTS = [
  {
    match: ['admin', 'admin@aramcodigital.com', 'u-1000'],
    name: 'System Administrator', role: 'Administrator', team: 'IT — HQ', initials: 'SA', isAdmin: true,
  },
  {
    // Sara has the "Head" role, which per the role matrix has Admin: full.
    match: ['sara.alamri@aramcodigital.com', 'u-1002'],
    name: 'Sara Al-Amri', role: 'Head', team: 'ISP — All regions', initials: 'SA', isAdmin: true,
  },
]

export let session = { ...defaultUser, isAdmin: false }

export function signIn(identifier = '') {
  const id = identifier.trim().toLowerCase()
  const acc = ADMIN_ACCOUNTS.find(a => a.match.includes(id))
  session = acc ? { ...defaultUser, ...acc } : { ...defaultUser, isAdmin: false }
  return session
}

export const signInAsAdmin = () => signIn('admin')
