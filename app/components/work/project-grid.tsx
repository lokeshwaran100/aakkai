import { Project } from "@/types/project"
import ProjectCard from "./project-card"

interface ProjectGridProps {
  projects: Project[]
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          image={project.image}
          category={project.category}
          href={`/work/${project.id}`}
        />
      ))}
    </div>
  )
}