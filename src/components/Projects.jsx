import { useState, useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

function Projects() {
  // States for project display and filtering
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const videoRef = useRef(null)

  // Check if section is visible in viewport
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "100px"
  })
  const carouselRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Project category filters
  const categories = ['all', 'web', 'mobile', 'design']

  // Animation settings for container elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  // Animation settings for individual items
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        mass: 1
      }
    }
  }

  // Project data with details
  const projects = [
    {
      id: 1,
      title: "E-Librairies",
      category: "web",
      description: "A platform for selling audio books and PDFs, targeting Malagasy readers.",
      image: "elibriaries.svg",
      url: "elibrairies",
      tags: ["PHP", "MySQL", "Symfony"],
      testimonial: {
        text: "E-Librairies has successfully brought a wide range of books to our local community, making learning more accessible.",
        author: "Ihantsa RAKOTONDRANAIVO",
        role: "Founder & Developer",
        avatar: "https://source.unsplash.com/random/100x100/?man"
      },
      stats: {
        users: "5K+",
        transactions: "2K+",
        revenue: "$10K+"
      }
    },
    {
      id: 2,
      title: "M'Speak",
      category: "web",
      description: "An online education platform focusing on teaching English, featuring personalized learning preferences and progress tracking.",
      image: "elearningplatform.svg",
      url: "mspeak.edu",
      tags: ["PHP", "Symfony", "MySQL", "ReactJS"],
      testimonial: {
        text: "This platform has revolutionized how we approach learning English, with an interactive and engaging experience.",
        author: "Ihantsa RAKOTONDRANAIVO",
        role: "Developer",
        avatar: "https://source.unsplash.com/random/100x100/?man"
      }
    },
    {
      id: 3,
      title: "M'speak Mobile",
      category: "mobile",
      description: "A cross-platform mobile app designed to help users practice and improve their English speaking skills using AI-driven conversations.",
      image: "elearningplatform.svg",
      url: "mspeak.edu",
      tags: ["React Native", "MySQL"],
      testimonial: {
        text: "M'speak has made language learning fun and interactive, with real-time feedback on pronunciation and fluency.",
        author: "Ihantsa RAKOTONDRANAIVO",
        role: "Developer & Designer",
        avatar: "https://source.unsplash.com/random/100x100/?man"
      },
      stats: {
        users: "10K+",
        downloads: "5K+",
        rating: "4.7/5"
      }
    },
    {
      id: 4,
      title: "Portfolio",
      category: "design",
      description: "A personalized online portfolio to showcase my web development, design skills, and past projects with a sleek, responsive design.",
      image: "portfolio.png",
      url: "oeka.mg",
      tags: ["Figma", "UI/UX Design"],
      testimonial: {
        text: "This portfolio reflects my journey and skills, making it easy for clients to explore my work in an interactive and visually appealing way.",
        author: "Ihantsa RAKOTONDRANAIVO",
        role: "Designer & Developer",
        avatar: "https://source.unsplash.com/random/100x100/?man"
      },
      stats: {
        views: "1K+",
        projects: "10+",
        feedback: "Positive"
      }
    },
    {
      "id": 5,
      "title": "High Nova",
      "category": "web",
      "description": "A personalized online portfolio to showcase my web development, design skills, and past projects with a sleek, responsive design.",
      "image": "highnova.png",
      "url": "https://highnova.vercel.app/",
      "tags": ["Next.js", "Tailwind CSS", "Figma", "UI/UX Design"],
      "testimonial": {
        "text": "This portfolio reflects my journey and skills, making it easy for clients to explore my work in an interactive and visually appealing way.",
        "author": "Ihantsa RAKOTONDRANAIVO",
        "role": "Designer & Developer",
        "avatar": "https://source.unsplash.com/random/100x100/?man"
      },
      "stats": {
        "views": "1K+",
        "projects": "10+",
        "feedback": "Positive"
      }
    },
    {
      "id": 6,
      "title": "High Nova",
      "category": "design",
      "description": "A personalized online portfolio to showcase my web development, design skills, and past projects with a sleek, responsive design.",
      "image": "highnova.png",
      "url": "https://www.figma.com/proto/D0W3LkbvcHDyrVgTCnJwlU/HighNova?node-id=1-2&p=f&t=fC9RshqxVY0jYw8W-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
      "tags": ["Next.js", "Tailwind CSS", "Figma", "UI/UX Design"],
      "testimonial": {
        "text": "This portfolio reflects my journey and skills, making it easy for clients to explore my work in an interactive and visually appealing way.",
        "author": "Ihantsa RAKOTONDRANAIVO",
        "role": "Designer & Developer",
        "avatar": "https://source.unsplash.com/random/100x100/?man"
      },
      "stats": {
        "views": "1K+",
        "projects": "10+",
        "feedback": "Positive"
      }
    },
    {
      id: 7,
      title: "Assistant Théologique Vocal",
      category: "mobile",
      description: "Application Flutter connectée à Gemini pour répondre à des questions bibliques avec synthèse vocale Google TTS.",
      image: "theological-ai.png",
      url: "https://github.com/IhantsaFana/personal_assist_voice",
      tags: ["Flutter", "Gemini", "Google TTS", "Django"],
      testimonial: {
        text: "Un outil spirituel interactif et moderne, avec une expérience vocale fluide.",
        author: "Ihantsa RAKOTONDRANAIVO",
        role: "Concepteur & Développeur",
        avatar: "https://source.unsplash.com/random/100x100/?priest"
      },
      stats: {
        users: "2K+",
        feedback: "Très Positif",
        rating: "4.9/5"
      }
    },
    {
      id: 8,
      title: "Comptabilité IA Madagascar",
      category: "web",
      description: "Pipeline OCR + IA générative pour automatiser l’écriture comptable selon le Plan Comptable Général de Madagascar.",
      image: "madagascar-compta.png",
      url: "https://github.com/IhantsaFana/compta-ia",
      tags: ["Python", "Gemini", "Google Vision", "Flask"],
      testimonial: {
        text: "Une révolution pour les PME malgaches qui veulent automatiser leur comptabilité.",
        author: "Ihantsa RAKOTONDRANAIVO",
        role: "Architecte IA & Dev",
        avatar: "https://source.unsplash.com/random/100x100/?finance"
      },
      stats: {
        entreprises: "5+",
        "documents traités": "1K+",
        impact: "Optimisation x3"
      }
    },
    {
      id: 9,
      title: "Play to Learn – Hackathon ESMIA",
      category: "design",
      description: "Jeu 3D éducatif pour apprendre l’entrepreneuriat, développé en 48h lors d’un hackathon.",
      image: "playtolearn.png",
      url: "https://github.com/IhantsaFana/entreprenariatquest",
      tags: ["Unity", "C#", "Design Thinking"],
      testimonial: {
        text: "Une immersion innovante dans l’apprentissage de l’entrepreneuriat pour les étudiants.",
        author: "Jury Hackathon ESMIA",
        role: "Participant gagnant",
        avatar: "https://source.unsplash.com/random/100x100/?student"
      },
      stats: {
        hackathon: "1er Prix",
        participants: "100+",
        durée: "48h"
      }
    },
  ]

  // Filter projects based on selected category
  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter)

  // Get featured project if any
  const featuredProject = projects.find(p => p.featured)

  // Check scroll position and update button states
  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  // Handle scroll events
  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('scroll', updateScrollButtons)
      // Initial check
      updateScrollButtons()
      return () => carousel.removeEventListener('scroll', updateScrollButtons)
    }
  }, [])

  // Update scroll buttons when projects are filtered
  useEffect(() => {
    updateScrollButtons()
  }, [filteredProjects])

  // Scroll handlers
  const handlePrevClick = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth
      carouselRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const handleNextClick = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section
      ref={ref}
      id="projects"
      className="relative py-24 bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#1A1A1A] overflow-hidden"
    >
      {/* Dotted background with animation */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at center, #6DBE45 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            willChange: 'transform'
          }}
          animate={inView ? {
            backgroundPosition: ['0% 0%', '100% 100%']
          } : {}}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity
          }}
        />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and category filters */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-5xl lg:text-6xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            Our <span className="text-[#6DBE45]">Projects</span>
          </motion.h2>

          {/* Filter Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={containerVariants}
          >
            {categories.map((category, index) => (
              <motion.button
                key={`${category}-${inView}`}
                onClick={() => setActiveFilter(category)}
                className={`
                  px-8 py-3 rounded-full text-sm font-medium
                  backdrop-blur-sm border transform-gpu
                  transition-all duration-300
                  ${activeFilter === category
                    ? 'bg-[#6DBE45] text-white border-[#6DBE45] shadow-lg shadow-[#6DBE45]/20'
                    : 'bg-white/5 text-white/80 border-white/10 hover:border-[#6DBE45]/50'
                  }
                `}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Featured project showcase */}
        {featuredProject && (
          <motion.div
            className="mb-20"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* ... featured project content ... */}
          </motion.div>
        )}

        {/* Project cards carousel */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Container with padding for buttons */}
          <div className="px-4 sm:px-12 md:px-16">
            {/* Scrollable project list */}
            <div
              ref={carouselRef}
              className="flex overflow-x-auto gap-4 sm:gap-8 snap-x snap-mandatory hide-scrollbar pb-12"
            >
              {filteredProjects.map((project, index) => (
                // Individual project card
                <motion.div
                  key={`${project.id}-${activeFilter}`}
                  className="flex-none w-[300px] sm:w-[350px] snap-center group relative rounded-xl 
                    border border-white/10 bg-white/5 backdrop-blur-sm
                    transform-gpu transition-all duration-300
                    hover:border-[#6DBE45]/50 hover:shadow-lg hover:shadow-[#6DBE45]/5"
                  variants={itemVariants}
                  custom={index}
                  whileHover={{
                    y: -8,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }
                  }}
                >
                  {/* Project Image */}
                  <div className="relative aspect-video overflow-hidden rounded-t-xl">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{
                        scale: 1.1,
                        transition: {
                          duration: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Project Info */}
                  <motion.div
                    className="p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4"
                    initial={{ opacity: 0.9 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Category Tag */}
                    <div className="text-xs sm:text-sm font-medium text-[#6DBE45]">
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-white/70 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs sm:text-sm bg-white/5 text-white/80 rounded-full
                            border border-white/10 whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View Project Button */}
                    <button
                      className="w-full mt-4 py-2.5 sm:py-3 px-4 sm:px-6 rounded-full 
                        bg-[#6DBE45]/20 text-[#6DBE45] text-sm sm:text-base
                        border border-[#6DBE45]/30 hover:bg-[#6DBE45]/30 
                        transition-colors backdrop-blur-sm"
                      onClick={() => {
                        setSelectedProject(project);
                        window.location.href = `https://github.com/IhantsaFana/${project.url}`;
                      }}
                    >
                      View Project
                    </button>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {canScrollLeft && (
            <motion.button
              className="absolute left-0 top-1/2 -translate-y-1/2
                bg-white/10 backdrop-blur-sm p-4 rounded-full
                hover:bg-[#6DBE45]/20 transition-all duration-300
                border border-white/20 transform-gpu
                hover:shadow-lg hover:shadow-[#6DBE45]/20
                disabled:opacity-50 disabled:cursor-not-allowed"
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevClick}
              aria-label="Previous projects"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          )}

          {canScrollRight && (
            <motion.button
              className="absolute right-0 top-1/2 -translate-y-1/2
                bg-white/10 backdrop-blur-sm p-4 rounded-full
                hover:bg-[#6DBE45]/20 transition-all duration-300
                border border-white/20 transform-gpu
                hover:shadow-lg hover:shadow-[#6DBE45]/20
                disabled:opacity-50 disabled:cursor-not-allowed"
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNextClick}
              aria-label="Next projects"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects 
