import React, { useState } from "react";
import Login from "./auth/Login";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import User from "./pages/user";
import Dashboard from "./pages/dashboard";
import Profiles from "./pages/profiles";
import Doctors from "./pages/doctors";
import secureAxios from "./services/http";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import "./App.scss";

function App() {
  const [isUser, setIsUser] = useState(sessionStorage.getItem("user"));
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  const checkUser = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true);
        setToken(user?.accessToken);
        sessionStorage.setItem("user", user?.accessToken);
        secureAxios
          .post("login", {
            access_token: user?.accessToken,
          })
          .then((resp) => {
            setUser(resp?.data?.user_details);
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("user");
        setIsUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="app">
      {!isUser ? (
        <Login checkUser={checkUser} />
      ) : (
        <Router>
          <Header handleLogout={handleLogout} />
          <Sidebar />
          <div className="pages">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profiles" element={<Profiles token={token} />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/user" element={<User token={token} />} />
              {user?.user_status === "new" ? (
                <Route path="/user" element={<User />} />
              ) : (
                <Route path="/dashboard" element={<Dashboard />} />
              )}
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
