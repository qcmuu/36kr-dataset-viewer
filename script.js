// Global variables
let allData = [];
let filteredData = [];
let currentPage = 1;
const itemsPerPage = 50;
let sortColumn = -1;
let sortDirection = 1;

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
            allData = data.data;
            filteredData = [...allData];
            
            // Update total count
            document.getElementById('totalCount').textContent = allData.length.toLocaleString();
            
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
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
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
                (item.industry && item.industry.toLowerCase().includes(searchTerm))
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
        industryCell.textContent = item.industry || '-';
        
        // Financing cell
        const financingCell = document.createElement('td');
        financingCell.textContent = item.financing_round || '-';
        
        // Location cell
        const locationCell = document.createElement('td');
        locationCell.textContent = item.location || '-';
        
        // Year cell
        const yearCell = document.createElement('td');
        yearCell.textContent = item.establish_year || '-';
        
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