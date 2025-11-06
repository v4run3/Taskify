import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaCamera, FaEye, FaEyeSlash } from "react-icons/fa"
import AuthLayout from "../../components/AuthLayout"
import { validateEmail } from "../../utils/helper"
import ProfilePhotoSelector from "../../components/ProfilePhotoSelector"
import axiosInstance from "../../utils/axioInstance"
import uploadImage from "../../utils/uploadImage"

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
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg">
          <div className="w-full h-2 rounded-t-lg mb-6"
            style={{ background: "linear-gradient(90deg,#0f66f6,#0a4bd6)" }}
          />
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 mx-auto flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#0a4bd6">
                <path d="M12 12a3 3 0 100-6 3 3 0 000 6zM5 13a4 4 0 00-3 1.8V17h8v-2.2A4 4 0 006 13zM19 13a4 4 0 00-3 1.8V17h8v-2.2A4 4 0 0019 13z" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold mt-4">JOIN PROJECT FLOW</h1>
            <p className="text-sm text-gray-500 mt-2">
              Start managing your projects efficiently
            </p>

            <div className="mt-6 flex justify-center">
              <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm text-gray-700 block mb-1">
                Full Name
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-200 input-focus"
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
                className="w-full px-4 py-3 rounded-lg border border-gray-200 input-focus"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 input-focus pr-12"
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
                className="w-full px-4 py-3 rounded-lg border border-gray-200 input-focus"
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
              className="w-full mt-2 py-3 rounded-lg text-white font-semibold"
              style={{
                background: "linear-gradient(90deg,#0f66f6,#0a4bd6)",
                boxShadow: "0 8px 18px rgba(11,76,255,0.12)",
              }}
            >
              SIGN UP
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 underline font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignUp
