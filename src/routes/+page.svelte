<script>
  import { inview } from "svelte-inview";
  import { fly, fade } from "svelte/transition";
  import AboutMe from "$lib/components/aboutme.svelte";
  import Projects from "$lib/components/projects.svelte";

  let heroVisible = $state(false);
  let aboutVisible = $state(false);
  let projectsVisible = $state(false);
</script>

<!-- Hero Section -->
<section
  use:inview={{ rootMargin: "-10% 0px" }}
  oninview_enter={() => heroVisible = true}
  oninview_leave={() => heroVisible = false}
  class="min-h-screen flex items-center justify-center"
>
  {#if heroVisible}
    <div in:fly={{ y: 40, duration: 1000 }} out:fade={{ duration: 800 }}>
      <h2 class="text-4xl font-bold text-gray-900 mb-6">Hey! I'm</h2>
      <h1 class="text-8xl md:text-6xl font-bold mb-6 leading-tight">
        <span class="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent">
          Enerjhun Relon
        </span>
        <br />
        <span class="text-gray-800 font-semibold">
          a
          <span class="bg-gray-800 text-white px-1 rounded">WEB</span>
          and
          <span class="bg-gray-800 text-white px-1 rounded">Game</span>
          Developer
        </span>
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        Showcasing my apps and games from GitHub
      </p>
    </div>
  {/if}
</section>

<!-- About Me -->
<section
  use:inview={{ rootMargin: "-30% 0px" }}
  oninview_enter={() => aboutVisible = true}
  oninview_leave={() => aboutVisible = false}
  class="min-h-[80vh] flex items-center justify-center px-6"
>
  {#if aboutVisible}
    <div
      class="text-left space-y-6"
      in:fly={{ x: 100, duration: 1200 }}
      out:fly={{ x: -100, duration: 900 }}
    >
      <AboutMe />
    </div>
  {/if}
</section>

<!-- Projects -->
<section
  use:inview={{ rootMargin: "-10% 0px" }}
  oninview_enter={() => projectsVisible = true}
  oninview_leave={() => projectsVisible = false}
  class="min-h-[80vh] flex items-center justify-center px-6"
>
  {#if projectsVisible}
    <div
      class="w-full max-w-5xl"
      in:fly={{ y: 50, duration: 1200 }}
      out:fly={{ y: -50, duration: 900 }}
    >
      <Projects />
    </div>
  {/if}
</section>
