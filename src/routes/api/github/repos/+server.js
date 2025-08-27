import { GITHUB_API_KEY } from "$env/static/private";
import { json } from "@sveltejs/kit";

const GITHUB_USERNAME = "erenjhun-uwina";

export async function GET() {
	try {
		const response = await fetch(
			`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`,
			{
				headers: {
					Authorization: `Bearer ${GITHUB_API_KEY}`,
					"User-Agent": "portfolio-app",
				},
			}
		);

		if (!response.ok) {
			return json({ error: "Failed to fetch repositories" }, { status: response.status });
		}

		const data = await response.json();
		return json(data);
	} catch (error) {
		console.error("GitHub API error:", error);
		return json({ error: "Internal server error" }, { status: 500 });
	}
}
