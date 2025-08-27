<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';
	
	let { children } = $props();
	
	let currentPath = $derived($page.url.pathname);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<!-- Navigation -->
<nav class="bg-black text-white py-4 px-6">
	<div class="container mx-auto flex justify-between items-center">
		<a href="/" class="text-xl font-bold">My Portfolio</a>
		
		<div class="flex space-x-6">
			<a 
				href="/" 
				class={`hover:text-gray-300 transition-colors duration-200 ${
					currentPath === '/' ? 'text-white font-semibold' : 'text-gray-400'
				}`}
			>
				Home
			</a>
			<a 
				href="#projects"
				class={`hover:text-gray-300 transition-colors duration-200 ${
					currentPath === '/portfolio' ? 'text-white font-semibold' : 'text-gray-400'
				}`}
			>
				Project
			</a>
		</div>
	</div>
</nav>

<main class="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-400 ">
	{@render children?.()}
</main>

<!-- Footer -->
	<footer class="bg-gray-900 text-white py-8">
		<div class="container mx-auto px-6 text-center">
			<p class="text-gray-300">Built with SvelteKit & Tailwind CSS</p>

			<!-- Social Media Links -->
			<div class="flex justify-center space-x-6 mt-4">
				<a
					href="https://github.com/erenjhun-uwina"
					target="_blank"
					rel="noopener noreferrer"
					class="text-gray-300 hover:text-white transition-colors duration-200"
					aria-label="GitHub"
				>
					<svg
						class="w-6 h-6"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
						/>
					</svg>
				</a>

				<a
					href="https://www.facebook.com/E.portodo666/"
					target="_blank"
					rel="noopener noreferrer"
					class="text-gray-300 hover:text-white transition-colors duration-200"
					aria-label="Facebook"
				>
					<svg
						class="w-6 h-6"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
						/>
					</svg>
				</a>

				<a
					href="mailto:relon.enerjhun.quinanola@gmail.com"
					class="text-gray-300 hover:text-white transition-colors duration-200"
					aria-label="Email"
				>
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/>
					</svg>
				</a>
			</div>

			<p class="text-gray-400 mt-4">© 2024 My Portfolio</p>
		</div>
	</footer>