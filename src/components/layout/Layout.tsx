import { Outlet } from 'react-router-dom';

import Header from '@/components/layout/header/Header.tsx';
import styles from './Layout.module.scss';

const Layout = () => {
  const onLogOut = () => {};
  return (
    <>
      <Header
        isLogin
        email="asdasdasdasdasdasdasdasdasasdasdasdasdasdasdasdsadasd"
        onLogOut={onLogOut}
      />

      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
