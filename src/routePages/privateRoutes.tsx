import { Navigate, Outlet } from 'react-router-dom';
import { PATH } from '@/common/constants/routePath.ts';

const PrivateRoutes = () => {
  const accessToken = sessionStorage.getItem('accessToken');

  return accessToken ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};

export default PrivateRoutes;
