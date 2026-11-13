import { useRef, useState, useEffect } from 'react';
import './CommunitySection.css';

const CommunitySection = () => {
  const reelUrl = 'https://www.instagram.com/reel/DeHYvaCy8oe/?cplk=MXFjdWp6ODI2bzk3Zw==';
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Fallback if browser blocks immediate autoplay
      });
    }
  }, []);

  const toggleSound = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleCardClick = () => {
    window.open(reelUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="community-section" id="community">
      <div className="community-outer-card">
        {/* Left Side: Community Group Photo */}
        <div className="community-photo-wrapper">
          <img
            src="/group-photo.jpg"
            alt="Makka Design Pakka 1.1 Community - Uncommon Institute of Design"
            className="community-photo-img"
          />
        </div>

        {/* Right Side: Live Playing Instagram Reel */}
        <div
          onClick={handleCardClick}
          className="community-reel-card"
          aria-label="Watch Makka Design Pakka 1.1 Reel on Instagram"
          id="instagram-reel-link"
          role="link"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCardClick();
          }}
        >
          <div className="reel-media-wrapper">
            {/* Live Playing Video */}
            <video
              ref={videoRef}
              src="/reel-video.mp4"
              poster="/reel-thumbnail.jpg"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="reel-video-element"
            />

            {/* Top Bar Overlay */}
            <div className="reel-top-bar">
              <div className="reel-badge">
                <svg
                  className="reel-icon-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>Reel</span>
              </div>
              <span className="reel-handle">@uid.cc</span>
            </div>

            {/* Sound Toggle Button */}
            <button
              type="button"
              className="reel-sound-toggle"
              onClick={toggleSound}
              aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                /* Muted Icon */
                <svg
                  className="sound-icon-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
              ) : (
                /* Unmuted Icon */
                <svg
                  className="sound-icon-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
