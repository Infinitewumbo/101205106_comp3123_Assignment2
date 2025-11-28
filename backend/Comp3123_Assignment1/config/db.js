const { MongoClient } = require('mongodb');

const dbName = 'comp3123_assigment1'; 

const uri = process.env.MONGO_URI; 

const client = new MongoClient(uri);

async function connectDB() {
  try {
    // Check if the client is already connected or connecting
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
        console.log("Connected successfully to MongoDB server.");
    }
    // Return the database instance for use in controllers
    return client.db(dbName); 
  } catch (err) {
    console.error("❌ ERROR: Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

module.exports = { connectDB };