import { useState } from "react";
import HeroSection from "@/components/food-delivery/HeroSection";
import PopularDishes from "@/components/food-delivery/PopularDishes";
import FeaturesSection from "@/components/food-delivery/FeaturesSection";
import OrderSection from "@/components/food-delivery/OrderSection";
import Footer from "@/components/food-delivery/Footer";
import { CartItem, Dish } from "@/types/food-delivery";
import { popularDishes, deliveryFeatures } from "@/data/dishes";

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (dish: Dish) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === dish.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        return [
          ...prevCart,
          { id: dish.id, name: dish.name, price: dish.price, quantity: 1 },
        ];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <PopularDishes dishes={popularDishes} onAddToCart={addToCart} />
      <FeaturesSection features={deliveryFeatures} />
      <OrderSection cart={cart} />
      <Footer />
    </div>
  );
};

export default Index;
