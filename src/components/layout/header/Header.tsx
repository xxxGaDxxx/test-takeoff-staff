import { useNavigate } from 'react-router-dom';
import { PATH } from '@/common/constants/routePath.ts';
import { Typography } from '@/components/ui-toolkit/typography/Typography.tsx';
import { Button } from '@/components/ui-toolkit/button/Button.tsx';
import styles from './Header.module.scss';

type HeaderPropsType = {
  isLogin: boolean;
  email?: string;
  onLogOut: () => void;
};

const Header = ({ isLogin, email, onLogOut }: HeaderPropsType) => {
  const navigate = useNavigate();

  const onLogin = () => {
    navigate(PATH.LOGIN);
  };

  return (
    <header className={styles.root}>
      <div className={styles.wrapper}>
        {!isLogin ? (
          <Button onClick={onLogin} variant="primary">
            Sign In
          </Button>
        ) : (
          <div className={styles.container}>
            <Typography variant="subtitle" className={styles.email}>
              {email}
            </Typography>

            <Button onClick={onLogOut} variant="primary">
              Log Out
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
