"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import TeamManagement from '@/components/admin/TeamManagement'
import ProjectManagement from '@/components/admin/ProjectManagement'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('team')

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="flex space-x-4 mb-8">
        <Button 
          variant={activeTab === 'team' ? 'default' : 'outline'}
          onClick={() => setActiveTab('team')}
        >
          Team Members
        </Button>
        <Button 
          variant={activeTab === 'projects' ? 'default' : 'outline'}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </Button>
      </div>

      {activeTab === 'team' && <TeamManagement />}
      {activeTab === 'projects' && <ProjectManagement />}
    </div>
  )
}