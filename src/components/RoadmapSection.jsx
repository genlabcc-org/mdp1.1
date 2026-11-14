import { useEffect, useRef, useState } from 'react';
import './RoadmapSection.css';

const ROADMAP_STEPS = [
  {
    id: 1,
    title: 'REGISTRATION',
    description:
      'check in at the venue, grab your pass, and meet fellow designers before we kick off.',
  },
  {
    id: 2,
    title: 'INTRO SESSION',
    description:
      'get a quick walkthrough of the event flow, guidelines, and the creative challenges ahead.',
  },
  {
    id: 3,
    title: 'DESIGNATHON',
    description:
      'dive into the live design challenge to experiment, create, and bring your boldest ideas to life.',
  },
  {
    id: 4,
    title: 'COMMUNITY TALK',
    description:
      'connect with fellow creatives, share stories, and spark conversations with your local design tribe.',
  },
  {
    id: 5,
    title: 'FEEDBACK SESSION',
    isSpecial: true,
    description:
      'showcase your work, get real feedback from experienced designers and peers, and celebrate together.',
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
              EVENT
              <span className="roadmap-victory-badge">AGENDA</span>
            </h2>
            <p className="roadmap-subtitle">
              here is what we have lined up for the morning—don&apos;t miss a single moment.
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
