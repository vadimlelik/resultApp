import { createBrowserRouter } from 'react-router';
import { App } from '../App';
import { Auth } from '../Auth';
import { PrivateRoute } from '../components/PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
  },
  {
    path: 'auth',
    element: <Auth />,
  },
]);
