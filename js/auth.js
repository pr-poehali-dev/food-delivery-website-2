
// Authentication related functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const authButton = document.getElementById('authButton');
    const authModal = document.getElementById('authModal');
    const closeModal = document.querySelector('.close-modal');
    const authTabs = document.querySelectorAll('.auth-tab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginFormElement = document.getElementById('loginFormElement');
    const registerFormElement = document.getElementById('registerFormElement');
    const notification = document.getElementById('notification');
    
    // Show notification
    function showNotification(message, type = 'success') {
        notification.textContent = message;
        notification.className = 'notification ' + type + ' active';
        
        setTimeout(() => {
            notification.classList.remove('active');
        }, 3000);
    }
    
    // Update auth button based on login status
    function updateAuthButton() {
        const currentUser = Database.getCurrentUser();
        
        if (currentUser) {
            authButton.innerHTML = `
                <span>${currentUser.name}</span>
                <i class="fas fa-sign-out-alt"></i>
            `;
            authButton.onclick = function() {
                if (confirm('Вы действительно хотите выйти?')) {
                    Database.logoutUser();
                    updateAuthButton();
                    showNotification('Вы успешно вышли из аккаунта');
                    
                    // Redirect to homepage if on account page
                    if (window.location.pathname.includes('account.html')) {
                        window.location.href = 'index.html';
                    } else {
                        // Reload the current page
                        window.location.reload();
                    }
                }
            };
        } else {
            authButton.innerHTML = '<i class="fas fa-user"></i> Войти';
            authButton.onclick = function() {
                openAuthModal();
            };
        }
    }
    
    // Open auth modal
    function openAuthModal() {
        authModal.classList.add('active');
    }
    
    // Close auth modal
    function closeAuthModal() {
        authModal.classList.remove('active');
    }
    
    // Switch between auth tabs
    function switchTab(tab) {
        // Remove active class from all tabs
        authTabs.forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding form
        const tabName = tab.dataset.tab;
        document.getElementById(`${tabName}Form`).classList.add('active');
    }
    
    // Event Listeners
    if (authButton) {
        updateAuthButton();
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeAuthModal);
    }
    
    // When clicking outside the modal
    window.addEventListener('click', function(event) {
        if (event.target === authModal) {
            closeAuthModal();
        }
    });
    
    // Tab switching
    if (authTabs) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                switchTab(this);
            });
        });
    }
    
    // Login form submission
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            const success = Database.loginUser(email, password);
            
            if (success) {
                showNotification('Вы успешно вошли в аккаунт');
                closeAuthModal();
                updateAuthButton();
                
                // Reload the current page
                window.location.reload();
            } else {
                showNotification('Неверный email или пароль', 'error');
            }
        });
    }
    
    // Register form submission
    if (registerFormElement) {
        registerFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerPasswordConfirm').value;
            
            if (password !== confirmPassword) {
                showNotification('Пароли не совпадают', 'error');
                return;
            }
            
            const success = Database.registerUser(name, email, password);
            
            if (success) {
                showNotification('Вы успешно зарегистрировались');
                closeAuthModal();
                updateAuthButton();
                
                // Reload the current page
                window.location.reload();
            } else {
                showNotification('Пользователь с таким email уже существует', 'error');
            }
        });
    }
    
    // Check for showAuthBtn element (on account page)
    const showAuthBtn = document.getElementById('showAuthBtn');
    if (showAuthBtn) {
        showAuthBtn.addEventListener('click', openAuthModal);
    }
});
