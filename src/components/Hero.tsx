import React, { useState, useEffect } from 'react';
import { PERSONAL_DETAILS } from '../data/portfolioData';
import {
  ArrowRight,
  Mail,
  Code2,
  Terminal,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Copy,
  Check,
  Play,
} from 'lucide-react';

const TAGLINE_TAGS = [
  'Web Development',
  'Artificial Intelligence',
  'Software Engineering',
];

interface HeroProps {
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  const [activeTab, setActiveTab] = useState<'code' | 'terminal' | 'overview'>('code');
  const [copiedCode, setCopiedCode] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null);

  // Cycling typing effect for tagline
  const [tagIndex, setTagIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(TAGLINE_TAGS[0].length);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TAGLINE_TAGS[tagIndex];

    // Word fully typed, pause before backspacing
    if (!isDeleting && subIndex === currentWord.length) {
      const pauseTimeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
      return () => clearTimeout(pauseTimeout);
    }

    // Word completely cleared, pause briefly before typing next tag
    if (isDeleting && subIndex === 0) {
      const nextWordTimeout = setTimeout(() => {
        setIsDeleting(false);
        setTagIndex((prev) => (prev + 1) % TAGLINE_TAGS.length);
      }, 350);
      return () => clearTimeout(nextWordTimeout);
    }

    // Typing and backspacing character intervals
    const speed = isDeleting ? 40 : 75;
    const typingTimeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(typingTimeout);
  }, [subIndex, isDeleting, tagIndex]);

  const displayedTag = TAGLINE_TAGS[tagIndex].substring(0, subIndex);

  const codeSnippet = `// Divyanshu Singh — Student Profile
const student = {
  name: "${PERSONAL_DETAILS.name}",
  degree: "${PERSONAL_DETAILS.degree}",
  major: "${PERSONAL_DETAILS.department}",
  year: "${PERSONAL_DETAILS.year}",
  motto: "${PERSONAL_DETAILS.tagline}",
  passions: [
    "Web Development",
    "Programming",
    "Artificial Intelligence",
    "Software Development"
  ],
  readyForOpportunities: true,
};

function exploreCapabilities() {
  return student.passions.map(item => \`Exploring: \${item}\`);
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const runTerminalCommand = () => {
    setTerminalOutput('Compiling student profile...\n✓ B.Tech CSE Student verified.\n✓ Ready to explore technology and build real-world software.');
  };

  return (
    <section
      id="home"
      className="pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 relative overflow-hidden"
    >
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center opacity-60 dark:opacity-20">
        <div className="w-[500px] h-[500px] bg-indigo-100 dark:bg-indigo-900/40 rounded-full blur-3xl -translate-y-16 translate-x-24"></div>
        <div className="w-[420px] h-[420px] bg-sky-100 dark:bg-sky-900/30 rounded-full blur-3xl translate-y-24 -translate-x-32"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Role, Tagline, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Academic Badge */}
            <div
              id="hero-academic-badge"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold tracking-wide mb-6 shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              <span>B.Tech Computer Science Engineering • Academic Profile</span>
            </div>

            {/* Main Greeting */}
            <h1
              id="hero-main-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-4"
            >
              Hi, I’m{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-800 dark:from-indigo-400 dark:via-blue-400 dark:to-indigo-300">
                {PERSONAL_DETAILS.name}
              </span>
            </h1>

            {/* Role Subtitle */}
            <h2
              id="hero-role-subtitle"
              className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-4 tracking-tight"
            >
              {PERSONAL_DETAILS.role}
            </h2>

            {/* Tagline with Dynamic Typing Effect */}
            <div
              id="hero-tagline"
              className="inline-flex items-center flex-wrap gap-1.5 px-4 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 font-medium text-base sm:text-lg mb-6 shadow-2xs"
            >
              <span className="text-slate-600 dark:text-slate-400">
                “Learning, Building &amp; Exploring{' '}
              </span>
              <span
                id="hero-typed-tag"
                className="text-indigo-600 dark:text-indigo-400 font-bold inline-flex items-center"
              >
                <span>{displayedTag}</span>
                <span
                  className="inline-block w-0.5 h-5 bg-indigo-600 dark:bg-indigo-400 ml-1 animate-pulse"
                  aria-hidden="true"
                />
              </span>
              <span className="text-slate-600 dark:text-slate-400">”</span>
            </div>

            {/* Concise Supporting Description */}
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
              Passionate about mastering computer science fundamentals, building practical web applications, and experimenting with artificial intelligence.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <button
                id="hero-contact-button"
                onClick={onContactClick}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all duration-150 shadow-sm hover:shadow-md cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </button>

              <a
                href="#projects"
                id="hero-projects-button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-150 shadow-2xs"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              </a>

              <a
                href="#skills"
                id="hero-skills-button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 font-medium text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <span>Browse Skills</span>
              </a>
            </div>

            {/* Key Quick Highlights */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-3 gap-4 w-full max-w-lg text-slate-600">
              <div>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Discipline</p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">CSE</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Level</p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">B.Tech Undergrad</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Focus</p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Web & AI Tech</p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Professional Developer / Technology Visual */}
          <div className="lg:col-span-5 w-full">
            <div
              id="hero-developer-visual"
              className="rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden text-slate-200 flex flex-col font-mono text-xs sm:text-sm"
            >
              {/* Window Titlebar */}
              <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="ml-2 text-xs font-sans text-slate-400 font-medium hidden sm:inline">
                    developer-workspace ~/divyanshu
                  </span>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 font-sans">
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                      activeTab === 'code'
                        ? 'bg-slate-800 text-indigo-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    profile.ts
                  </button>
                  <button
                    onClick={() => setActiveTab('terminal')}
                    className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                      activeTab === 'terminal'
                        ? 'bg-slate-800 text-emerald-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    bash
                  </button>
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                      activeTab === 'overview'
                        ? 'bg-slate-800 text-sky-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    card
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-4 sm:p-5 min-h-[300px] flex flex-col justify-between">
                {activeTab === 'code' && (
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800/80">
                      <span className="text-slate-500 text-xs">TypeScript • UTF-8</span>
                      <button
                        onClick={handleCopyCode}
                        className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-300 transition-colors cursor-pointer"
                        title="Copy code snippet"
                      >
                        {copiedCode ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="overflow-x-auto text-slate-300 leading-relaxed text-[11px] sm:text-xs">
                      <code>
                        <span className="text-pink-400">interface</span>{' '}
                        <span className="text-yellow-300">StudentEngineer</span> {'{\n'}
                        {'  '}name: <span className="text-emerald-300">string</span>;{'\n'}
                        {'  '}discipline: <span className="text-emerald-300">string</span>;{'\n'}
                        {'  '}status: <span className="text-emerald-300">string</span>;{'\n'}
                        {'}'}
                        {'\n\n'}
                        <span className="text-pink-400">const</span>{' '}
                        <span className="text-blue-300">divyanshu</span>: <span className="text-yellow-300">StudentEngineer</span> = {'{\n'}
                        {'  '}name: <span className="text-emerald-300">"{PERSONAL_DETAILS.name}"</span>,{'\n'}
                        {'  '}discipline: <span className="text-emerald-300">"{PERSONAL_DETAILS.role}"</span>,{'\n'}
                        {'  '}status: <span className="text-amber-300">"Learning & Building"</span>,{'\n'}
                        {'  '}interests: [<span className="text-sky-300">"Web"</span>, <span className="text-sky-300">"AI"</span>, <span className="text-sky-300">"Software"</span>],{'\n'}
                        {'}'};
                        {'\n\n'}
                        <span className="text-slate-500">// Output: Ready to contribute</span>
                      </code>
                    </pre>
                  </div>
                )}

                {activeTab === 'terminal' && (
                  <div className="space-y-3">
                    <div className="text-slate-400 text-xs">
                      $ node verify-profile.js --target="Divyanshu Singh"
                    </div>
                    <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800 text-emerald-400 text-xs font-mono whitespace-pre-line">
                      {terminalOutput || 'Click "Execute Run" to simulate profile verification status.'}
                    </div>
                    <button
                      onClick={runTerminalCommand}
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-xs font-semibold cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Execute Run</span>
                    </button>
                  </div>
                )}

                {activeTab === 'overview' && (
                  <div className="font-sans space-y-3">
                    <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-indigo-300 font-semibold">Academic Profile</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                          Active Student
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{PERSONAL_DETAILS.name}</h4>
                      <p className="text-xs text-slate-400">{PERSONAL_DETAILS.role}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/40">
                        <span className="text-slate-400 block text-[10px]">Academic Year</span>
                        <span className="text-slate-200 font-semibold">{PERSONAL_DETAILS.year}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/40">
                        <span className="text-slate-400 block text-[10px]">Core Stack</span>
                        <span className="text-slate-200 font-semibold">React, Node, Java</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer status bar in developer card */}
                <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Ready for Collaboration</span>
                  </div>
                  <span className="text-slate-500">Node v22 • Git active</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
