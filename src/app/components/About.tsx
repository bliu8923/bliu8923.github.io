import { motion } from 'motion/react';
import { Heart, Lightbulb, Target } from 'lucide-react';
import profileImg from '@/assets/brandon.jpeg';

export default function About() {
  return (
    <div className="min-h-screen py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl mb-6 text-white">About Me</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Getting to know the person behind the code
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <img
                src={profileImg}
                alt="Brandon Liu"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl mb-6 text-white">Hello! I'm Brandon</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                I'm a passionate software engineer with a love for creating elegant solutions to complex problems, 
                such as slashing API latency by 95% or managing services for hundreds of millions of users at Amazon. 
                My journey in tech began with a B.S. in Data Science from UC San Diego and has evolved into a career 
                focused on building impactful applications across the full stack.
              </p>
              <p>
                I thrive in collaborative environments where I can contribute to meaningful projects, whether that 
                involves developing deep learning models for medical research or optimizing cloud infrastructure with 
                AWS CDK. From front-end development in React to backend distributed systems, I'm always eager to take 
                on new challenges that push the boundaries of performance and reliability.
              </p>
              <p>
                When I'm not coding, you'll find me traveling to destinations like Vietnam, golfing, or in the kitchen 
                cooking. I'm also an avid gamer who enjoys exploring the Bay Area, Seattle, and Los Angeles restaurant 
                scenes and working on personal projects, like custom fighting games, that push my technical boundaries.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl text-center mb-12 text-white">My Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-900 rounded-xl text-center border border-gray-800">
              <div className="w-16 h-16 bg-white text-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb size={32} />
              </div>
              <h3 className="text-xl mb-3 text-white">Innovation</h3>
              <p className="text-gray-400">
                I aim for sustainable ways to get results—solutions that hold up and leave whoever comes next in a
                better place, not one-off heroics.
              </p>
            </div>

            <div className="p-8 bg-gray-900 rounded-xl text-center border border-gray-800">
              <div className="w-16 h-16 bg-white text-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={32} />
              </div>
              <h3 className="text-xl mb-3 text-white">Results-Driven</h3>
              <p className="text-gray-400">
                Speed with accountability—iterate fast, close the loop on failures, and leave the system slightly
                harder to break each time.
              </p>
            </div>

            <div className="p-8 bg-gray-900 rounded-xl text-center border border-gray-800">
              <div className="w-16 h-16 bg-white text-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={32} />
              </div>
              <h3 className="text-xl mb-3 text-white">Collaboration</h3>
              <p className="text-gray-400">
                Open knowledge-sharing is one of the strongest levers at any company—documentation, reviews, and
                teaching are how a team really levels up.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl text-center mb-12 text-white">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { category: 'Frontend', skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
              { category: 'Backend', skills: ['Node.js', 'Python', 'Express', 'PostgreSQL'] },
              { category: 'Tools', skills: ['Git', 'Docker', 'VS Code', 'Figma'] },
              { category: 'Soft Skills', skills: ['Problem Solving', 'Communication', 'Leadership', 'Adaptability'] },
            ].map((skillGroup, index) => (
              <div key={index} className="p-6 bg-gray-900 rounded-xl border border-gray-800">
                <h3 className="text-lg mb-4 text-white">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="text-gray-400 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}