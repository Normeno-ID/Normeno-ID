/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero-section');
  const [visible, setVisible] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const menuItems = [
    { 
      id: 'hero-section', 
      label: 'Home',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      id: 'about', 
      label: 'About',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      id: 'skills', 
      label: 'Skills',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    { 
      id: 'project', 
      label: 'Project',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    { 
      id: 'social', 
      label: 'Social',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      )
    },
    {
      id: 'secret',
      label: 'My Waifu',
      isSecret: true,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    // Initial loading delay
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    setTimeout(() => {
      setVisible(true);
    }, 2500);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      setScrolled(scrollY > 50);
      
      // Show secret button when scrolled near bottom
      if (!isLoading && scrollY + windowHeight >= documentHeight - 100) {
        setShowSecret(true);
      } else {
        setShowSecret(false);
      }

      const sections = menuItems.map(item => {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            id: item.id,
            offset: Math.abs(rect.top)
          };
        }
        return { id: item.id, offset: Infinity };
      });

      const currentSection = sections.reduce((acc, curr) => 
        curr.offset < acc.offset ? curr : acc
      );

      setActiveSection(currentSection.id);
    };

    // Initial check for scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(loadingTimer);
    };
  }, [menuItems, isLoading]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    // Special handling for social section
    if (id === 'social') {
      const socialElement = document.getElementById('social');
      if (socialElement) {
        const offsetTop = socialElement.offsetTop;
        
        // Smooth scroll to social section
        window.scrollTo({
          top: offsetTop - 80,
          behavior: 'smooth'
        });

        // Optional: Add highlight effect to social cards
        const socialCards = document.querySelectorAll('.social-card');
        socialCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('highlight-social');
            setTimeout(() => {
              card.classList.remove('highlight-social');
            }, 1000);
          }, index * 200);
        });
      }
      return;
    }

    // Default handling for other sections
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed w-full ${
          scrolled 
            ? 'py-4 bg-black/90 backdrop-blur-md border-b border-red-900/20'
            : 'py-6 bg-transparent'
        } z-50 transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-8">
          <ul className="flex justify-center items-center space-x-12">
            {menuItems.map((item, index) => (
              <li 
                key={item.id}
                className={`opacity-0 transform translate-y-[-20px] transition-all duration-300 ${
                  item.isSecret ? 'ml-8' : ''
                }`}
                style={{ 
                  animationDelay: `${(index * 100) + 2500}ms`,
                  animation: visible ? 'navItemEnter 0.5s ease forwards' : 'none',
                  display: item.isSecret && !showSecret ? 'none' : 'block',
                  pointerEvents: item.isSecret && !showSecret ? 'none' : 'auto'
                }}
              >
                {item.isSecret ? (
                  <Link 
                    href="/secret"
                    className="flex items-center gap-2 text-lg font-medium px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-700 hover:to-red-900 transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span>
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <Link 
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className={`flex items-center gap-2 text-lg font-medium transition-all duration-300 relative group ${
                      activeSection === item.id 
                        ? 'text-red-500' 
                        : 'text-white hover:text-red-400'
                    }`}
                  >
                    <span className="transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {item.label}
                    </span>
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 to-red-800"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:hidden fixed bottom-8 right-8">
          <button className="p-3 bg-red-600 rounded-full shadow-lg hover:bg-red-700 transition-colors">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </motion.nav>
    </>
  );
} 