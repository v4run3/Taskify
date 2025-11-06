import React from "react"

const AuthLayout = ({ children }) => {
  return (
    // full-height page, centered content, responsive padding
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 md:px-12">
      {/* allow children to control their own max-width (no max-w-md constraint) */}
      <div className="w-full">{children}</div>
    </div>
  )
}

export default AuthLayout
