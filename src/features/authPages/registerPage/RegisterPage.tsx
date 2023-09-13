import RegisterForm from '@/components/auth/registerForm/RegisterForm.tsx';
import { useState } from 'react';
import { LoginArgs } from '@/components/auth/schemaForms.ts';
import authApi from '@/api/authApi.ts';

const RegisterPage = () => {
  const [i, setI] = useState(false);
  const onSubmit = async (data: LoginArgs) => {
    console.log('data', data);
    setI(true);
    try {
      const res = await authApi.register({ email: data.email, password: data.password });

      console.log('res', res);
    } catch (e) {
      console.log('e', e);
    } finally {
      setI(false);
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={onSubmit} isSubmitting={i} />
    </div>
  );
};

export default RegisterPage;
