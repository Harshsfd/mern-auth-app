import React, { useState } from "react";
import { forgotPassword } from "../api/authApi";
import InputField from "../components/InputField";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await forgotPassword({ email });
      setMsg(res.data.message || "Password reset link sent to your email.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error sending reset email.");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={onSubmit}>
        <InputField type="email" name="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Send Reset Link</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
