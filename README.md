# City Distance Explorer

A web application that helps you find cities at a specific distance from any location. Perfect for exploring geographical relationships and finding destinations within a particular range.

## Features

- 🌍 Search for any location worldwide
- 📏 Specify a target distance in kilometers
- 🎯 Find cities approximately at that distance (±10% range)
- 🗺️ Interactive OpenStreetMap visualization
- 🏙️ Toggle between cities-only and all settlements
- 📊 Detailed distance information and deviation percentages
- 🎨 Clean, modern interface

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd city-distance
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## How to Use

1. **Enter a Location**
   - Type any location name in the first input box
   - Examples: "London", "Paris", "New York"

2. **Set Distance**
   - Enter your target distance in kilometers
   - Default is 56 km

3. **Choose Settlement Type**
   - Toggle "Cities only" switch
   - ON: Shows only cities and major towns
   - OFF: Includes smaller towns and villages

4. **Click Execute**
   - The map will center on your chosen location
   - A circle shows the target distance
   - Markers indicate found cities
   - The table shows detailed information

## Technical Details

### Built With

- React + TypeScript - Frontend framework
- Vite - Build tool and development server
- Leaflet/React-Leaflet - Interactive maps
- OpenStreetMap - Map data
- Nominatim - Geocoding service
- Overpass API - Location querying

### APIs Used

- **Nominatim API**
  - Converts location names to coordinates
  - Free to use with proper attribution

- **Overpass API**
  - Queries OpenStreetMap data
  - Finds cities and settlements
  - Respects usage policies

### Key Features Implementation

- **Distance Calculation**
  - Uses Haversine formula for accurate Earth-surface distances
  - Accounts for Earth's curvature

- **City Filtering**
  - Finds locations within 90-110% of target distance
  - Sorts by proximity to exact target distance
  - Filters by settlement type (city, town, village)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenStreetMap contributors for the map data
- Nominatim for the geocoding service
- Overpass API for location querying
- React-Leaflet team for the mapping components

## Support

If you encounter any issues or have questions, please file an issue in the GitHub repository.

---

Made with ❤️ by [Your Name]
