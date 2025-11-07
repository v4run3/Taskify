import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import AuthLayout from "../../components/AuthLayout"
import { validateEmail } from "../../utils/helper"
import ProfilePhotoSelector from "../../components/ProfilePhotoSelector"
import axiosInstance from "../../utils/axioInstance"
import uploadImage from "../../utils/uploadImage"
import logo from "../../../public/logo.svg"

const SignUp = () => {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [adminInviteToken, setAdminInviteToken] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [profilePic, setProfilePic] = useState(null)

  const buildSignupData = async (profileImageUrl) => {
    const data = {
      name: fullName,
      email,
      password,
      profileImageUrl,
    }
    if (adminInviteToken && adminInviteToken.trim() !== "")
      data.adminJoinCode = adminInviteToken
    return data
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!fullName) return setError("Please enter the name")
    if (!validateEmail(email))
      return setError("Please enter a valid email address")
    if (!password) return setError("Please enter the password")
    setError(null)

    try {
      let profileImageUrl = ""
      if (profilePic) {
        const uploadRes = await uploadImage(profilePic)
        profileImageUrl = uploadRes.imageUrl || ""
      }

      const data = await buildSignupData(profileImageUrl)
      const response = await axiosInstance.post("/auth/sign-up", data)

      if (response.data) navigate("/login")
    } catch (error) {
      if (error.response && error.response.data.message)
        setError(error.response.data.message)
      else setError("Something went wrong. Please try again!")
    }
  }

  return (
    <AuthLayout>
      {/* Full gradient background based on image */}
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          background:
            "linear-gradient(135deg, #00c9ff 0%, #0090ff 50%, #7a00ff 100%)",
        }}
      >
        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg h-[90vh] flex flex-col overflow-hidden">
          {/* Gradient bar at top */}
          <div
            className="w-full h-2"
            style={{ background: "linear-gradient(90deg,#0f66f6,#0a4bd6)" }}
          />

          {/* Card content */}
          <div className="flex flex-col justify-between h-full p-6 sm:p-8">
            {/* Header */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                <img
                  src={logo}
                  alt="Project Flow Logo"
                  className="w-14 h-14 object-contain"
                />
              </div>

              <h1 className="text-2xl font-bold text-gray-800">
                Join Taskify
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your Tasks efficiently
              </p>

              <div className="mt-4 flex justify-center">
                <ProfilePhotoSelector
                  image={profilePic}
                  setImage={setProfilePic}
                />
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-3 flex-grow overflow-y-auto"
            >
              <div>
                <label className="text-sm text-gray-700 block mb-1">
                  Full Name
                </label>
                <input
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-gray-700 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-gray-700 block mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-700 block mb-1">
                  Admin Invite Token (Optional)
                </label>
                <input
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Leave blank if not admin"
                  value={adminInviteToken}
                  onChange={(e) => setAdminInviteToken(e.target.value)}
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full mt-3 py-2.5 rounded-lg text-white font-semibold transition-all duration-200 hover:opacity-90"
                style={{
                  background: "linear-gradient(90deg,#0f66f6,#0a4bd6)",
                  boxShadow: "0 6px 14px rgba(11,76,255,0.18)",
                }}
              >
                Sign Up
              </button>

              <p className="text-center text-sm text-gray-500 mt-2">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 underline font-medium"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignUp
