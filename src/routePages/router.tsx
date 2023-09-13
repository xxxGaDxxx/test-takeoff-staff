import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { PATH } from '@/common/constants/routePath.ts';
import PrivateRoutes from '@/routePages/privateRoutes.tsx';
import LoginPage from '@/features/authPages/loginPage/LoginPage.tsx';
import ErrorPage from '@/features/errorPage/ErrorPage.tsx';
import ContactsPage from '@/features/contactsPage/ContactsPage.tsx';
import RegisterPage from '@/features/authPages/registerPage/RegisterPage.tsx';
import Layout from '@/components/layout/Layout.tsx';

const publicRoutes: RouteObject[] = [
  {
    path: PATH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: PATH.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: PATH.ERROR,
    element: <ErrorPage />,
  },
];

const privateRoutes: RouteObject[] = [
  {
    path: PATH.CONTACTS,
    element: <ContactsPage />,
  },
];

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateRoutes />,
        children: privateRoutes,
      },
      ...publicRoutes,
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
export default Router;
