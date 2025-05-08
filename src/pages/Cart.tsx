
import { useAuth } from "@/contexts/AuthContext";
import { CartItem } from "@/types/food-delivery";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Header from "@/components/food-delivery/Header";
import Footer from "@/components/food-delivery/Footer";

interface CartPageProps {
  cart: CartItem[];
  clearCart: () => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
}

const Cart = ({ cart, clearCart, updateItemQuantity, removeItem }: CartPageProps) => {
  const { user, isAuthenticated, addOrder } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const totalSum = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Требуется авторизация",
        description: "Для оформления заказа необходимо войти в аккаунт",
        variant: "destructive",
      });
      return;
    }

    if (!user?.address) {
      toast({
        title: "Требуется адрес",
        description: "Укажите адрес доставки в личном кабинете",
        variant: "destructive",
      });
      navigate("/account");
      return;
    }

    setIsProcessing(true);

    // Имитация процесса оформления заказа
    setTimeout(() => {
      try {
        addOrder({
          items: cart.map(item => ({
            dishId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          total: totalSum,
          address: user.address || '',
        });

        toast({
          title: "Заказ оформлен",
          description: "Ваш заказ успешно оформлен и скоро будет доставлен",
        });

        clearCart();
        navigate("/account");
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось оформить заказ. Попробуйте позже.",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cart={cart} />
      
      <div className="container mx-auto px-4 py-8 flex-grow max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 font-playfair">Корзина</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Icon name="ShoppingCart" size={64} className="mx-auto" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Ваша корзина пуста</h2>
            <p className="text-gray-600 mb-6">Добавьте что-нибудь из нашего меню</p>
            <Button className="bg-purple-600 hover:bg-purple-700" asChild>
              <Link to="/">Вернуться к меню</Link>
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-semibold mb-4">Ваш заказ</h2>
                
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-3 border-b">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">{item.price} ₽</p>
                    </div>
                    
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        <Icon name="Minus" size={16} />
                      </Button>
                      
                      <span className="mx-3">{item.quantity}</span>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                      >
                        <Icon name="Plus" size={16} />
                      </Button>
                    </div>
                    
                    <div className="ml-4 text-right">
                      <p className="font-medium">{item.price * item.quantity} ₽</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 mt-1 h-8 p-0"
                        onClick={() => removeItem(item.id)}
                      >
                        Удалить
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium">Итого:</span>
                <span className="text-xl font-bold">{totalSum} ₽</span>
              </div>
              
              <div className="flex flex-col gap-3">
                <Button 
                  className="bg-purple-600 hover:bg-purple-700 w-full"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Оформление...' : 'Оформить заказ'}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={clearCart}
                >
                  Очистить корзину
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
