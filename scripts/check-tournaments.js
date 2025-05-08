const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Try to load environment variables from .env.local or .env
const envPath = fs.existsSync(path.join(__dirname, '..', '.env.local')) 
  ? path.join(__dirname, '..', '.env.local')
  : path.join(__dirname, '..', '.env');

if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
  console.log(`Loaded environment from ${envPath}`);
} else {
  console.log('No .env or .env.local file found, using default connection string');
}

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/esportsPlatform';
console.log('Attempting to connect to MongoDB with URI:', uri);

async function checkTournaments() {
  const client = new MongoClient(uri, {
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
    serverSelectionTimeoutMS: 30000
  });

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    
    const db = client.db();
    console.log('Database name:', db.databaseName);
    
    // Check if tournaments collection exists
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    console.log('Existing collections:', collectionNames);
    
    if (!collectionNames.includes('tournaments')) {
      console.log('Warning: tournaments collection does not exist!');
    } else {
      // Count and display existing tournaments
      const tournamentsCount = await db.collection('tournaments').countDocuments();
      console.log(`Number of tournaments: ${tournamentsCount}`);
      
      if (tournamentsCount > 0) {
        // Show sample tournaments
        const tournaments = await db.collection('tournaments').find().limit(2).toArray();
        console.log('Sample tournaments:');
        console.log(JSON.stringify(tournaments, null, 2));
      } else {
        console.log('No tournaments found in the collection.');
      }
    }
    
    await client.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error checking tournaments:', error);
  }
}

checkTournaments(); 