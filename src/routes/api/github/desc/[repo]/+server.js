import { GITHUB_API_KEY } from "$env/static/private";
import { json } from "@sveltejs/kit";

const GITHUB_USERNAME = "erenjhun-uwina";

export async function GET({ params }) {
	const { repo } = params;

	try {
		const response = await fetch(
			`https://api.github.com/repos/${GITHUB_USERNAME}/${repo}/contents/desc`,
			{
				headers: {
					Authorization: `Bearer ${GITHUB_API_KEY}`,
					"User-Agent": "portfolio-app",
				},
			}
		);

		if (!response.ok) {
			return new Response(null, { status: 404 });
		}

		const data = await response.json();

       

		const content = atob(data.content); // Decode base64 content
        return new Response(content.trim(), {
			headers: {
				"Content-Type": "text/plain",
			},
		});
	} catch (error) {
		console.error(`Error fetching desc file for ${repo}:`, error);
		return new Response(null, { status: 404 });
	}
}
