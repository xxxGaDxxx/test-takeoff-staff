import { SubmitHandler } from 'react-hook-form';
import { LoginArgs, useLoginForm } from '@/components/auth/loginForm/schemaForm.ts';
import { Typography } from '@/components/ui-toolkit/typography/Typography.tsx';
import ControlledInput from '@/components/ui-toolkit/controlled/controlledInput.tsx';
import { Button } from '@/components/ui-toolkit/button/Button.tsx';
import styles from './LoginForm.module.scss';

type LoginFormProps = {
  onSubmit: SubmitHandler<LoginArgs>;
  isSubmitting: boolean;
};

const LoginForm = ({ isSubmitting, onSubmit }: LoginFormProps) => {
  const { control, handleSubmit } = useLoginForm(onSubmit);

  return (
    <div className={styles.root}>
      <Typography variant="h1" as="h2">
        Sign In
      </Typography>
      <form onSubmit={handleSubmit}>
        <ControlledInput
          label="Email"
          name="email"
          control={control}
          placeholder="email"
          autoComplete="current-email"
          containerProps={{ className: styles.textField }}
        />

        <ControlledInput
          label="Password"
          name="password"
          control={control}
          type="password"
          placeholder="password"
          autoComplete="current-password"
          containerProps={{ className: styles.textField }}
        />

        <Button type="submit" fullWidth className={styles.button} disabled={isSubmitting}>
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
