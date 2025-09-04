import React, { useState } from 'react';
import { registerUser } from '../api/authApi';
import { Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', mobile: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      setMsg(res.data.message || 'Registered. Check email for verification.');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error registering');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile (optional)" value={form.mobile} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p className="small">{msg}</p>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
