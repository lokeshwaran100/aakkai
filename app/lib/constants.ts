import { Brush, Code, Lightbulb } from "lucide-react"

export const SITE_CONFIG = {
  name: "Aakkai",
  description: "Professional brand strategy, UI/UX design, and creative services",
  url: "https://aakkai.com",
  ogImage: "https://aakkai.com/og.jpg",
}

export const SERVICES = [
  {
    title: "Brand Strategy",
    description: "Strategic planning and positioning to make your brand stand out",
    href: "/services/brand-strategy",
  },
  {
    title: "Custom Illustrations",
    description: "Hand-crafted illustrations that tell your brand's story",
    href: "/services/illustrations",
  },
  {
    title: "UI/UX Design",
    description: "Beautiful and functional digital experiences",
    href: "/services/ui-ux-design",
  },
]

export const NAV_ITEMS = [
  { title: "Home", href: "/" },
  { title: "Work", href: "/work" },
  { title: "About", href: "/about" },
  { title: "Contact Us", href: "/contact" },
]

export type TeamMember = {
  role: string
  expertise: string
  iconType: typeof Lightbulb | typeof Brush | typeof Code
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    role: "Brand Strategist",
    expertise: "Strategic planning and brand positioning",
    iconType: Lightbulb,
  },
  {
    role: "Illustration Artist",
    expertise: "Custom illustrations and visual storytelling",
    iconType: Brush,
  },
  {
    role: "UI/UX Designer",
    expertise: "Digital experiences and interface design",
    iconType: Code,
  },
]

export const TESTIMONIALS = [
  {
    content: "Working with Aakkai transformed our brand identity. Their strategic approach and creative execution exceeded our expectations.",
    author: "Sarah Johnson",
    role: "CEO, TechVision Inc.",
  },
  {
    content: "The team's attention to detail and innovative design solutions helped us stand out in a crowded market.",
    author: "Michael Chen",
    role: "Marketing Director, StartUp Co.",
  },
  {
    content: "Their UI/UX expertise dramatically improved our user engagement and conversion rates.",
    author: "Emily Rodriguez",
    role: "Product Manager, Digital Solutions",
  },
]