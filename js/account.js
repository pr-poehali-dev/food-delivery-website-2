
// JavaScript for the account page
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const authRequiredElement = document.getElementById('authRequired');
    const accountContentElement = document.getElementById('accountContent');
    const accountTabs = document.querySelectorAll('.account-tab');
    const profileTabContent = document.getElementById('profileTab');
    const ordersTabContent = document.getElementById('ordersTab');
    const profileForm = document.getElementById('profileForm');
    const profileEmailInput = document.getElementById('profileEmail');
    const profileNameInput = document.getElementById('profileName');
    const profilePhoneInput = document.getElementById('profilePhone');
    const profileAddressInput = document.getElementById('profileAddress');
    const logoutBtn = document.getElementById('logoutBtn');
    const ordersListContainer = document.getElementById('ordersList');
    const emptyOrdersElement = document.getElementById('emptyOrders');
    
    // Check if user is logged in
    function checkAuth() {
        const currentUser = Database.getCurrentUser();
        
        if (!currentUser) {
            if (authRequiredElement) authRequiredElement.style.display = 'block';
            if (accountContentElement) accountContentElement.style.display = 'none';
        } else {
            if (authRequiredElement) authRequiredElement.style.display = 'none';
            if (accountContentElement) accountContentElement.style.display = 'block';
            
            // Load user data
            loadUserData(currentUser);
            // Load user orders
            loadUserOrders();
        }
    }
    
    // Load user data to profile form
    function loadUserData(user) {
        if (!profileForm) return;
        
        if (profileEmailInput) profileEmailInput.value = user.email || '';
        if (profileNameInput) profileNameInput.value = user.name || '';
        if (profilePhoneInput) profilePhoneInput.value = user.phone || '';
        if (profileAddressInput) profileAddressInput.value = user.address || '';
    }
    
    // Load user orders
    function loadUserOrders() {
        if (!ordersListContainer) return;
        
        const orders = Database.getUserOrders();
        
        // Show/hide empty orders message
        if (orders.length === 0) {
            if (emptyOrdersElement) emptyOrdersElement.style.display = 'block';
            return;
        } else {
            if (emptyOrdersElement) emptyOrdersElement.style.display = 'none';
        }
        
        let ordersHTML = '';
        
        orders.forEach(order => {
            // Format date
            const orderDate = new Date(order.date);
            const formattedDate = orderDate.toLocaleDateString() + ' ' + orderDate.toLocaleTimeString();
            
            // Get status class and text
            let statusClass, statusText;
            switch(order.status) {
                case 'pending':
                    statusClass = 'pending';
                    statusText = 'Ожидание';
                    break;
                case 'processing':
                    statusClass = 'processing';
                    statusText = 'В обработке';
                    break;
                case 'delivered':
                    statusClass = 'delivered';
                    statusText = 'Доставлен';
                    break;
                case 'cancelled':
                    statusClass = 'cancelled';
                    statusText = 'Отменен';
                    break;
                default:
                    statusClass = 'pending';
                    statusText = 'Ожидание';
            }
            
            // Generate items list
            let itemsHTML = '';
            
            order.items.forEach(item => {
                const itemTotal = item.price * item.quantity;
                
                itemsHTML += `
                    <div class="order-detail-item">
                        <span>${item.name} x${item.quantity}</span>
                        <span>${itemTotal} ₽</span>
                    </div>
                `;
            });
            
            ordersHTML += `
                <div class="order-card">
                    <div class="order-header">
                        <div>
                            <span class="order-date">${formattedDate}</span>
                            <div class="order-number">Заказ #${order.id.slice(0, 8)}</div>
                        </div>
                        <span class="order-status ${statusClass}">${statusText}</span>
                    </div>
                    
                    <div class="order-details">
                        <div class="order-items-list">
                            ${itemsHTML}
                        </div>
                        
                        <div class="address">
                            <strong>Адрес доставки:</strong> ${order.address}
                        </div>
                    </div>
                    
                    <div class="order-footer">
                        <span>Итого:</span>
                        <span>${order.total} ₽</span>
                    </div>
                </div>
            `;
        });
        
        ordersListContainer.innerHTML = ordersHTML;
    }
    
    // Tab switching
    if (accountTabs) {
        accountTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                accountTabs.forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.account-tab-content').forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show corresponding content
                const tabName = this.dataset.tab;
                document.getElementById(`${tabName}Tab`).classList.add('active');
            });
        });
    }
    
    // Profile form submission
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = profileNameInput.value;
            const phone = profilePhoneInput.value;
            const address = profileAddressInput.value;
            
            const success = Database.updateUserProfile({
                name,
                phone,
                address
            });
            
            if (success) {
                // Show notification
                const notification = document.getElementById('notification');
                if (notification) {
                    notification.textContent = 'Профиль успешно обновлен';
                    notification.className = 'notification success active';
                    
                    setTimeout(() => {
                        notification.classList.remove('active');
                    }, 3000);
                }
                
                // Update auth button name
                const authButton = document.getElementById('authButton');
                if (authButton) {
                    const currentUser = Database.getCurrentUser();
                    if (currentUser) {
                        authButton.innerHTML = `
                            <span>${currentUser.name}</span>
                            <i class="fas fa-sign-out-alt"></i>
                        `;
                    }
                }
            }
        });
    }
    
    // Logout button
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Вы действительно хотите выйти?')) {
                Database.logoutUser();
                
                // Redirect to homepage
                window.location.href = 'index.html';
            }
        });
    }
    
    // Initialize
    checkAuth();
});
