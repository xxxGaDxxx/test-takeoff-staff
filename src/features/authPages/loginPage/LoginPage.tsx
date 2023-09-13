import LoginForm from '@/components/auth/loginForm/LoginForm.tsx';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/store.ts';
import { AuthArgs } from '@/api/type.ts';
import { login } from '@/store/slice/auth.slice.ts';
import { PATH } from '@/common/constants/routePath.ts';
import { useEffect } from 'react';

const LoginPage = () => {
  const isLoading = useAppSelector((state) => state.auth.loading);
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmit = async (data: AuthArgs) => {
    await dispatch(login(data));
    navigate(PATH.CONTACTS);
  };

  useEffect(() => {
    if (isLogin) {
      navigate(PATH.CONTACTS);
    }
  }, [isLogin, navigate]);

  return (
    <div>
      <LoginForm onSubmit={onSubmit} isSubmitting={isLoading} />
    </div>
  );
};

export default LoginPage;
