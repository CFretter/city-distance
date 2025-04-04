import { useState, useEffect } from 'react'
import InputPanel from './components/InputPanel'
import MapView from './components/MapView'
import CitiesTable from './components/CitiesTable'
import { geocodeLocation } from './services/geocoding'
import { findNearbyCities } from './services/overpass'
import { City } from './types'
import './App.css'

function App() {
  const [mapState, setMapState] = useState({
    center: { lat: 3.1390, lng: 101.6869 }, // Default to Kuala Lumpur
    radius: 56,
    locationName: 'Kuala Lumpur, Malaysia',
    coordinates: '3.1390°N, 101.6869°E'
  })
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(false)
  const [citiesLoading, setCitiesLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleExecute = async (location: string, distance: number, citiesOnly: boolean) => {
    try {
      setLoading(true)
      setCitiesLoading(true)
      setError(null)
      setCities([])
      
      const result = await geocodeLocation(location)
      const coordinates = `${result.lat.toFixed(4)}°${result.lat >= 0 ? 'N' : 'S'}, ${result.lng.toFixed(4)}°${result.lng >= 0 ? 'E' : 'W'}`
      
      setMapState({
        center: { lat: result.lat, lng: result.lng },
        radius: distance,
        locationName: result.display_name,
        coordinates: coordinates
      })

      const nearbyCities = await findNearbyCities(
        { lat: result.lat, lng: result.lng }, 
        distance,
        citiesOnly
      )
      setCities(nearbyCities)
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
      setCitiesLoading(false)
    }
  }

  useEffect(() => {
    handleExecute('Kuala Lumpur, Malaysia', 56, true)
  }, [])

  return (
    <div className="app-container">
      <div className="left-panel">
        <InputPanel 
          onExecute={handleExecute} 
          isLoading={loading}
          defaultLocation="Kuala Lumpur, Malaysia"
        />
        {error && <div className="error-message">{error}</div>}
        {mapState.locationName && (
          <div className="location-info">
            <div><strong>Location:</strong> {mapState.locationName}</div>
            <div className="coordinates"><strong>Coordinates:</strong> {mapState.coordinates}</div>
          </div>
        )}
        <CitiesTable 
          cities={cities}
          isLoading={citiesLoading}
          targetDistance={mapState.radius}
        />
      </div>
      <MapView 
        center={mapState.center} 
        radius={mapState.radius}
        zoom={11}
        cities={cities}
      />
    </div>
  )
}

export default App
