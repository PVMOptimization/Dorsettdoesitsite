import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Phone, ArrowRight, Star, HouseLine, Bathtub, Hammer,
  Wrench, TreePalm, Buildings, CheckCircle, Play,
  ArrowDown
} from '@phosphor-icons/react'

/* ─── Hero phases shown while scrolling through video 1 ── */
const heroPhases = [
  {
    tag: 'Fort Wayne\'s #1 Contractor',
    title: 'Built to Last.\nBuilt for You.',
    body: 'From kitchens to full additions — exceptional craftsmanship delivered on time.',
    cta: 'Get a Free Quote',
    ctaTo: '/book-now',
    cta2: '(260) 258-5303',
  },
  {
    tag: 'Kitchen Remodels',
    title: 'Kitchens That\nStop You Cold.',
    body: 'Custom cabinetry, countertops, and complete gut renovations that make cooking worth doing.',
    cta: 'See Kitchen Work',
    ctaTo: '/gallery',
    cta2: 'Book a Consult',
  },
  {
    tag: 'Roofing & Exteriors',
    title: 'Protected from\nTop to Bottom.',
    body: 'Expert roofing, siding, and exterior upgrades built to stand up to Indiana weather.',
    cta: 'Get Roofing Quote',
    ctaTo: '/contact',
    cta2: 'View Gallery',
  },
  {
    tag: 'Decks & Additions',
    title: 'More Space.\nMore Life.',
    body: 'Custom decks, home additions, and outdoor living spaces that expand what\'s possible.',
    cta: 'Start My Project',
    ctaTo: '/book-now',
    cta2: 'See Our Work',
  },
]

/* ─── Bathroom phases shown while scrolling through video 2 ── */
const bathPhases = [
  {
    tag: 'Bathroom Conversions',
    title: 'Your Bathroom,\nCompletely Reimagined.',
    body: 'Walk-in showers, soaking tubs, heated floors — we build bathrooms worth waking up for.',
    cta: 'Book Consultation',
    ctaTo: '/book-now',
    cta2: 'View Gallery',
  },
  {
    tag: 'Spa-Level Craftsmanship',
    title: 'Every Tile.\nPerfectly Placed.',
    body: 'Custom tile work, frameless glass, and precision finishes that look like they belong in a magazine.',
    cta: 'View Bathroom Gallery',
    ctaTo: '/gallery',
    cta2: 'Book Now',
  },
]

/* ─── Services ── */
const services = [
  { icon: HouseLine, label: 'Kitchen Remodels', desc: 'Custom cabinetry, countertops & full gut renovations' },
  { icon: Bathtub, label: 'Bathroom Conversions', desc: 'Walk-in showers, tile work & complete transformations' },
  { icon: Buildings, label: 'Home Additions', desc: 'Seamless additions that feel like original architecture' },
  { icon: TreePalm, label: 'Deck Building', desc: 'Composite & hardwood decks built to last decades' },
  { icon: Hammer, label: 'Roofing', desc: 'Full roof replacements & emergency repairs' },
  { icon: Wrench, label: 'General Contracting', desc: 'Flooring, siding, painting & everything in between' },
]

const stats = [
  { value: '5.0', label: 'Google Rating' },
  { value: '200+', label: 'Projects Done' },
  { value: '10+', label: 'Years Active' },
  { value: '100%', label: 'Licensed & Insured' },
]

/* ─── VIDEO SECTION scroll + scrub logic ────────────────────────────────────
 *  Everything lives in ONE useEffect so the play()→pause() unlock call
 *  happens directly inside the scroll event (a genuine user-interaction
 *  context). Splitting it across hooks or useEffect dependencies breaks
 *  the browser's autoplay/seek security gate, freezing the video.
 * ─────────────────────────────────────────────────────────────────────── */
