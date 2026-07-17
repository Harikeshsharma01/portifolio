import { useState, useEffect, useRef } from 'react';
import {
  Moon, Sun, Menu, X, Github, Linkedin, Mail, Phone,
  ExternalLink, Code2, Database, Layout, Server, Smartphone, Globe,
  ChevronUp, Download, ArrowRight, Send
} from 'lucide-react';

// ─── Typing Effect Hook ─────────────────────────────────────────────────────
function useTypingEffect(words: string[], speed = 100, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx(c => c + 1);
        }
      } else {
        setDisplayed(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx(i => (i + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx(c => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

// ─── Intersection Observer Hook ─────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Data ────────────────────────────────────────────────────────────────────
const NAV_LINKS = ['Home', 'About', 'Skills', 'Projects', 'Services', 'Contact'];

const SKILLS = [
  { name: 'HTML / CSS', level: 90, icon: <Layout size={20} /> },
  { name: 'JavaScript', level: 80, icon: <Code2 size={20} /> },
  { name: 'React', level: 75, icon: <Code2 size={20} /> },
  { name: 'Python', level: 70, icon: <Server size={20} /> },
  { name: 'SQL / Databases', level: 65, icon: <Database size={20} /> },
  { name: 'Node.js', level: 60, icon: <Server size={20} /> },
  { name: 'Responsive Design', level: 85, icon: <Smartphone size={20} /> },
  { name: 'REST APIs', level: 72, icon: <Globe size={20} /> },
];

const PROJECTS = [
  {
    title: 'StudyNotion - EdTech Platform',
    description:
      'A full-stack MERN-based e-learning platform where instructors can create courses, students can enroll, securely purchase courses using Razorpay, and learn through an intuitive dashboard.',
    image: '/images/studynotion.png',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Razorpay'],
  },
  {
    title: 'Course Manager',
    description:
      'A MERN stack application for managing courses with complete CRUD operations, image uploads using Cloudinary, and a responsive dashboard for administrators.',
    image: '/images/coursemanager.png',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary'],
  },
  {
    title: 'Portfolio Website',
    description:
      'A modern, fully responsive personal portfolio showcasing projects, technical skills, achievements, certifications, and contact information with smooth animations.',
    image: '/images/portfolio.png',
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Blog Application',
    description:
      'A full-stack blog platform with user authentication, CRUD functionality, rich text editing, and category-based post management. Users can create, edit, delete, and browse blog posts through a responsive interface.',
    image: '/images/blog-app.png',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
  },
  {
    title: 'Restaurant Menu Management System',
    description:
      'A web-based restaurant menu management system that allows administrators to add, update, delete, and organize menu items with categories, pricing, and image management through an easy-to-use dashboard.',
    image: '/images/restaurant-menu.png',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'CRUD'],
  },
  {
    title: 'Mental Wellness Prediction System',
    description:
      'A machine learning project that predicts student mental wellness risk using survey data and visual analytics to enable proactive support.',
    image: '/images/mindflow.png',
    tags: ['Python', 'Machine Learning', 'Pandas', 'Scikit-learn'],
  },
];

const SERVICES = [
  {
    icon: <Layout size={32} />,
    title: 'Frontend Development',
    desc: 'Crafting pixel-perfect, responsive interfaces with modern frameworks like React and clean Tailwind CSS.',
  },
  {
    icon: <Server size={32} />,
    title: 'Backend Development',
    desc: 'Building scalable server-side solutions with Node.js, REST APIs, and reliable database design.',
  },
  {
    icon: <Globe size={32} />,
    title: 'Full Stack Solutions',
    desc: 'End-to-end web application development — from database schema to polished user experience.',
  },
];

// ─── Components ──────────────────────────────────────────────────────────────
function SkillBar({ name, level, icon, dark }: { name: string; level: number; icon: React.ReactNode; dark: boolean }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={dark ? 'text-teal-400' : 'text-teal-600'}>{icon}</span>
          <span className={`text-sm font-medium ${dark ? 'text-gray-200' : 'text-gray-700'}`}>{name}</span>
        </div>
        <span className={`text-sm font-semibold ${dark ? 'text-teal-400' : 'text-teal-600'}`}>{level}%</span>
      </div>
      <div className={`h-2 rounded-full ${dark ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div
          className="h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-1000 ease-out"
          style={{ width: inView ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
}

function SectionHeading({ title, highlight, dark }: { title: string; highlight: string; dark: boolean }) {
  return (
    <div className="text-center mb-14">
      <h2 className={`text-4xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>
        {title} <span className="text-teal-500">{highlight}</span>
      </h2>
      <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-teal-500 to-cyan-400" />
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [showTop, setShowTop] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  const typed = useTypingEffect(['Full Stack Developer', 'React Developer', 'Problem Solver', 'B.Sc. CS Student']);

  const sectionRefs: Record<string, React.RefObject<HTMLElement>> = {
    Home: useRef<HTMLElement>(null),
    About: useRef<HTMLElement>(null),
    Skills: useRef<HTMLElement>(null),
    Projects: useRef<HTMLElement>(null),
    Services: useRef<HTMLElement>(null),
    Contact: useRef<HTMLElement>(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
      for (const id of [...NAV_LINKS].reverse()) {
        const el = sectionRefs[id].current;
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs[id].current?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('success');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setFormStatus('idle'), 4000);
  };

  const bg = dark ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900';
  const card = dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';
  const navBg = dark ? 'bg-gray-950/95 border-gray-800' : 'bg-white/95 border-gray-200';
  const input = dark
    ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-teal-500'
    : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-teal-500';

  return (
    <div className={`${bg} min-h-screen transition-colors duration-300`}>

      {/* ── Navbar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md ${navBg} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <span className={`text-xl font-bold tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
            portfo<span className="text-teal-400">lio</span>
          </span>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeSection === link
                    ? 'text-teal-400 bg-teal-400/10'
                    : dark ? 'text-gray-300 hover:text-teal-400 hover:bg-teal-400/5' : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
                }`}
              >
                {link}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDark(d => !d)}
              className={`p-2 rounded-lg transition-colors ${dark ? 'text-gray-300 hover:text-teal-400 hover:bg-gray-800' : 'text-gray-600 hover:text-teal-600 hover:bg-gray-100'}`}
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMenuOpen(o => !o)}
              className={`md:hidden p-2 rounded-lg ${dark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className={`md:hidden border-t ${dark ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-white'} px-4 py-3 flex flex-col gap-1`}>
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link
                    ? 'text-teal-400 bg-teal-400/10'
                    : dark ? 'text-gray-300 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'
                }`}
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section ref={sectionRefs.Home as React.RefObject<HTMLDivElement>} className="min-h-screen flex items-center pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className={`text-teal-400 font-medium tracking-widest text-sm uppercase`}>Hello, it's me</p>
            <h1 className={`text-5xl sm:text-6xl font-extrabold leading-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
              Harikesh<br />Sharma
            </h1>
            <h2 className={`text-xl font-medium ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
              And I am a{' '}
              <span className="text-teal-400">
                {typed}
                <span className="animate-pulse">|</span>
              </span>
            </h2>
            <p className={`leading-relaxed max-w-lg ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              B.Sc. Computer Science student at Thakur College of Science and Commerce & IIT Madras.
              Passionate about building impactful web experiences — adaptable as water, driven by purpose.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="/resume.docx"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-teal-500/25 hover:shadow-teal-400/30 hover:-translate-y-0.5"
              >
                <Download size={18} /> Download CV
              </a>
              <button
                onClick={() => scrollTo('Contact')}
                className={`inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${
                  dark ? 'border-gray-700 text-gray-300 hover:border-teal-500 hover:text-teal-400' : 'border-gray-300 text-gray-700 hover:border-teal-500 hover:text-teal-600'
                }`}
              >
                Contact Me <ArrowRight size={18} />
              </button>
            </div>
            <div className="flex items-center gap-4 pt-2">
              {[
                { href: 'https://github.com/Harikeshsharma01', icon: <Github size={20} /> },
                { href: 'https://www.linkedin.com/in/harikesh-sharma-aaba0025a/', icon: <Linkedin size={20} /> },
                { href: 'mailto:harikesh8530@email.com', icon: <Mail size={20} /> },
              ].map(({ href, icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-500 hover:text-teal-400 ${
                    dark ? 'border-gray-700 text-gray-400' : 'border-gray-300 text-gray-500'
                  }`}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-400 blur-3xl opacity-20 scale-110" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden ring-4 ring-teal-500/30 ring-offset-4 ring-offset-transparent">
                <img src="/images/p.png" alt="Harikesh Sharma" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section ref={sectionRefs.About as React.RefObject<HTMLDivElement>} className={`py-24 ${dark ? 'bg-gray-900/50' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading title="About" highlight="Me" dark={dark} />
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div className="flex justify-center">
              <div className="relative w-72 h-72 rounded-2xl overflow-hidden shadow-2xl">
                <img src="/images/p.png" alt="About Harikesh" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent" />
              </div>
            </div>
            <div className="space-y-5">
              <h3 className={`text-3xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>
                Frontend & <span className="text-teal-400">Full Stack</span> Developer
              </h3>
              <p className={`leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                I'm a passionate Computer Science student pursuing B.Sc. at Thakur College of Science and Commerce, Mumbai,
                and simultaneously enrolled at IIT Madras. I believe in the philosophy of being adaptable like water —
                flowing toward big dreams through consistent, purposeful work.
              </p>
              <p className={`leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                My goal is to join a reputed IT organization where I can apply my skills, grow professionally,
                and contribute meaningfully to impactful projects.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { label: 'Name', value: 'Harikesh Sharma' },
                  { label: 'Education', value: 'M.Sc. CS, Final Year' },
                  { label: 'Institute', value: 'Thakur College + IITM' },
                  { label: 'Role', value: 'Full Stack Developer' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-teal-400 text-xs font-semibold uppercase tracking-wider">{label}</p>
                    <p className={`text-sm font-medium mt-0.5 ${dark ? 'text-gray-200' : 'text-gray-700'}`}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section ref={sectionRefs.Skills as React.RefObject<HTMLDivElement>} className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading title="My" highlight="Skills" dark={dark} />
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
            {SKILLS.map(skill => (
              <SkillBar key={skill.name} {...skill} dark={dark} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section ref={sectionRefs.Projects as React.RefObject<HTMLDivElement>} className={`py-24 ${dark ? 'bg-gray-900/50' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading title="My" highlight="Projects" dark={dark} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map(proj => (
              <div
                key={proj.title}
                className={`rounded-2xl border overflow-hidden group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${card} ${dark ? 'hover:shadow-teal-900/30' : 'hover:shadow-teal-200/60'}`}
              >
                <div className="overflow-hidden h-48">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{proj.title}</h3>
                    <ExternalLink size={16} className={`${dark ? 'text-gray-500 group-hover:text-teal-400' : 'text-gray-400 group-hover:text-teal-500'} transition-colors`} />
                  </div>
                  <p className={`text-sm leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{proj.description}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {proj.tags.map(tag => (
                      <span
                        key={tag}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${dark ? 'bg-teal-900/40 text-teal-300' : 'bg-teal-50 text-teal-700'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section ref={sectionRefs.Services as React.RefObject<HTMLDivElement>} className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading title="My" highlight="Services" dark={dark} />
          <div className="grid sm:grid-cols-3 gap-8">
            {SERVICES.map(svc => (
              <div
                key={svc.title}
                className={`rounded-2xl border p-8 text-center group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-teal-500/50 ${card} ${dark ? 'hover:shadow-teal-900/30' : 'hover:shadow-teal-200/60'}`}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-5 transition-colors ${dark ? 'bg-teal-900/40 text-teal-400 group-hover:bg-teal-500 group-hover:text-white' : 'bg-teal-50 text-teal-600 group-hover:bg-teal-500 group-hover:text-white'}`}>
                  {svc.icon}
                </div>
                <h3 className={`text-lg font-bold mb-3 ${dark ? 'text-white' : 'text-gray-900'}`}>{svc.title}</h3>
                <p className={`text-sm leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section ref={sectionRefs.Contact as React.RefObject<HTMLDivElement>} className={`py-24 ${dark ? 'bg-gray-900/50' : 'bg-white'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeading title="Contact" highlight="Me" dark={dark} />
          <div className={`rounded-2xl border p-8 sm:p-10 ${card}`}>
            {formStatus === 'success' ? (
              <div className="text-center py-10 space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-500/20 text-teal-400 text-3xl mb-2">
                  ✓
                </div>
                <h3 className={`text-xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Message Sent!</h3>
                <p className={dark ? 'text-gray-400' : 'text-gray-600'}>Thanks for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                      placeholder="Harikesh Sharma"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${input}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${input}`}
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
                  <div className="relative">
                    <Phone size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors ${input}`}
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tell me about your project..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors resize-none ${input}`}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-teal-500/25 hover:shadow-teal-400/30 hover:-translate-y-0.5"
                >
                  <Send size={18} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={`border-t py-8 text-center ${dark ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-500'}`}>
        <p className="text-sm">© 2024 Harikesh Sharma. All rights reserved.</p>
      </footer>

      {/* ── Back to Top ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-white shadow-lg shadow-teal-500/30 transition-all duration-300 hover:-translate-y-0.5 ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="Back to top"
      >
        <ChevronUp size={20} />
      </button>
    </div>
  );
}
