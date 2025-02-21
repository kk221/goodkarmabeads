"use client"

export default function LayoutWrapper({ children }) {
  return (
    <div className="flex min-h-screen">
      {children}
    </div>
  )
} 