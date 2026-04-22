import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, Send, MapPin } from 'lucide-react';

const CONTACT_EMAIL = 'bliu8923@gmail.com';

function buildMailto(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  const subject =
    formData.subject.trim() ||
    (formData.name.trim()
      ? `Contact from ${formData.name.trim()}`
      : 'Message from portfolio site');
  const body = [
    formData.name.trim() && `Name: ${formData.name.trim()}`,
    formData.email.trim() && `Reply-to: ${formData.email.trim()}`,
    '',
    formData.message.trim(),
  ]
    .filter(Boolean)
    .join('\n');

  const params = new URLSearchParams();
  params.set('subject', subject);
  params.set('body', body);
  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openMailto = useCallback(() => {
    window.location.href = buildMailto(formData);
  }, [formData]);

  return (
    <div className="min-h-screen py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl mb-6 text-white">Get In Touch</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have a question or want to work together? I&apos;d love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl mb-6 text-white">Let&apos;s Connect</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Whether you have a project in mind, a question about my work, or just want to say hello,
              feel free to reach out. I&apos;m always open to discussing new opportunities and
              collaborations.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-800">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Email</div>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-800">
                  <MapPin size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Location</div>
                  <div className="text-white">San Francisco Bay Area, CA</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl mb-4 text-white">Connect on Social Media</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/bliu8923"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white text-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/brandonliu8923"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white text-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="w-12 h-12 bg-white text-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  aria-label="Email"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl mb-2 text-white">Send a Message</h2>
              <p className="text-sm text-gray-500 mb-6">
                This site has no backend—your message opens in your email app via{' '}
                <span className="text-gray-400">mailto:</span>. Fill in the fields and click the button
                below.
              </p>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm mb-2 text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all text-white placeholder-gray-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm mb-2 text-gray-300">
                    Your email (for reply-to in the message body)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all text-white placeholder-gray-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm mb-2 text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all text-white placeholder-gray-500"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm mb-2 text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all resize-none text-white placeholder-gray-500"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="button"
                  onClick={openMailto}
                  className="w-full px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Open in email app
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
