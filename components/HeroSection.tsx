'use client';

import Image from 'next/image';
import ParticlesBackground from './ParticlesBackground';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 bg-black relative" id="hero-section">
      <ParticlesBackground />
      <div className="max-w-7xl text-center relative z-10" id="hero-content">
        {/* Profile Picture */}
        <div className="overflow-hidden mb-8 opacity-0" id="profile-container">
          <div className="w-40 h-40 mx-auto rounded-full overflow-hidden profile-glow transition-all duration-300">
            <Image 
              src="https://github.com/Normeno-ID.png" 
              alt="Profile" 
              width={160}
              height={160}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl text-white font-bold mb-6 text-shadow-glow">
          <div className="overflow-hidden">
            <span className="block text-white" id="first-line">
              Hello, I am <span className="text-glow">Normeno</span>!
            </span>
          </div>
          <div className="overflow-hidden opacity-0" id="subtitle-container">
            <span className="text-2xl text-gray-400 block mt-4" id="wanna-be">
              Wanna be
            </span>
            <span className="block text-glow text-4xl mt-2" id="second-line">
              Developer
            </span>
          </div>
        </h1>

        {/* Quote Section */}
        <div className="mt-12 text-gray-400 italic opacity-0" id="quote-container">
          <p className="text-sm md:text-base leading-relaxed">
            &ldquo;Someday, we will find<br/>
            what we are looking for<br/>
            Or maybe not.<br/>
            Maybe we&apos;ll find something<br/>
            much greater than that.&rdquo;
          </p>
          <p className="text-red-500 mt-2 text-sm">- Rio Futaba</p>
        </div>
      </div>
    </section>
  );
} 