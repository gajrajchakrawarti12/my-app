"use client"

import { useState, useEffect, useCallback } from "react"
import { MapPin, Filter, Loader2, AlertCircle, Calendar, Tag } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Alert, AlertDescription } from "../components/ui/alert"
import { Badge } from "../components/ui/Badge"
const leaflet = require("react-leaflet")

// Alternative dynamic import for React frameworks (without Next.js dynamic)
let MapContainer, TileLayer, CircleMarker, Popup
if (typeof window !== "undefined") {
  // Only import on client side
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  MapContainer = leaflet.MapContainer
  TileLayer = leaflet.TileLayer
  CircleMarker = leaflet.CircleMarker
  Popup = leaflet.Popup
}
/**
 * @typedef {Object} CrimeIncident
 * @property {number} Latitude
 * @property {number} Longitude
 * @property {string} Crime Description
 * @property {string} City
 * @property {string} Date of Occurrence
 */

/**
 * @typedef {Object} FilterOptions
 * @property {number[]} years
 * @property {string[]} crimeTypes
 */

const crimeColorMap = {
  THEFT: "#3b82f6", // blue
  ASSAULT: "#ef4444", // red
  ROBBERY: "#8b5cf6", // purple
  BURGLARY: "#f97316", // orange
  VANDALISM: "#22c55e", // green
  FRAUD: "#ec4899", // pink
  CYBERCRIME: "#06b6d4", // cyan
  HARASSMENT: "#f59e0b", // amber
  DEFAULT: "#6b7280", // gray
}

const getCrimeColor = (crimeDescription) => {
  if (!crimeDescription) return crimeColorMap.DEFAULT
  const upperCrimeDesc = crimeDescription.toUpperCase()

  for (const typeKey in crimeColorMap) {
    if (typeKey !== "DEFAULT" && upperCrimeDesc.includes(typeKey)) {
      return crimeColorMap[typeKey]
    }
  }
  return crimeColorMap.DEFAULT
}

