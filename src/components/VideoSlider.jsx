"use client"

import { useEffect, useState } from "react"
import { Play, Clock, Filter, AlertCircle } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [durations, setDurations] = useState({})
  const [videos, setVideos] = useState([])
  const [crimeCategories, setCrimeCategories] = useState(["All"])

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch("http://localhost:5000/api/videos")
      const data = await response.json()
      setVideos(data.videos || [])
      const fetchedCategories = data.videos.map(video => video.category);

      // Combine with existing, and keep only unique categories
      setCrimeCategories((prevCategories) => {
        const combined = [...prevCategories, ...fetchedCategories];
        const uniqueCategories = [...new Set(combined)];
        return uniqueCategories;
      });
    }

    fetchVideos()
  }, [])


  const filteredVideos =
    selectedCategory === "All" ? videos : videos.filter((video) => video.category === selectedCategory)

  const handleMetadata = (videoId, e) => {
    const duration = e.currentTarget.duration
    setDurations((prev) => ({
      ...prev,
      [videoId]: duration,
    }))
  }

  const formatDuration = (duration) => {
    const mins = Math.floor(duration / 60)
    const secs = Math.floor(duration % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Play className="h-10 w-10 text-blue-600 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Cybersecurity Video Library</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn cybersecurity through engaging video content covering scams, digital hygiene, and online safety.
          </p>
        </div>

        {/* Category Filter */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter by Category
            </CardTitle>
            <CardDescription>Choose a category to view relevant cybersecurity videos</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                {crimeCategories.map((category) => (
                  <TabsTrigger key={category} value={category} className="text-xs lg:text-sm">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Video Content */}
        {filteredVideos.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Videos Available</h3>
              <p className="text-gray-600">
                No videos are currently available for the <strong>{selectedCategory}</strong> category.
              </p>
              <Button onClick={() => setSelectedCategory("All")} variant="outline" className="mt-4 bg-transparent">
                View All Videos
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{filteredVideos.length}</div>
                  <div className="text-sm text-gray-600">
                    {selectedCategory === "All" ? "Total Videos" : `${selectedCategory} Videos`}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">{crimeCategories.length - 1}</div>
                  <div className="text-sm text-gray-600">Categories Available</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {Object.values(durations).length > 0
                      ? Math.round(Object.values(durations).reduce((a, b) => a + b, 0) / 60)
                      : "~30"}
                  </div>
                  <div className="text-sm text-gray-600">Total Minutes</div>
                </CardContent>
              </Card>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <Card
                  key={video.id}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="relative">
                    <video
                      controls
                      src={video.src}
                      poster={video.thumbnail}
                      className="w-full h-48 object-cover"
                      onLoadedMetadata={(e) => handleMetadata(video.id, e)}
                      preload="metadata"
                    />
                    {/* Duration Overlay */}
                    {durations[video.id] && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDuration(durations[video.id])}
                      </div>
                    )}
                    {/* Category Badge */}
                    <Badge className="absolute top-2 left-2 bg-blue-600 hover:bg-blue-700">{video.category}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {video.category}
                      </Badge>
                      {durations[video.id] && (
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDuration(durations[video.id])}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
        {/* 
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Test Your Knowledge?</h2>
            <p className="text-lg mb-6 opacity-90">
              After watching these videos, take our interactive quiz to test your cybersecurity knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Take Quiz
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                View All Courses
              </Button>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}
