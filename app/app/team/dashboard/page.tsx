"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import ProfileManagement from '@/components/team/ProfileManagement'

export default function TeamDashboard() {
  const [isAvailable, setIsAvailable] = useState(true)

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Team Dashboard</h1>
          <Button
            onClick={() => setIsAvailable(!isAvailable)}
            variant={isAvailable ? 'default' : 'outline'}
          >
            {isAvailable ? 'Available' : 'Unavailable'}
          </Button>
        </div>

        <div className="space-y-8">
          <ProfileManagement />
          
          <div className="bg-card p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Current Projects</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                <div>
                  <h3 className="font-medium">Website Redesign</h3>
                  <p className="text-sm text-muted-foreground">Tech Corp</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  In Progress
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                <div>
                  <h3 className="font-medium">Brand Identity</h3>
                  <p className="text-sm text-muted-foreground">StartUp Inc</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}