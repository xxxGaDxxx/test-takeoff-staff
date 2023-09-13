import { SubmitHandler } from 'react-hook-form';
import { Typography } from '@/components/ui-toolkit/typography/Typography.tsx';
import { Button } from '@/components/ui-toolkit/button/Button.tsx';
import ControlledInput from '@/components/ui-toolkit/controlled/controlledInput.tsx';
import { RegisterFormType, useRegisterForm } from '@/components/auth/schemaForms.ts';
import { PATH } from '@/common/constants/routePath.ts';
import { useNavigate } from 'react-router-dom';
import styles from '../Auth.module.scss';

type RegisterFormProps = {
  onSubmit: SubmitHandler<RegisterFormType>;
  isSubmitting: boolean;
};

const RegisterForm = ({ onSubmit, isSubmitting }: RegisterFormProps) => {
  const { control, handleSubmit } = useRegisterForm(onSubmit);

  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <Typography variant="h1" as="h2">
        Signe Up
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

        <ControlledInput
          label="Confirm Password"
          name="confirmPassword"
          control={control}
          type="password"
          placeholder="confirm password"
          autoComplete="current-confirm password"
          containerProps={{ className: styles.textField }}
        />

        <Button type="submit" fullWidth className={styles.button} disabled={isSubmitting}>
          Sign Up
        </Button>
      </form>

      <Typography as="p" variant="body" className={styles.questionParagraph}>
        Already have an account?
      </Typography>

      <Button as="a" variant="link" onClick={() => navigate(PATH.LOGIN)} className={styles.signUp}>
        Sign In
      </Button>
    </div>
  );
};

export default RegisterForm;
