<script lang="ts">
  import { onMount } from 'svelte';
  import Nav from '$lib/components/Nav.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import About from '$lib/components/About.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import AIAssistant from '$lib/components/AIAssistant.svelte';
  import { initScrollAnimations, initHeroAnimation } from '$lib/utils/animations';

  onMount(() => {
    initHeroAnimation();
    initScrollAnimations();
  });
</script>

<svelte:head>
  <title>Ndifreke Udoh — Frontend Developer</title>
  <meta name="description" content="Frontend Developer building fast, polished web interfaces." />
</svelte:head>

<Nav />
<main>
  <Hero />
  <About />
  <Projects />
  <Contact />
</main>
<Footer />
<AIAssistant />