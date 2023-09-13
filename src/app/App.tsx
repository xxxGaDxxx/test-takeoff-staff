import Router from '@/routePages/router.tsx';
import { useAppDispatch } from '@/store/store.ts';
import { useLayoutEffect } from 'react';
import { me } from '@/store/slice/auth.slice.ts';

function App() {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(me());
  }, [dispatch]);

  return <Router />;
}

export default App;
