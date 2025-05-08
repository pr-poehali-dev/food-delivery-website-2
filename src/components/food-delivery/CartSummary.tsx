
import { CartItem } from "@/types/food-delivery";

interface CartSummaryProps {
  cart: CartItem[];
}

const CartSummary = ({ cart }: CartSummaryProps) => {
  const totalSum = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
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
  );
};

export default CartSummary;
