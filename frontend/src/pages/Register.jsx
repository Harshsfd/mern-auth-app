import React, { useState } from 'react';
import { registerUser } from '../api/authApi';
import { Link } from 'react-router-dom';
import InputField from '../components/InputField';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', mobile: '' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    try {
      const res = await registerUser(form);
      setMsg(res.data.message || 'Registered. Check your email for verification.');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create account</h2>
      <form onSubmit={onSubmit}>
        <InputField name="name" label="Full name" value={form.name} onChange={onChange} placeholder="John Doe" required />
        <InputField name="email" type="email" label="Email" value={form.email} onChange={onChange} placeholder="you@example.com" required />
        <InputField name="mobile" label="Mobile (optional)" value={form.mobile} onChange={onChange} placeholder="9876543210" />
        <InputField name="password" type="password" label="Password" value={form.password} onChange={onChange} placeholder="Choose a strong password" required />
        <button type="submit" disabled={loading}>{loading ? 'Registering…' : 'Register'}</button>
      </form>

      <p className="small">{msg}</p>
      <p className="center small">Already registered? <Link to="/login">Login</Link></p>
    </div>
  );
}
