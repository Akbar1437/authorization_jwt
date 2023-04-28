import React, { FC, useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";

const LoginComponent: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store } = useContext(Context);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Password"
      />
      <button onClick={() => store.login(email, password)}>Login</button>
      <button onClick={() => store.registration(email, password)}>
        Registration
      </button>
    </div>
  );
};

export default observer(LoginComponent);
