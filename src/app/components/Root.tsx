import { Outlet, Link, useLocation } from 'react-router';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SiteLayoutProvider, useSiteLayout } from '../context/SiteLayoutContext';

function RootLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { projectsHeaderHidden, setProjectsHeaderHidden } = useSiteLayout();

  // Projects toggles the header; reset whenever we're not on the projects route (avoids a stuck hidden bar)
  const isProjectsRoute = /(^|\/)projects($|\/)/.test(location.pathname);
  useEffect(() => {
    if (!isProjectsRoute) {
      setProjectsHeaderHidden(false);
    }
  }, [isProjectsRoute, setProjectsHeaderHidden]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/resume', label: 'Resume' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActivePath = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <header
        className={
          'fixed top-0 left-0 right-0 border-b border-gray-800 bg-gray-950/80 backdrop-blur-md transition-all duration-500 ease-in-out ' +
          (projectsHeaderHidden
            ? 'pointer-events-none z-0 -translate-y-full opacity-0'
            : 'z-50 translate-y-0 opacity-100')
        }
        aria-hidden={projectsHeaderHidden}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-white hover:text-gray-300 transition-colors">
              BL
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm transition-colors relative ${
                    isActivePath(link.path)
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActivePath(link.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-white"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-950 border-t border-gray-800"
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      isActivePath(link.path)
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <Outlet />
      </main>

      <footer id="site-footer" className="bg-gray-900 border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-400 text-sm">
              © 2026 Brandon Liu. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a
                href="https://github.com/bliu8923"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/brandonliu8923"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:bliu8923@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Root() {
  return (
    <SiteLayoutProvider>
      <RootLayout />
    </SiteLayoutProvider>
  );
}