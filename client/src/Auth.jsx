import React from 'react';
import { useAuth } from './Provider/AuthProvider';

export const Auth = () => {
  const { user, login, register, logout } = useAuth();
  return (
    <div>
      <button
        onClick={() => {
          login({ email: 'Andreym@mail.ru', password: '123456' });
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          register({
            name: 'Andrey',
            email: 'Andreym@mail.ru',
            password: '123456',
          });
        }}
      >
        Register
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
