
export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}
