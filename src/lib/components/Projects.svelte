<script lang="ts">
  import { onMount } from 'svelte';
  import { projects } from '$lib/data/projects';

  let activeFilter = $state('all');
  let visible = $state(false);
  let el = $state<HTMLElement>();

  const filters = ['all', 'react', 'vue', 'next'];

  let filtered = $derived(
    activeFilter === 'all'
      ? projects
      : projects.filter(p => p.category === activeFilter)
  );

  onMount(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { visible = true; observer.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    if (el) observer.observe(el);
  });
</script>

<section id="projects" bind:this={el}>
  <div class="projects-header" class:visible>
    <div>
      <div class="section-label">Portfolio</div>
      <h2 class="section-heading">Selected <em>Work</em></h2>
    </div>
    <div class="filter-tabs">
      {#each filters as filter}
        <button
          class="filter-btn"
          class:active={activeFilter === filter}
          onclick={() => activeFilter = filter}
        >
          {filter}
        </button>
      {/each}
    </div>
  </div>

  <div class="projects-grid">
    {#each filtered as project, i (project.id)}
      <article
        class="project-card"
        class:visible
        style="transition-delay: {i * 0.1}s"
      >
        <div class="card-thumb">
          <div class="card-thumb-pattern"></div>
          <div class="card-thumb-label">{project.initials}</div>
          <div class="card-badge">{project.stack[0]}</div>
        </div>
        <div class="card-body">
          <h3 class="card-title">{project.title}</h3>
          <p class="card-desc">{project.desc}</p>
          <div class="card-stack">
            {#each project.stack as tech}
              <span class="stack-tag">{tech}</span>
            {/each}
          </div>
          <div class="card-links">
            <a href={project.demo} target="_blank" rel="noreferrer" class="card-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Live Demo
            </a>
            <a href={project.repo} target="_blank" rel="noreferrer" class="card-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </article>
    {/each}
  </div>
</section>

<style>
  section { background: var(--bg-primary); padding: 8rem 4rem; }

  .projects-header {
    display: flex; justify-content: space-between;
    align-items: flex-end; margin-bottom: 3.5rem;
    flex-wrap: wrap; gap: 1rem;
    opacity: 0; transform: translateY(24px);
    transition: opacity 0.7s, transform 0.7s;
  }
  .projects-header.visible { opacity: 1; transform: translateY(0); }

  .section-label {
    font-family: var(--font-mono); font-size: 0.72rem;
    letter-spacing: 0.2em; color: var(--gold);
    text-transform: uppercase;
    display: flex; align-items: center; gap: 0.8rem;
    margin-bottom: 1rem;
  }
  .section-label::before {
    content: ''; display: block; width: 2rem; height: 1px; background: var(--gold);
  }
  .section-heading {
    font-family: var(--font-display);
    font-size: clamp(2.2rem, 4vw, 3rem);
    color: var(--text-primary); line-height: 1.1;
  }
  .section-heading em { color: var(--gold); font-style: italic; }

  .filter-tabs { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .filter-btn {
    background: transparent; border: 1px solid var(--border);
    color: var(--text-secondary); font-family: var(--font-mono);
    font-size: 0.72rem; letter-spacing: 0.1em;
    text-transform: uppercase; padding: 0.45rem 1.1rem;
    border-radius: 2rem; cursor: pointer; transition: all 0.2s;
  }
  .filter-btn.active,
  .filter-btn:hover {
    border-color: var(--gold); color: var(--gold);
    background: rgba(201,169,110,0.08);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .project-card {
    background: var(--bg-tertiary); border: 1px solid var(--border);
    border-radius: 1.2rem; overflow: hidden;
    opacity: 0; transform: translateY(30px);
    transition: opacity 0.6s, transform 0.6s, border-color 0.3s, box-shadow 0.3s;
    cursor: pointer;
  }
  .project-card.visible { opacity: 1; transform: translateY(0); }
  .project-card:hover {
    transform: translateY(-6px);
    border-color: var(--border-strong);
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  }

  .card-thumb {
    height: 200px; background: var(--bg-card);
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .card-thumb-pattern {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(201,169,110,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,169,110,0.04) 1px, transparent 1px);
    background-size: 32px 32px;
  }
  .card-thumb-label {
    font-family: var(--font-display); font-size: 3rem;
    color: rgba(201,169,110,0.15); position: relative; z-index: 1;
  }
  .card-badge {
    position: absolute; top: 1rem; right: 1rem;
    background: rgba(201,169,110,0.12);
    border: 1px solid var(--border-strong);
    border-radius: 2rem; padding: 0.3rem 0.8rem;
    font-family: var(--font-mono); font-size: 0.65rem;
    color: var(--gold); letter-spacing: 0.1em; text-transform: uppercase;
  }

  .card-body { padding: 1.6rem; }
  .card-title {
    font-family: var(--font-display); font-size: 1.5rem;
    color: var(--text-primary); margin-bottom: 0.5rem;
  }
  .card-desc {
    font-size: 0.88rem; color: var(--text-secondary);
    line-height: 1.7; margin-bottom: 1.2rem;
  }
  .card-stack { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.4rem; }
  .stack-tag {
    background: rgba(201,169,110,0.07);
    border: 1px solid rgba(201,169,110,0.2);
    border-radius: 0.3rem; padding: 0.2rem 0.6rem;
    font-family: var(--font-mono); font-size: 0.68rem;
    color: var(--gold-dim); letter-spacing: 0.05em;
  }

  .card-links { display: flex; gap: 0.8rem; }
  .card-link {
    font-family: var(--font-mono); font-size: 0.72rem;
    color: var(--text-secondary); text-decoration: none;
    letter-spacing: 0.08em;
    display: flex; align-items: center; gap: 0.35rem;
    transition: color 0.2s;
  }
  .card-link:hover { color: var(--gold); }
  .card-link svg { width: 13px; height: 13px; }

  @media (max-width: 900px) {
    section { padding: 5rem 1.5rem; }
    .projects-header { flex-direction: column; align-items: flex-start; }
  }
</style>