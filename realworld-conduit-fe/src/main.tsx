import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ReactQueryProvider from "./core/context/ReactQueryProvider.tsx";
import { AppProvider } from "./core/context/AppContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    <ReactQueryProvider>
      <AppProvider>
      <App />
      </AppProvider>
    </ReactQueryProvider>
     
    </BrowserRouter>
  </React.StrictMode>
);
