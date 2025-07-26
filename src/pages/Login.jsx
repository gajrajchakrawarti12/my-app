"use client"

import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Shield, Loader2, RefreshCw, User, Lock } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Alert, AlertDescription } from "../components/ui/alert"
import { useAuth } from "../context/AuthContext" // Adjust path if needed


export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    captchaInput: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [captcha, setCaptcha] = useState("")
  const { login, isLoading, user } = useAuth();
  const navigate = useNavigate();

  const generateCaptcha = useCallback(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz"
    let result = ""
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptcha(result)
  }, [])

  useEffect(() => {
    if (user) {
      navigate("/dashboard") // Redirect if already logged in
    }
    generateCaptcha()
  }, [user, navigate, generateCaptcha])

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      const trimmedUsername = formData.username.trim()

      if (formData.captchaInput.trim() !== captcha) {
        setError("Captcha does not match")
        setFormData((prev) => ({ ...prev, captchaInput: "" }))
        generateCaptcha()
        return
      }

      if (!trimmedUsername || !formData.password) {
        setError("Please fill in all fields")
        return
      }

      try {
        const success = await login(trimmedUsername, formData.password)
        if (success) {
          navigate("/dashboard")
        } else {
          setError("Invalid username or password")
          generateCaptcha()
        }
      } catch (err) {
        if (err.message?.includes("Network")) {
          setError("Network error. Please try again later.")
        } else {
          setError("Invalid username or password")
        }
        generateCaptcha()
      }
    },
    [formData, login, navigate, captcha, generateCaptcha],
  )

  const refreshCaptcha = () => {
    setFormData((prev) => ({ ...prev, captchaInput: "" }))
    generateCaptcha()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-10 w-10 text-blue-600 mr-3" />
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
          </div>
          <CardDescription className="text-gray-600">
            Sign in to your Cyber Rakshak account to continue protecting your digital world.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4" variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                className="pl-4"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center">
                <Lock className="h-4 w-4 mr-1" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            {/* Captcha */}
            <div className="space-y-2">
              <Label htmlFor="captcha">Security Verification</Label>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                <div className="flex space-x-1 text-lg font-mono">
                  {captcha.split("").map((char, idx) => {
                    const colors = ["text-blue-600", "text-green-600", "text-purple-600", "text-orange-600"]
                    return (
                      <span key={idx} className={`${colors[idx % colors.length]} font-bold text-xl`}>
                        {char}
                      </span>
                    )
                  })}
                </div>
                <Button type="button" variant="ghost" size="sm" onClick={refreshCaptcha}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <Input
                id="captcha"
                type="text"
                placeholder="Enter the characters above"
                value={formData.captchaInput}
                onChange={(e) => handleChange("captchaInput", e.target.value)}
                className="font-mono"
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                Create one here
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
              Forgot your password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
