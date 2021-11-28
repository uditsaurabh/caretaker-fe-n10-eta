import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getUser, getToken } from "redux/userActions";
import Login from "auth";
import Header from "common/header";
import Sidebar from "common/sidebar";
import User from "pages/user";
import Dashboard from "pages/dashboard";
import DoctorDashboard from "pages/doctorDashboard";
import Profiles from "pages/profiles";
import Doctors from "pages/doctors";
import Disease from "pages/disease";
import DoctorBoarding from "pages/doctorOnboard";
import "./App.scss";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const [isUser, setIsUser] = useState(localStorage.getItem("user"));
  const [otpLoading, setOtpLoading] = useState(false);
  const checkUser = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const token = user.accessToken;
        localStorage.setItem("user", token);
        dispatch(getToken(token));
        dispatch(getUser(token));
        setIsUser(token);
      }
    });
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        setIsUser(null);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { user_status } = user?.data || "";

  return (
    <div className="app">
      {!isUser ? (
        <Login
          checkUser={checkUser}
          setLoading={setOtpLoading}
          loading={otpLoading}
        />
      ) : (
        <Router>
          <Header handleLogout={handleLogout} />
          <Sidebar userType="user" />
          <div className="pages">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/doctor-Dashboard" element={<DoctorDashboard />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/user" element={<User />} />
              <Route path="/disease" element={<Disease />} />
              <Route path="/on-boarding" element={<DoctorBoarding />} />
              {user_status === "new" ? (
                <Route path="/" element={<User />} />
              ) : (
                <Route path="/" element={<Dashboard />} />
              )}
            </Routes>
          </div>
        </Router>
      )}
      {}
    </div>
  );
};

export default App;
