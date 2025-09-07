// Global variables
let allData = [];
let filteredData = [];
let currentPage = 1;
const itemsPerPage = 50;
let sortColumn = -1;
let sortDirection = 1;
let showOriginalChinese = false; // Toggle between Chinese and English

// Global functions (accessible from HTML)
window.toggleStatistics = function() {
    const content = document.getElementById('statsContent');
    const icon = document.getElementById('toggleIcon');
    const text = document.getElementById('toggleStatsText');
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.classList.add('rotated');
        text.textContent = 'Hide Details';
    } else {
        content.style.display = 'none';
        icon.classList.remove('rotated');
        text.textContent = 'Show Details';
    }
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupEventListeners();
});

// Load data from JSON
function loadData() {
    // Show loading state
    document.getElementById('tableBody').innerHTML = '<tr><td colspan="7" class="loading">Loading data...</td></tr>';
    
    // For GitHub Pages, we need to fetch the JSON file
    fetch('36kr_merged_dataset.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Apply mapping to the data
            allData = applyDataMapping(data.data);
            filteredData = [...allData];
            
            // Update total count
            document.getElementById('totalCount').textContent = allData.length.toLocaleString();
            
            // Add language toggle button
            addLanguageToggle();
            
            // Calculate and display statistics
            calculateAndDisplayStatistics();
            
            // Populate filter options
            populateFilters();
            
            // Display first page
            displayData();
        })
        .catch(error => {
            console.error('Error loading data:', error);
            document.getElementById('tableBody').innerHTML = '<tr><td colspan="7" class="loading">Failed to load data. Please check the file path.</td></tr>';
        });
}

// Setup event listeners
function setupEventListeners() {
    // Search on Enter key
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Filter change events
    document.getElementById('industryFilter').addEventListener('change', applyFilters);
    document.getElementById('financingFilter').addEventListener('change', applyFilters);
    document.getElementById('locationFilter').addEventListener('change', applyFilters);
    document.getElementById('yearFilter').addEventListener('change', applyFilters);
}

// Add language toggle button
function addLanguageToggle() {
    const controls = document.querySelector('.controls');
    const toggleDiv = document.createElement('div');
    toggleDiv.className = 'language-toggle-container';
    toggleDiv.innerHTML = `
        <div class="language-toggle">
            <button class="lang-btn active" id="langZh" onclick="setLanguage('zh')">中文</button>
            <button class="lang-btn" id="langEn" onclick="setLanguage('en')">English</button>
        </div>
    `;
    controls.insertBefore(toggleDiv, controls.firstChild);
}

// Set language
function setLanguage(lang) {
    showOriginalChinese = lang === 'zh';
    
    // Update button states
    document.getElementById('langZh').classList.toggle('active', lang === 'zh');
    document.getElementById('langEn').classList.toggle('active', lang === 'en');
    
    // Update display
    displayData();
    populateFilters();
    
    // Recalculate and update statistics
    calculateAndDisplayStatistics();
}

// Populate filter dropdowns
function populateFilters() {
    const industries = [...new Set(allData.map(item => item.industry).filter(Boolean))];
    const financingRounds = [...new Set(allData.map(item => item.financing_round).filter(Boolean))];
    const locations = [...new Set(allData.map(item => item.location).filter(Boolean))];
    const years = [...new Set(allData.map(item => item.establish_year).filter(Boolean))].sort();
    
    populateSelect('industryFilter', industries);
    populateSelect('financingFilter', financingRounds);
    populateSelect('locationFilter', locations);
    populateSelect('yearFilter', years);
}

function populateSelect(selectId, options) {
    const select = document.getElementById(selectId);
    // Clear existing options except the first one
    while (select.options.length > 1) {
        select.remove(1);
    }
    
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        
        // Apply mapping to display text based on select ID
        if (selectId === 'industryFilter') {
            optionElement.textContent = showOriginalChinese ? option : mapToEnglish('industry', option);
        } else if (selectId === 'financingFilter') {
            optionElement.textContent = showOriginalChinese ? option : mapToEnglish('financing', option);
        } else if (selectId === 'locationFilter') {
            optionElement.textContent = showOriginalChinese ? option : mapToEnglish('location', option);
        } else if (selectId === 'yearFilter') {
            optionElement.textContent = showOriginalChinese ? option : mapToEnglish('year', option);
        } else {
            optionElement.textContent = option;
        }
        
        select.appendChild(optionElement);
    });
}

