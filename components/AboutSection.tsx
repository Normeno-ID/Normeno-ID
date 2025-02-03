'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Experience {
  years: number;
  months: number;
  days: number;
}

export default function AboutSection() {
  const [experience, setExperience] = useState<Experience>({ years: 0, months: 0, days: 0 });

  useEffect(() => {
    const updateExperience = () => {
      const startDate = new Date('2025-01-04');
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const years = Math.floor(diffDays / 365);
      const remainingDaysAfterYears = diffDays % 365;
      const months = Math.floor(remainingDaysAfterYears / 30);
      const remainingDays = remainingDaysAfterYears % 30;

      setExperience({ years, months, days: remainingDays });
    };

    updateExperience();
    const interval = setInterval(updateExperience, 1000 * 60 * 60 * 24);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-4 sm:px-8 bg-black">
      <div className="max-w-6xl w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - GitHub Stats */}
          <div className="relative group space-y-3">
            {/* Most Used Languages */}
            <div className="relative group transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative">
                <Image 
                  src="https://github-readme-stats.vercel.app/api/top-langs/?username=Normeno-ID&layout=compact&theme=radical&hide_border=true&bg_color=0d1117&title_color=ff3333&text_color=ffffff"
                  alt="Most Used Languages" 
                  width={280}
                  height={120}
                  className="w-full rounded-lg"
                  unoptimized
                />
              </div>
            </div>

            {/* GitHub Streak Stats */}
            <div className="relative group transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative">
                <Image 
                  src="https://github-readme-streak-stats.herokuapp.com/?user=Normeno-ID&theme=radical&hide_border=true&background=0d1117&ring=ff3333&fire=ff3333&currStreakLabel=ff3333"
                  alt="GitHub Streak" 
                  width={570}
                  height={120}
                  className="w-full rounded-lg"
                  unoptimized
                />
              </div>
            </div>

            {/* GitHub Activity Graph */}
            <div className="relative group transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative">
                <Image 
                  src="https://github-readme-activity-graph.vercel.app/graph?username=Normeno-ID&theme=redical&bg_color=0d1117&color=ffffff&line=ff3333&point=ffffff&area=true&hide_border=true"
                  alt="GitHub Activity Graph" 
                  width={570}
                  height={120}
                  className="w-full rounded-lg"
                  unoptimized
                />
              </div>
            </div>
          </div>
          
          {/* Right Column - Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-white">About <span className="text-glow">Me</span></h2>
              <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-800"></div>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              Hello! 👋 Let me introduce myself, I&apos;m Normeno!<br/>
              I usually go by Ilham. I have a passion for drawing and interest in programming.
            </p>

            {/* Experience Counter */}
            <div className="mt-6">
              <div className="flex items-center space-x-4">
                <span className="text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <div>
                  <h3 className="text-white font-semibold">Experience</h3>
                  <p className="text-gray-400">
                    <span>{experience.years}</span> years{' '}
                    <span>{experience.months}</span> months{' '}
                    <span>{experience.days}</span> days of coding
                  </p>
                </div>
              </div>
            </div>

            {/* Discord Presence */}
            <div className="relative group transition-all duration-300 hover:scale-[1.02] mt-8">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative">
                <a href="https://discord.com/users/1237548153012617257" target="_blank" rel="noopener noreferrer">
                  <Image 
                    src="https://lanyard.cnrad.dev/api/1237548153012617257"
                    alt="Discord Presence" 
                    width={280}
                    height={120}
                    className="w-full rounded-lg"
                    unoptimized
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 