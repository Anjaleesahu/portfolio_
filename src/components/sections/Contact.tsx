import React, { useRef, useState, useEffect } from 'react';
import { Section } from '../layout/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal, Loader2 } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface ToastState {
  message: string;
  submessage?: string;
  type: 'success' | 'error';
}

export const Contact = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSending, setIsSending] = useState(false);
  const sendingRef = useRef(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Auto-close toast notifications after 5 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear inline error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };
  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    if (!form.name.trim()) {
      tempErrors.name = 'Name is required';
      isValid = false;
    }

    if (!form.email.trim()) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      tempErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!form.subject.trim()) {
      tempErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!form.message.trim()) {
      tempErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (sendingRef.current) return;
    if (!validate()) return;

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setToast({
        message: 'Failed to send message.',
        submessage: 'Web3Forms Access Key is missing. Check your .env file.',
        type: 'error',
      });
      return;
    }

    sendingRef.current = true;
    setIsSending(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          from_name: 'Portfolio Contact Form',
        }),
      });
      const result: unknown = await response.json();
      const isResultObject = typeof result === 'object' && result !== null;
      const success = isResultObject && 'success' in result && result.success === true;
      const errorMessage = isResultObject && 'message' in result && typeof result.message === 'string'
        ? result.message
        : 'Unable to send your message. Please try again.';

      if (!response.ok || !success) {
        throw new Error(errorMessage);
      }

      setToast({
        message: 'Submission accepted by Web3Forms.',
        submessage: 'If it does not arrive shortly, check Spam/Promotions and confirm the access key is linked to the correct inbox.',
        type: 'success',
      });
      // Reset form fields
      setForm({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error('Web3Forms error:', error);
      setToast({
        message: 'Failed to send message.',
        submessage:
          error instanceof Error
            ? error.message
            : 'Please check your internet connection and try again.',
        type: 'error',
      });
    } finally {
      sendingRef.current = false;
      setIsSending(false);
    }
  };

  return (
    <Section id="contact" className="pb-32">
      {/* Toast Notification Container */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-5 left-5 right-5 z-50 flex max-w-sm flex-col gap-1 rounded-2xl border p-5 shadow-2xl backdrop-blur-xl transition-all sm:bottom-8 sm:left-auto sm:right-8 ${
              toast.type === 'success'
                ? 'border-green-400/25 bg-[#10111a]/95 text-white'
                : 'border-red-400/25 bg-[#10111a]/95 text-white'
            }`}
          >
            <div className="flex items-center gap-2 font-bold">
              {toast.type === 'success' ? (
                <span className="text-green-400 text-lg">✓</span>
              ) : (
                <span className="text-red-400 text-lg">✗</span>
              )}
              {toast.message}
            </div>
            {toast.submessage && (
              <span className="text-sm text-gray-400 pl-6">{toast.submessage}</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#10111a] shadow-[0_30px_100px_rgba(0,0,0,0.28)]">
        <div className="pointer-events-none absolute -right-28 -top-40 h-[28rem] w-[28rem] rounded-full bg-violet-500/[0.08] blur-[110px]" />
        
        <div className="relative z-10 p-6 sm:p-9 md:p-12 lg:p-16">
          <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
            
            <div>
              <div className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-300/[0.08]">
                <Terminal className="h-6 w-6 text-violet-200" />
              </div>
              <h2 className="mb-6 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
                Let's Build the <br />
                <span className="bg-gradient-to-r from-blue-300 to-violet-300 bg-clip-text text-transparent">Future</span> Together
              </h2>
              <p className="mb-8 text-base leading-8 text-slate-400 md:text-lg">
                I'm always open to discussing cutting-edge AI research, potential collaborations, or exciting engineering opportunities.
              </p>
              
              <div className="space-y-3">
                <a href="mailto:anjaleesahu25@gmail.com" className="group flex min-w-0 items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 transition-colors hover:border-blue-300/20">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-blue-300">
                    @
                  </div>
                  <span className="break-all text-sm font-medium text-slate-300 transition-colors group-hover:text-white sm:text-base">anjaleesahu25@gmail.com</span>
                </a>
                <div className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-violet-300">
                    <span aria-hidden="true">⌖</span>
                  </div>
                  <span className="text-sm font-medium text-slate-300 sm:text-base">Indore, M.P., India</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-medium text-slate-300">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full rounded-xl border bg-white/[0.035] px-4 py-3.5 text-white placeholder:text-slate-600 transition focus:outline-none focus:ring-2 focus:ring-violet-400/30 ${
                      errors.name ? 'border-red-400/50 focus:ring-red-400/20' : 'border-white/[0.08] focus:border-violet-300/30'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-red-400 text-xs mt-1 block">{errors.name}</span>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-sm font-medium text-slate-300">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full rounded-xl border bg-white/[0.035] px-4 py-3.5 text-white placeholder:text-slate-600 transition focus:outline-none focus:ring-2 focus:ring-violet-400/30 ${
                      errors.email ? 'border-red-400/50 focus:ring-red-400/20' : 'border-white/[0.08] focus:border-violet-300/30'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-red-400 text-xs mt-1 block">{errors.email}</span>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="contact-subject" className="text-sm font-medium text-slate-300">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Opportunity: Lead AI Engineer"
                  className={`w-full rounded-xl border bg-white/[0.035] px-4 py-3.5 text-white placeholder:text-slate-600 transition focus:outline-none focus:ring-2 focus:ring-violet-400/30 ${
                    errors.subject ? 'border-red-400/50 focus:ring-red-400/20' : 'border-white/[0.08] focus:border-violet-300/30'
                  }`}
                />
                {errors.subject && (
                  <span className="text-red-400 text-xs mt-1 block">{errors.subject}</span>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-sm font-medium text-slate-300">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell me about your project..."
                  className={`w-full resize-none rounded-xl border bg-white/[0.035] px-4 py-3.5 text-white placeholder:text-slate-600 transition focus:outline-none focus:ring-2 focus:ring-violet-400/30 ${
                    errors.message ? 'border-red-400/50 focus:ring-red-400/20' : 'border-white/[0.08] focus:border-violet-300/30'
                  }`}
                />
                {errors.message && (
                  <span className="text-red-400 text-xs mt-1 block">{errors.message}</span>
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: isSending ? 1 : 1.02 }}
                whileTap={{ scale: isSending ? 1 : 0.98 }}
                disabled={isSending}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 px-8 py-4 font-semibold text-white shadow-lg shadow-violet-500/15 transition-all hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                type="submit"
              >
                {isSending ? (
                  <>
                    Sending...
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
};
