import { Link } from "react-router-dom"
import { BarChart3, Bell, Map, AlertTriangle, MapPin, TrendingUp, Shield, Users, Eye, Activity } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"


export default function CrimeHome() {
  const features= [
    {
      title: "Safety Predictions",
      description: "Get personalized safety recommendations and predictions powered by smart AI analysis",
      icon: BarChart3,
      path: "/predict",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Community Alerts",
      description: "Stay informed about neighborhood safety with real-time updates and notifications",
      icon: Bell,
      path: "/subscribe",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      title: "Analytics Dashboard",
      description: "Explore interactive safety patterns and crime trends in your neighborhood",
      icon: Activity,
      path: "/analytics",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "Crime Reporting",
      description: "Contribute to neighborhood safety by reporting security concerns and incidents",
      icon: AlertTriangle,
      path: "/report-scam",
      color: "text-red-600",
      bgColor: "bg-red-50",
      gradient: "from-red-500 to-red-600",
    },
    {
      title: "Crime Hotspot Map",
      description: "Visualize crime incidents and safety zones on an interactive map by year and type",
      icon: MapPin,
      path: "/map-spot",
      color: "text-green-600",
      bgColor: "bg-green-50",
      gradient: "from-green-500 to-green-600",
    },
  ]

  const stats = [
    {
      title: "Areas Monitored",
      value: "2,847",
      icon: Map,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Alerts",
      value: "156",
      icon: Bell,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Community Members",
      value: "15,234",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Incidents Prevented",
      value: "3,421",
      icon: Shield,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Crime Hotspot <span className="text-blue-600">Prediction</span>
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Building safer communities through data-driven neighborhood insights and real-time security intelligence
        </p>
        <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm font-medium">
          <Eye className="h-4 w-4 mr-2" />
          Live Monitoring Active
        </Badge>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Features Grid */}
      <div className="space-y-8">
        {/* First Row - 3 Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.slice(0, 3).map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link to={feature.path}>
                    <Button
                      className={`w-full bg-gradient-to-r ${feature.gradient} hover:shadow-lg transition-all duration-300 font-semibold`}
                      size="lg"
                    >
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Second Row - 2 Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.slice(3).map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index + 3}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link to={feature.path}>
                    <Button
                      className={`w-full bg-gradient-to-r ${feature.gradient} hover:shadow-lg transition-all duration-300 font-semibold`}
                      size="lg"
                    >
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Make Your Community Safer?</h2>
        <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
          Join thousands of community members who are actively contributing to neighborhood safety through our
          data-driven platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
              Get Started Today
            </Button>
          </Link>
          <Link to="/learn/modules">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
