import React, { useState, useEffect } from 'react';
import { resetPassword } from '../api/authApi';
import { useSearchParams, Link } from 'react-router-dom';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const id = searchParams.get('id');

  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || !id) {
      setMsg('Invalid reset link');
      return;
    }
    try {
      const res = await resetPassword(token, id, { password });
      setMsg(res.data.message || 'Password reset success');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error resetting password');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Reset Password</button>
      </form>
      <p className="small">{msg}</p>
      <p><Link to="/login">Login</Link></p>
    </div>
  );
}
