// src/components/ParksList.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import ParkCard from './ParkCard';
import { fetchDrivingDistances } from '../utils/mapboxMatrix';

function ParksList({ startLocation }) {
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndDisplayClosestParks = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "nationalParks"));
        let parksData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          coordinates: [parseFloat(doc.data().longitude), parseFloat(doc.data().latitude)]
        }));
  
        // Now pass all parksData for processing
        const closestParks = await fetchDrivingDistances(startLocation, parksData);
  
        // Update state with the 9 closest parks returned
        setParks(closestParks.slice(0, 9));
        // setParks(closestParks);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching or sorting parks:", err);
        setError("Failed to fetch parks.");
        setLoading(false);
      }
    };
  
    if (startLocation) {
      fetchAndDisplayClosestParks();
    }
  }, [startLocation]);

  if (loading) return <div className='text-center font-mono'>Loading...</div>;
  if (error) return <div className='text-center font-mono'>Error: {error}</div>;
  if (!startLocation) return null;

  return (
    <div className='flex flex-wrap justify-center'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
            {parks.map((park) => (
                <ParkCard
                key={park.id}
                name={park.name}
                description={park.description}
                imageUrl={park.images && park.images.length > 0 ? park.images[0] : ''}
                distance={park.drivingDistance}
                state={park.state}
                />
            ))}
        </div>
    </div>
  );
}

export default ParksList;
