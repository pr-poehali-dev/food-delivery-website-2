
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Icon from '@/components/ui/icon';

interface AuthDialogProps {
  trigger?: React.ReactNode;
}

type FormType = 'login' | 'register';

const AuthDialog = ({ trigger }: AuthDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState<FormType>('login');
  const { isAuthenticated, user, logout } = useAuth();

  const handleSuccess = () => {
    setOpen(false);
  };

  // Если пользователь авторизован, показываем информацию о пользователе и кнопку выхода
  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{user.name}</span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={logout}
          className="gap-2"
        >
          <Icon name="LogOut" size={16} />
          Выйти
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Icon name="User" size={16} />
            Войти
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md p-0">
        {formType === 'login' ? (
          <LoginForm 
            onSuccess={handleSuccess} 
            onRegisterClick={() => setFormType('register')} 
          />
        ) : (
          <RegisterForm 
            onSuccess={handleSuccess} 
            onLoginClick={() => setFormType('login')} 
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
