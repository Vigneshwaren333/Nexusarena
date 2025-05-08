import React from 'react';

/**
 * Gallery search component with category filters
 * 
 * @param {Object} props
 * @param {string} props.selectedCategory - Selected category state
 * @param {Function} props.setSelectedCategory - Selected category state setter
 */
const GallerySearch = ({
  selectedCategory = "All Photos",
  setSelectedCategory
}) => {
  // Category options
  const categories = ["All Photos", "Tournament", "Cosplay", "Venue", "Behind the Scenes"];

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded-full font-future text-sm transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-neon-pink text-white shadow-[0_0_10px_rgba(255,0,255,0.5)]'
              : 'bg-cyber-black text-gray-300 hover:text-white'
          }`}
          onClick={() => setSelectedCategory(category)}
        >
          {category.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default GallerySearch; 