import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet'
import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import { Icon, LatLngBounds, LatLng } from 'leaflet'
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

// Component to handle map bounds updates
function MapUpdater({ center, cities, radius }: { 
  center: { lat: number; lng: number }, 
  cities: City[],
  radius: number 
}) {
  const map = useMap()
  
  useEffect(() => {
    // Create bounds that include the center point
    const bounds = new LatLngBounds(
      new LatLng(center.lat, center.lng),
      new LatLng(center.lat, center.lng)
    )

    // Extend bounds to include all cities
    cities.forEach(city => {
      bounds.extend(new LatLng(city.lat, city.lon))
    })

    // Extend bounds to include the circle radius
    const radiusInDegrees = radius / 111.32 // Approximate degrees for the radius
    bounds.extend([
      center.lat + radiusInDegrees,
      center.lng + radiusInDegrees
    ])
    bounds.extend([
      center.lat - radiusInDegrees,
      center.lng - radiusInDegrees
    ])

    // Fit the map to the bounds with some padding
    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 11
    })
  }, [map, center, cities, radius])
  
  return null
}

interface MapViewProps {
  center: { lat: number; lng: number };
  radius: number;
  zoom?: number;
  cities: City[];
}

function MapView({ center, radius, cities }: MapViewProps) {
  const radiusInMeters = radius * 1000;

  return (
    <div className="map-container">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={8}
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
        <MapUpdater center={center} cities={cities} radius={radius} />
      </MapContainer>
    </div>
  )
}

export default MapView 