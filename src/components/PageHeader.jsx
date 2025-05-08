import React from 'react';

/**
 * Reusable page header component with hero section and search bar
 * 
 * @param {Object} props
 * @param {string} props.title - Main title text
 * @param {string} props.accentText - Text with accent color (optional)
 * @param {string} props.subtitle - Subtitle text
 * @param {string} props.backgroundImage - URL for the background image
 * @param {string} props.accentColor - Color for the accent (neon-blue, neon-purple, neon-pink)
 * @param {React.ReactNode} props.searchSection - Optional search component to display below header
 */
const PageHeader = ({ 
  title = "", 
  accentText = "", 
  subtitle = "", 
  backgroundImage = "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071",
  accentColor = "neon-blue",
  searchSection
}) => {
  // Get the appropriate accent color class
  const getAccentColorClass = (color) => {
    switch (color) {
      case 'neon-purple':
        return 'text-neon-purple';
      case 'neon-pink':
        return 'text-neon-pink';
      case 'neon-blue':
      default:
        return 'text-neon-blue';
    }
  };

  const accentClass = getAccentColorClass(accentColor);

  return (
    <div className="relative">
      {/* Hero and Search section combined with the same background */}
      <section className={`relative flex flex-col overflow-hidden ${searchSection ? 'pb-20' : 'h-64 md:h-80'}`}>
        {/* Background elements that cover the entire section */}
        <div className="absolute inset-0 bg-cyber-gray opacity-80 z-10"></div>
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
        
        <div className="absolute inset-0">
          {/* Grid lines effect */}
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(to right, #00f2ff11 1px, transparent 1px), linear-gradient(to bottom, #00f2ff11 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Title section */}
        <div className="relative z-20 flex-grow flex items-center justify-center text-center px-4 pt-12 md:pt-16 min-h-[240px] md:min-h-[280px]">
          <div>
            <h1 className="font-future text-4xl md:text-6xl font-bold mb-4">
              {accentText ? (
                <>
                  <span className="text-white">{title}</span>{' '}
                  <span className={accentClass}>{accentText}</span>
                </>
              ) : (
                <span className="text-white">{title}</span>
              )}
            </h1>
            {subtitle && (
              <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Search section - within the same section as the header */}
        {searchSection && (
          <div className="relative z-20 px-4 md:px-8 pt-6 pb-8">
            <div className="max-w-7xl mx-auto">
              {searchSection}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default PageHeader; 