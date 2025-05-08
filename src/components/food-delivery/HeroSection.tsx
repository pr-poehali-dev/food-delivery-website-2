
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-playfair">Вкусные Истории</h1>
          <p className="text-xl md:text-2xl mb-8">Доставка вкуснейших блюд прямо к вашей двери</p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-full">
            Заказать сейчас
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
