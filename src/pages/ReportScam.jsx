"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Phone, ExternalLink, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Checkbox } from "../components/ui/checkbox"
import { Alert, AlertDescription } from "../components/ui/alert"
import { useAuth } from "../context/AuthContext" // Assuming you have a custom hook for authentication

const scamTypes = [
  "Phishing Email/Website",
  "Vishing (Voice Call)",
  "Smishing (SMS)",
  "Investment Fraud",
  "Lottery/Prize Scam",
  "Fake Job Offer",
  "Digital Arrest",
  "Fake App/Software",
  "QR Code Scam",
  "Deepfake Scam",
  "Courier/Delivery Scam",
  "Other",
]

export default function ReportScam() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    scamType: "",
    incidentDate: "",
    amountLost: "",
    description: "",
    evidence: "",
    reportedToPolice: false,
    consent: false,
    location: {
      longitude: "",
      latitude: "",
    }
  })

  const { user } = useAuth() // Assuming useAuth is a custom hook to get user info
  useEffect(() => {
    // Initialize form with user data if available
    if (user) {
      setForm((prevForm) => ({
        ...prevForm,
        name: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
      }))
    }
  }, [user]) // Run effect when user changes

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!form.name.trim()) newErrors.name = "Name is required"
    if (!form.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid"
    if (!form.scamType) newErrors.scamType = "Please select a scam type"
    if (!form.description.trim()) newErrors.description = "Description is required"
    if (!form.consent) newErrors.consent = "You must agree to the terms"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return
    // Get user's current location
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.")
      return
    }
    await navigator.geolocation.getCurrentPosition((position) => {
      setForm((prev) => ({
        ...prev,
        location: {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        },
      }))
    })
    if (!form.location.longitude || !form.location.latitude) {
      alert("Unable to retrieve your location. Please ensure location services are enabled.")
      return
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual submission
      const response = await fetch("http://localhost:5000/api/report-scam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          userId: user ? user._id : null, // Include user ID if available
          location: {
            longitude: form.location.longitude,
            latitude: form.location.latitude,
          },
        }),
      })
      if (!response.ok) {
        throw new Error("Failed to submit report")
      }
      const data = await response.json()
      console.log("Report submitted:", data)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-700">Report Submitted Successfully!</CardTitle>
            <CardDescription className="text-lg">
              Thank you for reporting this scam. Your information helps protect others.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Next Steps:</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• We'll review your report within 24-48 hours</li>
                  <li>• You may receive a follow-up email for additional information</li>
                  <li>• Consider reporting to local police if you haven't already</li>
                  <li>• Monitor your accounts for any suspicious activity</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => window.location.reload()} className="flex-1">
                Report Another Scam
              </Button>
              <Button variant="outline" asChild className="flex-1 bg-transparent">
                <a href="/" className="inline-flex items-center justify-center">
                  Return Home
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="h-10 w-10 text-red-500 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Report a Scam</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help protect others by reporting cybersecurity threats and scams. Your report is confidential and helps
            authorities track criminal activity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Incident Details</CardTitle>
                <CardDescription>
                  Please provide as much detail as possible about the scam you encountered.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="e.g. Rahul Sharma"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="e.g. rahul@example.com"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input
                        id="phone"
                        placeholder="e.g. +91 98765 43210"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="scamType">
                        Type of Scam <span className="text-red-500">*</span>
                      </Label>
                      <Select value={form.scamType} onValueChange={(value) => handleChange("scamType", value)}>
                        <SelectTrigger className={errors.scamType ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select scam type" />
                        </SelectTrigger>
                        <SelectContent>
                          {scamTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.scamType && <p className="text-sm text-red-500">{errors.scamType}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="incidentDate">When did this happen?</Label>
                      <Input
                        id="incidentDate"
                        type="date"
                        value={form.incidentDate}
                        onChange={(e) => handleChange("incidentDate", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amountLost">Amount Lost (if any)</Label>
                      <Input
                        id="amountLost"
                        placeholder="e.g. ₹5,000"
                        value={form.amountLost}
                        onChange={(e) => handleChange("amountLost", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Incident Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Detailed Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Please describe what happened in detail. Include information about how you were contacted, what the scammer said or did, any websites or phone numbers involved, etc."
                      value={form.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      rows={6}
                      className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                  </div>

                  {/* Evidence */}
                  <div className="space-y-2">
                    <Label htmlFor="evidence">Evidence (Optional)</Label>
                    <Textarea
                      id="evidence"
                      placeholder="List any evidence you have: screenshots, phone numbers, email addresses, website URLs, transaction IDs, etc."
                      value={form.evidence}
                      onChange={(e) => handleChange("evidence", e.target.value)}
                      rows={3}
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="reportedToPolice"
                        checked={form.reportedToPolice}
                        onCheckedChange={(checked) => handleChange("reportedToPolice", Boolean(checked))}
                      />
                      <Label htmlFor="reportedToPolice" className="text-sm">
                        I have reported this incident to local police or cybercrime authorities
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="consent"
                        checked={form.consent}
                        onCheckedChange={(checked) => handleChange("consent", Boolean(checked))}
                      />
                      <Label htmlFor="consent" className="text-sm">
                        I consent to sharing this information with relevant authorities to help prevent similar scams{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                    </div>
                    {errors.consent && <p className="text-sm text-red-500">{errors.consent}</p>}
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting Report...
                      </>
                    ) : (
                      "Submit Report"
                    )}
                  </Button>

                  <p className="text-sm text-center text-gray-500">
                    Your privacy is important. We'll never share your information without your consent.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-red-500" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm">National Cybercrime Helpline</h4>
                  <p className="text-2xl font-bold text-red-600">1930</p>
                  <p className="text-xs text-gray-600">24/7 Support Available</p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm">Online Reporting</h4>
                  <a
                    href="https://cybercrime.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                  >
                    cybercrime.gov.in
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Immediate Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                    <span>Stop all communication with the scammer</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                    <span>Preserve all evidence (screenshots, emails, messages)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                    <span>Contact your bank if money was involved</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                    <span>Change passwords for compromised accounts</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                    <span>Report to local police if significant loss occurred</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Why Report?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">85%</div>
                  <div className="text-xs text-gray-600">of scams can be prevented with awareness</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">10K+</div>
                  <div className="text-xs text-gray-600">reports help catch scammers</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
