import { connectToDatabase } from '@/lib/mongodb';
import { hash } from 'bcryptjs';

export async function POST(request) {
  console.log('Processing user registration request...');
  
  try {
    // Connect to database
    const { db } = await connectToDatabase();
    
    // Parse request body
    const { username, email, password } = await request.json();
    console.log('Received registration data for:', email);
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({
      $or: [{ email }, { username }]
    });
    
    if (existingUser) {
      console.log('User already exists with this email or username');
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'User with that email or username already exists' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Hash password
    const hashedPassword = await hash(password, 10);
    
    // Prepare user document
    const userDoc = {
      username,
      email,
      password: hashedPassword,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random`,
      role: 'user',
      createdAt: new Date()
    };
    
    // Insert document
    console.log('Inserting user into database...');
    const result = await db.collection('users').insertOne(userDoc);
    
    console.log('User registered successfully with ID:', result.insertedId);
    
    // Return success but don't include password
    const { password: _, ...userWithoutPassword } = userDoc;
    
    return new Response(JSON.stringify({ 
      success: true,
      user: {
        ...userWithoutPassword,
        id: result.insertedId
      }
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 