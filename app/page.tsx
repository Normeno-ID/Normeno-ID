'use client';

import dynamic from 'next/dynamic';

// Dynamically import components with no SSR
const LoadingScreen = dynamic(() => import('../components/LoadingScreen'), {
  ssr: false
});

const Navbar = dynamic(() => import('../components/Navbar'), {
  ssr: false
});

const HeroSection = dynamic(() => import('../components/HeroSection'), {
  ssr: false
});

const AboutSection = dynamic(() => import('../components/AboutSection'), {
  ssr: false
});

const SkillsSection = dynamic(() => import('../components/SkillsSection'), {
  ssr: false
});

const RepositoriesSection = dynamic(() => import('../components/RepoSection'), {
  ssr: false
});

const SocialSection = dynamic(() => import('../components/SocialSection'), {
  ssr: false
});

export default function Home() {
  return (
    <main className="bg-black font-poppins overflow-hidden">
      <LoadingScreen />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <RepositoriesSection />
      <SocialSection />
    </main>
  );
} 