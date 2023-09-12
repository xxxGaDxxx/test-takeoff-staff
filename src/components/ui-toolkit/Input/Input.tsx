import { ComponentProps, ComponentPropsWithoutRef, forwardRef, useState } from 'react';
import { clsx } from 'clsx';
import { Typography } from '@/components/ui-toolkit/typography/Typography.tsx';
import SearchIcon from '@/assets/icons/SearchIcon.tsx';
import VisibilityOffIcon from '@/assets/icons/VisibilityOffIcon.tsx';
import EyeIcon from '@/assets/icons/EyeIcon.tsx';
import { InputHelper } from '@/components/ui-toolkit/Input/Input.helper.ts';
import styles from './Input.module.scss';

export type InputProps = {
  onValueChange?: (value: string) => void;
  containerProps?: ComponentProps<'div'>;
  labelProps?: ComponentProps<'label'>;
  errorMessage?: string;
  label?: string;
} & ComponentPropsWithoutRef<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      errorMessage,
      placeholder,
      type,
      containerProps,
      labelProps,
      label,
      onChange,
      onValueChange,
      ...restProps
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isShowPasswordButtonShown = type === 'password';
    const isShowSearchSvg = type === 'search';

    const finalType = InputHelper.getFinalType(type, showPassword);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    };

    const classNames = {
      root: clsx(styles.root, containerProps?.className),
      fieldContainer: clsx(styles.fieldContainer),
      field: clsx(
        styles.field,
        !!errorMessage && styles.error,
        isShowSearchSvg && styles.paddingStart,
        className,
      ),
      label: clsx(styles.label, labelProps?.className),
      error: clsx(styles.error, styles.messageError),
    };

    return (
      <div className={classNames.root}>
        {label && (
          <Typography variant="body" as="label" className={classNames.label}>
            {label}
          </Typography>
        )}
        <div className={classNames.fieldContainer}>
          {isShowSearchSvg && (
            <span className={styles.showSearch}>
              <SearchIcon />
            </span>
          )}

          <input
            className={classNames.field}
            placeholder={placeholder}
            ref={ref}
            type={finalType}
            onChange={handleChange}
            {...restProps}
          />
          {isShowPasswordButtonShown && (
            <button
              className={styles.showPassword}
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <VisibilityOffIcon /> : <EyeIcon />}
            </button>
          )}

          <Typography variant="error" className={classNames.error}>
            {errorMessage}
          </Typography>
        </div>
      </div>
    );
  },
);
