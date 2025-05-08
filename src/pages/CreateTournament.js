import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Game options for the form
const gameOptions = [
  "League of Legends",
  "CS2",
  "Fortnite",
  "Street Fighter 6",
  "Dota 2",
  "Gran Turismo 7",
  "Valorant",
  "Call of Duty",
  "FIFA 24",
  "Apex Legends",
  "Other"
];

// Location options (or allow custom)
const locationOptions = [
  "Online",
  "Los Angeles, USA",
  "Tokyo, Japan",
  "Berlin, Germany",
  "Seoul, South Korea",
  "London, UK",
  "New York, USA",
  "Paris, France",
  "Toronto, Canada",
  "Other"
];

export default function CreateTournament() {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    game: '',
    prize: '',
    entryFee: '',
    date: '',
    location: '',
    registrationStatus: 'Open',
    maxParticipants: '',
    description: '',
    rules: '',
    imageUrl: '',
    customGame: '',
    customLocation: '',
    contactEmail: '',
    startTime: '',
    endTime: '',
    registrationDeadline: ''
  });

  // Custom field visibility
  const [showCustomGame, setShowCustomGame] = useState(false);
  const [showCustomLocation, setShowCustomLocation] = useState(false);
  
  // Form validation
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle special cases
    if (name === 'game' && value === 'Other') {
      setShowCustomGame(true);
    } else if (name === 'game' && value !== 'Other') {
      setShowCustomGame(false);
    }
    
    if (name === 'location' && value === 'Other') {
      setShowCustomLocation(true);
    } else if (name === 'location' && value !== 'Other') {
      setShowCustomLocation(false);
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = "Tournament title is required";
    if (!formData.game && !formData.customGame) newErrors.game = "Game is required";
    if (!formData.date) newErrors.date = "Tournament date is required";
    if (!formData.location && !formData.customLocation) newErrors.location = "Location is required";
    if (!formData.maxParticipants) newErrors.maxParticipants = "Maximum participants is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.contactEmail) newErrors.contactEmail = "Contact email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) newErrors.contactEmail = "Invalid email format";
    
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    
    // Prepare data for submission (using the custom fields if selected)
    const finalData = {
      ...formData,
      game: formData.game === 'Other' ? formData.customGame : formData.game,
      location: formData.location === 'Other' ? formData.customLocation : formData.location,
      // Use placeholder image if no image URL provided
      imageUrl: formData.imageUrl || "https://picsum.photos/800/450?random=99"
    };

    try {
      // API call to MongoDB backend
      const response = await fetch('http://localhost:5000/api/tournaments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create tournament');
      }
      
      const data = await response.json();
      console.log("Tournament created:", data);
      
      // Show success message
      alert("Tournament created successfully!");
      
      // Redirect to tournaments page
      navigate('/tournaments');
    } catch (error) {
      console.error("Error creating tournament:", error);
      setErrors({ submit: error.message || "Failed to create tournament. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black text-white">
      {/* Header Section */}
      <section className="py-12 px-4 bg-cyber-gray">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-future text-4xl font-bold mb-3">
            CREATE <span className="text-neon-blue">TOURNAMENT</span>
          </h1>
          <div className="h-1 w-24 bg-neon-blue mb-6"></div>
          <p className="text-gray-300 max-w-3xl">
            Fill out the form below to create your own esports tournament. You'll be able to manage registrations, 
            results, and communicate with participants once your tournament is live.
          </p>
        </div>
      </section>
      
      {/* Form Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="glass-panel-dark p-8">
            <div className="cyber-grid rounded-lg p-0.5">
              <div className="bg-cyber-black p-8 rounded-lg">
                {/* Tournament Basic Info */}
                <h2 className="font-future text-2xl font-bold mb-6 text-neon-purple">TOURNAMENT DETAILS</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Tournament Title */}
                  <div className="col-span-full">
                    <label className="block text-gray-300 mb-2 font-future">TOURNAMENT TITLE <span className="text-neon-pink">*</span></label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="input-cyber w-full"
                      placeholder="e.g. Global Masters Championship"
                    />
                    {errors.title && <p className="text-red-500 mt-1 text-sm">{errors.title}</p>}
                  </div>
                  
                  {/* Game */}
                  <div className={showCustomGame ? "md:col-span-1" : "md:col-span-2"}>
                    <label className="block text-gray-300 mb-2 font-future">GAME <span className="text-neon-pink">*</span></label>
                    <div className="relative">
                      <select
                        name="game"
                        value={formData.game}
                        onChange={handleChange}
                        className="input-cyber w-full appearance-none"
                      >
                        <option value="">Select Game</option>
                        {gameOptions.map((game) => (
                          <option key={game} value={game}>{game}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-5 h-5 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                    {errors.game && <p className="text-red-500 mt-1 text-sm">{errors.game}</p>}
                  </div>
                  
                  {/* Custom Game */}
                  {showCustomGame && (
                    <div className="md:col-span-1">
                      <label className="block text-gray-300 mb-2 font-future">SPECIFY GAME</label>
                      <input
                        type="text"
                        name="customGame"
                        value={formData.customGame}
                        onChange={handleChange}
                        className="input-cyber w-full"
                        placeholder="Enter game name"
                      />
                    </div>
                  )}
                  
                  {/* Prize Pool */}
                  <div className="md:col-span-1">
                    <label className="block text-gray-300 mb-2 font-future">PRIZE POOL</label>
                    <input
                      type="text"
                      name="prize"
                      value={formData.prize}
                      onChange={handleChange}
                      className="input-cyber w-full"
                      placeholder="e.g. $10,000"
                    />
                  </div>
                  
                  {/* Entry Fee */}
                  <div className="md:col-span-1">
                    <label className="block text-gray-300 mb-2 font-future">ENTRY FEE</label>
                    <input
                      type="text"
                      name="entryFee"
                      value={formData.entryFee}
                      onChange={handleChange}
                      className="input-cyber w-full"
                      placeholder="e.g. $25 or Free"
                    />
                  </div>
                  
                  {/* Tournament Date */}
                  <div className="md:col-span-1">
                    <label className="block text-gray-300 mb-2 font-future">TOURNAMENT DATE <span className="text-neon-pink">*</span></label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="input-cyber w-full"
                    />
                    {errors.date && <p className="text-red-500 mt-1 text-sm">{errors.date}</p>}
                  </div>
                  
                  {/* Registration Deadline */}
                  <div className="md:col-span-1">
                    <label className="block text-gray-300 mb-2 font-future">REGISTRATION DEADLINE</label>
                    <input
                      type="date"
                      name="registrationDeadline"
                      value={formData.registrationDeadline}
                      onChange={handleChange}
                      className="input-cyber w-full"
                    />
                  </div>
                  
                  {/* Start Time */}
                  <div className="md:col-span-1">
                    <label className="block text-gray-300 mb-2 font-future">START TIME</label>
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      className="input-cyber w-full"
                    />
                  </div>
                  
                  {/* End Time */}
                  <div className="md:col-span-1">
                    <label className="block text-gray-300 mb-2 font-future">END TIME (ESTIMATED)</label>
                    <input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      className="input-cyber w-full"
                    />
                  </div>
                  
                  {/* Location */}
                  <div className={showCustomLocation ? "md:col-span-1" : "md:col-span-2"}>
                    <label className="block text-gray-300 mb-2 font-future">LOCATION <span className="text-neon-pink">*</span></label>
                    <div className="relative">
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="input-cyber w-full appearance-none"
                      >
                        <option value="">Select Location</option>
                        {locationOptions.map((loc) => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-5 h-5 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                    {errors.location && <p className="text-red-500 mt-1 text-sm">{errors.location}</p>}
                  </div>
                  
                  {/* Custom Location */}
                  {showCustomLocation && (
                    <div className="md:col-span-1">
                      <label className="block text-gray-300 mb-2 font-future">SPECIFY LOCATION</label>
                      <input
                        type="text"
                        name="customLocation"
                        value={formData.customLocation}
                        onChange={handleChange}
                        className="input-cyber w-full"
                        placeholder="Enter location"
                      />
                    </div>
                  )}
                  
                  {/* Registration Status */}
                  <div className="md:col-span-1">
                    <label className="block text-gray-300 mb-2 font-future">REGISTRATION STATUS</label>
                    <div className="relative">
                      <select
                        name="registrationStatus"
                        value={formData.registrationStatus}
                        onChange={handleChange}
                        className="input-cyber w-full appearance-none"
                      >
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                        <option value="Invitation">Invitation Only</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-5 h-5 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Maximum Participants */}
                  <div className="md:col-span-1">
                    <label className="block text-gray-300 mb-2 font-future">MAXIMUM PARTICIPANTS <span className="text-neon-pink">*</span></label>
                    <input
                      type="number"
                      name="maxParticipants"
                      value={formData.maxParticipants}
                      onChange={handleChange}
                      className="input-cyber w-full"
                      placeholder="e.g. 32, 64, 128"
                      min="2"
                    />
                    {errors.maxParticipants && <p className="text-red-500 mt-1 text-sm">{errors.maxParticipants}</p>}
                  </div>
                  
                  {/* Contact Email */}
                  <div className="md:col-span-2">
                    <label className="block text-gray-300 mb-2 font-future">CONTACT EMAIL <span className="text-neon-pink">*</span></label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      className="input-cyber w-full"
                      placeholder="tournament@example.com"
                    />
                    {errors.contactEmail && <p className="text-red-500 mt-1 text-sm">{errors.contactEmail}</p>}
                  </div>
                </div>
                
                {/* Tournament Details */}
                <h2 className="font-future text-2xl font-bold mb-6 text-neon-purple">ADDITIONAL INFORMATION</h2>
                
                <div className="grid grid-cols-1 gap-6 mb-8">
                  {/* Description */}
                  <div>
                    <label className="block text-gray-300 mb-2 font-future">TOURNAMENT DESCRIPTION <span className="text-neon-pink">*</span></label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="input-cyber w-full h-32"
                      placeholder="Provide a detailed description of your tournament..."
                    ></textarea>
                    {errors.description && <p className="text-red-500 mt-1 text-sm">{errors.description}</p>}
                  </div>
                  
                  {/* Rules */}
                  <div>
                    <label className="block text-gray-300 mb-2 font-future">TOURNAMENT RULES</label>
                    <textarea
                      name="rules"
                      value={formData.rules}
                      onChange={handleChange}
                      className="input-cyber w-full h-32"
                      placeholder="List the rules and format of your tournament..."
                    ></textarea>
                  </div>
                  
                  {/* Image URL */}
                  <div>
                    <label className="block text-gray-300 mb-2 font-future">IMAGE URL (OPTIONAL)</label>
                    <input
                      type="text"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      className="input-cyber w-full"
                      placeholder="https://example.com/tournament-image.jpg"
                    />
                    <p className="text-gray-500 text-sm mt-1">Leave blank to use a default image</p>
                  </div>
                </div>
                
                {/* Submit Error */}
                {errors.submit && (
                  <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded">
                    <p className="text-red-500">{errors.submit}</p>
                  </div>
                )}
                
                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
                  <motion.button
                    type="button"
                    onClick={() => navigate('/tournaments')}
                    className="px-6 py-3 bg-cyber-gray border border-neon-blue text-white font-future rounded hover:bg-cyber-black transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    CANCEL
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-3 bg-neon-purple text-white font-future rounded hover:bg-neon-blue hover:text-cyber-black transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? 'CREATING...' : 'CREATE TOURNAMENT'}
                  </motion.button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      
      {/* Information Section */}
      <section className="py-12 px-4 bg-cyber-gray">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-future text-3xl font-bold mb-6">
            HOW IT <span className="text-neon-pink">WORKS</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-neon-purple text-white font-future text-xl mb-4">1</div>
              <h3 className="font-future text-xl font-bold mb-3">Create Tournament</h3>
              <p className="text-gray-300">Fill out the form with all necessary details about your tournament.</p>
            </div>
            <div className="glass-panel p-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-neon-purple text-white font-future text-xl mb-4">2</div>
              <h3 className="font-future text-xl font-bold mb-3">Manage Registrations</h3>
              <p className="text-gray-300">Review and approve participants as they register for your tournament.</p>
            </div>
            <div className="glass-panel p-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-neon-purple text-white font-future text-xl mb-4">3</div>
              <h3 className="font-future text-xl font-bold mb-3">Run Your Event</h3>
              <p className="text-gray-300">Use our platform tools to manage brackets, scores, and communicate with participants.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 