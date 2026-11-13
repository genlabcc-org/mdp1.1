import { useEffect, useRef, useState } from 'react';
import './CardsSection.css';

const CARDS_DATA = [
  {
    id: 'collaborate',
    name: 'Collaborate',
    frontImg: '/cards/compete-card.png',
    backImg: '/cards/compete-back.png',
    alt: 'Collaborate - Uno Card',
    baseRotate: -15,
    baseY: 0,
    baseMargin: -45,
    zIndex: 1,
  },
  {
    id: 'compete',
    name: 'Compete',
    frontImg: '/cards/conquer.png',
    backImg: '/cards/conquer-back.png',
    alt: 'Compete - Uno Card',
    baseRotate: 0,
    baseY: -80,
    baseMargin: -45,
    zIndex: 2,
  },
  {
    id: 'conquer',
    name: 'Conquer',
    frontImg: '/cards/collaborate-card.png',
    backImg: '/cards/collab-back.png',
    alt: 'Conquer - Uno Card',
    baseRotate: 15,
    baseY: 0,
    baseMargin: -45,
    zIndex: 3,
  },
];

const STATS_DATA = [
  { value: '2000+', label: 'Brawlers' },
  { value: 'MAY 2025', label: 'Kickstart' },
  { value: '4 WEEKS', label: 'Duration' },
  { value: 'VIRTUAL', label: 'Stage' },
];

const CardsSection = () => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [flippedCards, setFlippedCards] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start spreading when section enters viewport, finish when centered
      const startPoint = windowHeight * 0.95;
      const endPoint = windowHeight * 0.45;
      const totalSpan = startPoint - endPoint;

      const current = startPoint - rect.top;
      const progress = Math.max(0, Math.min(1, current / totalSpan));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip(id);
    }
  };

  return (
    <section className="uno-cards-section" id="uno-cards" ref={sectionRef}>
      <h2 className="sr-only">Designathon Stages: Collaborate, Compete, and Conquer</h2>

      <div className="uno-cards-container">
        {/* Top: 3 UNO Cards */}
        <div className="uno-cards-row">
          {CARDS_DATA.map((card) => {
            const isFlipped = flippedCards[card.id] || hoveredCard === card.id;

            // Calculate animated transform for desktop
            const currentRotate = isMobile ? 0 : card.baseRotate * (1 - scrollProgress);
            const currentY = isMobile ? 0 : card.baseY * (1 - scrollProgress);
            const currentMargin = isMobile ? 0 : card.baseMargin * (1 - scrollProgress);

            return (
              <div
                key={card.id}
                className={`uno-card-item uno-card-${card.id} ${
                  scrollProgress >= 0.7 ? 'cards-spread' : ''
                }`}
                style={{
                  transform: `translate3d(0, ${currentY}px, 0) rotate(${currentRotate}deg)`,
                  marginLeft: `${currentMargin}px`,
                  marginRight: `${currentMargin}px`,
                  zIndex: hoveredCard === card.id ? 20 : card.zIndex,
                }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => toggleFlip(card.id)}
                onKeyDown={(e) => handleKeyDown(e, card.id)}
                role="button"
                tabIndex={0}
                aria-label={`${card.name} card. Click or press Enter to flip.`}
              >
                <div
                  className={`uno-card-flipper ${isFlipped ? 'is-flipped' : ''}`}
                >
                  {/* Front Side: Reverse Uno Card */}
                  <div className="uno-card-face uno-card-front">
                    <img
                      src={card.frontImg}
                      alt={card.alt}
                      className="uno-card-img"
                      loading="lazy"
                    />
                  </div>

                  {/* Back Side: Details & Action */}
                  <div className="uno-card-face uno-card-back">
                    <img
                      src={card.backImg}
                      alt={`${card.name} Details`}
                      className="uno-card-img"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom: 4 Stats Items on the Same Line */}
        <div className="uno-stats-row">
          {STATS_DATA.map((stat, idx) => (
            <div key={idx} className="uno-stat-item">
              <span className="uno-stat-value">{stat.value}</span>
              <span className="uno-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardsSection;
