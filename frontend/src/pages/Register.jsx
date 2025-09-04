import React, { useState } from "react";
import { registerUser } from "../api/authApi";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", mobile: "" });
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    setLoading(true);

    try {
      // Remove mobile if empty
      const payload = { ...form };
      if (!payload.mobile) delete payload.mobile;

      const res = await registerUser(payload);

      setMsg({
        type: "success",
        text: res.data.message || "Registration successful! You can now login.",
      });

      // Clear form after success
      setForm({ name: "", email: "", password: "", mobile: "" });
    } catch (err) {
      setMsg({
        type: "error",
        text: err.response?.data?.message || "Registration failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create account</h2>
      <form onSubmit={onSubmit}>
        <InputField
          name="name"
          label="Full name"
          value={form.name}
          onChange={onChange}
          placeholder="John Doe"
          required
        />
        <InputField
          name="email"
          type="email"
          label="Email"
          value={form.email}
          onChange={onChange}
          placeholder="you@example.com"
          required
        />
        <InputField
          name="mobile"
          label="Mobile (optional)"
          value={form.mobile}
          onChange={onChange}
          placeholder="9876543210"
        />
        <InputField
          name="password"
          type="password"
          label="Password"
          value={form.password}
          onChange={onChange}
          placeholder="Choose a strong password"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering…" : "Register"}
        </button>
      </form>

      {msg.text && (
        <p style={{ color: msg.type === "error" ? "red" : "green" }}>
          {msg.text}
        </p>
      )}

      <p className="center small">
        Already registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
