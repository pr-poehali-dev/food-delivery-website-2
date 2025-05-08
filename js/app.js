
// Main JavaScript for the home page
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const popularDishesContainer = document.getElementById('popularDishes');
    
    // Load popular dishes
    function loadPopularDishes() {
        if (!popularDishesContainer) return;
        
        // Get first 4 dishes
        const dishes = Database.getDishes().slice(0, 4);
        
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
        
        popularDishesContainer.innerHTML = dishesHTML;
    }
    
    // Initialize
    loadPopularDishes();
});
