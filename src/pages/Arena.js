import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import ArenaSearch from '../components/ArenaSearch';

// Mock data for arenas
const arenaData = [
  {
    id: 1,
    name: "Quantum Stadium Tokyo",
    location: "Tokyo, Japan",
    capacity: 2500,
    rate: "$8,500/day",
    equipment: "120 High-End Gaming PCs, 4K Video Wall, Broadcast Equipment",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071",
    rating: 4.9,
    amenities: ["Pro Equipment", "Stage Setup", "Broadcast Ready", "VIP Areas"]
  },
  {
    id: 2,
    name: "Neo Arena Berlin",
    location: "Berlin, Germany",
    capacity: 1800,
    rate: "$6,200/day",
    equipment: "80 Gaming Stations, 360° LED Displays, Audio System",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070",
    rating: 4.7,
    amenities: ["Pro Equipment", "Audience Seating", "Broadcast Ready", "Food Court"]
  },
  {
    id: 3,
    name: "Cyber Coliseum LA",
    location: "Los Angeles, USA",
    capacity: 3200,
    rate: "$12,000/day",
    equipment: "150 Gaming Setups, Holographic Displays, Full Production Studio",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070",
    rating: 4.8,
    amenities: ["Pro Equipment", "Stage Setup", "Broadcast Ready", "VIP Areas", "Parking"]
  },
  {
    id: 4,
    name: "Digital Dome Seoul",
    location: "Seoul, South Korea",
    capacity: 2200,
    rate: "$7,800/day",
    equipment: "100 Gaming PCs, 360° Projection System, Network Infrastructure",
    image: "https://images.unsplash.com/photo-1603539947678-cd3954ed515d?q=80&w=2070",
    rating: 4.9,
    amenities: ["Pro Equipment", "Audience Seating", "Broadcast Ready", "Food Court"]
  }
];

// Filter options
const locations = ["All Locations", "Tokyo, Japan", "Berlin, Germany", "Los Angeles, USA", "Seoul, South Korea"];
const capacities = ["Any Capacity", "Up to 1000", "1000-2000", "2000-3000", "3000+"];

