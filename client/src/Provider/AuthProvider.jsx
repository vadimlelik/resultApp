import { createContext, useContext, useEffect, useState } from 'react';
const url = 'http://45.82.82.215';
const AuthContext = createContext();
//eslint-disable-next-line
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = async (payload) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${url}/api/v1/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(response.message);
      }
      const data = await response.json();
      setUser(data);
      setIsLoading(false);
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };
  const register = async (payload) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${url}/api/v1/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(response.message);
      }
      const data = await response.json();
      setUser(data);
      setIsLoading(false);
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };
  const logout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${url}/api/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(response.message);
      }
      setUser(null);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  const getMe = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${url}/api/v1/auth/me`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(response.message);
      }
      const data = await response.json();
      setUser(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <AuthContext value={{ user, login, register, logout }}>
      {isLoading ? <div>Loading...</div> : children}
    </AuthContext>
  );
};
