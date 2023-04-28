import React, { FC, useContext, useEffect, useState } from "react";
import LoginComponent from "./components/login/login.component";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import { UserType } from "./types/user";
import { UserService } from "./services/user-service";

const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<UserType[]>([]);

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     store.checkAuth();
  //   }
  // }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  if (!store.isAuth) {
    return (
      <div>
        <LoginComponent />
        <button onClick={getUsers}>Get users</button>
      </div>
    );
  }

  return (
    <div>
      <h1>
        {store.isAuth
          ? `User authorized ${store.user.email}`
          : "Please sign up"}
      </h1>
      <h1>
        {store.user.isActivated
          ? "Account was confirmed by mail"
          : "CONFIRM ACCOUNT!!!!"}
      </h1>
      <button onClick={() => store.logout()}>Logout</button>
      <div>
        <button onClick={getUsers}>Get users</button>
      </div>
      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  );
};

export default observer(App);
