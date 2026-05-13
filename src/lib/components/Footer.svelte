<footer>
  <span class="footer-brand">NU.</span>
  <div class="footer-links">
    <a href="#hero">Home</a>
    <a href="#about">About</a>
    <a href="#projects">Work</a>
    <a href="#contact">Contact</a>
  </div>
  <span class="footer-copy">© 2026 Ndifreke Udoh</span>
</footer>

<style>
  footer {
    background: var(--bg-primary);
    border-top: 1px solid var(--border);
    padding: 2.5rem 4rem;
    display: flex; justify-content: space-between;
    align-items: center; flex-wrap: wrap; gap: 1rem;
  }
  .footer-brand {
    font-family: var(--font-sans); font-weight: 800;
    font-size: 1rem; color: var(--gold); letter-spacing: 0.1em;
  }
  .footer-links { display: flex; gap: 2rem; }
  .footer-links a {
    font-size: 0.75rem; color: var(--text-secondary);
    text-decoration: none; transition: color 0.2s;
  }
  .footer-links a:hover { color: var(--gold); }
  .footer-copy {
    font-family: var(--font-mono); font-size: 0.7rem;
    color: var(--text-faint); letter-spacing: 0.08em;
  }

  @media (max-width: 900px) {
    footer { flex-direction: column; align-items: flex-start; padding: 2rem 1.5rem; }
  }
</style>