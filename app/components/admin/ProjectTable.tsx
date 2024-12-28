import { Project } from "@/types/project"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash } from "lucide-react"

interface ProjectTableProps {
  projects: Project[]
}

export default function ProjectTable({ projects }: ProjectTableProps) {
  return (
    <div className="bg-card rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left">Project</th>
            <th className="px-4 py-3 text-left">Client</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Deadline</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-t">
              <td className="px-4 py-3">{project.title}</td>
              <td className="px-4 py-3">{project.client}</td>
              <td className="px-4 py-3">
                <Badge 
                  variant={
                    project.status === 'in-progress' ? 'default' :
                    project.status === 'completed' ? 'success' : 'warning'
                  }
                >
                  {project.status}
                </Badge>
              </td>
              <td className="px-4 py-3">{project.deadline}</td>
              <td className="px-4 py-3 text-right">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}