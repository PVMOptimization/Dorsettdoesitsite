import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from '@phosphor-icons/react'

const YOUTUBE_URL = 'https://www.youtube.com/@DorsettDoesIt'

export default function Reviews() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const handleSelect = (rating: number) => {
    setSelected(rating)
    setSubmitted(true)

    setTimeout(() => {
      if (rating >= 4) {
        window.location.href = YOUTUBE_URL
      } else {
        navigate('/thank-you')
      }
    }, 1200)
  }

  const display = hovered ?? selected ?? 0

  return (
    <main style={{ minHeight: '100dvh', paddingTop: 72, background: 'var(--midnight-deep)', display: 'flex', flexDirection: 'column' }}>

      {/* Hero band */}
      <section style={{
        padding: '5rem 2rem 4rem',
        background: 'linear-gradient(180deg, rgba(0,26,98,0.5) 0%, transparent 100%)',
        borderBottom: '1px solid rgba(74,124,255,0.1)',
        textAlign: 'center',
      }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: '1.5rem' }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={28} weight="fill" style={{ color: '#c9a84c' }} />)}
          </div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            color: '#f8f9ff',
            marginBottom: '1.25rem',
          }}>
            How Did We Do?
          </h1>
          <p style={{
            color: 'rgba(248,249,255,0.55)',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            lineHeight: 1.7,
            maxWidth: '46ch',
            margin: '0 auto',
          }}>
            Your feedback matters to us. Rate your experience with Dorsett Does It below.
          </p>
        </motion.div>
      </section>

      {/* Rating section */}
      <section style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 2rem',
      }}>
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="rating"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: '3.5rem',
                borderRadius: 24,
                background: 'rgba(248,249,255,0.03)',
                border: '1px solid rgba(248,249,255,0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
                textAlign: 'center',
                maxWidth: 520,
                width: '100%',
              }}
            >
              <h2 style={{ fontWeight: 700, fontSize: '1.3rem', color: '#f8f9ff', marginBottom: '0.5rem' }}>
                Rate Your Experience
              </h2>
              <p style={{ color: 'rgba(248,249,255,0.45)', fontSize: '0.9rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                Select a star rating below. 4–5 stars takes you to our YouTube channel to see more of our work.
              </p>

              {/* Stars */}
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  justifyContent: 'center',
                  marginBottom: '2rem',
                }}
                onMouseLeave={() => setHovered(null)}
              >
                {[1, 2, 3, 4, 5].map(star => (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSelect(star)}
                    onMouseEnter={() => setHovered(star)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                    }}
                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                  >
                    <Star
                      size={52}
                      weight={star <= display ? 'fill' : 'regular'}
                      style={{
                        color: star <= display ? '#c9a84c' : 'rgba(248,249,255,0.15)',
                        transition: 'color 0.15s',
                        display: 'block',
                      }}
                    />
                  </motion.button>
                ))}
              </div>

              {/* Label */}
              <AnimatePresence mode="wait">
                {display > 0 && (
                  <motion.div
                    key={display}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      padding: '0.6rem 1.25rem',
                      borderRadius: 100,
                      background: display >= 4 ? 'rgba(74,124,255,0.1)' : 'rgba(248,249,255,0.05)',
                      border: `1px solid ${display >= 4 ? 'rgba(74,124,255,0.3)' : 'rgba(248,249,255,0.1)'}`,
                      display: 'inline-block',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: display >= 4 ? '#4a7cff' : 'rgba(248,249,255,0.5)',
                    }}
                  >
                    {display === 1 && 'Not satisfied'}
                    {display === 2 && 'Could be better'}
                    {display === 3 && 'It was okay'}
                    {display === 4 && 'Great experience!'}
                    {display === 5 && 'Outstanding — we loved it!'}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hint */}
              <p style={{ color: 'rgba(248,249,255,0.25)', fontSize: '0.78rem', marginTop: '2rem' }}>
                Ratings of 4–5 will redirect you to our YouTube channel
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
              style={{ textAlign: 'center' }}
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -5, 5, 0], scale: [1, 1.2, 1.2, 1.1, 1.1, 1] }}
                transition={{ duration: 0.6 }}
                style={{ fontSize: '4rem', marginBottom: '1.5rem', display: 'block' }}
              >
                <Star size={72} weight="fill" style={{ color: '#c9a84c' }} />
              </motion.div>
              <h2 style={{ fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.03em', color: '#f8f9ff', marginBottom: '0.75rem' }}>
                {selected! >= 4 ? 'You\'re awesome!' : 'Thank you!'}
              </h2>
              <p style={{ color: 'rgba(248,249,255,0.5)', fontSize: '1rem' }}>
                {selected! >= 4 ? 'Redirecting you to our YouTube channel…' : 'Taking you to our thank-you page…'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* How it works */}
      <section style={{ padding: '3rem 2rem 6rem', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.25rem',
        }}>
          {[
            { stars: '1–3 Stars', label: 'Feedback received', desc: 'We take all feedback seriously and use it to improve.', color: 'rgba(248,249,255,0.1)', border: 'rgba(248,249,255,0.1)' },
            { stars: '4–5 Stars', label: 'See more of our work', desc: "You'll be redirected to our YouTube channel to see projects.", color: 'rgba(74,124,255,0.08)', border: 'rgba(74,124,255,0.25)' },
          ].map(item => (
            <motion.div
              key={item.stars}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                padding: '1.5rem',
                borderRadius: 14,
                background: item.color,
                border: `1px solid ${item.border}`,
                textAlign: 'left',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#f8f9ff', marginBottom: '0.4rem' }}>{item.stars}</div>
              <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#4a7cff', marginBottom: '0.5rem' }}>{item.label}</div>
              <div style={{ fontSize: '0.825rem', color: 'rgba(248,249,255,0.45)', lineHeight: 1.6 }}>{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}
