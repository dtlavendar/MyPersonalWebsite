import React from 'react';
import { motion } from 'framer-motion';
import BackgroundNotes from './components/BackgroundNotes';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-100 mb-4">
      {children}
    </h2>
  );
}

// Icon URLs (Devicon). Use local icon for all AWS* skills
const getIconUrl = (skill: string): string | undefined => {
  const base = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
  if (skill.toUpperCase().startsWith('AWS')) return '/icons/aws.svg';
  const map: Record<string, string> = {
    Pandas: `https://cdn.simpleicons.org/pandas/ffffff`,
    Vite: `${base}/vitejs/vitejs-original.svg`,
    Tailwind: `${base}/tailwindcss/tailwindcss-original.svg`,
    CSS: `${base}/css3/css3-original.svg`,
    Typescript: `${base}/typescript/typescript-original.svg`,
    HTML: `${base}/html5/html5-original.svg`,
    JavaScript: `${base}/javascript/javascript-original.svg`,
    'C++': `${base}/cplusplus/cplusplus-original.svg`,
    C: `${base}/c/c-original.svg`,
    Java: `${base}/java/java-original.svg`,
    OpenCV: `${base}/opencv/opencv-original.svg`,
    Flask: `${base}/flask/flask-original.svg`,
    TensorFlow: `${base}/tensorflow/tensorflow-original.svg`,
    SQL: `${base}/mysql/mysql-original.svg`,
    Kotlin: `${base}/kotlin/kotlin-original.svg`,
    Python: `${base}/python/python-original.svg`,
  };
  return map[skill];
};

const skills = [
  'Pandas', 'Vite', 'Tailwind', 'CSS', 'Typescript', 'HTML', 'JavaScript', 'C++', 'C', 'Java', 'OpenCV', 'Flask', 'TensorFlow', 'SQL',
  'AWS Lambda', 'AWS DynamoDB', 'AWS S3', 'AWS API Gateway', 'AWS Strands', 'Kotlin', 'Python',
];

function AnimatedHeading({ text, onSecret }: { text: string; onSecret?: () => void }) {
  const words = text.split(' ');
  const [isDwightHover, setIsDwightHover] = React.useState(false);
  const hoverTimeoutRef = React.useRef<number | null>(null);

  // Obscured secret URL (Base64), with fun scientist names
  const curie = 'aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj0yb0RScGNfSm1VYw==';
  const turingDecode = (payload: string): string => {
    try {
      // atob exists in browsers; fallback returns original if unavailable
      return typeof window !== 'undefined' && 'atob' in window ? window.atob(payload) : payload;
    } catch {
      return payload;
    }
  };
  const secretUrl = turingDecode(curie);

  const isDwightToken = (token: string) => token.replace(/[^A-Za-z0-9_]/g, '') === 'Dwight';

  const handleDwightEnter = () => {
    setIsDwightHover(true);
    if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = window.setTimeout(() => {
      window.open(secretUrl, '_blank', 'noopener');
      if (onSecret) onSecret();
    }, 1250);
  };

  const handleDwightLeave = () => {
    setIsDwightHover(false);
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  return (
    <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.5] sm:leading-[1.45] pb-[0.6em] pt-[0.1em] overflow-visible whitespace-nowrap">
      {words.map((w, i) => {
        const isDwight = isDwightToken(w);
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 + Math.min(i * 0.03, 0.12) }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: 'easeOut' }}
            className={`inline-block mr-2 bg-gradient-to-r from-white via-neutral-300 to-white bg-[length:200%_100%] bg-clip-text text-transparent tracking-tight ${isDwight ? 'relative cursor-pointer' : ''}`}
            style={{ letterSpacing: i === 2 ? '0.02em' : i === 1 ? '0.01em' : '0em' }}
            onMouseEnter={isDwight ? handleDwightEnter : undefined}
            onMouseLeave={isDwight ? handleDwightLeave : undefined}
          >
            {w}
            {i < words.length - 1 ? '\u00A0' : ''}
            {isDwight && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: isDwightHover ? '100%' : 0, opacity: isDwightHover ? 1 : 0 }}
                transition={isDwightHover ? { duration: 1.25, ease: 'linear' } : { duration: 0.2, ease: 'easeOut' }}
                className="absolute bottom-0 left-0 h-0.5 bg-neutral-400"
              />
            )}
          </motion.span>
        );
      })}
    </h1>
  );
}

