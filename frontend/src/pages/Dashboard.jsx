import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, <strong>{user?.name}</strong></p>
      <p className="small">Email: {user?.email}</p>
    </div>
  );
}
