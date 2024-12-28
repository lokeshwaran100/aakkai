import { projects } from "@/lib/projects"
import { notFound } from "next/navigation"
import Image from "next/image"

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id)
  
  if (!project) {
    notFound()
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="relative aspect-video">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
            <p className="text-lg text-muted-foreground">{project.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Challenge</h2>
              <p>{project.challenge}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Solution</h2>
              <p>{project.solution}</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Results</h2>
            <ul className="list-disc list-inside space-y-2">
              {project.results.map((result) => (
                <li key={result}>{result}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Deliverables</h2>
            <ul className="list-disc list-inside space-y-2">
              {project.deliverables.map((deliverable) => (
                <li key={deliverable}>{deliverable}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}