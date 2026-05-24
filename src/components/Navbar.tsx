import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X, Phone, Star } from '@phosphor-icons/react'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <>
      <motion.nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
          height: '72px',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-bottom 0.4s ease',
          background: scrolled
            ? 'rgba(0, 16, 61, 0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(74,124,255,0.1)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #4a7cff, #001a62)',
            border: '1px solid rgba(74,124,255,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.5px',
          }}>D</div>
          <span style={{
            fontWeight: 700,
            fontSize: '1.1rem',
            letterSpacing: '-0.02em',
            color: '#f8f9ff',
          }}>Dorsett Does It</span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                fontSize: '0.9rem',
                fontWeight: 500,
                letterSpacing: '0.01em',
                color: location.pathname === l.to ? '#f8f9ff' : 'rgba(248,249,255,0.6)',
                transition: 'color 0.2s',
                position: 'relative',
              }}
            >
              {l.label}
              {location.pathname === l.to && (
                <motion.div layoutId="nav-indicator" style={{
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  right: 0,
                  height: 1.5,
                  background: '#4a7cff',
                  borderRadius: 2,
                }} />
              )}
            </Link>
          ))}
          <Link to="/book-now">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.55rem 1.3rem',
                borderRadius: '100px',
                background: 'linear-gradient(135deg, #4a7cff, #001a62)',
                color: '#f8f9ff',
                fontWeight: 600,
                fontSize: '0.875rem',
                border: '1px solid rgba(74,124,255,0.35)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Phone size={14} weight="fill" />
              Book Now
            </motion.button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#f8f9ff',
            cursor: 'pointer',
            padding: '8px',
          }}
          className="hamburger"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <List size={24} />}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: 72,
              left: 0,
              right: 0,
              zIndex: 999,
              background: 'rgba(0,16,61,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(74,124,255,0.15)',
              padding: '1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {links.map(l => (
              <Link key={l.to} to={l.to} style={{
                fontSize: '1.1rem',
                fontWeight: 500,
                color: location.pathname === l.to ? '#4a7cff' : 'rgba(248,249,255,0.8)',
              }}>
                {l.label}
              </Link>
            ))}
            <Link to="/book-now">
              <button style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '100px',
                background: 'linear-gradient(135deg, #4a7cff, #001a62)',
                color: '#f8f9ff',
                fontWeight: 600,
                fontSize: '1rem',
                border: '1px solid rgba(74,124,255,0.35)',
                cursor: 'pointer',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}>
                <Phone size={16} weight="fill" />
                Book Now
              </button>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold)', fontSize: '0.875rem' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={14} weight="fill" />)}
              <span style={{ color: 'rgba(248,249,255,0.6)', marginLeft: 4 }}>5.0 · Google</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </>
  )
}
