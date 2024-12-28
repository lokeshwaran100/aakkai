"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash } from 'lucide-react'

interface Project {
  id: string
  title: string
  client: string
  status: 'in-progress' | 'completed' | 'on-hold'
  deadline: string
}

export default function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([
    { 
      id: '1', 
      title: 'Website Redesign', 
      client: 'Tech Corp', 
      status: 'in-progress',
      deadline: '2024-04-30'
    },
    { 
      id: '2', 
      title: 'Brand Identity', 
      client: 'StartUp Inc', 
      status: 'completed',
      deadline: '2024-03-15'
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Projects</h2>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

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
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    project.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
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
    </div>
  )
}