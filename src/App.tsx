import { useState, useEffect, useRef, useCallback } from 'react'

const heroVideo = '/assets/video/hero/hero1.mp4'

/* ─── Image helpers ───────────────────────────────────────────────── */
const IMGS = {
  proj1: 'https://images.unsplash.com/photo-1648881806148-e5c51179c826?w=900&h=700&fit=crop&auto=format',
  proj2: 'https://images.unsplash.com/photo-1688647063090-36f36f692d95?w=700&h=900&fit=crop&auto=format',
  proj3: 'https://images.unsplash.com/photo-1745301558339-44eb3217d5da?w=900&h=600&fit=crop&auto=format',
  proj4: 'https://images.unsplash.com/photo-1772112334845-86016056137b?w=800&h=700&fit=crop&auto=format',
  proj5: 'https://images.unsplash.com/photo-1696413542101-2479dd479982?w=700&h=500&fit=crop&auto=format',
  detail: 'https://images.unsplash.com/photo-1682184805271-11671b7ecf4c?w=1200&h=800&fit=crop&auto=format',
  detail2: 'https://images.unsplash.com/photo-1724582586458-a51791349977?w=700&h=900&fit=crop&auto=format',
  philosophy: 'https://images.unsplash.com/photo-1711873316332-acb6930211e1?w=1000&h=1200&fit=crop&auto=format',
  about: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=700&h=900&fit=crop&auto=format',
  about2: 'https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?w=900&h=600&fit=crop&auto=format',
  mat1: 'https://images.unsplash.com/photo-1511109520219-fec6140bf9d8?w=600&h=700&fit=crop&auto=format',
  mat2: 'https://images.unsplash.com/photo-1668316429902-887bf2dcb8eb?w=600&h=700&fit=crop&auto=format',
  mat3: 'https://images.unsplash.com/photo-1600095355173-b970ea5ceb46?w=600&h=700&fit=crop&auto=format',
  mat4: 'https://images.unsplash.com/photo-1572814698590-faaa5af32907?w=600&h=700&fit=crop&auto=format',
  journal1: 'https://images.unsplash.com/photo-1724582586458-a51791349977?w=700&h=500&fit=crop&auto=format',
  journal2: 'https://images.unsplash.com/photo-1521194278274-c33e3ef2c448?w=700&h=500&fit=crop&auto=format',
  journal3: 'https://images.unsplash.com/photo-1682184805271-11671b7ecf4c?w=700&h=500&fit=crop&auto=format',
  cta: 'https://images.unsplash.com/photo-1757924461488-ef9ad0670978?w=1600&h=900&fit=crop&auto=format',
}

/* ─── Types & Themes ──────────────────────────────────────────────── */
interface NavItem { label: string; href: string }
const NAV: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Journal', href: '#journal' },
  { label: 'Contact', href: '#contact' },
]

export interface ThemeOption {
  id: string
  name: string
  bg: string
  text: string
  accent: string
  sub: string
}

export const COLOR_PALETTES: ThemeOption[] = [
  { id: 'dark-sand', name: 'Warm Minimalist', bg: '#1C1917', text: '#F5F1EB', accent: '#B8956A', sub: '#9B9189' },
  { id: 'earthy-clay', name: 'Terracotta & Stone', bg: '#1B1816', text: '#FAF7F2', accent: '#C87D55', sub: '#A3968C' },
  { id: 'monochrome', name: 'Monochrome Modern', bg: '#121212', text: '#FFFFFF', accent: '#D4D4D4', sub: '#888888' },
  { id: 'nordic-sage', name: 'Nordic Sage', bg: '#171B19', text: '#F2F5F3', accent: '#8A9A86', sub: '#8F9B93' },
]

