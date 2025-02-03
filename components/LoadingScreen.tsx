'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [currentWord, setCurrentWord] = useState('Loading');
  const words = ['Loading', 'The', 'Page'];

  const animateHeroContent = () => {
    // Profile picture animation
    const profileContainer = document.getElementById('profile-container');
    if (profileContainer) {
      profileContainer.style.transform = 'translateY(30px)';
      profileContainer.style.opacity = '0';
      profileContainer.style.transition = 'all 1.5s ease';
      requestAnimationFrame(() => {
        if (profileContainer) {
          profileContainer.style.transform = 'translateY(0)';
          profileContainer.style.opacity = '1';
        }
      });
    }

    // First line animation
    const firstLine = document.getElementById('first-line');
    if (firstLine) {
      firstLine.style.transform = 'translateY(50px)';
      firstLine.style.opacity = '0';
      firstLine.style.transition = 'all 1.5s ease';
      requestAnimationFrame(() => {
        if (firstLine) {
          firstLine.style.transform = 'translateY(0)';
          firstLine.style.opacity = '1';
        }
      });
    }

    // Subtitle animations
    setTimeout(() => {
      const subtitleContainer = document.getElementById('subtitle-container');
      if (subtitleContainer) {
        subtitleContainer.style.opacity = '1';
        subtitleContainer.style.transition = 'opacity 1s ease';
      }

      // Wanna be 
      const wannaBe = document.getElementById('wanna-be');
      if (wannaBe) {
        wannaBe.style.transform = 'translateY(20px)';
        wannaBe.style.opacity = '0';
        wannaBe.style.transition = 'all 1s ease';
        requestAnimationFrame(() => {
          if (wannaBe) {
            wannaBe.style.transform = 'translateY(0)';
            wannaBe.style.opacity = '1';
          }
        });
      }

      // Web Developer 
      setTimeout(() => {
        const secondLine = document.getElementById('second-line');
        if (secondLine) {
          secondLine.style.transform = 'translateY(20px)';
          secondLine.style.opacity = '0';
          secondLine.style.transition = 'all 1s ease';
          requestAnimationFrame(() => {
            if (secondLine) {
              secondLine.style.transform = 'translateY(0)';
              secondLine.style.opacity = '1';
            }
          });
        }
      }, 400);
    }, 800);

    setTimeout(() => {
      const quoteContainer = document.getElementById('quote-container');
      if (quoteContainer) {
        quoteContainer.style.opacity = '1';
        quoteContainer.style.transform = 'translateY(0)';
        quoteContainer.style.transition = 'all 1s ease';
      }
    }, 1200);
  };

  const startReveal = () => {
    const loadingScreen = document.getElementById('loading-screen');
    const splitLeft = document.getElementById('split-screen-left');
    const splitRight = document.getElementById('split-screen-right');
    const heroSection = document.getElementById('hero-section');
    const navbar = document.getElementById('navbar');
    const body = document.body;

    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      loadingScreen.style.transition = 'opacity 0.8s ease';
    }

    setTimeout(() => {
      if (splitLeft && splitRight) {
        splitLeft.style.transform = 'translateX(-100%)';
        splitRight.style.transform = 'translateX(100%)';
        splitLeft.style.transition = 'transform 1.2s cubic-bezier(0.7, 0, 0.3, 1)';
        splitRight.style.transition = 'transform 1.2s cubic-bezier(0.7, 0, 0.3, 1)';
      }

      if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transition = 'opacity 0.8s ease';
      }

      setTimeout(animateHeroContent, 600);

      setTimeout(() => {
        if (navbar) {
          navbar.style.opacity = '1';
          navbar.style.transition = 'opacity 0.8s ease';
        }
        const navItems = document.querySelectorAll('nav li');
        navItems.forEach((item, index) => {
          const navItem = item as HTMLElement;
          setTimeout(() => {
            navItem.style.opacity = '1';
            navItem.style.transform = 'translateY(0)';
          }, index * 100);
        });
      }, 2500);

      setTimeout(() => {
        if (loadingScreen && splitLeft && splitRight) {
          loadingScreen.remove();
          splitLeft.remove();
          splitRight.remove();
        }
        if (body) {
          body.style.overflow = 'auto';
        }
      }, 1200);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          startReveal();
          return 100;
        }
        return newProgress;
      });
    }, 300);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (progress <= 33) {
      setCurrentWord(words[0]);
    } else if (progress <= 66) {
      setCurrentWord(words[1]);
    } else {
      setCurrentWord(words[2]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  return (
    <>
      <div id="loading-screen" className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="loading-text text-white text-4xl font-bold overflow-hidden">
            <span className="inline-block">{currentWord}</span>
          </div>
          <div className="loading-bar w-48 h-1 bg-zinc-800 mt-4 mx-auto overflow-hidden rounded-full">
            <div 
              className="progress-bar h-full bg-gradient-to-r from-red-600 to-red-800 transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      <div id="split-screen-left" className="fixed top-0 left-0 w-1/2 h-full bg-black z-40 transform -translate-x-0"></div>
      <div id="split-screen-right" className="fixed top-0 right-0 w-1/2 h-full bg-black z-40 transform translate-x-0"></div>
    </>
  );
} 