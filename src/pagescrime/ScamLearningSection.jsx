"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Phone,
  MessageSquare,
  Gift,
  Smartphone,
  HandIcon as Handcuffs,
  TrendingUp,
  Briefcase,
  Video,
  Package,
  Scale,
  QrCode,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"

/**
 * @typedef {Object} ScamData
 * @property {string} type
 * @property {string} summary
 * @property {string[]} details
 * @property {string} color
 * @property {string} bgColor
 * @property {*} icon
 * @property {"high" | "medium" | "low"} severity
 */

const scamData = [
  {
    type: "Phishing",
    summary: "Fake emails or websites tricking users into sharing sensitive info.",
    details: ["Don't click unknown links", "Verify sender identity", "Report at cybercrime.gov.in or call 1930"],
    color: "border-pink-500",
    bgColor: "bg-pink-50",
    icon: AlertTriangle,
    severity: "high",
  },
  {
    type: "Vishing",
    summary: "Fraud calls pretending to be officials or bank reps.",
    details: ["Never share OTP or CVV", "Hang up if unsure", "Confirm with your bank directly"],
    color: "border-indigo-500",
    bgColor: "bg-indigo-50",
    icon: Phone,
    severity: "high",
  },
  {
    type: "Smishing",
    summary: "Scam SMS with malicious links or fake offers.",
    details: ["Avoid clicking links in random texts", "Check sender URL carefully", "Use spam filters on your phone"],
    color: "border-orange-500",
    bgColor: "bg-orange-50",
    icon: MessageSquare,
    severity: "medium",
  },
  {
    type: "Lottery Scam",
    summary: '"You\'ve won!" messages demanding fees or taxes.',
    details: ["Real lotteries don't ask for money", "Verify with official sources", "Never share financial info"],
    color: "border-teal-500",
    bgColor: "bg-teal-50",
    icon: Gift,
    severity: "medium",
  },
  {
    type: "Fake Apps",
    summary: "Malicious apps stealing data or installing malware.",
    details: [
      "Download only from trusted stores",
      "Avoid apps with excessive permissions",
      "Keep antivirus software updated",
    ],
    color: "border-amber-600",
    bgColor: "bg-amber-50",
    icon: Smartphone,
    severity: "high",
  },
  {
    type: "Digital Arrest",
    summary: "Scammers impersonate agencies and demand money online.",
    details: ["No real arrest over video calls", "Stay calm, disconnect", "Call 1930 and preserve evidence"],
    color: "border-slate-500",
    bgColor: "bg-slate-50",
    icon: Handcuffs,
    severity: "high",
  },
  {
    type: "Investment Fraud",
    summary: "Schemes promising high returns quickly.",
    details: ["Avoid pressure-selling", "Research before investing", "If it sounds too good—it probably is"],
    color: "border-purple-500",
    bgColor: "bg-purple-50",
    icon: TrendingUp,
    severity: "high",
  },
  {
    type: "Fake Job Offers",
    summary: "Scammers offer fake jobs and demand fees or documents.",
    details: [
      "Apply only via official company sites",
      "Don't pay for interviews or training",
      "Verify recruiter credentials",
    ],
    color: "border-green-500",
    bgColor: "bg-green-50",
    icon: Briefcase,
    severity: "medium",
  },
  {
    type: "Deepfake Scams",
    summary: "AI-generated videos impersonating celebrities or officials.",
    details: [
      "Don't trust viral videos blindly",
      "Cross-check with verified sources",
      "Avoid downloading promoted apps without research",
    ],
    color: "border-red-500",
    bgColor: "bg-red-50",
    icon: Video,
    severity: "high",
  },
  {
    type: "Fake Courier Scams",
    summary: "Scammers impersonate delivery services to extort money.",
    details: [
      "Don't respond to unknown calls about parcels",
      "Verify tracking numbers on official sites",
      "Never pay fees via unknown links",
    ],
    color: "border-cyan-500",
    bgColor: "bg-cyan-50",
    icon: Package,
    severity: "medium",
  },
  {
    type: "Fake Supreme Court Hearings",
    summary: "Scammers stage fake legal proceedings to intimidate victims.",
    details: ["No real court operates via video calls", "Disconnect and report immediately", "Call 1930 for help"],
    color: "border-lime-500",
    bgColor: "bg-lime-50",
    icon: Scale,
    severity: "high",
  },
  {
    type: "QR Code Scams",
    summary: "Malicious QR codes redirecting to fake websites.",
    details: [
      "Scan only trusted QR codes",
      "Don't enter personal info on redirected sites",
      "Check URL spelling and design",
    ],
    color: "border-yellow-500",
    bgColor: "bg-yellow-50",
    icon: QrCode,
    severity: "medium",
  },
]

const getSeverityColor = (severity) => {
  switch (severity) {
    case "high":
      return "bg-red-100 text-red-800"
    case "medium":
      return "bg-yellow-100 text-yellow-800"
    case "low":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ScamLearningSection() {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleScam = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="w-full px-4 py-12 bg-white">
      <div className="text-center mb-12 ">
        <div className="flex items-center justify-center mb-4">
          <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Cyber Scam Awareness</h2>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn about common cyber scams and how to protect yourself from digital threats.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scamData.map((scam, index) => {
          const Icon = scam.icon
          const isActive = activeIndex === index

          return (
            <Card
              key={index}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${isActive ? "ring-2 ring-blue-500 shadow-lg" : ""
                } ${scam.color} border-2`}
              onClick={() => toggleScam(index)}
            >
              <CardHeader className={`${scam.bgColor} rounded-t-lg`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-6 w-6 text-gray-700" />
                    <CardTitle className="text-lg font-semibold text-gray-900">{scam.type}</CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getSeverityColor(scam.severity)} variant="secondary">
                      {scam.severity}
                    </Badge>
                    {isActive ? (
                      <ChevronUp className="h-5 w-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <CardDescription className="text-gray-700 mb-4 leading-relaxed">{scam.summary}</CardDescription>

                {isActive && (
                  <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                    <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Protection Tips:</h4>
                    <ul className="space-y-2">
                      {scam.details.map((point, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700 leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Emergency Contact Section */}
      <div className="mt-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-8 border border-red-200">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Been Scammed? Act Fast!</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            If you've fallen victim to a cyber scam, don't panic. Quick action can help minimize damage and prevent
            further losses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://cybercrime.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-semibold transition-colors duration-200"
            >
              <Phone className="h-5 w-5 mr-2" />
              Report Online
            </a>
            <a href="tel:1930" className="inline-flex items-center bg-white text-red-600 px-6 py-3 rounded-lg border border-red-300 hover:bg-red-50 font-semibold transition-colors duration-200">
            <Phone className="h-5 w-5 mr-2" />
            Call 1930
          </a>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">₹1,200 Cr</div>
          <div className="text-gray-600">Lost to cyber crimes in 2023</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
          <div className="text-gray-600">Scams can be prevented with awareness</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
          <div className="text-gray-600">Helpline support available</div>
        </div>
      </div>
    </div>
  )
}
