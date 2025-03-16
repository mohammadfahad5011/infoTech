import HeroSection from '../components/sections/HeroSections'
import AboutSection from '../components/sections/AboutSections'
import TeamSection from '../components/sections/TeamSection'
import SkillsSection from '../components/sections/SkillSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import ContactSection from '../components/sections/ContactSection'
import FaqSection from '../components/sections/FaqSection'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const HomePage = () => {
    return (
        <div className="overflow-hidden">
            <Navbar/>
            <main>
                <HeroSection />
                <AboutSection />
                <TeamSection />
                <SkillsSection />
                <ProjectsSection />
                <TestimonialsSection />
                <ContactSection />
                <FaqSection />
            </main>
            <Footer/>
        </div>
    )
}

export default HomePage