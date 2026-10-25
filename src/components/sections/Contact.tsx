import React, { useRef, useState, useEffect } from 'react';
import { Section } from '../layout/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin, Send, Loader2 } from 'lucide-react';

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
    <Section id="contact" className="contact-section pb-32">
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

      <div className="contact-showcase">
        <div className="contact-ambient contact-ambient-one" aria-hidden="true" />
        <div className="contact-ambient contact-ambient-two" aria-hidden="true" />
        <div className="contact-grid" aria-hidden="true" />

        <div className="contact-showcase-content">
          <motion.div
            className="contact-intro"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.55 }}
          >
            <span className="contact-eyebrow">GET IN TOUCH</span>
            <h2>Let’s Turn <span>Ideas</span> into Reality</h2>
            <p>
              I'm always open to discussing cutting-edge AI research, potential collaborations, or exciting engineering opportunities.
            </p>

            <div className="contact-details">
              <a href="mailto:anjaleesahu25@gmail.com" className="contact-detail-link">
                <span className="contact-detail-icon"><Mail aria-hidden="true" /></span>
                <span className="contact-detail-copy">
                  <small>Email me</small>
                  <strong>anjaleesahu25@gmail.com</strong>
                </span>
                <ArrowUpRight className="contact-detail-arrow" aria-hidden="true" />
              </a>
              <div className="contact-detail-location">
                <span className="contact-detail-icon"><MapPin aria-hidden="true" /></span>
                <span className="contact-detail-copy">
                  <small>Location</small>
                  <strong>Indore, M.P., India</strong>
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-panel"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <div className="contact-form-heading">
              <span>START A CONVERSATION</span>
              <p>Share a few details and send me a message.</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-field-row">
                <div className="contact-field">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    aria-invalid={Boolean(errors.name)}
                    className={errors.name ? 'has-error' : ''}
                  />
                  {errors.name && <span className="contact-field-error">{errors.name}</span>}
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    aria-invalid={Boolean(errors.email)}
                    className={errors.email ? 'has-error' : ''}
                  />
                  {errors.email && <span className="contact-field-error">{errors.email}</span>}
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Opportunity: Lead AI Engineer"
                  aria-invalid={Boolean(errors.subject)}
                  className={errors.subject ? 'has-error' : ''}
                />
                {errors.subject && <span className="contact-field-error">{errors.subject}</span>}
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell me about your project..."
                  aria-invalid={Boolean(errors.message)}
                  className={errors.message ? 'has-error' : ''}
                />
                {errors.message && <span className="contact-field-error">{errors.message}</span>}
              </div>

              <motion.button
                whileHover={{ y: isSending ? 0 : -2 }}
                whileTap={{ scale: isSending ? 1 : 0.99 }}
                disabled={isSending}
                className="contact-submit"
                type="submit"
              >
                {isSending ? (
                  <>
                    Sending...
                    <Loader2 className="contact-submit-icon animate-spin" />
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="contact-submit-icon" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};
