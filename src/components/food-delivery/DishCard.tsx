
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Dish } from "@/types/food-delivery";

interface DishCardProps {
  dish: Dish;
  onAddToCart: (dish: Dish) => void;
}

const DishCard = ({ dish, onAddToCart }: DishCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <img 
        src={dish.image} 
        alt={dish.name} 
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2">{dish.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{dish.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-xl">{dish.price} ₽</span>
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => onAddToCart(dish)}
          >
            <Icon name="Plus" size={16} className="mr-1" />
            Добавить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DishCard;
