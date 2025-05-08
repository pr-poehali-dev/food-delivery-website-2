
// JavaScript for the menu page
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const menuDishesContainer = document.getElementById('menuDishes');
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    let currentCategory = 'all';
    
    // Load menu dishes by category
    function loadMenuDishes(category) {
        if (!menuDishesContainer) return;
        
        const dishes = Database.getDishesByCategory(category);
        
        let dishesHTML = '';
        
        dishes.forEach(dish => {
            dishesHTML += `
                <div class="dish-card">
                    <img src="${dish.image}" alt="${dish.name}" class="dish-image">
                    <div class="dish-content">
                        <h3 class="dish-title">${dish.name}</h3>
                        <p class="dish-description">${dish.description}</p>
                        <div class="dish-footer">
                            <span class="dish-price">${dish.price} ₽</span>
                            <button class="btn btn-primary" onclick="addToCart(${dish.id})">
                                <i class="fas fa-plus"></i> Добавить
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        menuDishesContainer.innerHTML = dishesHTML;
    }
    
    // Category button click
    if (categoryButtons) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get category
                const category = this.dataset.category;
                currentCategory = category;
                
                // Load dishes
                loadMenuDishes(category);
            });
        });
    }
    
    // Initialize
    loadMenuDishes(currentCategory);
});
