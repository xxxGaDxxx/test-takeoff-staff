import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export type ModalArgs = {
  name: string;
  phone: string;
};

const validate = {
  name: z.string().trim().nonempty('Enter Name').min(3, 'Name must be at least 3 characters'),
  phone: z.string().min(6, 'Invalid phone number').max(14, 'Invalid phone number'),
};

export const schemaLogin = z.object({
  name: validate.name,
  phone: validate.phone,
});

export const useModalForm = (onSubmit: SubmitHandler<ModalArgs>) => {
  const { handleSubmit, ...restProps } = useForm<ModalArgs>({
    resolver: zodResolver(schemaLogin),
    mode: 'onSubmit',
  });

  return { handleSubmit: handleSubmit(onSubmit), ...restProps };
};
