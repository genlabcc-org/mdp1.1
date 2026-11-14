import HeroSection from '../components/HeroSection';
import NagercoilSection from '../components/NagercoilSection';
import RoadmapSection from '../components/RoadmapSection';
import CardsSection from '../components/CardsSection';
import CommunitySection from '../components/CommunitySection';
import LearnMoreSection from '../components/LearnMoreSection';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <NagercoilSection />
      <RoadmapSection />
      <CardsSection />
      <CommunitySection />
      <LearnMoreSection />
      {/* <FaqSection /> */}
    </div>
  );
};

export default Home;
