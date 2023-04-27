import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Store } from "./store/store";

interface StoreType {
  store: Store;
}

const store = new Store();

export const Context = createContext<StoreType>({
  store,
});

ReactDOM.render(
  <Context.Provider
    value={{
      store,
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById("root")
);
