"use client";

import { useEffect } from "react";

export default function LoadingScreen() {
  const animateHeroContent = () => {
    // Profile picture animation
    const profileContainer = document.getElementById("profile-container");
    if (profileContainer) {
      profileContainer.style.transform = "translateY(30px)";
      profileContainer.style.opacity = "0";
      profileContainer.style.transition = "all 1.5s ease";
      requestAnimationFrame(() => {
        if (profileContainer) {
          profileContainer.style.transform = "translateY(0)";
          profileContainer.style.opacity = "1";
        }
      });
    }

    // First line animation
    const firstLine = document.getElementById("first-line");
    if (firstLine) {
      firstLine.style.transform = "translateY(50px)";
      firstLine.style.opacity = "0";
      firstLine.style.transition = "all 1.5s ease";
      requestAnimationFrame(() => {
        if (firstLine) {
          firstLine.style.transform = "translateY(0)";
          firstLine.style.opacity = "1";
        }
      });
    }

    // Subtitle animations
    setTimeout(() => {
      const subtitleContainer = document.getElementById("subtitle-container");
      if (subtitleContainer) {
        subtitleContainer.style.opacity = "1";
        subtitleContainer.style.transition = "opacity 1s ease";
      }

      // Wanna be
      const wannaBe = document.getElementById("wanna-be");
      if (wannaBe) {
        wannaBe.style.transform = "translateY(20px)";
        wannaBe.style.opacity = "0";
        wannaBe.style.transition = "all 1s ease";
        requestAnimationFrame(() => {
          if (wannaBe) {
            wannaBe.style.transform = "translateY(0)";
            wannaBe.style.opacity = "1";
          }
        });
      }

      // Web Developer
      setTimeout(() => {
        const secondLine = document.getElementById("second-line");
        if (secondLine) {
          secondLine.style.transform = "translateY(20px)";
          secondLine.style.opacity = "0";
          secondLine.style.transition = "all 1s ease";
          requestAnimationFrame(() => {
            if (secondLine) {
              secondLine.style.transform = "translateY(0)";
              secondLine.style.opacity = "1";
            }
          });
        }
      }, 400);
    }, 800);

    setTimeout(() => {
      const quoteContainer = document.getElementById("quote-container");
      if (quoteContainer) {
        quoteContainer.style.opacity = "1";
        quoteContainer.style.transform = "translateY(0)";
        quoteContainer.style.transition = "all 1s ease";
      }
    }, 1200);
  };

  useEffect(() => {
    const splitLeft = document.getElementById("split-screen-left");
    const splitRight = document.getElementById("split-screen-right");
    const heroSection = document.getElementById("hero-section");
    const navbar = document.getElementById("navbar");
    const body = document.body;

    // Start split screen animation immediately
    setTimeout(() => {
      if (splitLeft && splitRight) {
        splitLeft.style.transform = "translateX(-100%)";
        splitRight.style.transform = "translateX(100%)";
        splitLeft.style.transition =
          "transform 1.2s cubic-bezier(0.7, 0, 0.3, 1)";
        splitRight.style.transition =
          "transform 1.2s cubic-bezier(0.7, 0, 0.3, 1)";
      }

      if (heroSection) {
        heroSection.style.opacity = "1";
        heroSection.style.transition = "opacity 0.8s ease";
      }

      setTimeout(animateHeroContent, 600);

      setTimeout(() => {
        if (navbar) {
          navbar.style.opacity = "1";
          navbar.style.transition = "opacity 0.8s ease";
        }
        const navItems = document.querySelectorAll("nav li");
        navItems.forEach((item, index) => {
          const navItem = item as HTMLElement;
          setTimeout(() => {
            navItem.style.opacity = "1";
            navItem.style.transform = "translateY(0)";
          }, index * 100);
        });
      }, 2500);

      setTimeout(() => {
        if (splitLeft && splitRight) {
          splitLeft.remove();
          splitRight.remove();
        }
        if (body) {
          body.style.overflow = "auto";
        }
      }, 1200);
    }, 100);
  }, []);

  return (
    <>
      <div
        id="split-screen-left"
        className="fixed top-0 left-0 w-1/2 h-full bg-black z-[999] transform -translate-x-0 will-change-transform backface-visibility-hidden"
      ></div>
      <div
        id="split-screen-right"
        className="fixed top-0 right-0 w-1/2 h-full bg-black z-[999] transform translate-x-0 will-change-transform backface-visibility-hidden"
      ></div>
    </>
  );
}
