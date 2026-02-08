import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { App } from "./App";
import { ToastHost } from './components/ToastHost.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastHost />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);