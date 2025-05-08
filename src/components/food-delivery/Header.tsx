
import AuthDialog from "./auth/AuthDialog";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { CartItem } from "@/types/food-delivery";

interface HeaderProps {
  cart: CartItem[];
}

const Header = ({ cart }: HeaderProps) => {
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold font-playfair text-purple-600">Вкусные Истории</Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-purple-600">Главная</Link>
          <Link to="/menu" className="hover:text-purple-600">Меню</Link>
          <Link to="/account" className="hover:text-purple-600">Личный кабинет</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <AuthDialog />
          
          {cartItemsCount > 0 && (
            <Button 
              variant="outline" 
              className="relative"
              asChild
            >
              <Link to="/cart">
                <Icon name="ShoppingCart" size={18} />
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
