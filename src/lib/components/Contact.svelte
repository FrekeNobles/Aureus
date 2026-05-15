<script lang="ts">
  let name = $state('');
  let email = $state('');
  let message = $state('');
  let submitted = $state(false);

 function handleSubmit(e: Event) {
  e.preventDefault();

  // 1. Create the new response object
  const newEntry = { name, email, message, id: Date.now() };

  // 2. Get existing data from storage (or an empty array if it's the first time)
  const existingEntries = JSON.parse(localStorage.getItem('user_responses') || '[]');

  // 3. Add the new entry to the list
  existingEntries.push(newEntry);

  // 4. Save the updated list back to LocalStorage
  localStorage.setItem('user_responses', JSON.stringify(existingEntries));

  // UI Logic
  console.table(newEntry);
  submitted = true;
  setTimeout(() => submitted = false, 4000);
  name = ''; email = ''; message = '';
}
</script>

<section id="contact" >
  <div class="contact-grid">
    <div class="contact-info gsap-reveal" >
      <div class="section-label">Contact</div>
      <h2 class="section-heading">Let's <em>build</em> something</h2>
      <p>Open to frontend roles, freelance work, and interesting collaborations. If you have a project or opportunity in mind, let's talk.</p>
      <div class="contact-items">
        <a href="mailto:hello@ndifrekeudoh.dev" class="contact-item">
          <span>✉</span> hello@ndifrekeudoh.dev
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" class="contact-item">
          <span>in</span> linkedin.com/in/ndifreke
        </a>
        <a href="https://github.com" target="_blank" rel="noreferrer" class="contact-item">
          <span>gh</span> github.com/ndifreke
        </a>
      </div>
    </div>

    <div class="contact-form-wrap gsap-reveal" style="--delay: 0.15s">
      <form onsubmit={handleSubmit}>
        <div class="form-group">
          <label class="form-label" for="name">Name</label>
          <input id="name" type="text" class="form-input" placeholder="Your name" bind:value={name} required />
        </div>
        <div class="form-group">
          <label class="form-label" for="email">Email</label>
          <input id="email" type="email" class="form-input" placeholder="your@email.com" bind:value={email} required />
        </div>
        <div class="form-group">
          <label class="form-label" for="message">Message</label>
          <textarea id="message" class="form-textarea" placeholder="Tell me about your project..." bind:value={message}></textarea>
        </div>
        <button type="submit" class="btn-primary">Send Message</button>
        {#if submitted}
          <p class="form-status">✓ Message sent — I'll be in touch soon!</p>
        {/if}
      </form>
    </div>
  </div>
</section>

<style>
  section {
    background: var(--bg-secondary);
    border-radius: 1.2rem;
    margin: 0 2rem 2rem;
    padding: 6rem 4rem;
  }
  .contact-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 5rem; align-items: start;
  }

  .contact-info, .contact-form-wrap {
    opacity: 0; transform: translateY(24px);
    transition: opacity 0.7s, transform 0.7s;
  }
  /* .contact-info.visible, .contact-form-wrap.visible {
    opacity: 1; transform: translateY(0);
  } */

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
    color: var(--text-primary); line-height: 1.1; margin-bottom: 1.2rem;
  }
  .section-heading em { color: var(--gold); font-style: italic; }
  .contact-info p { color: var(--text-secondary); line-height: 1.8; margin-bottom: 2rem; }

  .contact-items { display: flex; flex-direction: column; gap: 1rem; }
  .contact-item {
    display: flex; align-items: center; gap: 1rem;
    padding: 1rem 1.2rem; border: 1px solid var(--border);
    border-radius: 0.8rem; color: var(--text-secondary);
    font-family: var(--font-mono); font-size: 0.82rem;
    text-decoration: none; transition: border-color 0.2s, color 0.2s;
  }
  .contact-item:hover { border-color: var(--gold-dim); color: var(--gold); }

  form { display: flex; flex-direction: column; gap: 1.2rem; }
  .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
  .form-label {
    font-family: var(--font-mono); font-size: 0.72rem;
    color: var(--text-secondary); letter-spacing: 0.12em; text-transform: uppercase;
  }
  .form-input, .form-textarea {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 0.6rem; padding: 0.85rem 1.1rem;
    color: var(--text-primary); font-family: var(--font-sans);
    font-size: 0.92rem; transition: border-color 0.2s;
    outline: none; resize: none;
  }
  .form-input:focus, .form-textarea:focus { border-color: var(--gold-dim); }
  .form-textarea { height: 130px; }
  .btn-primary {
    background: var(--gold); color: var(--bg-primary);
    font-family: var(--font-sans); font-size: 0.78rem;
    font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    padding: 0.85rem 2rem; border-radius: 2rem; border: none;
    cursor: pointer; align-self: flex-start;
    transition: background 0.2s, transform 0.1s;
  }
  .btn-primary:hover { background: var(--gold-light); transform: translateY(-1px); }
  .form-status {
    font-family: var(--font-mono); font-size: 0.8rem; color: var(--gold);
  }

  @media (max-width: 900px) {
    section { margin: 0 0.75rem 1.5rem; padding: 4rem 1.5rem; }
    .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
  }
</style>