import { useEffect, useRef, useState } from 'react';
import './CardsSection.css';

const CARDS_DATA = [
  {
    id: 'activity-1',
    number: '01',
    name: 'final.final.jpeg',
    frontImg: '/cards/compete-card.png',
    backImg: '/cards/compete-back.png',
    textColor: '#FFCDD9',
    alt: 'final.final.jpeg - Uno Card',
    baseRotate: -15,
    baseY: 0,
    baseMargin: -45,
    zIndex: 1,
  },
  {
    id: 'activity-2',
    number: '02',
    name: 'Stick No Bills',
    frontImg: '/cards/conquer.png',
    backImg: '/cards/conquer-back.png',
    textColor: '#FFCDD9',
    alt: 'Stick No Bills - Uno Card',
    baseRotate: 0,
    baseY: -80,
    baseMargin: -45,
    zIndex: 2,
  },
  {
    id: 'activity-3',
    number: '03',
    name: 'Error 404',
    frontImg: '/cards/collaborate-card.png',
    backImg: '/cards/collab-back.png',
    textColor: '#FFCDD9',
    alt: 'Error 404 - Uno Card',
    baseRotate: 15,
    baseY: 0,
    baseMargin: -45,
    zIndex: 3,
  },
];

const STATS_DATA = [
  { value: '100+', label: 'Designers' },
  { value: '21 NOV 2026', label: 'Kickstart' },
  { value: '3 HOURS', label: 'Duration' },
  { value: 'OFFLINE', label: 'Stage' },
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
      <div className="uno-cards-container">
        <h2 className="uno-section-heading">DESIGNATHON ACTIVITY</h2>

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

                  {/* Back Side: Activity Content */}
                  <div
                    className="uno-card-face uno-card-back"
                    style={{ '--card-text-color': card.textColor }}
                  >
                    <img
                      src={card.backImg}
                      alt={`${card.name} Details`}
                      className="uno-card-img"
                      loading="lazy"
                    />
                    <div className="uno-card-back-overlay">
                      <span className="uno-card-corner uno-card-corner-tl">
                        {card.number}
                      </span>
                      <span className="uno-card-center-title">
                        {card.name}
                      </span>
                      <span className="uno-card-corner uno-card-corner-br">
                        {card.number}
                      </span>
                    </div>
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
