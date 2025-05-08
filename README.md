# Esports Tournament Platform

A modern web application for managing esports tournaments with MongoDB integration.

## Features

- Browse tournaments, events, and arenas
- Create and manage tournaments
- User authentication (sign-up and sign-in)
- Cyberpunk-themed UI
- MongoDB integration for data persistence

## Tech Stack

- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: Express, MongoDB, Mongoose
- **Development**: Concurrently, Nodemon

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- MongoDB (local installation or MongoDB Atlas account)
- MongoDB Compass (for database visualization)

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd esports-tournament-platform
```

2. Install dependencies
```bash
npm install
```

3. Configure MongoDB

   a. Create a `.env` file in the root directory using the example:
   ```
   # Copy from env.example
   cp env.example .env
   ```
   
   b. Update the MongoDB connection string in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/esportsPlatform
   ```
   
   If using MongoDB Atlas, replace with your connection string:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/esportsPlatform
   ```
   
   c. Add JWT secret for authentication:
   ```
   JWT_SECRET=your-secret-key-here
   ```

4. Run the development server
```bash
npm run dev
```

This will start both the React frontend (http://localhost:3000) and Express backend (http://localhost:5000) concurrently.

## MongoDB Connection

- Ensure your MongoDB service is running if using a local installation
- Open MongoDB Compass and connect to the same URI specified in your `.env` file
- The application will automatically create the required collections

### Required MongoDB Collections

Before running the application, make sure you have the following collections in your MongoDB database:

1. **tournaments** - Stores tournament data
2. **users** - Stores user accounts for authentication

These collections will be created automatically when the application runs and data is added for the first time.

## Project Structure

```
/
├── public/               # Static assets
├── server/               # Backend code
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   └── index.js          # Server entry point
├── src/                  # Frontend code
│   ├── components/       # Reusable UI components
│   ├── pages/            # Main page components
│   └── App.js            # Main application component
├── .env                  # Environment variables (create from env.example)
└── package.json          # Project dependencies and scripts
```

## User Authentication

The platform includes user authentication with the following features:
- User registration and login
- JWT token-based authentication
- Protected routes for authorized users
- User profile management

## Creating Tournaments

1. Navigate to the Tournaments page
2. Click the "CREATE TOURNAMENT" button
3. Fill out the tournament details in the form
4. Submit the form to save to MongoDB
5. Your tournament will appear in the tournaments list

## Recent Updates

### UI Improvements (May 2024)

- **PageHeader Component Enhancement**: 
  - Added more padding at the top to prevent header content from sticking to the navigation bar
  - Increased minimum height for better visual spacing
  - Improved spacing between title and subtitle elements
  - Optimized spacing for the search section beneath page headers
  - Made spacing uniform across all pages for visual consistency

- **Search Components**:
  - Created specialized search components for different sections:
    - TournamentSearch: For filtering tournaments by game and registration status
    - ArenaSearch: For searching venue locations and capacities
    - GallerySearch: For filtering photo gallery by categories
    - CommunitySearch: For searching community posts and discussions

- **Background Image Extension**:
  - Background images now extend to cover both header and search bar sections in all pages
  - Implemented with a unified design approach using the PageHeader component

## Development Notes

- The application uses concurrently to run both frontend and backend in development
- Changes to backend code require server restart (handled by nodemon)
- Frontend uses React's development server with hot reloading
