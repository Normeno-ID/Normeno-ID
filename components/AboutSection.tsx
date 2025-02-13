'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Experience {
  years: number;
  months: number;
  days: number;
}

interface WakaTimeStats {
  data: {
    categories: Array<{
      name: string;
      total_seconds: number;
      percent: number;
    }>;
    languages: Array<{
      name: string;
      total_seconds: number;
      percent: number;
    }>;
    editors: Array<{
      name: string;
      total_seconds: number;
      percent: number;
    }>;
    total_seconds: number;
    daily_average_seconds: number;
  };
}

export default function AboutSection() {
  const [experience, setExperience] = useState<Experience>({ years: 0, months: 0, days: 0 });
  const [wakaStats, setWakaStats] = useState<WakaTimeStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchWakaStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/wakatime-stats');
        const responseText = await response.text();
        
        try {
          const data = JSON.parse(responseText);
          
          if (!response.ok) {
            console.error('API response error:', data);
            throw new Error(data.error || `HTTP error! status: ${response.status}`);
          }
          
          console.log('Raw Wakatime data:', data);
          console.log('Daily average seconds:', data?.data?.daily_average);
          
          setWakaStats({
            data: {
              ...data.data,
              daily_average_seconds: data.data.daily_average
            }
          });
        } catch (parseError) {
          console.error('JSON parse error:', parseError);
          console.error('Raw response:', responseText);
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching Wakatime stats:', error);
        setError(error instanceof Error ? error.message : 'Failed to load Wakatime stats');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWakaStats();
  }, []);

  const formatTime = (seconds: number | null): string => {
    if (!seconds || isNaN(seconds)) return '0m';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours === 0 && minutes === 0) return '0m';
    if (hours === 0) return `${minutes}m`;
    return `${hours}h ${minutes}m`;
  };

  // Tambahkan komponen loading dan error
  const LoadingCard = () => (
    <div className="relative bg-black p-6 rounded-lg">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-800 rounded w-3/4"></div>
        <div className="h-8 bg-gray-800 rounded w-1/2"></div>
      </div>
    </div>
  );

  const ErrorCard = ({ message }: { message: string }) => (
    <div className="relative bg-black p-6 rounded-lg">
      <p className="text-red-500">{message}</p>
    </div>
  );

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-4 sm:px-8 bg-black">
      <div className="max-w-6xl w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Wakatime Stats */}
          <div className="relative group space-y-3">
            {/* Coding Time Card */}
            <div className="relative group transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              {isLoading ? (
                <LoadingCard />
              ) : error ? (
                <ErrorCard message={error} />
              ) : (
                <div className="relative bg-black p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">Coding Time (Last 7 Days)</h3>
                  <div className="text-3xl font-bold text-red-500">
                    {wakaStats ? formatTime(wakaStats.data.total_seconds) : 'Loading...'}
                  </div>
                  <p className="text-gray-400 mt-2">
                    Daily Average: {wakaStats ? formatTime(wakaStats.data.daily_average_seconds) : 'Loading...'}
                  </p>
                </div>
              )}
            </div>

            {/* Languages Card */}
            <div className="relative group transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-black p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4">Top Languages</h3>
                <div className="space-y-3">
                  {wakaStats?.data.languages.slice(0, 5).map((lang) => (
                    <div key={lang.name}>
                      <div className="flex justify-between text-sm text-gray-300">
                        <span>{lang.name}</span>
                        <span>{lang.percent.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2.5">
                        <div
                          className="bg-gradient-to-r from-gray-600 to-white h-2.5 rounded-full"
                          style={{ width: `${lang.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <span className="text-red-500 font-medium">Introduction</span>
              <div className="space-y-2">
                <h2 className="text-4xl font-bold text-white">
                  About <span className="text-glow">Me</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-800"></div>
              </div>
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
                    src="https://lanyard.cnrad.dev/api/1237548153012617257?theme=dark&bg=000000"
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