function useVideoSection(
  wrapperRef: React.RefObject<HTMLDivElement>,
  videoRef: React.RefObject<HTMLVideoElement>,
  numPhases: number
) {
  const [phase, setPhase] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const video = videoRef.current
    if (!wrapper || !video) return

    // Detect mobile — iOS/Android scroll events are NOT user gestures,
    // so play() called from a scroll handler is blocked. We let autoPlay
    // handle video display on mobile and only scrub on desktop.
    const isMobile = window.matchMedia('(max-width: 768px)').matches
      || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)

    // ── Mobile path: just track phase, autoPlay+loop handles the video ──
    if (isMobile) {
      const onScroll = () => {
        const rect = wrapper.getBoundingClientRect()
        const scrolledIn = -rect.top
        const total = rect.height - window.innerHeight
        const p = total > 0 ? Math.max(0, Math.min(1, scrolledIn / total)) : 0
        setProgress(p)
        setPhase(Math.min(numPhases - 1, Math.floor(p * numPhases)))
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      return () => window.removeEventListener('scroll', onScroll)
    }

    // ── Desktop path: rAF-throttled scroll scrub ──
    // autoPlay already starts the video, so the play()→pause() unlock
    // below succeeds immediately — no waiting for user gesture.
    let unlocked = false
    let latestProgress = 0
    let rafId = 0

    // * 1.25 → video hits 100% at p=0.80, final frame held for last 20% of scroll
    const seek = (p: number) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (!video.duration) return
        video.currentTime = Math.min(video.duration, p * video.duration * 1.25)
      })
    }

    const onMeta = () => seek(latestProgress)
    video.addEventListener('loadedmetadata', onMeta)

    const onScroll = async () => {
      const rect = wrapper.getBoundingClientRect()
      const scrolledIn = -rect.top
      const total = rect.height - window.innerHeight
      const p = total > 0 ? Math.max(0, Math.min(1, scrolledIn / total)) : 0

      latestProgress = p
      setProgress(p)
      setPhase(Math.min(numPhases - 1, Math.floor(p * numPhases)))

      if (!unlocked) {
        unlocked = true
        try {
          // autoPlay already started the video, so play() resolves instantly.
          // Pausing immediately hands currentTime control to scroll.
          await video.play()
          video.pause()
        } catch (_) {
          // Browser may allow seeking without this — continue either way
        }
      }

      seek(p)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      video.removeEventListener('loadedmetadata', onMeta)
    }
  }, [wrapperRef, videoRef, numPhases])

  return { phase, progress }
}

/* ─── Vignette gradient overlay (shared) ─── */
function Vignette({ top = true, bottom = true }: { top?: boolean; bottom?: boolean }) {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 1,
      pointerEvents: 'none',
      background: [
        'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 25%, rgba(0,16,61,0.55) 100%)',
        top && 'linear-gradient(to bottom, rgba(0,16,61,0.7) 0%, transparent 18%)',
        bottom && 'linear-gradient(to top, rgba(0,16,61,0.98) 0%, transparent 18%)',
      ].filter(Boolean).join(', '),
    }} />
  )
}

/* ─── Phase content card ─── */
function PhaseCard({ phase }: { phase: typeof heroPhases[0] }) {
  return (
    <motion.div
      key={phase.title}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{ maxWidth: 600 }}
    >
      <span style={{
        display: 'inline-block',
        fontSize: '0.7rem',
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: '#4a7cff',
        marginBottom: '1.25rem',
        padding: '0.35rem 1rem',
        borderRadius: 100,
        border: '1px solid rgba(74,124,255,0.35)',
        background: 'rgba(74,124,255,0.1)',
        backdropFilter: 'blur(8px)',
      }}>{phase.tag}</span>

      <h1 style={{
        fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)',
        fontWeight: 900,
        letterSpacing: '-0.04em',
        lineHeight: 1.02,
        color: '#f8f9ff',
        marginBottom: '1.25rem',
        whiteSpace: 'pre-line',
      }}>{phase.title}</h1>

      <p style={{
        color: 'rgba(248,249,255,0.7)',
        fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
        lineHeight: 1.65,
        marginBottom: '2rem',
        maxWidth: '46ch',
      }}>{phase.body}</p>

      <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Link to={phase.ctaTo}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '0.85rem 1.8rem',
              borderRadius: 100,
              background: 'linear-gradient(135deg, #4a7cff, #001a62)',
              color: '#f8f9ff',
              fontWeight: 700,
              fontSize: '0.95rem',
              border: '1px solid rgba(74,124,255,0.45)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 10px 28px rgba(74,124,255,0.3)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            {phase.cta}
            <ArrowRight size={15} weight="bold" />
          </motion.button>
        </Link>

        {'cta2' in phase && phase.cta2 && (
          phase.cta2.startsWith('(') ? (
            <a href="tel:+12602585303">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '0.85rem 1.6rem',
                  borderRadius: 100,
                  background: 'rgba(248,249,255,0.08)',
                  color: '#f8f9ff',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  border: '1px solid rgba(248,249,255,0.18)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                <Phone size={15} weight="fill" style={{ color: '#4a7cff' }} />
                {phase.cta2}
              </motion.button>
            </a>
          ) : (
            <Link to="/gallery">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '0.85rem 1.6rem',
                  borderRadius: 100,
                  background: 'rgba(248,249,255,0.08)',
                  color: '#f8f9ff',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  border: '1px solid rgba(248,249,255,0.18)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {phase.cta2}
              </motion.button>
            </Link>
          )
        )}
      </div>
    </motion.div>
  )
}

