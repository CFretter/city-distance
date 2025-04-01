import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet'
import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import { City } from '../types'

// Fix for default marker icon
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

const cityIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [20, 32],
  iconAnchor: [10, 32],
  className: 'city-marker'
})

// Component to handle map center updates
function MapUpdater({ center }: { center: { lat: number; lng: number } }) {
  const map = useMap()
  
  useEffect(() => {
    map.setView([center.lat, center.lng])
  }, [center, map])
  
  return null
}

interface MapViewProps {
  center: { lat: number; lng: number };
  radius: number;
  zoom?: number;
  cities: City[];
}

function MapView({ center, radius, zoom = 10, cities }: MapViewProps) {
  const radiusInMeters = radius * 1000;

  return (
    <div className="map-container">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker 
          position={[center.lat, center.lng]} 
          icon={defaultIcon}
        >
        </Marker>
        <Circle
          center={[center.lat, center.lng]}
          radius={radiusInMeters}
          pathOptions={{
            color: 'blue',
            fillColor: '#3388ff',
            fillOpacity: 0.1
          }}
        />
        {cities.map(city => (
          <Marker
            key={city.id}
            position={[city.lat, city.lon]}
            icon={cityIcon}
          >
          </Marker>
        ))}
        <MapUpdater center={center} />
      </MapContainer>
    </div>
  )
}

export default MapView 