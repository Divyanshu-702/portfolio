import React, { useState } from 'react';
import { ContactInfo, SentMessage } from '../types';
import {
  Mail,
  Linkedin,
  Github,
  Send,
  Loader2,
  Edit3,
  Check,
  Copy,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  Save,
  X,
  Inbox,
  Trash2,
  Clock,
  RotateCcw,
} from 'lucide-react';

interface ContactProps {
  contactInfo: ContactInfo;
  onUpdateContactInfo: (newInfo: ContactInfo) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
}

export const Contact: React.FC<ContactProps> = ({
  contactInfo,
  onUpdateContactInfo,
  isEditModalOpen,
  setIsEditModalOpen,
}) => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessageText, setCopiedMessageText] = useState(false);

  // Messages Store (in local storage for testing and evaluation)
  const [messages, setMessages] = useState<SentMessage[]>(() => {
    try {
      const saved = localStorage.getItem('divyanshu_portfolio_messages');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [lastSentMessage, setLastSentMessage] = useState<SentMessage | null>(null);
  const [isInboxModalOpen, setIsInboxModalOpen] = useState(false);

  // Edit Links Modal State
  const [tempLinks, setTempLinks] = useState<ContactInfo>(contactInfo);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getEmailContent = (msg: { name: string; email: string; message: string }) => {
    const subject = `Portfolio Inquiry from ${msg.name}`;
    const body = `Hi Divyanshu,\n\nI am contacting you from your personal portfolio website:\n\nName: ${msg.name}\nEmail: ${msg.email}\n\nMessage:\n${msg.message}\n\n---\nSent via Divyanshu Singh's Portfolio`;
    return { subject, body };
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formStatus === 'submitting') return;

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus('error');
      setErrorMessage('Please fill in all fields (Name, Email, and Message).');
      return;
    }

    // Basic email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setFormStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setFormStatus('submitting');
    setErrorMessage('');

    // Simulate async dispatch delay so loading indicator renders and multi-clicks are prevented
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newMessage: SentMessage = {
      id: 'msg-' + Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      timestamp: new Date().toLocaleString([], {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    // Save to persistent messages
    const updated = [newMessage, ...messages];
    setMessages(updated);
    try {
      localStorage.setItem('divyanshu_portfolio_messages', JSON.stringify(updated));
    } catch (err) {
      console.warn('Unable to persist inquiry to localStorage', err);
    }

    setLastSentMessage(newMessage);

    // Attempt mailto trigger
    const { subject, body } = getEmailContent(newMessage);
    const mailtoUrl = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    try {
      const link = document.createElement('a');
      link.href = mailtoUrl;
      link.target = '_top';
      link.click();
    } catch {
      // If browser prevents programmatic mailto navigation inside iframe,
      // the interactive success state displays both Gmail & mailto direct links
    }

    setFormStatus('success');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyFormattedMessage = () => {
    if (!lastSentMessage) return;
    const { body } = getEmailContent(lastSentMessage);
    navigator.clipboard.writeText(body);
    setCopiedMessageText(true);
    setTimeout(() => setCopiedMessageText(false), 2000);
  };

  const handleDeleteMessage = (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    try {
      localStorage.setItem('divyanshu_portfolio_messages', JSON.stringify(updated));
    } catch (err) {
      console.warn('Unable to persist updated inquiries', err);
    }
  };

  const handleClearAllMessages = () => {
    setMessages([]);
    try {
      localStorage.removeItem('divyanshu_portfolio_messages');
    } catch (err) {
      console.warn('Unable to clear inquiries from localStorage', err);
    }
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setFormStatus('idle');
    setLastSentMessage(null);
  };

  const handleSaveLinks = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateContactInfo(tempLinks);
    setIsEditModalOpen(false);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50/70 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3 border border-indigo-100 dark:border-indigo-800">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect & Inquire</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Contact Me
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
            Feel free to reach out for academic inquiries, practical collaboration, or project discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Editable Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Contact Information
                </h3>
                <button
                  onClick={() => {
                    setTempLinks(contactInfo);
                    setIsEditModalOpen(true);
                  }}
                  type="button"
                  id="edit-contact-links-btn"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-100 dark:border-indigo-800 transition-colors cursor-pointer"
                  title="Customize your Email, LinkedIn, and GitHub links"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Links</span>
                </button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                All profile links below are customizable and stored locally for your assessment submission.
              </p>

              {/* Email Detail Card */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                        Email
                      </span>
                      <button
                        onClick={handleCopyEmail}
                        type="button"
                        className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-1 cursor-pointer"
                      >
                        {copiedEmail ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                            <span className="text-emerald-600 dark:text-emerald-400 text-[11px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="text-[11px]">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 truncate block mt-0.5"
                    >
                      {contactInfo.email || '[Add Your Email]'}
                    </a>
                  </div>
                </div>

                {/* LinkedIn Detail Card */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800 flex items-center justify-center shrink-0">
                    <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                      LinkedIn
                    </span>
                    <a
                      href={contactInfo.linkedInUrl.startsWith('http') ? contactInfo.linkedInUrl : `https://${contactInfo.linkedInUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 truncate block mt-0.5"
                    >
                      {contactInfo.linkedInUrl || '[Add Your LinkedIn URL]'}
                    </a>
                  </div>
                  <a
                    href={contactInfo.linkedInUrl.startsWith('http') ? contactInfo.linkedInUrl : `https://${contactInfo.linkedInUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    aria-label="Open LinkedIn"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* GitHub Detail Card */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                    <Github className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                      GitHub
                    </span>
                    <a
                      href={contactInfo.gitHubUrl.startsWith('http') ? contactInfo.gitHubUrl : `https://${contactInfo.gitHubUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white truncate block mt-0.5"
                    >
                      {contactInfo.gitHubUrl || '[Add Your GitHub URL]'}
                    </a>
                  </div>
                  <a
                    href={contactInfo.gitHubUrl.startsWith('http') ? contactInfo.gitHubUrl : `https://${contactInfo.gitHubUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    aria-label="Open GitHub"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Status Note */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Response Turnaround</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Within 24 Hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between gap-3 mb-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Send a Message
                </h3>
                <button
                  type="button"
                  onClick={() => setIsInboxModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  title="View saved inquiries on this browser"
                >
                  <Inbox className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Inquiries Log ({messages.length})</span>
                </button>
              </div>
              
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-6">
                Reach out with an inquiry, project opportunity, or academic feedback.
              </p>

              {formStatus === 'success' && lastSentMessage ? (
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 space-y-4 animate-in fade-in zoom-in-95">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Inquiry Recorded & Dispatched!
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                        Your message has been stored in this browser's inquiry log and prepared for transmission to{' '}
                        <strong className="text-slate-900 dark:text-white">{contactInfo.email}</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Message Preview */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span>From: <strong className="text-slate-800 dark:text-slate-200">{lastSentMessage.name}</strong> ({lastSentMessage.email})</span>
                      <span className="text-[11px] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lastSentMessage.timestamp}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 italic pt-1 border-t border-slate-100 dark:border-slate-800">
                      "{lastSentMessage.message}"
                    </p>
                  </div>

                  {/* Direct Delivery Actions */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-2">
                      Choose Your Preferred Send Method:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {/* Gmail Web Link */}
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                          contactInfo.email
                        )}&su=${encodeURIComponent(
                          `Portfolio Inquiry from ${lastSentMessage.name}`
                        )}&body=${encodeURIComponent(
                          `Hi Divyanshu,\n\nI reached out via your personal portfolio website:\n\nName: ${lastSentMessage.name}\nEmail: ${lastSentMessage.email}\n\nMessage:\n${lastSentMessage.message}\n\n---\nSent via Divyanshu Singh's Portfolio`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Send via Gmail Web</span>
                      </a>

                      {/* Default Mail Client */}
                      <a
                        href={`mailto:${contactInfo.email}?subject=${encodeURIComponent(
                          `Portfolio Inquiry from ${lastSentMessage.name}`
                        )}&body=${encodeURIComponent(
                          `Hi Divyanshu,\n\nI reached out via your personal portfolio website:\n\nName: ${lastSentMessage.name}\nEmail: ${lastSentMessage.email}\n\nMessage:\n${lastSentMessage.message}\n\n---\nSent via Divyanshu Singh's Portfolio`
                        )}`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white text-xs font-semibold shadow-xs transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send via Default Mail App</span>
                      </a>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/70 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={handleCopyFormattedMessage}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                    >
                      {copiedMessageText ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Message Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Message Text</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Send Another Message</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {formStatus === 'error' && (
                    <div className="mb-6 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                          Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          disabled={formStatus === 'submitting'}
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                          Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          disabled={formStatus === 'submitting'}
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@domain.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        required
                        disabled={formStatus === 'submitting'}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Write your message, project idea, or assessment notes..."
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 transition-colors resize-y disabled:opacity-60 disabled:cursor-not-allowed"
                      ></textarea>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <button
                        type="submit"
                        id="contact-send-button"
                        disabled={formStatus === 'submitting'}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all duration-150 shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {formStatus === 'submitting' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>

                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 dark:text-slate-400 block">
                          Direct target:{' '}
                          <a
                            href={`mailto:${contactInfo.email}`}
                            className="font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 underline underline-offset-2"
                          >
                            {contactInfo.email}
                          </a>
                        </span>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Inquiries Log Modal */}
      {isInboxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in fade-in zoom-in-95 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setIsInboxModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close inquiries modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <Inbox className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Logged Inquiries ({messages.length})
                </h3>
              </div>
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAllMessages}
                  className="text-xs text-rose-600 dark:text-rose-400 hover:underline inline-flex items-center gap-1 cursor-pointer pr-8 sm:pr-0"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
              Every message submitted via the contact form is safely logged in your local browser store.
            </p>

            {messages.length === 0 ? (
              <div className="text-center py-10 px-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                <MessageSquare className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  No inquiries recorded yet
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  Fill out the form and hit "Send Message" to see submissions logged here in real time.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-xs space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white text-sm">
                          {msg.name}
                        </span>
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-indigo-600 dark:text-indigo-400 ml-2 hover:underline"
                        >
                          {msg.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {msg.timestamp}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1"
                          title="Delete message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setIsInboxModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-indigo-600 text-white hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors cursor-pointer"
              >
                Close Inquiries Log
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Links Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close edit modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Edit3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Edit Contact Details
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
              Customize your Email, LinkedIn URL, and GitHub URL for your assessment. Changes are saved locally on this browser.
            </p>

            <form onSubmit={handleSaveLinks} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={tempLinks.email}
                  onChange={(e) => setTempLinks({ ...tempLinks, email: e.target.value })}
                  placeholder="e.g. yourname@gmail.com"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="text"
                  value={tempLinks.linkedInUrl}
                  onChange={(e) => setTempLinks({ ...tempLinks, linkedInUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/your-profile"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  GitHub URL
                </label>
                <input
                  type="text"
                  value={tempLinks.gitHubUrl}
                  onChange={(e) => setTempLinks({ ...tempLinks, gitHubUrl: e.target.value })}
                  placeholder="https://github.com/your-username"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-slate-900 dark:bg-indigo-600 text-white hover:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg shadow-2xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Links</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
