
import DishCard from "./DishCard";
import { Dish } from "@/types/food-delivery";

interface PopularDishesProps {
  dishes: Dish[];
  onAddToCart: (dish: Dish) => void;
}

const PopularDishes = ({ dishes, onAddToCart }: PopularDishesProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-playfair">Популярные блюда</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dishes.map((dish) => (
            <DishCard 
              key={dish.id}
              dish={dish}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDishes;
