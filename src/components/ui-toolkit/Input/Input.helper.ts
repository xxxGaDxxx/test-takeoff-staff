import { ComponentProps } from 'react';

const getFinalType = (type: ComponentProps<'input'>['type'], showPassword: boolean) => {
  if (type === 'password' && showPassword) {
    return 'text';
  }

  return type;
};

export const InputHelper = {
  getFinalType,
};
