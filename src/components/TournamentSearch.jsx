import React from 'react';

/**
 * Tournament search component with filters
 * 
 * @param {Object} props
 * @param {string} props.searchTerm - Search term state
 * @param {Function} props.setSearchTerm - Search term state setter
 * @param {string} props.selectedGame - Selected game state
 * @param {Function} props.setSelectedGame - Selected game state setter
 * @param {string} props.selectedStatus - Selected status state
 * @param {Function} props.setSelectedStatus - Selected status state setter
 */
const TournamentSearch = ({
  searchTerm = "",
  setSearchTerm,
  selectedGame = "All Games",
  setSelectedGame,
  selectedStatus = "All Statuses",
  setSelectedStatus
}) => {
  // Game options
  const games = ["All Games", "League of Legends", "CS2", "Fortnite", "Street Fighter 6", "Dota 2", "Gran Turismo 7"];
  
  // Status options
  const registrationStatuses = ["All Statuses", "Open", "Closed", "Invitation"];

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedGame("All Games");
    setSelectedStatus("All Statuses");
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
            placeholder="Search tournaments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-cyber-black border border-[#7122fa] text-white py-3 pl-10 pr-4 rounded-md focus:outline-none focus:border-[#00f2ff] transition-colors"
          />
        </div>
        
        {/* Game filter */}
        <div className="relative flex-1">
          <select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            className="w-full appearance-none bg-cyber-black border border-neon-blue text-white py-3 px-4 rounded focus:outline-none focus:border-neon-purple transition-colors"
          >
            {games.map((game) => (
              <option key={game} value={game}>{game}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-5 h-5 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
        
        {/* Status filter */}
        <div className="relative flex-1">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full appearance-none bg-cyber-black border border-neon-blue text-white py-3 px-4 rounded focus:outline-none focus:border-neon-purple transition-colors"
          >
            {registrationStatuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-5 h-5 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

export default TournamentSearch; 