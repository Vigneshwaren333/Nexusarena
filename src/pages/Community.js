import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import CommunitySearch from '../components/CommunitySearch';

// Post category options
const categories = [
  "All Posts",
  "General Discussion",
  "Game Strategies",
  "Tournament Info",
  "Team Recruitment",
  "Hardware & Setup",
  "Events & Meetups",
  "Support & FAQ"
];

// Mock data for community posts
const communityPosts = [
  {
    id: 1,
    title: "Tips for Improving Your APM in RTS Games",
    content: "After years of competitive play, I've developed some techniques that dramatically improved my Actions Per Minute. I went from 60 APM to over 300 in just a few months by focusing on these key areas...",
    author: {
      name: "ProGamerX",
      avatar: "https://ui-avatars.com/api/?name=ProGamerX&background=random",
      role: "Pro Player"
    },
    date: "2 hours ago",
    likes: 124,
    comments: 43,
    tags: ["Game Strategies", "Tips", "RTS"],
    liked: true
  },
  {
    id: 2,
    title: "Looking for Team Members - CS2 Tournament",
    content: "Our team needs two more players (preferably riflers/support) for the upcoming Cyber Strike Regional Championship. Requirements: Global Elite rank or equivalent FACEIT level 8+, 18+ years old, able to practice at least 4 days a week...",
    author: {
      name: "TeamCaptain",
      avatar: "https://ui-avatars.com/api/?name=TeamCaptain&background=random",
      role: "Team Leader"
    },
    date: "5 hours ago",
    likes: 56,
    comments: 38,
    tags: ["Team Recruitment", "CS2", "Tournament"],
    liked: false
  },
  {
    id: 3,
    title: "My Setup for Ultra Low Latency Gaming",
    content: "After testing dozens of configurations, I've managed to get my system latency down to 5.2ms. Here's my complete hardware list and configuration guide including BIOS settings, Windows optimizations, and driver tweaks...",
    author: {
      name: "LatencyGuru",
      avatar: "https://ui-avatars.com/api/?name=LatencyGuru&background=random",
      role: "Hardware Enthusiast"
    },
    date: "Yesterday",
    likes: 215,
    comments: 67,
    tags: ["Hardware & Setup", "Guide", "Performance"],
    liked: false
  },
  {
    id: 4,
    title: "Global Masters Series - Official Discussion Thread",
    content: "Use this thread to discuss the ongoing Global Masters Series tournament. Day 3 matches are about to begin with Team Nova facing Midnight Legends in what promises to be an incredible showdown...",
    author: {
      name: "TournamentMod",
      avatar: "https://ui-avatars.com/api/?name=TournamentMod&background=random",
      role: "Moderator"
    },
    date: "1 day ago",
    likes: 98,
    comments: 132,
    tags: ["Tournament Info", "Official", "Discussion"],
    liked: true
  },
  {
    id: 5,
    title: "Beginner's Guide to Fighting Games",
    content: "New to the FGC (Fighting Game Community)? This guide covers all the basics from terminology and notation to practice routines. I'll break down frame data, hit confirmation, combos and even mental game aspects...",
    author: {
      name: "FGC_Veteran",
      avatar: "https://ui-avatars.com/api/?name=FGC_Veteran&background=random",
      role: "Content Creator"
    },
    date: "2 days ago",
    likes: 176,
    comments: 51,
    tags: ["Game Strategies", "Guide", "Fighting Games"],
    liked: false
  }
];

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent"); // 'recent' or 'popular'
  
  // Filter posts based on selected category and search term
  const filteredPosts = communityPosts
    .filter(post => {
      // Category filter (simplified for demo)
      if (selectedCategory !== "All Posts") {
        const categoryMatches = post.tags.some(tag => 
          tag.toLowerCase().includes(selectedCategory.toLowerCase().replace(" & ", " ").replace("s", ""))
        );
        if (!categoryMatches) return false;
      }
      
      // Search term filter
      if (searchTerm && 
          !post.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !post.content.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !post.author.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    // Sort posts
    .sort((a, b) => {
      if (sortBy === "popular") {
        return b.likes - a.likes;
      }
      // Default sort by recent (using id as proxy for date in this mock data)
      return b.id - a.id;
    });

  // Search component for PageHeader
  const renderCommunitySearch = () => (
    <CommunitySearch 
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      sortBy={sortBy}
      setSortBy={setSortBy}
    />
  );

  return (
    <div className="min-h-screen bg-cyber-black text-white">
      {/* Page header with search */}
      <PageHeader 
        title="NEXUS"
        accentText="COMMUNITY"
        subtitle="Connect with players, share strategies, and join the conversation"
        backgroundImage="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071"
        accentColor="neon-purple"
        searchSection={renderCommunitySearch()}
      />

      {/* Main Content */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-cyber-gray rounded-lg p-6 sticky top-6">
                <h3 className="font-future text-neon-blue text-xl mb-6">CATEGORIES</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded ${
                          selectedCategory === category
                            ? 'bg-neon-purple bg-opacity-20 text-neon-purple'
                            : 'text-gray-300 hover:bg-cyber-black hover:text-white'
                        } transition-colors duration-200`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <h3 className="font-future text-neon-blue text-xl mb-6">JOIN THE COMMUNITY</h3>
                  <button className="w-full bg-neon-purple text-white py-2 px-4 rounded font-future hover:shadow-neon-purple transition-all duration-200">
                    CREATE ACCOUNT
                  </button>
                  <div className="text-center mt-4 text-gray-400 text-sm">
                    Already a member? <a href="#" className="text-neon-blue hover:underline">Sign In</a>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-future text-neon-blue text-xl mb-4">COMMUNITY STATS</h3>
                  <div className="flex justify-between text-gray-300">
                    <div>Active members:</div>
                    <div className="text-neon-purple">125,487</div>
                  </div>
                  <div className="flex justify-between text-gray-300 mt-2">
                    <div>Posts this week:</div>
                    <div className="text-neon-purple">3,276</div>
                  </div>
                  <div className="flex justify-between text-gray-300 mt-2">
                    <div>Online now:</div>
                    <div className="text-neon-purple">2,831</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="lg:w-3/4">
              {/* Posts */}
              <div className="space-y-6">
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-20 bg-cyber-gray rounded-lg">
                    <svg className="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                    </svg>
                    <h3 className="text-2xl font-future text-gray-400 mb-2">No Posts Found</h3>
                    <p className="text-gray-500">Try adjusting your filters or search term</p>
                  </div>
                ) : (
                  filteredPosts.map(post => (
                    <motion.div
                      key={post.id}
                      className="bg-cyber-gray rounded-lg overflow-hidden hover:shadow-lg hover:shadow-neon-purple/20 transition-all duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-10 h-10 rounded-full mr-4"
                          />
                          <div>
                            <div className="font-semibold text-white">{post.author.name}</div>
                            <div className="text-xs text-neon-purple">{post.author.role}</div>
                          </div>
                          <div className="ml-auto text-gray-400 text-sm">{post.date}</div>
                        </div>
                        
                        <h3 className="font-future text-xl font-bold mb-3 text-white">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-300 mb-4 line-clamp-3">
                          {post.content}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-cyber-black px-2 py-1 text-xs rounded text-neon-blue"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-6">
                            <button className="flex items-center text-gray-400 hover:text-neon-pink">
                              <svg className="w-5 h-5 mr-1" fill={post.liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                              </svg>
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center text-gray-400 hover:text-neon-blue">
                              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                              </svg>
                              <span>{post.comments}</span>
                            </button>
                          </div>
                          <button className="text-neon-blue hover:text-white transition-colors">
                            Read More
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
              
              {/* Load More */}
              {filteredPosts.length > 0 && (
                <div className="mt-8 text-center">
                  <button className="px-6 py-2 border border-neon-purple text-neon-purple rounded hover:bg-neon-purple hover:text-white transition-colors duration-200">
                    LOAD MORE
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 