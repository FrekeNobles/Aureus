<script lang="ts">
  import { onMount } from 'svelte';

  let visible = false;
  let el: HTMLElement;

  onMount(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { visible = true; observer.unobserve(e.target); } });
    }, { threshold: 0.15 });
    observer.observe(el);
  });

  const skills = {
    'Languages & Frameworks': ['React', 'TypeScript', 'Vue.js', 'Next.js', 'Svelte', 'JavaScript'],
    'Tooling & More': ['TailwindCSS', 'GSAP', 'Vite', 'Git', 'PWA', 'Figma', 'REST APIs', 'WebSockets']
  };
</script>

<section id="about" bind:this={el}>
  <div class="about-grid">
    <div class="about-text" class:visible>
      <div class="section-label">About Me</div>
      <h2 class="section-heading">Crafting <em>interfaces</em> that feel alive</h2>
      <p>I'm <strong>Ndifreke Udoh</strong>, a frontend developer with a sharp eye for detail and a deep love for the intersection of design and engineering. I build digital experiences that are fast, accessible, and memorable.</p>
      <p>Whether it's a performant React app, a Vue-powered dashboard, or a Next.js PWA — I care deeply about how things <strong>feel</strong>, not just how they function. Every pixel is intentional.</p>
      <p>Currently open to frontend roles and freelance collaborations where craft matters.</p>
    </div>

    <div class="skills-section" class:visible style="transition-delay: 0.15s">
      <div class="section-label">Tech Stack</div>
      {#each Object.entries(skills) as [category, items]}
        <div class="skills-group">
          <div class="skills-title">{category}</div>
          <div class="skills-grid">
            {#each items as skill}
              <span class="skill-tag">{skill}</span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  section {
    background: var(--bg-secondary);
    border-radius: 1.2rem;
    margin: 0 2rem;
    padding: 6rem 4rem;
  }
  .about-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 5rem; align-items: start;
  }

  .about-text, .skills-section {
    opacity: 0; transform: translateY(24px);
    transition: opacity 0.7s, transform 0.7s;
  }
  .about-text.visible, .skills-section.visible {
    opacity: 1; transform: translateY(0);
  }

  .section-label {
    font-family: var(--font-mono); font-size: 0.72rem;
    letter-spacing: 0.2em; color: var(--gold);
    text-transform: uppercase;
    display: flex; align-items: center; gap: 0.8rem;
    margin-bottom: 1rem;
  }
  .section-label::before {
    content: ''; display: block;
    width: 2rem; height: 1px; background: var(--gold);
  }
  .section-heading {
    font-family: var(--font-display);
    font-size: clamp(2.2rem, 4vw, 3rem);
    color: var(--text-primary); line-height: 1.1;
    margin-bottom: 1.5rem;
  }
  .section-heading em { color: var(--gold); font-style: italic; }

  .about-text p {
    color: var(--text-secondary); line-height: 1.9;
    margin-bottom: 1.2rem; font-size: 1.02rem;
  }
  .about-text p strong { color: var(--text-primary); font-weight: 600; }

  .skills-group { margin-bottom: 1.8rem; }
  .skills-title {
    font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.15em; color: var(--text-secondary);
    text-transform: uppercase; margin-bottom: 0.8rem;
  }
  .skills-grid { display: flex; flex-wrap: wrap; gap: 0.6rem; }
  .skill-tag {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 2rem; padding: 0.4rem 1rem;
    font-family: var(--font-mono); font-size: 0.75rem;
    color: var(--gold); letter-spacing: 0.05em;
    transition: border-color 0.2s, background 0.2s;
    cursor: default;
  }
  .skill-tag:hover { border-color: var(--gold); background: rgba(201,169,110,0.08); }

  @media (max-width: 900px) {
    section { margin: 0 0.75rem; padding: 4rem 1.5rem; }
    .about-grid { grid-template-columns: 1fr; gap: 3rem; }
  }
</style>