import { useState } from 'react';
import { LoginArgs } from '@/components/auth/schemaForms.ts';
import authApi from '@/api/authApi.ts';
import LoginForm from '@/components/auth/loginForm/LoginForm.tsx';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/common/constants/routePath.ts';

const LoginPage = () => {
  const navigate = useNavigate();

  const [i, setI] = useState(false);
  const onSubmit = async (data: LoginArgs) => {
    setI(true);
    try {
      const res = await authApi.login(data);

      const accessToken = res?.data?.accessToken;
      const userId = res?.data?.user.id;
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('userId', String(userId));
      console.log('res', res.data);
      navigate(PATH.CONTACTS);
    } catch (e) {
      console.log('e', e);
    } finally {
      setI(false);
    }
  };
  return (
    <div>
      <LoginForm onSubmit={onSubmit} isSubmitting={i} />
    </div>
  );
};

export default LoginPage;
