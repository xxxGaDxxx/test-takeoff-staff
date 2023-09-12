import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { clsx } from 'clsx';
import styles from './Typography.module.scss';

export type TypographyProps<T extends ElementType = ElementType> = {
  as?: T;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'subtitle' | 'caption' | 'error';
  children?: ReactNode;
  className?: string;
};

export const Typography = <T extends ElementType = ElementType>(
  props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>,
) => {
  const { as: Component = 'p', className, variant = 'body', ...restProps } = props;

  return <Component className={clsx(styles[variant], className)} {...restProps} />;
};
