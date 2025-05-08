
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  favorites?: number[];
  orders?: Order[];
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  total: number;
  address: string;
}

export interface OrderItem {
  dishId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => void;
}
