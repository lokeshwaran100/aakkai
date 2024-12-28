"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { FormField, FormControl, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Message sent successfully!")
    form.reset()
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FormField className="space-y-2">
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input
            {...form.register("name")}
            placeholder="Your name"
          />
        </FormControl>
        {form.formState.errors.name && (
          <FormMessage>{form.formState.errors.name.message}</FormMessage>
        )}
      </FormField>

      <FormField className="space-y-2">
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input
            {...form.register("email")}
            type="email"
            placeholder="your@email.com"
          />
        </FormControl>
        {form.formState.errors.email && (
          <FormMessage>{form.formState.errors.email.message}</FormMessage>
        )}
      </FormField>

      <FormField className="space-y-2">
        <FormLabel>Phone</FormLabel>
        <FormControl>
          <Input
            {...form.register("phone")}
            type="tel"
            placeholder="Your phone number"
          />
        </FormControl>
        {form.formState.errors.phone && (
          <FormMessage>{form.formState.errors.phone.message}</FormMessage>
        )}
      </FormField>

      <FormField className="space-y-2">
        <FormLabel>Message</FormLabel>
        <FormControl>
          <Textarea
            {...form.register("message")}
            placeholder="How can we help?"
          />
        </FormControl>
        {form.formState.errors.message && (
          <FormMessage>{form.formState.errors.message.message}</FormMessage>
        )}
      </FormField>

      <Button type="submit" className="w-full">Send Message</Button>
    </form>
  )
}