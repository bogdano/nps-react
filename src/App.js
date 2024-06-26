import React, { useEffect, useState } from 'react';
import ParksList from './components/ParksList';
import LocationSearch from './components/LocationSearch';
import SignInWithGoogle from './components/SignInWithGoogle';

function App() {
  useEffect(() => {
    document.title = 'National Parks Finder';
  }, []);

  const [startLocation, setStartLocation] = useState(null);
  const [locationName, setLocationName] = useState('');

  const handleLocationSelect = (location, locationName) => {
    setStartLocation(location);
    setLocationName(locationName);
  };

  return (
    <div className="App min-h-screen bg-stone-100">
      <h1 className="text-5xl font-bold text-center font-serif text-stone-700 pt-12">National Parks Finder</h1>
      <LocationSearch onLocationSelect={handleLocationSelect} />
      {locationName && <h2 className='text-center text-stone-400 text-2xl font-serif font-bold mb-6 italic'>Parks closest to <span className='text-stone-600'>{locationName}</span>:</h2>}
      {startLocation ? <ParksList startLocation={startLocation} /> : <p className='text-center italic text-stone-600'>Please select a start location to see the closest national parks.</p>}
      <SignInWithGoogle />
    </div>
  );
}

export default App;
