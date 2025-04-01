import { useState } from 'react'

interface InputPanelProps {
  onExecute: (location: string, distance: number, citiesOnly: boolean) => void;
  isLoading: boolean;
  defaultLocation: string;
}

function InputPanel({ onExecute, isLoading, defaultLocation }: InputPanelProps) {
  const [location, setLocation] = useState(defaultLocation)
  const [distance, setDistance] = useState('56')
  const [citiesOnly, setCitiesOnly] = useState(true)

  const handleExecuteClick = () => {
    if (!location.trim()) {
      return;
    }
    const distanceNum = parseFloat(distance) || 56
    onExecute(location, distanceNum, citiesOnly)
  }

  return (
    <div className="input-panel">
      <div className="input-group">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          disabled={isLoading}
        />
      </div>
      <div className="input-row">
        <div className="input-group distance-group">
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Enter distance in km"
            min="0"
            step="0.1"
            disabled={isLoading}
          />
          <span className="unit">km</span>
        </div>
        <div className="toggle-group">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={citiesOnly}
              onChange={(e) => setCitiesOnly(e.target.checked)}
              disabled={isLoading}
            />
            <span className="toggle-slider"></span>
          </label>
          <span className="toggle-label">Cities only</span>
        </div>
      </div>
      <button 
        onClick={handleExecuteClick} 
        disabled={isLoading || !location.trim()}
      >
        {isLoading ? 'Searching...' : 'Execute'}
      </button>
    </div>
  )
}

export default InputPanel 