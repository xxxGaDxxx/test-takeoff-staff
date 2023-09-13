import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export type LoginArgs = {
  password: string;
  email: string;
};

const validate = {
  email: z.string().trim().nonempty('Enter Email').email('Invalid email address'),
  password: z
    .string()
    .trim()
    .nonempty('Enter Password')
    .min(5, 'Password must be at least 5 characters'),
};

// Login Form

export const schemaLogin = z.object({
  email: validate.email,
  password: validate.password,
});

export const useLoginForm = (onSubmit: SubmitHandler<LoginArgs>) => {
  const { handleSubmit, ...restProps } = useForm<LoginArgs>({
    resolver: zodResolver(schemaLogin),
    mode: 'onSubmit',
  });

  return { handleSubmit: handleSubmit(onSubmit), ...restProps };
};

// Register form
export const schemaRegister = z
  .object({
    email: validate.email,
    password: validate.password,
    confirmPassword: validate.password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  });

export type RegisterFormType = z.infer<typeof schemaRegister>;

export const useRegisterForm = (onSubmit: SubmitHandler<RegisterFormType>) => {
  const { handleSubmit, ...restProps } = useForm<RegisterFormType>({
    resolver: zodResolver(schemaRegister),
    mode: 'onSubmit',
  });

  return { handleSubmit: handleSubmit(onSubmit), ...restProps };
};
