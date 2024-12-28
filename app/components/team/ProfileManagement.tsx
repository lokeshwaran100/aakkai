"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Profile {
  name: string
  role: string
  email: string
  bio: string
  skills: string[]
}

export default function ProfileManagement() {
  const [profile, setProfile] = useState<Profile>({
    name: 'John Doe',
    role: 'UI/UX Designer',
    email: 'john@example.com',
    bio: 'Experienced designer with a passion for creating beautiful and functional interfaces.',
    skills: ['UI Design', 'User Research', 'Prototyping']
  })

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Profile Information</h2>
      
      <div className="bg-card p-6 rounded-lg space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <Input value={profile.role} onChange={(e) => setProfile({...profile, role: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input value={profile.email} type="email" onChange={(e) => setProfile({...profile, email: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Skills</label>
            <Input value={profile.skills.join(', ')} placeholder="Add skills separated by commas" />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <Textarea 
              value={profile.bio} 
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              rows={4}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  )
}