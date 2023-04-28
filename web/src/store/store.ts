import axios from "axios";
import { makeAutoObservable } from "mobx";
import { UserType } from "../types/user";
import { AuthService } from "../services/auth-service";
import { AuthResponseType } from "../types/response";
import { API_URL } from "../http";

export class Store {
  user = {} as UserType;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: UserType) {
    this.user = user;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log("response login", response);

      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      console.log("response registration", response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as UserType);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get<AuthResponseType>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      console.log("response registration", response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }
}
