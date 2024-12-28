import dynamic from "next/dynamic";
const DContactForm = dynamic(() => import("@/components/forms/contact-form"), {
  ssr: false,
});

export default function ContactPage() {
  return (
    <div className="container max-w-2xl py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-xl text-muted-foreground">
          Ready to start your project? We'd love to hear from you.
        </p>
      </div>
      <DContactForm />
    </div>
  );
}
