'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, MapPin, ArrowUpRight, Download, Database, Map, ShieldCheck, MessageSquare, LineChart, ChevronDown, ArrowUp, Award } from 'lucide-react';
import './portfolio.css';

const PHOTO = '/profile.jpg';

const colors = {
  bg: '#0B0E14',
  surface: '#131826',
  surface2: '#1B2233',
  border: '#232B3D',
  amber: '#E8A33D',
  amberLight: '#F2C063',
  amberSoft: 'rgba(232,163,61,0.14)',
  teal: '#45D0C0',
  tealSoft: 'rgba(69,208,192,0.12)',
  text: '#ECE9E2',
  muted: '#8B93A7',
  faint: '#5B6478',
};

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'background', label: 'Background' },
  { id: 'contact', label: 'Contact' },
];
const SECTION_IDS = NAV.map((n) => n.id);

const SKILLS = [
  { label: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'HTML5', 'CSS3'] },
  { label: 'Frontend & Web', items: ['React.js', 'Next.js', 'Tailwind CSS', 'Redux / Context API', 'Three.js', 'Responsive Design'] },
  { label: 'Backend & APIs', items: ['Node.js', 'Express.js', 'FastAPI', 'RESTful APIs', 'WebSockets'] },
  { label: 'AI, ML & NLP', items: ['LangChain / LangGraph', 'RAG', 'Local Deployment (MLX / Ollama)', 'PyTorch', 'Vector DBs (ChromaDB / Qdrant)'] },
  { label: 'Geospatial & Data', items: ['PostGIS', 'OSM Processing', 'Spatial Data Engineering', 'Pandas', 'NumPy'] },
  { label: 'Cloud & DevOps', items: ['MongoDB', 'PostgreSQL', 'Redis', 'AWS (S3, Athena)', 'Docker', 'Git', 'Linux'] },
];

const PROJECTS = [
  {
    name: 'UrivDocs',
    tag: '~/uriv-docs',
    icon: Database,
    description: 'A fully local, privacy-first RAG engine built to query massive PDF datasets — no paid third-party APIs, nothing leaves the machine.',
    stack: ['RAG', 'Local-First', 'PDF Search'],
    github: 'https://github.com/Uriv7/UrivDocs',
  },
  {
    name: 'URIV-GEOSCALE',
    tag: '~/uriv-geoscale',
    icon: Map,
    description: 'A national-scale GeoAI engine: 3.8M+ OpenStreetMap points turned into structured features at 150K+ nodes/sec, then clustered across a 50GB+ database to surface infrastructure blind spots and commercial corridors.',
    stack: ['Python', 'GeoPandas', 'PostGIS', 'Docker'],
    github: 'https://github.com/Uriv7/URIV-GEOSCALE',
  },
  {
    name: 'SentriAI',
    tag: '~/sentri-ai',
    icon: ShieldCheck,
    description: 'An automated AI security and compliance platform that parses dense documents and returns verified, context-aware answers through localized RAG workflows.',
    stack: ['RAG', 'Security', 'Compliance'],
    github: 'https://github.com/Uriv7/SentriAI',
  },
  {
    name: 'UrivChat',
    tag: '~/uriv-chat',
    icon: MessageSquare,
    description: 'A full-stack, real-time chat application — Dockerized with its own nginx, auth, and SSL layer, deployed to a cloud VPS.',
    stack: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Docker'],
    github: 'https://github.com/Uriv7/UrivChat',
  },
  {
    name: 'InvestIQ',
    tag: '~/invest-iq',
    icon: LineChart,
    description: 'An AI investment research tool built on a LangGraph-style multi-agent pipeline, wrapped in a dark terminal interface.',
    stack: ['Next.js', 'LangGraph', 'Groq', 'MongoDB'],
    github: 'https://github.com/Uriv7/InvestIQ',
  },
];

const CERTIFICATIONS = [
  { name: 'Master Generative AI & Generative AI Tools', issuer: 'Udemy', date: 'Aug 2025' },
  { name: 'ChatGPT-4 Prompt Engineering: Generative AI & LLM', issuer: 'Infosys', date: 'Aug 2025' },
  { name: 'Social Networks', issuer: 'NPTEL', date: 'Oct 2025' },
  { name: 'DSA Optimization Training — 140 hrs', issuer: 'Hitbullseye & LPU', date: 'Jun–Jul 2025' },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setVisible(true); return; }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useTypewriter(fullText, speed) {
  const [out, setOut] = useState('');
  useEffect(() => {
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setOut(fullText); return; }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [fullText, speed]);
  return out;
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observers = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(id);
      }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);
  return active;
}

