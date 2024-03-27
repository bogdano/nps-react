import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

function LocationSearch({ onLocationSelect }) {
  const searchInputRef = useRef(null);

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: 'pk.eyJ1IjoiYm9nenoiLCJhIjoiY2x1OTd4d2wzMDczNDJ0bnh5Z3ppbzZ3diJ9.7e2nFuPe029YXt1wrs3vkw',
      mapboxgl: mapboxgl,
      placeholder: 'Enter start location',
      marker: false,
    });

    if (searchInputRef.current) {
      searchInputRef.current.appendChild(geocoder.onAdd());
    }

    geocoder.on('result', (e) => {
      const { center } = e.result;
      const placeName = e.result.text;
      onLocationSelect(center, placeName);
    });

    return () => geocoder.onRemove();
  }, [onLocationSelect]);

  return (
    <div className='flex justify-center my-6' ref={searchInputRef} />
    );
}

export default LocationSearch;
