
// Cart related functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const cartCountElement = document.getElementById('cartCount');
    
    // Update cart count in header
    function updateCartCount() {
        const cart = Database.getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        
        if (cartCountElement) {
            cartCountElement.textContent = count;
            
            if (count > 0) {
                cartCountElement.style.display = 'flex';
            } else {
                cartCountElement.style.display = 'none';
            }
        }
    }
    
    // Update order summary section on homepage
    function updateOrderSummary() {
        const orderSummaryItems = document.getElementById('orderSummaryItems');
        const orderTotal = document.getElementById('orderTotal');
        const emptyCartMessage = document.getElementById('emptyCartMessage');
        
        if (!orderSummaryItems) return;
        
        const cart = Database.getCart();
        
        if (cart.length === 0) {
            if (emptyCartMessage) {
                emptyCartMessage.style.display = 'block';
            }
            
            if (orderTotal) {
                orderTotal.innerHTML = `
                    <span>Итого:</span>
                    <span>0 ₽</span>
                `;
            }
            return;
        }
        
        if (emptyCartMessage) {
            emptyCartMessage.style.display = 'none';
        }
        
        let itemsHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            itemsHTML += `
                <div class="order-item">
                    <span>${item.name} x${item.quantity}</span>
                    <span>${itemTotal} ₽</span>
                </div>
            `;
        });
        
        orderSummaryItems.innerHTML = itemsHTML;
        
        if (orderTotal) {
            orderTotal.innerHTML = `
                <span>Итого:</span>
                <span>${total} ₽</span>
            `;
        }
    }
    
    // Add to cart function
    window.addToCart = function(dishId) {
        Database.addToCart(dishId);
        updateCartCount();
        updateOrderSummary();
        
        // Show notification
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = 'Товар добавлен в корзину';
            notification.className = 'notification success active';
            
            setTimeout(() => {
                notification.classList.remove('active');
            }, 3000);
        }
    };
    
    // Initial update
    updateCartCount();
    updateOrderSummary();
    
    // Checkout form processing
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const cart = Database.getCart();
            if (cart.length === 0) {
                alert('Ваша корзина пуста');
                return;
            }
            
            const currentUser = Database.getCurrentUser();
            if (!currentUser) {
                // Show auth modal
                const authModal = document.getElementById('authModal');
                if (authModal) {
                    authModal.classList.add('active');
                    
                    // Show notification
                    const notification = document.getElementById('notification');
                    if (notification) {
                        notification.textContent = 'Для оформления заказа необходимо войти в аккаунт';
                        notification.className = 'notification error active';
                        
                        setTimeout(() => {
                            notification.classList.remove('active');
                        }, 3000);
                    }
                }
                return;
            }
            
            // Get form data
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;
            
            // Calculate total
            const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            
            // Create order
            const orderId = Database.createOrder({
                customerName: name,
                phone,
                address,
                total
            });
            
            if (orderId) {
                // Show notification
                const notification = document.getElementById('notification');
                if (notification) {
                    notification.textContent = 'Заказ успешно оформлен';
                    notification.className = 'notification success active';
                    
                    setTimeout(() => {
                        notification.classList.remove('active');
                    }, 3000);
                }
                
                // Reset form
                checkoutForm.reset();
                
                // Update UI
                updateCartCount();
                updateOrderSummary();
                
                // Redirect to account page after short delay
                setTimeout(() => {
                    window.location.href = 'account.html';
                }, 2000);
            }
        });
    }
});
