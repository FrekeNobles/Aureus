<script lang="ts">
  let isOpen = $state(false);
  let input = $state('');
  let messages = $state<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Hey! 👋 I'm Ndifreke's AI assistant. I can tell you about his projects, skills, experience, and availability. What would you like to know?" }
  ]);
  let isTyping = $state(false);
  let showSuggestions = $state(true);
  let messagesEl = $state<HTMLElement>();

  const suggestions = [
    "What projects has he built?",
    "What's his tech stack?",
    "Is he available for hire?"
  ];

  const CONTEXT = `
You are an AI assistant embedded in Ndifreke Udoh's portfolio website. Answer questions about him warmly and professionally. Keep responses concise (2-4 sentences max).

About Ndifreke:
- Name: Ndifreke Udoh
- Role: Frontend Developer
- Skills: React, TypeScript, Vue.js, Next.js, Svelte, JavaScript, TailwindCSS, GSAP, PWA development
- Projects: Zylo (React/TypeScript), etokiAI (AI-powered app), ViewOps (real-time Vue dashboard), HabitMe (Next.js TypeScript PWA)
- Available for: frontend roles, freelance, collaborations
- Contact: hello@ndifrekeudoh.dev
- Passionate about: performance, accessibility, UI polish, and the craft of frontend engineering

Keep answers friendly, brief, and focused.
  `;

  async function ask(question: string) {
    messages = [...messages, { role: 'user', text: question }];
    showSuggestions = false;
    isTyping = true;
    scrollToBottom();

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: CONTEXT,
          messages: [{ role: 'user', content: question }]
        })
      });
      const data = await res.json();
      const reply = data.content?.map((b: any) => b.text || '').join('') || "Sorry, I had trouble with that!";
      messages = [...messages, { role: 'bot', text: reply }];
    } catch {
      messages = [...messages, { role: 'bot', text: "Oops — something went wrong. Reach out at hello@ndifrekeudoh.dev!" }];
    }

    isTyping = false;
    scrollToBottom();
  }

  function scrollToBottom() {
    setTimeout(() => { if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight; }, 50);
  }

  function handleSend() {
    const q = input.trim();
    if (!q) return;
    input = '';
    ask(q);
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === 'Enter') handleSend();
  }
</script>

<!-- FAB -->
<button class="ai-fab" onclick={() => isOpen = !isOpen} aria-label="Open AI assistant">
  <div class="ai-fab-badge">AI</div>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
</button>

