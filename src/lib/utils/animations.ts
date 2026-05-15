import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
  // Staggered reveal for any element with .gsap-reveal class
  gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Staggered children reveal
  gsap.utils.toArray<HTMLElement>('.gsap-stagger').forEach((container) => {
    const children = container.children;
    gsap.fromTo(children,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

export function initHeroAnimation() {
  const tl = gsap.timeline();
  tl.fromTo('.hero-eyebrow',
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
  )
  .fromTo('.hero-name',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    '-=0.3'
  )
  .fromTo('.hero-actions',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
    '-=0.3'
  )
  .fromTo('.hero-socials',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
    '-=0.3'
  )
  .fromTo('.hero-card',
    { opacity: 0, x: 40 },
    { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
    '-=0.6'
  );
}

export { gsap, ScrollTrigger };