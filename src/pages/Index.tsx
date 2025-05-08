import { useState } from "react";
import Header from "@/components/food-delivery/Header";
import HeroSection from "@/components/food-delivery/HeroSection";
import PopularDishes from "@/components/food-delivery/PopularDishes";
import FeaturesSection from "@/components/food-delivery/FeaturesSection";
import OrderSection from "@/components/food-delivery/OrderSection";
import Footer from "@/components/food-delivery/Footer";
import { CartItem, Dish } from "@/types/food-delivery";
import { popularDishes, deliveryFeatures } from "@/data/dishes";
import { useAuth } from "@/contexts/AuthContext";

interface IndexProps {
  addToCart: (dish: Dish) => void;
  cart: CartItem[];
}

const Index = ({ addToCart, cart }: IndexProps) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cart={cart} />
      <HeroSection />
      <PopularDishes dishes={popularDishes} onAddToCart={addToCart} />
      <FeaturesSection features={deliveryFeatures} />
      <OrderSection cart={cart} />
      <Footer />
    </div>
  );
};

export default Index;
