<script>
  export let description = '';
  let isExpanded = false;

  function toggleDescription() {
    isExpanded = !isExpanded;
  }
</script>

<div class="mt-2 text-gray-700">
  <p class={isExpanded ? "" : "line-clamp-3"}>
    {description}
  </p>
  <button 
    on:click={toggleDescription} 
    class="text-blue-500 text-sm font-medium mt-1 hover:underline"
  >
    {isExpanded ? "Show Less" : "Show More"}
  </button>
</div>

<style>
  /* If you don’t have the Tailwind line-clamp plugin, fallback: */
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
