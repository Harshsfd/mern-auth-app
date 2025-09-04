import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/authApi';

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await logoutUser();
      } catch (err) {
        // ignore
      }
      logout();
      navigate('/login');
    })();
  }, []);

  return <div>Logging out...</div>;
}
