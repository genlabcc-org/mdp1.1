import HeroSection from '../components/HeroSection';
import NagercoilSection from '../components/NagercoilSection';
import RoadmapSection from '../components/RoadmapSection';
import CommunitySection from '../components/CommunitySection';
import LearnMoreSection from '../components/LearnMoreSection';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <NagercoilSection />
      <RoadmapSection />
      <CommunitySection />
      <LearnMoreSection />
      {/* <FaqSection /> */}
      <Footer />
    </div>
  );
};

export default Home;
