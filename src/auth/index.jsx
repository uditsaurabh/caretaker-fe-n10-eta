import React, { useState } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import LoginImage from "assets/login/landing.jpg";
import OrangeButton from "common/button";
import TextInput from "common/input";
import { ReactComponent as Logo } from "assets/icons/medical-device.svg";
import firebaseApp from "../firebaseConfig";
import "./index.scss";

const Login = ({ checkUser, setLoading, loading }) => {
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState(true);

  const handleChange = (node, value) => {
    if (node === "number") setNumber(value);
    if (node === "otp") setOtp(value);
  };

  const configureCaptcha = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          onSignInSubmit();
        },
      },
      auth
    );
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    configureCaptcha();
    setLoading(true);

    const auth = getAuth();
    const phoneNumber = number;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setMobile(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOtpVerify = () => {
    setLoading(true);
    const code = otp;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        checkUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login">
      <div className="login-detail">
        <div className="header-logo">
          <Logo style={{ height: "24px", width: "24px" }} />
          <h1>Care Tracker</h1>
        </div>
        <div className="login-form">
          <h2>Login</h2>
          {mobile ? (
            <>
              <div className="code">
                <PhoneInput
                  placeholder="Mobile"
                  value={number}
                  onChange={(val) => handleChange("number", val)}
                  defaultCountry="IN"
                  maxLength="11"
                />
              </div>
              <OrangeButton
                disabled={number ? number.length < 13 : true}
                text="Request OTP"
                type={
                  number.length < 13
                    ? "orange-button disabled"
                    : "orange-button"
                }
                click={onSignInSubmit}
                loading={loading}
              />
              <div id="sign-in-button"></div>
            </>
          ) : (
            <div className="otp">
              <TextInput
                change={(e) => handleChange("otp", e.target.value)}
                size="large"
                placeholder="OTP"
                maxLength={6}
                value={otp}
              />
              <OrangeButton
                id="verifyOtp"
                disabled={otp.length < 6}
                type={
                  otp.length < 6 ? "orange-button disabled" : "orange-button"
                }
                text="Verify OTP"
                click={handleOtpVerify}
                loading={loading}
              />
            </div>
          )}
        </div>
      </div>
      <div className="image">
        <img src={LoginImage} alt="login_image" />
      </div>
    </div>
  );
};

export default Login;
