import { AlertCircle, TrendingUp, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"

export default function CrimeAwareness() {
  const crimeStats = [
    {
      title: "Phishing Attacks",
      count: "2,847",
      trend: "+12%",
      icon: AlertCircle,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      title: "Identity Theft",
      count: "1,234",
      trend: "+8%",
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      title: "Online Fraud",
      count: "3,456",
      trend: "+15%",
      icon: MapPin,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Data Breaches",
      count: "567",
      trend: "+5%",
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Crime Awareness Dashboard</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay informed about the latest cybersecurity threats and trends in your area.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {crimeStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.count}</div>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {stat.trend} this month
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Alerts</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">New Phishing Campaign Detected</p>
              <p className="text-sm text-gray-600">Targeting banking customers with fake SMS messages</p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
            <TrendingUp className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Increase in Online Shopping Scams</p>
              <p className="text-sm text-gray-600">15% rise in fake e-commerce websites reported</p>
              <p className="text-xs text-gray-500 mt-1">6 hours ago</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
            <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Security Update Available</p>
              <p className="text-sm text-gray-600">New cybersecurity guidelines published for small businesses</p>
              <p className="text-xs text-gray-500 mt-1">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
