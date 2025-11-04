import './App.css';
import { useAuth } from './Provider/AuthProvider';

export const App = () => {
  const { user } = useAuth();

  return <>{JSON.stringify(user)}</>;
};
