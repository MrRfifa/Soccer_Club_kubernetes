import './App.css'
import React from "react";
import { AuthContextProvider } from "./context/AuthContext";
import Router from "./routes";
import axios from "axios";
import "./App.css";

axios.defaults.withCredentials = true;
function App() {

  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  )
}

export default App
