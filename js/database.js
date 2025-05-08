
// Database utility to handle localStorage operations
const Database = {
    // Database keys
    DISHES_KEY: 'food_delivery_dishes',
    USERS_KEY: 'food_delivery_users',
    CART_KEY: 'food_delivery_cart',
    CURRENT_USER_KEY: 'food_delivery_current_user',
    ORDERS_KEY: 'food_delivery_orders',
    
    // Initial dishes data
    initialDishes: [
        {
            id: 1,
            name: "Пицца Маргарита",
            description: "Классическая итальянская пицца с томатами, моцареллой и базиликом",
            price: 599,
            image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format",
            category: "pizza"
        },
        {
            id: 2,
            name: "Борщ украинский",
            description: "Традиционный борщ со сметаной и чесночными пампушками",
            price: 450,
            image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500&auto=format",
            category: "soup"
        },
        {
            id: 3,
            name: "Паста Карбонара",
            description: "Спагетти с соусом из яиц, сыра пармезан, гуанчиале и черного перца",
            price: 520,
            image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&auto=format",
            category: "pasta"
        },
        {
            id: 4,
            name: "Суши-сет Токио",
            description: "Набор из 16 роллов: Филадельфия, Калифорния, Дракон и Аляска",
            price: 1200,
            image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=500&auto=format",
            category: "sushi"
        },
        {
            id: 5,
            name: "Пицца Пепперони",
            description: "Пицца с томатным соусом, моцареллой и пепперони",
            price: 699,
            image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format",
            category: "pizza"
        },
        {
            id: 6,
            name: "Суп Том Ям",
            description: "Острый тайский суп с креветками, грибами и лемонграссом",
            price: 550,
            image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format",
            category: "soup"
        },
        {
            id: 7,
            name: "Паста Болоньезе",
            description: "Спагетти с мясным соусом, томатами и пармезаном",
            price: 480,
            image: "https://images.unsplash.com/photo-1633436375153-d7045cb6c0f7?w=500&auto=format",
            category: "pasta"
        },
        {
            id: 8,
            name: "Ролл Филадельфия",
            description: "Ролл с лососем, сливочным сыром и авокадо",
            price: 550,
            image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format",
            category: "sushi"
        }
    ],
    
    // Initialize database with initial data if needed
    init() {
        // Initialize dishes if not already exists
        if (!localStorage.getItem(this.DISHES_KEY)) {
            localStorage.setItem(this.DISHES_KEY, JSON.stringify(this.initialDishes));
        }
        
        // Initialize empty users array if not exists
        if (!localStorage.getItem(this.USERS_KEY)) {
            localStorage.setItem(this.USERS_KEY, JSON.stringify([]));
        }
        
        // Initialize empty cart if not exists
        if (!localStorage.getItem(this.CART_KEY)) {
            localStorage.setItem(this.CART_KEY, JSON.stringify([]));
        }
        
        // Initialize empty orders if not exists
        if (!localStorage.getItem(this.ORDERS_KEY)) {
            localStorage.setItem(this.ORDERS_KEY, JSON.stringify([]));
        }
    },
    
    // Get all dishes
    getDishes() {
        return JSON.parse(localStorage.getItem(this.DISHES_KEY)) || [];
    },
    
    // Get dish by ID
    getDishById(id) {
        const dishes = this.getDishes();
        return dishes.find(dish => dish.id === id);
    },
    
    // Get dishes by category
    getDishesByCategory(category) {
        if (category === 'all') {
            return this.getDishes();
        }
        
        const dishes = this.getDishes();
        return dishes.filter(dish => dish.category === category);
    },
    
    // Get users
    getUsers() {
        return JSON.parse(localStorage.getItem(this.USERS_KEY)) || [];
    },
    
    // Save users
    saveUsers(users) {
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    },
    
    // Get current user
    getCurrentUser() {
        const userId = localStorage.getItem(this.CURRENT_USER_KEY);
        if (!userId) return null;
        
        const users = this.getUsers();
        return users.find(user => user.id === userId);
    },
    
    // Set current user
    setCurrentUser(userId) {
        if (userId) {
            localStorage.setItem(this.CURRENT_USER_KEY, userId);
        } else {
            localStorage.removeItem(this.CURRENT_USER_KEY);
        }
    },
    
    // Register new user
    registerUser(name, email, password) {
        const users = this.getUsers();
        
        // Check if email already exists
        if (users.some(user => user.email === email)) {
            return false;
        }
        
        // Generate unique ID
        const id = Date.now().toString();
        
        // Create new user
        const newUser = {
            id,
            name,
            email,
            password, // In a real app, this would be hashed
            orders: [],
            favorites: []
        };
        
        // Add to users array
        users.push(newUser);
        this.saveUsers(users);
        
        // Set as current user
        this.setCurrentUser(id);
        
        return true;
    },
    
    // Login user
    loginUser(email, password) {
        const users = this.getUsers();
        
        // Find user by email and password
        const user = users.find(user => user.email === email && user.password === password);
        
        if (user) {
            this.setCurrentUser(user.id);
            return true;
        }
        
        return false;
    },
    
    // Logout user
    logoutUser() {
        this.setCurrentUser(null);
    },
    
    // Update user profile
    updateUserProfile(userData) {
        const userId = localStorage.getItem(this.CURRENT_USER_KEY);
        if (!userId) return false;
        
        const users = this.getUsers();
        const userIndex = users.findIndex(user => user.id === userId);
        
        if (userIndex === -1) return false;
        
        // Merge existing user data with new data
        users[userIndex] = {...users[userIndex], ...userData};
        
        // Never update email or password this way
        delete users[userIndex].email;
        delete users[userIndex].password;
        
        this.saveUsers(users);
        return true;
    },
    
    // Get cart
    getCart() {
        return JSON.parse(localStorage.getItem(this.CART_KEY)) || [];
    },
    
    // Save cart
    saveCart(cart) {
        localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    },
    
    // Add item to cart
    addToCart(dishId, quantity = 1) {
        const dish = this.getDishById(dishId);
        if (!dish) return false;
        
        const cart = this.getCart();
        const existingItem = cart.find(item => item.dishId === dishId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                dishId,
                name: dish.name,
                price: dish.price,
                image: dish.image,
                quantity
            });
        }
        
        this.saveCart(cart);
        return true;
    },
    
    // Update item quantity in cart
    updateCartItemQuantity(dishId, quantity) {
        const cart = this.getCart();
        const item = cart.find(item => item.dishId === dishId);
        
        if (!item) return false;
        
        item.quantity = quantity;
        this.saveCart(cart);
        return true;
    },
    
    // Remove item from cart
    removeFromCart(dishId) {
        const cart = this.getCart();
        const updatedCart = cart.filter(item => item.dishId !== dishId);
        
        this.saveCart(updatedCart);
        return true;
    },
    
    // Clear cart
    clearCart() {
        this.saveCart([]);
        return true;
    },
    
    // Create order
    createOrder(orderData) {
        const userId = localStorage.getItem(this.CURRENT_USER_KEY);
        if (!userId) return false;
        
        const users = this.getUsers();
        const userIndex = users.findIndex(user => user.id === userId);
        
        if (userIndex === -1) return false;
        
        // Generate order ID
        const orderId = Date.now().toString();
        
        // Create new order
        const newOrder = {
            id: orderId,
            date: new Date().toISOString(),
            items: this.getCart(),
            status: 'pending',
            ...orderData
        };
        
        // Add to user's orders
        if (!users[userIndex].orders) {
            users[userIndex].orders = [];
        }
        
        users[userIndex].orders.unshift(newOrder);
        this.saveUsers(users);
        
        // Save order to orders collection
        const orders = JSON.parse(localStorage.getItem(this.ORDERS_KEY)) || [];
        orders.push({
            ...newOrder,
            userId
        });
        localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
        
        // Clear cart after successful order
        this.clearCart();
        
        return orderId;
    },
    
    // Get user orders
    getUserOrders() {
        const user = this.getCurrentUser();
        if (!user) return [];
        
        return user.orders || [];
    }
};

// Initialize database
Database.init();
