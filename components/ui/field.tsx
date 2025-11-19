import * as React from "react"
import { cn } from "./utils"

export interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FieldGroup({ className, ...props }: FieldGroupProps) {
  return (
    <div
      className={cn("space-y-6", className)}
      {...props}
    />
  )
}

export interface FieldSetProps extends React.HTMLAttributes<HTMLFieldSetElement> {}

export function FieldSet({ className, ...props }: FieldSetProps) {
  return (
    <fieldset
      className={cn("space-y-4", className)}
      {...props}
    />
  )
}

export interface FieldLegendProps extends React.HTMLAttributes<HTMLLegendElement> {}

export function FieldLegend({ className, ...props }: FieldLegendProps) {
  return (
    <legend
      className={cn("text-lg font-semibold text-gray-900", className)}
      {...props}
    />
  )
}

export interface FieldDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <p
      className={cn("text-sm text-gray-600 mt-1", className)}
      {...props}
    />
  )
}

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal"
}

export function Field({ className, orientation = "vertical", ...props }: FieldProps) {
  return (
    <div
      className={cn(
        "w-full",
        orientation === "horizontal"
          ? "flex items-center gap-3"
          : "space-y-2",
        className
      )}
      {...props}
    />
  )
}

export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <label
      className={cn("block text-sm font-medium text-gray-900", className)}
      {...props}
    />
  )
}

export interface FieldSeparatorProps extends React.HTMLAttributes<HTMLHRElement> {}

export function FieldSeparator({ className, ...props }: FieldSeparatorProps) {
  return (
    <hr
      className={cn("border-t border-gray-200", className)}
      {...props}
    />
  )
}
