const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

// Use the correct connection string
const uri = 'mongodb://127.0.0.1:27017/esportsPlatform';
console.log('Attempting to connect to MongoDB with URI:', uri);

// Sample tournaments
const sampleTournaments = [
  {
    title: "Global Masters Series",
    game: "League of Legends",
    prize: "$50,000",
    entryFee: "$25",
    date: new Date("2025-06-15"),
    startTime: "14:00",
    endTime: "22:00",
    registrationDeadline: new Date("2025-06-10"),
    location: "Online",
    registrationStatus: "Open",
    maxParticipants: 128,
    participants: 64,
    description: "Join the biggest League of Legends tournament of the year with teams from around the world competing for the grand prize.",
    rules: "Standard tournament rules apply. Check website for details.",
    imageUrl: "https://picsum.photos/800/450?random=20",
    contactEmail: "contact@globalmasters.com",
    createdAt: new Date()
  },
  {
    title: "Cyber Strike Championship",
    game: "CS2",
    prize: "$30,000",
    entryFee: "$20",
    date: new Date("2025-07-02"),
    startTime: "10:00",
    endTime: "20:00",
    registrationDeadline: new Date("2025-06-25"),
    location: "Los Angeles, USA",
    registrationStatus: "Open",
    maxParticipants: 64,
    participants: 32,
    description: "The most prestigious Counter-Strike tournament in North America. Compete against the best teams and prove your skills.",
    rules: "Teams of 5. Double elimination bracket.",
    imageUrl: "https://picsum.photos/800/450?random=21",
    contactEmail: "info@cyberstrike.com",
    createdAt: new Date()
  }
];

async function addTestTournaments() {
  try {
    // Connect to MongoDB
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000
    });
    console.log('Connected successfully to MongoDB');
    
    // Load Tournament model
    // Note: models may not be registered yet, so we need to require it directly
    const Tournament = require('../src/models/Tournament');
    
    // Check if we already have tournaments
    const existingCount = await Tournament.countDocuments();
    console.log(`Found ${existingCount} existing tournaments`);
    
    if (existingCount > 0) {
      console.log('Tournaments already exist, skipping insertion');
    } else {
      // Insert sample tournaments
      const result = await Tournament.insertMany(sampleTournaments);
      console.log(`Added ${result.length} sample tournaments to the database`);
    }
    
    // Display all tournaments
    const allTournaments = await Tournament.find();
    console.log('Current tournaments in database:');
    allTournaments.forEach(tournament => {
      console.log(`- ${tournament.title} (${tournament.game}): ${tournament.registrationStatus}`);
    });
    
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the connection
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

addTestTournaments(); 