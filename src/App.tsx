import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue
} from 'framer-motion';
import {
  Github,
  Linkedin,
  Server,
  Globe,
  Terminal,
  Atom,
  FileCode,
  Layers,
  Database,
  ArrowUpRight,
  Download,
  FileText,
  type LucideIcon
} from 'lucide-react';
import * as THREE from 'three';

// --- TYPES ---
interface Skill {
  name: string;
  icon: LucideIcon;
  color: string;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  desc: string;
  tags: string[];
}

interface Project {
  title: string;
  category: string;
  video: string;
  tech: string;
  link: string;
  type: 'web' | 'mobile';
}

// --- FONTS & GLOBAL STYLES ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Space+Grotesk:wght@300;500;700&display=swap');
    
    html { scroll-behavior: smooth; }
    body { font-family: 'Inter', sans-serif; background-color: #030303; }
    h1, h2, h3, h4, .font-display { font-family: 'Space Grotesk', sans-serif; }
    
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #000; }
    ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #06b6d4; }

    .noise-bg {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05;
      background: url('https://grainy-gradients.vercel.app/noise.svg');
    }
    
    .text-glow { text-shadow: 0 0 20px rgba(6,182,212,0.5); }
  `}</style>
);

// --- DATA ---
const skills: Skill[] = [
  { name: "React Native", icon: Atom, color: "#61DAFB" },
  { name: "TypeScript", icon: FileCode, color: "#3178C6" },
  { name: "Node.js", icon: Server, color: "#339933" },
  { name: "React", icon: Atom, color: "#61DAFB" },
  { name: "Next.js", icon: Globe, color: "#FFFFFF" },
  { name: "Redux", icon: Layers, color: "#764ABC" },
  { name: "MongoDB", icon: Database, color: "#47A248" },
  { name: "Python", icon: Terminal, color: "#FFD43B" },
];

const experience: Experience[] = [
  {
    company: "Rovia",
    role: "Contractor (Mobile)",
    period: "Sep 2025 - Present",
    desc: "Spearheading the React Native architecture. Bridging the gap between complex backend trading algorithms and smooth, 60fps mobile animations.",
    tags: ["React Native", "Prototyping", "API Integration"]
  },
  {
    company: "NeoITO",
    role: "SDE 1 (Front-End)",
    period: "Jan 2025 - Sep 2025",
    desc: "Developed and maintained front-end components for mobile apps using React Native (Expo) and TypeScript. Implemented responsive UI patterns, performance optimizations, and cross-platform compatibility while maintaining high code quality standards.",
    tags: ["Performance", "Expo", "TypeScript"]
  },
  {
    company: "Xorstack",
    role: "Full Stack Developer",
    period: "Dec 2022 - Jan 2025",
    desc: "Led a small team building end-to-end mobile apps (React Native) and backend services (Node.js, Strapi, MongoDB). Designed and launched Vyapy consumer & business apps and Bread Factory consumer app. Integrated FCM for notifications and implemented Redux state management.",
    tags: ["Full Stack", "Team Lead", "System Design"]
  }
];

// --- PROJECTS ---
const projects: Project[] = [
  {
    title: "JAGATJIT",
    category: "Interactive Web Experience",
    video: "/JAGATJIT.mp4",
    tech: "GSAP / React",
    link: "https://www.jagatjit.com/",
    type: 'web'
  },
  {
    title: "ROVIA",
    category: "FinTech Mobile App",
    video: "/rovia.mp4",
    tech: "Expo / React Native",
    link: "#",
    type: 'mobile'
  },
  {
    title: "VYAPY",
    category: "DINE IN",
    video: "/vyapy.mp4",
    tech: "React Native / Redux",
    link: "#",
    type: 'mobile'
  },
  {
    title: "BREAD FACTORY",
    category: "Consumer Commerce",
    video: "https://videos.pexels.com/video-files/4122588/4122588-hd_1280_720_30fps.mp4",
    tech: "React Native / Razorpay",
    link: "#",
    type: 'mobile'
  }
];

// --- 3D BACKGROUND ---
function StarField() {
  const ref = useRef<THREE.Points>(null!);

  const sphere = useMemo(() => {
    const count = 5000;
    const radius = 1.5;
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.cbrt(Math.random()) * radius;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      points[i * 3] = x;
      points[i * 3 + 1] = y;
      points[i * 3 + 2] = z;
    }
    return points;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#fff" size={0.002} sizeAttenuation={true} depthWrite={false} opacity={0.5} />
      </Points>
    </group>
  );
}

// --- COMPONENTS ---

const Header = () => (
  <nav className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-6 py-6 md:px-12 backdrop-blur-sm bg-black/20 border-b border-white/5">
    <a href="#" className="font-display font-bold text-xl tracking-tighter text-white hover:text-cyan-400 transition-colors">VD.</a>

    <div className="hidden md:flex gap-8 font-mono text-xs tracking-widest text-slate-400">
      <a href="#" className="hover:text-white transition-colors">HOME</a>
      <a href="#experience" className="hover:text-white transition-colors">EXPERIENCE</a>
      <a href="#projects" className="hover:text-white transition-colors">WORK</a>
      <a href="#contact" className="hover:text-white transition-colors">CONTACT</a>
    </div>

    <div className="hidden md:flex gap-3">
      <a
        href="./DommetiVasanth_ReactNative_3Y.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 border border-white/20 px-4 py-2 rounded-full text-xs font-mono text-white hover:bg-white hover:text-black transition-all"
      >
        <FileText size={14} /> VIEW RESUME
      </a>

      <a
        href="./DommetiVasanth_ReactNative_3Y.pdf"
        download
        className="flex items-center justify-center border border-white/20 w-9 h-9 rounded-full text-white hover:bg-white hover:text-black transition-all"
        title="Download Resume"
      >
        <Download size={14} />
      </a>
    </div>
  </nav>
);

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-[100]" />;
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    let { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative h-[400px] w-full rounded-2xl bg-[#050505] border border-white/10 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 flex justify-center items-center bg-black">
        <video
          src={project.video}
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full transition-opacity duration-700 opacity-50 group-hover:opacity-90 grayscale group-hover:grayscale-0 
             ${project.type === 'mobile' ? 'object-contain' : 'object-cover'}
           `}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-8 z-10 flex flex-col justify-end h-full pointer-events-none">
        <div className="flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div>
            <p className="text-cyan-400 font-mono text-xs mb-2 tracking-widest uppercase">{project.category}</p>
            <h3 className="text-3xl font-display font-bold text-white mb-2">{project.title}</h3>
            <p className="text-slate-400 font-mono text-sm">{project.tech}</p>
          </div>

          {project.title === "JAGATJIT" && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:bg-cyan-500 hover:text-black cursor-pointer pointer-events-auto"
            >
              <ArrowUpRight size={24} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const SkillMarquee = () => {
  return (
    <div className="w-full overflow-hidden py-10 bg-black/50 border-y border-white/5 backdrop-blur-sm">
      <div className="flex w-[400%]">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ x: "-100%" }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="flex flex-1 items-center justify-between gap-10 md:gap-20 px-8 md:px-16 min-w-max"
          >
            {skills.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-4 shrink-0 group">
                <div
                  className="p-3 rounded-full bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors"
                  style={{ color: skill.color, borderColor: `${skill.color}20` }}
                >
                  <skill.icon size={24} />
                </div>
                <span
                  className="font-display font-medium text-lg uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors whitespace-nowrap leading-none pt-1"
                >
                  {skill.name}
                </span>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
  return (
    <>
      <GlobalStyles />
      <div className="noise-bg" />
      <ProgressBar />

      <Header />

      <div className="bg-[#030303] min-h-screen text-white relative selection:bg-cyan-500 selection:text-black">

        {/* BACKGROUND 3D */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 1] }}>
            <StarField />
          </Canvas>
        </div>

        {/* --- HERO SECTION --- */}
        <section className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 pt-20">
          <div className="container max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="border-l border-white/20 pl-6 md:pl-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="font-mono text-xs md:text-sm text-cyan-500 tracking-[0.2em]">SYSTEM ONLINE</span>
              </div>

              <h1 className="font-display text-5xl md:text-8xl font-bold leading-tight mb-8">
                VASANTH <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 via-white to-slate-500">DOMMETI</span>
              </h1>

              <p className="max-w-xl text-slate-400 text-lg md:text-xl leading-relaxed mb-10">
                Full-Stack Architect & Mobile Specialist. Crafting digital experiences where <span className="text-white">logic meets aesthetics</span>.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="group relative px-8 py-3 bg-white text-black font-mono font-bold text-sm hover:bg-cyan-400 transition-colors">
                  START_PROJECT
                  <div className="absolute inset-0 border border-white translate-x-1 translate-y-1 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
                </a>

                {/* View CV Button */}
                <a
                  href="./DommetiVasanth_ReactNative_3Y.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border border-white/20 text-white font-mono text-sm hover:bg-white/5 transition-colors flex items-center gap-2"
                >
                  <FileText size={16} /> VIEW CV
                </a>

                {/* Download CV Button */}
                <a
                  href="./DommetiVasanth_ReactNative_3Y.pdf"
                  download
                  className="px-8 py-3 border border-white/20 text-white font-mono text-sm hover:bg-white/5 transition-colors flex items-center gap-2"
                >
                  <Download size={16} /> DOWNLOAD
                </a>

                <a href="https://github.com/vasanthdommeti" target="_blank" rel="noreferrer" className="px-8 py-3 border border-white/20 text-white font-mono text-sm hover:bg-white/5 transition-colors flex items-center gap-2">
                  <Github size={16} /> GITHUB
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 right-10 md:right-20 hidden md:block"
          >
            <p className="font-mono text-xs text-slate-600 vertical-rl tracking-widest">SCROLL TO EXPLORE</p>
          </motion.div>
        </section>

        {/* --- MARQUEE SKILLS --- */}
        <section className="relative z-10 py-0">
          <SkillMarquee />
        </section>

        {/* --- EXPERIENCE --- */}
        <section id="experience" className="relative z-10 py-32 px-6">
          <div className="container max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-4 mb-20">
              <h2 className="font-display text-4xl md:text-6xl font-bold order-2 md:order-1">Experience</h2>
              <div className="hidden md:block h-px bg-white/20 flex-1 mb-4 order-2"></div>
              <span className="font-mono text-slate-500 text-sm md:mb-4 order-1 md:order-3">01 // CAREER_LOG</span>
            </div>

            <div className="space-y-20">
              {experience.map((job, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 group"
                >
                  <div className="md:col-span-3">
                    <span className="font-mono text-cyan-500 text-sm border border-cyan-500/30 px-3 py-1 rounded-full">{job.period}</span>
                  </div>
                  <div className="md:col-span-9 border-l border-white/10 pl-8 md:pl-12 relative">
                    <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-slate-800 rounded-full border border-slate-600 group-hover:bg-cyan-400 group-hover:border-cyan-400 transition-colors shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
                    <h3 className="text-3xl font-display font-bold mb-2 group-hover:text-cyan-400 transition-colors">{job.company}</h3>
                    <p className="text-white/60 font-mono text-sm mb-6">{job.role}</p>
                    <p className="text-slate-400 text-lg leading-relaxed mb-6 max-w-2xl">{job.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map(tag => (
                        <span key={tag} className="text-xs font-bold text-slate-500 uppercase tracking-wider">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- PROJECTS --- */}
        <section id="projects" className="relative z-10 py-32 px-6 bg-white/[0.02]">
          <div className="container max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-4 mb-20">
              <span className="font-mono text-slate-500 text-sm md:mb-4 order-1">02 // WORKS</span>
              <div className="hidden md:block h-px bg-white/20 flex-1 mb-4 order-2"></div>
              <h2 className="font-display text-4xl md:text-6xl font-bold order-2 md:order-3 md:text-right">Selected Works</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, i) => (
                <div key={i} className={i % 2 === 1 ? "md:translate-y-24" : ""}>
                  <ProjectCard project={project} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CONTACT --- */}
        <footer id="contact" className="relative z-10 py-32 px-6 border-t border-white/10">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 text-glow">Let's Talk.</h2>
            <p className="text-slate-400 text-xl mb-12 max-w-xl mx-auto">
              Currently available for full-time opportunities.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-6 mb-20">
              <a href="mailto:vasanthdommeti9999@gmail.com" className="bg-white text-black px-10 py-4 font-bold font-mono hover:bg-cyan-400 transition-colors">
                vasanthdommeti9999@gmail.com
              </a>
              <a href="tel:+916300500097" className="border border-white/20 text-white px-10 py-4 font-bold font-mono hover:bg-white/10 transition-colors">
                +91 63005 00097
              </a>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center text-xs font-mono text-slate-600 uppercase tracking-widest gap-8">
              <span>Bengaluru, IN</span>
              <div className="flex gap-8">
                <a href="https://linkedin.com/in/vasanth-dommeti" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-[#0077b5] transition-colors duration-300">
                  <Linkedin size={24} strokeWidth={1.5} />
                </a>
                <a href="https://github.com/vasanthdommeti" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors duration-300">
                  <Github size={24} strokeWidth={1.5} />
                </a>
              </div>
              <span>© 2025</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}