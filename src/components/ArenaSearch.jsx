import React from 'react';

/**
 * Arena search component with filters
 * 
 * @param {Object} props
 * @param {string} props.searchTerm - Search term state
 * @param {Function} props.setSearchTerm - Search term state setter
 * @param {string} props.selectedLocation - Selected location state
 * @param {Function} props.setSelectedLocation - Selected location state setter
 * @param {string} props.selectedCapacity - Selected capacity state
 * @param {Function} props.setSelectedCapacity - Selected capacity state setter
 */
const ArenaSearch = ({
  searchTerm = "",
  setSearchTerm,
  selectedLocation = "All Locations",
  setSelectedLocation,
  selectedCapacity = "Any Capacity",
  setSelectedCapacity
}) => {
  // Location options
  const locations = ["All Locations", "Tokyo, Japan", "Berlin, Germany", "Los Angeles, USA", "Seoul, South Korea"];
  
  // Capacity options
  const capacities = ["Any Capacity", "Up to 1000", "1000-2000", "2000-3000", "3000+"];

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLocation("All Locations");
    setSelectedCapacity("Any Capacity");
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-end justify-between">
      <div className="flex flex-col md:flex-row gap-4 flex-1">
        {/* Search input */}
        <div className="relative flex-grow w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-[#7122fa]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search arenas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-cyber-black border border-[#7122fa] text-white py-3 pl-10 pr-4 rounded-md focus:outline-none focus:border-[#00f2ff] transition-colors"
          />
        </div>
        
        {/* Location filter */}
        <div className="relative flex-1">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full appearance-none bg-cyber-black border border-neon-purple text-white py-3 px-4 rounded focus:outline-none focus:border-neon-blue transition-colors"
          >
            {locations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-5 h-5 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
        
        {/* Capacity filter */}
        <div className="relative flex-1">
          <select
            value={selectedCapacity}
            onChange={(e) => setSelectedCapacity(e.target.value)}
            className="w-full appearance-none bg-cyber-black border border-neon-purple text-white py-3 px-4 rounded focus:outline-none focus:border-neon-blue transition-colors"
          >
            {capacities.map((capacity) => (
              <option key={capacity} value={capacity}>{capacity}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-5 h-5 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Reset filters button */}
      <button 
        className="bg-neon-pink hover:bg-neon-blue text-white px-6 py-3 rounded font-future transition-colors duration-300"
        onClick={resetFilters}
      >
        RESET FILTERS
      </button>
    </div>
  );
};

export default ArenaSearch; 