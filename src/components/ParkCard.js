// src/components/ParkCard.js
function ParkCard({ name, description, imageUrl, distance, state }) {
    const distanceInMiles = distance ? (distance / 1609.34).toFixed(2) : null;
    // const distanceInKM = distance ? (distance / 1000).toFixed(1) : null;
  
    return (
      <div className="max-w-sm rounded-xl overflow-hidden shadow-md">
        <img className="w-full" src={imageUrl} alt={name} loading="lazy"/>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name} <span className="text-stone-400 text-sm ml-1">{state}</span></div>
          {distanceInMiles && (
            <p className="text-sm text-blue-500 mb-2">
              Distance: {distanceInMiles} miles
            </p>
          )}
          <p className="text-gray-700 text-base">
            {description}
          </p>
        </div>
      </div>
    );
  }
  
  export default ParkCard;
  