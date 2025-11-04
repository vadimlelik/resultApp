import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import './index.css';
import { router } from './config/router';
import { AuthProvider } from './Provider/AuthProvider';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);
