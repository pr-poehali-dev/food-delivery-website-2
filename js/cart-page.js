
// JavaScript for the cart page
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const emptyCartElement = document.getElementById('emptyCart');
    const cartContentElement = document.getElementById('cartContent');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const checkoutForm = document.getElementById('checkoutForm');
    
    // Load cart items
    function loadCartItems() {
        if (!cartItemsContainer) return;
        
        const cart = Database.getCart();
        
        // Show/hide empty cart message
        if (cart.length === 0) {
            if (emptyCartElement) emptyCartElement.style.display = 'block';
            if (cartContentElement) cartContentElement.style.display = 'none';
            return;
        } else {
            if (emptyCartElement) emptyCartElement.style.display = 'none';
            if (cartContentElement) cartContentElement.style.display = 'grid';
        }
        
        let cartHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            cartHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    
                    <div class="cart-item-details">
                        <h3 class="cart-item-title">${item.name}</h3>
                        <p class="cart-item-price">${item.price} ₽</p>
                    </div>
                    
                    <div class="cart-item-controls">
                        <div class="quantity-control">
                            <button class="quantity-btn" onclick="updateCartItemQuantity(${item.dishId}, ${Math.max(1, item.quantity - 1)})">
                                <i class="fas fa-minus"></i>
                            </button>
                            
                            <span>${item.quantity}</span>
                            
                            <button class="quantity-btn" onclick="updateCartItemQuantity(${item.dishId}, ${item.quantity + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        
                        <span class="cart-item-total">${itemTotal} ₽</span>
                        
                        <button class="cart-item-remove" onclick="removeFromCart(${item.dishId})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = cartHTML;
        
        if (cartTotalElement) {
            cartTotalElement.textContent = `${total} ₽`;
        }
        
        // Prefill checkout form with user data if logged in
        const currentUser = Database.getCurrentUser();
        if (currentUser && checkoutForm) {
            const nameInput = document.getElementById('name');
            const phoneInput = document.getElementById('phone');
            const addressInput = document.getElementById('address');
            
            if (nameInput) nameInput.value = currentUser.name || '';
            if (phoneInput) phoneInput.value = currentUser.phone || '';
            if (addressInput) addressInput.value = currentUser.address || '';
        }
    }
    
    // Update cart item quantity
    window.updateCartItemQuantity = function(dishId, quantity) {
        Database.updateCartItemQuantity(dishId, quantity);
        loadCartItems();
        
        // Update cart count in header
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            const cart = Database.getCart();
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = count;
        }
    };
    
    // Remove item from cart
    window.removeFromCart = function(dishId) {
        if (confirm('Вы уверены, что хотите удалить этот товар из корзины?')) {
            Database.removeFromCart(dishId);
            loadCartItems();
            
            // Update cart count in header
            const cartCountElement = document.getElementById('cartCount');
            if (cartCountElement) {
                const cart = Database.getCart();
                const count = cart.reduce((total, item) => total + item.quantity, 0);
                cartCountElement.textContent = count;
                
                if (count === 0) {
                    cartCountElement.style.display = 'none';
                }
            }
        }
    };
    
    // Clear cart
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('Вы уверены, что хотите очистить корзину?')) {
                Database.clearCart();
                loadCartItems();
                
                // Update cart count in header
                const cartCountElement = document.getElementById('cartCount');
                if (cartCountElement) {
                    cartCountElement.textContent = '0';
                    cartCountElement.style.display = 'none';
                }
            }
        });
    }
    
    // Initialize
    loadCartItems();
});
