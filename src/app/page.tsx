import {
  ContestSection,
  HeaderSection,
  SeasonSection,
  TodaySection,
  UpcomingSection,
  YouTubeSection,
} from '@/components';

const Homepage = async () => {
  return (
    <div className="max-w-8xl mx-auto p-6">
      <HeaderSection />
      <TodaySection />
      <ContestSection />
      <YouTubeSection />
      <SeasonSection />
      <UpcomingSection />
    </div>
  );
};

export default Homepage;
