import React, { useState } from 'react';

const crimeCategories = ['All', 'Cybercrime', 'Scam', 'Digital Hygiene', 'Fraud'];

const videos = [
  {
    title: 'Cyber Safety Tips',
    src: '/videos/crimeawareness.mp4',
    category: 'Cybercrime',
  },
  {
    title: 'Scam Awareness Campaign',
    src: '/videos/Cyberawareness1.mp4',
    category: 'Scam',
  },
  {
    title: 'Digital Hygiene Best Practices',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    category: 'Digital Hygiene',
  },
  {
    title: 'Online Banking Fraud Prevention',
    src: 'https://www.w3schools.com/html/movie.mp4',
    category: 'Fraud',
  },
  // Add more videos with categories if needed
];

function VideoSlider() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [durations, setDurations] = useState({});

  const filteredVideos =
    selectedCategory === 'All'
      ? videos
      : videos.filter((video) => video.category === selectedCategory);

  const handleMetadata = (index, e) => {
    const duration = e.target.duration;
    setDurations((prev) => ({
      ...prev,
      [index]: duration,
    }));
  };

  const formatDuration = (duration) => {
    const mins = Math.floor(duration / 60);
    const secs = Math.floor(duration % 60);
   return `${mins}:${secs.toString().padStart(2, '0')}`;

  };

  return (
    <div className="w-full px-4 py-10 bg-gray-100">
      {/* Category Selector */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {crimeCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-semibold transition duration-200 ${
              selectedCategory === category
                ? 'bg-blue-900 text-white shadow underline underline-offset-4'
                : 'bg-white text-blue-900 border border-blue-300 hover:bg-blue-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Video Carousel or Message */}
      {filteredVideos.length === 0 ? (
        <div className="text-center text-gray-500 font-medium mt-8">
          No videos available for <span className="font-bold">{selectedCategory}</span>.
        </div>
      ) : (
        <div className="overflow-x-auto scroll-smooth whitespace-nowrap px-4">
          {filteredVideos.map((video, index) => (
            <div
              key={index}
              className="relative inline-block w-[320px] mr-4 bg-white rounded-lg shadow hover:shadow-lg transition transform hover:scale-[1.02]"
            >
              <video
                controls
                src={video.src}
                className="w-full h-48 object-cover rounded-t-lg"
                onLoadedMetadata={(e) => handleMetadata(index, e)}
              />
              {/* Duration Overlay */}
              {durations[index] && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded">
                  {formatDuration(durations[index])}
                </div>
              )}
              <div className="p-2 text-sm text-blue-900 font-semibold text-center">
                {video.title}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VideoSlider;