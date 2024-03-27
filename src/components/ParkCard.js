// src/components/ParkCard.js
function ParkCard({ name, description, imageUrl, distance, state }) {
    const distanceInMiles = distance ? (distance / 1609.34).toFixed(1) : null;
    // const distanceInKM = distance ? (distance / 1000).toFixed(1) : null;
  
    return (
      <div className="max-w-sm rounded-xl overflow-hidden shadow-md bg-white">
        <div className="card-container h-64">
            <img className="w-full h-full object-cover" src={imageUrl} alt={name} loading="lazy"/>
        </div>
        <div className="px-6 py-4">
        {distanceInMiles && (
            <div className="flex items-center mb-2">
                <p className=" text-lime-700 font-bold bg-lime-100 py-1 px-4 rounded-xl border border-lime-200">
                    {distanceInMiles} miles from here
                </p>
            </div>
          )}
          <div className="font-bold text-xl mb-2">{name} <span className="text-stone-400 text-sm ml-1">{state}</span></div>
          <p className="text-gray-700 text-base">
            {description}
          </p>
        </div>
      </div>
    );
  }
  
  export default ParkCard;
  