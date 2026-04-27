import { useState } from 'react';
import { Code, Wand2, Share2, Shield, Palette } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import JobCard from '../components/careers/JobCard';
import CareerApplicationForm from '../components/careers/CareerApplicationForm';

const positions = [
  {
    title: 'Coder',
    icon: Code,
    description: 'Architect and maintain the proprietary systems that power Elite\'s operations. Work with cutting-edge technology to build seamless, scalable platforms that give our creators and team an undeniable competitive edge.',
  },
  {
    title: 'Generator',
    icon: Wand2,
    description: 'Master the frontier of AI-driven content creation. Source and engineer precision prompts for our image generation pipeline daily — staying ahead of trends to produce visuals that captivate audiences and drive engagement at scale.',
  },
  {
    title: 'Social Media Manager',
    icon: Share2,
    description: 'Own and elevate our brand presence across Instagram, TikTok, and beyond. You don\'t just post content — you build communities, shape narratives, and drive organic growth that translates directly into creator success.',
  },
  {
    title: 'General Marketing Manager',
    icon: Shield,
    description: 'The strategic right hand of our CEO. You will oversee day-to-day operations, ensure executional excellence across every department, and serve as the organizational force that keeps Elite operating at its highest standard.',
  },
  {
    title: 'Content Strategist',
    icon: Palette,
    description: 'Define the creative direction of the Elite brand. From campaign architecture and visual identity to long-form content planning and brand voice — you will shape how the world perceives one of the fastest-growing agencies in the industry.',
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
              title={<>Build Something <span className="text-primary">Extraordinary</span></>}
              subtitle="We are assembling the most elite creator management team in the industry. If you bring rare talent, an obsession with excellence, and the drive to shape the future of the creator economy — we want to hear from you."
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
                All positions are remote-friendly. Reach us directly at{' '}
                <a href="tel:9548017858" className="text-primary">(954) 801-7858</a> or{' '}
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