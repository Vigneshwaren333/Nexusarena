import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  // Add connection options with higher timeout values
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000,
  serverSelectionTimeoutMS: 30000,
  maxPoolSize: 10
};

let client = null;
let clientPromise = null;

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

export async function connectToDatabase() {
  try {
    if (!client) {
      client = new MongoClient(uri, options);
      clientPromise = client.connect();
    }

    const db = (await clientPromise).db();
    console.log('Connected to MongoDB database:', db.databaseName);
    return { client, db };
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
} 