/**
 * Dashboard JavaScript
 */

const API_BASE_URL = 'http://localhost:8080/api';
let currentUser = null;
let charts = {};

// DOM Elements
const userWelcome = document.getElementById('userWelcome');
const logoutBtn = document.getElementById('logoutBtn');
const toggleFormBtn = document.getElementById('toggleFormBtn');
const addSaleForm = document.getElementById('addSaleForm');
const saleFormElement = document.getElementById('saleFormElement');
const formMessage = document.getElementById('formMessage');
const refreshBtn = document.getElementById('refreshBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
    initializeEventListeners();
    loadDashboardData();
    setDefaultDateTime();
});

/**
 * Check if user is authenticated
 */
function checkAuthentication() {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
        window.location.href = 'login.html';
        return;
    }
    
    currentUser = JSON.parse(userData);
    userWelcome.textContent = `Welcome back, ${currentUser.fullName}!`;
    if (currentUser.businessName) {
        userWelcome.textContent += ` | ${currentUser.businessName}`;
    }
}

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
    logoutBtn.addEventListener('click', logout);
    toggleFormBtn.addEventListener('click', toggleSaleForm);
    saleFormElement.addEventListener('submit', handleAddSale);
    refreshBtn.addEventListener('click', loadDashboardData);
}

/**
 * Logout user
 */
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

/**
 * Toggle sale form visibility
 */
function toggleSaleForm() {
    if (addSaleForm.style.display === 'none') {
        addSaleForm.style.display = 'block';
        toggleFormBtn.textContent = 'Hide Form';
    } else {
        addSaleForm.style.display = 'none';
        toggleFormBtn.textContent = 'Show Form';
    }
}

/**
 * Set default date/time to current
 */
function setDefaultDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    document.getElementById('saleDate').value = `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * Handle adding new sale
 */
async function handleAddSale(e) {
    e.preventDefault();
    
    const formData = new FormData(saleFormElement);
    
    // Convert datetime-local to required format
    const dateTime = new Date(formData.get('saleDate'));
    const formattedDate = formatDateTime(dateTime);
    
    const saleData = {
        username: currentUser.username,
        productName: formData.get('productName'),
        category: formData.get('category'),
        saleAmount: formData.get('saleAmount'),
        quantity: formData.get('quantity'),
        saleDate: formattedDate,
        customerName: formData.get('customerName') || 'N/A'
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/add-sale`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(saleData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showFormMessage('Sale added successfully! ✓', 'success');
            saleFormElement.reset();
            setDefaultDateTime();
            
            // Reload dashboard data
            setTimeout(() => {
                loadDashboardData();
                formMessage.className = 'form-message';
            }, 1500);
        } else {
            showFormMessage(data.message, 'error');
        }
    } catch (error) {
        console.error('Error adding sale:', error);
        showFormMessage('Failed to add sale. Please try again.', 'error');
    }
}

/**
 * Load all dashboard data
 */
async function loadDashboardData() {
    try {
        // Fetch analytics and sales data
        const [analyticsData, salesData] = await Promise.all([
            fetchAnalytics(),
            fetchSales()
        ]);
        
        // Update UI
        updateMetrics(analyticsData.summary);
        renderCharts(analyticsData);
        renderSalesTable(salesData);
        
    } catch (error) {
        console.error('Error loading dashboard:', error);
        alert('Failed to load dashboard data. Please refresh the page.');
    }
}

/**
 * Fetch analytics from API
 */
async function fetchAnalytics() {
    const response = await fetch(`${API_BASE_URL}/analytics?username=${currentUser.username}`);
    if (!response.ok) throw new Error('Failed to fetch analytics');
    return await response.json();
}

/**
 * Fetch sales from API
 */
async function fetchSales() {
    const response = await fetch(`${API_BASE_URL}/sales?username=${currentUser.username}`);
    if (!response.ok) throw new Error('Failed to fetch sales');
    return await response.json();
}

/**
 * Update metrics cards
 */
function updateMetrics(summary) {
    document.getElementById('totalRevenue').textContent = `$${summary.totalRevenue.toFixed(2)}`;
    document.getElementById('totalSales').textContent = summary.totalSales;
    document.getElementById('topProduct').textContent = summary.maxSaleProduct;
    document.getElementById('bestMonth').textContent = summary.maxSaleMonth;
    document.getElementById('peakHour').textContent = formatHour(summary.peakSalesHour);
    document.getElementById('maxSale').textContent = `$${summary.maxSaleAmount.toFixed(2)}`;
}

