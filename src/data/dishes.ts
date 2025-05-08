
import { Dish, Feature } from "@/types/food-delivery";

export const popularDishes: Dish[] = [
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

export const deliveryFeatures: Feature[] = [
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
