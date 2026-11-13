import { useEffect, useRef, useState } from 'react';
import './RoadmapSection.css';

const ROADMAP_STEPS = [
  {
    id: 1,
    title: 'REGISTER NOW',
    description: 'Complete your registration and brace for the updates from our team!',
  },
  {
    id: 2,
    title: 'CRACK THE CODE!',
    description:
      'Take the Design Quotient (DQ) test to showcase your ability to decipher, resolve, and create with design excellence.',
  },
  {
    id: 3,
    title: 'BE ONLINE BY THIS TIME',
    description:
      'The problem statement for you and your team will be revealed during the kick-off call, make sure to be on time.',
  },
  {
    id: 4,
    title: 'WORK HARD, PLAY HARDER',
    description:
      'Connect with your team members who will complement and support your Designathon journey.',
  },
  {
    id: 5,
    title: 'KICK OFF!',
    description:
      'You will be taken through the problem statement and a detailed overview of the guidelines of the Designathon.',
  },
  {
    id: 6,
    title: 'JURY EVALUATION',
    description:
      'Our esteemed jury will evaluate your work so that the best of the best gets the acclaim.',
  },
  {
    id: 7,
    title: 'WIN YOUR REWARDS',
    description:
      'Winners get lucrative cash prizes and rewards as a mark of support and encouragement from the Sandskriti design community.',
  },
  {
    id: 8,
    title: 'GET. SET. GOING',
    isSpecial: true,
    description:
      'The stage is yours! Step up, bring your best ideas to life, and make your mark.',
  },
];

const RoadmapSection = () => {
  const stepsColRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeStepId, setActiveStepId] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!stepsColRef.current) return;
      const stepElements = stepsColRef.current.children;
      if (!stepElements || stepElements.length === 0) return;

      const triggerY = window.innerHeight * 0.45;
      const firstRect = stepElements[0].getBoundingClientRect();
      const lastRect = stepElements[stepElements.length - 1].getBoundingClientRect();

      const startY = firstRect.top + firstRect.height * 0.5;
      const endY = lastRect.top + lastRect.height * 0.5;
      const totalSpan = endY - startY;

      if (totalSpan <= 0) return;

      const rawProgress = (triggerY - startY) / totalSpan;
      const clamped = Math.max(0, Math.min(1, rawProgress));
      setProgress(clamped);

      // Determine which step is currently closest to the trigger point
      let closestId = 1;
      let minDistance = Infinity;

      Array.from(stepElements).forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height * 0.5;
        const dist = Math.abs(center - triggerY);
        if (dist < minDistance) {
          minDistance = dist;
          closestId = ROADMAP_STEPS[index]?.id || 1;
        }
      });

      setActiveStepId(closestId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section className="roadmap-section" id="roadmap">
      <div className="roadmap-container">
        {/* Left: Sticky Title - Locks in place while scrolling */}
        <div className="roadmap-header-col">
          <div className="roadmap-sticky-content">
            <h2 className="roadmap-main-title">
              ROADMAP TO
              <span className="roadmap-victory-badge">VICTORY!</span>
            </h2>
            <p className="roadmap-subtitle">
              Follow the steps closely, you don&apos;t want to miss any detail, they&apos;re too important.
            </p>
          </div>
        </div>

        {/* Center: Sticky Timeline Track with animated star */}
        <div className="roadmap-timeline-col">
          <div className="roadmap-timeline-sticky">
            <div className="roadmap-track-line">
              <div
                className="roadmap-track-fill"
                style={{ height: `${progress * 100}%` }}
              />
              <div
                className="roadmap-star-marker"
                style={{ top: `${progress * 100}%` }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" fill="none" className="roadmap-star-svg">
                  <path
                    d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z"
                    fill="#ffffff"
                    stroke="#111111"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Milestones list flowing naturally in page scroll */}
        <div className="roadmap-steps-col" ref={stepsColRef}>
          {ROADMAP_STEPS.map((step) => {
            const isActive = step.id === activeStepId;
            return (
              <div
                key={step.id}
                className={`roadmap-step-item ${isActive ? 'step-active' : ''}`}
              >
                <h3
                  className={`roadmap-step-title ${
                    step.isSpecial ? 'step-title-special' : ''
                  }`}
                >
                  {step.title}
                </h3>
                <p className="roadmap-step-desc">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