function Home({ onSecret }: { onSecret?: () => void }) {
  // Stabilize external icon loading
  const iconUrls = React.useMemo(() => {
    const urls = skills
      .map((s) => getIconUrl(s))
      .filter((u): u is string => Boolean(u) && u !== undefined && !u.startsWith('/'));
    return Array.from(new Set(urls));
  }, []);

  React.useEffect(() => {
    iconUrls.forEach((src) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
    });
  }, [iconUrls]);

  // Portrait sustained-hover to open LinkedIn
  const linkedInUrl = 'https://www.linkedin.com/in/dwight-thompson';
  const [isPortraitHover, setIsPortraitHover] = React.useState(false);
  const hoverTimeoutRef = React.useRef<number | null>(null);

  const handlePortraitEnter = () => {
    setIsPortraitHover(true);
    if (hoverTimeoutRef.current) window.clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = window.setTimeout(() => {
      window.open(linkedInUrl, '_blank', 'noopener');
    }, 1200);
  };

  const handlePortraitLeave = () => {
    setIsPortraitHover(false);
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  return (
    <div>
      {/* Portrait + Intro */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 pt-12 pb-10">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          {/* Left: Portrait */}
          <div className="flex justify-center md:justify-start">
            <div className="relative" onMouseEnter={handlePortraitEnter} onMouseLeave={handlePortraitLeave}>
              <motion.div
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-600/20 via-blue-600/20 to-purple-600/20 blur"
                animate={{ opacity: isPortraitHover ? 1 : 0.8, scale: isPortraitHover ? 1.05 : 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              />
              <motion.img
                src="/Dwight.jpeg"
                alt="Portrait of Dwight Thompson"
                className="relative rounded-full border border-neutral-800 w-64 h-64 md:w-80 md:h-80 object-cover shadow-2xl cursor-pointer"
                animate={{ scale: isPortraitHover ? 1.04 : 1, filter: isPortraitHover ? 'brightness(1.05) saturate(1.08)' : 'brightness(1) saturate(1)' }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                decoding="async"
                loading="eager"
                draggable={false}
              />
            </div>
          </div>

          {/* Right: Heading + Intro */}
          <div className="space-y-4 md:pl-2">
            <AnimatedHeading text={"Hey, I'm Dwight."} onSecret={onSecret} />
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ y: -2, scale: 1.01 }}
              className="text-neutral-300 leading-relaxed text-lg md:text-xl"
            >
              I’m a rising sophomore at Stanford passionate about CS Theory, music production, and full-stack software engineering.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              whileHover={{ y: -2, scale: 1.01 }}
              className="text-neutral-300 leading-relaxed text-lg md:text-xl"
            >
              Feel free to check out my music here: <a href="https://open.spotify.com/track/1GlR2Y7PTzIOi6fkxtoIm0?si=d525a799c8414a09" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Spotify</a>.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              whileHover={{ y: -2, scale: 1.01 }}
              className="text-neutral-300 leading-relaxed text-lg md:text-xl"
            >
              In my free time, I like to play music, read manga, and play basketball. I also like making puzzles: <a href="https://docs.google.com/document/d/11R2INdgvdcnzlnp38QS-67Po1-3LOmFYRrjydljfbNs/edit?usp=sharing" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">like this one</a>.
            </motion.p>

            {/* Email */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.5 }}
              className="text-neutral-300 text-lg md:text-xl"
            >
              Email: <a href="mailto:dthomp95@stanford.edu" className="hover:underline">dthomp95@stanford.edu</a>
            </motion.p>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="flex items-center gap-3 pt-1"
            >
              <a
                href="https://github.com/dtlavendar"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-900/80 text-neutral-200 text-sm transition-colors"
              >
                <img src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-900/80 text-neutral-200 text-sm transition-colors"
              >
                <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-4 h-4" onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/icons/linkedin.svg'}} />
                <span>LinkedIn</span>
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-900/80 text-neutral-200 text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Resume</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="relative z-10 mx-auto max-w-5xl px-4 py-6">
        <SectionTitle>Skills & Interests</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, idx) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.03, 0.3) }}
              className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 flex items-center gap-3 hover:bg-neutral-900/80 transition-colors"
            >
              {getIconUrl(s) ? (
                <img
                  src={getIconUrl(s)!}
                  alt={`${s} logo`}
                  className="w-9 h-9 object-contain"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/icons/tool.svg';
                  }}
                />
              ) : (
                <div className="w-9 h-9 rounded-md bg-neutral-800 border border-neutral-700" />
              )}
              <div className="text-base font-medium text-neutral-200">{s}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [secretFound, setSecretFound] = React.useState(false);
  return (
    <div className="min-h-screen relative">
      <BackgroundNotes />

      {/* Header */}
      <header className="relative z-20 sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 bg-neutral-950/90 border-b border-neutral-900">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-semibold tracking-tight hover:text-white transition-colors"
          >
            Dwight Thompson
          </button>
          <nav className="text-sm text-neutral-300 space-x-4">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Resume
            </a>
          </nav>
        </div>
      </header>

      <Home onSecret={() => setSecretFound(true)} />

      <footer className="relative z-10 mx-auto max-w-5xl px-4 py-10 text-xs text-neutral-500">
        {secretFound ? 'Yeah, that was it!' : 'One more secret on this page...'}
      </footer>
    </div>
  );
}
