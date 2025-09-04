import React, { useState } from 'react';
import { loginUser } from '../api/authApi';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/InputField';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    try {
      const res = await loginUser(form);
      const { token, user } = res.data;
      login(token, user);
      navigate('/dashboard');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Welcome back</h2>
      <form onSubmit={onSubmit}>
        <InputField name="email" type="email" label="Email" value={form.email} onChange={onChange} placeholder="you@example.com" required />
        <InputField name="password" type="password" label="Password" value={form.password} onChange={onChange} placeholder="Your password" required />
        <button type="submit" disabled={loading}>{loading ? 'Logging in…' : 'Login'}</button>
      </form>

      <p className="small">{msg}</p>
      <p className="small"><Link to="/forgot-password">Forgot password?</Link></p>
      <p className="center small">New here? <Link to="/register">Create account</Link></p>
    </div>
  );
}