export default function ArenaPage() {
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedCapacity, setSelectedCapacity] = useState("Any Capacity");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArena, setSelectedArena] = useState(null);
  
  // Filter arenas based on selected filters and search term
  const filteredArenas = arenaData.filter(arena => {
    // Location filter
    if (selectedLocation !== "All Locations" && arena.location !== selectedLocation) {
      return false;
    }
    
    // Capacity filter
    if (selectedCapacity !== "Any Capacity") {
      const capacity = arena.capacity;
      if (selectedCapacity === "Up to 1000" && capacity > 1000) return false;
      if (selectedCapacity === "1000-2000" && (capacity < 1000 || capacity > 2000)) return false;
      if (selectedCapacity === "2000-3000" && (capacity < 2000 || capacity > 3000)) return false;
      if (selectedCapacity === "3000+" && capacity < 3000) return false;
    }
    
    // Search term filter
    if (searchTerm && !arena.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !arena.location.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Modal handling
  const openArenaDetails = (arena) => {
    setSelectedArena(arena);
  };
  
  const closeArenaDetails = () => {
    setSelectedArena(null);
  };
  
  // Search component for PageHeader
  const renderArenaSearch = () => (
    <ArenaSearch 
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      selectedLocation={selectedLocation}
      setSelectedLocation={setSelectedLocation}
      selectedCapacity={selectedCapacity}
      setSelectedCapacity={setSelectedCapacity}
    />
  );
  
  return (
    <div className="min-h-screen bg-cyber-black text-white">
      {/* Page header with search */}
      <PageHeader 
        title="ESPORTS"
        accentText="ARENAS"
        subtitle="Book world-class venues for your tournaments and events"
        backgroundImage="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071"
        accentColor="neon-purple"
        searchSection={renderArenaSearch()}
      />

      {/* Arenas Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-future text-3xl font-bold mb-2">AVAILABLE <span className="text-neon-blue">VENUES</span></h2>
          <div className="h-1 w-24 bg-neon-blue mb-10"></div>
          
          {filteredArenas.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-2xl font-future text-gray-400 mb-2">No Arenas Found</h3>
              <p className="text-gray-500">Try adjusting your filters or search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredArenas.map((arena) => (
                <motion.div 
                  key={arena.id}
                  className="bg-cyber-gray rounded-lg overflow-hidden cursor-pointer"
                  whileHover={{ y: -10, boxShadow: '0 0 15px rgba(0, 242, 255, 0.5)' }}
                  onClick={() => openArenaDetails(arena)}
                >
                  <div className="relative">
                    <img src={arena.image} alt={arena.name} className="w-full h-56 object-cover" />
                    <div className="absolute top-0 right-0 bg-neon-blue m-4 px-2 py-1 rounded font-future text-cyber-black font-bold">
                      {arena.rating} ★
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-future text-2xl font-bold mb-2">{arena.name}</h3>
                    <div className="flex items-center text-gray-400 mb-4">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      {arena.location}
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        <span>Capacity: {arena.capacity}</span>
                      </div>
                      <div className="text-neon-pink font-future font-bold">
                        {arena.rate}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {arena.amenities.map((amenity, index) => (
                        <span key={index} className="bg-cyber-black px-2 py-1 text-xs rounded text-neon-blue">
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <button className="w-full bg-transparent border border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white font-future py-2 rounded transition-colors duration-300">
                      VIEW DETAILS
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Arena Detail Modal */}
      {selectedArena && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="fixed inset-0 bg-cyber-black opacity-90" onClick={closeArenaDetails}></div>
          <div className="flex items-center justify-center min-h-screen px-4 py-8 text-center sm:p-0">
            <motion.div 
              className="relative bg-cyber-gray rounded-lg w-full max-w-4xl mx-auto overflow-hidden shadow-xl z-[101]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                className="absolute top-4 right-4 z-[102] bg-cyber-black bg-opacity-70 rounded-full p-2 text-white hover:text-neon-blue transition-colors"
                onClick={closeArenaDetails}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              
              <div className="relative">
                <img src={selectedArena.image} alt={selectedArena.name} className="w-full h-64 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-cyber-black to-transparent">
                  <h2 className="font-future text-3xl font-bold text-white">{selectedArena.name}</h2>
                  <div className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    {selectedArena.location}
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-neon-blue px-2 py-1 rounded font-future text-cyber-black font-bold">
                  {selectedArena.rating} ★
                </div>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-6">
                    <h3 className="font-future text-neon-blue mb-4 text-xl">VENUE DETAILS</h3>
                    <div className="text-neon-pink font-future font-bold text-2xl mb-4">
                      {selectedArena.rate}
                    </div>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 mr-2 text-neon-purple flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        <span>Capacity: <span className="text-white">{selectedArena.capacity} attendees</span></span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 mr-2 text-neon-purple flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <span>Equipment: <span className="text-white">{selectedArena.equipment}</span></span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-future text-neon-blue mb-4 text-xl">AMENITIES</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedArena.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-future text-neon-blue mb-4 text-xl">BOOKING INFORMATION</h3>
                    <p className="text-gray-300 mb-4">
                      This venue is available for tournament bookings, practice sessions, and special events. Contact our team for custom packages and availability.
                    </p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span>Minimum booking: 4 hours</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Advanced booking required</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <button className="w-full bg-neon-purple hover:bg-neon-blue text-white font-future py-3 rounded transition-colors duration-300 mb-3">
                      CHECK AVAILABILITY
                    </button>
                    <button className="w-full bg-transparent border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white font-future py-3 rounded transition-colors duration-300">
                      CONTACT VENUE
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}