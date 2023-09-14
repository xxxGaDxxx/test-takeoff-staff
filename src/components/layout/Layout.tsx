import { Outlet, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/header/Header.tsx';
import { useAppDispatch, useAppSelector } from '@/store/store.ts';
import { setDataUser, setIsAuthorized } from '@/store/slice/auth.slice.ts';
import { PATH } from '@/common/constants/routePath.ts';
import { setDataContacts } from '@/store/slice/contacts.slice.ts';
import styles from './Layout.module.scss';

const Layout = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const email = useAppSelector((state) => state.auth.user?.email);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogOut = () => {
    sessionStorage.clear();
    dispatch(setIsAuthorized({ isLogin: false }));
    dispatch(setDataUser({ data: null }));
    dispatch(setDataContacts([]));
    navigate(PATH.LOGIN);
  };

  return (
    <>
      <Header isLogin={isLogin} email={email} onLogOut={onLogOut} />

      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
