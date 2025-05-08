
import { Button } from "@/components/ui/button";

const OrderForm = () => {
  return (
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
  );
};

export default OrderForm;
