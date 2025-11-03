import { SEO } from '@/shared/components/ui/SEO';
import { Hero } from '@/shared/components/sections/Hero';
import { AboutHero } from '@/features/about/components/AboutHero';
import { TechLogos } from '@/features/about/components/TechLogos';
import { Timeline } from '@/features/about/components/Timeline';
import { Certifications } from '@/features/about/components/Certifications';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactForm } from '@/features/contact/components/ContactForm';
import { ContactInfo } from '@/features/contact/components/ContactInfo';
import { Container } from '@/shared/components/ui/Container';

export function Home() {
  return (
    <>
      <SEO />
      
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <section id="about" className="py-20">
        <AboutHero />
      </section>
      
      {/* Experience Section */}
      <section id="experience" className="py-20">
        <Timeline />
      </section>
      
      {/* Skills Section */}
      <section id="skills" className="py-20">
        <TechLogos />
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="py-20">
        <ProjectsSection />
      </section>
      
      {/* Certifications Section */}
      <section id="certifications" className="py-20">
        <Certifications />
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Contact
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Vous avez un projet ? Une question ? N'hésitez pas à me contacter.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Envoyez-moi un message
              </h3>
              <ContactForm />
            </div>
            <ContactInfo />
          </div>
        </Container>
      </section>
    </>
  );
}

