import { motion } from 'framer-motion'
import { Phone, MapPin, Clock, Star, ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

export default function Contact() {
  return (
    <main style={{ minHeight: '100dvh', paddingTop: 72, background: 'var(--midnight-deep)' }}>

      {/* Hero */}
      <section style={{
        padding: '5rem 2rem 4rem',
        background: 'linear-gradient(180deg, rgba(0,26,98,0.5) 0%, transparent 100%)',
        borderBottom: '1px solid rgba(74,124,255,0.1)',
        textAlign: 'center',
      }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <span style={{
            display: 'inline-block',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#4a7cff',
            marginBottom: '1rem',
            padding: '0.4rem 1rem',
            borderRadius: 100,
            border: '1px solid rgba(74,124,255,0.3)',
            background: 'rgba(74,124,255,0.08)',
          }}>Get In Touch</span>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            color: '#f8f9ff',
            marginBottom: '1.25rem',
          }}>
            Let's Talk About<br />
            <span style={{ color: '#4a7cff' }}>Your Project</span>
          </h1>

          <p style={{
            color: 'rgba(248,249,255,0.55)',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            lineHeight: 1.7,
            maxWidth: '50ch',
            margin: '0 auto',
          }}>
            We respond within 24 hours. No pressure, no obligations — just a real conversation about what you need.
          </p>
        </motion.div>
      </section>

      {/* Contact grid */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '5rem 2rem 7rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>

        {/* GHL Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            borderRadius: 20,
            overflow: 'hidden',
            border: '1px solid rgba(74,124,255,0.15)',
            background: 'rgba(248,249,255,0.02)',
            minHeight: 1200,
          }}
        >
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/YhUJcEo0MviugsvUGwv5"
            style={{ width: '100%', height: '100%', border: 'none', minHeight: 1200, display: 'block' }}
            id="inline-YhUJcEo0MviugsvUGwv5-contact"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-activation-type="alwaysActivated"
            data-deactivation-type="neverDeactivate"
            data-form-name="Contact Form"
            data-height="1182"
            data-form-id="YhUJcEo0MviugsvUGwv5"
            title="Contact Form"
          />
        </motion.div>

        {/* Info sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >

          {/* Quick contact */}
          <div style={{
            padding: '2rem',
            borderRadius: 16,
            background: 'rgba(248,249,255,0.03)',
            border: '1px solid rgba(74,124,255,0.15)',
          }}>
            <h3 style={{ fontWeight: 700, fontSize: '0.8rem', marginBottom: '1.5rem', color: 'rgba(248,249,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Quick Contact</h3>

            {[
              { icon: Phone, label: '(260) 258-5303', sub: 'Call or text anytime', href: 'tel:+12602585303' },
              { icon: MapPin, label: 'Fort Wayne, Indiana', sub: 'Serving the greater area', href: null },
            ].map(item => {
              const Icon = item.icon
              const content = (
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '0.85rem 0', borderBottom: '1px solid rgba(248,249,255,0.06)', cursor: item.href ? 'pointer' : 'default' }}>
                  <Icon size={20} weight="fill" style={{ color: '#4a7cff', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#f8f9ff' }}>{item.label}</div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(248,249,255,0.4)' }}>{item.sub}</div>
                  </div>
                </div>
              )
              return item.href
                ? <a key={item.label} href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>{content}</a>
                : <div key={item.label}>{content}</div>
            })}

            {/* Hours */}
            <div style={{ paddingTop: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <Clock size={20} weight="fill" style={{ color: '#4a7cff', flexShrink: 0, marginTop: 3 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#f8f9ff', marginBottom: '0.5rem' }}>Business Hours</div>
                  {[
                    ['Tuesday – Friday', '6 AM – 5 PM'],
                    ['Saturday', '9 AM – 12 PM'],
                    ['Sunday – Monday', 'Closed'],
                  ].map(([day, hrs]) => (
                    <div key={day} style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', fontSize: '0.85rem', color: 'rgba(248,249,255,0.55)', marginBottom: '0.3rem' }}>
                      <span>{day}</span>
                      <span style={{ color: hrs === 'Closed' ? 'rgba(248,249,255,0.3)' : 'rgba(248,249,255,0.7)', fontWeight: 500 }}>{hrs}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Rating card */}
          <div style={{
            padding: '2rem',
            borderRadius: 16,
            background: 'rgba(201,168,76,0.04)',
            border: '1px solid rgba(201,168,76,0.15)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', gap: 3 }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} weight="fill" style={{ color: '#c9a84c' }} />)}
              </div>
              <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#f8f9ff' }}>5.0</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'rgba(248,249,255,0.55)', lineHeight: 1.6 }}>
              Over 5 stars on Google Reviews. Fort Wayne's most trusted general contractor.
            </p>
            <Link to="/reviews" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: '1rem', color: '#4a7cff', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>
              Leave your review
              <ArrowRight size={14} weight="bold" />
            </Link>
          </div>

          {/* Book now CTA */}
          <Link to="/book-now">
            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{
                padding: '1.5rem 2rem',
                borderRadius: 16,
                background: 'linear-gradient(135deg, rgba(74,124,255,0.15), rgba(0,26,98,0.3))',
                border: '1px solid rgba(74,124,255,0.25)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f8f9ff', marginBottom: '0.25rem' }}>Ready to start?</div>
                <div style={{ fontSize: '0.825rem', color: 'rgba(248,249,255,0.45)' }}>Book a free consultation online</div>
              </div>
              <ArrowRight size={20} style={{ color: '#4a7cff' }} weight="bold" />
            </motion.div>
          </Link>
        </motion.div>
      </section>

      <script src="https://link.msgsndr.com/js/form_embed.js" />
    </main>
  )
}
