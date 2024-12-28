import AboutHero from "@/components/sections/about-hero"
import TeamSection from "@/components/sections/team-section"
import CTA from "@/components/sections/cta"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AboutHero />
      <TeamSection />
      <CTA />
    </div>
  )
}