const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');

// Mock tournament data for fallback
const dummyTournaments = [
  {
    id: 1,
    title: "Global Masters Series",
    game: "League of Legends",
    prize: "$50,000",
    entryFee: "$25",
    date: "2025-06-15T00:00:00.000Z",
    location: "Online",
    registrationStatus: "Open",
    participants: 128,
    maxParticipants: 128,
    imageUrl: "https://picsum.photos/800/450?random=7",
    isDummy: true
  },
  {
    id: 2,
    title: "Cyber Strike Championship",
    game: "CS2",
    prize: "$30,000",
    entryFee: "$20",
    date: "2025-07-02T00:00:00.000Z",
    location: "Los Angeles, USA",
    registrationStatus: "Open",
    participants: 64,
    maxParticipants: 64,
    imageUrl: "https://picsum.photos/800/450?random=8",
    isDummy: true
  }
];

// Get all tournaments
router.get('/', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    // Check if mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, returning dummy data');
      return res.status(200).json(dummyTournaments);
    }
    
    const tournaments = await Tournament.find().sort({ createdAt: -1 });
    
    // If no tournaments, return dummy data
    if (tournaments.length === 0) {
      console.log('No tournaments found, returning dummy data');
      return res.status(200).json(dummyTournaments);
    }
    
    res.status(200).json(tournaments);
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    // In case of error, return dummy data
    res.status(200).json(dummyTournaments);
  }
});

// Get a single tournament
router.get('/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new tournament
router.post('/', async (req, res) => {
  try {
    // Format date fields if needed
    const tournamentData = {
      ...req.body
    };

    if (req.body.registrationDeadline) {
      tournamentData.registrationDeadline = new Date(req.body.registrationDeadline);
    }

    const tournament = new Tournament(tournamentData);
    const savedTournament = await tournament.save();
    res.status(201).json(savedTournament);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a tournament
router.put('/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    
    const updatedTournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedTournament);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a tournament
router.delete('/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    
    await Tournament.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Tournament deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 