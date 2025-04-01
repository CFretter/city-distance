interface City {
  id: number;
  name: string;
  lat: number;
  lon: number;
  distance: number;
}

interface CitiesTableProps {
  cities: City[];
  isLoading: boolean;
  targetDistance: number;
}

function CitiesTable({ cities, isLoading, targetDistance }: CitiesTableProps) {
  // Debug log to see what data we're receiving
  console.log('CitiesTable data:', { cities, isLoading, targetDistance });

  if (isLoading) {
    return <div className="cities-loading">Finding cities approximately {targetDistance}km away...</div>;
  }

  return (
    <div className="cities-table-container">
      <h3>Cities {targetDistance}km (±10%) Away</h3>
      <div className="cities-table">
        {(!cities || cities.length === 0) ? (
          <div className="no-cities">No cities found at approximately {targetDistance}km distance</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>City</th>
                <th>Distance</th>
                <th>Deviation</th>
              </tr>
            </thead>
            <tbody>
              {cities.map(city => {
                // Debug log for each city
                console.log('Rendering city:', city);
                
                const deviation = ((city.distance - targetDistance) / targetDistance * 100).toFixed(1);
                const deviationClass = Math.abs(parseFloat(deviation)) < 5 ? 'deviation-good' : 'deviation-ok';
                
                return (
                  <tr key={city.id}>
                    <td>{city.name || 'Unknown'}</td>
                    <td>{city.distance?.toFixed(1) || '0'} km</td>
                    <td className={deviationClass}>{deviation}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default CitiesTable; 