import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { clsx } from 'clsx';
import styles from './Button.module.scss';

export type ButtonProps<T extends ElementType = ElementType> = {
  as?: T;
  variant?: 'primary' | 'secondary' | 'tertiary';
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
};

export const Button = <T extends ElementType = ElementType>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
) => {
  const {
    as: Component = 'button',
    variant = 'primary',
    fullWidth,
    className,
    ...resProps
  } = props;

  return (
    <Component
      className={clsx(styles[variant], fullWidth && styles.fullWidth, className)}
      {...resProps}
    />
  );
};