/* ─── Navigation ──────────────────────────────────────────────────── */
function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handle)
    return () => window.removeEventListener('scroll', handle)
  }, [])

  return (
    <nav
      style={{ fontFamily: 'Instrument Sans, system-ui, sans-serif' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#F5F1EB]/95 backdrop-blur-sm border-b border-[rgba(28,25,23,0.1)]' : 'bg-transparent'
        }`}
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            className={`text-xl font-medium tracking-tight transition-colors duration-300 ${scrolled ? 'text-[#1C1917]' : 'text-[#F5F1EB]'
              }`}
          >
            FORMA
          </span>
          <span
            className="w-1 h-1 rounded-full bg-[#B8956A] mt-0.5"
          />
          <span className={`text-xs tracking-[0.2em] uppercase font-light hidden sm:block transition-colors duration-300 ${scrolled ? 'text-[#9B9189]' : 'text-[#F5F1EB]/70'
            }`}>
            Studio
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm tracking-wide transition-colors duration-300 ${scrolled
                  ? 'text-[#1C1917]/70 hover:text-[#1C1917]'
                  : 'text-[#F5F1EB]/80 hover:text-[#F5F1EB]'
                }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className={`text-xs tracking-[0.12em] uppercase px-6 py-2.5 transition-all duration-300 border ${scrolled
                ? 'border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-[#F5F1EB]'
                : 'border-[#F5F1EB] text-[#F5F1EB] hover:bg-[#F5F1EB] hover:text-[#1C1917]'
              }`}
          >
            Start a Project
          </a>
        </div>

        {/* Mobile menu */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px transition-all duration-300 ${scrolled ? 'bg-[#1C1917]' : 'bg-[#F5F1EB]'} ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-4 h-px transition-all duration-300 ${scrolled ? 'bg-[#1C1917]' : 'bg-[#F5F1EB]'} ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px transition-all duration-300 ${scrolled ? 'bg-[#1C1917]' : 'bg-[#F5F1EB]'} ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[#F5F1EB] border-t border-[rgba(28,25,23,0.1)] px-8 pb-8 pt-4">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-[#1C1917]/70 hover:text-[#1C1917] text-sm tracking-wide border-b border-[rgba(28,25,23,0.08)] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-6 block text-center border border-[#1C1917] text-[#1C1917] text-xs tracking-[0.12em] uppercase px-6 py-3"
          >
            Start a Project
          </a>
        </div>
      )}
    </nav>
  )
}

/* ─── Hero ────────────────────────────────────────────────────────── */
function Hero({
  onVideoReady,
  onVideoProgress,
}: {
  onVideoReady?: () => void
  onVideoProgress?: (progress: number) => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVideoReady = useCallback(() => {
    const v = videoRef.current
    if (v) {
      v.muted = true
      v.defaultMuted = true
      v.playsInline = true
      const playPromise = v.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const enablePlay = () => {
            v.play()
            window.removeEventListener('click', enablePlay)
            window.removeEventListener('touchstart', enablePlay)
            window.removeEventListener('scroll', enablePlay)
          }
          window.addEventListener('click', enablePlay)
          window.addEventListener('touchstart', enablePlay)
          window.addEventListener('scroll', enablePlay)
        })
      }
    }
    if (onVideoReady) {
      onVideoReady()
    }
  }, [onVideoReady])

  const handleProgress = useCallback(() => {
    const v = videoRef.current
    if (v && v.duration > 0 && v.buffered.length > 0) {
      const bufferedEnd = v.buffered.end(v.buffered.length - 1)
      const percent = Math.min(100, Math.floor((bufferedEnd / v.duration) * 100))
      if (onVideoProgress) {
        onVideoProgress(percent)
      }
      if (percent >= 80 || v.readyState >= 3) {
        handleVideoReady()
      }
    }
  }, [onVideoProgress, handleVideoReady])

  useEffect(() => {
    const v = videoRef.current
    if (v) {
      v.muted = true
      v.defaultMuted = true
      v.playsInline = true
      
      if (v.readyState >= 3) {
        handleVideoReady()
      }

      // Safety fallback timer if network blocks event listeners
      const safetyTimer = setTimeout(() => {
        if (onVideoReady) onVideoReady()
      }, 12000)

      return () => clearTimeout(safetyTimer)
    }
  }, [handleVideoReady, onVideoReady])

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-[#1C1917]">
      {/* Video layer - continuous background video loop */}
      <video
        ref={videoRef}
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        onCanPlay={handleVideoReady}
        onCanPlayThrough={handleVideoReady}
        onLoadedData={handleProgress}
        onProgress={handleProgress}
        onLoadedMetadata={handleProgress}
        onPlay={handleVideoReady}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      {/* Dark vignette */}
      <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-[#1C1917]/90 via-[#1C1917]/30 to-[#1C1917]/50 pointer-events-none z-1" />

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-16 py-20 md:py-28 w-full flex flex-col items-center text-center">
        <div className="max-w-4xl flex flex-col items-center text-center">
          <p className="text-[#B8956A] text-xs tracking-[0.25em] uppercase mb-6 font-light">
            Interior Design & Architecture Studio
          </p>
          <h1
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            className="text-[#F5F1EB] text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.05] mb-6"
          >
            Spaces Designed
            <br />
            <em className="italic font-normal">Around You</em>
          </h1>
          <p className="text-[#F5F1EB]/60 text-base md:text-lg font-light leading-relaxed mb-10 max-w-none md:whitespace-nowrap mx-auto">
            Thoughtful interiors shaped by architecture, material, and the way you live
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#work"
              className="bg-[#F5F1EB] text-[#1C1917] text-xs tracking-[0.12em] uppercase px-8 py-3.5 hover:bg-[#B8956A] hover:text-[#F5F1EB] transition-all duration-300"
            >
              Explore Our Work
            </a>
            <a
              href="#contact"
              className="border border-[#F5F1EB]/50 text-[#F5F1EB] text-xs tracking-[0.12em] uppercase px-8 py-3.5 hover:border-[#F5F1EB] hover:bg-[#F5F1EB]/10 transition-all duration-300"
            >
              Start a Project
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Section Header ──────────────────────────────────────────────── */
function SectionHeader({ label, heading, sub }: { label: string; heading: string; sub?: string }) {
  return (
    <div className="mb-16 md:mb-20">
      <p className="text-[#B8956A] text-xs tracking-[0.25em] uppercase mb-4 font-light">{label}</p>
      <h2
        style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
        className="text-[#1C1917] text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-4"
      >
        {heading}
      </h2>
      {sub && (
        <p className="text-[#9B9189] text-base md:text-lg font-light leading-relaxed max-w-xl">{sub}</p>
      )}
    </div>
  )
}

/* ─── Selected Work ───────────────────────────────────────────────── */
/* ─── Selected Work ───────────────────────────────────────────────── */
interface Project {
  id: string
  name: string
  location: string
  category: 'Residential' | 'Commercial' | 'Hospitality'
  year: string
  size: string
  lead: string
  materials: string[]
  img: string
  aspectRatio: string
  description: string
  gallery: string[]
}

const PROJECTS: Project[] = [
  {
    id: 'casa-verde',
    name: 'Casa Verde',
    location: 'Chennai, India',
    category: 'Residential',
    year: '2026',
    size: '5,400 sq.ft',
    lead: 'Vikram Sheriff',
    materials: ['Natural Teak', 'Calacatta Marble', 'Brushed Brass'],
    img: IMGS.proj1,
    aspectRatio: 'aspect-[4/3]',
    description: 'A coastal residence designed around internal courtyards, natural cross-ventilation, and warm tactile surfaces that age gracefully over time.',
    gallery: [IMGS.proj1, IMGS.detail, IMGS.mat1],
  },
  {
    id: 'the-atelier',
    name: 'The Atelier',
    location: 'Mumbai, India',
    category: 'Commercial',
    year: '2025',
    size: '8,200 sq.ft',
    lead: 'Priya Sharma',
    materials: ['Fluted Glass', 'Micro-cement', 'Blackened Steel'],
    img: IMGS.proj2,
    aspectRatio: 'aspect-[3/4]',
    description: 'A flagship design studio workspace built around open collaboration zones, acoustic oak fins, and framed natural daylight.',
    gallery: [IMGS.proj2, IMGS.about, IMGS.mat4],
  },
  {
    id: 'villa-lumiere',
    name: 'Villa Lumière',
    location: 'Bengaluru, India',
    category: 'Hospitality',
    year: '2025',
    size: '12,500 sq.ft',
    lead: 'Arjun Mehta',
    materials: ['Kota Stone', 'Rattan Weave', 'Polished Copper'],
    img: IMGS.proj3,
    aspectRatio: 'aspect-[16/9]',
    description: 'A boutique luxury hotel sanctuary merging modern spatial geometry with indigenous craft traditions.',
    gallery: [IMGS.proj3, IMGS.detail2, IMGS.mat2],
  },
  {
    id: 'meridian-house',
    name: 'Meridian House',
    location: 'Delhi, India',
    category: 'Residential',
    year: '2024',
    size: '6,800 sq.ft',
    lead: 'Vikram Sheriff',
    materials: ['Smoked Walnut', 'Raw Travertine', 'Linen Textiles'],
    img: IMGS.proj4,
    aspectRatio: 'aspect-[4/3]',
    description: 'A double-height urban home characterized by monolithic travertine walls and bespoke recessed lighting coves.',
    gallery: [IMGS.proj4, IMGS.mat3, IMGS.about2],
  },
  {
    id: 'studio-blanc',
    name: 'Studio Blanc',
    location: 'Hyderabad, India',
    category: 'Commercial',
    year: '2024',
    size: '4,100 sq.ft',
    lead: 'Priya Sharma',
    materials: ['Venetian Plaster', 'White Oak', 'Brushed Aluminium'],
    img: IMGS.proj5,
    aspectRatio: 'aspect-[4/3]',
    description: 'A minimalist gallery and concept retail environment focused on spatial purity, shadow lines, and monochromatic materiality.',
    gallery: [IMGS.proj5, IMGS.journal1, IMGS.mat1],
  },
]

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Hospitality']

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project
  index: number
  onSelect: (p: Project) => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="group cursor-pointer flex flex-col justify-between h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(project)}
    >
      <div className="img-zoom relative overflow-hidden bg-[#EDE8DF] mb-5 rounded-sm">
        <img
          src={project.img}
          alt={`${project.name} — ${project.category}`}
          className="w-full h-full object-cover block transition-transform duration-700 ease-out group-hover:scale-105"
          style={{
            aspectRatio:
              project.id === 'the-atelier'
                ? '3/4'
                : project.id === 'villa-lumiere'
                ? '16/9'
                : '4/3',
          }}
        />

        {/* Hover overlay with materials & view button */}
        <div
          className="absolute inset-0 bg-[#1C1917]/70 p-6 md:p-8 flex flex-col justify-between transition-opacity duration-400"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[#B8956A] text-[10px] tracking-[0.25em] uppercase font-mono bg-[#1C1917]/80 px-3 py-1 border border-[#B8956A]/30">
              {project.category}
            </span>
            <span className="text-[#F5F1EB]/60 text-xs font-mono">{project.size}</span>
          </div>

          <div>
            <p className="text-[#F5F1EB]/50 text-xs tracking-wider uppercase mb-2 font-mono">Key Materials</p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.materials.map((m) => (
                <span
                  key={m}
                  className="text-[#F5F1EB] text-[11px] bg-[#F5F1EB]/10 backdrop-blur-sm px-2.5 py-1 border border-[#F5F1EB]/20 font-light"
                >
                  {m}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-2 text-[#F5F1EB] text-xs tracking-[0.15em] uppercase border-b border-[#B8956A] pb-0.5 group-hover:text-[#B8956A] transition-colors">
              Explore Architectural Brief →
            </span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#B8956A] text-[11px] font-mono tracking-wider">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-[#1C1917]/30 text-[10px]">•</span>
              <span className="text-[#9B9189] text-xs font-light">{project.location}</span>
            </div>
            <h3
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              className="text-[#1C1917] text-2xl font-medium group-hover:text-[#B8956A] transition-colors duration-200"
            >
              {project.name}
            </h3>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="inline-block text-[#1C1917]/60 text-xs font-mono border border-[rgba(28,25,23,0.15)] px-2.5 py-1">
              {project.year}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Project Lightbox Modal ────────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [activeImage, setActiveImage] = useState(project.img)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[120] bg-[#1C1917]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 overflow-y-auto fade-up">
      <div className="bg-[#F5F1EB] text-[#1C1917] max-w-5xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border border-[#1C1917]/10">
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#F5F1EB]/95 backdrop-blur-md px-8 py-5 border-b border-[rgba(28,25,23,0.1)] flex items-center justify-between z-20">
          <div>
            <span className="text-[#B8956A] text-xs tracking-[0.2em] uppercase font-mono">{project.category} Portfolio</span>
            <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif' }} className="text-2xl font-medium text-[#1C1917]">
              {project.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 border border-[#1C1917]/20 flex items-center justify-center hover:bg-[#1C1917] hover:text-[#F5F1EB] transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 md:p-12 space-y-10">
          
          {/* Main Gallery Display */}
          <div className="space-y-4">
            <div className="overflow-hidden bg-[#EDE8DF] aspect-[16/10] w-full">
              <img
                src={activeImage}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Gallery Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {project.gallery.map((gImg, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(gImg)}
                  className={`w-24 h-16 overflow-hidden flex-shrink-0 border-2 transition-all ${
                    activeImage === gImg ? 'border-[#B8956A] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={gImg} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-[rgba(28,25,23,0.1)]">
            
            {/* Description */}
            <div className="md:col-span-7">
              <h4 className="text-xs tracking-[0.25em] uppercase text-[#B8956A] mb-3 font-mono">Architectural Brief</h4>
              <p className="text-[#1C1917]/80 text-base leading-relaxed font-light mb-6">
                {project.description}
              </p>
              
              <h4 className="text-xs tracking-[0.25em] uppercase text-[#B8956A] mb-3 font-mono">Specified Material Palette</h4>
              <div className="flex flex-wrap gap-2">
                {project.materials.map((m) => (
                  <span key={m} className="bg-[#EDE8DF] text-[#1C1917] text-xs px-3 py-1.5 border border-[#1C1917]/10">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Specifications Sidebar */}
            <div className="md:col-span-5 bg-[#EDE8DF] p-6 space-y-4 text-xs font-mono">
              <h4 className="text-xs tracking-[0.2em] uppercase text-[#1C1917]/40 border-b border-[#1C1917]/10 pb-2">Project Specs</h4>
              <div className="flex justify-between border-b border-[#1C1917]/10 pb-2">
                <span className="text-[#9B9189]">Location</span>
                <span className="text-[#1C1917] font-medium">{project.location}</span>
              </div>
              <div className="flex justify-between border-b border-[#1C1917]/10 pb-2">
                <span className="text-[#9B9189]">Total Area</span>
                <span className="text-[#1C1917] font-medium">{project.size}</span>
              </div>
              <div className="flex justify-between border-b border-[#1C1917]/10 pb-2">
                <span className="text-[#9B9189]">Completion</span>
                <span className="text-[#1C1917] font-medium">{project.year}</span>
              </div>
              <div className="flex justify-between border-b border-[#1C1917]/10 pb-2">
                <span className="text-[#9B9189]">Lead Architect</span>
                <span className="text-[#1C1917] font-medium">{project.lead}</span>
              </div>

              <a
                href="#contact"
                onClick={onClose}
                className="mt-6 block text-center bg-[#1C1917] text-[#F5F1EB] text-xs tracking-[0.15em] uppercase py-3 hover:bg-[#B8956A] transition-colors"
              >
                Inquire About Similar Project →
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

function SelectedWork() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory)

  return (
    <section id="work" className="py-24 md:py-36 bg-[#F5F1EB] relative">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16 gap-8">
          <SectionHeader
            label="Selected Portfolio"
            heading={"Spaces Designed\nWith Purpose."}
            sub="Explore our curated architectural and interior commissions across India"
          />
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-end">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat
              const count = cat === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.category === cat).length
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs tracking-[0.15em] uppercase px-5 py-2.5 transition-all duration-300 border ${
                    isSelected
                      ? 'bg-[#1C1917] text-[#F5F1EB] border-[#1C1917]'
                      : 'bg-transparent text-[#1C1917]/70 border-[rgba(28,25,23,0.15)] hover:border-[#1C1917] hover:text-[#1C1917]'
                  }`}
                >
                  {cat} <span className="text-[10px] opacity-60 ml-1 font-mono">({count})</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Editorial Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          {filteredProjects.map((project, index) => {
            // Editorial column layout logic
            let colSpan = 'md:col-span-6'
            if (index === 0) colSpan = 'md:col-span-7'
            else if (index === 1) colSpan = 'md:col-span-5 md:pt-12'
            else if (index === 2) colSpan = 'md:col-span-12 md:py-6'
            else if (index === 3) colSpan = 'md:col-span-6'
            else if (index === 4) colSpan = 'md:col-span-6 md:pt-8'

            return (
              <div key={project.id} className={colSpan}>
                <ProjectCard
                  project={project}
                  index={index}
                  onSelect={setActiveProject}
                />
              </div>
            )
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  )
}

/* ─── Project Detail Preview ──────────────────────────────────────── */
function ProjectDetail() {
  return (
    <section className="py-24 md:py-36 bg-[#EDE8DF]">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Images */}
          <div className="md:col-span-7 relative">
            <div className="img-zoom">
              <img
                src={IMGS.detail}
                alt="Villa Lumière — architectural interior with large windows"
                className="w-full h-[60vh] object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 md:-right-8 w-48 h-60 md:w-64 md:h-80 img-zoom border-4 border-[#EDE8DF] shadow-xl hidden md:block">
              <img
                src={IMGS.detail2}
                alt="Detail view of Villa Lumière"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-5 md:pl-8 lg:pl-16">
            <p className="text-[#B8956A] text-xs tracking-[0.25em] uppercase mb-4">Featured Project</p>
            <h2
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              className="text-[#1C1917] text-4xl md:text-5xl font-medium leading-tight mb-3"
            >
              Villa Lumière
            </h2>
            <p className="text-[#9B9189] text-sm mb-2">Bengaluru, India · Hospitality Design · 2025</p>
            <div className="w-8 h-px bg-[#B8956A] my-6" />
            <p className="text-[#1C1917]/70 text-base leading-relaxed mb-10 font-light">
              A boutique hospitality residence that merges Indian craft traditions with a rigorous
              contemporary spatial language. Stone, handwoven textiles, and curated light transform
              every room into a deliberate moment of stillness.
            </p>
            <a
              href="#work"
              className="inline-flex items-center gap-3 text-[#1C1917] text-xs tracking-[0.15em] uppercase group"
            >
              <span className="border-b border-[#1C1917]/40 pb-0.5 group-hover:border-[#B8956A] group-hover:text-[#B8956A] transition-colors duration-200">
                View Project
              </span>
              <span className="text-[#B8956A] group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Services ────────────────────────────────────────────────────── */
const SERVICES = [
  {
    num: '01',
    title: 'Residential Interiors',
    desc: 'Bespoke living spaces shaped around your lifestyle — from single rooms to entire residences.',
  },
  {
    num: '02',
    title: 'Commercial Interiors',
    desc: 'Environments that elevate brands, increase productivity, and leave lasting impressions.',
  },
  {
    num: '03',
    title: 'Hospitality Design',
    desc: 'Hotels, restaurants, and resorts that create immersive guest experiences through spatial storytelling.',
  },
  {
    num: '04',
    title: 'Architecture & Space Planning',
    desc: 'Architectural interventions that redefine how a space is inhabited and understood.',
  },
  {
    num: '05',
    title: 'Custom Furniture',
    desc: 'One-of-a-kind furniture designed and crafted to complete each unique interior.',
  },
  {
    num: '06',
    title: 'Styling & Material Selection',
    desc: 'Curation of materials, finishes, textiles, and objects that give a space its character.',
  },
]

function Services() {
  return (
    <section id="services" className="py-24 md:py-36 bg-[#F5F1EB]">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <SectionHeader
              label="What We Do"
              heading={"From Concept\nto Completion"}
            />
            <p className="text-[#9B9189] text-sm font-light leading-relaxed">
              We offer a full spectrum of design services — each guided by the same commitment
              to craft, intention, and attention to detail.
            </p>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <div className="divide-y divide-[rgba(28,25,23,0.1)]">
              {SERVICES.map((s) => (
                <ServiceRow key={s.num} service={s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceRow({ service }: { service: typeof SERVICES[0] }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="py-6 group cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-6">
          <span className="text-[#1C1917]/20 text-xs tracking-[0.1em] pt-1 flex-shrink-0">{service.num}</span>
          <h3
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            className="text-[#1C1917] text-xl md:text-2xl font-medium group-hover:text-[#B8956A] transition-colors duration-200"
          >
            {service.title}
          </h3>
        </div>
        <span className={`text-[#1C1917]/40 text-lg flex-shrink-0 mt-0.5 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>+</span>
      </div>
      {open && (
        <p className="mt-3 ml-12 text-[#9B9189] text-sm font-light leading-relaxed">{service.desc}</p>
      )}
    </div>
  )
}

/* ─── Design Philosophy ───────────────────────────────────────────── */
function Philosophy() {
  return (
    <section className="py-24 md:py-36 bg-[#1C1917]">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 lg:col-span-5">
            <p className="text-[#B8956A] text-xs tracking-[0.25em] uppercase mb-6 font-light">Our Philosophy</p>
            <h2
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              className="text-[#F5F1EB] text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-8"
            >
              Design With
              <br />
              <em className="italic font-normal text-[#B8956A]">Intention.</em>
            </h2>
            <p className="text-[#F5F1EB]/50 text-base md:text-lg font-light leading-relaxed">
              We create spaces that balance architecture, functionality, material, and emotion — designed not simply to look beautiful, but to feel right.
            </p>
            <div className="mt-12 flex items-center gap-4">
              <div className="w-12 h-px bg-[#B8956A]" />
              <p className="text-[#F5F1EB]/30 text-xs tracking-[0.15em] uppercase font-light">Forma Studio</p>
            </div>
          </div>
          <div className="md:col-span-6 lg:col-span-7 img-zoom">
            <img
              src={IMGS.philosophy}
              alt="Architectural interior — minimal white corridor with skylight"
              className="w-full h-[70vh] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Process ─────────────────────────────────────────────────────── */
const STEPS = [
  { num: '01', title: 'Discover', desc: 'Understanding the client, space, lifestyle, and goals.' },
  { num: '02', title: 'Concept', desc: 'Developing the design direction, mood, materials, and spatial language.' },
  { num: '03', title: 'Design', desc: 'Transforming the concept into detailed layouts, visuals, and specifications.' },
  { num: '04', title: 'Execute', desc: 'Managing the execution and bringing every detail to life.' },
  { num: '05', title: 'Deliver', desc: 'A finished space that feels personal, functional, and timeless.' },
]

function Process() {
  return (
    <section className="py-24 md:py-36 bg-[#F5F1EB]">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-24">
          <div className="md:col-span-5">
            <SectionHeader
              label="How We Work"
              heading="Our Process"
            />
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-[rgba(28,25,23,0.1)]">
          {STEPS.map((step) => (
            <div key={step.num} className="bg-[#F5F1EB] p-8 hover:bg-[#EDE8DF] transition-colors duration-300 group">
              <p
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                className="text-[#1C1917]/15 text-5xl font-medium mb-6 group-hover:text-[#B8956A]/30 transition-colors duration-300"
              >
                {step.num}
              </p>
              <h3
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                className="text-[#1C1917] text-lg font-medium mb-3"
              >
                {step.title}
              </h3>
              <p className="text-[#9B9189] text-sm font-light leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── About ───────────────────────────────────────────────────────── */
const METRICS = [
  { value: '10+', label: 'Years Experience' },
  { value: '120+', label: 'Projects Completed' },
  { value: '8', label: 'Cities' },
  { value: '25+', label: 'Design Awards' },
]

function About() {
  return (
    <section id="about" className="py-24 md:py-36 bg-[#EDE8DF]">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Images */}
          <div className="md:col-span-5 relative">
            <div className="img-zoom">
              <img
                src={IMGS.about}
                alt="Studio interior — design workspace"
                className="w-full h-[60vh] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 w-40 h-52 img-zoom border-4 border-[#EDE8DF] hidden md:block">
              <img
                src={IMGS.about2}
                alt="Architectural exterior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-6 md:col-start-7">
            <SectionHeader
              label="About the Studio"
              heading={"Spaces With\nCharacter."}
            />
            <p className="text-[#1C1917]/70 text-base font-light leading-relaxed mb-6">
              Forma Studio is a multidisciplinary interior design and architecture practice founded on the belief
              that every space has a story waiting to be told. We work across residential, commercial, and
              hospitality typologies — bringing the same level of care and craft to each project.
            </p>
            <p className="text-[#1C1917]/70 text-base font-light leading-relaxed mb-12">
              Our process is deeply collaborative. We listen before we draw, observe before we propose,
              and design before we specify — because the best interiors are the ones that belong to
              the people who inhabit them.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-px bg-[rgba(28,25,23,0.1)] border border-[rgba(28,25,23,0.1)]">
              {METRICS.map((m) => (
                <div key={m.label} className="bg-[#EDE8DF] px-6 py-5">
                  <p
                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                    className="text-[#1C1917] text-3xl font-medium mb-1"
                  >
                    {m.value}
                  </p>
                  <p className="text-[#9B9189] text-xs tracking-wide">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Materials ───────────────────────────────────────────────────── */
const MATERIALS = [
  { img: IMGS.mat1, label: 'Wood', caption: 'Warm grain, enduring craft' },
  { img: IMGS.mat2, label: 'Stone', caption: 'Raw permanence, quiet strength' },
  { img: IMGS.mat3, label: 'Fabric', caption: 'Texture, comfort, color' },
  { img: IMGS.mat4, label: 'Metal', caption: 'Precision, edge, reflection' },
]

function Materials() {
  return (
    <section className="py-24 md:py-36 bg-[#F5F1EB]">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <SectionHeader
            label="Craft"
            heading="Details Matter."
          />
          <p className="text-[#9B9189] text-sm font-light leading-relaxed max-w-sm md:text-right">
            We select every material with intention — each surface, texture, and finish chosen for how it reads in light and how it feels in life.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {MATERIALS.map((m, i) => (
            <div key={m.label} className={`group cursor-pointer ${i === 1 ? 'mt-8' : i === 3 ? 'mt-4' : ''}`}>
              <div className="img-zoom overflow-hidden bg-[#EDE8DF]">
                <img
                  src={m.img}
                  alt={`${m.label} material detail`}
                  className="w-full object-cover"
                  style={{ height: i === 1 || i === 3 ? '420px' : '360px' }}
                />
              </div>
              <div className="mt-3">
                <p
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                  className="text-[#1C1917] text-base font-medium"
                >
                  {m.label}
                </p>
                <p className="text-[#9B9189] text-xs font-light mt-0.5">{m.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Testimonials ────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: "Forma Studio didn't just design our home — they sculpted an experience. Every corner captures natural light beautifully, and the attention to custom joinery is extraordinary.",
    name: 'Priya & Vikram Mehta',
    project: 'Casa Verde',
    location: 'Chennai, India',
    role: 'Private Residence Client',
  },
  {
    quote: "Working with Forma was transformative. They understood not just our brand architecture but our corporate ethos, crafting a flagship workspace that inspires our team every single day.",
    name: 'Arjun Kapoor',
    project: 'The Atelier',
    location: 'Mumbai, India',
    role: 'Founder & Managing Director',
  },
  {
    quote: "The seamless blend of modern minimalism and warm, tactile materials completely redefined how we experience living. The team managed every single detail with precision and grace.",
    name: 'Sophia & David Lin',
    project: 'Villa Lumière',
    location: 'Bengaluru, India',
    role: 'Penthouse Residence',
  },
  {
    quote: "From spatial flow to hand-selected stone slabs, Forma Studio brings an unprecedented level of sophistication. Guests walk into our hotel and instantly feel the serene atmosphere.",
    name: 'Kavita Krishnamurthy',
    project: 'Meridian Sanctuary',
    location: 'Delhi, India',
    role: 'Hospitality Client',
  },
  {
    quote: "Forma Studio transformed our heritage property into a contemporary sanctuary while honoring its architectural soul. Their mastery of natural light and raw materiality is unmatched.",
    name: 'Rohan & Ananya Roy',
    project: 'Studio Blanc Residence',
    location: 'Hyderabad, India',
    role: 'Heritage Restoration',
  },
]

function Testimonials() {
  const [active, setActive] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % TESTIMONIALS.length)
  }, [])

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }, [])

  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      handleNext()
    }, 5000)
    return () => clearInterval(timer)
  }, [handleNext, isHovered])

  const t = TESTIMONIALS[active]

  return (
    <section
      className="py-24 md:py-36 bg-[#1C1917] relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <p className="text-[#B8956A] text-xs tracking-[0.25em] uppercase font-light">Client Words</p>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8956A] animate-pulse" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#F5F1EB]/40 text-xs tracking-widest font-mono">
              {String(active + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 border border-[#F5F1EB]/20 text-[#F5F1EB] hover:border-[#B8956A] hover:text-[#B8956A] flex items-center justify-center transition-colors duration-200"
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 border border-[#F5F1EB]/20 text-[#F5F1EB] hover:border-[#B8956A] hover:text-[#B8956A] flex items-center justify-center transition-colors duration-200"
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl">
          <span
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            className="text-[#F5F1EB]/10 text-[7rem] md:text-[9rem] leading-none block -mb-10 md:-mb-14 select-none pointer-events-none"
          >
            "
          </span>
          <div key={active} className="fade-up">
            <blockquote
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              className="text-[#F5F1EB] text-2xl md:text-4xl lg:text-5xl font-medium italic leading-tight mb-10 min-h-[160px] md:min-h-[130px]"
            >
              {t.quote}
            </blockquote>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-[#F5F1EB]/10">
              <div>
                <p className="text-[#F5F1EB] text-base font-medium tracking-wide">{t.name}</p>
                <p className="text-[#9B9189] text-xs mt-1">{t.role} · {t.project} · {t.location}</p>
              </div>
              <div className="flex gap-2 items-center">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="h-1 rounded-full relative overflow-hidden transition-all duration-300 bg-[#F5F1EB]/20"
                    style={{ width: i === active ? '3rem' : '1rem' }}
                    aria-label={`Testimonial ${i + 1}`}
                  >
                    {i === active && (
                      <span
                        key={`bar-${active}-${isHovered}`}
                        className="absolute inset-0 bg-[#B8956A]"
                        style={{
                          animation: !isHovered ? 'progressFill 5s linear' : 'none',
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Journal ─────────────────────────────────────────────────────── */
const ARTICLES = [
  {
    img: IMGS.journal1,
    category: 'Material Selection',
    title: 'On the Enduring Appeal of Natural Stone in Contemporary Interiors',
    date: 'July 2026',
    read: '6 min read',
  },
  {
    img: IMGS.journal2,
    category: 'Architecture',
    title: 'How Light Transforms a Space — A Study in Aperture and Form',
    date: 'June 2026',
    read: '8 min read',
  },
  {
    img: IMGS.journal3,
    category: 'Behind the Scenes',
    title: 'The Making of Casa Verde: From Brief to Completion',
    date: 'May 2026',
    read: '10 min read',
  },
]

function Journal() {
  return (
    <section id="journal" className="py-24 md:py-36 bg-[#EDE8DF]">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
          <SectionHeader label="Insights" heading={"From Our\nJournal"} />
          <a
            href="#journal"
            className="self-start md:self-end text-[#1C1917] text-xs tracking-[0.15em] uppercase border-b border-[#1C1917]/30 pb-0.5 hover:border-[#B8956A] hover:text-[#B8956A] transition-colors"
          >
            Read All Articles
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {ARTICLES.map((a, i) => (
            <article key={a.title} className={`group cursor-pointer ${i === 1 ? 'md:mt-10' : ''}`}>
              <div className="img-zoom overflow-hidden bg-[#1C1917] mb-5">
                <img
                  src={a.img}
                  alt={a.title}
                  className="w-full h-52 object-cover group-hover:opacity-90 transition-opacity duration-300"
                />
              </div>
              <p className="text-[#B8956A] text-xs tracking-[0.2em] uppercase mb-2">{a.category}</p>
              <h3
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                className="text-[#1C1917] text-xl font-medium leading-snug mb-4 group-hover:text-[#B8956A] transition-colors duration-200"
              >
                {a.title}
              </h3>
              <div className="flex items-center gap-3 text-[#9B9189] text-xs">
                <span>{a.date}</span>
                <span className="w-1 h-1 rounded-full bg-[#9B9189]" />
                <span>{a.read}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA ─────────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="relative py-36 md:py-48 bg-[#1C1917] overflow-hidden">
      <img
        src={IMGS.cta}
        alt="Interior space — an invitation to create"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-16 text-center">
        <p className="text-[#B8956A] text-xs tracking-[0.25em] uppercase mb-6 font-light">Ready to Begin</p>
        <h2
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          className="text-[#F5F1EB] text-4xl md:text-6xl lg:text-7xl font-medium leading-tight mb-6 max-w-3xl mx-auto"
        >
          Let's Create a Space That Feels Like{' '}
          <em className="italic font-normal text-[#B8956A]">You.</em>
        </h2>
        <p className="text-[#F5F1EB]/50 text-base md:text-lg font-light mb-12 max-w-md mx-auto">
          Have a space in mind? Tell us about your project.
        </p>
        <a
          href="#contact"
          className="inline-block bg-[#F5F1EB] text-[#1C1917] text-xs tracking-[0.15em] uppercase px-10 py-4 hover:bg-[#B8956A] hover:text-[#F5F1EB] transition-all duration-300"
        >
          Start a Conversation
        </a>
      </div>
    </section>
  )
}

/* ─── Contact Form ────────────────────────────────────────────────── */
function Contact() {
  const [sent, setSent] = useState(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="py-24 md:py-36 bg-[#F5F1EB]">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-5">
            <SectionHeader label="Get in Touch" heading={"Tell Us\nAbout Your\nProject."} />
            <div className="space-y-4 text-sm text-[#9B9189] font-light">
              <p>hello@formastudio.in</p>
              <p>+91 44 0000 0000</p>
              <p>Chennai · Mumbai · Bengaluru</p>
            </div>
            <div className="flex gap-6 mt-8">
              {['Instagram', 'Pinterest', 'LinkedIn'].map((s) => (
                <a key={s} href="#" className="text-[#9B9189] text-xs tracking-[0.1em] uppercase hover:text-[#B8956A] transition-colors duration-200">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            {sent ? (
              <div className="flex items-center gap-4 py-8">
                <div className="w-8 h-px bg-[#B8956A]" />
                <p
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                  className="text-[#1C1917] text-xl font-medium italic"
                >
                  Thank you. We'll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { id: 'name', label: 'Your Name', type: 'text', placeholder: 'Priya Mehta' },
                  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'priya@example.com' },
                  { id: 'project', label: 'Project Type', type: 'text', placeholder: 'Residential Interior, 3BHK' },
                ].map((f) => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block text-xs tracking-[0.12em] uppercase text-[#9B9189] mb-2">
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      type={f.type}
                      placeholder={f.placeholder}
                      required
                      className="w-full bg-transparent border-b border-[rgba(28,25,23,0.2)] py-3 text-[#1C1917] text-sm placeholder-[#9B9189]/50 focus:outline-none focus:border-[#B8956A] transition-colors duration-200"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="block text-xs tracking-[0.12em] uppercase text-[#9B9189] mb-2">
                    Tell us about your project
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Describe your space, timeline, and aspirations..."
                    required
                    className="w-full bg-transparent border-b border-[rgba(28,25,23,0.2)] py-3 text-[#1C1917] text-sm placeholder-[#9B9189]/50 focus:outline-none focus:border-[#B8956A] transition-colors duration-200 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 border border-[#1C1917] text-[#1C1917] text-xs tracking-[0.12em] uppercase px-8 py-3.5 hover:bg-[#1C1917] hover:text-[#F5F1EB] transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ──────────────────────────────────────────────────────── */
function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#1C1917] text-[#F5F1EB] pt-24 pb-12 border-t border-[#F5F1EB]/10 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">

        {/* Top Newsletter & Journal Subscription */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-[#F5F1EB]/10 items-end">
          <div className="lg:col-span-7">
            <p className="text-[#B8956A] text-xs tracking-[0.25em] uppercase mb-4 font-light">
              Journal & Insights
            </p>
            <h3
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              className="text-[#F5F1EB] text-3xl md:text-5xl font-medium leading-tight"
            >
              Stories on craft, material, <br className="hidden sm:block" />
              and spatial design — in your inbox.
            </h3>
          </div>
          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="p-4 border border-[#B8956A]/50 bg-[#B8956A]/10 text-[#F5F1EB] text-sm font-light">
                Thank you for subscribing to the FORMA Journal.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="bg-transparent border-b border-[#F5F1EB]/30 py-3 px-1 text-sm text-[#F5F1EB] placeholder-[#9B9189] focus:outline-none focus:border-[#B8956A] transition-colors flex-grow"
                />
                <button
                  type="submit"
                  className="bg-[#F5F1EB] text-[#1C1917] text-xs tracking-[0.15em] uppercase px-8 py-3.5 hover:bg-[#B8956A] hover:text-[#F5F1EB] transition-all duration-300 flex-shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
            <p className="text-[#9B9189] text-xs mt-3 font-light">
              Published quarterly. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10 py-20 border-b border-[#F5F1EB]/10">
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-4">
            <a href="#" className="flex items-center gap-2 mb-6 group inline-block">
              <span
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                className="text-[#F5F1EB] text-2xl font-medium tracking-tight"
              >
                FORMA
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8956A]" />
              <span className="text-[#9B9189] text-xs tracking-[0.2em] uppercase font-light">
                Studio
              </span>
            </a>
            <p className="text-[#9B9189] text-sm font-light leading-relaxed max-w-sm mb-6">
              A multidisciplinary interior design and architecture practice shaping residential, commercial, and hospitality environments.
            </p>
            <div className="flex items-center gap-2 text-[#B8956A] text-xs tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#B8956A] animate-pulse" />
              <span>Accepting commissions for Q3/Q4 2026</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <p className="text-[#F5F1EB]/40 text-xs tracking-[0.25em] uppercase mb-6 font-mono">
              Navigation
            </p>
            <ul className="space-y-3.5">
              {NAV.map((n) => (
                <li key={n.label}>
                  <a
                    href={n.href}
                    className="text-[#9B9189] hover:text-[#F5F1EB] text-sm font-light transition-colors duration-200"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise */}
          <div className="lg:col-span-2">
            <p className="text-[#F5F1EB]/40 text-xs tracking-[0.25em] uppercase mb-6 font-mono">
              Expertise
            </p>
            <ul className="space-y-3.5">
              {[
                'Residential Interiors',
                'Commercial Spaces',
                'Hospitality Design',
                'Space Planning',
                'Custom Furniture',
                'Material Curation',
              ].map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-[#9B9189] hover:text-[#F5F1EB] text-sm font-light transition-colors duration-200"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Offices & Direct Contacts */}
          <div className="col-span-2 lg:col-span-3">
            <p className="text-[#F5F1EB]/40 text-xs tracking-[0.25em] uppercase mb-6 font-mono">
              Studios
            </p>
            <div className="space-y-4 text-sm font-light">
              <div>
                <p className="text-[#F5F1EB] font-medium text-xs tracking-wider uppercase mb-1">Chennai Studio</p>
                <p className="text-[#9B9189]">42 Kasturi Ranga Road, Alwarpet</p>
              </div>
              <div>
                <p className="text-[#F5F1EB] font-medium text-xs tracking-wider uppercase mb-1">Mumbai Studio</p>
                <p className="text-[#9B9189]">12 Worli Sea Face, Worli</p>
              </div>
              <div className="pt-2">
                <p className="text-[#F5F1EB] font-medium text-xs tracking-wider uppercase mb-1">Direct Contact</p>
                <a href="mailto:hello@formastudio.in" className="text-[#B8956A] hover:underline block">
                  hello@formastudio.in
                </a>
                <p className="text-[#9B9189] mt-0.5">+91 44 4500 8900</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Bar */}
        <div className="py-8 border-b border-[#F5F1EB]/10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-8">
            <span className="text-[#F5F1EB]/40 text-xs tracking-[0.2em] uppercase font-mono">Connect</span>
            {[
              { label: 'Instagram', href: 'https://instagram.com' },
              { label: 'Pinterest', href: 'https://pinterest.com' },
              { label: 'LinkedIn', href: 'https://linkedin.com' },
              { label: 'ArchDaily', href: '#' },
              { label: 'Behance', href: '#' },
            ].map((soc) => (
              <a
                key={soc.label}
                href={soc.href}
                target="_blank"
                rel="noreferrer"
                className="text-[#9B9189] hover:text-[#B8956A] text-xs tracking-wider transition-colors duration-200"
              >
                {soc.label} ↗
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#9B9189] hover:text-[#F5F1EB] text-xs tracking-[0.15em] uppercase transition-colors duration-200 group"
          >
            <span>Back to Top</span>
            <span className="group-hover:-translate-y-1 transition-transform duration-200">↑</span>
          </button>
        </div>

        {/* Oversized Architectural Branding */}
        <div className="py-12 text-center select-none opacity-15 hover:opacity-25 transition-opacity duration-500">
          <h2
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            className="text-[#F5F1EB] text-6xl sm:text-8xl md:text-[10rem] lg:text-[13rem] font-medium tracking-tighter leading-none"
          >
            FORMA
          </h2>
        </div>

        {/* Bottom Rights & Legal */}
        <div className="pt-6 border-t border-[#F5F1EB]/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#9B9189]/60 font-light">
          <p>© {new Date().getFullYear()} FORMA Studio Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#9B9189] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#9B9189] transition-colors">Terms of Architectural Service</a>
            <a href="#" className="hover:text-[#9B9189] transition-colors">Cookie Preferences</a>
          </div>
        </div>

      </div>
    </footer>
  )
}

/* ─── Preloader ────────────────────────────────────────────────────── */
function Preloader({
  isVideoReady,
  videoDownloadPercent,
}: {
  isVideoReady: boolean
  videoDownloadPercent: number
}) {
  const [progress, setProgress] = useState(0)
  const [loadingTextIndex, setLoadingTextIndex] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const theme = { bg: '#1C1917', text: '#F5F1EB', accent: '#B8956A', sub: '#9B9189' }

  const loadingPhrases = [
    'Architectural Form & Light',
    'Curating Materials & Textures',
    'Downloading Cinema Video',
    'Spaces Designed Around You',
    'Welcome to FORMA Studio',
  ]

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const interval = setInterval(() => {
      setProgress((prev) => {
        let cap = 92
        if (videoDownloadPercent > 0) {
          cap = Math.min(95, videoDownloadPercent)
        }

        if (prev >= cap && !isVideoReady) {
          return cap
        }
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        const diff = Math.floor(Math.random() * 3) + 2
        return Math.min(prev + diff, 100)
      })
    }, 45)

    return () => clearInterval(interval)
  }, [isVideoReady, videoDownloadPercent])

  useEffect(() => {
    if (progress < 25) setLoadingTextIndex(0)
    else if (progress < 50) setLoadingTextIndex(1)
    else if (progress < 80) setLoadingTextIndex(2)
    else if (progress < 99) setLoadingTextIndex(3)
    else setLoadingTextIndex(4)

    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsFinished(true)
      }, 400)

      const removeTimer = setTimeout(() => {
        setIsDone(true)
        document.body.style.overflow = ''
      }, 1400)

      return () => {
        clearTimeout(timer)
        clearTimeout(removeTimer)
      }
    }
  }, [progress])

  if (isDone) return null

  return (
    <div
      style={{ backgroundColor: theme.bg }}
      className={`fixed inset-0 z-[100] flex flex-col justify-between p-8 md:p-16 transition-all duration-1000 cubic-bezier(0.77,0,0.175,1) ${
        isFinished ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between text-xs tracking-[0.2em] uppercase font-mono" style={{ color: `${theme.text}60` }}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: theme.accent }} />
          <span>FORMA Studio</span>
        </div>
        <span>Architecture & Interior</span>
      </div>

      {/* Center Brand & Phrase */}
      <div className="max-w-4xl mx-auto w-full text-center flex flex-col items-center justify-center my-auto py-12">
        <h1
          style={{ fontFamily: 'Playfair Display, Georgia, serif', color: theme.text }}
          className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight mb-6"
        >
          FORMA
          <span className="inline-block w-2.5 h-2.5 md:w-4 md:h-4 rounded-full ml-2" style={{ backgroundColor: theme.accent }} />
        </h1>

        {/* Dynamic phrase reveal */}
        <div className="h-8 overflow-hidden relative">
          <p
            key={loadingTextIndex}
            style={{ color: theme.accent }}
            className="text-xs md:text-sm tracking-[0.3em] uppercase font-light fade-up"
          >
            {loadingPhrases[loadingTextIndex]}
          </p>
        </div>
      </div>

      {/* Bottom Counter & Hairline Progress */}
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between mb-4 font-mono" style={{ color: theme.text }}>
          <span className="text-xs tracking-widest uppercase" style={{ color: theme.sub }}>
            {isVideoReady ? 'Video Ready • Finalizing' : `Downloading Cinema Video ${videoDownloadPercent > 0 ? `(${videoDownloadPercent}%)` : ''}`}
          </span>
          <span className="text-3xl md:text-5xl font-light" style={{ color: theme.text }}>
            {String(progress).padStart(2, '0')}%
          </span>
        </div>

        {/* Hairline Progress Bar */}
        <div className="w-full h-0.5 relative overflow-hidden rounded-full" style={{ backgroundColor: `${theme.text}20` }}>
          <div
            className="h-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%`, backgroundColor: theme.accent }}
          />
        </div>
      </div>
    </div>
  )
}

/* ─── App ─────────────────────────────────────────────────────────── */
export default function App() {
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [videoDownloadPercent, setVideoDownloadPercent] = useState(0)

  return (
    <div className="min-h-screen">
      <Preloader isVideoReady={isVideoReady} videoDownloadPercent={videoDownloadPercent} />
      <Navigation />
      <Hero
        onVideoReady={() => setIsVideoReady(true)}
        onVideoProgress={(pct) => setVideoDownloadPercent(pct)}
      />
      <SelectedWork />
      <ProjectDetail />
      <Services />
      <Philosophy />
      <Process />
      <About />
      <Materials />
      <Testimonials />
      <Journal />
      <CTA />
      <Contact />
      <Footer />
    </div>
  )
}
