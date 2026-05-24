import { Link } from 'react-router-dom'
import { Phone, MapPin, Clock, Star, ArrowRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, var(--midnight-deep) 0%, #000820 100%)',
      borderTop: '1px solid rgba(74,124,255,0.12)',
      padding: '5rem 2rem 2rem',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem',
        }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #4a7cff, #001a62)',
                border: '1px solid rgba(74,124,255,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 18,
                color: '#fff',
              }}>D</div>
              <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>Dorsett Does It</span>
            </div>
            <p style={{ color: 'rgba(248,249,255,0.5)', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: 260 }}>
              Fort Wayne's premier general contractor. Bringing your home renovation visions to life since day one.
            </p>
            <div style={{ display: 'flex', gap: 4, marginTop: '1rem', alignItems: 'center' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={14} weight="fill" style={{ color: '#c9a84c' }} />)}
              <span style={{ color: 'rgba(248,249,255,0.5)', fontSize: '0.8rem', marginLeft: 6 }}>5.0 Google Reviews</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(248,249,255,0.4)', marginBottom: '1.25rem' }}>Services</h4>
            {['Kitchen Remodels', 'Bathroom Conversions', 'Roofing', 'Deck Building', 'Home Additions', 'Flooring', 'Siding', 'General Contracting'].map(s => (
              <div key={s} style={{ color: 'rgba(248,249,255,0.65)', fontSize: '0.9rem', marginBottom: '0.6rem', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f8f9ff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,249,255,0.65)')}
              >{s}</div>
            ))}
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(248,249,255,0.4)', marginBottom: '1.25rem' }}>Company</h4>
            {[
              { label: 'Home', to: '/' },
              { label: 'Gallery', to: '/gallery' },
              { label: 'Leave a Review', to: '/reviews' },
              { label: 'Contact Us', to: '/contact' },
              { label: 'Book Now', to: '/book-now' },
            ].map(l => (
              <Link key={l.to} to={l.to} style={{ display: 'block', color: 'rgba(248,249,255,0.65)', fontSize: '0.9rem', marginBottom: '0.6rem', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f8f9ff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,249,255,0.65)')}
              >{l.label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(248,249,255,0.4)', marginBottom: '1.25rem' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="tel:+12602585303" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(248,249,255,0.65)', fontSize: '0.9rem', transition: 'color 0.2s', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#4a7cff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,249,255,0.65)')}
              >
                <Phone size={16} weight="fill" style={{ color: '#4a7cff', flexShrink: 0 }} />
                (260) 258-5303
              </a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: 'rgba(248,249,255,0.65)', fontSize: '0.9rem' }}>
                <MapPin size={16} weight="fill" style={{ color: '#4a7cff', flexShrink: 0, marginTop: 2 }} />
                Fort Wayne, Indiana
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: 'rgba(248,249,255,0.65)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                <Clock size={16} weight="fill" style={{ color: '#4a7cff', flexShrink: 0, marginTop: 2 }} />
                <span>Tue–Fri: 6 AM–5 PM<br />Sat: 9 AM–12 PM<br />Sun–Mon: Closed</span>
              </div>
            </div>

            <Link to="/book-now">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  marginTop: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '0.65rem 1.25rem',
                  borderRadius: 100,
                  background: 'linear-gradient(135deg, #4a7cff, #001a62)',
                  color: '#f8f9ff',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  border: '1px solid rgba(74,124,255,0.35)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                  cursor: 'pointer',
                }}
              >
                Get a Free Quote
                <ArrowRight size={14} weight="bold" />
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(248,249,255,0.06)',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <p style={{ color: 'rgba(248,249,255,0.3)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} Dorsett Does It. All rights reserved. · Fort Wayne, IN
          </p>
          <p style={{ color: 'rgba(248,249,255,0.2)', fontSize: '0.75rem' }}>
            Licensed General Contractor · Indiana
          </p>
        </div>
      </div>
    </footer>
  )
}
