import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight, Phone } from '@phosphor-icons/react'

export default function ThankYou() {
  return (
    <main style={{
      minHeight: '100dvh',
      paddingTop: 72,
      background: 'var(--midnight-deep)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5rem 2rem',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 150, damping: 20 }}
        style={{
          textAlign: 'center',
          maxWidth: 540,
          padding: '3.5rem',
          borderRadius: 24,
          background: 'rgba(248,249,255,0.03)',
          border: '1px solid rgba(248,249,255,0.08)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.75rem' }}
        >
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'rgba(74,124,255,0.1)',
            border: '1px solid rgba(74,124,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <CheckCircle size={38} weight="fill" style={{ color: '#4a7cff' }} />
          </div>
        </motion.div>

        <h1 style={{
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          color: '#f8f9ff',
          marginBottom: '1rem',
          lineHeight: 1.1,
        }}>
          Thank You for Your Feedback
        </h1>

        <p style={{
          color: 'rgba(248,249,255,0.55)',
          fontSize: '1rem',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
        }}>
          We sincerely appreciate you taking the time to share your experience. Your feedback helps us serve Fort Wayne better every day. If you'd like to discuss anything further, don't hesitate to reach out.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: 100,
                background: 'linear-gradient(135deg, #4a7cff, #001a62)',
                color: '#f8f9ff',
                fontWeight: 700,
                fontSize: '0.95rem',
                border: '1px solid rgba(74,124,255,0.4)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              Back to Home
              <ArrowRight size={15} weight="bold" />
            </motion.button>
          </Link>
          <a href="tel:+12602585303" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: 100,
                background: 'transparent',
                color: 'rgba(248,249,255,0.7)',
                fontWeight: 600,
                fontSize: '0.95rem',
                border: '1px solid rgba(248,249,255,0.15)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <Phone size={15} weight="fill" style={{ color: '#4a7cff' }} />
              Call Us: (260) 258-5303
            </motion.button>
          </a>
        </div>
      </motion.div>
    </main>
  )
}
