<script>
	import { onMount } from "svelte";
	import Works from "$lib/components/works.svelte";
	import {
		checkUrlAccessible,
		formatDate,
		getDescription,
		getImagesFromRepo,
		fetchRepos,
        validRepos

	} from "$lib/githubUtils.js";

	let repos = [];
	let isLoading = true;
	let error = null;


	onMount(async () => {
		try {
			const response = await fetchRepos();

			if (!response.ok) {
				throw new Error(`GitHub API error: ${response.status}`);
			}

			const data = await response.json();

			// Filter for non-forked, non-archived repos and generate GitHub Pages URLs
			const reposWithPages = await validRepos(data);

			// Check which GitHub Pages URLs are accessible and fetch images
			const accessibleRepos = [];
			for (const repo of reposWithPages) {
				const isAccessible = await checkUrlAccessible(
					repo.githubPagesUrl,
									);
				if (isAccessible) {
					repo.images = await getImagesFromRepo(repo.name);
					repo.description = await getDescription(repo);
					accessibleRepos.push(repo);
				}
			}

			// Sort repositories by creation date (newest first)
			repos = accessibleRepos.sort(
				(a, b) => new Date(b.created_at) - new Date(a.created_at),
			);
		} catch (err) {
			error = err.message;
			console.error("Error fetching GitHub repos:", err);
		} finally {
			isLoading = false;
		}
	});
</script>

<div
	class="min-h-screen bg-gray-50 text-gray-900 font-sans rounded-2xl overflow-clip my-15"
>
	<!-- Header -->
	<header class="bg-gray-900 text-white py-12">
		<div class="container mx-auto px-6 text-center">
			<h1 class="text-4xl md:text-6xl font-bold mb-4">PROJECTS</h1>
		</div>
	</header>

	<!-- Main Content -->
	<main class="container mx-auto px-6 py-12" id="projects">
		{#if isLoading}
			<div class="text-center py-16">
				<div
					class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700 mx-auto"
				></div>
				<p class="mt-4 text-gray-600">Loading projects...</p>
			</div>
		{:else if error}
			<div class="text-center py-16">
				<p class="text-red-600 mb-4 font-medium">
					Error loading projects: {error}
				</p>
				<p class="text-gray-600">
					Please check your GitHub username and try again.
				</p>
			</div>
		{:else if repos.length === 0}
			<div class="text-center py-16">
				<p class="text-gray-700 text-xl font-medium mb-2">
					No accessible GitHub Pages found.
				</p>
				<p class="text-gray-500">
					Make sure your repositories have GitHub Pages enabled and
					deployed.
				</p>
			</div>
		{:else}
			<Works {repos}></Works>
		{/if}
	</main>
</div>

<style>
	.container {
		max-width: 1200px;
	}

	/* Smooth animations */
	.animate-spin {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
