"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Loader2, MessageSquare, Shield } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Alert, AlertDescription } from "../components/ui/alert"


const contactCategories = [
  "General Inquiry",
  "Technical Support",
  "Report a Bug",
  "Scam Report",
  "Partnership",
  "Media Inquiry",
  "Feedback",
  "Other",
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors  = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.category) newErrors.category = "Please select a category"
    if (!formData.message.trim()) newErrors.message = "Message is required"
    else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call - replace with actual submission
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Submitted:", formData)
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
            <CardTitle className="text-2xl text-green-700">Message Sent Successfully!</CardTitle>
            <CardDescription className="text-lg">
              Thank you for contacting us. We'll get back to you within 24-48 hours.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <MessageSquare className="h-4 w-4" />
              <AlertDescription>
                <strong>What happens next:</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Our team will review your message</li>
                  <li>• You'll receive a confirmation email shortly</li>
                  <li>• We'll respond within 24-48 hours</li>
                  <li>• For urgent matters, call our helpline: 1930</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => window.location.reload()} className="flex-1">
                Send Another Message
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-10 w-10 text-blue-600 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Contact Us</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with the Cyber Rakshak team for support, inquiries, or to report cybersecurity concerns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
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
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">
                        Category <span className="text-red-500">*</span>
                      </Label>
                      <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                        <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {contactCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">
                        Subject <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="subject"
                        placeholder="Brief subject of your message"
                        value={formData.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                        className={errors.subject ? "border-red-500" : ""}
                      />
                      {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide detailed information about your inquiry or concern..."
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      rows={6}
                      className={errors.message ? "border-red-500" : ""}
                    />
                    {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                    <p className="text-xs text-gray-500">Minimum 10 characters required</p>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-blue-600" />
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Email</p>
                      <a href="mailto:support@cyberrakshak.me" className="text-blue-600 hover:text-blue-800 text-sm">
                        support@cyberrakshak.me
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Emergency Helpline</p>
                      <p className="text-2xl font-bold text-red-600">1930</p>
                      <p className="text-xs text-gray-600">24/7 Cybercrime Support</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Address</p>
                      <p className="text-sm text-gray-600">
                        Cyber Rakshak Initiative
                        <br />
                        New Delhi, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Response Time</p>
                      <p className="text-sm text-gray-600">24-48 hours for general inquiries</p>
                      <p className="text-sm text-gray-600">Immediate for emergency reports</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Frequently Asked</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-1">How quickly will you respond?</h4>
                    <p className="text-xs text-gray-600">We aim to respond to all inquiries within 24-48 hours.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">Is this for emergency reporting?</h4>
                    <p className="text-xs text-gray-600">
                      For active cyber attacks, call 1930 immediately or visit cybercrime.gov.in
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">Can I report scams here?</h4>
                    <p className="text-xs text-gray-600">
                      Use our dedicated scam reporting form for faster processing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full bg-red-600 hover:bg-red-700" size="sm">
                    Report Emergency
                  </Button>
                </a>
                <a href="/report-scam" className="block">
                  <Button variant="outline" className="w-full bg-transparent" size="sm">
                    Report Scam
                  </Button>
                </a>
                <a href="/chatbot" className="block">
                  <Button variant="outline" className="w-full bg-transparent" size="sm">
                    Chat with AI
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
