import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import GallerySearch from '../components/GallerySearch';

// Mock data for gallery photos
const galleryData = [
  {
    id: 1,
    title: "League of Legends World Finals",
    event: "Global Masters Series 2024",
    date: "March, 2024",
    description: "The final match between East and West champions.",
    image: "https://picsum.photos/800/600?random=1",
    category: "Tournament"
  },
  {
    id: 2,
    title: "Grand Stage Opening",
    event: "Cyber Arena Launch",
    date: "January, 2024",
    description: "The grand reveal of the most advanced esports venue.",
    image: "https://picsum.photos/800/600?random=2",
    category: "Venue"
  },
  {
    id: 3,
    title: "Industry Leaders Panel",
    event: "Pro Gaming Summit",
    date: "February, 2024",
    description: "CEOs and team owners discussing the future of esports.",
    image: "https://picsum.photos/800/600?random=3",
    category: "Conference"
  },
  {
    id: 4,
    title: "Victory Celebration",
    event: "Battle Royale Invitational",
    date: "April, 2024",
    description: "Champions celebrating their hard-fought victory.",
    image: "https://picsum.photos/800/600?random=4",
    category: "Tournament"
  },
  {
    id: 5,
    title: "Fan Meetup",
    event: "Nexus Arena Fan Festival",
    date: "May, 2024",
    description: "Fans meeting their favorite players in person.",
    image: "https://picsum.photos/800/600?random=5",
    category: "Fan Event"
  },
  {
    id: 6,
    title: "Final Round Match",
    event: "Fighting Games Championship",
    date: "June, 2024",
    description: "The intense final moments of the championship match.",
    image: "https://picsum.photos/800/600?random=6",
    category: "Tournament"
  },
  {
    id: 7,
    title: "Next-Gen Hardware Reveal",
    event: "Gaming Hardware Expo",
    date: "July, 2024",
    description: "Unveiling the latest gaming peripherals and equipment.",
    image: "https://picsum.photos/800/600?random=7",
    category: "Expo"
  },
  {
    id: 8,
    title: "Trophy Ceremony",
    event: "Collegiate Esports Finals",
    date: "August, 2024",
    description: "The winning university team receiving their championship trophy.",
    image: "https://picsum.photos/800/600?random=8",
    category: "Tournament"
  },
  {
    id: 9,
    title: "Marathon Milestone",
    event: "Charity Gaming Marathon",
    date: "September, 2024",
    description: "Gamers celebrating hitting the $1 million donation milestone.",
    image: "https://picsum.photos/800/600?random=9",
    category: "Charity"
  },
  {
    id: 10,
    title: "Mobile Tournament Final",
    event: "Mobile Gaming Championship",
    date: "October, 2024",
    description: "The final showdown of the mobile gaming tournament.",
    image: "https://picsum.photos/800/600?random=10",
    category: "Tournament"
  },
  {
    id: 11,
    title: "Game Announcement",
    event: "Developer Conference",
    date: "November, 2024",
    description: "Developers revealing their upcoming esports title to excited fans.",
    image: "https://picsum.photos/800/600?random=11",
    category: "Conference"
  },
  {
    id: 12,
    title: "Championship Team Photo",
    event: "Winter Championship",
    date: "December, 2024",
    description: "The winning team's official photo with their trophy.",
    image: "https://picsum.photos/800/600?random=12",
    category: "Tournament"
  },
  {
    id: 13,
    title: "Crowd Reaction",
    event: "Global Masters Series 2024",
    date: "March, 2024",
    description: "Fans going wild during a surprising comeback in the semifinals.",
    image: "https://picsum.photos/800/600?random=13",
    category: "Tournament"
  },
  {
    id: 14,
    title: "VIP Lounge",
    event: "Cyber Arena Launch",
    date: "January, 2024",
    description: "The exclusive VIP area for sponsors and special guests.",
    image: "https://picsum.photos/800/600?random=14",
    category: "Venue"
  },
  {
    id: 15,
    title: "Autograph Session",
    event: "Fan Festival",
    date: "May, 2024",
    description: "Pro players signing merchandise for devoted fans.",
    image: "https://picsum.photos/800/600?random=15",
    category: "Fan Event"
  }
];

