import React, { useState } from 'react';
import { resetPassword } from '../api/authApi';
import { useSearchParams, Link } from 'react-router-dom';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const id = searchParams.get('id');

  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    if (!token || !id) {
      setMsg('Invalid reset link');
      return;
    }
    setLoading(true);
    try {
      const res = await resetPassword(token, id, { password });
      setMsg(res.data.message || 'Password reset successful');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Reset password</h2>
      <form onSubmit={submit}>
        <input type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? 'Resetting…' : 'Reset Password'}</button>
      </form>
      <p className="small">{msg}</p>
      <p className="center small"><Link to="/login">Back to login</Link></p>
    </div>
  );
}
