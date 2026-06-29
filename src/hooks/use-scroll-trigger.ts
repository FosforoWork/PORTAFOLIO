'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollTrigger() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll('[data-scroll-progress]').forEach((el) => {
        const bar = el.querySelector('[data-scroll-bar]');
        if (!bar) return;
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            scrollTrigger: {
              trigger: el as HTMLElement,
              start: 'top 70%',
              end: 'bottom 20%',
              scrub: 1,
            },
          }
        );
      });

      document.querySelectorAll('[data-scroll-fade]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el as HTMLElement,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);
}
