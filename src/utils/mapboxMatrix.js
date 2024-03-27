import mbxMatrix from '@mapbox/mapbox-sdk/services/matrix';

const mapboxClient = mbxMatrix({ accessToken: "pk.eyJ1IjoiYm9nenoiLCJhIjoiY2x1OTd4d2wzMDczNDJ0bnh5Z3ppbzZ3diJ9.7e2nFuPe029YXt1wrs3vkw" });

export const fetchDrivingDistances = async (startCoordinates, parksData) => {
  try {
    // Attach as-the-crow-flies distance to each park
    const parks = parksData.map(park => ({
      ...park,
      haversineDistance: haversineDistance(startCoordinates, park.coordinates, true)
    }));

    // Sort by as-the-crow-flies distance and pick the top N closest for detailed calculation
    let closestParks = parks.sort((a, b) => a.haversineDistance - b.haversineDistance).slice(0, 6);

    // Prepare points for the Mapbox Matrix API, using only the closest parks
    const points = closestParks.map(park => ({ coordinates: park.coordinates }));

    // Add start location as the first point for the Matrix API
    points.unshift({ coordinates: startCoordinates });

    // Fetch driving distances
    const response = await mapboxClient.getMatrix({
      // use only first index as source
      sources: [0],
      points,
      profile: 'driving',
      annotations: ['distance']
    }).send();

    if (response && response.body && response.body.distances) {
      // Attach driving distance to each park
      closestParks.forEach((park, index) => {
        park.drivingDistance = response.body.distances[0][index + 1]; // +1 to skip the start location
      });

      closestParks = closestParks.filter(park => park.drivingDistance !== null);
      // Return parks sorted by driving distance
      return closestParks.sort((a, b) => a.drivingDistance - b.drivingDistance);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching driving distances:", error);
    return [];
  }
};

function haversineDistance(coords1, coords2, isMiles = false) {
    const toRad = x => (x * Math.PI) / 180;
    const R = 6371; // Earth's radius in km
  
    const dLat = toRad(coords2[1] - coords1[1]);
    const dLon = toRad(coords2[0] - coords1[0]);
  
    const lat1 = toRad(coords1[1]);
    const lat2 = toRad(coords2[1]);
  
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    const distance = R * c;
  
    return isMiles ? distance * 0.621371 : distance; // Convert to miles if needed
  }
  