# Nexus Arena - Esports Tournament Platform

![Nexus Arena](https://picsum.photos/800/400?random=1)

Nexus Arena is a modern, feature-rich esports tournament platform that enables users to create, join, and manage gaming tournaments across various games and platforms.

## Features

- **Tournament Management**: Create, browse, and join esports tournaments
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Modern UI optimized for all devices
- **Real-time Updates**: Get instant notifications about tournament progress
- **Rich Tournament Details**: Comprehensive information including prizes, schedules, and rules

## Tech Stack

- **Frontend**: React.js with Framer Motion for animations
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Styling**: Tailwind CSS with custom cyberpunk theme

## Installation

### Prerequisites

- Node.js (v14.0.0 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/Vigneshwaren333/Nexusarena.git
   cd Nexusarena
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following configurations:
     ```
     PORT=3000
     BACKEND_PORT=5000
     MONGODB_URI=mongodb://127.0.0.1:27017/esportsPlatform
     JWT_SECRET=your-secret-key-for-jwt-tokens
     ```

4. Start the development server:
   ```
   npm start
   ```

## Usage

After starting the server, you can access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Example API Endpoints

- `GET /api/tournaments` - Get all tournaments
- `POST /api/tournaments` - Create a new tournament
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

## Project Structure

```
esports-tournament-platform/
├── public/                 # Static files
├── src/                    # Source code
│   ├── api/                # API client functions
│   ├── components/         # React components
│   ├── lib/                # Utility functions
│   ├── models/             # Database models
│   ├── pages/              # Page components
│   ├── routes/             # API routes
│   ├── server/             # Server-side code
│   └── index.js            # Entry point
├── scripts/                # Helper scripts
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries, please reach out to:
- GitHub: [@Vigneshwaren333](https://github.com/Vigneshwaren333)

## Acknowledgements

- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [React.js](https://reactjs.org/)