// Perform search
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (!searchTerm) {
        filteredData = [...allData];
    } else {
        filteredData = allData.filter(item => {
            return (
                (item.name && item.name.toLowerCase().includes(searchTerm)) ||
                (item.description && item.description.toLowerCase().includes(searchTerm)) ||
                (item.industry && item.industry.toLowerCase().includes(searchTerm)) ||
                (item.industry_en && item.industry_en.toLowerCase().includes(searchTerm)) ||
                (item.financing_round_en && item.financing_round_en.toLowerCase().includes(searchTerm)) ||
                (item.location_en && item.location_en.toLowerCase().includes(searchTerm))
            );
        });
    }
    
    currentPage = 1;
    applyFilters();
}

// Apply all filters
function applyFilters() {
    let data = [...filteredData];
    
    // Apply industry filter
    const industry = document.getElementById('industryFilter').value;
    if (industry) {
        data = data.filter(item => item.industry === industry);
    }
    
    // Apply financing filter
    const financing = document.getElementById('financingFilter').value;
    if (financing) {
        data = data.filter(item => item.financing_round === financing);
    }
    
    // Apply location filter
    const location = document.getElementById('locationFilter').value;
    if (location) {
        data = data.filter(item => item.location === location);
    }
    
    // Apply year filter
    const year = document.getElementById('yearFilter').value;
    if (year) {
        data = data.filter(item => item.establish_year === year);
    }
    
    filteredData = data;
    currentPage = 1;
    displayData();
}

// Sort table
function sortTable(column) {
    const columns = ['logo_url', 'name', 'description', 'industry', 'financing_round', 'location', 'establish_year'];
    
    if (sortColumn === column) {
        sortDirection *= -1;
    } else {
        sortColumn = column;
        sortDirection = 1;
    }
    
    filteredData.sort((a, b) => {
        let aVal = a[columns[column]] || '';
        let bVal = b[columns[column]] || '';
        
        // Handle numeric sorting for year
        if (column === 6) {
            aVal = parseInt(aVal) || 0;
            bVal = parseInt(bVal) || 0;
        }
        
        if (aVal < bVal) return -1 * sortDirection;
        if (aVal > bVal) return 1 * sortDirection;
        return 0;
    });
    
    displayData();
}

