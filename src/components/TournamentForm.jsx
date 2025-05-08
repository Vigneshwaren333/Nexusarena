'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TournamentForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    game: '',
    prize: '',
    entryFee: '',
    date: '',
    location: '',
    image: 'https://placehold.co/600x400',
    registrationStatus: 'Open'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user makes changes
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      console.log('Submitting tournament data:', formData);
      
      const response = await fetch('http://localhost:5000/api/tournaments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      console.log('Response from server:', data);
      
      if (data.success) {
        router.push('/tournaments');
      } else {
        throw new Error(data.error || 'Failed to create tournament');
      }
    } catch (error) {
      console.error('Error creating tournament:', error);
      setError(error.message || 'Failed to create tournament. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-[#1a1a1a] rounded-lg border border-[#00f2ff]/30">
      <h1 className="text-3xl font-bold text-[#00f2ff] mb-6">Create New Tournament</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-md text-red-200">
          <p className="font-medium">Error: {error}</p>
          <p className="text-sm mt-1">Please check your MongoDB connection or try again later.</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-[#00f2ff]">Tournament Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 bg-[#0a0a0a] border border-[#00f2ff]/30 rounded-md text-white focus:border-[#ff00ff] focus:ring-1 focus:ring-[#ff00ff] outline-none"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-[#00f2ff]">Game</label>
            <input
              type="text"
              name="game"
              value={formData.game}
              onChange={handleChange}
              className="w-full p-3 bg-[#0a0a0a] border border-[#00f2ff]/30 rounded-md text-white focus:border-[#ff00ff] focus:ring-1 focus:ring-[#ff00ff] outline-none"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-[#00f2ff]">Prize Pool</label>
            <input
              type="text"
              name="prize"
              value={formData.prize}
              onChange={handleChange}
              className="w-full p-3 bg-[#0a0a0a] border border-[#00f2ff]/30 rounded-md text-white focus:border-[#ff00ff] focus:ring-1 focus:ring-[#ff00ff] outline-none"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-[#00f2ff]">Entry Fee</label>
            <input
              type="text"
              name="entryFee"
              value={formData.entryFee}
              onChange={handleChange}
              className="w-full p-3 bg-[#0a0a0a] border border-[#00f2ff]/30 rounded-md text-white focus:border-[#ff00ff] focus:ring-1 focus:ring-[#ff00ff] outline-none"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-[#00f2ff]">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 bg-[#0a0a0a] border border-[#00f2ff]/30 rounded-md text-white focus:border-[#ff00ff] focus:ring-1 focus:ring-[#ff00ff] outline-none"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-[#00f2ff]">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 bg-[#0a0a0a] border border-[#00f2ff]/30 rounded-md text-white focus:border-[#ff00ff] focus:ring-1 focus:ring-[#ff00ff] outline-none"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-[#00f2ff]">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://placehold.co/600x400"
              className="w-full p-3 bg-[#0a0a0a] border border-[#00f2ff]/30 rounded-md text-white focus:border-[#ff00ff] focus:ring-1 focus:ring-[#ff00ff] outline-none"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-[#00f2ff]">Registration Status</label>
            <select
              name="registrationStatus"
              value={formData.registrationStatus}
              onChange={handleChange}
              className="w-full p-3 bg-[#0a0a0a] border border-[#00f2ff]/30 rounded-md text-white focus:border-[#ff00ff] focus:ring-1 focus:ring-[#ff00ff] outline-none"
              required
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Coming Soon">Coming Soon</option>
            </select>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => router.push('/tournaments')}
            className="px-6 py-3 bg-[#1a1a1a] border border-[#00f2ff]/30 text-[#00f2ff] font-bold rounded-md hover:bg-[#2a2a2a] transition-all"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-gradient-to-r from-[#7122fa] to-[#ff00ff] text-white font-bold rounded-md hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating...' : 'Create Tournament'}
          </button>
        </div>
      </form>
    </div>
  );
} 