import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getUser, getToken } from "redux/userActions";
import Login from "auth";
import Header from "common/header";
import Sidebar from "common/sidebar";
import CommonCard from "common/card";
import PreLoader from "common/loader";
import User from "pages/user";
import Dashboard from "pages/dashboard";
import AdminDashboard from "pages/adminDashboard";
import DoctorDashboard from "pages/doctorDashboard";
import Profiles from "pages/profiles";
import Doctors from "pages/doctors";
import Disease from "pages/disease";
import DoctorBoarding from "pages/doctorOnboard";
import NotFound from "pages/notFound";
import Emergency from "pages/emergency";
import "./App.scss";

const App = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.userReducer);
  const [isUser, setIsUser] = useState(localStorage.getItem("user"));
  const [otpLoading, setOtpLoading] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const { user_type } = user?.data || "";

  const handleToggleSidebar = () => setSidebar((value) => !value);

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
        throw error;
      });
  };

  useEffect(() => {
    dispatch(getUser(token));
  }, []); //eslint-disable-line

  return (
    <div className="app">
      {!isUser ? (
        <>
          <Router>
            <Routes>
              <Route path="/emerygencydetails" element={<Emergency />} />
              <Route
                path="/"
                element={
                  <Login
                    checkUser={checkUser}
                    setLoading={setOtpLoading}
                    loading={otpLoading}
                  />
                }
              />
            </Routes>
          </Router>
        </>
      ) : (
        <Router>
          <Header
            handleLogout={handleLogout}
            handleToggleSidebar={handleToggleSidebar}
          />
          <Sidebar userType={user_type} sidebar={sidebar} />
          <div className="pages">
            {user_type ? (
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/doctor-Dashboard" element={<DoctorDashboard />} />
                <Route path="/profiles" element={<Profiles />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/user" element={<User />} />
                <Route path="/disease" element={<Disease />} />
                <Route path="/on-boarding" element={<DoctorBoarding />} />
                <Route path="/emerygencydetails" element={<Emergency />} />
                <Route path="*" element={<NotFound />} />
                {user_type === "user" ? (
                  <Route path="/" element={<Dashboard />} />
                ) : user_type === "admin" ? (
                  <Route path="/" element={<AdminDashboard />} />
                ) : (
                  <Route path="/" element={<DoctorDashboard />} />
                )}
              </Routes>
            ) : (
              <div className="loading">
                <CommonCard>
                  <PreLoader />
                </CommonCard>
              </div>
            )}
          </div>
        </Router>
      )}
    </div>
  );
};

export default App;
