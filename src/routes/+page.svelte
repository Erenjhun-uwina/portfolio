<script>
	import AboutMe from "$lib/components/aboutme.svelte";
	import Projects from "$lib/components/projects.svelte";
	
</script>

<div
	class="min-h-screen bg-white text-black font-sans flex items-center justify-center"
>
	<div class="text-center">
		<h2 class="text-3xl font-bold text-gray-900 mb-6">Hey!</h2>

		<h1 class="text-4xl md:text-6xl font-bold mb-6">
			I'm <span >Enerjhun Relon</span>  <br>
			a WEB and Game Developer
		</h1>
		<p class="text-xl text-gray-600 mb-8">
			Showcasing my apps and games from GitHub
		</p>
		
		<AboutMe></AboutMe>
		<Projects></Projects> 
	</div>
</div>
