import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '@/store/store.ts';
import App from '@/app/App.tsx';
import Toast from '@/components/ui-toolkit/toastContainer/Toast.tsx';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
    <Toast />
  </Provider>,
);
