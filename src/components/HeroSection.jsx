import Header from './Header';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-container" id="hero">
      {/* 4 Corner Ornaments */}
      <img
        src="/1.png"
        alt="Top Left Corner Ornament"
        className="hero-corner hero-corner-tl"
      />
      <img
        src="/2.png"
        alt="Top Right Corner Ornament"
        className="hero-corner hero-corner-tr"
      />
      <img
        src="/3.png"
        alt="Bottom Left Corner Ornament"
        className="hero-corner hero-corner-bl"
      />
      <img
        src="/4.png"
        alt="Bottom Right Corner Ornament"
        className="hero-corner hero-corner-br"
      />

      {/* Top Header with Centered Logo */}
      <Header />

      {/* Center Event Branding */}
      <div className="hero-main">
        {/* Main MAKKA DESIGN PAKKA 1.1 Logo */}
        <div className="hero-badge-wrapper">
          <img
            src="/herologo.png"
            alt="MAKKA DESIGN PAKKA 1.1"
            className="hero-title-img"
          />
        </div>

        {/* 1.1 Version Graphic */}
        <div className="hero-version-wrapper">
          <img
            src="/version-1.1.svg"
            alt="1.1"
            className="hero-version-img"
          />
        </div>

        {/* Ticket Registration Stamp */}
        <img
          src="/ticket-registration.png"
          alt="Ticket Registration ₹199"
          className="hero-date-badge"
        />

        {/* Venue Information Line */}
        <p className="hero-venue-text">
          <strong>Venue:</strong> 2nd Floor, MARK9 Office, Chettikulam
        </p>

        {/* 3-Layer Register Now Button */}
        <div className="hero-cta-wrapper">
          <a
            href="https://luma.com/fk3rbn8c"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-register-btn"
            id="hero-register-now-btn"
          >
            Register Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
