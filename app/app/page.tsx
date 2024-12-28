import Hero from "@/components/sections/hero"
import Services from "@/components/sections/services"
import TeamShowcase from "@/components/sections/team-showcase"
import Testimonials from "@/components/sections/testimonials"
import CTA from "@/components/sections/cta"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Services />
      <TeamShowcase />
      <Testimonials />
      <CTA />
    </div>
  )
}