import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Store } from "./store/store";

interface StoreType {
  store: Store;
}

const store = new Store();

export const Context = createContext<StoreType>({
  store,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Context.Provider value={{ store }}>
    <App />
  </Context.Provider>
);
