
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, Order } from '@/types/user';
import {
  getCurrentUser,
  loginUser,
  registerUser,
  logoutUser,
  updateUserData,
  addUserOrder
} from '@/services/localStorage';

// Создаем контекст с начальным значением
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => Promise.resolve(false),
  register: () => Promise.resolve(false),
  logout: () => {},
  updateUser: () => {},
  addOrder: () => {}
});

// Хук для использования контекста авторизации
export const useAuth = () => useContext(AuthContext);

// Провайдер контекста авторизации
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // При загрузке компонента проверяем, авторизован ли пользователь
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
  }, []);

  // Функция входа
  const login = async (email: string, password: string) => {
    const success = loginUser(email, password);
    if (success) {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setIsAuthenticated(true);
    }
    return success;
  };

  // Функция регистрации
  const register = async (name: string, email: string, password: string) => {
    const success = registerUser(name, email, password);
    if (success) {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setIsAuthenticated(true);
    }
    return success;
  };

  // Функция выхода
  const logout = () => {
    logoutUser();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Функция обновления данных пользователя
  const updateUser = (userData: Partial<User>) => {
    const updatedUser = updateUserData(userData);
    if (updatedUser) {
      setUser(updatedUser);
    }
  };

  // Функция добавления заказа
  const addOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>) => {
    const updatedUser = addUserOrder(orderData);
    if (updatedUser) {
      setUser(updatedUser);
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    addOrder
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
