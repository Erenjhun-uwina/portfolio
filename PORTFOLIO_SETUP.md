# Portfolio Setup Guide

## Getting Started

Your black and white themed portfolio is now set up! The development server is running at `http://localhost:5173/`.

## Customization Steps

### 1. Update GitHub Username
Open `src/routes/portfolio.svelte` and replace `'your-github-username'` with your actual GitHub username:

```javascript
const GITHUB_USERNAME = 'your-actual-github-username';
```

### 2. Customize the Filter (Optional)
The portfolio currently filters repositories that contain "app" or "game" in their name or description. You can modify this filter in the `portfolio.svelte` file:

```javascript
repos = data.filter(repo => 
    !repo.fork && 
    !repo.archived &&
    (repo.name.toLowerCase().includes('app') || 
     repo.name.toLowerCase().includes('game') ||
     repo.description?.toLowerCase().includes('app') ||
     repo.description?.toLowerCase().includes('game'))
);
```

### 3. Add Your Projects Manually (Alternative)
If you prefer to showcase specific projects without GitHub API, you can replace the fetch logic with a static array:

```javascript
let repos = [
    {
        name: "Your App Name",
        description: "Description of your app",
        html_url: "https://github.com/your-username/repo-name",
        language: "JavaScript",
        stargazers_count: 42,
        homepage: "https://your-app-demo.com"
    },
    // Add more projects...
];
```

### 4. Customize Styling
The portfolio uses Tailwind CSS with a black and white theme. You can modify colors and styles in the component files:

- Main colors: `bg-black`, `text-white`, `bg-white`, `text-black`
- Accent colors: `text-gray-300`, `text-gray-400`, `text-gray-600`

## Pages

- **Home**: `http://localhost:5173/` - Welcome page with link to portfolio
- **Portfolio**: `http://localhost:5173/portfolio` - Showcases your GitHub apps and games

## Features

- ✅ Black and white theme
- ✅ Responsive design
- ✅ GitHub API integration
- ✅ Navigation bar
- ✅ Loading states
- ✅ Error handling
- ✅ Project filtering
- ✅ Live demo links (if available)

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

You can deploy this portfolio to platforms like:
- Vercel
- Netlify  
- GitHub Pages
- Cloudflare Pages

Make sure to update your GitHub username before deploying!
