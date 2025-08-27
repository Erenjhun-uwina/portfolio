// GitHub utility functions

// Replace with your GitHub username
const GITHUB_USERNAME = "erenjhun-uwina";

export async function fetchRepos() {
	// Use a server-side endpoint to fetch repos to avoid exposing API key
	const response = await fetch('/api/github/repos');
	return response;
}

export async function validRepos(data) {
	return data
		.filter((repo) => !repo.fork && !repo.archived)
		.map((repo) => ({
			...repo,
			githubPagesUrl: `https://${GITHUB_USERNAME}.github.io/${repo.name}/`,
			formattedDate: formatDate(repo.created_at),
			displayDescription: "",
			images: [], // Placeholder for images
		}));
}

// Function to check if a URL is accessible
export async function checkUrlAccessible(url) {
	try {
		const response = await fetch(url, { method: "HEAD" });
		return response.ok;
	} catch (err) {
		return false;
	}
}

// Function to format date
export function formatDate(dateString) {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

// Function to fetch description from the desc file
export async function getDescriptionFromDescFile(repoName) {
	try {
		const response = await fetch(`/api/github/desc/${repoName}`);
		if (response.ok) {
			const content = await response.text();
			return content.trim(); // Return the description
		}
	} catch (error) {
		console.error(`Error fetching desc file for ${repoName}:`, error);
	}
	return null; // Return null if not found or error
}

// Function to generate a simple description if none exists
export async function 
getDescription(repo) {
	if (repo.description) {
		return repo.description;
	}

	// Try to get description from the desc file
	const descFromFile = await getDescriptionFromDescFile(repo.name);
	if (descFromFile) {
		return descFromFile;
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
export async function getImagesFromRepo(repoName) {
	const images = [];
	try {
		const response = await fetch(`/api/github/images/${repoName}`);
		if (response.ok) {
			const data = await response.json();
			return data.images || [];
		}
	} catch (err) {
		console.log(`No images found in ss folder for ${repoName}`);
	}
	return images;
}
