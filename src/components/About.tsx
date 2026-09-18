import React from 'react';
import { PERSONAL_DETAILS, INTERESTS } from '../data/portfolioData';
import {
  Globe,
  Code,
  Brain,
  Cpu,
  Layers,
  Sparkles,
  GraduationCap,
  BookOpen,
  Target,
  CheckCircle2,
} from 'lucide-react';

const getInterestIcon = (iconName: string) => {
  switch (iconName) {
    case 'Globe':
      return <Globe className="w-5 h-5 text-indigo-600" />;
    case 'Code':
      return <Code className="w-5 h-5 text-blue-600" />;
    case 'Brain':
      return <Brain className="w-5 h-5 text-purple-600" />;
    case 'Cpu':
      return <Cpu className="w-5 h-5 text-emerald-600" />;
    case 'Layers':
      return <Layers className="w-5 h-5 text-amber-600" />;
    case 'Sparkles':
      return <Sparkles className="w-5 h-5 text-rose-600" />;
    default:
      return <Code className="w-5 h-5 text-indigo-600" />;
  }
};

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900/60 border-y border-slate-200/70 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-3 border border-slate-200/60 dark:border-slate-700">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About Me
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
            Get to know my academic profile, engineering interests, and passion for modern software.
          </p>
        </div>

        {/* Main Introduction Card */}
        <div className="bg-slate-50/80 dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 md:p-10 mb-14 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Introduction Text */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <span>Personal Introduction</span>
              </div>
              <p
                id="about-introduction-text"
                className="text-slate-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed font-normal"
              >
                “{PERSONAL_DETAILS.introduction}”
              </p>
              
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  Practical Project Focus
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  Problem Solving Mindset
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  Continuous Learner
                </span>
              </div>
            </div>

            {/* Right: Academic Snapshot Badge */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-3.5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Academic Snapshot
              </h3>
              
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Candidate</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{PERSONAL_DETAILS.name}</span>
              </div>

              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Degree Program</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{PERSONAL_DETAILS.degree}</span>
              </div>

              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Discipline</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{PERSONAL_DETAILS.department}</span>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Status</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
                  Enrolled Student
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Areas of Interest Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Areas of Interest
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Core computational and engineering domains I actively focus on:
              </p>
            </div>
            <span className="text-xs font-medium text-slate-400 mt-2 sm:mt-0">
              6 Core Domains
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INTERESTS.map((interest) => (
              <div
                key={interest.id}
                id={`interest-card-${interest.id}`}
                className="bg-slate-50/70 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1 hover:scale-[1.015] hover:border-slate-300 dark:hover:border-slate-700 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-4 shadow-2xs group-hover:bg-indigo-50/60 dark:group-hover:bg-indigo-950/40 group-hover:border-indigo-200 dark:group-hover:border-indigo-800 transition-colors duration-200">
                    {getInterestIcon(interest.iconName)}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                    {interest.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {interest.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Interest Area</span>
                  <span className="font-medium text-indigo-600 dark:text-indigo-400">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