export default function MapSpotPage() {
  const [years, setYears] = useState([])
  const [crimeTypes, setCrimeTypes] = useState([])
  const [selectedYear, setSelectedYear] = useState("2020") // Default value set to "2020"
  const [selectedCrimeType, setSelectedCrimeType] = useState("") // Default value set to ""
  const [mapData, setMapData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]) // Default to India
  const [mapZoom, setMapZoom] = useState(5)
  const [isClient, setIsClient] = useState(false)

  // Handle client-side rendering for Leaflet
  useEffect(() => {
    setIsClient(true)

    // Load Leaflet CSS
    if (typeof window !== "undefined") {
      import("leaflet/dist/leaflet.css")

      // Fix for default marker icons
      import("leaflet").then((L) => {
        delete L.Icon.Default.prototype._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        })
      })
    }
  }, [])

  // Load filter options
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        // Mock API call - replace with actual endpoint
        const mockData= {
          years: [2020, 2021, 2022, 2023, 2024],
          crimeTypes: ["Theft", "Assault", "Robbery", "Burglary", "Vandalism", "Fraud", "Cybercrime", "Harassment"],
        }

        setYears(mockData.years)
        setCrimeTypes(mockData.crimeTypes)
      } catch (err) {
        setError("Failed to load filter options.")
        setYears([2020, 2021, 2022, 2023, 2024])
        setCrimeTypes(["Theft", "Assault", "Robbery", "Burglary", "Vandalism"])
      }
    }

    loadFilterOptions()
  }, [])

  const handleFetchMapData = useCallback(async () => {
    if (!selectedYear) {
      setError("Please select a year.")
      return
    }

    setLoading(true)
    setError("")
    setMapData([])

    try {
      // Mock API call - replace with actual endpoint
      const params = new URLSearchParams({ year: selectedYear })
      if (selectedCrimeType) {
        params.append("crime_type", selectedCrimeType)
      }

      // Mock data for demonstration
      const mockMapData = [
        {
          Latitude: 28.6139,
          Longitude: 77.209,
          "Crime Description": "Cybercrime - Phishing",
          City: "New Delhi",
          "Date of Occurrence": "2024-01-15",
        },
        {
          Latitude: 19.076,
          Longitude: 72.8777,
          "Crime Description": "Fraud - Online Banking",
          City: "Mumbai",
          "Date of Occurrence": "2024-01-20",
        },
        {
          Latitude: 12.9716,
          Longitude: 77.5946,
          "Crime Description": "Theft - Identity",
          City: "Bangalore",
          "Date of Occurrence": "2024-01-25",
        },
        {
          Latitude: 13.0827,
          Longitude: 80.2707,
          "Crime Description": "Harassment - Digital",
          City: "Chennai",
          "Date of Occurrence": "2024-02-01",
        },
        {
          Latitude: 22.5726,
          Longitude: 88.3639,
          "Crime Description": "Cybercrime - Ransomware",
          City: "Kolkata",
          "Date of Occurrence": "2024-02-05",
        },
      ]

      // Filter by crime type if selected
      const filteredData = selectedCrimeType
        ? mockMapData.filter((item) =>
            item["Crime Description"].toLowerCase().includes(selectedCrimeType.toLowerCase()),
          )
        : mockMapData

      setMapData(filteredData)

      if (filteredData.length > 0) {
        setMapCenter([filteredData[0].Latitude, filteredData[0].Longitude])
        setMapZoom(6)
      } else {
        setMapCenter([20.5937, 78.9629])
        setMapZoom(5)
      }
    } catch (err) {
      setError("Failed to fetch map data. Please try again.")
      setMapData([])
    } finally {
      setLoading(false)
    }
  }, [selectedYear, selectedCrimeType])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="h-10 w-10 text-blue-600 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Crime Hotspot Map</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interactive visualization of crime incidents and safety zones by year and type
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter Options
            </CardTitle>
            <CardDescription>Select year and crime type to view relevant incidents on the map</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Year *
                </label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.filter(year => year.value !== "").map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  Crime Type (Optional)
                </label>
                <Select value={selectedCrimeType} onValueChange={setSelectedCrimeType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All crime types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all crime types">All Crime Types</SelectItem>
                    {crimeTypes.filter(type => type !== "").map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">&nbsp;</label>
                <Button onClick={handleFetchMapData} disabled={loading || !selectedYear} className="w-full" size="lg">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading Map...
                    </>
                  ) : (
                    <>
                      <MapPin className="mr-2 h-4 w-4" />
                      Load Map
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Map Container */}
        <div className="relative">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="h-[70vh] w-full relative">
                {isClient && (
                  <MapContainer
                    center={mapCenter}
                    zoom={mapZoom}
                    style={{ height: "100%", width: "100%" }}
                    key={`${mapCenter.join(",")}-${mapZoom}`}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {mapData.map((point, index) => (
                      <CircleMarker
                        key={index}
                        center={[point.Latitude, point.Longitude]}
                        radius={8}
                        pathOptions={{
                          color: getCrimeColor(point["Crime Description"]),
                          fillColor: getCrimeColor(point["Crime Description"]),
                          fillOpacity: 0.7,
                          weight: 2,
                        }}
                      >
                        <Popup>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-gray-900">{point["Crime Description"]}</h3>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p>
                                <strong>City:</strong> {point.City || "N/A"}
                              </p>
                              <p>
                                <strong>Date:</strong> {new Date(point["Date of Occurrence"]).toLocaleDateString()}
                              </p>
                              <p>
                                <strong>Location:</strong> {point.Latitude.toFixed(4)}, {point.Longitude.toFixed(4)}
                              </p>
                            </div>
                          </div>
                        </Popup>
                      </CircleMarker>
                    ))}
                  </MapContainer>
                )}

                {!isClient && (
                  <div className="flex items-center justify-center h-full bg-gray-100">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                      <p className="text-gray-600">Loading map...</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card className="absolute top-4 right-4 z-[1000] max-w-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Crime Type Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-80 overflow-y-auto">
              {Object.entries(crimeColorMap)
                .filter(([type]) => type !== "DEFAULT")
                .map(([type, color]) => (
                  <div key={type} className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: color }} />
                    <span className="text-xs text-gray-700">
                      {type
                        .replace(/_/g, " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        {mapData.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">{mapData.length}</div>
                <div className="text-sm text-gray-600">Total Incidents</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {new Set(mapData.map((item) => item.City)).size}
                </div>
                <div className="text-sm text-gray-600">Cities Affected</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  {new Set(mapData.map((item) => item["Crime Description"].split(" - ")[0])).size}
                </div>
                <div className="text-sm text-gray-600">Crime Categories</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Incidents */}
        {mapData.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recent Incidents</CardTitle>
              <CardDescription>Latest crime incidents from the selected filters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mapData.slice(0, 5).map((incident, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div
                      className="w-3 h-3 rounded-full mt-2"
                      style={{ backgroundColor: getCrimeColor(incident["Crime Description"]) }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{incident["Crime Description"]}</h4>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                        <span>{incident.City}</span>
                        <span>•</span>
                        <span>{new Date(incident["Date of Occurrence"]).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {incident["Crime Description"].split(" - ")[0]}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
