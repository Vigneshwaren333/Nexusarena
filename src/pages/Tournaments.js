import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import TournamentSearch from '../components/TournamentSearch';

// Game filter options
const games = ["All Games", "League of Legends", "CS2", "Fortnite", "Street Fighter 6", "Dota 2", "Gran Turismo 7"];
const registrationStatuses = ["All Statuses", "Open", "Closed", "Invitation"];

// Mock tournament data
const dummyTournaments = [
  {
    id: 1,
    title: "Global Masters Series",
    game: "League of Legends",
    prize: "$50,000",
    entryFee: "$25",
    date: "June 15, 2025",
    location: "Online",
    registrationStatus: "Open",
    participants: 128,
    maxParticipants: 128,
    imageUrl: "https://picsum.photos/800/450?random=7",
    isDummy: true
  },
  {
    id: 2,
    title: "Cyber Strike Championship",
    game: "CS2",
    prize: "$30,000",
    entryFee: "$20",
    date: "July 2, 2025",
    location: "Los Angeles, USA",
    registrationStatus: "Open",
    participants: 64,
    maxParticipants: 64,
    imageUrl: "https://picsum.photos/800/450?random=8",
    isDummy: true
  },
  {
    id: 3,
    title: "Battle Royale Invitational",
    game: "Fortnite",
    prize: "$25,000",
    entryFee: "Free",
    date: "May 28, 2025",
    location: "Online",
    registrationStatus: "Closed",
    participants: 100,
    maxParticipants: 100,
    imageUrl: "https://picsum.photos/800/450?random=9",
    isDummy: true
  },
  {
    id: 4,
    title: "Fighting Masters Tournament",
    game: "Street Fighter 6",
    prize: "$15,000",
    entryFee: "$15",
    date: "August 10, 2025",
    location: "Tokyo, Japan",
    registrationStatus: "Open",
    participants: 32,
    maxParticipants: 32,
    imageUrl: "https://picsum.photos/800/450?random=10",
    isDummy: true
  },
  {
    id: 5,
    title: "MOBA Pro League Season 5",
    game: "Dota 2",
    prize: "$100,000",
    entryFee: "Invitation Only",
    date: "September 5, 2025",
    location: "Berlin, Germany",
    registrationStatus: "Invitation",
    participants: 16,
    maxParticipants: 16,
    imageUrl: "https://picsum.photos/800/450?random=11",
    isDummy: true
  },
  {
    id: 6,
    title: "Racing Simulation Cup",
    game: "Gran Turismo 7",
    prize: "$20,000",
    entryFee: "$10",
    date: "July 25, 2025",
    location: "Online",
    registrationStatus: "Open",
    participants: 48,
    maxParticipants: 48,
    imageUrl: "https://picsum.photos/800/450?random=12",
    isDummy: true
  }
];

