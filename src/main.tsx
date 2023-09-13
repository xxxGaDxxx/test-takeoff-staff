import { createRoot } from 'react-dom/client';
import App from '@/app/App.tsx';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/index.scss';

createRoot(document.getElementById('root')!).render(<App />);