/* ─── VIDEO SECTION — sticky scroll, no dead space ─── */
function VideoSection({
  src,
  phases,
  heightMultiplier = 1,
}: {
  src: string
  phases: typeof heroPhases
  heightMultiplier?: number
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { phase, progress } = useVideoSection(wrapperRef as React.RefObject<HTMLDivElement>, videoRef as React.RefObject<HTMLVideoElement>, phases.length)

  return (
    /* Outer wrapper gives scroll distance. The inner sticky div fills the viewport. */
    <div
      ref={wrapperRef}
      style={{ position: 'relative', height: `${phases.length * heightMultiplier * 100}dvh` }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100dvh',
        overflow: 'hidden',
      }}>
        {/* autoPlay+loop → always visible on mobile & provides desktop unlock */}
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            willChange: 'transform',
          }}
        />

        <Vignette />

        {/* Content */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 2rem',
          maxWidth: 1300,
          margin: '0 auto',
          left: 0,
          right: 0,
        }}>
          <AnimatePresence mode="wait">
            <PhaseCard key={phase} phase={phases[phase]} />
          </AnimatePresence>
        </div>

        {/* Phase dots — right edge */}
        <div style={{
          position: 'absolute',
          right: '1.75rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}>
          {phases.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                height: phase === i ? 22 : 6,
                background: phase === i ? '#4a7cff' : 'rgba(248,249,255,0.3)',
              }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
              style={{ width: 4, borderRadius: 4 }}
            />
          ))}
        </div>

        {/* Bottom: stars + scroll hint */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: 0,
          right: 0,
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.6rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={13} weight="fill" style={{ color: '#c9a84c' }} />)}
            <span style={{ fontSize: '0.78rem', color: 'rgba(248,249,255,0.4)', marginLeft: 4 }}>
              5.0 · Google Reviews · Fort Wayne, IN
            </span>
          </div>
          {phase < phases.length - 1 && (
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
              style={{ color: 'rgba(248,249,255,0.3)' }}
            >
              <ArrowDown size={16} />
            </motion.div>
          )}
        </div>

        {/* Progress bar — bottom of viewport */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'rgba(248,249,255,0.06)',
          zIndex: 4,
        }}>
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(to right, #4a7cff, #6b9fff)',
              borderRadius: 1,
            }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>
    </div>
  )
}

