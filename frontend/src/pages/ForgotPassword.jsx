import React, { useState } from 'react';
import { forgotPassword } from '../api/authApi';
import { Link } from 'react-router-dom';
import InputField from '../components/InputField';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    try {
      const res = await forgotPassword({ email });
      setMsg(res.data.message || 'If account exists, an email will be sent.');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error sending reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Forgot password</h2>
      <form onSubmit={submit}>
        <InputField name="email" type="email" label="Enter registered email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
        <button type="submit" disabled={loading}>{loading ? 'Sending…' : 'Send reset link'}</button>
      </form>
      <p className="small">{msg}</p>
      <p className="center small"><Link to="/login">Back to login</Link></p>
    </div>
  );
}
