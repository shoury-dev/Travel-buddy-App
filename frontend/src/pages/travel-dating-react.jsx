import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, X, Star, MapPin, Calendar, Users, Camera, 
  MessageCircle, Settings, Filter, Zap, Award, 
  Plane, Coffee, Mountain, Camera as CameraIcon,
  Music, Utensils, Gamepad2, Book
} from 'lucide-react';
import './travel-dating-css.css';

const TravelDating = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [matches, setMatches] = useState([]);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState(null);
  const [superLikes, setSuperLikes] = useState(3);
  const [showFilters, setShowFilters] = useState(false);
  const cardRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });

  const travelProfiles = [
    {
      id: 1,
      name: "Emma Chen",
      age: 28,
      location: "San Francisco, CA",
      destination: "Tokyo, Japan",
      travelDates: "Dec 15-28, 2023",
      groupSize: "2-3 people",
      budget: "$$$ (Premium)",
      travelStyle: "Adventure & Culture",
      images: [
        "https://images.unsplash.com/photo-1494790108755-2616b332c133?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop"
      ],
      interests: ["Photography", "Food Tours", "Temples", "Nightlife"],
      bio: "Digital nomad seeking fellow travelers for an epic Tokyo adventure! Love discovering hidden local gems and trying authentic street food. Let's explore temples by day and experience the amazing nightlife together! 🍜✨",
      verified: true,
      languages: ["English", "Mandarin", "Basic Japanese"],
      previousTrips: ["Thailand", "Vietnam", "South Korea"],
      personality: ["Adventurous", "Social", "Organized"]
    },
    {
      id: 2,
      name: "Marcus Johnson",
      age: 32,
      location: "Austin, TX",
      destination: "Bali, Indonesia",
      travelDates: "Jan 5-20, 2024",
      groupSize: "2-4 people",
      budget: "$$ (Moderate)",
      travelStyle: "Relaxation & Adventure",
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=600&fit=crop"
      ],
      interests: ["Surfing", "Yoga", "Hiking", "Local Culture"],
      bio: "Yoga instructor and surf enthusiast planning a mindful Bali retreat. Looking for like-minded travelers who want to balance adventure with relaxation. Beach days, temple visits, and amazing sunsets await! 🏄‍♂️🧘‍♂️",
      verified: true,
      languages: ["English", "Spanish"],
      previousTrips: ["Costa Rica", "Peru", "Mexico"],
      personality: ["Chill", "Spiritual", "Active"]
    },
    {
      id: 3,
      name: "Sofia Rodriguez",
      age: 26,
      location: "Barcelona, Spain",
      destination: "Morocco",
      travelDates: "Feb 10-25, 2024",
      groupSize: "3-5 people",
      budget: "$ (Budget)",
      travelStyle: "Cultural Immersion",
      images: [
        "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=400&h=600&fit=crop"
      ],
      interests: ["Markets", "Architecture", "Cooking", "History"],
      bio: "Architecture student fascinated by Moroccan design and culture. Want to explore ancient medinas, learn traditional cooking, and experience authentic Berber hospitality. Perfect for culture enthusiasts! 🕌🎨",
      verified: false,
      languages: ["Spanish", "English", "French", "Arabic (learning)"],
      previousTrips: ["Turkey", "Egypt", "Jordan"],
      personality: ["Curious", "Artistic", "Independent"]
    },
    {
      id: 4,
      name: "Jake Thompson",
      age: 29,
      location: "Denver, CO",
      destination: "New Zealand",
      travelDates: "Mar 1-21, 2024",
      groupSize: "2-3 people",
      budget: "$$$ (Premium)",
      travelStyle: "Extreme Adventure",
      images: [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1464822759844-d150baec3e5e?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=600&fit=crop"
      ],
      interests: ["Bungee Jumping", "Skydiving", "Hiking", "Photography"],
      bio: "Adrenaline junkie ready to conquer New Zealand's adventure capital! From bungee jumping in Queenstown to hiking the Milford Track. Only join if you're ready for the thrill of a lifetime! 🪂⛰️",
      verified: true,
      languages: ["English"],
      previousTrips: ["Iceland", "Norway", "Patagonia"],
      personality: ["Thrill-seeker", "Outgoing", "Fearless"]
    },
    {
      id: 5,
      name: "Priya Patel",
      age: 25,
      location: "London, UK",
      destination: "India (Golden Triangle)",
      travelDates: "Nov 20 - Dec 5, 2023",
      groupSize: "4-6 people",
      budget: "$$ (Moderate)",
      travelStyle: "Heritage & Wellness",
      images: [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1533621834623-d0b25d0b14e5?w=400&h=600&fit=crop"
      ],
      interests: ["Spirituality", "Ayurveda", "Palaces", "Meditation"],
      bio: "Returning to my roots! Planning a spiritual and cultural journey through Delhi, Agra, and Jaipur. Perfect blend of heritage sites, wellness retreats, and authentic experiences. Join my mindful adventure! 🕉️🏰",
      verified: true,
      languages: ["English", "Hindi", "Gujarati"],
      previousTrips: ["Nepal", "Sri Lanka", "Bhutan"],
      personality: ["Mindful", "Cultural", "Warm"]
    }
  ];

  const currentProfile = travelProfiles[currentProfileIndex];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentProfile && !isDragging) {
        setCurrentImageIndex(prev => 
          (prev + 1) % currentProfile.images.length
        );
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentProfile, isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    
    setDragOffset({ x: deltaX, y: deltaY });
    
    // Determine swipe direction
    if (Math.abs(deltaX) > 50) {
      setSwipeDirection(deltaX > 0 ? 'right' : 'left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (Math.abs(dragOffset.x) > 150) {
      if (dragOffset.x > 0) {
        handleLike();
      } else {
        handleReject();
      }
    }
    
    setDragOffset({ x: 0, y: 0 });
    setSwipeDirection(null);
  };

  const handleLike = () => {
    const profile = currentProfile;
    
    // Simulate match (50% chance)
    const isMatch = Math.random() > 0.5;
    
    if (isMatch) {
      setMatches(prev => [...prev, profile]);
      setMatchedProfile(profile);
      setShowMatch(true);
      
      setTimeout(() => {
        setShowMatch(false);
        nextProfile();
      }, 3000);
    } else {
      nextProfile();
    }
  };

  const handleReject = () => {
    nextProfile();
  };

  const handleSuperLike = () => {
    if (superLikes > 0) {
      setSuperLikes(prev => prev - 1);
      const profile = currentProfile;
      setMatches(prev => [...prev, profile]);
      setMatchedProfile(profile);
      setShowMatch(true);
      
      setTimeout(() => {
        setShowMatch(false);
        nextProfile();
      }, 3000);
    }
  };

  const nextProfile = () => {
    if (currentProfileIndex < travelProfiles.length - 1) {
      setCurrentProfileIndex(prev => prev + 1);
      setCurrentImageIndex(0);
    } else {
      // Reset or show "no more profiles" message
      setCurrentProfileIndex(0);
    }
  };

  const getInterestIcon = (interest) => {
    const iconMap = {
      'Photography': CameraIcon,
      'Food Tours': Utensils,
      'Surfing': Users,
      'Yoga': Heart,
      'Markets': Coffee,
      'Architecture': Mountain,
      'Bungee Jumping': Zap,
      'Spirituality': Star,
      'Temples': Mountain,
      'Nightlife': Music,
      'Hiking': Mountain,
      'Cooking': Utensils,
      'History': Book,
      'Skydiving': Plane,
      'Meditation': Heart,
      'Palaces': Award,
      'Ayurveda': Star
    };
    
    return iconMap[interest] || Star;
  };

  if (!currentProfile) {
    return (
      <div className="no-more-profiles">
        <h2>No more travel buddies!</h2>
        <p>Check back later for new adventurers</p>
        <button onClick={() => setCurrentProfileIndex(0)}>Start Over</button>
      </div>
    );
  }

  return (
    <div className="travel-dating-app">
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <div className="app-logo">
            <Plane size={24} />
            <span>TravelMatch</span>
          </div>
        </div>
        <div className="header-right">
          <button 
            className="filter-btn"
            onClick={() => setShowFilters(true)}
          >
            <Filter size={20} />
          </button>
          <button className="messages-btn">
            <MessageCircle size={20} />
            {matches.length > 0 && (
              <span className="notification-badge">{matches.length}</span>
            )}
          </button>
          <button className="settings-btn">
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Main Card Container */}
      <div className="card-container">
        <div 
          className={`profile-card ${swipeDirection ? `swipe-${swipeDirection}` : ''}`}
          ref={cardRef}
          style={{
            transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.1}deg)`,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Image Container */}
          <div className="image-container">
            <img 
              src={currentProfile.images[currentImageIndex]} 
              alt={currentProfile.name}
              className="profile-image"
            />
            
            {/* Image Dots */}
            <div className="image-dots">
              {currentProfile.images.map((_, index) => (
                <div 
                  key={index}
                  className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>

            {/* Verification Badge */}
            {currentProfile.verified && (
              <div className="verification-badge">
                <Award size={16} />
              </div>
            )}

            {/* Swipe Indicators */}
            {swipeDirection === 'right' && (
              <div className="swipe-indicator like-indicator">
                <Heart size={40} />
                <span>LIKE</span>
              </div>
            )}
            {swipeDirection === 'left' && (
              <div className="swipe-indicator reject-indicator">
                <X size={40} />
                <span>NOPE</span>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="profile-info">
            <div className="profile-header">
              <h2>{currentProfile.name}, {currentProfile.age}</h2>
              <div className="location">
                <MapPin size={16} />
                <span>{currentProfile.location}</span>
              </div>
            </div>

            <div className="trip-details">
              <div className="trip-item">
                <Plane size={16} />
                <span>{currentProfile.destination}</span>
              </div>
              <div className="trip-item">
                <Calendar size={16} />
                <span>{currentProfile.travelDates}</span>
              </div>
              <div className="trip-item">
                <Users size={16} />
                <span>{currentProfile.groupSize}</span>
              </div>
            </div>

            <div className="interests-container">
              <h4>Interests</h4>
              <div className="interests-grid">
                {currentProfile.interests.map((interest, index) => {
                  const IconComponent = getInterestIcon(interest);
                  return (
                    <div key={index} className="interest-tag">
                      <IconComponent size={14} />
                      <span>{interest}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bio-section">
              <p>{currentProfile.bio}</p>
            </div>

            <div className="additional-info">
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Budget:</span>
                  <span className="value">{currentProfile.budget}</span>
                </div>
                <div className="info-item">
                  <span className="label">Style:</span>
                  <span className="value">{currentProfile.travelStyle}</span>
                </div>
                <div className="info-item">
                  <span className="label">Languages:</span>
                  <span className="value">{currentProfile.languages.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="personality-tags">
              {currentProfile.personality.map((trait, index) => (
                <span key={index} className="personality-tag">{trait}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button 
          className="action-btn reject-btn"
          onClick={handleReject}
        >
          <X size={24} />
        </button>
        
        <button 
          className="action-btn super-like-btn"
          onClick={handleSuperLike}
          disabled={superLikes === 0}
        >
          <Star size={20} />
          <span className="super-like-count">{superLikes}</span>
        </button>
        
        <button 
          className="action-btn like-btn"
          onClick={handleLike}
        >
          <Heart size={24} />
        </button>
      </div>

      {/* Match Overlay */}
      {showMatch && matchedProfile && (
        <div className="match-overlay">
          <div className="match-content">
            <div className="match-header">
              <h1>IT'S A MATCH!</h1>
              <p>You and {matchedProfile.name} both want to explore {matchedProfile.destination}</p>
            </div>
            
            <div className="match-profiles">
              <div className="match-profile">
                <img src={matchedProfile.images[0]} alt="You" />
                <span>You</span>
              </div>
              <div className="match-heart">
                <Heart size={32} fill="currentColor" />
              </div>
              <div className="match-profile">
                <img src={matchedProfile.images[0]} alt={matchedProfile.name} />
                <span>{matchedProfile.name}</span>
              </div>
            </div>
            
            <div className="match-actions">
              <button className="match-message-btn">
                Send Message
              </button>
              <button 
                className="match-continue-btn"
                onClick={() => setShowMatch(false)}
              >
                Keep Swiping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="progress-indicator">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentProfileIndex + 1) / travelProfiles.length) * 100}%` }}
          />
        </div>
        <span className="progress-text">
          {currentProfileIndex + 1} of {travelProfiles.length}
        </span>
      </div>
    </div>
  );
};

export default TravelDating;