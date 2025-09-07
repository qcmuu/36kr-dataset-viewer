# 36Kr Startup Dataset Viewer

A web-based viewer for the 36Kr startup dataset, featuring searchable and filterable table presentation. This project is designed to be deployed on GitHub Pages.

## Features

- **Interactive Table Display**: View 87,718 startup records in a paginated table
- **Search Functionality**: Search by company name, description, or industry
- **Advanced Filtering**: Filter by industry, financing round, location, and establishment year
- **Sorting**: Click column headers to sort data
- **Responsive Design**: Works on desktop and mobile devices
- **Logo Display**: Company logos are displayed in the first column

## Project Structure

```
github-pages/
├── index.html      # Main HTML file
├── style.css       # Stylesheet
├── script.js       # JavaScript functionality
├── data.js         # Data processing utilities (if needed)
└── README.md       # This file
```

## Data Source

The viewer loads data from `36kr_merged_dataset.json`, which contains:
- Company information (name, description, logo)
- Industry classification
- Financing rounds
- Geographic location
- Establishment year
- And more...

## Deployment to GitHub Pages

### Method 1: Using GitHub Interface

1. Create a new repository on GitHub named `username.github.io` (replace username with your GitHub username)
2. Copy all files from the `github-pages` folder to your repository
3. Copy `36kr_merged_dataset.json` to the repository root
4. Commit and push the files

### Method 2: Using Command Line

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Add remote repository
git remote add origin https://github.com/username/username.github.io.git
git branch -M main
git push -u origin main
```

### Method 3: Using GitHub Actions (Recommended for large datasets)

1. Create a new repository
2. Add the following workflow file in `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Pages
      uses: actions/configure-pages@v2
    
    - name: Upload to GitHub Pages
      uses: actions/upload-pages-artifact@v1
      with:
        path: '.'
    
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v1
```

## Usage

Once deployed, access your site at: `https://username.github.io`

- Use the search box to find specific companies
- Select filters to narrow down results
- Click column headers to sort
- Navigate through pages using pagination controls

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance Notes

- The dataset is loaded client-side, so initial load may take a few seconds
- Pagination shows 50 records per page for optimal performance
- Images are lazy-loaded and fallback to placeholder if unavailable

## Customization

To customize the viewer:
1. Edit `style.css` for visual changes
2. Modify `script.js` for functional changes
3. Adjust `itemsPerPage` variable in script.js to change pagination size

## License

This project is for educational and research purposes. Please ensure you have the right to use and display the 36Kr dataset according to their terms of service.