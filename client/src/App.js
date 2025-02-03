import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import React from "react";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Verify from "./Components/Verify";
import { MetamaskProvider } from "./Context/metamask";
import { LoginProvider } from "./Context/LoginContext";
import User from "./User";

function App() {
  return (
    <MetamaskProvider>
      <LoginProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/main/:id/*" element={<User />} />
            <Route path="/consumer/verify" element={<Verify />} />
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </MetamaskProvider>
  );
}

export default App;
