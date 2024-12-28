const mongoose = require("mongoose");

// Database connection
// const MONGODB_URI = 'mongodb+srv://admin:admin@main.hecbk.mongodb.net/aakkai?retryWrites=true&w=majority&appName=main';
const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

// Models
const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: {
    type: String,
    enum: ["Lightbulb", "Brush", "Code"],
  },
  href: String,
});

const teamMemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  email: { type: String, unique: true },
  bio: String,
  expertise: String,
  skills: [String],
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

const testimonialSchema = new mongoose.Schema({
  content: String,
  author: String,
  role: String,
  company: String,
});

const projectSchema = new mongoose.Schema({
  title: String,
  image: String,
  category: String,
  description: String,
  challenge: String,
  solution: String,
  results: [String],
  deliverables: [String],
  client: String,
  status: {
    type: String,
    enum: ["in-progress", "completed", "on-hold"],
    default: "in-progress",
  },
  deadline: Date,
});

// Create models
const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);
const TeamMember =
  mongoose.models.TeamMember || mongoose.model("TeamMember", teamMemberSchema);
const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", testimonialSchema);
const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

// Seed data
const services = [
  {
    title: "Brand Strategy",
    description:
      "Strategic planning and positioning to make your brand stand out in today's competitive market",
    icon: "Lightbulb",
    href: "/services/brand-strategy",
  },
  {
    title: "Custom Illustrations",
    description:
      "Hand-crafted illustrations that tell your brand's story and capture your audience's imagination",
    icon: "Brush",
    href: "/services/illustrations",
  },
  {
    title: "UI/UX Design",
    description:
      "Beautiful and functional digital experiences that delight users and drive engagement",
    icon: "Code",
    href: "/services/ui-ux-design",
  },
];

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Brand Strategist",
    email: "sarah@aakkai.com",
    bio: "10+ years experience in brand strategy and marketing",
    expertise: "Strategic planning and brand positioning",
    skills: ["Brand Strategy", "Market Research", "Campaign Planning"],
    status: "active",
  },
  {
    name: "Michael Chen",
    role: "Lead Illustrator",
    email: "michael@aakkai.com",
    bio: "Award-winning illustrator with a passion for storytelling",
    expertise: "Custom illustrations and visual storytelling",
    skills: ["Digital Illustration", "Character Design", "Visual Development"],
    status: "active",
  },
  {
    name: "Emily Rodriguez",
    role: "UI/UX Designer",
    email: "emily@aakkai.com",
    bio: "Specialized in creating intuitive and engaging user experiences",
    expertise: "Digital experiences and interface design",
    skills: ["UI Design", "UX Research", "Prototyping"],
    status: "active",
  },
];

const testimonials = [
  {
    content:
      "Working with Aakkai transformed our brand identity. Their strategic approach and creative execution exceeded our expectations.",
    author: "Sarah Johnson",
    role: "CEO",
    company: "TechVision Inc.",
  },
  {
    content:
      "The team's attention to detail and innovative design solutions helped us stand out in a crowded market.",
    author: "Michael Chen",
    role: "Marketing Director",
    company: "StartUp Co.",
  },
  {
    content:
      "Their UI/UX expertise dramatically improved our user engagement and conversion rates.",
    author: "Emily Rodriguez",
    role: "Product Manager",
    company: "Digital Solutions",
  },
];

const projects = [
  {
    title: "TechVision Rebrand",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113",
    category: "Brand Strategy",
    description: "Complete brand overhaul for a leading tech company",
    challenge: "Modernizing the brand while maintaining recognition",
    solution:
      "Developed a fresh visual identity that honors the company's heritage",
    results: [
      "50% increase in brand recognition",
      "35% improvement in user engagement",
      "25% growth in market share",
    ],
    deliverables: [
      "Brand Guidelines",
      "Logo Package",
      "Marketing Materials",
      "Digital Assets",
    ],
    client: "TechVision Inc.",
    status: "completed",
    deadline: new Date("2024-06-30"),
  },
  {
    title: "StartUp Co. Website",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113",
    category: "UI/UX Design",
    description: "Modern website design with focus on user experience",
    challenge: "Creating an intuitive interface for complex features",
    solution: "User-centered design approach with extensive testing",
    results: [
      "60% reduction in bounce rate",
      "45% increase in conversions",
      "30% improvement in user satisfaction",
    ],
    deliverables: [
      "Wireframes",
      "UI Design",
      "Responsive Layouts",
      "Interactive Prototypes",
    ],
    client: "StartUp Co.",
    status: "in-progress",
    deadline: new Date("2024-07-15"),
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Promise.all([
      Service.deleteMany({}),
      TeamMember.deleteMany({}),
      Testimonial.deleteMany({}),
      Project.deleteMany({}),
    ]);
    console.log("Cleared existing data");

    // Insert new data
    await Promise.all([
      Service.insertMany(services),
      TeamMember.insertMany(teamMembers),
      Testimonial.insertMany(testimonials),
      Project.insertMany(projects),
    ]);

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
