import { Card, CardContent } from "@/components/ui/card"
import { TEAM_MEMBERS } from "@/lib/constants"

export default function TeamSection() {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => {
            const Icon = member.iconType
            return (
              <Card key={member.role}>
                <CardContent className="pt-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.role}</h3>
                  <p className="text-muted-foreground">{member.expertise}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}