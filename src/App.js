import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import secureAxios from "./services/http";
import Login from "./auth";
import Header from "./common/header";
import Sidebar from "./common/sidebar";
import User from "./pages/user";
import Dashboard from "./pages/dashboard";
import Profiles from "./pages/profiles";
import Doctors from "./pages/doctors";
import Disease from "./pages/disease";
import DoctorBoarding from "./pages/doctorOnboard";
import "./App.scss";

const App = () => {
  const dispatch = useDispatch();
  const [isUser, setIsUser] = useState(true);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const checkUser = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const token = user.accessToken;
        localStorage.setItem("user", token);
        dispatch({ type: "TOKEN", payload: token });
        secureAxios
          .post("login", {
            access_token: user?.accessToken,
          })
          .then((resp) => {
            setLoading(false);
            setUser(resp?.data?.user_details);
            setIsUser(true);
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        setIsUser(false);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { user_status } = user || "";

  return (
    <div className="app">
      {!isUser ? (
        <Login
          checkUser={checkUser}
          setLoading={setLoading}
          loading={loading}
        />
      ) : (
        <Router>
          <Header handleLogout={handleLogout} />
          <Sidebar />
          <div className="pages">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/user" element={<User />} />
              <Route path="/disease" element={<Disease />} />
              <Route path="/on-boarding" element={<DoctorBoarding />} />
              {user_status === "new" ? (
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
};

export default App;
