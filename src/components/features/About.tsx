'use client'

import React from 'react'
import { Code, Code2, Database, Globe, Layout, Server, Smartphone } from 'lucide-react'

const About = () => {
  const techStack = [
    {
      icon: Code2,
      title: 'Frontend',
      skills: ['HTML5', 'TypeScript', 'Next.js', 'Tailwind CSS', 'JavaScript', 'PHP'],
    },
    {
      icon: Server,
      title: 'Frameworks',
      skills: ['React.js', 'Bootstrap', 'Material-UI'],
    },
    {
      icon: Database,
      title: 'Database',
      skills: ['MySQL', 'Firebase'],
    },
    {
      icon: Code,
      title: 'IDE/DevOps',
      skills: ['Visual Studio Code', 'Cursor AI', 'CI/CD', 'GitHub', 'Agile'],
    },
    {
      icon: Layout,
      title: 'Design',
      skills: ['Figma', 'UI/UX', 'Responsive Design', 'Accessibility'],
    },
    {
      icon: Smartphone,
      title: 'Mobile',
      skills: ['React Native', 'Flutter'],
    },
  ]

  return (
    <section id="about" className="py-20 dot-pattern">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-primary mb-8 text-center">About Me</h2>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-2xl text-text/100">
            I'm a passionate front-end developer with a love for creating beautiful, functional, and user-friendly applications. 
            With over 15+ years of experience in front end technologies, I bring ideas to life through clean code and intuitive design.
          </p>
        </div>

        {/* Tech Stack Image Grid */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 justify-items-center">
            {[
              'react', 'typescript', 'javascript', 'html5', 'css3',
              'tailwind', 'sass', 'material-ui', 'bootstrap', 
              'firebase', 'mysql', 'figma'
            ].map((tech) => (
              <div
                key={tech}
                className="relative w-16 h-16 group transition-transform hover:scale-110 duration-300"
              >
                <img
                  src={`/images/${tech}-icon.svg`}
                  alt={`${tech} logo`}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
                  <span className="text-xs text-white font-medium capitalize">{tech}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStack.map(({ icon: Icon, title, skills }) => (
            <div
              key={title}
              className="p-6 rounded-lg bg-secondary/30 backdrop-blur-sm hover:bg-secondary/40 transition-colors"
            >
              <div className="flex items-center mb-4">
                <Icon className="text-accent" size={24} />
                <h3 className="text-xl font-semibold ml-3">{title}</h3>
              </div>
              <ul className="space-y-2">
                {skills.map((skill) => (
                  <li key={skill} className="text-text/80">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About 