'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react'

interface Project {
  title: string
  description: string
  images: string[]
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  type: 'work' | 'personal'
}

const projects: Project[] = [
  {
    title: 'PortWatch | IMF',
    description: 'PortWatch is an open platform designed to monitor and simulate disruptions to maritime trade flows. The platform helps policymakers and the public assess the impact of realized and future trade shocks, such as natural disasters, based on real-time data sourced from the UNGP.',
    images: ['/images/portwatch-1.webp', '/images/portwatch-2.webp'],
    tags: ['ESRI', 'HTML5', 'Javascript', 'CSS3'],
    /* githubUrl: 'https://github.com', */
    liveUrl: 'https://portwatch.imf.org',
    type: 'work',
  },
  {
    title: 'LIC DSF | IMF',
    description: 'Keeping debt under control in low-income countries (LICs) is important for global economic stability, and a priority for the World Bank and the IMF. This is why, together, they developed the Debt Sustainability Framework (DSF) — but how did we make implementation easier for the country authorities who could most benefit from its use?',
    images: ['/images/licdsf-1.webp', '/images/licdsf-2.webp'],
    tags: ['HTML5', 'CSS3', 'Highcharts', 'jQuery', 'Javascript'],
    /* githubUrl: 'https://github.com', */
    liveUrl: 'https://www.imf.org/en/publications/dsa',
    type: 'work',
  },
  {
    title: 'Climate Change Indicators Dashboard | IMF',
    description: 'The Climate Change Indicators Dashboard was created to address a gap in global coverage of climate change indicators related to economic surveillance.',
    images: ['/images/climate-1.webp'],
    tags: ['ESRI', 'HTML5', 'Javascript', 'CSS3'],
    /* githubUrl: 'https://github.com', */
    liveUrl: 'https://www.imf.org/climate-change-indicators',
    type: 'work',
  },
  {
    title: 'SDG Financing Tool | IMF',
    description: 'The IMF SDG Financing Tool is an interactive scenario builder that can be used to assess the macroeconomic coherence of countries\' SDG financing plans. It will help stakeholders advance long-term comprehensive plans, evaluate the impact of policies, and compare financing options.',
    images: ['/images/sdg-1.webp', '/images/sdg-2.webp'],
    tags: ['HTML5', 'CSS3', 'ASP.net', 'jQuery', 'Javascript'],
    /* githubUrl: 'https://github.com', */
    liveUrl: 'https://sdgfit.imf.org/sdginfopages/index.html',
    type: 'work',
  },
  {
    title: 'Small-Medium Enterprise Financial Inclusion Tool | IMF',
    description: 'The key role of small to medium enterprises (SMEs) in regional economic growth is often overlooked. The IMF sees increased economic inclusion for SMEs as a priority in stimulating growth and reducing inequality in all regions, particularly the Middle East.',
    images: ['/images/sme-1.webp'],
    tags: ['HTML5', 'CSS3', 'Chart.js', 'jQuery', 'Javascript'],
    /* githubUrl: 'https://github.com', */
    liveUrl: 'https://www.imf.org/sme-financial-inclusion-tool',
    type: 'work',
  },
  {
    title: 'Coastal Management Services | Freelance',
    description: 'Coastal Manangement Services is a platform that allows users to manage their coastal properties. The came to wanting to create a platform that allows them to manage their coastal properties and also allows them to manage their customers and their bookings without 3rd party help.',
    images: ['/images/coastal-1.webp'],
    tags: ['React','HTML5', 'CSS3', 'Javascript'],
    /* githubUrl: 'https://github.com', */
    liveUrl: 'https://www.rentcoastal.com',
    type: 'work',
  },
  {
    title: 'Spear Production | Freelance',
    description: 'Jerold Blackwell; owner of Spear Production, wanted a website to showcase his work and services. He wanted a website that was easy to update and maintain, and also wanted a website that was easy to find on search engines.',
    images: ['/images/spear-1.webp'],
    tags: ['Wordpress','HTML5', 'CSS3', 'Javascript', 'SEO', 'Google Analytics'],
    /* githubUrl: 'https://github.com', */
    liveUrl: 'https://spearstudiotv.com/',
    type: 'work',
  },
  {
    title: 'Sl1mghost | Freelance',
    description: 'Greg aka Sl1mghost is a professional gamer and content creator. He wanted a website to showcase his work and the popular Madden NFL Tournaments he runs. He needed a way to not only allow players to sign up but to keep them up to date on the latest tournaments and leaderboards for the Gulag Tournaments.',
    images: ['/images/slim-1.webp'],
    tags: ['Wordpress', 'WP Plugin Customization', 'HTML5', 'CSS3', 'Javascript'],
    /* githubUrl: 'https://github.com', */
    liveUrl: 'https://spearstudiotv.com/',
    type: 'work',
  },
  {
    title: 'Web App Coming Soon | Personal',
    description: 'A New App is coming soon!',
    images: ['https://picsum.photos/800/600?random=3'],
    tags: ['React', 'Next.js', 'Mobile Responsive', 'CSS Animation'],
    /* githubUrl: 'https://github.com', */
    type: 'personal',
  },
  {
    title: 'RGG Studio | Personal',
    description: 'My first React, Next.js and Tailwind CSS site.  I needed something to showcase my work and services, but also a way to put some new learned skills to the test.',
    images: ['/images/hero-bg-2.png'],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    /* githubUrl: 'https://github.com', */
    liveUrl: '#Home',
    type: 'personal',
  },
]

const ProjectCard = ({ project }: { project: Project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  return (
    <div className="group relative overflow-hidden rounded-lg bg-secondary/30 backdrop-blur-sm">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.images[currentImageIndex]}
          alt={`${project.title} - Image ${currentImageIndex + 1}`}
          fill={true}
          quality={90}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={currentImageIndex === 0}
          className="object-cover object-top transition-transform duration-300 group-hover:scale-110"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        />
        {project.images.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-primary mb-2">{project.title}</h3>
        <p className="text-text/80 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-sm rounded-full bg-primary text-[#1a1f36] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <Github size={20} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

const Projects = () => {
  const workProjects = projects.filter((p) => p.type === 'work')
  const personalProjects = projects.filter((p) => p.type === 'personal')

  return (
    <>
      <section id="work" className="py-20 dot-pattern">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-primary mb-8 text-center">Work Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section id="personal" className="py-20 dot-pattern">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-primary mb-8 text-center">Personal Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {personalProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Projects 