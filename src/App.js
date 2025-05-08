import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Arena from './pages/Arena';
import Tournaments from './pages/Tournaments';
import Community from './pages/Community';
import Gallery from './pages/Gallery';
import CreateTournament from './pages/CreateTournament';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col bg-cyber-black">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/arena" element={<Arena />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/community" element={<Community />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/create-tournament" element={<CreateTournament />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            {/* Add future routes here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
