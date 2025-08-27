<script>
	import { onMount, onDestroy } from 'svelte';
	
	export let images = [];
	export let repoName = '';
	
	let currentIndex = 0;
	let intervalId = null;
	
	function nextImage() {
		currentIndex = (currentIndex + 1) % images.length;
	}
	
	function prevImage() {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
	}
	
	function goToImage(index) {
		currentIndex = index;
	}
	
	// Auto-scroll functionality
	onMount(() => {
		if (images.length > 1) {
			intervalId = setInterval(() => {
				nextImage();
			}, 5000); // Change image every 5 seconds
		}
		
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	});
	
	onDestroy(() => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	});
</script>

<div class="h-48 bg-gray-200 overflow-hidden relative rounded-t-lg border-b border-gray-300">
	{#if images.length > 0}
		<!-- Images with fade transition -->
		{#each images as image, index}
			<img 
				src={image} 
				alt={`Screenshot of ${repoName} - ${index + 1}`}
				class="w-full h-full object-cover absolute transition-opacity duration-500 ease-in-out"
				class:opacity-100={currentIndex === index}
				class:opacity-0={currentIndex !== index}
				class:pointer-events-none={currentIndex !== index}
				loading="lazy"
			/>
		{/each}
		
		<!-- Navigation Buttons -->
		{#if images.length > 1}
			<button 
				on:click={prevImage}
				class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 text-white p-2 rounded-full hover:bg-gray-900 hover:bg-opacity-80 transition-all duration-200 z-10 shadow-md"
				aria-label="Previous image">
				←
			</button>
			<button 
				on:click={nextImage}
				class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-70 text-white p-2 rounded-full hover:bg-gray-900 hover:bg-opacity-80 transition-all duration-200 z-10 shadow-md"
				aria-label="Next image">
				→
			</button>
			
			<!-- Image Indicators -->
			<div class="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
				{#each images as _, index}
					<button 
						class="w-3 h-3 rounded-full transition-all duration-300 {currentIndex === index ? 'bg-gray-800 scale-110 shadow-sm' : 'bg-gray-400 bg-opacity-60 hover:bg-gray-500'}"
						on:click={() => goToImage(index)}
						aria-label={`Go to image ${index + 1}`}>
					</button>
				{/each}
			</div>
			
			
		{/if}
	{:else}
		<div class="h-full flex items-center justify-center bg-gray-200">
			<p class="text-gray-600 text-sm font-medium">No screenshots available</p>
		</div>
	{/if}
</div>

<style>
	.opacity-100 {
		opacity: 1;
	}
	
	.opacity-0 {
		opacity: 0;
	}
	
	.pointer-events-none {
		pointer-events: none;
	}
</style>
