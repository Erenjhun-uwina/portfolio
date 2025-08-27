import { GITHUB_API_KEY } from "$env/static/private";
import { json } from "@sveltejs/kit";

const GITHUB_USERNAME = "erenjhun-uwina";

export async function GET({ params }) {
	const { repo } = params;

	try {
		const response = await fetch(
			`https://api.github.com/repos/${GITHUB_USERNAME}/${repo}/contents/ss`,
			{
				headers: {
					Authorization: `Bearer ${GITHUB_API_KEY}`,
					"User-Agent": "portfolio-app",
				},
			}
		);

		if (!response.ok) {
			return json({ images: [] });
		}

		const data = await response.json();
		const images = data
			.filter((file) => file.type === "file" && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name))
			.map((file) => file.download_url);

		return json({ images });
	} catch (error) {
		console.error(`Error fetching images for ${repo}:`, error);
		return json({ images: [] });
	}
}
