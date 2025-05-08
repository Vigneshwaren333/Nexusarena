const { MongoClient } = require('mongodb');

// Try multiple connection strings
const connectionStrings = [
  'mongodb://localhost:27017/esportsPlatform',
  'mongodb://127.0.0.1:27017/esportsPlatform'
];

async function checkConnection() {
  console.log('Checking MongoDB connections...');
  
  for (const uri of connectionStrings) {
    try {
      console.log(`Trying to connect to: ${uri}`);
      const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000, // 5 seconds timeout
        connectTimeoutMS: 5000
      });
      
      await client.connect();
      console.log('✅ SUCCESS! Connected to MongoDB');
      console.log(`  - Connection string: ${uri}`);
      
      const db = client.db();
      console.log(`  - Database name: ${db.databaseName}`);
      
      // Check if collections exist
      const collections = await db.listCollections().toArray();
      console.log(`  - Collections: ${collections.map(c => c.name).join(', ') || 'None'}`);
      
      await client.close();
      console.log('Connection closed');
      return true;
    } catch (error) {
      console.error(`❌ FAILED to connect to ${uri}:`);
      console.error(`  - Error: ${error.message}`);
    }
  }
  
  // If we reach here, all connection attempts failed
  console.log('\n❗ None of the MongoDB connection strings worked.');
  console.log('Please make sure MongoDB is installed and running on your system.');
  console.log('You can download MongoDB from: https://www.mongodb.com/try/download/community');
  console.log('Or use a MongoDB Atlas cloud database: https://www.mongodb.com/cloud/atlas/register');
  
  return false;
}

checkConnection(); 