import HeroSection from '../components/home/HeroSection';
import StatsBar from '../components/home/StatsBar';
import WhyEliteSection from '../components/home/WhyEliteSection';
import CTASection from '../components/home/CTASection';

const heroImg = '/__generating__/img_50e23e28a7a7.png';

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