"use client"

import { createContext, useContext, useId } from "react"
import { cn } from "@/lib/utils"

const FormContext = createContext<{ id: string }>({ id: "" })

export function FormField({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const id = useId()
  return (
    <FormContext.Provider value={{ id }}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </FormContext.Provider>
  )
}

export function FormLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { id } = useContext(FormContext)
  return (
    <label
      htmlFor={id}
      className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
    >
      {children}
    </label>
  )
}

export function FormControl({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { id } = useContext(FormContext)
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export function FormMessage({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <p className={cn("text-sm font-medium text-destructive", className)}>
      {children}
    </p>
  )
}