/* ─── Main ─────────────────────────────────────── */
export default function Home() {
  const servicesRef = useRef<HTMLDivElement>(null)
  const servicesInView = useInView(servicesRef, { once: true, margin: '-80px' })
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })

  return (
    <main style={{ background: 'var(--midnight-deep)' }}>

      {/* ── VIDEO 1: Hero scroll section ── */}
      <VideoSection src="/home-hero.mp4" phases={heroPhases} heightMultiplier={1.2} />

      {/* ── VIDEO 2: Bathroom scroll section — starts immediately, no gap ── */}
      <VideoSection src="/bathroom-conversion.mp4" phases={bathPhases} heightMultiplier={1.5} />

      {/* ── Quick nav strip ── */}
      <section style={{
        background: 'rgba(74,124,255,0.06)',
        borderTop: '1px solid rgba(74,124,255,0.14)',
        borderBottom: '1px solid rgba(74,124,255,0.14)',
        padding: '1.25rem 2rem',
        overflowX: 'auto',
      }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {[
            { label: 'Book Now', to: '/book-now', primary: true },
            { label: 'Gallery', to: '/gallery', primary: false },
            { label: 'Leave a Review', to: '/reviews', primary: false },
            { label: 'Contact', to: '/contact', primary: false },
          ].map(l => (
            <Link key={l.to} to={l.to}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '0.55rem 1.3rem',
                  borderRadius: 100,
                  background: l.primary ? 'linear-gradient(135deg, #4a7cff, #001a62)' : 'rgba(248,249,255,0.05)',
                  color: l.primary ? '#fff' : 'rgba(248,249,255,0.65)',
                  fontWeight: l.primary ? 700 : 500,
                  fontSize: '0.875rem',
                  border: l.primary ? '1px solid rgba(74,124,255,0.4)' : '1px solid rgba(248,249,255,0.1)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >{l.label}</motion.button>
            </Link>
          ))}
          <a href="tel:+12602585303">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.55rem 1.3rem',
                borderRadius: 100,
                background: 'rgba(248,249,255,0.05)',
                color: 'rgba(248,249,255,0.65)',
                fontWeight: 500,
                fontSize: '0.875rem',
                border: '1px solid rgba(248,249,255,0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Phone size={13} weight="fill" style={{ color: '#4a7cff' }} />
              (260) 258-5303
            </motion.button>
          </a>
        </div>
      </section>

      {/* ── Stats ── */}
      <section ref={statsRef} style={{ padding: '4rem 2rem' }}>
        <div style={{
          maxWidth: 1000,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '2rem',
          textAlign: 'center',
        }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 900, letterSpacing: '-0.04em', color: '#f8f9ff' }}>{s.value}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'rgba(248,249,255,0.45)', marginTop: 4 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section style={{ padding: '3rem 2rem 6rem', maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span style={{
            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: '#4a7cff', display: 'block', marginBottom: '0.75rem',
          }}>What We Do</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#f8f9ff' }}>
            Every Project, Done Right
          </h2>
        </motion.div>

        <div ref={servicesRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                whileHover={{ y: -4, borderColor: 'rgba(74,124,255,0.35)' }}
                style={{
                  padding: '1.75rem',
                  borderRadius: 14,
                  background: 'rgba(248,249,255,0.03)',
                  border: '1px solid rgba(248,249,255,0.07)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                  transition: 'border-color 0.25s',
                }}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: 10,
                  background: 'rgba(74,124,255,0.1)',
                  border: '1px solid rgba(74,124,255,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1rem',
                }}>
                  <Icon size={20} weight="duotone" style={{ color: '#4a7cff' }} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem', color: '#f8f9ff' }}>{s.label}</h3>
                <p style={{ color: 'rgba(248,249,255,0.45)', fontSize: '0.875rem', lineHeight: 1.6 }}>{s.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section style={{ padding: '3rem 2rem 6rem', maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          style={{
            padding: '3rem',
            borderRadius: 20,
            background: 'rgba(248,249,255,0.03)',
            border: '1px solid rgba(248,249,255,0.08)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginBottom: '1.25rem' }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={22} weight="fill" style={{ color: '#c9a84c' }} />)}
          </div>
          <blockquote style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
            fontWeight: 500,
            color: 'rgba(248,249,255,0.8)',
            lineHeight: 1.65,
            fontStyle: 'italic',
            maxWidth: '54ch',
            margin: '0 auto 1.5rem',
          }}>
            "Dorsett Does It completely transformed our master bathroom. The attention to detail was incredible — from the custom tile work to the heated floors. We couldn't be happier."
          </blockquote>
          <p style={{ color: 'rgba(248,249,255,0.35)', fontSize: '0.825rem', fontWeight: 500 }}>
            — Verified Google Review · Fort Wayne, IN
          </p>
          <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
            <Link to="/reviews">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{
                padding: '0.75rem 1.6rem', borderRadius: 100,
                background: 'linear-gradient(135deg, #4a7cff, #001a62)', color: '#f8f9ff',
                fontWeight: 700, fontSize: '0.9rem',
                border: '1px solid rgba(74,124,255,0.4)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7,
              }}>
                Leave a Review <Star size={14} weight="fill" />
              </motion.button>
            </Link>
            <Link to="/gallery">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{
                padding: '0.75rem 1.6rem', borderRadius: 100,
                background: 'transparent', color: 'rgba(248,249,255,0.65)',
                fontWeight: 600, fontSize: '0.9rem',
                border: '1px solid rgba(248,249,255,0.14)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7,
              }}>
                View Our Work <ArrowRight size={13} weight="bold" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Why us checklist ── */}
      <section style={{ padding: '2rem 2rem 6rem', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4a7cff', display: 'block', marginBottom: '0.75rem' }}>Why Dorsett?</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#f8f9ff', marginBottom: '1.25rem' }}>
              Fort Wayne's Most Trusted Contractor
            </h2>
            <p style={{ color: 'rgba(248,249,255,0.5)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Local team, real relationships, no franchise middlemen. You deal with us directly from first call to final walkthrough.
            </p>
            <Link to="/book-now">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{
                padding: '0.8rem 1.8rem', borderRadius: 100,
                background: 'linear-gradient(135deg, #4a7cff, #001a62)', color: '#f8f9ff',
                fontWeight: 700, fontSize: '0.95rem',
                border: '1px solid rgba(74,124,255,0.4)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              }}>
                Start Your Project <ArrowRight size={14} weight="bold" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              'Licensed & insured in Indiana',
              'Free project consultations',
              '5-star rated on Google',
              'Locally owned in Fort Wayne',
              'Transparent, fixed-rate pricing',
              'On-time project completion',
              'Kitchen & bathroom specialists',
              'Roofing, decking & additions',
            ].map((item, i) => (
              <motion.div key={item} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.75rem 1.1rem', borderRadius: 10, background: 'rgba(248,249,255,0.03)', border: '1px solid rgba(248,249,255,0.06)' }}>
                <CheckCircle size={18} weight="fill" style={{ color: '#4a7cff', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'rgba(248,249,255,0.7)', fontWeight: 500 }}>{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{
        padding: '5rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,26,98,0.5) 100%)',
        borderTop: '1px solid rgba(74,124,255,0.12)',
      }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} style={{ maxWidth: 680, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.1rem', color: '#f8f9ff' }}>
            Ready to Transform Your Home?
          </h2>
          <p style={{ color: 'rgba(248,249,255,0.5)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.25rem' }}>
            Call (260) 258-5303 or book online — free, no-obligation consultation.
          </p>
          <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/book-now">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} style={{
                padding: '0.95rem 2.4rem', borderRadius: 100,
                background: 'linear-gradient(135deg, #4a7cff, #001a62)', color: '#f8f9ff',
                fontWeight: 700, fontSize: '1rem',
                border: '1px solid rgba(74,124,255,0.45)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 16px 40px rgba(74,124,255,0.3)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 9,
              }}>
                <Play size={15} weight="fill" /> Book Now — It's Free
              </motion.button>
            </Link>
            <a href="tel:+12602585303">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} style={{
                padding: '0.95rem 2.4rem', borderRadius: 100,
                background: 'transparent', color: '#f8f9ff',
                fontWeight: 600, fontSize: '1rem',
                border: '1px solid rgba(248,249,255,0.18)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 9,
              }}>
                <Phone size={15} weight="fill" style={{ color: '#4a7cff' }} /> (260) 258-5303
              </motion.button>
            </a>
          </div>
        </motion.div>
      </section>

    </main>
  )
}
