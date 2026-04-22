import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import brainCodeImg from '@/assets/code.jpg';
import foodImg from '@/assets/food.jpg';
import graphImg from '@/assets/graph.png';
import pinchyImg from '@/assets/pinchy.jpeg';
import { useSiteLayout } from '../context/SiteLayoutContext';

const THRESH = 100;
const COOLDOWN_MS = 400;

type ViewPhase = 'intro' | 'slides' | 'end';

type Project = {
  title: string;
  description: string;
  longDescription: string;
  image: string | null;
  tags: string[];
  github: string;
  demo: string;
  color: string;
  /** Overrides the "Live Demo" button label (e.g. "npm package"). */
  demoLabel?: string;
  /** Extra CTAs (e.g. a second repository). */
  extraLinks?: ReadonlyArray<{ label: string; href: string }>;
};

const projects: Project[] = [
  {
    title: 'Pinchy Ecosystem',
    description:
      'A two-part Pinchy stack: a local-first, fully autonomous coding-agent workspace and a native iOS app for performance insight—published on npm and GitHub.',
    longDescription:
      "pinchy-dev is a local-first autonomous coding agent workspace built on the Pi coding agent framework, shipped as the installable pinchy CLI (also on npm). It runs on your machine with local models, a dashboard, API, worker, and daemon, plus deep tooling: Playwright-based browser debugging, desktop and simulator automation, routines, and validation-aware iteration. Pinchy's Cabin is a Swift iOS companion app for tracking OpenClaw internal performance over Tailscale, rounding out the ecosystem on Apple platforms.",
    image: pinchyImg,
    tags: ['TypeScript', 'Swift', 'iOS', 'Pi agent', 'Local-first', 'npm'],
    github: 'https://github.com/thelobsterpinchy/pinchy-dev',
    demo: 'https://www.npmjs.com/package/pinchy-dev?activeTab=readme',
    demoLabel: 'npm package',
    extraLinks: [{ label: "Pinchy's Cabin (iOS)", href: 'https://github.com/thelobsterpinchy/pinchys-cabin' }],
    color: 'from-fuchsia-600 to-amber-500',
  },
  {
    title: 'Codex ChatGPT JetBrains Plugin',
    description:
      "An intelligent IDE plugin that integrates OpenAI's Codex and ChatGPT capabilities directly into JetBrains IDEs for enhanced code assistance.",
    longDescription:
      "A powerful JetBrains IDE plugin that brings AI-powered code generation and assistance directly to your development environment. Leverages OpenAI's Codex and ChatGPT models to provide intelligent code suggestions, explanations, and debugging help right where you need it.",
    image: brainCodeImg,
    tags: ['Java', 'JetBrains', 'OpenAI', 'AI/ML', 'Plugin Development'],
    github: 'https://github.com/bliu8923/codex-chatgpt-jetbrains-plugin',
    demo: '#',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    title: 'Data Science Capstone Project',
    description:
      'An advanced data science project applying machine learning techniques to solve real-world problems with comprehensive analysis and modeling.',
    longDescription:
      'A comprehensive data science capstone project (DSC180B) that demonstrates end-to-end machine learning workflows. Includes exploratory data analysis, feature engineering, model development, evaluation, and deployment considerations. Built with industry-standard tools and best practices.',
    image: graphImg,
    tags: ['Python', 'Machine Learning', 'Data Science', 'Jupyter', 'Pandas'],
    github: 'https://github.com/bliu8923/dsc180b-project',
    demo: 'https://brliu.com/dsc180b-project/',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    title: 'UniRemote',
    description:
      'A universal remote control application that unifies control of multiple devices into a single, intuitive interface.',
    longDescription:
      'An innovative universal remote solution that simplifies home entertainment control. UniRemote provides a unified interface to control various devices, eliminating the need for multiple remotes and creating a seamless user experience for managing your entertainment system.',
    image: null,
    tags: ['Android', 'IoT', 'Mobile Development', 'Java', 'UI/UX'],
    github: 'https://github.com/bliu8923/UniRemote',
    demo: '#',
    color: 'from-green-500 to-teal-600',
  },
  {
    title: 'Social Media Sentiment Analysis',
    description:
      'A machine learning application that analyzes social media posts to determine sentiment and extract insights from user-generated content.',
    longDescription:
      'An advanced sentiment analysis tool that processes social media data to understand public opinion and emotional tone. Uses natural language processing and machine learning algorithms to classify sentiments, identify trends, and provide actionable insights from large volumes of social media content.',
    image: null,
    tags: ['Python', 'NLP', 'Machine Learning', 'Sentiment Analysis', 'Data Visualization'],
    github: 'https://github.com/bliu8923/SocialMediaSentiment',
    demo: '#',
    color: 'from-orange-500 to-red-600',
  },
  {
    title: 'Portfolio Website',
    description:
      'A modern, responsive personal portfolio built with React and Tailwind CSS. Features smooth animations and an interactive resume viewer.',
    longDescription:
      'This sleek, modern portfolio showcases professional work with an emphasis on user experience. Built with cutting-edge web technologies, it features smooth page transitions, an interactive PDF resume viewer with zoom controls, and a fully responsive design that works seamlessly across all devices.',
    image: foodImg,
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Vite'],
    github: 'https://github.com/bliu8923/bliu8923.github.io',
    demo: '#',
    color: 'from-pink-500 to-rose-600',
  },
];

