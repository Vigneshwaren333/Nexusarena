import React from 'react';

/**
 * Community search component with filters
 * 
 * @param {Object} props
 * @param {string} props.searchTerm - Search term state
 * @param {Function} props.setSearchTerm - Search term state setter
 * @param {string} props.sortBy - Sort by state (recent or popular)
 * @param {Function} props.setSortBy - Sort by state setter
 */
const CommunitySearch = ({
  searchTerm = "",
  setSearchTerm,
  sortBy = "recent",
  setSortBy
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center">
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
          placeholder="Search discussions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-cyber-black border border-[#7122fa] text-white py-3 pl-10 pr-4 rounded-md focus:outline-none focus:border-[#00f2ff] transition-colors"
        />
      </div>
      
      {/* Sort controls */}
      <div className="flex items-center md:ml-4">
        <span className="mr-3 text-gray-300 whitespace-nowrap">Sort by:</span>
        <div className="flex">
          <button
            onClick={() => setSortBy('recent')}
            className={`px-3 py-2 rounded-l font-future ${
              sortBy === 'recent'
                ? 'bg-neon-blue text-cyber-black'
                : 'bg-cyber-black text-gray-300 hover:text-white'
            }`}
          >
            RECENT
          </button>
          <button
            onClick={() => setSortBy('popular')}
            className={`px-3 py-2 rounded-r font-future ${
              sortBy === 'popular'
                ? 'bg-neon-blue text-cyber-black'
                : 'bg-cyber-black text-gray-300 hover:text-white'
            }`}
          >
            POPULAR
          </button>
        </div>
      </div>
      
      {/* New post button */}
      <button className="md:ml-auto bg-neon-purple hover:bg-neon-blue text-white py-2 px-4 rounded font-future transition-colors duration-200">
        NEW POST
      </button>
    </div>
  );
};

export default CommunitySearch; 