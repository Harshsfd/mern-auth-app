import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await logoutUser();
      } catch (err) {
        // ignore network errors
      } finally {
        logout();
        navigate('/login');
      }
    })();
  }, []);

  return <div>Logging out…</div>;
}
