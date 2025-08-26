<script>
	import { onMount } from "svelte";
	import Works from "$lib/components/Works.svelte";

	let repos = [];
	let isLoading = true;
	let error = null;

	// Replace with your GitHub username
	const GITHUB_USERNAME = "erenjhun-uwina";

	// Function to check if a URL is accessible
	async function checkUrlAccessible(url) {
		try {
			const response = await fetch(url, { method: "HEAD" });
			return response.ok;
		} catch (err) {
			return false;
		}
	}

	// Function to format date
	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	}

	// Function to generate a simple description if none exists
	function getDescription(repo) {
		if (repo.description) {
			return repo.description;
		}

		// Generate a simple description based on repo data
		const language = repo.language ? `Built with ${repo.language}` : "";
		const stars =
			repo.stargazers_count > 0
				? ` • ${repo.stargazers_count} stars`
				: "";
		return `A ${repo.language || "web"} project${language}${stars}`;
	}

	// Function to get images from the 'ss' folder
	async function getImagesFromRepo(repoName) {
		const images = [];
		try {
			const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/contents/ss`;
			const response = await fetch(url);

			if (response.ok) {
				const data = await response.json();
				data.forEach((file) => {
					if (
						file.type === "file" &&
						/\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
					) {
						images.push(file.download_url);
					}
				});
			}
		} catch (err) {
			console.log(`No images found in ss folder for ${repoName}`);
		}
		return images;
	}

	onMount(async () => {
		try {
			const response = await fetch(
				`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`,
			);

			if (!response.ok) {
				throw new Error(`GitHub API error: ${response.status}`);
			}

			const data = await response.json();

			// Filter for non-forked, non-archived repos and generate GitHub Pages URLs
			const reposWithPages = data
				.filter((repo) => !repo.fork && !repo.archived)
				.map((repo) => ({
					...repo,
					githubPagesUrl: `https://${GITHUB_USERNAME}.github.io/${repo.name}/`,
					formattedDate: formatDate(repo.created_at),
					displayDescription: getDescription(repo),
					images: [], // Placeholder for images
				}));

			// Check which GitHub Pages URLs are accessible and fetch images
			const accessibleRepos = [];
			for (const repo of reposWithPages) {
				const isAccessible = await checkUrlAccessible(
					repo.githubPagesUrl,
				);
				if (isAccessible) {
					repo.images = await getImagesFromRepo(repo.name);
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

<div class="min-h-screen bg-gray-50 text-gray-900 font-sans rounded-sm">
	<!-- Header -->
	<header class="bg-gray-900 text-white py-12">
		<div class="container mx-auto px-6 text-center">
			<h1 class="text-4xl md:text-6xl font-bold mb-4">PROJECTS</h1>
		</div>
	</header>

	<!-- Main Content -->
	<main class="container mx-auto px-6 py-12"  id="projects">
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
	/* Custom gray theme enhancements */
	

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
