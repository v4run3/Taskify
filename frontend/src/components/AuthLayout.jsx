import React from "react"

const AuthLayout = ({ children }) => {
  return (
    // keep layout centering only — do NOT set page background or side padding here
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full">{children}</div>
    </div>
  )
}

export default AuthLayout
