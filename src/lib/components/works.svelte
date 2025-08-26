<script>
    import ImageCarousel from "$lib/components/ImageCarousel.svelte";
    export let repos = [];
</script>

<!-- Projects Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each repos as repo}
        <div
            class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-gray-300"
        >
            <!-- Image Carousel Component -->
            <ImageCarousel images={repo.images} repoName={repo.name} />

            <!-- Content -->
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2 text-gray-900">
                    {repo.name}
                </h3>

                <!-- Date -->
                <p class="text-gray-600 text-sm mb-3 font-medium">
                    Created: {repo.formattedDate}
                </p>

                <!-- Description -->
                <p class="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
                    {repo.displayDescription}
                </p>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mb-4">
                    {#if repo.language}
                        <span
                            class="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium"
                        >
                            {repo.language}
                        </span>
                    {/if}
                    <span
                        class="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                        ⭐ {repo.stargazers_count}
                    </span>
                    {#if repo.images.length > 0}
                        <span
                            class="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                            📸 {repo.images.length}
                        </span>
                    {/if}
                </div>

                <!-- Buttons -->
                <div class="flex space-x-3">
                    <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition-colors duration-200 text-sm font-medium flex-1 text-center"
                    >
                        View on GitHub
                    </a>
                    <a
                        href={repo.githubPagesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="border-2 border-gray-800 text-gray-800 px-4 py-2 rounded hover:bg-gray-800 hover:text-white transition-colors duration-200 text-sm font-medium flex-1 text-center"
                    >
                        Live Demo
                    </a>
                </div>
            </div>
        </div>
    {/each}
</div>