function useScrolledPast(threshold) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return past;
}

function Reveal({ children, className, style }) {
  const [ref, visible] = useReveal();
  const base = 'transition-all duration-700 ease-out ' + (visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6');
  return (
    <div ref={ref} className={base + ' ' + (className || '')} style={style || {}}>
      {children}
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="text-xs tracking-widest uppercase mb-4 inline-flex items-center gap-2" style={{ fontFamily: "'JetBrains Mono', monospace", color: colors.amber }}>
      <span style={{ width: 6, height: 6, background: colors.amber, display: 'inline-block', borderRadius: 1, boxShadow: '0 0 8px ' + colors.amber }} />
      {children}
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="pill text-xs px-2.5 py-1 rounded-full inline-block" style={{ fontFamily: "'JetBrains Mono', monospace", background: colors.surface2, color: colors.muted, border: '1px solid ' + colors.border }}>
      {children}
    </span>
  );
}

function Glow({ color, size, style }) {
  return (
    <div className="glow-orb" style={{ width: size, height: size, background: color, ...style }} />
  );
}

export default function Portfolio() {
  const fullTerm = 'virender@uriv:~$ whoami\n> Machine Learning Engineer & Full-Stack Developer\n\nvirender@uriv:~$ location\n> Faridabad, Haryana, India';
  const typed = useTypewriter(fullTerm, 16);
  const activeSection = useActiveSection(SECTION_IDS);
  const showBackToTop = useScrolledPast(700);

  return (
    <div style={{ background: colors.bg, color: colors.text, minHeight: '100vh', fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4" style={{ background: 'rgba(11,14,20,0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid ' + colors.border }}>
        <a href="#top" className="text-sm font-semibold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif", color: colors.text }}>
          uriv<span style={{ color: colors.amber }}>.</span>
        </a>
        <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={'#' + n.id}
              className="nav-link text-xs tracking-wide uppercase whitespace-nowrap"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: activeSection === n.id ? colors.amber : colors.muted }}
            >
              {n.label}
            </a>
          ))}
        </div>
      </nav>

      <section id="top" className="relative overflow-hidden px-6 md:px-12 pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="bg-grid-layer" />
        <Glow color={colors.amber} size={480} style={{ top: -160, right: -140 }} />
        <Glow color={colors.teal} size={420} style={{ top: 160, left: -180 }} />
        <div className="max-w-5xl mx-auto hero-grid relative" style={{ zIndex: 1 }}>
          <div>
            <div className="text-xs tracking-widest uppercase mb-5 flex items-center gap-2" style={{ fontFamily: "'JetBrains Mono', monospace", color: colors.teal }}>
              <span style={{ width: 6, height: 6, background: colors.teal, display: 'inline-block', borderRadius: 1, boxShadow: '0 0 8px ' + colors.teal }} />
              Portfolio / Uriv
            </div>
            <h1 className="gradient-text text-5xl md:text-7xl font-semibold mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.02 }}>
              Virender Gupta
            </h1>
            <p className="text-lg md:text-xl mb-8" style={{ color: colors.muted }}>
              Machine Learning Engineer &amp; Full-Stack Developer
            </p>

            <div className="terminal-box rounded-lg p-4 md:p-5 mb-8 text-xs md:text-sm leading-relaxed whitespace-pre-wrap terminal-glow" style={{ fontFamily: "'JetBrains Mono', monospace", background: colors.surface, border: '1px solid ' + colors.border, color: colors.teal, minHeight: 108, boxShadow: '0 20px 50px rgba(0,0,0,0.35)' }}>
              {typed}
              <span className="inline-block w-2 h-4 align-middle ml-0.5 cursor-blink" style={{ background: colors.teal, boxShadow: '0 0 8px ' + colors.teal }} />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a href="https://github.com/Uriv7" className="btn-primary inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-md" style={{ color: colors.bg, fontWeight: 600 }}>
                <Github size={16} /> GitHub
              </a>
              <a href="https://linkedin.com/in/virender-gupta" className="btn-outline inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-md" style={{ border: '1px solid ' + colors.border, color: colors.text }}>
                <Linkedin size={16} /> LinkedIn
              </a>
              <a href="mailto:virender.sonu.gupta@gmail.com" className="btn-outline inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-md" style={{ border: '1px solid ' + colors.border, color: colors.text }}>
                <Mail size={16} /> Email
              </a>
            </div>
            <div className="flex items-center gap-2 mt-6 text-xs" style={{ color: colors.faint, fontFamily: "'JetBrains Mono', monospace" }}>
              <MapPin size={13} /> Faridabad, Haryana, India
            </div>
          </div>

          <div className="justify-self-center float-slow">
            <div className="photo-frame" style={{ width: 220, height: 220 }}>
              <div className="halo" />
              <div className="absolute inset-0 rounded-2xl" style={{ border: '1.5px solid ' + colors.amber, transform: 'translate(10px, 10px)' }} />
              <img src={PHOTO} alt="Virender Gupta" className="relative rounded-2xl w-full h-full object-cover" style={{ border: '1px solid ' + colors.border, boxShadow: '0 24px 60px rgba(0,0,0,0.55)' }} />
            </div>
          </div>
        </div>

        <a
          href="#about"
          className="hidden md:flex absolute bottom-6 left-1/2 flex-col items-center gap-1 text-xs"
          style={{ color: colors.faint, fontFamily: "'JetBrains Mono', monospace", transform: 'translateX(-50%)', zIndex: 1 }}
        >
          scroll
          <ChevronDown size={16} className="animate-bounce" />
        </a>
      </section>

      <hr className="divider" />

      <section id="about" className="px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow>About</Eyebrow>
            <p className="text-xl md:text-2xl leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
              I'm a Computer Science student and Software Engineer passionate about building intelligent, production-ready systems at the intersection of AI and Web Development.
            </p>
            <p className="mt-6 text-base md:text-lg leading-relaxed" style={{ color: colors.muted }}>
              My focus spans designing full-stack applications and deploying local, privacy-focused machine learning models — from geospatial engines to custom NLP solutions. Driven by solving high-impact problems without unnecessary complexity, I enjoy transforming raw data into performant, real-world platforms.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="skills" className="relative overflow-hidden px-6 md:px-12 py-20 md:py-28" style={{ background: colors.surface, borderTop: '1px solid ' + colors.border, borderBottom: '1px solid ' + colors.border }}>
        <Glow color={colors.teal} size={380} style={{ bottom: -160, right: -120 }} />
        <div className="max-w-5xl mx-auto relative">
          <Reveal>
            <Eyebrow>Stack</Eyebrow>
            <h2 className="text-2xl md:text-3xl mb-12" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
              Tools I reach for
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILLS.map((group, idx) => (
              <Reveal key={group.label} style={{ transitionDelay: (idx * 60) + 'ms' }}>
                <div className="card-hover p-5 rounded-lg h-full" style={{ background: colors.bg, border: '1px solid ' + colors.border, boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}>
                  <div className="text-xs uppercase tracking-wide mb-3" style={{ fontFamily: "'JetBrains Mono', monospace", color: colors.teal }}>
                    {group.label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => <Pill key={item}>{item}</Pill>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <Eyebrow>Work</Eyebrow>
            <h2 className="text-2xl md:text-3xl mb-12" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
              Five systems, five different problems
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {PROJECTS.map((p, idx) => (
              <Reveal key={p.name} style={{ transitionDelay: (idx * 70) + 'ms' }} className={idx === 4 ? 'md:col-span-2' : ''}>
                <a href={p.github} target="_blank" rel="noreferrer" className="proj-card block p-6 rounded-lg h-full" style={{ background: colors.surface, border: '1px solid ' + colors.border, boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="rounded-md flex items-center justify-center flex-shrink-0" style={{ width: 36, height: 36, background: colors.surface2, border: '1px solid ' + colors.border }}>
                        <p.icon size={17} style={{ color: colors.teal }} />
                      </div>
                      <div>
                        <div className="text-xs mb-1" style={{ fontFamily: "'JetBrains Mono', monospace", color: colors.faint }}>{p.tag}</div>
                        <h3 className="text-lg font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{p.name}</h3>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="arrow-ic flex-shrink-0" style={{ color: colors.amber }} />
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: colors.muted }}>{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((s) => <Pill key={s}>{s}</Pill>)}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="background" className="px-6 md:px-12 py-20 md:py-28" style={{ background: colors.surface, borderTop: '1px solid ' + colors.border, borderBottom: '1px solid ' + colors.border }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <Reveal>
            <Eyebrow>Experience</Eyebrow>
            <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Web &amp; UX/UI Developer Intern</h3>
            <div className="text-sm mb-4" style={{ color: colors.faint, fontFamily: "'JetBrains Mono', monospace" }}>Ernestwell Business Solutions Ltd · Liverpool, UK · May–Aug 2025</div>
            <ul className="space-y-2 text-sm" style={{ color: colors.muted }}>
              <li>— Improved mobile load speed 30% and accessibility across 5 devices</li>
              <li>— Led UI/UX for a module evaluated by 10+ testers, a 25% task-completion gain</li>
              <li>— Shipped features inside a 6-person Agile team</li>
              <li>— Ramped up on Windsurf, Cursor, and Vercel within 2 weeks</li>
            </ul>
          </Reveal>
          <Reveal style={{ transitionDelay: '80ms' }}>
            <Eyebrow>Education</Eyebrow>
            <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>B.Tech, Computer Science &amp; Engineering</h3>
            <div className="text-sm mb-4" style={{ color: colors.faint, fontFamily: "'JetBrains Mono', monospace" }}>Lovely Professional University · Punjab, India · 2023–2027</div>
            <div className="text-sm mb-6" style={{ color: colors.muted }}>CGPA 8.08 / 10.0</div>
            <div className="text-xs space-y-1" style={{ color: colors.faint }}>
              <div>12th Grade — Govt. Model Sr. Sec. School, Faridabad — 76%</div>
              <div>10th Grade — Govt. Model Sr. Sec. School, Faridabad — 88%</div>
            </div>
          </Reveal>
        </div>

        <div className="max-w-5xl mx-auto mt-16 pt-12" style={{ borderTop: '1px solid ' + colors.border }}>
          <Reveal>
            <div className="flex items-center gap-2 mb-6" style={{ fontFamily: "'JetBrains Mono', monospace", color: colors.teal }}>
              <Award size={15} />
              <span className="text-xs uppercase tracking-wide">Certifications &amp; Training</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {CERTIFICATIONS.map((c) => (
                <div key={c.name} className="flex items-baseline justify-between gap-4 text-sm py-2" style={{ borderBottom: '1px solid ' + colors.border }}>
                  <span style={{ color: colors.text }}>{c.name}</span>
                  <span className="whitespace-nowrap text-xs" style={{ color: colors.faint, fontFamily: "'JetBrains Mono', monospace" }}>{c.issuer} · {c.date}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-xs" style={{ color: colors.faint, fontFamily: "'JetBrains Mono', monospace" }}>
              200+ DSA problems solved across LeetCode and GeeksforGeeks
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden px-6 md:px-12 py-24 md:py-32">
        <Glow color={colors.amber} size={500} style={{ bottom: -220, left: '50%', marginLeft: -250 }} />
        <div className="max-w-3xl mx-auto text-center relative">
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
            <h2 className="gradient-text text-4xl md:text-6xl mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
              Let's build something.
            </h2>
            <p className="mb-10 text-base md:text-lg" style={{ color: colors.muted }}>
              Open to roles and collaborations across ML engineering and full-stack development.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="mailto:virender.sonu.gupta@gmail.com" className="btn-primary inline-flex items-center gap-2 text-sm px-6 py-3 rounded-md" style={{ color: colors.bg, fontWeight: 600 }}>
                <Mail size={16} /> virender.sonu.gupta@gmail.com
              </a>
            </div>
            <div className="flex items-center justify-center gap-5 mt-8">
              <a href="https://github.com/Uriv7" style={{ color: colors.muted }}><Github size={20} /></a>
              <a href="https://linkedin.com/in/virender-gupta" style={{ color: colors.muted }}><Linkedin size={20} /></a>
              <a href="/resume.pdf" download className="inline-flex items-center gap-1 text-xs" style={{ color: colors.faint, fontFamily: "'JetBrains Mono', monospace" }}><Download size={14} /> Resume</a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="px-6 md:px-12 py-6 text-center text-xs" style={{ borderTop: '1px solid ' + colors.border, color: colors.faint, fontFamily: "'JetBrains Mono', monospace" }}>
        virender@uriv:~$ exit — Virender Gupta, {new Date().getFullYear()}
      </footer>

      <a
        href="#top"
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center rounded-full transition-all duration-300"
        style={{
          width: 44, height: 44, background: colors.surface, border: '1px solid ' + colors.border, color: colors.amber,
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          opacity: showBackToTop ? 1 : 0,
          transform: showBackToTop ? 'translateY(0)' : 'translateY(12px)',
          pointerEvents: showBackToTop ? 'auto' : 'none',
        }}
      >
        <ArrowUp size={18} />
      </a>
    </div>
  );
}
