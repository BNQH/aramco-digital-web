import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { feStatusMeta } from '../data.js'

const siteColor = { 'On air': '#1BA94C', 'Degraded': '#F59E0B', 'Outage': '#EF4444', 'Maintenance': '#2F80ED', 'Acceptance': '#9AA6B5' }
const feColor   = { available: '#1BA94C', en_route: '#2F80ED', on_site: '#F59E0B', off: '#9AA6B5' }

const esc = s => String(s ?? '').replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))

/**
 * Interactive Leaflet map of Field Engineers + Sites over real Saudi geography.
 * Props: engineers[], sites[], showSites, showRoutes, height, interactive
 */
export default function MapView({ engineers = [], sites = [], showSites = true, showRoutes = true, height, interactive = true }) {
  const elRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    if (!elRef.current || mapRef.current) return
    const map = L.map(elRef.current, {
      zoomControl: interactive, dragging: interactive,
      scrollWheelZoom: interactive, doubleClickZoom: interactive,
      boxZoom: interactive, keyboard: interactive,
      tap: interactive, attributionControl: true,
    })
    mapRef.current = map

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap, &copy; CARTO', subdomains: 'abcd', maxZoom: 19,
    }).addTo(map)

    const bounds = []

    if (showSites) {
      sites.forEach(s => {
        const color = siteColor[s.condition] || '#1BA94C'
        const isHub = s.isHub === 'Yes'
        // Hubs keep the tower site glyph but get a gold ring + a small star badge.
        const cls = 'site-emoji' + (isHub ? ' site-hub' : '')
        const badge = isHub ? '<span class="site-hub-star">★</span>' : ''
        const icon = L.divIcon({
          className: '',
          html: `<div class="${cls}" style="border-color:${color}" title="${isHub ? 'Hub site' : 'Site'}">🗼${badge}</div>`,
          iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14],
        })
        L.marker(s.coord, { icon }).addTo(map).bindPopup(
          `<div class="map-pop-title">${esc(s.id)} · ${esc(s.name)}${isHub ? ' ★' : ''}</div><div class="map-pop-sub">${esc(s.city)} · ${esc(s.priority)} · ${esc(s.vendor)} · ${esc(s.condition)}${isHub ? ' · Hub' : ''}</div>`
        )
        bounds.push(s.coord)
      })
    }

    engineers.forEach(e => {
      const color = feColor[e.status] || '#9AA6B5'
      const icon = L.divIcon({ className: '', html: `<div class="fe-pin" style="background:${color}"><span>👷</span></div>`, iconSize: [32, 32], iconAnchor: [16, 30], popupAnchor: [0, -28] })
      L.marker(e.coord, { icon }).addTo(map).bindPopup(
        `<div class="map-pop-title">${esc(e.name)}</div><div class="map-pop-sub">${esc(feStatusMeta[e.status]?.label || e.status)} · ${esc(e.skills.join(', '))}${e.currentTicket ? ' · ' + esc(e.currentTicket) : ''}</div>`
      )
      bounds.push(e.coord)

      // draw a route line for engineers travelling to a ticket site
      if (showRoutes && e.status === 'en_route' && e.currentTicket) {
        const site = sites.find(s => s._ticketFe === e.id) // optional override
        const target = site || sites.find(s => s.id === e._targetSite)
        if (target) L.polyline([e.coord, target.coord], { color: '#2F80ED', weight: 2, dashArray: '4 6', opacity: .7 }).addTo(map)
      }
    })

    if (bounds.length) map.fitBounds(bounds, { padding: [42, 42], maxZoom: 12 })
    else map.setView([24.71, 46.67], 6)

    const inval = () => map.invalidateSize()
    const t = setTimeout(inval, 60)
    window.addEventListener('resize', inval)
    return () => { clearTimeout(t); window.removeEventListener('resize', inval); map.remove(); mapRef.current = null }
  }, [])

  return <div ref={elRef} style={height ? { height } : undefined} />
}
