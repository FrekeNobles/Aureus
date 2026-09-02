<script lang="ts">
  import { onMount } from 'svelte';

  let displayRole = $state('');
  let displayIntro = $state('');
  let mounted = $state(false);

  const roles = ['Frontend Developer', 'UI Engineer', 'React/Next Specialist', 'Software Developer'];
  const introText = 'I build fast, polished web interfaces that bridge design and engineering. Passionate about performance, accessibility, and the craft of the frontend.';

  let roleIdx = 0;

  function typeText(text: string, setter: (v: string) => void, speed: number, onDone?: () => void) {
    let i = 0;
    setter('');
    const t = setInterval(() => {
      setter(text.slice(0, ++i));
      if (i === text.length) { clearInterval(t); onDone?.(); }
    }, speed);
  }

  function cycleRoles() {
    const role = roles[roleIdx % roles.length];
    typeText(role, v => displayRole = v, 60, () => {
      setTimeout(() => { roleIdx++; if (roleIdx < roles.length) cycleRoles(); }, 3000);
    });
  }

  onMount(() => {
    mounted = true;
    setTimeout(() => typeText(introText, v => displayIntro = v, 88), 300);
    setTimeout(cycleRoles, 600);
  });
</script>


<section id="hero">
  <div class="hero-content">
    <div class="hero-eyebrow">Available for work</div>
    <h1 class="hero-name">Ndifreke<br /><em>Udoh.</em></h1>
    <div class="hero-role">
      {displayRole}</div>
    <p class="hero-intro">{displayIntro} <span class="cursor">|</span></p>
    <div class="hero-actions">
      <a href="#projects" class="btn-primary">View Projects</a>
      <a href="#contact" class="btn-ghost">Get In Touch</a>
    </div>
    <div class="hero-socials">
      <a href="https://github.com/FrekeNobles" target="_blank" rel="noreferrer" class="social-link" aria-label="GitHub">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
        </svg>
      </a>
      <a href="https://linkedin.com/in/ndifreke-udoh-738346263" target="_blank" rel="noreferrer" class="social-link" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
        </svg>
      </a>
      <a href="https://twitter.com/frekenobles" target="_blank" rel="noreferrer" class="social-link" aria-label="Twitter">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
        </svg>
      </a>
      <a href="mailto:frekenobles@gmail.com" class="social-link" aria-label="Email">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </a>
    </div>
  </div>

  <div class="hero-visual">
    <div class="hero-card">
      <div class="stat-grid">
        <div class="stat-item">
          <div class="stat-num">8+</div>
          <div class="stat-label">Projects Shipped</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">2+</div>
          <div class="stat-label">Years Building</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">5+</div>
          <div class="stat-label">Frameworks Used</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">∞</div>
          <div class="stat-label">Lines Written</div>
        </div>
      </div>
    </div>
    <div class="scroll-indicator">
      <span>Scroll</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <polyline points="19 12 12 19 5 12"/>
      </svg>
    </div>
  </div>
</section>

<style>
  section {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 4rem;
    padding: 10rem 4rem 6rem;
    background: var(--bg-primary);
    position: relative;
    overflow: hidden;
  }
  section::before {
    content: '';
    position: absolute; top: -20%; right: -10%;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  /* GSAP handles entrance — start hidden */
  .hero-eyebrow, .hero-name, .hero-actions, .hero-socials { opacity: 0; }
  .hero-card { opacity: 0; }

  .hero-eyebrow {
    font-family: var(--font-mono);
    font-size: 0.75rem; letter-spacing: 0.2em;
    color: var(--gold); text-transform: uppercase;
    margin-bottom: 1.2rem;
    display: flex; align-items: center; gap: 0.8rem;
  }
  .hero-eyebrow::before {
    content: ''; display: block;
    width: 2rem; height: 1px; background: var(--gold);
  }
  .hero-name {
    font-family: var(--font-display);
    font-size: clamp(3.2rem, 6vw, 5.5rem);
    line-height: 1.0; color: var(--text-primary); margin-bottom: 0.4rem;
  }
  .hero-name em { color: var(--gold); font-style: italic; }
  .hero-role {
    font-family: var(--font-mono); font-size: 0.9rem;
    color: var(--text-secondary); letter-spacing: 0.08em;
    margin-bottom: 1.8rem; min-height: 1.4rem;
  }
  .cursor {
    display: inline-block; color: var(--gold);
    animation: blink 1s step-end infinite; margin-left: 2px;
  }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
  .hero-intro {
    font-size: 1rem; color: var(--text-secondary);
    line-height: 1.8; max-width: 480px;
    margin-bottom: 2.5rem; min-height: 4.8rem;
  }
  .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
  .btn-primary {
    background: var(--gold); color: var(--bg-primary);
    font-family: var(--font-sans); font-size: 0.78rem;
    font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    padding: 0.85rem 2rem; border-radius: 2rem; border: none;
    cursor: pointer; text-decoration: none;
    transition: background 0.2s, transform 0.1s; display: inline-block;
  }
  .btn-primary:hover { background: var(--gold-light); transform: translateY(-1px); }
  .btn-ghost {
    background: transparent; color: var(--text-primary);
    font-family: var(--font-sans); font-size: 0.78rem;
    font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
    padding: 0.85rem 2rem; border-radius: 2rem;
    border: 1px solid var(--border-strong); cursor: pointer;
    text-decoration: none; transition: border-color 0.2s, color 0.2s, transform 0.1s;
    display: inline-block;
  }
  .btn-ghost:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-1px); }
  .hero-socials { display: flex; gap: 1.2rem; margin-top: 2rem; }
  .social-link {
    width: 38px; height: 38px; border: 1px solid var(--border);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    color: var(--text-secondary); text-decoration: none;
    transition: border-color 0.2s, color 0.2s;
  }
  .social-link:hover { border-color: var(--gold); color: var(--gold); }
  .social-link svg { width: 16px; height: 16px; }
  .hero-visual {
    display: flex; flex-direction: column;
    align-items: flex-end; gap: 1.5rem;
  }
  .hero-card {
    background: var(--bg-tertiary); border: 1px solid var(--border);
    border-radius: 1.2rem; padding: 2rem; width: 100%; max-width: 360px;
    position: relative; overflow: hidden;
  }
  .hero-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  .stat-num {
    font-family: var(--font-display); font-size: 2.4rem;
    color: var(--gold); line-height: 1;
  }
  .stat-label {
    font-size: 0.72rem; color: var(--text-secondary);
    letter-spacing: 0.08em; margin-top: 0.3rem; text-transform: uppercase;
  }
  .scroll-indicator {
    display: flex; flex-direction: column;
    align-items: center; gap: 0.5rem; margin-top: 1rem;
    animation: float 2.5s ease-in-out infinite;
  }
  .scroll-indicator span {
    font-family: var(--font-mono); font-size: 0.65rem;
    color: var(--text-secondary); letter-spacing: 0.2em; text-transform: uppercase;
  }
  .scroll-indicator svg { width: 20px; height: 20px; stroke: var(--gold-dim); }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }

  @media (max-width: 900px) {
    section { grid-template-columns: 1fr; padding: 8rem 1.5rem 4rem; gap: 3rem; }
    .hero-visual { align-items: center; }
    .hero-card { max-width: 100%; }
  }
</style>