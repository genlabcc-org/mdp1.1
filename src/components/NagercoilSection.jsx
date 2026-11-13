import './NagercoilSection.css';

const NagercoilSection = () => {
  return (
    <section className="city-section" id="nagercoil">
      {/* Typography Content */}
      <div className="city-container">
        <div className="city-text-wrapper">
          <p className="city-subheading">
            something uncommon<br />
            is coming to
          </p>
          <h2 className="city-main-heading">
            NAGERCOIL
          </h2>
        </div>
      </div>

      {/* Full-Width Landmark Panoramic Graphic */}
      <div className="city-image-wrapper">
        <img 
          src="/desktopnagercoil.png" 
          alt="Nagercoil Landmarks Illustration" 
          className="city-landmark-img"
        />
      </div>
    </section>
  );
};

export default NagercoilSection;
