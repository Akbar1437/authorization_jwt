import React, { useState } from "react";

export function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />

      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button>Login</button>
      <button>Registration</button>
    </div>
  );
}
