
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import Icon from "@/components/ui/icon";

const dishes = [
  {
    id: 1,
    name: "Пицца Маргарита",
    description: "Классическая итальянская пицца с томатами, моцареллой и базиликом",
    price: 599,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=870&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Борщ украинский",
    description: "Традиционный борщ со сметаной и чесночными пампушками",
    price: 450,
    image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Паста Карбонара",
    description: "Спагетти с соусом из яиц, сыра пармезан, гуанчиале и черного перца",
    price: 520,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=1471&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Суши-сет Токио",
    description: "Набор из 16 роллов: Филадельфия, Калифорния, Дракон и Аляска",
    price: 1200,
    image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?q=80&w=1470&auto=format&fit=crop"
  }
];

const features = [
  {
    icon: "Clock",
    title: "Быстрая доставка",
    description: "Доставим ваш заказ в течение 30-60 минут"
  },
  {
    icon: "ShoppingBag",
    title: "Свежие продукты",
    description: "Готовим из свежих продуктов высшего качества"
  },
  {
    icon: "Wallet",
    title: "Удобная оплата",
    description: "Принимаем наличные и безналичные платежи"
  }
];

const Index = () => {
  const [cart, setCart] = useState<{id: number, name: string, price: number, quantity: number}[]>([]);
  
  const addToCart = (dish: typeof dishes[0]) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === dish.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === dish.id ? {...item, quantity: item.quantity + 1} : item
        );
      } else {
        return [...prevCart, {id: dish.id, name: dish.name, price: dish.price, quantity: 1}];
      }
    });
  };

  const totalSum = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
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

      {/* Popular Dishes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-playfair">Популярные блюда</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dishes.map((dish) => (
              <Card key={dish.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
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
                      onClick={() => addToCart(dish)}
                    >
                      <Icon name="Plus" size={16} className="mr-1" />
                      Добавить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-playfair">Почему выбирают нас</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-purple-100 text-purple-600">
                  <Icon name={feature.icon} size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-purple-600 text-white p-8">
                <h2 className="text-3xl font-bold mb-4 font-playfair">Ваш заказ</h2>
                {cart.length > 0 ? (
                  <div>
                    <div className="mb-4 space-y-2">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span>{item.name} x{item.quantity}</span>
                          <span>{item.price * item.quantity} ₽</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-purple-400 pt-2 mt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Итого:</span>
                        <span>{totalSum} ₽</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>Ваша корзина пуста. Добавьте блюда, чтобы сделать заказ.</p>
                )}
              </div>
              <div className="md:w-1/2 p-8">
                <h3 className="text-xl font-bold mb-4">Оформление заказа</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Ваше имя</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-md" placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Телефон</label>
                    <input type="tel" className="w-full px-4 py-2 border rounded-md" placeholder="+7 (999) 123-45-67" />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Адрес доставки</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-md" placeholder="ул. Примерная, д. 1, кв. 1" />
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700" size="lg">
                    Оформить заказ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 font-playfair">Вкусные Истории</h2>
            <p className="mb-4">Доставка вкусных блюд в любую точку города</p>
            <p>© 2025 Вкусные Истории. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
