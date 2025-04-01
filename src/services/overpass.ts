interface City {
  id: number;
  name: string;
  lat: number;
  lon: number;
  distance: number;
}

export async function findNearbyCities(center: { lat: number; lng: number }, targetDistanceKm: number): Promise<City[]> {
  // Set wider search radius to filter later
  const searchRadius = targetDistanceKm * 1.2; // Search a bit wider than needed
  
  const query = `
    [out:json][timeout:25];
    (
      node["place"~"city|town|village"]["name"](around:${searchRadius * 1000},${center.lat},${center.lng});
    );
    out body;
  `.trim();

  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `data=${encodeURIComponent(query)}`
    });

    if (!response.ok) {
      throw new Error(`Overpass API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.elements) {
      return [];
    }

    // Process and filter cities by distance
    const cities = data.elements
      .filter((element: any) => element.tags && element.tags.name)
      .map((element: any) => {
        const R = 6371; // Earth's radius in km
        const lat1 = center.lat * Math.PI / 180;
        const lat2 = element.lat * Math.PI / 180;
        const dLat = (element.lat - center.lat) * Math.PI / 180;
        const dLon = (element.lon - center.lng) * Math.PI / 180;

        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1) * Math.cos(lat2) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;

        return {
          id: element.id,
          name: element.tags.name,
          lat: element.lat,
          lon: element.lon,
          distance: parseFloat(distance.toFixed(2))
        };
      })
      // Filter cities that are between 0.9 and 1.1 times the target distance
      .filter(city => {
        const minDistance = targetDistanceKm * 0.9;
        const maxDistance = targetDistanceKm * 1.1;
        return city.distance >= minDistance && city.distance <= maxDistance;
      })
      .sort((a, b) => {
        // Sort by how close they are to the exact target distance
        const aDiff = Math.abs(a.distance - targetDistanceKm);
        const bDiff = Math.abs(b.distance - targetDistanceKm);
        return aDiff - bDiff;
      });

    console.log('Filtered cities:', cities); // Debug log
    return cities;
  } catch (error) {
    console.error('Overpass API error details:', error);
    throw new Error('Failed to fetch cities: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
} 