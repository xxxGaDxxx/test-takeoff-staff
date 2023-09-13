import { Navigate, Route, Routes } from 'react-router-dom';
import { PATH } from '@/common/constants/routePath.ts';
import PrivateRoute from '@/routePages/privateRoute.tsx';
import LoginPage from '@/features/authPages/loginPage/LoginPage.tsx';
import ErrorPage from '@/features/errorPage/ErrorPage.tsx';
import ContactsPage from '@/features/contactsPage/ContactsPage.tsx';
import RegisterPage from '@/features/authPages/registerPage/RegisterPage.tsx';

const Pages = () => (
  <Routes>
    <Route path={PATH.LOGIN} element={<LoginPage />} />
    <Route path={PATH.REGISTER} element={<RegisterPage />} />
    <Route path={PATH.ERROR} element={<ErrorPage />} />

    <Route element={<PrivateRoute />}>
      <Route index path="/" element={<ContactsPage />} />
      <Route path={PATH.CONTACTS} element={<ContactsPage />} />
    </Route>

    <Route path="*" element={<Navigate to={PATH.ERROR} />} />
  </Routes>
);
export default Pages;
