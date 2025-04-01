interface GeocodingResult {
  lat: number;
  lng: number;
  display_name: string;
}

// Add delay to respect rate limits
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function geocodeLocation(location: string): Promise<GeocodingResult> {
  try {
    // Add delay to respect Nominatim's usage policy
    await delay(1000);
    
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?` + 
      `format=json&q=${encodeURIComponent(location)}&limit=1`,
      {
        headers: {
          'User-Agent': 'CityDistanceCalculator/1.0'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Geocoding service error');
    }

    const data = await response.json();
    
    if (!data || data.length === 0) {
      throw new Error(`Location "${location}" not found`);
    }

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
      display_name: data[0].display_name
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Geocoding failed: ${error.message}`);
    }
    throw new Error('Geocoding failed');
  }
} 