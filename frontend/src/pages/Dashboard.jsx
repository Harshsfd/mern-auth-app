import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProfile } from '../api/authApi';

export default function Dashboard() {
  const { token, user } = useAuth();
  const [profile, setProfile] = useState(user);

  useEffect(() => {
    (async () => {
      try {
        if (token) {
          const res = await getProfile(token);
          setProfile(res.data.user || res.data);
        }
      } catch (err) {
        // ignore; user might be stale
      }
    })();
  }, [token]);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, <strong>{profile?.name || 'User'}</strong></p>
      <p className="small">Email: {profile?.email}</p>
      <p className="small">Joined: {profile?.createdAt ? new Date(profile.createdAt).toLocaleString() : '—'}</p>
    </div>
  );
}
