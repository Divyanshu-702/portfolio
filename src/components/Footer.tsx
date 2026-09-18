import React, { useState } from 'react';
import { PERSONAL_DETAILS } from '../data/portfolioData';
import { ContactInfo } from '../types';
import {
  Linkedin,
  Github,
  Mail,
  ArrowUp,
  Sparkles,
  Award,
  Code2,
  Edit3,
  X,
  Check,
  RotateCcw,
} from 'lucide-react';

interface FooterProps {
  contactInfo: ContactInfo;
  onOpenAssessmentModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  contactInfo,
  onOpenAssessmentModal,
}) => {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [creationTitle, setCreationTitle] = useState(() => {
    return localStorage.getItem('portfolio_footer_title') || PERSONAL_DETAILS.aiCreationTitle;
  });
  const [creationNotice, setCreationNotice] = useState(() => {
    return localStorage.getItem('portfolio_footer_notice') || PERSONAL_DETAILS.aiCreationNotice;
  });

  const [tempTitle, setTempTitle] = useState(creationTitle);
  const [tempNotice, setTempNotice] = useState(creationNotice);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEdit = () => {
    setTempTitle(creationTitle);
    setTempNotice(creationNotice);
    setIsEditingNote(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitle = tempTitle.trim() || PERSONAL_DETAILS.aiCreationTitle;
    const finalNotice = tempNotice.trim() || PERSONAL_DETAILS.aiCreationNotice;
    setCreationTitle(finalTitle);
    setCreationNotice(finalNotice);
    localStorage.setItem('portfolio_footer_title', finalTitle);
    localStorage.setItem('portfolio_footer_notice', finalNotice);
    setIsEditingNote(false);
  };

  const handleResetDefault = () => {
    setTempTitle(PERSONAL_DETAILS.aiCreationTitle);
    setTempNotice(PERSONAL_DETAILS.aiCreationNotice);
  };

  const applyPreset = (title: string, notice: string) => {
    setTempTitle(title);
    setTempNotice(notice);
  };

  return (
    <footer id="main-footer" className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      {/* Portfolio Engineering & Creation Statement Section */}
      <div id="footer-creation-section" className="bg-slate-50/80 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5 max-w-2xl">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 shadow-2xs">
                <Code2 className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {creationTitle}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                    <Sparkles className="w-3 h-3" />
                    <span>React • TypeScript • Tailwind</span>
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {creationNotice}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 flex-wrap justify-center">
              <button
                onClick={handleOpenEdit}
                id="footer-edit-statement-button"
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-2xs cursor-pointer"
                title="Customize or edit this statement"
              >
                <Edit3 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>Edit Statement</span>
              </button>

              <button
                onClick={onOpenAssessmentModal}
                id="footer-rubric-button"
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-2xs cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Assessment Rubric</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Statement Modal */}
      {isEditingNote && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-statement-title"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 id="edit-statement-title" className="text-base font-bold text-slate-900 dark:text-white">
                  Customize Project Statement
                </h3>
              </div>
              <button
                onClick={() => setIsEditingNote(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              {/* Quick Preset Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  Quick Presets
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      applyPreset(
                        'Designed & Developed by Divyanshu Singh',
                        'Built with React, TypeScript & Tailwind CSS • Developed with AI-assisted engineering workflows for the B.Tech CSE Personal Profile Assessment.'
                      )
                    }
                    className="p-2 text-left rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:border-indigo-400 text-[11px] text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <span className="font-semibold block text-slate-900 dark:text-white">Professional</span>
                    <span>Student Developer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      applyPreset(
                        'Crafted with Modern Web Tech & AI',
                        'Engineered using React 18, TypeScript, and responsive design systems with AI developer assistance for academic assessment.'
                      )
                    }
                    className="p-2 text-left rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:border-indigo-400 text-[11px] text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <span className="font-semibold block text-slate-900 dark:text-white">Engineering</span>
                    <span>Tech Architecture</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      applyPreset(
                        'Academic Assessment Notice',
                        'Created with AI-assisted development tools as part of my B.Tech Computer Science Engineering Personal Profile Website assessment.'
                      )
                    }
                    className="p-2 text-left rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:border-indigo-400 text-[11px] text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <span className="font-semibold block text-slate-900 dark:text-white">Academic</span>
                    <span>Evaluation Notice</span>
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="edit-statement-header" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Section Title
                </label>
                <input
                  id="edit-statement-header"
                  type="text"
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  placeholder="e.g. Designed & Developed by Divyanshu Singh"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label htmlFor="edit-statement-desc" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Description / Notice
                </label>
                <textarea
                  id="edit-statement-desc"
                  rows={3}
                  value={tempNotice}
                  onChange={(e) => setTempNotice(e.target.value)}
                  placeholder="e.g. Built with React, TypeScript & Tailwind CSS..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleResetDefault}
                  className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Default</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingNote(false)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer shadow-2xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Footer Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="text-center md:text-left">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Divyanshu Singh
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              B.Tech Computer Science Engineering Student
            </p>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-2">
              © 2026 Divyanshu Singh | Personal Profile Website
            </p>
          </div>

          {/* Social Links & Contact Icons */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${contactInfo.email}`}
              id="footer-email-link"
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors border border-slate-200 dark:border-slate-700"
              title={`Email: ${contactInfo.email}`}
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href={contactInfo.linkedInUrl.startsWith('http') ? contactInfo.linkedInUrl : `https://${contactInfo.linkedInUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              id="footer-linkedin-link"
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-blue-600 dark:hover:text-blue-400 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors border border-slate-200 dark:border-slate-700"
              title="LinkedIn Profile"
              aria-label="Visit LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={contactInfo.gitHubUrl.startsWith('http') ? contactInfo.gitHubUrl : `https://${contactInfo.gitHubUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              id="footer-github-link"
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-900 dark:hover:bg-slate-700 hover:text-white dark:hover:text-white text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors border border-slate-200 dark:border-slate-700"
              title="GitHub Profile"
              aria-label="Visit GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              id="footer-back-to-top"
              type="button"
              className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-indigo-600 text-white hover:bg-indigo-600 dark:hover:bg-indigo-500 flex items-center justify-center transition-colors ml-2 cursor-pointer shadow-2xs"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
