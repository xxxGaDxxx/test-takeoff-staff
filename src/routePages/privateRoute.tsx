import { Navigate, Outlet } from 'react-router-dom';
import { PATH } from '@/common/constants/routePath.ts';

const PrivateRoute = () => {
  // TODO data contacts
  const data = true;
  return data ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};

export default PrivateRoute;
