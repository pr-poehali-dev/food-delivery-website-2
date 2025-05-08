
import CartSummary from "./CartSummary";
import OrderForm from "./OrderForm";
import { CartItem } from "@/types/food-delivery";

interface OrderSectionProps {
  cart: CartItem[];
}

const OrderSection = ({ cart }: OrderSectionProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <CartSummary cart={cart} />
            <OrderForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;
