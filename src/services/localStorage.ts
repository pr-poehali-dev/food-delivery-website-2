import { User, Order } from "@/types/user";

// Эмуляция "базы данных" с помощью localStorage
const USERS_KEY = "food-delivery-users";
const CURRENT_USER_KEY = "food-delivery-current-user";

// Простая функция для генерации ID без зависимости от uuid
const generateId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

// Получение всех пользователей
export const getUsers = (): Record<string, User & { password: string }> => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : {};
};

// Сохранение всех пользователей
export const saveUsers = (
  users: Record<string, User & { password: string }>,
) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Получение текущего пользователя
export const getCurrentUser = (): User | null => {
  const currentUserId = localStorage.getItem(CURRENT_USER_KEY);
  if (!currentUserId) return null;

  const users = getUsers();
  const user = users[currentUserId];
  if (!user) return null;

  // Удаляем пароль из объекта пользователя перед возвратом
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Сохранение текущего пользователя
export const setCurrentUser = (userId: string | null) => {
  if (userId) {
    localStorage.setItem(CURRENT_USER_KEY, userId);
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

// Регистрация нового пользователя
export const registerUser = (
  name: string,
  email: string,
  password: string,
): boolean => {
  const users = getUsers();

  // Проверяем, существует ли пользователь с таким email
  const userExists = Object.values(users).some((user) => user.email === email);
  if (userExists) return false;

  const userId = generateId();
  users[userId] = {
    id: userId,
    name,
    email,
    password, // В реальном приложении пароль должен быть хешированным!
    favorites: [],
    orders: [],
  };

  saveUsers(users);
  setCurrentUser(userId);
  return true;
};

// Вход пользователя
export const loginUser = (email: string, password: string): boolean => {
  const users = getUsers();

  const foundUser = Object.entries(users).find(
    ([_, user]) => user.email === email && user.password === password,
  );

  if (!foundUser) return false;

  setCurrentUser(foundUser[0]);
  return true;
};

// Выход пользователя
export const logoutUser = () => {
  setCurrentUser(null);
};

// Обновление данных пользователя
export const updateUserData = (userData: Partial<User>): User | null => {
  const currentUserId = localStorage.getItem(CURRENT_USER_KEY);
  if (!currentUserId) return null;

  const users = getUsers();
  if (!users[currentUserId]) return null;

  users[currentUserId] = {
    ...users[currentUserId],
    ...userData,
  };

  saveUsers(users);

  // Возвращаем обновленные данные пользователя
  const { password, ...userWithoutPassword } = users[currentUserId];
  return userWithoutPassword;
};

// Добавление нового заказа
export const addUserOrder = (
  orderData: Omit<Order, "id" | "date" | "status">,
): User | null => {
  const currentUserId = localStorage.getItem(CURRENT_USER_KEY);
  if (!currentUserId) return null;

  const users = getUsers();
  if (!users[currentUserId]) return null;

  const newOrder: Order = {
    id: generateId(),
    date: new Date().toISOString(),
    status: "pending",
    ...orderData,
  };

  if (!users[currentUserId].orders) {
    users[currentUserId].orders = [];
  }

  users[currentUserId].orders = [
    newOrder,
    ...(users[currentUserId].orders || []),
  ];

  saveUsers(users);

  // Возвращаем обновленные данные пользователя
  const { password, ...userWithoutPassword } = users[currentUserId];
  return userWithoutPassword;
};
