import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  console.log('Processing tournament fetch request...');
  
  try {
    // Connect to database
    const { db } = await connectToDatabase();
    
    // Fetch all tournaments
    console.log('Fetching tournaments from database...');
    const tournaments = await db.collection('tournaments').find({}).sort({ createdAt: -1 }).toArray();
    
    console.log(`Found ${tournaments.length} tournaments`);
    return new Response(JSON.stringify(tournaments), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(request) {
  console.log('Processing tournament creation request...');
  
  try {
    // Connect to database
    const { db } = await connectToDatabase();
    
    // Parse request body
    const data = await request.json();
    console.log('Received tournament data:', data);
    
    // Prepare tournament document
    const tournamentDoc = {
      ...data,
      createdAt: new Date(),
      participants: [],
      registrationStatus: data.registrationStatus || 'Open'
    };
    
    // Insert document with a timeout
    console.log('Inserting tournament into database...');
    const result = await db.collection('tournaments').insertOne(tournamentDoc);
    
    console.log('Tournament created successfully with ID:', result.insertedId);
    return new Response(JSON.stringify({ 
      success: true, 
      id: result.insertedId 
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error creating tournament:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 