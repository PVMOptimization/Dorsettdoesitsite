import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, Play, ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

/* ── Gallery items ── */
const galleryItems = [
  // Videos first
  { type: 'video' as const, src: '/home-hero.mp4', label: 'Home Renovation', category: 'Featured' },
  { type: 'video' as const, src: '/bathroom-conversion.mp4', label: 'Bathroom Conversion', category: 'Bathroom' },
  // 10 images — using seeded picsum for consistency
  { type: 'image' as const, src: 'https://picsum.photos/seed/dorsett-kitchen1/800/600', label: 'Kitchen Remodel', category: 'Kitchen' },
  { type: 'image' as const, src: 'https://picsum.photos/seed/dorsett-bath2/800/600', label: 'Bathroom Tile Work', category: 'Bathroom' },
  { type: 'image' as const, src: 'https://picsum.photos/seed/dorsett-deck1/800/500', label: 'Custom Deck Build', category: 'Exterior' },
  { type: 'image' as const, src: 'https://picsum.photos/seed/dorsett-roof1/800/600', label: 'Roof Replacement', category: 'Roofing' },
  { type: 'image' as const, src: 'https://picsum.photos/seed/dorsett-kitchen2/800/700', label: 'Kitchen Countertops', category: 'Kitchen' },
  { type: 'image' as const, src: 'https://picsum.photos/seed/dorsett-addition1/800/600', label: 'Home Addition', category: 'Addition' },
  { type: 'image' as const, src: 'https://picsum.photos/seed/dorsett-floor1/800/500', label: 'Hardwood Flooring', category: 'Interior' },
  { type: 'image' as const, src: 'https://picsum.photos/seed/dorsett-siding1/800/600', label: 'Siding & Exterior', category: 'Exterior' },
  { type: 'image' as const, src: 'https://picsum.photos/seed/dorsett-bath3/800/700', label: 'Walk-In Shower', category: 'Bathroom' },
  { type: 'image' as const, src: 'https://picsum.photos/seed/dorsett-kitchen3/800/600', label: 'Full Kitchen Gut', category: 'Kitchen' },
]

const categories = ['All', 'Kitchen', 'Bathroom', 'Exterior', 'Roofing', 'Interior', 'Addition', 'Featured']

type Item = typeof galleryItems[0]

/* ── Lightbox ── */
function Lightbox({ item, onClose }: { item: Item; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(0, 10, 36, 0.95)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '90vw',
          maxHeight: '85vh',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid rgba(248,249,255,0.1)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        }}
      >
        {item.type === 'video' ? (
          <video
            src={item.src}
            autoPlay
            muted
            loop
            playsInline
            controls
            style={{ display: 'block', maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }}
          />
        ) : (
          <img
            src={item.src}
            alt={item.label}
            style={{ display: 'block', maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }}
          />
        )}

        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(0,16,61,0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(248,249,255,0.15)',
            color: '#f8f9ff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={18} />
        </button>

        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '1rem 1.25rem',
          background: 'linear-gradient(to top, rgba(0,16,61,0.9) 0%, transparent 100%)',
        }}>
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f8f9ff' }}>{item.label}</span>
          <span style={{
            marginLeft: 10,
            fontSize: '0.75rem',
            color: '#4a7cff',
            fontWeight: 600,
            padding: '0.2rem 0.6rem',
            borderRadius: 100,
            background: 'rgba(74,124,255,0.15)',
          }}>{item.category}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Gallery card ── */
