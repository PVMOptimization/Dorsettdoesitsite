import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Phone, ArrowRight, Star, HouseLine, Bathtub, Hammer,
  Wrench, TreePalm, Buildings, CheckCircle, Play
} from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

/* ─── Hero scroll phases ─────────────────────────── */
const phases = [
  {
    title: 'Built for Fort Wayne',
    subtitle: 'Premier General Contracting',
    body: 'From kitchen remodels to full home additions — we handle it all with master-level craftsmanship.',
    cta: 'Get a Free Quote',
    ctaLink: '/book-now',
    accent: 'Trusted since day one',
  },
  {
    title: 'Kitchen Transformations',
    subtitle: 'Complete Remodels',
    body: 'We tear out the old and bring in the extraordinary. Custom cabinetry, countertops, and full kitchen overhauls.',
    cta: 'See Our Work',
    ctaLink: '/gallery',
    accent: 'Kitchens we love building',
  },
  {
    title: 'Bathroom Conversions',
    subtitle: 'Spa-Level Upgrades',
    body: 'Walk-in showers, soaking tubs, heated floors. Your bathroom should feel like a retreat.',
    cta: 'Book a Consultation',
    ctaLink: '/book-now',
    accent: 'Bathrooms worth waking up for',
  },
  {
    title: 'Roofing & Exteriors',
    subtitle: 'Protect What Matters',
    body: 'Expert roofing, siding, and exterior upgrades that stand up to Indiana weather year after year.',
    cta: 'Get Roofing Quote',
    ctaLink: '/contact',
    accent: 'Covered. Protected. Done right.',
  },
  {
    title: 'Decks & Additions',
    subtitle: 'Expand Your Space',
    body: 'Custom decks, home additions, and outdoor living spaces that extend the beauty of your home.',
    cta: 'Start Your Project',
    ctaLink: '/book-now',
    accent: '5.0 on Google Reviews',
  },
]

/* ─── Services grid ──────────────────────────────── */
const services = [
  { icon: HouseLine, label: 'Kitchen Remodels', desc: 'Custom cabinetry, countertops & full gut renovations' },
  { icon: Bathtub, label: 'Bathroom Conversions', desc: 'Walk-in showers, tile work & complete transformations' },
  { icon: Buildings, label: 'Home Additions', desc: 'Seamless additions that feel like original architecture' },
  { icon: TreePalm, label: 'Deck Building', desc: 'Composite & hardwood decks built to last decades' },
  { icon: Hammer, label: 'Roofing', desc: 'Full roof replacements & emergency repairs' },
  { icon: Wrench, label: 'General Contracting', desc: 'Flooring, siding, painting & everything in between' },
]

/* ─── Stats ──────────────────────────────────────── */
const stats = [
  { value: '5.0', label: 'Google Rating', sub: 'Verified reviews' },
  { value: '200+', label: 'Projects Done', sub: 'Fort Wayne & beyond' },
  { value: '10+', label: 'Years Active', sub: 'In the community' },
  { value: '100%', label: 'Licensed', sub: 'Indiana contractor' },
]

function useScrollAnimation() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    // Wait for metadata
    const init = () => {
      const duration = video.duration || 10
      const totalScrollHeight = window.innerHeight * (phases.length + 0.5)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${totalScrollHeight}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            video.currentTime = self.progress * duration
            const newPhase = Math.min(
              phases.length - 1,
              Math.floor(self.progress * phases.length)
            )
            setPhase(newPhase)
          },
        },
      })

      return () => {
        tl.kill()
        ScrollTrigger.getAll().forEach(st => st.kill())
      }
    }

    if (video.readyState >= 1) {
      const cleanup = init()
      return cleanup
    } else {
      video.addEventListener('loadedmetadata', init, { once: true })
      return () => video.removeEventListener('loadedmetadata', init)
    }
  }, [])

  return { videoRef, containerRef, phase }
}

