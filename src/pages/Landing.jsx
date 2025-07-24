import { Link } from "react-router-dom"
import { ExternalLink, Shield, AlertTriangle, BookOpen, Users } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import CrimeAwareness from "../components/crime-awareness"
import AppCrime from "../components/app-crime"

export default function Landing() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage:
            "url('https://t3.ftcdn.net/jpg/08/68/76/66/240_F_868766637_7oCeLzi8UthSXss3c8x4IKAmzIm8WX57.jpg')",
        }}
      />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60 z-5" />

      {/* Foreground content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 text-white">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-16 w-16 text-yellow-400 mr-4" />
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Welcome to Cyber Rakshak
              </h1>
            </div>

            <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-200">
              Empowering citizens to report scams, learn cybersecurity, and protect their digital rights through
              comprehensive awareness and real-time crime insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <a
                href="https://cybercrime.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg hover:bg-yellow-300 font-semibold transition-colors duration-200 shadow-lg"
              >
                <AlertTriangle className="h-5 w-5 mr-2" />
                Report Scam Now
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>

              <Link to="/learn/modules">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Start Learning
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">10K+</div>
                <div className="text-sm text-gray-300">Scams Reported</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">50K+</div>
                <div className="text-sm text-gray-300">Users Protected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">100+</div>
                <div className="text-sm text-gray-300">Learning Modules</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="relative bg-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Comprehensive Cybersecurity Protection
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform provides multiple layers of protection and education to keep you safe in the digital world.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="text-center">
                  <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <CardTitle className="text-lg">Report Scams</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Quickly report cybersecurity threats and scams to protect your community.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="text-center">
                  <BookOpen className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <CardTitle className="text-lg">Learn & Grow</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Access interactive modules and videos to enhance your cybersecurity knowledge.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="text-center">
                  <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <CardTitle className="text-lg">Security Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Utilize powerful tools to assess and improve your digital security posture.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <CardTitle className="text-lg">Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Join a community of security-conscious individuals sharing knowledge and experiences.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Crime Awareness Section */}
        <section className="relative bg-gray-50 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <CrimeAwareness />
          </div>
        </section>

        {/* Crime Tools Section */}
        <section id="crime-section" className="relative bg-gray-100 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <AppCrime />
          </div>
        </section>
      </div>
    </div>
  )
}
