import React, { useState } from 'react';
import { loginUser } from '../api/authApi';
import { Link } from 'react-router-dom';
import InputField from '../components/InputField';

export default function Login() {
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
      setMsg(res.data.message || 'Login successful.');
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <InputField name="email" type="email" label="Email" value={form.email} onChange={onChange} required />
        <InputField name="password" type="password" label="Password" value={form.password} onChange={onChange} required />
        <button type="submit" disabled={loading}>{loading ? 'Logging in…' : 'Login'}</button>
      </form>
      <p>{msg}</p>
      <p><Link to="/forgot-password">Forgot Password?</Link></p>
      <p>Don’t have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}
