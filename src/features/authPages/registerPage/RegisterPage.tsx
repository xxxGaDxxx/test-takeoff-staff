import RegisterForm from '@/components/auth/registerForm/RegisterForm.tsx';
import { useAppDispatch, useAppSelector } from '@/store/store.ts';
import { useNavigate } from 'react-router-dom';
import { AuthArgs } from '@/api/type.ts';
import { register } from '@/store/slice/auth.slice.ts';
import { PATH } from '@/common/constants/routePath.ts';
import { useEffect } from 'react';

const RegisterPage = () => {
  const isLoading = useAppSelector((state) => state.auth.loading);
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const isRegister = useAppSelector((state) => state.auth.isRegister);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmit = (data: AuthArgs) => {
    dispatch(register(data));
  };

  useEffect(() => {
    if (isLogin) {
      navigate(PATH.CONTACTS);
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    if (isRegister) {
      navigate(PATH.LOGIN);
    }
  }, [isRegister, navigate]);

  return (
    <div>
      <RegisterForm onSubmit={onSubmit} isSubmitting={isLoading} />
    </div>
  );
};

export default RegisterPage;
