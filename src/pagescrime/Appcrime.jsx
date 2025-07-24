import { Link } from "react-router-dom"
import { Shield, AlertTriangle, BookOpen, Map, Phone, Users, TrendingUp, Eye, FileText } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import CrimeHome from "./crime-home"

export default function AppCrime() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Cyber Crime <span className="text-blue-600">Prevention Hub</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive tools and resources to protect yourself from cyber threats, report incidents, and stay
            informed about digital security.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-16">
          {/* Crime Home Component */}
          <CrimeHome />

          {/* Quick Action Cards */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Take Action Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 border-red-200 bg-red-50">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle className="text-lg text-red-800">Emergency Report</CardTitle>
                  <CardDescription className="text-red-700">
                    Report active cyber attacks or ongoing scams immediately
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="w-full bg-red-600 hover:bg-red-700">Report Online</Button>
                    </a>
                    <div className="text-center">
                      <p className="text-sm text-red-700">Or call</p>
                      <p className="text-2xl font-bold text-red-800">1930</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 border-blue-200 bg-blue-50">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg text-blue-800">Learn & Protect</CardTitle>
                  <CardDescription className="text-blue-700">
                    Access educational resources and security awareness training
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Link to="/learn/scams">
                      <Button
                        variant="outline"
                        className="w-full bg-transparent border-blue-300 text-blue-700 hover:bg-blue-100"
                      >
                        Scam Awareness
                      </Button>
                    </Link>
                    <Link to="/learn/modules">
                      <Button
                        variant="outline"
                        className="w-full bg-transparent border-blue-300 text-blue-700 hover:bg-blue-100"
                      >
                        Security Modules
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 border-green-200 bg-green-50">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg text-green-800">Security Tools</CardTitle>
                  <CardDescription className="text-green-700">
                    Use our security assessment and protection tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Link to="/tools">
                      <Button
                        variant="outline"
                        className="w-full bg-transparent border-green-300 text-green-700 hover:bg-green-100"
                      >
                        Security Check
                      </Button>
                    </Link>
                    <Link to="/chatbot">
                      <Button
                        variant="outline"
                        className="w-full bg-transparent border-green-300 text-green-700 hover:bg-green-100"
                      >
                        AI Assistant
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Cyber Crime Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-red-600" />
                </div>
                <div className="text-3xl font-bold text-red-600 mb-2">₹1,200 Cr</div>
                <div className="text-gray-600">Lost to cyber crimes in 2023</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-orange-600 mb-2">4.2L+</div>
                <div className="text-gray-600">Cyber crime complaints in 2023</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-gray-600">Crimes preventable with awareness</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
                <div className="text-gray-600">Users protected through awareness</div>
              </div>
            </div>
          </section>

          {/* Resources Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Map className="h-6 w-6 text-purple-600" />
                    <CardTitle className="text-lg">Crime Prediction Map</CardTitle>
                  </div>
                  <CardDescription>View real-time crime data and safety insights for your area</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/crimeprediction">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">View Crime Map</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Users className="h-6 w-6 text-cyan-600" />
                    <CardTitle className="text-lg">Community Support</CardTitle>
                  </div>
                  <CardDescription>Connect with others and share experiences in our community forum</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/community">
                    <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Join Community</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-indigo-600" />
                    <CardTitle className="text-lg">Legal Resources</CardTitle>
                  </div>
                  <CardDescription>
                    Access legal guidance and understand your rights in cyber crime cases
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Legal Guide</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-6 w-6 text-emerald-600" />
                    <CardTitle className="text-lg">24/7 Support</CardTitle>
                  </div>
                  <CardDescription>Get immediate help and support for cyber security incidents</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/contact">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Get Support</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
