import * as React from "react"
import { cn } from "../../lib/utils/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-[#d3ae8b] bg-transparent px-3 py-2 text-sm text-[#d3ae8b] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#d3ae8b]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d3ae8b] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input } 