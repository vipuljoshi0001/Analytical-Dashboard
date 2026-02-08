/**
 * Login Page JavaScript
 */

const API_BASE_URL = 'http://localhost:8080/api';

// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const loginFormElement = document.getElementById('loginFormElement');
const registerFormElement = document.getElementById('registerFormElement');
const loginError = document.getElementById('loginError');
const registerError = document.getElementById('registerError');
const registerSuccess = document.getElementById('registerSuccess');

// Toggle between login and register forms
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    clearMessages();
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    clearMessages();
});

// Handle login
loginFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages();
    
    const formData = new FormData(loginFormElement);
    const username = formData.get('username');
    const password = formData.get('password');
    
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Save user data to localStorage
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            showError(loginError, data.message);
        }
    } catch (error) {
        console.error('Login error:', error);
        showError(loginError, 'Failed to connect to server. Please ensure backend is running.');
    }
});

// Handle registration
registerFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessages();
    
    const formData = new FormData(registerFormElement);
    const username = formData.get('username');
    const password = formData.get('password');
    const fullName = formData.get('fullName');
    const businessName = formData.get('businessName') || '';
    
    // Validate password length
    if (password.length < 6) {
        showError(registerError, 'Password must be at least 6 characters long');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&fullName=${encodeURIComponent(fullName)}&businessName=${encodeURIComponent(businessName)}`
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess(registerSuccess, 'Registration successful! You can now login.');
            registerFormElement.reset();
            
            // Auto-switch to login after 2 seconds
            setTimeout(() => {
                registerForm.style.display = 'none';
                loginForm.style.display = 'block';
                clearMessages();
            }, 2000);
        } else {
            showError(registerError, data.message);
        }
    } catch (error) {
        console.error('Registration error:', error);
        showError(registerError, 'Failed to connect to server. Please ensure backend is running.');
    }
});

// Helper functions
function showError(element, message) {
    element.textContent = message;
    element.classList.add('show');
}

function showSuccess(element, message) {
    element.textContent = message;
    element.classList.add('show');
}

function clearMessages() {
    loginError.classList.remove('show');
    registerError.classList.remove('show');
    registerSuccess.classList.remove('show');
}

// Check if user is already logged in
window.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = 'dashboard.html';
    }
});