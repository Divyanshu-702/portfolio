import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AssessmentModal } from './components/AssessmentModal';
import { INITIAL_CONTACT_INFO } from './data/portfolioData';
import { ContactInfo } from './types';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    try {
      const saved = localStorage.getItem('divyanshu_portfolio_contact');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Automatically upgrade if previously saved with placeholder links
        if (
          !parsed.linkedInUrl ||
          parsed.linkedInUrl === 'https://linkedin.com/in/divyanshu-singh'
        ) {
          parsed.linkedInUrl = INITIAL_CONTACT_INFO.linkedInUrl;
        }
        if (
          !parsed.gitHubUrl ||
          parsed.gitHubUrl === 'https://github.com/divyanshu-singh'
        ) {
          parsed.gitHubUrl = INITIAL_CONTACT_INFO.gitHubUrl;
        }
        return { ...INITIAL_CONTACT_INFO, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to parse saved contact info from localStorage', e);
    }
    return INITIAL_CONTACT_INFO;
  });

  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [isEditContactModalOpen, setIsEditContactModalOpen] = useState(false);

  const handleUpdateContactInfo = (newInfo: ContactInfo) => {
    setContactInfo(newInfo);
    try {
      localStorage.setItem('divyanshu_portfolio_contact', JSON.stringify(newInfo));
    } catch (e) {
      console.warn('Failed to save contact info to localStorage', e);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Sticky Navigation */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenAssessmentModal={() => setIsAssessmentModalOpen(true)}
        onOpenEditContactModal={() => setIsEditContactModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Home Section */}
        <Hero onContactClick={() => scrollToSection('contact')} />

        {/* 2. About Me Section */}
        <About />

        {/* 3. Skills Section */}
        <Skills />

        {/* 4. Projects Section */}
        <Projects />

        {/* 5. Contact Section */}
        <Contact
          contactInfo={contactInfo}
          onUpdateContactInfo={handleUpdateContactInfo}
          isEditModalOpen={isEditContactModalOpen}
          setIsEditModalOpen={setIsEditContactModalOpen}
        />
      </main>

      {/* Footer & AI Creation Note */}
      <Footer
        contactInfo={contactInfo}
        onOpenAssessmentModal={() => setIsAssessmentModalOpen(true)}
      />

      {/* Academic Assessment Criteria Modal */}
      <AssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        onScrollToSection={scrollToSection}
      />
    </div>
  );
}
