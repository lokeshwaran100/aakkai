"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTestimonials } from "@/hooks/useTestimonials";
import { Quote } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Testimonials() {
  const { testimonials, loading, error } = useTestimonials();

  if (loading) {
    return (
      <section className="py-24 bg-muted/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Skeleton className="h-10 w-2/3 mx-auto mb-4" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="py-24 text-center text-red-500">
        Failed to load testimonials
      </div>
    );
  }

  return (
    <section className="py-24 bg-muted/50">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground">
            Don't just take our word for it - hear from some of our satisfied clients
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author} className="h-full">
              <CardContent className="p-8">
                <Quote className="h-10 w-10 text-primary/20 mb-6" />
                <p className="text-lg mb-8 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}