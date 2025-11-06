import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineMail } from "react-icons/ai"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import AuthLayout from "../../components/AuthLayout"
import { validateEmail } from "../../utils/helper"
import axiosInstance from "../../utils/axioInstance"
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/slice/userSlice"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState(null)
  const { loading } = useSelector((state) => state.user)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!password) {
      setError("Please enter the password")
      return
    }

    setError(null)

    try {
      dispatch(signInStart())
      const response = await axiosInstance.post(
        "/auth/sign-in",
        { email, password },
        { withCredentials: true }
      )

      if (response.data.role === "admin") {
        dispatch(signInSuccess(response.data))
        navigate("/admin/dashboard")
      } else {
        dispatch(signInSuccess(response.data))
        navigate("/user/dashboard")
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
        dispatch(signInFailure(error.response.data.message))
      } else {
        setError("Something went wrong. Please try again!")
        dispatch(signInFailure("Something went wrong. Please try again!"))
      }
    }
  }

  return (
    <AuthLayout>
      <div className="flex items-center justify-center w-full">
        {/* Key change: explicit card max width to increase breadth */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-[1100px] flex flex-col md:flex-row">
          {/* LEFT BLUE PANEL - hidden on small screens */}
          <div
            className="hidden md:flex flex-col justify-center items-start p-16 text-white w-[56%]"
            style={{
              background:
                "linear-gradient(135deg, #0a4bd6 0%, #0f66f6 50%, #0b4a8b 100%)",
            }}
          >
            <div className="flex items-center mb-8">
              <div className="rounded-full bg-yellow-400 w-12 h-12 flex items-center justify-center mr-5 shadow-md">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 7l3 10h12l3-10-4 3-4-6-4 6-4-3z"
                    fill="#fff"
                    opacity="0.9"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-extrabold tracking-wide">WELCOME</h1>
            </div>

            <p className="text-lg opacity-95 max-w-lg leading-relaxed">
              Login to your <strong>Project Flow</strong> dashboard and manage
              your work efficiently with intelligent automation and seamless
              team collaboration.
            </p>
          </div>

          {/* RIGHT FORM PANEL */}
          <div className="w-full md:w-[44%] bg-white p-10 md:p-16 flex flex-col justify-center">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
                Sign In
              </h2>
              <p className="text-sm text-gray-500">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm text-gray-700">Email Address</label>
                <div className="mt-2 relative">
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <AiOutlineMail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-700">Password</label>
                <div className="mt-2 relative">
                  <input
                    type={showPass ? "text" : "password"}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm"
                  >
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              {loading ? (
                <div className="w-full text-center bg-blue-600 text-white py-3 rounded-lg animate-pulse">
                  Loading...
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-lg text-white font-semibold transition-all duration-200 hover:opacity-90"
                  style={{
                    background: "linear-gradient(90deg,#0f66f6,#0a4bd6)",
                    boxShadow: "0 8px 18px rgba(11,76,255,0.25)",
                  }}
                >
                  Sign In
                </button>
              )}

              <p className="text-center text-sm text-gray-500 mt-3">
                Don’t have an account?{" "}
                <Link to="/signup" className="font-medium text-blue-600 underline">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login