const lastProject = projects[projects.length - 1] as Project;
const lastProjectIndex = projects.length - 1;

function wheelShouldBubbleToPage(target: EventTarget | null, deltaY: number): boolean {
  let el = target instanceof Node ? (target as HTMLElement) : null;
  while (el && el !== document.body) {
    const style = getComputedStyle(el);
    const oy = style.overflowY;
    const canY =
      (oy === 'auto' || oy === 'scroll' || oy === 'overlay') && el.scrollHeight > el.clientHeight + 1;
    if (canY) {
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      if (deltaY < 0 && !atTop) return true;
      if (deltaY > 0 && !atBottom) return true;
    }
    el = el.parentElement;
  }
  return false;
}

function ProjectPanel({
  project,
  currentIndex,
  total,
  layout = 'default',
}: {
  project: Project;
  currentIndex: number;
  total: number;
  layout?: 'default' | 'full';
}) {
  return (
    <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
      <div className="z-10 space-y-4 text-white sm:space-y-6">
        <div className="text-sm uppercase tracking-widest text-white/60">
          Project {currentIndex + 1} of {total}
        </div>
        <h1
          className={
            layout === 'full'
              ? 'text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl'
              : 'text-4xl text-white md:text-5xl lg:text-6xl'
          }
        >
          {project.title}
        </h1>
        <p className="text-lg leading-relaxed text-white/90 sm:text-xl md:text-2xl">{project.description}</p>
        <p className="text-base leading-relaxed text-white/80 sm:text-lg">{project.longDescription}</p>
        <div className="flex flex-wrap gap-3">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-xs text-white backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm text-gray-900 transition-colors hover:bg-white/90 sm:px-6 sm:py-3"
          >
            <Github size={20} />
            View Code
          </a>
          {project.demo && project.demo !== '#' && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/20 px-5 py-2.5 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/30 sm:px-6 sm:py-3"
            >
              <ExternalLink size={20} />
              {project.demoLabel ?? 'Live Demo'}
            </a>
          )}
          {project.extraLinks?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/20 px-5 py-2.5 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/30 sm:px-6 sm:py-3"
            >
              <Github size={20} />
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="relative z-10">
        <div className="relative aspect-[4/3] max-h-[40vh] overflow-hidden rounded-2xl bg-white/10 shadow-2xl backdrop-blur-sm sm:max-h-none">
          {project.image ? (
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full min-h-[200px] w-full items-center justify-center">
              <div className="text-center text-white/50">
                <div className="mb-4 text-5xl sm:text-6xl">💻</div>
                <div className="text-base sm:text-lg">Project Preview</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { setProjectsHeaderHidden } = useSiteLayout();
  const [phase, setPhase] = useState<ViewPhase>('intro');
  const [slideIndex, setSlideIndex] = useState(0);

  const lockUntil = useRef(0);
  const acc = useRef(0);
  const lastScrollReset = useRef(0);
  const phaseRef = useRef(phase);
  const slideIndexRef = useRef(slideIndex);
  phaseRef.current = phase;
  slideIndexRef.current = slideIndex;

  const bumpLock = useCallback(() => {
    lockUntil.current = Date.now() + COOLDOWN_MS;
    acc.current = 0;
  }, []);

  useEffect(() => {
    return () => setProjectsHeaderHidden(false);
  }, [setProjectsHeaderHidden]);

  // Hide global header only during fixed full-screen slides; intro and end keep the normal top bar
  useEffect(() => {
    setProjectsHeaderHidden(phase === 'slides');
  }, [phase, setProjectsHeaderHidden]);

  // Slides: lock page scroll; header sits above the fixed slide layer (see Root; overlay z-40)
  useEffect(() => {
    if (phase === 'slides') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      if (document.body.style.overflow === 'hidden') {
        document.body.style.overflow = '';
      }
    };
  }, [phase]);

  // After fixed overlay unmounts, align the in-flow end section to the top so the last project is visible; footer follows below
  useLayoutEffect(() => {
    if (phase !== 'end') return;
    const id = requestAnimationFrame(() => {
      document.getElementById('projects-after-slides')?.scrollIntoView({ block: 'start', behavior: 'auto' });
    });
    return () => cancelAnimationFrame(id);
  }, [phase]);

  // Entering full-screen slide mode: keep document scroll at top while body is locked
  useLayoutEffect(() => {
    if (phase === 'slides') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [phase]);

  const project = projects[slideIndex];

  const atPageTop = () => (window.scrollY || document.documentElement.scrollTop) <= 8;

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      const p = phaseRef.current;
      if (p === 'end') {
        if (e.deltaY > 0) {
          return;
        }
        if (wheelShouldBubbleToPage(e.target, e.deltaY)) {
          return;
        }
        if (!atPageTop()) {
          return;
        }
        if (Date.now() < lockUntil.current) {
          e.preventDefault();
          return;
        }
        const now = Date.now();
        if (now - lastScrollReset.current > 500) {
          acc.current = 0;
        }
        lastScrollReset.current = now;
        acc.current += e.deltaY;
        if (Math.abs(acc.current) < THRESH) {
          e.preventDefault();
          return;
        }
        if (acc.current < 0) {
          acc.current = 0;
          e.preventDefault();
          setPhase('slides');
          setSlideIndex(projects.length - 1);
          bumpLock();
        } else {
          acc.current = 0;
        }
        return;
      }

      if (p === 'slides' && wheelShouldBubbleToPage(e.target, e.deltaY)) {
        return;
      }

      if (Date.now() < lockUntil.current) {
        if (p === 'slides' || p === 'intro') e.preventDefault();
        return;
      }

      const now = Date.now();
      if (now - lastScrollReset.current > 500) {
        acc.current = 0;
      }
      lastScrollReset.current = now;
      acc.current += e.deltaY;

      if (Math.abs(acc.current) < THRESH) {
        e.preventDefault();
        return;
      }

      const dir = acc.current > 0 ? 1 : -1;
      acc.current = 0;
      e.preventDefault();

      if (p === 'intro') {
        if (dir > 0) {
          setPhase('slides');
          setSlideIndex(0);
          bumpLock();
        }
        return;
      }

      // slides
      const idx = slideIndexRef.current;
      if (dir > 0) {
        if (idx < projects.length - 1) {
          setSlideIndex(idx + 1);
        } else {
          setPhase('end');
        }
        bumpLock();
        return;
      }
      if (dir < 0) {
        if (idx > 0) {
          setSlideIndex(idx - 1);
        } else {
          setPhase('intro');
        }
        bumpLock();
      }
    },
    [bumpLock]
  );

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const goToSlide = (i: number) => {
    setSlideIndex(i);
    if (phase === 'intro') {
      setPhase('slides');
    }
    bumpLock();
  };

  const handleNext = () => {
    if (Date.now() < lockUntil.current) return;
    if (phase === 'intro') {
      setPhase('slides');
      setSlideIndex(0);
    } else if (phase === 'slides' && slideIndex < projects.length - 1) {
      setSlideIndex((s) => s + 1);
    } else if (phase === 'slides' && slideIndex === projects.length - 1) {
      setPhase('end');
    } else {
      return;
    }
    bumpLock();
  };

  const handlePrev = () => {
    if (Date.now() < lockUntil.current) return;
    if (phase === 'end' && atPageTop()) {
      setPhase('slides');
      setSlideIndex(projects.length - 1);
    } else if (phase === 'slides' && slideIndex > 0) {
      setSlideIndex((s) => s - 1);
    } else if (phase === 'slides' && slideIndex === 0) {
      setPhase('intro');
    } else {
      return;
    }
    bumpLock();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'PageDown' && e.key !== 'PageUp') {
        return;
      }
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (phase === 'end') {
        const up = e.key === 'ArrowUp' || e.key === 'PageUp';
        if (up && atPageTop()) {
          e.preventDefault();
          handlePrev();
        }
        // down: let the browser scroll the page
        return;
      }
      e.preventDefault();
      const up = e.key === 'ArrowUp' || e.key === 'PageUp';
      if (up) {
        handlePrev();
      } else {
        handleNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleNext, handlePrev, phase]);

  return (
    <>
      {phase === 'intro' && (
        <div className="relative w-full min-h-[calc(100dvh-4rem)] overflow-hidden bg-black">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${projects[0].color} opacity-90 transition-all duration-700`}
          />
          <div className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
            <ProjectPanel
              project={projects[0]}
              currentIndex={0}
              total={projects.length}
              layout="default"
            />
          </div>
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-8">
            <p className="text-center text-xs text-white/50 sm:text-sm">Scroll down for full screen</p>
            <button
              type="button"
              onClick={handleNext}
              className="flex flex-col items-center gap-0.5 text-white/60 transition-colors hover:text-white"
              aria-label="Enter full screen project view"
            >
              <span className="text-xs">Enter</span>
              <ChevronDown className="animate-bounce" size={24} />
            </button>
          </div>
        </div>
      )}

      {phase === 'slides' && (
        <>
          {/* Document-flow placeholder so the site footer isn’t mis-positioned while the slide overlay is fixed */}
          <div
            className="w-full bg-gray-950"
            style={{ minHeight: '100dvh' }}
            aria-hidden
          />
          <div
            className="fixed inset-0 z-40 flex flex-col overflow-hidden bg-black"
            role="region"
            aria-label="Project slides"
          >
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.color} opacity-90 transition-all duration-700`}
            aria-hidden
          />
          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-y-auto overflow-x-hidden px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <motion.div
              key={slideIndex}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="w-full max-w-7xl"
            >
              <ProjectPanel
                project={project}
                currentIndex={slideIndex}
                total={projects.length}
                layout="full"
              />
            </motion.div>
          </div>

          <div className="absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2 sm:right-8 sm:gap-3">
            {projects.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToSlide(i)}
                className={`h-2.5 w-2.5 rounded-full transition-all sm:h-3 sm:w-3 ${
                  i === slideIndex ? 'h-6 bg-white sm:h-8' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Project ${i + 1}`}
                aria-current={i === slideIndex}
              />
            ))}
          </div>

          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 sm:bottom-8 sm:gap-2">
            {slideIndex > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="p-1.5 text-white/60 sm:p-2"
                aria-label="Previous project"
              >
                <ChevronUp size={22} className="sm:w-6 sm:h-6" />
              </button>
            )}
            <p className="text-xs text-white/50 sm:text-sm">Scroll to change project</p>
            {slideIndex < projects.length - 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="p-1.5 text-white/60 sm:p-2"
                aria-label="Next project"
              >
                <ChevronDown className="animate-bounce" size={22} />
              </button>
            )}
          </div>

          <div className="absolute left-4 top-20 z-20 text-xs text-white/60 sm:top-24 sm:text-sm">
            {String(slideIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </div>

          {slideIndex === projects.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-16 left-1/2 z-20 w-full max-w-sm -translate-x-1/2 px-4 text-center sm:bottom-20"
            >
              <p className="mb-2 text-sm text-white/80 sm:mb-3">Scroll once more to continue to the site footer</p>
              <a
                href="https://github.com/bliu8923"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm text-gray-900"
              >
                <Github size={18} />
                GitHub
              </a>
            </motion.div>
          )}
        </div>
        </>
      )}

      {phase === 'end' && (
        <div
          id="projects-after-slides"
          className="relative min-h-[100dvh] w-full scroll-mt-20 bg-black"
        >
          <div
            className={`absolute inset-0 min-h-full bg-gradient-to-br ${lastProject.color} opacity-90 transition-all duration-700`}
            aria-hidden
          />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <ProjectPanel
              project={lastProject}
              currentIndex={lastProjectIndex}
              total={projects.length}
              layout="full"
            />
          </div>
          <div className="relative z-10 border-t border-white/10 px-4 py-10 text-center sm:px-6">
            <p className="text-sm text-white/50">Scroll down for the site footer</p>
          </div>
        </div>
      )}
    </>
  );
}
