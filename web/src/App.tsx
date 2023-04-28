import React, { useContext, useEffect } from "react";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import LoginComponent from "./components/login/login.component";

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);
  return (
    <div>
      <h1>
        {store.isAuth
          ? `User authorized ${store.user.email}`
          : "User not authorized"}
      </h1>
      <LoginComponent />
    </div>
  );
}

export default observer(App);
