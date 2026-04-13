import HeroSection from '../components/home/HeroSection';
import StatsBar from '../components/home/StatsBar';
import WhyEliteSection from '../components/home/WhyEliteSection';
import CTASection from '../components/home/CTASection';

const heroImg = 'https://media.base44.com/images/public/69dcf9f1af90480281ca6ada/3514684ab_generated_79128ee0.png';

export default function Home() {
  return (
    <div>
      <HeroSection heroImg={heroImg} />
      <StatsBar />
      <WhyEliteSection />
      <CTASection />
    </div>
  );
}