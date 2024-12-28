"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function TeamShowcase() {
  const { members, loading, error } = useTeamMembers();

  if (loading) {
    return (
      <section className="py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Skeleton className="h-10 w-2/3 mx-auto mb-4" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-96 w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="py-24 text-center text-red-500">
        Failed to load team members
      </div>
    );
  }

  return (
    <section className="py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Experts</h2>
          <p className="text-xl text-muted-foreground">
            Talented professionals dedicated to bringing your vision to life
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {members.map((member) => (
            <Card key={member.id} className="group overflow-hidden">
              <div className="relative h-80">
                <Image
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                  alt={member.role}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardContent className="relative pt-6">
                <h3 className="text-xl font-semibold mb-2">{member.role}</h3>
                <p className="text-muted-foreground leading-relaxed">{member.expertise}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}