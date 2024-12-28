import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-black">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1611162617474-5b21e879e113"
          alt="Hero background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
      </div>

      <div className="container relative z-10 py-20">
        <div className="max-w-3xl space-y-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Crafting Visual Stories That{" "}
            <span className="text-primary">Inspire</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            We bring brands to life through stunning visuals and strategic
            design
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="animate-scale">
              <Link href="/contact">Start Your Project</Link>
            </Button>
            <Button size="lg" variant="outline" className="animate-scale">
              <Link href="/work">View Our Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
