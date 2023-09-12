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
