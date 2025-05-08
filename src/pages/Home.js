import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Mock data for featured tournaments
const featuredTournaments = [
  {
    id: 1,
    title: "Global Masters Series",
    game: "League of Legends",
    prize: "$50,000",
    image: "https://picsum.photos/600/400",
    date: "June 15, 2025"
  },
  {
    id: 2,
    title: "Cyber Strike Championship",
    game: "CS2",
    prize: "$30,000",
    image: "https://picsum.photos/600/400?random=1",
    date: "July 2, 2025"
  },
  {
    id: 3,
    title: "Battle Royale Invitational",
    game: "Fortnite",
    prize: "$25,000",
    image: "https://picsum.photos/600/400?random=2",
    date: "May 28, 2025"
  }
];

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-cyber-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-black via-cyber-gray to-cyber-black opacity-80 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080')] bg-cover bg-center opacity-40"></div>
        
        <div className="absolute inset-0">
          {/* Animated grid lines for cyberpunk effect */}
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(to right, #00f2ff11 1px, transparent 1px), linear-gradient(to bottom, #00f2ff11 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <motion.div 
          className="relative z-20 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-future text-5xl md:text-7xl font-bold mb-4">
            <span className="text-white">NEXUS</span>
            <span className="text-neon-blue">ARENA</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-gray-300">
            Host and compete in world-class esports tournaments. 
            Elevate your game to new heights.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/tournaments">
              <motion.button 
                className="px-8 py-3 bg-neon-blue text-cyber-black font-future font-bold rounded hover:shadow-neon transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                FIND TOURNAMENTS
              </motion.button>
            </Link>
            <Link to="/create-tournament">
              <motion.button 
                className="px-8 py-3 bg-transparent border-2 border-neon-purple text-white font-future font-bold rounded hover:shadow-neon-purple transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                HOST AN EVENT
              </motion.button>
            </Link>
          </div>
        </motion.div>
        
        {/* Animated scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5L12 19M12 19L5 12M12 19L19 12" stroke="#00f2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </section>

      {/* Featured Tournaments Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-future text-3xl md:text-4xl font-bold mb-2">FEATURED <span className="text-neon-blue">TOURNAMENTS</span></h2>
          <div className="h-1 w-24 bg-neon-blue mb-10"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTournaments.map((tournament) => (
              <motion.div 
                key={tournament.id}
                className="bg-cyber-gray rounded-lg overflow-hidden hover:shadow-neon transition-all duration-300"
                whileHover={{ y: -10 }}
              >
                <img src={tournament.image} alt={tournament.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-future text-xl font-bold">{tournament.title}</h3>
                    <span className="bg-neon-purple text-white text-xs px-2 py-1 rounded">{tournament.game}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 mb-4">
                    <span>Prize Pool: <span className="text-neon-pink">{tournament.prize}</span></span>
                    <span>{tournament.date}</span>
                  </div>
                  <Link to="/tournaments">
                    <button className="w-full py-2 bg-cyber-black border border-neon-blue text-neon-blue font-future font-medium rounded hover:bg-neon-blue hover:text-cyber-black transition-colors duration-300">
                      VIEW DETAILS
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/tournaments" className="inline-flex items-center font-future text-neon-blue hover:text-white transition-colors duration-300">
              VIEW ALL TOURNAMENTS
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Arena Showcase Section */}
      <section className="py-20 px-4 md:px-8 bg-cyber-gray">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="font-future text-3xl md:text-4xl font-bold mb-2">PREMIUM <span className="text-neon-blue">ARENAS</span></h2>
              <div className="h-1 w-24 bg-neon-blue mb-6"></div>
              <p className="text-gray-300 mb-8">
                Book world-class esports venues for your next tournament or event. Our network of partner arenas offers top-tier gaming setups, production capabilities, and audience experiences.
              </p>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/arena">
                  <button className="inline-block px-8 py-3 bg-neon-purple text-white font-future font-bold rounded hover:shadow-neon-purple transition-all duration-300">
                    EXPLORE ARENAS
                  </button>
                </Link>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <img src="https://picsum.photos/800/450" alt="Esports Arena" className="rounded-lg w-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-lg"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Community Stats */}
      <section className="py-20 px-4 md:px-8">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-future text-3xl md:text-4xl font-bold text-center mb-16">JOIN THE <span className="text-neon-blue">COMMUNITY</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Active Players", value: "250K+" },
              { label: "Tournaments Completed", value: "5.2K" },
              { label: "Prize Money Awarded", value: "$2.7M" },
              { label: "Partner Arenas", value: "120+" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="bg-cyber-gray rounded-lg p-6 text-center"
                whileHover={{ y: -5, boxShadow: '0 0 10px #00f2ff' }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-future text-4xl font-bold text-neon-blue mb-2">{stat.value}</h3>
                <p className="text-gray-300 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-cyber-gray to-cyber-black">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-future text-3xl md:text-5xl font-bold mb-6">READY TO <span className="text-neon-pink">COMPETE</span>?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Create your player account today and start your journey to the top of the competitive gaming world.
          </p>
          <Link to="/signup">
            <motion.button 
              className="px-10 py-4 bg-neon-blue text-cyber-black font-future font-bold text-lg rounded-lg hover:shadow-neon transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SIGN UP NOW
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}