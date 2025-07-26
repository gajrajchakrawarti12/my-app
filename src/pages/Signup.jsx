"use client"

import { useState, useEffect, useCallback } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Eye, EyeOff, Shield, Loader2, RefreshCw, User, Lock, Mail, CheckCircle } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Alert, AlertDescription } from "../components/ui/alert"
import { Progress } from "../components/ui/progress"
import { useAuth } from "../context/AuthContext" // Adjust path if needed

const getPasswordStrength = (password) => {
  let score = 0
  if (password.length >= 8) score += 25
  if (/[A-Z]/.test(password)) score += 25
  if (/[a-z]/.test(password)) score += 25
  if (/[0-9]/.test(password)) score += 25

  if (score <= 25) return { score, label: "Weak", color: "bg-red-500" }
  if (score <= 50) return { score, label: "Fair", color: "bg-orange-500" }
  if (score <= 75) return { score, label: "Good", color: "bg-yellow-500" }
  return { score, label: "Strong", color: "bg-green-500" }
}

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    captchaInput: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [captcha, setCaptcha] = useState("")
  const [usernameValid, setUsernameValid] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { signup, isLoading, user, checkValidUsername } = useAuth()
  const navigate = useNavigate()

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

  const handleUsernameBlur = async () => {
    if (formData.username.trim()) {
      const isValid = await checkValidUsername(formData.username.trim())
      setUsernameValid(isValid)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const { name, username, email, password, confirmPassword, captchaInput } = formData

    if (captchaInput.trim() !== captcha) {
      setError("Captcha does not match")
      setFormData((prev) => ({ ...prev, captchaInput: "" }))
      generateCaptcha()
      return
    }

    if (!name || !username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (!usernameValid) {
      setError("Username is already taken")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    const wasSuccessful = await signup(name, username, email, password)
    if (wasSuccessful) {
      setSuccess("Account created successfully! Redirecting to login...")
      setIsSubmitted(true)
      setTimeout(() => navigate("/login"), 3000)
    } else {
      setError("Failed to create account. Please try again.")
      generateCaptcha()
    }
  }

  const refreshCaptcha = () => {
    setFormData((prev) => ({ ...prev, captchaInput: "" }))
    generateCaptcha()
  }

  const passwordStrength = getPasswordStrength(formData.password)

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-700">Account Created!</CardTitle>
            <CardDescription className="text-lg">
              Welcome to Cyber Rakshak! Your account has been successfully created.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Next Steps:</strong>
                <ul className="mt-2 space-y-1 text-sm text-left">
                  <li>• Check your email for verification instructions</li>
                  <li>• You'll be redirected to login shortly</li>
                  <li>• Start exploring our cybersecurity resources</li>
                </ul>
              </AlertDescription>
            </Alert>
            <Button asChild className="w-full">
              <Link to="/login">Continue to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-10 w-10 text-blue-600 mr-3" />
            <CardTitle className="text-2xl font-bold text-gray-900">Join Cyber Rakshak</CardTitle>
          </div>
          <CardDescription className="text-gray-600">
            Create your account to start your cybersecurity journey and protect your digital life.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4" variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-green-700">{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                onBlur={handleUsernameBlur}
                className={!usernameValid ? "border-red-500" : ""}
                required
              />
              {!usernameValid && <p className="text-sm text-red-500">Username is already taken</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
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
                  placeholder="Create a strong password"
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
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Password strength:</span>
                    <span
                      className={`font-medium ${passwordStrength.score >= 75 ? "text-green-600" : passwordStrength.score >= 50 ? "text-yellow-600" : "text-red-600"}`}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                  <Progress value={passwordStrength.score} className="h-2" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-sm text-red-500">Passwords do not match</p>
              )}
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
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
