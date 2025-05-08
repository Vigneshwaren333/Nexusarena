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

async function testAuthCollection() {
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
    
    // Create the users collection if it doesn't exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    console.log('Existing collections:', collectionNames);
    
    if (!collectionNames.includes('users')) {
      console.log('Creating users collection...');
      await db.createCollection('users');
      console.log('Users collection created successfully');
    } else {
      console.log('Users collection already exists');
      
      // Count existing users
      const userCount = await db.collection('users').countDocuments();
      console.log(`Number of existing users: ${userCount}`);
    }
    
    // Create a test user if collection is empty
    const userCount = await db.collection('users').countDocuments();
    
    if (userCount === 0) {
      console.log('Creating a test user...');
      const testUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: '$2a$10$XQCrbF7NkiMCwmCi2UTsVO9wxQtbryNzTrM6UXgK6ohz0ZnHu9cAC', // hashed 'password123'
        avatar: 'https://ui-avatars.com/api/?name=Test+User&background=random',
        role: 'user',
        createdAt: new Date()
      };
      
      const result = await db.collection('users').insertOne(testUser);
      console.log('Test user created with ID:', result.insertedId);
    }
    
    await client.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error testing authentication database:', error);
  }
}

testAuthCollection(); 