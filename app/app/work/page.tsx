import { Button } from "@/components/ui/button"
import ProjectGrid from "@/components/work/project-grid"
import { projects } from "@/lib/projects"

export default function WorkPage() {
  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Our Work</h1>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">Type of Client</Button>
            <Button variant="outline">Type of Work</Button>
            <Button variant="outline">All Projects</Button>
          </div>
        </div>
        
        <ProjectGrid projects={projects} />
      </div>
    </div>
  )
}