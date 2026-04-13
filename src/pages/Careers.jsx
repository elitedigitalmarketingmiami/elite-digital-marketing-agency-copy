import { useState } from 'react';
import { Code, Wand2, Share2, Shield, Palette } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import JobCard from '../components/careers/JobCard';
import CareerApplicationForm from '../components/careers/CareerApplicationForm';

const positions = [
  {
    title: 'Coder',
    icon: Code,
    description: 'Build and maintain the tools and platforms that power Elite. Work with cutting-edge tech to create seamless experiences for our creators and team.',
  },
  {
    title: 'Generator',
    icon: Wand2,
    description: 'Find and craft AI prompts daily for our image generation pipeline. Stay on top of trends and create stunning visuals that drive engagement.',
  },
  {
    title: 'Social Media Manager',
    icon: Share2,
    description: 'Manage and grow our brand presence across Instagram, TikTok, and more. Create engaging content and build our community.',
  },
  {
    title: 'General Marketing Manager',
    icon: Shield,
    description: 'The CEO\'s right hand. Oversee operations, ensure everything runs smoothly, and manage the day-to-day of the marketing team.',
  },
  {
    title: 'Content Strategist',
    icon: Palette,
    description: 'Create the content strategy for our brand. Plan campaigns, design visuals, and craft the narrative that makes Elite stand out.',
  },
];

export default function Careers() {
  const [selectedPosition, setSelectedPosition] = useState(null);

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {!selectedPosition ? (
          <>
            <SectionHeading
              badge="Join Our Team"
              title={<>Careers with <span className="text-primary">Elite</span></>}
              subtitle="We're building the best creator management team in the industry. If you're talented, driven, and ready to make an impact — we want to hear from you."
            />

            <div className="space-y-4">
              {positions.map((pos, i) => (
                <JobCard
                  key={pos.title}
                  icon={pos.icon}
                  title={pos.title}
                  description={pos.description}
                  onClick={() => setSelectedPosition(pos.title)}
                  index={i}
                />
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground font-body">
                All positions are remote-friendly. Contact us at{' '}
                <a href="tel:5618884869" className="text-primary">(561) 888-4869</a> or{' '}
                <a href="mailto:elitemarketing@proton.me" className="text-primary">elitemarketing@proton.me</a>
              </p>
            </div>
          </>
        ) : (
          <CareerApplicationForm
            position={selectedPosition}
            onBack={() => setSelectedPosition(null)}
          />
        )}
      </div>
    </div>
  );
}