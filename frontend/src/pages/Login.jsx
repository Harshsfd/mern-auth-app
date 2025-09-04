import React, { useState, useContext } from "react";
import { loginUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await loginUser(form);
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
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
        <button type="submit" disabled={loading}>{loading ? "Logging in…" : "Login"}</button>
      </form>
      {msg && <p style={{ color: "red" }}>{msg}</p>}
      <p className="small">Forgot password? <Link to="/forgot-password">Reset</Link></p>
      <p className="small">Don’t have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}
