import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Code2, Briefcase, GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';
import profileImg1 from '@/assets/brandon.jpeg';
import profileImg2 from '@/assets/brandon2.jpg';

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const profileImages = [profileImg1, profileImg2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-950 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-white">
                Hi, I'm <span className="text-gray-400">Brandon Liu</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Software Engineer | ML Engineer | Developer
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                I'm passionate about building innovative solutions and creating meaningful digital experiences. 
                Welcome to my corner of the internet!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  View My Work
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
                >
                  Get In Touch
                </Link>
              </div>
            </motion.div>

            {/* Profile Image Carousel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={profileImages[currentImageIndex]}
                      alt="Brandon Liu"
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </AnimatePresence>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gray-800 rounded-full -z-10"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gray-900 rounded-full -z-10"></div>
                
                {/* Image Indicators */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {profileImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white w-6' : 'bg-gray-600'
                      }`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <Link
              to="/about"
              className="group p-8 bg-gray-900 rounded-xl hover:shadow-lg hover:shadow-gray-900/50 transition-all hover:-translate-y-1 border border-gray-800"
            >
              <div className="w-12 h-12 bg-white text-gray-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl mb-2 text-white">About Me</h3>
              <p className="text-gray-400 mb-4">
                Learn more about my background, education, and what drives me.
              </p>
              <span className="text-white inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More <ArrowRight size={16} />
              </span>
            </Link>

            <Link
              to="/projects"
              className="group p-8 bg-gray-900 rounded-xl hover:shadow-lg hover:shadow-gray-900/50 transition-all hover:-translate-y-1 border border-gray-800"
            >
              <div className="w-12 h-12 bg-white text-gray-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
                <Code2 size={24} />
              </div>
              <h3 className="text-xl mb-2 text-white">Projects</h3>
              <p className="text-gray-400 mb-4">
                Explore the projects I've worked on and the technologies I use.
              </p>
              <span className="text-white inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                View Projects <ArrowRight size={16} />
              </span>
            </Link>

            <Link
              to="/resume"
              className="group p-8 bg-gray-900 rounded-xl hover:shadow-lg hover:shadow-gray-900/50 transition-all hover:-translate-y-1 border border-gray-800"
            >
              <div className="w-12 h-12 bg-white text-gray-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
                <Briefcase size={24} />
              </div>
              <h3 className="text-xl mb-2 text-white">Resume</h3>
              <p className="text-gray-400 mb-4">
                View my professional experience, skills, and qualifications.
              </p>
              <span className="text-white inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                View Resume <ArrowRight size={16} />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900 text-white border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-2">4</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-2">20+</div>
              <div className="text-gray-400">Professional Skills</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-2">5+</div>
              <div className="text-gray-400">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-2">3+</div>
              <div className="text-gray-400">Companies</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}