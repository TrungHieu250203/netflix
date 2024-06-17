import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GlobalStyles.module.scss";
import { MovieProvider } from "./context/movie-provider";
import { NotificationProvider } from "./components/socket/socket.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NotificationProvider>
      <MovieProvider>
        <App />
      </MovieProvider>
    </NotificationProvider>
  </React.StrictMode>
);
