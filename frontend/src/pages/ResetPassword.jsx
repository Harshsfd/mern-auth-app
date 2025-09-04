import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/authApi";
import InputField from "../components/InputField";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword(token, { password });
      setMsg(res.data.message || "Password reset successful!");
      navigate("/login");
    } catch (err) {
      setMsg(err.response?.data?.message || "Reset failed.");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={onSubmit}>
        <InputField type="password" name="password" label="New Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Reset Password</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
