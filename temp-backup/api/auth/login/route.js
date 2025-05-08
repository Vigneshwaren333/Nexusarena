import { connectToDatabase } from '@/lib/mongodb';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export async function POST(request) {
  console.log('Processing user login request...');
  
  try {
    // Connect to database
    const { db } = await connectToDatabase();
    
    // Parse request body
    const { email, password } = await request.json();
    console.log('Login attempt for:', email);
    
    // Find user
    const user = await db.collection('users').findOne({ email });
    
    if (!user) {
      console.log('User not found with email:', email);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid credentials' 
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Verify password
    const isPasswordValid = await compare(password, user.password);
    
    if (!isPasswordValid) {
      console.log('Invalid password for user:', email);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid credentials' 
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Create JWT token
    const token = sign(
      { 
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-default-secret',
      { expiresIn: '30d' }
    );
    
    console.log('User logged in successfully:', user.username);
    
    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = user;
    
    return new Response(JSON.stringify({ 
      success: true,
      token,
      user: userWithoutPassword
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 