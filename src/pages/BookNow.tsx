import { motion } from 'framer-motion'
import { Phone, MapPin, Clock, Star, CheckCircle } from '@phosphor-icons/react'

export default function BookNow() {
  return (
    <main style={{ minHeight: '100dvh', paddingTop: 72, background: 'var(--midnight-deep)' }}>

      {/* Hero band */}
      <section style={{
        padding: '5rem 2rem 3rem',
        background: 'linear-gradient(180deg, rgba(0,26,98,0.5) 0%, transparent 100%)',
        borderBottom: '1px solid rgba(74,124,255,0.1)',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
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
          }}>Free Consultation</span>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            color: '#f8f9ff',
            marginBottom: '1.25rem',
          }}>
            Book Your Project<br />
            <span style={{ color: '#4a7cff' }}>Today</span>
          </h1>

          <p style={{
            color: 'rgba(248,249,255,0.55)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: 1.7,
            maxWidth: '50ch',
            margin: '0 auto',
          }}>
            Fill out the form below and we'll reach out within 24 hours to schedule your free, no-obligation consultation.
          </p>
        </motion.div>
      </section>

      {/* Main grid: form + sidebar */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2rem 7rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>

        {/* GHL Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            borderRadius: 20,
            overflow: 'hidden',
            border: '1px solid rgba(74,124,255,0.15)',
            background: 'rgba(248,249,255,0.02)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 32px 64px rgba(0,0,0,0.3)',
            minHeight: 1200,
          }}
        >
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/k6DmyYgsR57cC8vHRiwm"
            style={{ width: '100%', height: '100%', border: 'none', minHeight: 1200, display: 'block' }}
            id="inline-k6DmyYgsR57cC8vHRiwm"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Dorsett Does It "
            data-height="1906"
            data-layout-iframe-id="inline-k6DmyYgsR57cC8vHRiwm"
            data-form-id="k6DmyYgsR57cC8vHRiwm"
            title="Dorsett Does It "
          />
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {/* Contact card */}
          <div style={{
            padding: '2rem',
            borderRadius: 16,
            background: 'rgba(248,249,255,0.03)',
            border: '1px solid rgba(74,124,255,0.15)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
          }}>
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem', color: '#f8f9ff' }}>Prefer to call?</h3>

            <a href="tel:+12602585303" style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '1rem 1.25rem',
              borderRadius: 12,
              background: 'rgba(74,124,255,0.08)',
              border: '1px solid rgba(74,124,255,0.2)',
              marginBottom: '1rem',
              textDecoration: 'none',
              color: '#f8f9ff',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(74,124,255,0.15)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(74,124,255,0.08)')}
            >
              <Phone size={22} weight="fill" style={{ color: '#4a7cff', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>(260) 258-5303</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(248,249,255,0.45)' }}>Call or text anytime</div>
              </div>
            </a>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '0.85rem 0', borderTop: '1px solid rgba(248,249,255,0.06)' }}>
              <MapPin size={18} weight="fill" style={{ color: '#4a7cff', flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Fort Wayne, Indiana</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(248,249,255,0.4)' }}>Serving the greater Fort Wayne area</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '0.85rem 0', borderTop: '1px solid rgba(248,249,255,0.06)' }}>
              <Clock size={18} weight="fill" style={{ color: '#4a7cff', flexShrink: 0, marginTop: 2 }} />
              <div style={{ fontSize: '0.875rem', color: 'rgba(248,249,255,0.6)', lineHeight: 1.8 }}>
                Tue–Fri: 6 AM–5 PM<br />
                Sat: 9 AM–12 PM<br />
                Sun–Mon: Closed
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div style={{
            padding: '2rem',
            borderRadius: 16,
            background: 'rgba(201,168,76,0.04)',
            border: '1px solid rgba(201,168,76,0.15)',
          }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: '1rem' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={18} weight="fill" style={{ color: '#c9a84c' }} />)}
            </div>
            <p style={{ fontSize: '0.9rem', color: 'rgba(248,249,255,0.7)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '0.75rem' }}>
              "Best contractor in Fort Wayne. Honest, fast, and the quality is unmatched. Our kitchen looks absolutely stunning."
            </p>
            <p style={{ fontSize: '0.78rem', color: 'rgba(248,249,255,0.35)', fontWeight: 500 }}>— 5-star Google Review</p>
          </div>

          {/* Trust signals */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              'Free, no-obligation consultation',
              'Licensed & insured in Indiana',
              'Response within 24 hours',
              'Transparent, fixed pricing',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle size={18} weight="fill" style={{ color: '#4a7cff', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'rgba(248,249,255,0.65)' }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <script src="https://link.msgsndr.com/js/form_embed.js" />
    </main>
  )
}