<div class="ai-panel" class:open={isOpen} role="dialog" aria-label="AI Portfolio Assistant">
  <div class="ai-header">
    <div class="ai-avatar">AI</div>
    <div class="ai-header-info">
      <div class="ai-name">Portfolio Assistant</div>
      <div class="ai-status">Online — Ask me anything</div>
    </div>
    <button class="ai-close" onclick={() => isOpen = false} aria-label="Close">✕</button>
  </div>

  <div class="ai-messages" bind:this={messagesEl}>
    {#each messages as msg}
      <div class="msg {msg.role}">
        {#if msg.role === 'bot'}<div class="msg-avatar">AI</div>{/if}
        <div class="msg-bubble">{msg.text}</div>
      </div>
    {/each}
    {#if isTyping}
      <div class="msg bot">
        <div class="msg-avatar">AI</div>
        <div class="msg-bubble typing">
          <span></span><span></span><span></span>
        </div>
      </div>
    {/if}
  </div>

  {#if showSuggestions}
    <div class="ai-suggestions">
      {#each suggestions as s}
        <button class="chip" onclick={() => ask(s)}>{s}</button>
      {/each}
    </div>
  {/if}

  <div class="ai-input-area">
    <input
      type="text"
      class="ai-input"
      placeholder="Ask me anything..."
      bind:value={input}
      onkeydown={handleKey}
    />
    <button class="ai-send" onclick={handleSend} aria-label="Send">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
    </button>
  </div>
</div>

<style>
  .ai-fab {
    position: fixed; bottom: 2.5rem; right: 2.5rem; z-index: 200;
    width: 58px; height: 58px; background: var(--gold);
    border-radius: 50%; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 8px 32px rgba(201,169,110,0.3);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .ai-fab:hover { transform: scale(1.08); box-shadow: 0 12px 40px rgba(201,169,110,0.45); }
  .ai-fab svg { width: 24px; height: 24px; stroke: var(--bg-primary); }
  .ai-fab-badge {
    position: absolute; top: -4px; right: -4px;
    width: 18px; height: 18px; background: #22c55e;
    border-radius: 50%; border: 2px solid var(--bg-primary);
    font-size: 0.5rem; color: white; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
  }

  .ai-panel {
    position: fixed; bottom: 6rem; right: 2.5rem; z-index: 200;
    width: 380px; max-height: 560px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-strong);
    border-radius: 1.2rem; overflow: hidden;
    display: flex; flex-direction: column;
    box-shadow: 0 24px 80px rgba(0,0,0,0.5);
    transform: scale(0.92) translateY(16px); opacity: 0; pointer-events: none;
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.2s;
  }
  .ai-panel.open { transform: scale(1) translateY(0); opacity: 1; pointer-events: all; }

  .ai-header {
    padding: 1.2rem 1.5rem; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 0.8rem;
    background: var(--bg-tertiary);
  }
  .ai-avatar {
    width: 34px; height: 34px; flex-shrink: 0;
    background: linear-gradient(135deg, var(--gold-dim), var(--gold));
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; font-weight: 700; color: var(--bg-primary);
  }
  .ai-header-info { flex: 1; }
  .ai-name { font-size: 0.88rem; font-weight: 600; color: var(--text-primary); }
  .ai-status {
    font-family: var(--font-mono); font-size: 0.68rem; color: #22c55e;
    display: flex; align-items: center; gap: 0.4rem;
  }
  .ai-status::before {
    content: ''; width: 6px; height: 6px;
    background: #22c55e; border-radius: 50%; display: inline-block;
  }
  .ai-close {
    background: none; border: none; cursor: pointer;
    color: var(--text-secondary); font-size: 0.9rem;
    transition: color 0.2s; padding: 4px;
  }
  .ai-close:hover { color: var(--text-primary); }

  .ai-messages {
    flex: 1; overflow-y: auto; padding: 1.2rem;
    display: flex; flex-direction: column; gap: 1rem;
    scroll-behavior: smooth;
  }
  .ai-messages::-webkit-scrollbar { width: 3px; }
  .ai-messages::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

  .msg { display: flex; gap: 0.6rem; align-items: flex-start; }
  .msg.user { flex-direction: row-reverse; }
  .msg-bubble {
    max-width: 78%; padding: 0.7rem 1rem;
    border-radius: 1rem; font-size: 0.85rem; line-height: 1.55;
  }
  .msg.bot .msg-bubble { background: var(--bg-card); color: var(--text-primary); border-bottom-left-radius: 0.2rem; }
  .msg.user .msg-bubble { background: var(--gold); color: var(--bg-primary); font-weight: 500; border-bottom-right-radius: 0.2rem; }
  .msg-avatar {
    width: 26px; height: 26px; border-radius: 50%;
    background: var(--bg-card); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.6rem; color: var(--gold); flex-shrink: 0; font-weight: 700;
  }

  .typing { display: flex; gap: 4px; align-items: center; }
  .typing span {
    width: 6px; height: 6px; background: var(--gold-dim);
    border-radius: 50%; animation: bounce 1.2s ease-in-out infinite;
  }
  .typing span:nth-child(2) { animation-delay: 0.2s; }
  .typing span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes bounce { 0%,80%,100% { transform: scale(1); opacity: 0.5; } 40% { transform: scale(1.3); opacity: 1; } }

  .ai-suggestions { padding: 0 1.2rem 0.8rem; display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .chip {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 2rem; padding: 0.35rem 0.85rem;
    font-family: var(--font-mono); font-size: 0.68rem;
    color: var(--gold); cursor: pointer; white-space: nowrap;
    transition: background 0.2s, border-color 0.2s;
  }
  .chip:hover { background: rgba(201,169,110,0.12); border-color: var(--gold-dim); }

  .ai-input-area {
    padding: 0.8rem 1.2rem 1.2rem;
    border-top: 1px solid var(--border);
    display: flex; gap: 0.6rem;
  }
  .ai-input {
    flex: 1; background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 2rem; padding: 0.6rem 1.1rem;
    color: var(--text-primary); font-family: var(--font-sans);
    font-size: 0.85rem; outline: none; transition: border-color 0.2s;
  }
  .ai-input:focus { border-color: var(--gold-dim); }
  .ai-input::placeholder { color: var(--text-faint); }
  .ai-send {
    width: 36px; height: 36px; border-radius: 50%;
    background: var(--gold); border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s, transform 0.1s; flex-shrink: 0;
  }
  .ai-send:hover { background: var(--gold-light); transform: scale(1.05); }
  .ai-send svg { width: 14px; height: 14px; stroke: var(--bg-primary); }

  @media (max-width: 900px) {
    .ai-panel { width: calc(100vw - 3rem); right: 1.5rem; bottom: 5rem; }
    .ai-fab { right: 1.5rem; bottom: 1.5rem; }
  }
</style>