// Filter categories
const photoCategories = ["All Photos", "Tournament", "Conference", "Expo", "Fan Event", "Charity", "Venue"];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Photos");
  const [activePhoto, setActivePhoto] = useState(null);
  
  // Filter gallery photos based on selected category
  const filteredPhotos = galleryData.filter(photo => {
    // Category filter
    if (selectedCategory !== "All Photos" && photo.category !== selectedCategory) {
      return false;
    }
    
    return true;
  });

  // Open photo details modal
  const openPhotoDetails = (photo) => {
    setActivePhoto(photo);
  };

  // Close photo details modal
  const closePhotoDetails = () => {
    setActivePhoto(null);
  };

  // Search component for PageHeader
  const renderGallerySearch = () => (
    <GallerySearch 
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />
  );

  return (
    <div className="min-h-screen bg-cyber-black text-white">
      {/* Page header with category filters */}
      <PageHeader 
        title="PHOTO"
        accentText="GALLERY"
        subtitle="Capturing the epic moments from our tournaments and events"
        backgroundImage="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070"
        accentColor="neon-pink"
        searchSection={renderGallerySearch()}
      />

      {/* Gallery Grid Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-future text-3xl font-bold mb-2">EVENT <span className="text-neon-pink">HIGHLIGHTS</span></h2>
          <div className="h-1 w-24 bg-neon-pink mb-10"></div>
          
          {filteredPhotos.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <h3 className="text-2xl font-future text-gray-400 mb-2">No Photos Found</h3>
              <p className="text-gray-500">Try adjusting your filter categories</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((photo) => (
                <motion.div 
                  key={photo.id}
                  className="group cursor-pointer"
                  whileHover={{ y: -10 }}
                  onClick={() => openPhotoDetails(photo)}
                >
                  <div className="relative overflow-hidden rounded-lg aspect-square mb-3">
                    <img 
                      src={photo.image} 
                      alt={photo.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent opacity-70"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <span className="inline-block bg-neon-pink px-2 py-1 text-xs text-cyber-black font-future rounded mb-2">
                        {photo.category}
                      </span>
                      <h3 className="text-xl font-future font-bold text-white group-hover:text-neon-pink transition-colors line-clamp-2">
                        {photo.title}
                      </h3>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    <div className="flex justify-between">
                      <span>{photo.event}</span>
                      <span>{photo.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Photo Details Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="fixed inset-0 bg-cyber-black opacity-90" onClick={closePhotoDetails}></div>
          <div className="flex items-center justify-center min-h-screen px-4 py-8 text-center sm:p-0">
            <motion.div 
              className="relative bg-cyber-gray rounded-lg w-full max-w-4xl mx-auto overflow-hidden shadow-xl z-[101]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                className="absolute top-4 right-4 z-[102] bg-cyber-black bg-opacity-70 rounded-full p-2 text-white hover:text-neon-pink transition-colors"
                onClick={closePhotoDetails}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative">
                  <img 
                    src={activePhoto.image} 
                    alt={activePhoto.title} 
                    className="w-full h-full object-cover aspect-square"
                  />
                </div>
                
                <div className="p-6 flex flex-col">
                  <h2 className="font-future text-2xl font-bold text-neon-pink mb-2">
                    {activePhoto.title}
                  </h2>
                  
                  <div className="flex items-center mb-4">
                    <span className="bg-neon-pink/20 text-neon-pink px-3 py-1 rounded-full text-sm">
                      {activePhoto.category}
                    </span>
                  </div>
                  
                  <div className="text-gray-300 mb-6 flex-grow">
                    <p className="mb-4">{activePhoto.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                      <div>
                        <span className="block text-neon-blue mb-1">Event</span>
                        <span>{activePhoto.event}</span>
                      </div>
                      <div>
                        <span className="block text-neon-blue mb-1">Date</span>
                        <span>{activePhoto.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <button className="px-4 py-2 border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white rounded transition-colors duration-300">
                      <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                      </svg>
                      Share
                    </button>
                    <button className="px-4 py-2 border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-white rounded transition-colors duration-300">
                      <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                      </svg>
                      Download
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