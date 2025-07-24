import { Link } from "react-router-dom"
import { Shield, AlertTriangle, BookOpen, Map, Phone, Users } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"

export default function AppCrime() {
  const tools = [
    {
      title: "Report Cybercrime",
      description: "Quickly report scams, fraud, and other cybercrimes to authorities",
      icon: AlertTriangle,
      href: "/report-scam",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      title: "Security Assessment",
      description: "Evaluate your digital security posture with our comprehensive tools",
      icon: Shield,
      href: "/tools",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Learning Center",
      description: "Access educational modules and videos on cybersecurity best practices",
      icon: BookOpen,
      href: "/learn/modules",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Crime Map",
      description: "View real-time crime data and safety insights for your area",
      icon: Map,
      href: "/crimeprediction",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Emergency Contacts",
      description: "Quick access to cybercrime helplines and emergency services",
      icon: Phone,
      href: "/contact",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      title: "Community Forum",
      description: "Connect with others to share experiences and get support",
      icon: Users,
      href: "/community",
      color: "text-cyan-500",
      bgColor: "bg-cyan-50",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Cybersecurity Tools & Resources</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive tools to help you stay safe, report crimes, and learn about cybersecurity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => {
          const Icon = tool.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${tool.bgColor} flex items-center justify-center mb-4`}>
                  <Icon className={`h-6 w-6 ${tool.color}`} />
                </div>
                <CardTitle className="text-lg">{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={tool.href}>
                  <Button className="w-full bg-transparent" variant="outline">
                    Access Tool
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Action Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
        <p className="text-lg mb-6 opacity-90">
          If you're experiencing a cybersecurity emergency, don't wait. Get help now.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://cybercrime.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 font-semibold transition-colors duration-200"
          >
            <AlertTriangle className="h-5 w-5 mr-2" />
            Report Now
          </a>
          <Link href="/contact">
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Phone className="h-5 w-5 mr-2" />
              Get Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
