import React, { useContext, useEffect, useState } from "react";
import { getProfile } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user?.token) {
      getProfile(user.token).then((res) => setProfile(res.data)).catch(console.error);
    }
  }, [user]);

  return (
    <div>
      <h2>Dashboard</h2>
      {profile ? (
        <>
          <p><b>Name:</b> {profile.name}</p>
          <p><b>Email:</b> {profile.email}</p>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
      <p><Link to="/logout">Logout</Link></p>
    </div>
  );
}
