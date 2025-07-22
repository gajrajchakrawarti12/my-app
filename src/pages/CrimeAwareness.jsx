import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function CrimeAwareness() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    // Replace with actual backend endpoint if available
    fetch('https://raw.githubusercontent.com/sv3890/crime-hotspot-prediction/main/mock_data/crime_incidents.json')
      .then(res => res.json())
      .then(data => setIncidents(data.incidents || []));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-4">📍 Real-Time Crime Map (India)</h2>
        <p className="text-gray-700 text-center mb-6">
          The map below displays simulated real-time crime incidents gathered from open-source data.
        </p>

        <div className="rounded overflow-hidden shadow mb-6">
          <MapContainer center={[22.5726, 88.3639]} zoom={5} className="h-[500px] w-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {incidents.map((incident, idx) => (
              <Marker key={idx} position={[incident.incident_latitude, incident.incident_longitude]}>
                <Popup>
                  <strong className="text-blue-900">{incident.incident_offense}</strong><br />
                  <span className="text-sm">{incident.incident_address}</span>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="text-sm text-center text-gray-600">
          Data courtesy of <a href="https://github.com/sv3890/crime-hotspot-prediction" target="_blank" rel="noopener noreferrer" className="text-blue-800 underline hover:text-yellow-500">Crime Hotspot Prediction Project</a>
        </div>
      </div>
    </div>
  );
}

export default CrimeAwareness;