// Display data in table
function displayData() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);
    
    pageData.forEach(item => {
        const row = document.createElement('tr');
        
        // Logo cell
        const logoCell = document.createElement('td');
        logoCell.className = 'logo-cell';
        if (item.logo_url) {
            const img = document.createElement('img');
            img.src = item.logo_url;
            img.alt = item.name;
            img.onerror = function() {
                this.src = 'https://via.placeholder.com/40x40?text=No+Logo';
            };
            logoCell.appendChild(img);
        }
        
        // Name cell
        const nameCell = document.createElement('td');
        nameCell.className = 'name-cell';
        nameCell.textContent = item.name || '-';
        
        // Description cell
        const descCell = document.createElement('td');
        descCell.className = 'description-cell';
        descCell.textContent = item.description || '-';
        descCell.title = item.description || '-';
        
        // Industry cell
        const industryCell = document.createElement('td');
        industryCell.textContent = showOriginalChinese ? (item.industry || '-') : (item.industry_en || '-');
        
        // Financing cell
        const financingCell = document.createElement('td');
        financingCell.textContent = showOriginalChinese ? (item.financing_round || '-') : (item.financing_round_en || '-');
        
        // Location cell
        const locationCell = document.createElement('td');
        locationCell.textContent = showOriginalChinese ? (item.location || '-') : (item.location_en || '-');
        
        // Year cell
        const yearCell = document.createElement('td');
        yearCell.textContent = showOriginalChinese ? (item.establish_year || '-') : (item.establish_year_en || '-');
        
        row.appendChild(logoCell);
        row.appendChild(nameCell);
        row.appendChild(descCell);
        row.appendChild(industryCell);
        row.appendChild(financingCell);
        row.appendChild(locationCell);
        row.appendChild(yearCell);
        
        tbody.appendChild(row);
    });
    
    updatePagination();
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages} (${filteredData.length} records)`;
    
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages || totalPages === 0;
}

// Navigation functions
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayData();
    }
}

function nextPage() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayData();
    }
}


// Calculate and display statistics
function calculateAndDisplayStatistics() {
    const stats = {
        industries: {},
        financing: {},
        locations: {},
        years: {}
    };
    
    // Calculate statistics
    allData.forEach(item => {
        // Industry statistics
        const industry = showOriginalChinese ? item.industry : item.industry_en;
        if (industry) {
            stats.industries[industry] = (stats.industries[industry] || 0) + 1;
        }
        
        // Financing statistics
        const financing = showOriginalChinese ? item.financing_round : item.financing_round_en;
        if (financing) {
            stats.financing[financing] = (stats.financing[financing] || 0) + 1;
        }
        
        // Location statistics
        const location = showOriginalChinese ? item.location : item.location_en;
        if (location) {
            stats.locations[location] = (stats.locations[location] || 0) + 1;
        }
        
        // Year statistics
        const year = showOriginalChinese ? item.establish_year : item.establish_year_en;
        if (year) {
            stats.years[year] = (stats.years[year] || 0) + 1;
        }
    });
    
    // Sort statistics by count
    const sortedStats = {
        industries: Object.entries(stats.industries)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10),
        financing: Object.entries(stats.financing)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8),
        locations: Object.entries(stats.locations)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10),
        years: Object.entries(stats.years)
            .sort((a, b) => b[0].localeCompare(a[0]))
            .slice(-10) // Last 10 years
    };
    
    displayStatistics(sortedStats);
}

// Display statistics in cards
function displayStatistics(stats) {
    const statsGrid = document.getElementById('statsGrid');
    const total = allData.length;
    
    // Industry card
    const industryCard = createStatCard(
        'Industry Distribution',
        '🏢',
        stats.industries,
        total
    );
    
    // Financing card
    const financingCard = createStatCard(
        'Financing Rounds',
        '💰',
        stats.financing,
        total
    );
    
    // Location card
    const locationCard = createStatCard(
        'Top Locations',
        '📍',
        stats.locations,
        total
    );
    
    // Year card
    const yearCard = createStatCard(
        'Establishment Years',
        '📅',
        stats.years,
        total
    );
    
    statsGrid.innerHTML = '';
    statsGrid.appendChild(industryCard);
    statsGrid.appendChild(financingCard);
    statsGrid.appendChild(locationCard);
    statsGrid.appendChild(yearCard);
}

// Create a statistics card
function createStatCard(title, icon, data, total) {
    const card = document.createElement('div');
    card.className = 'stat-card';
    
    const list = document.createElement('ul');
    list.className = 'stat-list';
    
    data.forEach(([label, count]) => {
        const percentage = ((count / total) * 100).toFixed(1);
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="stat-label">${label}</span>
            <span>
                <span class="stat-value">${count.toLocaleString()}</span>
                <span class="stat-percentage">${percentage}%</span>
            </span>
        `;
        list.appendChild(li);
    });
    
    const header = document.createElement('h3');
    header.innerHTML = `
        <span class="stat-icon">${icon}</span>
        ${title}
    `;
    
    card.appendChild(header);
    card.appendChild(list);
    
    // Add show more button if more than 5 items
    if (data.length > 5) {
        const showMoreBtn = document.createElement('button');
        showMoreBtn.className = 'show-more-btn';
        showMoreBtn.textContent = 'Show More';
        showMoreBtn.onclick = function() {
            card.classList.toggle('expanded');
            this.textContent = card.classList.contains('expanded') ? 'Show Less' : 'Show More';
        };
        card.appendChild(showMoreBtn);
    }
    
    return card;
}