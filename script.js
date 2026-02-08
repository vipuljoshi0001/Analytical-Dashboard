/**
 * Data Analytics Dashboard - Frontend JavaScript
 * Handles API calls, data processing, and chart rendering
 */

// Configuration
const API_BASE_URL = 'http://localhost:8080/api';

// Chart instances (global for updates)
let categoryChart = null;
let regionChart = null;
let metricsChart = null;

// DOM Elements
const loadDataBtn = document.getElementById('loadDataBtn');
const statusMessage = document.getElementById('statusMessage');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard loaded successfully');
    loadDataBtn.addEventListener('click', loadAllData);
});

/**
 * Main function to load all data from backend
 */
async function loadAllData() {
    try {
        updateStatus('Loading data...', 'info');
        loadDataBtn.disabled = true;
        loadDataBtn.classList.add('loading');

        // Fetch data from all endpoints
        const [metricsData, topTasksData] = await Promise.all([
            fetchMetrics(),
            fetchTopTasks()
        ]);

        // Update UI components
        updateSummaryCards(metricsData.summary);
        renderCategoryChart(metricsData.distribution);
        renderRegionChart(metricsData.regionMetrics);
        renderMetricsChart(metricsData.categoryMetrics);
        renderTopTasksTable(topTasksData);

        updateStatus('Data loaded successfully! ✓', 'success');

    } catch (error) {
        console.error('Error loading data:', error);
        updateStatus('Error loading data. Please check if backend is running.', 'error');
    } finally {
        loadDataBtn.disabled = false;
        loadDataBtn.classList.remove('loading');
    }
}

/**
 * Fetch metrics from backend API
 */
async function fetchMetrics() {
    const response = await fetch(`${API_BASE_URL}/metrics`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

/**
 * Fetch top tasks from backend API
 */
async function fetchTopTasks() {
    const response = await fetch(`${API_BASE_URL}/top-tasks`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

/**
 * Update summary cards with metrics
 */
function updateSummaryCards(summary) {
    document.getElementById('totalTasks').textContent = summary.totalTasks;
    document.getElementById('totalValue').textContent = `$${summary.totalValue.toFixed(2)}`;
    document.getElementById('avgValue').textContent = `$${summary.averageValue.toFixed(2)}`;
    document.getElementById('maxValue').textContent = `$${summary.maxValue.toFixed(2)}`;
}

/**
 * Render category distribution pie chart
 */
function renderCategoryChart(distribution) {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (categoryChart) {
        categoryChart.destroy();
    }

    const labels = Object.keys(distribution);
    const data = Object.values(distribution);
    
    categoryChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Tasks per Category',
                data: data,
                backgroundColor: [
                    '#667eea',
                    '#764ba2',
                    '#f093fb',
                    '#4facfe',
                    '#43e97b',
                    '#fa709a'
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
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

/**
 * Render region analysis bar chart
 */
function renderRegionChart(regionMetrics) {
    const ctx = document.getElementById('regionChart').getContext('2d');
    
    if (regionChart) {
        regionChart.destroy();
    }

    const labels = Object.keys(regionMetrics);
    const totals = labels.map(region => regionMetrics[region].total);
    const counts = labels.map(region => regionMetrics[region].count);

    regionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Total Value ($)',
                    data: totals,
                    backgroundColor: '#667eea',
                    borderColor: '#667eea',
                    borderWidth: 1
                },
                {
                    label: 'Task Count',
                    data: counts,
                    backgroundColor: '#764ba2',
                    borderColor: '#764ba2',
                    borderWidth: 1
                }
            ]
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
                    position: 'bottom'
                }
            }
        }
    });
}

/**
 * Render category metrics comparison chart
 */
function renderMetricsChart(categoryMetrics) {
    const ctx = document.getElementById('metricsChart').getContext('2d');
    
    if (metricsChart) {
        metricsChart.destroy();
    }

    const categories = Object.keys(categoryMetrics);
    const totals = categories.map(cat => categoryMetrics[cat].total);
    const averages = categories.map(cat => categoryMetrics[cat].average);
    const maxValues = categories.map(cat => categoryMetrics[cat].max);

    metricsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [
                {
                    label: 'Total',
                    data: totals,
                    backgroundColor: '#667eea'
                },
                {
                    label: 'Average',
                    data: averages,
                    backgroundColor: '#764ba2'
                },
                {
                    label: 'Maximum',
                    data: maxValues,
                    backgroundColor: '#f093fb'
                }
            ]
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
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': $' + context.parsed.y.toFixed(2);
                        }
                    }
                }
            }
        }
    });
}

/**
 * Render top tasks table
 */
function renderTopTasksTable(tasks) {
    const tbody = document.getElementById('topTasksBody');
    tbody.innerHTML = '';

    if (tasks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">No tasks available</td></tr>';
        return;
    }

    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.id}</td>
            <td><strong>${task.category}</strong></td>
            <td>$${task.value.toFixed(2)}</td>
            <td>${task.region}</td>
            <td><span class="priority-badge priority-${task.priority.toLowerCase()}">${task.priority}</span></td>
            <td>${task.timestamp}</td>
        `;
        tbody.appendChild(row);
    });
}

/**
 * Update status message
 */
function updateStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message status-${type}`;
    
    // Clear success message after 3 seconds
    if (type === 'success') {
        setTimeout(() => {
            statusMessage.textContent = '';
        }, 3000);
    }
}

// Add priority badge styles dynamically
const style = document.createElement('style');
style.textContent = `
    .priority-badge {
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 0.85em;
        font-weight: 600;
        text-transform: uppercase;
    }
    .priority-high {
        background: #ff4757;
        color: white;
    }
    .priority-medium {
        background: #ffa502;
        color: white;
    }
    .priority-low {
        background: #2ed573;
        color: white;
    }
    .status-info {
        color: #667eea;
    }
    .status-success {
        color: #2ed573;
    }
    .status-error {
        color: #ff4757;
    }
`;
document.head.appendChild(style);