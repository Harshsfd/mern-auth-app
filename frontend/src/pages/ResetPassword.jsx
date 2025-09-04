import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../api/authApi';
import InputField from '../components/InputField';

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await resetPassword(token, { password });
      setMsg(res.data.message || 'Password reset successful.');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error resetting password.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={onSubmit}>
        <InputField type="password" name="password" label="New Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Reset Password</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