/**
 * Render all charts
 */
function renderCharts(data) {
    renderTopProductsChart(data.topProducts);
    renderLeastProductsChart(data.leastProducts);
    renderMonthlySalesChart(data.monthlySales);
    renderCategorySalesChart(data.categorySales);
    renderHourlySalesChart(data.hourlySales);
}

/**
 * Render top products chart
 */
function renderTopProductsChart(data) {
    const ctx = document.getElementById('topProductsChart').getContext('2d');
    
    if (charts.topProducts) charts.topProducts.destroy();
    
    charts.topProducts = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: 'Quantity Sold',
                data: Object.values(data),
                backgroundColor: '#667eea',
                borderColor: '#667eea',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

/**
 * Render least products chart
 */
function renderLeastProductsChart(data) {
    const ctx = document.getElementById('leastProductsChart').getContext('2d');
    
    if (charts.leastProducts) charts.leastProducts.destroy();
    
    charts.leastProducts = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: 'Quantity Sold',
                data: Object.values(data),
                backgroundColor: '#ff4757',
                borderColor: '#ff4757',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

/**
 * Render monthly sales chart
 */
function renderMonthlySalesChart(data) {
    const ctx = document.getElementById('monthlySalesChart').getContext('2d');
    
    if (charts.monthlySales) charts.monthlySales.destroy();
    
    charts.monthlySales = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: 'Revenue ($)',
                data: Object.values(data),
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                borderColor: '#667eea',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toFixed(0);
                        }
                    }
                }
            }
        }
    });
}

/**
 * Render category sales chart
 */
function renderCategorySalesChart(data) {
    const ctx = document.getElementById('categorySalesChart').getContext('2d');
    
    if (charts.categorySales) charts.categorySales.destroy();
    
    charts.categorySales = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(data),
            datasets: [{
                data: Object.values(data),
                backgroundColor: [
                    '#667eea', '#764ba2', '#f093fb', '#4facfe',
                    '#43e97b', '#fa709a', '#fee140', '#30cfd0'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

/**
 * Render hourly sales chart
 */
function renderHourlySalesChart(data) {
    const ctx = document.getElementById('hourlySalesChart').getContext('2d');
    
    if (charts.hourlySales) charts.hourlySales.destroy();
    
    // Sort by hour
    const sortedData = Object.entries(data)
        .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
        .reduce((acc, [key, value]) => {
            acc[formatHour(parseInt(key))] = value;
            return acc;
        }, {});
    
    charts.hourlySales = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(sortedData),
            datasets: [{
                label: 'Sales ($)',
                data: Object.values(sortedData),
                backgroundColor: '#764ba2',
                borderColor: '#764ba2',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toFixed(0);
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

/**
 * Render sales table
 */
function renderSalesTable(sales) {
    const tbody = document.getElementById('salesTableBody');
    tbody.innerHTML = '';
    
    if (sales.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="no-data">No sales data yet. Add your first sale above!</td></tr>';
        return;
    }
    
    // Sort by ID descending (newest first)
    sales.sort((a, b) => b.id - a.id);
    
    sales.forEach(sale => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sale.id}</td>
            <td><strong>${sale.productName}</strong></td>
            <td>${sale.category}</td>
            <td>$${sale.saleAmount.toFixed(2)}</td>
            <td>${sale.quantity}</td>
            <td>${sale.saleDate}</td>
            <td>${sale.customerName}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteSale(${sale.id})">
                    🗑️ Delete
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

/**
 * Delete a sale
 */
async function deleteSale(saleId) {
    if (!confirm('Are you sure you want to delete this sale?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/delete-sale`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${currentUser.username}&saleId=${saleId}`
        });
        
        const data = await response.json();
        
        if (data.success) {
            loadDashboardData();
        } else {
            alert('Failed to delete sale');
        }
    } catch (error) {
        console.error('Error deleting sale:', error);
        alert('Failed to delete sale');
    }
}

// Helper functions
function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
}

function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatHour(hour) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:00 ${period}`;
}

// Make deleteSale globally accessible
window.deleteSale = deleteSale;