export default function TournamentsPage() {
  const [dbTournaments, setDbTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGame, setSelectedGame] = useState("All Games");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  // Fetch tournaments from backend API
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/tournaments');
        
        if (!response.ok) {
          throw new Error('Failed to fetch tournaments');
        }
        
        const data = await response.json();
        setDbTournaments(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tournaments:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchTournaments();
  }, []);
  
  // Combine real and dummy tournaments
  const allTournaments = [
    ...dbTournaments,
    ...dummyTournaments
  ];
  
  // Filter tournaments based on selected filters and search term
  const filteredTournaments = allTournaments.filter(tournament => {
    // Game filter
    if (selectedGame !== "All Games" && tournament.game !== selectedGame) {
      return false;
    }
    
    // Registration status filter
    if (selectedStatus !== "All Statuses" && tournament.registrationStatus !== selectedStatus) {
      return false;
    }
    
    // Search term filter
    if (searchTerm && !tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !tournament.game.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Search component for PageHeader
  const renderTournamentSearch = () => (
    <TournamentSearch 
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      selectedGame={selectedGame}
      setSelectedGame={setSelectedGame}
      selectedStatus={selectedStatus}
      setSelectedStatus={setSelectedStatus}
    />
  );

  return (
    <div className="min-h-screen bg-cyber-black text-white">
      {/* Page header with search */}
      <PageHeader 
        title="ESPORTS"
        accentText="TOURNAMENTS"
        subtitle="Compete in top-tier tournaments and win prestigious titles"
        backgroundImage="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070"
        accentColor="neon-blue"
        searchSection={renderTournamentSearch()}
      />

      {/* Tournaments List */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-future text-3xl font-bold mb-2">UPCOMING <span className="text-neon-blue">TOURNAMENTS</span></h2>
          <div className="h-1 w-24 bg-neon-blue mb-10"></div>
          
          {loading && dbTournaments.length === 0 ? (
            <div className="text-center py-20">
              <div className="spinner w-12 h-12 mx-auto border-4 border-neon-blue border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400">Loading tournaments...</p>
            </div>
          ) : error && dbTournaments.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-2xl font-future text-red-400 mb-2">Error Loading Tournaments</h3>
              <p className="text-gray-500">{error}</p>
            </div>
          ) : filteredTournaments.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-2xl font-future text-gray-400 mb-2">No Tournaments Found</h3>
              <p className="text-gray-500">Try adjusting your filters or search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTournaments.map((tournament) => (
                <motion.div 
                  key={tournament._id || tournament.id}
                  className={`bg-cyber-gray rounded-lg overflow-hidden cursor-pointer ${tournament.isDummy ? 'border-2 border-neon-pink' : ''}`}
                  whileHover={{ y: -10, boxShadow: '0 0 15px rgba(0, 242, 255, 0.5)' }}
                  onClick={() => tournament.isDummy ? null : navigate(`/tournaments/${tournament._id}`)}
                >
                  <div className="relative">
                    <img src={tournament.imageUrl || "https://picsum.photos/800/450?random=99"} alt={tournament.title} className="w-full h-56 object-cover" />
                    <div className={`absolute top-0 right-0 m-4 px-2 py-1 rounded font-future text-cyber-black font-bold ${
                      tournament.registrationStatus === "Open" ? "bg-neon-blue" :
                      tournament.registrationStatus === "Closed" ? "bg-gray-500" : "bg-neon-purple"
                    }`}>
                      {tournament.registrationStatus}
                    </div>
                    {tournament.isDummy && (
                      <div className="absolute top-0 left-0 m-4 px-2 py-1 bg-neon-pink rounded font-future text-cyber-black font-bold">
                        DEMO
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-future text-xl font-bold">{tournament.title}</h3>
                      <span className="bg-neon-purple text-white text-xs px-2 py-1 rounded">{tournament.game}</span>
                    </div>
                    <div className="flex flex-col gap-2 text-gray-400 mb-4">
                      <div className="flex justify-between">
                        <span>Prize Pool: <span className="text-neon-pink">{tournament.prize}</span></span>
                        <span>Entry: <span className="text-white">{tournament.entryFee}</span></span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date: <span className="text-white">{new Date(tournament.date).toLocaleDateString()}</span></span>
                        <span>Location: <span className="text-white">{tournament.location}</span></span>
                      </div>
                    </div>
                    <div className="border-t border-gray-700 pt-4 mt-4 flex justify-between items-center">
                      <span className="text-neon-blue">{tournament.participants} / {tournament.maxParticipants} Participants</span>
                      <button className={`px-4 py-2 rounded font-future ${
                        tournament.registrationStatus === "Open" ? "bg-neon-blue hover:bg-neon-purple" : "bg-gray-700 cursor-not-allowed"
                      } transition-colors duration-300`}>
                        DETAILS
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-cyber-gray">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-future text-3xl font-bold mb-4">CREATE YOUR OWN <span className="text-neon-pink">TOURNAMENT</span></h2>
          <p className="max-w-2xl mx-auto text-gray-300 mb-8">
            Ready to host your own competition? Create a custom tournament and invite players from around the world to compete.
          </p>
          <motion.button 
            className="px-8 py-3 bg-neon-pink text-white font-future font-bold rounded hover:shadow-neon-pink transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/create-tournament')}
          >
            CREATE TOURNAMENT
          </motion.button>
        </div>
      </section>
    </div>
  );
} 