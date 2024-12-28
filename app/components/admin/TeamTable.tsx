import { TeamMember } from "@/types/team"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash } from "lucide-react"

interface TeamTableProps {
  members: TeamMember[]
}

export default function TeamTable({ members }: TeamTableProps) {
  return (
    <div className="bg-card rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id} className="border-t">
              <td className="px-4 py-3">{member.name}</td>
              <td className="px-4 py-3">{member.role}</td>
              <td className="px-4 py-3">{member.email}</td>
              <td className="px-4 py-3">
                <Badge variant={member.status === 'active' ? 'success' : 'error'}>
                  {member.status}
                </Badge>
              </td>
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