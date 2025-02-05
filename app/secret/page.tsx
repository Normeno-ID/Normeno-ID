'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ParticlesBackground from '@/components/ParticlesBackground';
import { useEffect, useState } from 'react';

const waifus = [
  {
    name: 'Ellen Joe',
    anime: 'Zenless Zone Zero',
    image: '/Waifu/Ellen-Joe.jpg',
  },
  {
    name: 'Furina',
    anime: 'Genshin Impact',
    image: '/Waifu/Furina.jpg',
  },
  {
    name: 'Hayase Yuuka',
    anime: 'Blue Archive',
    image: '/Waifu/Hayase-Yuuka.jpg',
  },
  {
    name: 'Yuna Amagami',
    anime: 'Amagami-san Chi no Enmusubi',
    image: '/Waifu/Yuna-Amagami.jpg',
  },
  {
    name: 'Ikuyo Kita',
    anime: 'Bocchi the Rock!',
    image: 'https://i.pinimg.com/736x/c1/bb/42/c1bb42015c372cfd4e5adbef30a977ef.jpg',
  },
  {
    name: 'Tomori Nao',
    anime: 'Charlotte',
    image: 'https://i.pinimg.com/736x/f0/a0/47/f0a047ab03e798e2ce6486d9ea475102.jpg',
  },
  {
    name: 'Yamada Anna',
    anime: 'Boku no Kokoro no Yabai Yatsu',
    image: '/Waifu/Yamada-Anna.jpg',
  },
  
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function SecretPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simple fade-in effect after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white text-2xl font-medium"
        >
          Loading Waifus...
        </motion.div>
      </div>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative w-full flex justify-center items-center px-8 bg-black"
    >
      {/* Add Particles Background */}
      <ParticlesBackground />
      
      <div className="max-w-7xl w-full py-20 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2 mb-16"
        >
          <h2 className="text-4xl font-bold text-white">My <span className="text-glow">Waifus :3</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-800"></div>
        </motion.div>

        {/* Waifu Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {waifus.map((waifu) => (
            <motion.div
              key={waifu.name}
              variants={item}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl border border-zinc-800/50 transition-all duration-300 hover:border-zinc-700/50 bg-black/10 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image 
                    src={waifu.image} 
                    alt={waifu.name}
                    width={400}
                    height={533}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={true}
                  />
                </div>
                <div className="p-6 relative z-10">
                  <h3 className="text-xl font-semibold text-white group-hover:text-red-400 transition-colors duration-300">
                    {waifu.name}
                  </h3>
                  <p className="text-zinc-400 mt-2 text-sm">
                    {waifu.anime}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-red-400 transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
} 
