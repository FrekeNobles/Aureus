<script lang="ts">
  import { onMount } from 'svelte';

  let isOpen = $state(false);
  let theme = $state('dark');
  let scrolled = $state(false);

  onMount(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    theme = saved;
    document.documentElement.setAttribute('data-theme', saved);

    window.addEventListener('scroll', () => {
      scrolled = window.scrollY > 20;
    });
  });

  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  function toggleMenu() { isOpen = !isOpen; }
  function closeMenu() { isOpen = false; }
</script>

<nav class:scrolled>
  <a href="#hero" class="nav-logo">NU.</a>

  <ul class="nav-links">
    <li><a href="#hero" onclick={closeMenu}>Home</a></li>
    <li><a href="#about" onclick={closeMenu}>About</a></li>
    <li><a href="#projects" onclick={closeMenu}>Projects</a></li>
    <li><a href="#contact" onclick={closeMenu}>Contact</a></li>
  </ul>

  <div class="nav-right">
    <button class="theme-toggle" onclick={toggleTheme} aria-label="Toggle theme">
      {#if theme === 'dark'}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      {:else}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      {/if}
    </button>

    <a href="/Ndifreke_Udoh_CV.pdf" download class="nav-cta">Download CV</a>

    <button class="hamburger" class:open={isOpen} onclick={toggleMenu} aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

{#if isOpen}
  <div class="mobile-menu">
    <a href="#hero" onclick={closeMenu}>Home</a>
    <a href="#about" onclick={closeMenu}>About</a>
    <a href="#projects" onclick={closeMenu}>Projects</a>
    <a href="#contact" onclick={closeMenu}>Contact</a>
    <a href="/Ndifreke_Udoh_CV.pdf" download class="btn-primary" onclick={closeMenu}>Download CV</a>
  </div>
{/if}

<style>
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.2rem 4rem;
    background: transparent;
    transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
    border-bottom: 1px solid transparent;
  }
  nav.scrolled {
    background: rgba(var(--bg-primary), 0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: var(--font-sans);
    font-weight: 800;
    font-size: 1.1rem;
    letter-spacing: 0.1em;
    color: var(--gold);
    text-decoration: none;
  }
  .nav-links {
    display: flex; gap: 2.5rem; list-style: none;
  }
  .nav-links a {
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--gold); }

  .nav-right {
    display: flex; align-items: center; gap: 1rem;
  }
  .theme-toggle {
    background: none; border: 1px solid var(--border);
    border-radius: 50%; width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--gold);
    transition: border-color 0.2s, background 0.2s;
  }
  .theme-toggle svg { width: 16px; height: 16px; }
  .theme-toggle:hover { border-color: var(--gold); background: rgba(201,169,110,0.08); }

  .nav-cta {
    background: transparent;
    border: 1px solid var(--border-strong);
    color: var(--gold);
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.55rem 1.4rem;
    border-radius: 2rem;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    text-decoration: none;
  }
  .nav-cta:hover { background: var(--gold); color: var(--bg-primary); }

  .hamburger {
    display: none; flex-direction: column;
    gap: 5px; cursor: pointer;
    background: none; border: none; padding: 4px;
  }
  .hamburger span {
    display: block; width: 22px; height: 2px;
    background: var(--gold); border-radius: 2px;
    transition: transform 0.3s, opacity 0.3s;
  }
  .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; }
  .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  .mobile-menu {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99;
    background: var(--bg-secondary);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 2.5rem;
  }
  .mobile-menu a {
    font-size: 1.5rem; font-weight: 700;
    color: var(--text-primary); text-decoration: none;
  }
  .mobile-menu a:hover { color: var(--gold); }
  .btn-primary {
    background: var(--gold); color: var(--bg-primary);
    font-size: 0.85rem; font-weight: 700;
    padding: 0.85rem 2rem; border-radius: 2rem;
    text-decoration: none;
  }

  @media (max-width: 900px) {
    nav { padding: 1.2rem 1.5rem; }
    .nav-links { display: none; }
    .hamburger { display: flex; }
  }
</style>