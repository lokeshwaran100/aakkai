import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600" />
      <div className="absolute inset-0 bg-grid-white/10" />

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center text-white space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-xl text-white/80 leading-relaxed">
            Let's create something extraordinary together. Get in touch with us
            today and take the first step towards elevating your brand.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="default" className="min-w-[200px]">
              <Link href="/contact">Start Your Project</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-w-[200px] bg-transparent text-white border-white hover:bg-white/10"
            >
              <Link href="/work">View Our Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