/* ─── Bathroom scroll section ───────────────────── */
function BathroomSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const playOnEnter = () => {
      if (video.paused) video.play().catch(() => {})
    }
    const pauseOnLeave = () => {
      if (!video.paused) video.pause()
    }

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: playOnEnter,
      onEnterBack: playOnEnter,
      onLeave: pauseOnLeave,
      onLeaveBack: pauseOnLeave,
    })

    // Parallax the video
    gsap.fromTo(video,
      { y: '-8%' },
      {
        y: '8%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )

    return () => st.kill()
  }, [])

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      minHeight: '100dvh',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
    }}>
      <video
        ref={videoRef}
        src="/bathroom-conversion.mp4"
        muted
        loop
        playsInline
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

      {/* Blending gradient — top matches dark bg, inward vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          linear-gradient(to bottom, var(--midnight-deep) 0%, transparent 18%, transparent 80%, var(--midnight-deep) 100%),
          radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,16,61,0.75) 100%)
        `,
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 2rem',
        width: '100%',
      }}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 580 }}
        >
          <span style={{
            display: 'inline-block',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#4a7cff',
            marginBottom: '1.25rem',
            padding: '0.4rem 1rem',
            borderRadius: 100,
            border: '1px solid rgba(74,124,255,0.3)',
            background: 'rgba(74,124,255,0.08)',
          }}>Bathroom Conversions</span>

          <h2 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: '1.5rem',
            color: '#f8f9ff',
          }}>
            Your Bathroom,<br />
            <span style={{ color: '#4a7cff' }}>Completely Reimagined</span>
          </h2>

          <p style={{
            color: 'rgba(248,249,255,0.65)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            maxWidth: 460,
          }}>
            Walk-in showers, soaking tubs, custom tile work, and heated floors. We transform dated bathrooms into spa-worthy retreats that increase your home's value.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/book-now">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '0.85rem 1.75rem',
                  borderRadius: 100,
                  background: 'linear-gradient(135deg, #4a7cff, #001a62)',
                  color: '#f8f9ff',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  border: '1px solid rgba(74,124,255,0.4)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 24px rgba(74,124,255,0.25)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Phone size={16} weight="fill" />
                Book Consultation
              </motion.button>
            </Link>
            <Link to="/gallery">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '0.85rem 1.75rem',
                  borderRadius: 100,
                  background: 'rgba(248,249,255,0.06)',
                  color: '#f8f9ff',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  border: '1px solid rgba(248,249,255,0.15)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  backdropFilter: 'blur(8px)',
                }}
              >
                View Gallery
                <ArrowRight size={14} weight="bold" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Main Home component ────────────────────────── */
export default function Home() {
  const { videoRef, containerRef, phase } = useScrollAnimation()
  const servicesRef = useRef<HTMLDivElement>(null)
  const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' })
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' })
  const currentPhase = phases[phase]

  return (
    <main>
      {/* ── Hero scroll section ── */}
      <div
        ref={containerRef}
        style={{ position: 'relative', height: '100dvh', overflow: 'hidden' }}
      >
        {/* Background video */}
        <video
          ref={videoRef}
          src="/home-hero.mp4"
          muted
          playsInline
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

        {/* Inward masking gradient vignette */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 85% 85% at 50% 50%, transparent 30%, rgba(0,16,61,0.6) 75%, rgba(0,16,61,0.9) 100%),
            linear-gradient(to bottom, rgba(0,16,61,0.6) 0%, transparent 20%, transparent 75%, rgba(0,16,61,0.95) 100%)
          `,
          zIndex: 1,
        }} />

        {/* Hero centered content */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 2rem',
          textAlign: 'center',
        }}>
          {/* Phase label chip */}
          <motion.span
            key={`accent-${phase}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'inline-block',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#4a7cff',
              marginBottom: '1.5rem',
              padding: '0.4rem 1.1rem',
              borderRadius: 100,
              border: '1px solid rgba(74,124,255,0.35)',
              background: 'rgba(74,124,255,0.1)',
              backdropFilter: 'blur(8px)',
            }}
          >{currentPhase.accent}</motion.span>

          {/* Subtitle */}
          <motion.p
            key={`sub-${phase}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(248,249,255,0.5)',
              marginBottom: '1rem',
            }}
          >{currentPhase.subtitle}</motion.p>

          {/* Main heading */}
          <motion.h1
            key={`title-${phase}`}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 6rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              color: '#f8f9ff',
              marginBottom: '1.5rem',
              maxWidth: '14ch',
            }}
          >{currentPhase.title}</motion.h1>

          {/* Body */}
          <motion.p
            key={`body-${phase}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              color: 'rgba(248,249,255,0.65)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: 1.65,
              maxWidth: '50ch',
              marginBottom: '2.5rem',
            }}
          >{currentPhase.body}</motion.p>

          {/* CTAs */}
          <motion.div
            key={`cta-${phase}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <Link to={currentPhase.ctaLink}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '0.9rem 2rem',
                  borderRadius: 100,
                  background: 'linear-gradient(135deg, #4a7cff, #001a62)',
                  color: '#f8f9ff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  border: '1px solid rgba(74,124,255,0.4)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 12px 32px rgba(74,124,255,0.3)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                {currentPhase.cta}
                <ArrowRight size={16} weight="bold" />
              </motion.button>
            </Link>
            <a href="tel:+12602585303">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '0.9rem 2rem',
                  borderRadius: 100,
                  background: 'rgba(248,249,255,0.07)',
                  color: '#f8f9ff',
                  fontWeight: 600,
                  fontSize: '1rem',
                  border: '1px solid rgba(248,249,255,0.18)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  backdropFilter: 'blur(12px)',
                }}
              >
                <Phone size={16} weight="fill" style={{ color: '#4a7cff' }} />
                (260) 258-5303
              </motion.button>
            </a>
          </motion.div>

          {/* Star rating */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              position: 'absolute',
              bottom: '2.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{ display: 'flex', gap: 3 }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={14} weight="fill" style={{ color: '#c9a84c' }} />)}
            </div>
            <span style={{ color: 'rgba(248,249,255,0.45)', fontSize: '0.8rem' }}>5.0 · Google Reviews · Fort Wayne</span>
          </motion.div>

          {/* Scroll phase indicator dots */}
          <div style={{
            position: 'absolute',
            right: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            zIndex: 3,
          }}>
            {phases.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: phase === i ? 20 : 4,
                  background: phase === i ? '#4a7cff' : 'rgba(248,249,255,0.25)',
                }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
                style={{ height: 4, borderRadius: 4 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Spacer that GSAP uses for scroll distance */}
      <div style={{ height: `${(phases.length + 0.5) * 100}vh`, background: 'var(--midnight-deep)' }} />

      {/* ── Bathroom video section ── */}
      <BathroomSection />

      {/* ── Stats bar ── */}
      <section ref={statsRef} style={{
        background: 'rgba(74,124,255,0.05)',
        borderTop: '1px solid rgba(74,124,255,0.12)',
        borderBottom: '1px solid rgba(74,124,255,0.12)',
        padding: '3.5rem 2rem',
      }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '2rem',
          textAlign: 'center',
        }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#f8f9ff' }}>{s.value}</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'rgba(248,249,255,0.7)', marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(248,249,255,0.35)' }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Services grid ── */}
      <section style={{ padding: '7rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#4a7cff',
            display: 'block',
            marginBottom: '1rem',
          }}>What We Do</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#f8f9ff' }}>
            Every Project,<br />Done Right
          </h2>
        </motion.div>

        <div
          ref={servicesRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                style={{
                  padding: '2rem',
                  borderRadius: 16,
                  background: 'rgba(248,249,255,0.03)',
                  border: '1px solid rgba(248,249,255,0.07)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                  cursor: 'default',
                  transition: 'border-color 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(74,124,255,0.35)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(248,249,255,0.07)')}
              >
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'rgba(74,124,255,0.1)',
                  border: '1px solid rgba(74,124,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}>
                  <Icon size={22} weight="duotone" style={{ color: '#4a7cff' }} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem', color: '#f8f9ff' }}>{s.label}</h3>
                <p style={{ color: 'rgba(248,249,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6 }}>{s.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── Testimonials / reviews CTA ── */}
      <section style={{
        padding: '7rem 2rem',
        background: 'linear-gradient(180deg, transparent 0%, rgba(74,124,255,0.04) 50%, transparent 100%)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: '3.5rem',
              borderRadius: 24,
              background: 'rgba(248,249,255,0.03)',
              border: '1px solid rgba(248,249,255,0.08)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: '1.5rem' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={24} weight="fill" style={{ color: '#c9a84c' }} />)}
            </div>
            <blockquote style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
              fontWeight: 500,
              color: 'rgba(248,249,255,0.85)',
              lineHeight: 1.6,
              fontStyle: 'italic',
              maxWidth: '56ch',
              margin: '0 auto 2rem',
            }}>
              "Dorsett Does It completely transformed our master bathroom. The attention to detail was incredible — from the custom tile work to the heated floors. We couldn't be happier."
            </blockquote>
            <p style={{ color: 'rgba(248,249,255,0.4)', fontSize: '0.875rem', fontWeight: 500 }}>
              — Verified Google Review · Fort Wayne, IN
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              <Link to="/reviews">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '0.8rem 1.8rem',
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
                    gap: 8,
                  }}
                >
                  Leave a Review
                  <Star size={15} weight="fill" />
                </motion.button>
              </Link>
              <Link to="/gallery">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '0.8rem 1.8rem',
                    borderRadius: 100,
                    background: 'transparent',
                    color: 'rgba(248,249,255,0.7)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    border: '1px solid rgba(248,249,255,0.15)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  View Our Work
                  <ArrowRight size={14} weight="bold" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Us checklist ── */}
      <section style={{ padding: '5rem 2rem 8rem', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
        }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#4a7cff',
              display: 'block',
              marginBottom: '1rem',
            }}>Why Dorsett?</span>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#f8f9ff',
              marginBottom: '1.5rem',
            }}>
              Fort Wayne's Most Trusted Contractor
            </h2>
            <p style={{
              color: 'rgba(248,249,255,0.55)',
              fontSize: '1rem',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
            }}>
              We're a local team with deep roots in Fort Wayne — not a franchise, not a call center. When you work with us, you work with us directly.
            </p>
            <Link to="/book-now">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '0.85rem 1.8rem',
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
                  gap: 8,
                }}
              >
                Start Your Project
                <ArrowRight size={14} weight="bold" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {[
              'Licensed & insured in Indiana',
              'Free project consultations',
              '5-star rated on Google',
              'Locally owned & operated in Fort Wayne',
              'Transparent, fixed-rate pricing',
              'On-time project completion',
              'Full kitchen & bathroom specialists',
              'Roofing, decking, additions & more',
            ].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '0.85rem 1.25rem',
                  borderRadius: 12,
                  background: 'rgba(248,249,255,0.03)',
                  border: '1px solid rgba(248,249,255,0.07)',
                }}
              >
                <CheckCircle size={20} weight="fill" style={{ color: '#4a7cff', flexShrink: 0 }} />
                <span style={{ fontSize: '0.92rem', color: 'rgba(248,249,255,0.75)', fontWeight: 500 }}>{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA banner ── */}
      <section style={{
        padding: '5rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(0,26,98,0.8) 0%, rgba(0,16,61,1) 100%)',
        borderTop: '1px solid rgba(74,124,255,0.15)',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 700, margin: '0 auto' }}
        >
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.25rem', color: '#f8f9ff' }}>
            Ready to Transform<br />Your Home?
          </h2>
          <p style={{ color: 'rgba(248,249,255,0.55)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Call us at (260) 258-5303 or book online for a free, no-obligation consultation.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/book-now">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '1rem 2.5rem',
                  borderRadius: 100,
                  background: 'linear-gradient(135deg, #4a7cff, #001a62)',
                  color: '#f8f9ff',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  border: '1px solid rgba(74,124,255,0.4)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 16px 40px rgba(74,124,255,0.35)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Play size={16} weight="fill" />
                Book Now — It's Free
              </motion.button>
            </Link>
            <a href="tel:+12602585303">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '1rem 2.5rem',
                  borderRadius: 100,
                  background: 'transparent',
                  color: '#f8f9ff',
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  border: '1px solid rgba(248,249,255,0.2)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Phone size={16} weight="fill" style={{ color: '#4a7cff' }} />
                (260) 258-5303
              </motion.button>
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