function GalleryCard({ item, index, onClick }: { item: Item; index: number; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Determine aspect: vary between tall and wide for visual interest
  const isWide = index % 5 === 0 || index % 7 === 2
  const isTall = index % 5 === 3

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      style={{
        position: 'relative',
        borderRadius: 14,
        overflow: 'hidden',
        cursor: 'pointer',
        aspectRatio: isWide ? '16/9' : isTall ? '3/4' : '4/3',
        gridColumn: isWide ? 'span 2' : 'span 1',
        border: '1px solid rgba(248,249,255,0.07)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={() => {
        if (videoRef.current && item.type === 'video') {
          videoRef.current.play().catch(() => {})
        }
      }}
      onMouseLeave={() => {
        if (videoRef.current && item.type === 'video') {
          videoRef.current.pause()
          videoRef.current.currentTime = 0
        }
      }}
    >
      {item.type === 'video' ? (
        <video
          ref={videoRef}
          src={item.src}
          muted
          loop
          playsInline
          preload="metadata"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <img
          src={item.src}
          alt={item.label}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}

      {/* Hover overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,16,61,0.8) 0%, rgba(0,16,61,0.2) 60%, transparent 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '1.25rem',
        }}
      >
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#4a7cff',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '0.35rem',
        }}>{item.category}</span>
        <span style={{ fontWeight: 700, fontSize: '1rem', color: '#f8f9ff' }}>{item.label}</span>
      </motion.div>

      {/* Video play icon */}
      {item.type === 'video' && (
        <div style={{
          position: 'absolute',
          top: 12,
          right: 12,
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'rgba(74,124,255,0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Play size={14} weight="fill" style={{ color: '#fff', marginLeft: 2 }} />
        </div>
      )}

      {/* Category badge */}
      <div style={{
        position: 'absolute',
        top: 12,
        left: 12,
        padding: '0.25rem 0.7rem',
        borderRadius: 100,
        background: 'rgba(0,16,61,0.7)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(248,249,255,0.1)',
        fontSize: '0.72rem',
        fontWeight: 600,
        color: 'rgba(248,249,255,0.7)',
        letterSpacing: '0.06em',
      }}>
        {item.category}
      </div>
    </motion.div>
  )
}

/* ── Main Gallery page ── */
export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxItem, setLightboxItem] = useState<Item | null>(null)
  const headRef = useRef<HTMLDivElement>(null)

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(i => i.category === activeCategory)

  // GSAP parallax on the header
  useEffect(() => {
    const el = headRef.current
    if (!el) return
    gsap.fromTo(el,
      { y: 0 },
      {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      }
    )
    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  return (
    <main style={{ minHeight: '100dvh', paddingTop: 72, background: 'var(--midnight-deep)' }}>

      {/* Hero */}
      <section style={{
        position: 'relative',
        padding: '5rem 2rem 4rem',
        background: 'linear-gradient(180deg, rgba(0,26,98,0.5) 0%, transparent 100%)',
        borderBottom: '1px solid rgba(74,124,255,0.1)',
        overflow: 'hidden',
      }}>
        <div ref={headRef} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
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
            }}
          >Our Work</motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              color: '#f8f9ff',
              marginBottom: '1.25rem',
            }}
          >
            Craft You Can<br />
            <span style={{ color: '#4a7cff' }}>See & Touch</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{
              color: 'rgba(248,249,255,0.5)',
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              lineHeight: 1.7,
              maxWidth: '48ch',
              margin: '0 auto',
            }}
          >
            Real projects. Real homes. Real Fort Wayne families who trusted us to transform their spaces.
          </motion.p>
        </div>
      </section>

      {/* Category filter */}
      <div style={{ padding: '2rem 2rem 0', maxWidth: 1300, margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {categories.map(cat => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 100,
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                background: activeCategory === cat ? '#4a7cff' : 'rgba(248,249,255,0.05)',
                color: activeCategory === cat ? '#fff' : 'rgba(248,249,255,0.55)',
                border: `1px solid ${activeCategory === cat ? '#4a7cff' : 'rgba(248,249,255,0.1)'}`,
              }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Masonry-style grid */}
      <section style={{ padding: '3rem 2rem 7rem', maxWidth: 1300, margin: '0 auto', width: '100%' }}>
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
            alignItems: 'start',
          }}
        >
          <AnimatePresence>
            {filtered.map((item, i) => (
              <GalleryCard
                key={item.src}
                item={item}
                index={i}
                onClick={() => setLightboxItem(item)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(248,249,255,0.3)' }}>
            No items in this category yet.
          </div>
        )}
      </section>

      {/* CTA */}
      <section style={{
        padding: '4rem 2rem 6rem',
        textAlign: 'center',
        background: 'linear-gradient(180deg, transparent 0%, rgba(74,124,255,0.04) 50%, transparent 100%)',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 560, margin: '0 auto' }}
        >
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem', color: '#f8f9ff' }}>
            Ready for Your Transformation?
          </h2>
          <p style={{ color: 'rgba(248,249,255,0.5)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            Every project in this gallery started with a single conversation. Let's talk about yours.
          </p>
          <Link to="/book-now">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.9rem 2.2rem',
                borderRadius: 100,
                background: 'linear-gradient(135deg, #4a7cff, #001a62)',
                color: '#f8f9ff',
                fontWeight: 700,
                fontSize: '1rem',
                border: '1px solid rgba(74,124,255,0.4)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 12px 32px rgba(74,124,255,0.3)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              Start My Project
              <ArrowRight size={15} weight="bold" />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
        )}
      </AnimatePresence>
    </main>
  )
}
