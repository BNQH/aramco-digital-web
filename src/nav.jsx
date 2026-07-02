import { createContext, useContext } from 'react'

// Navigation context: { route, params, navigate, back }
export const NavContext = createContext(null)
export const useNav = () => useContext(NavContext)
