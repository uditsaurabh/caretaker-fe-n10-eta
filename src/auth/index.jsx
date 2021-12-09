import React, { useState } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import firebaseApp from "../firebaseConfig"; //eslint-disable-line
import { CloseOutlined } from "@ant-design/icons";
import PhoneInput from "react-phone-number-input";
import LoginImage from "assets/login/landing.jpg";
import { demoCredentials } from "constants/constant";
import OrangeButton from "common/button";
import TextInput from "common/input";
import { ReactComponent as Logo } from "assets/icons/medical-device.svg";
import "react-phone-number-input/style.css";
import "./index.scss";

const Login = ({ checkUser, setLoading, loading }) => {
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState(true);
  const [demo, setDemo] = useState(false);

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
        throw error;
      });
  };

  const handleOtpVerify = () => {
    setLoading(true);
    const code = otp;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        checkUser();
        if (demo) {
          setDemo(false);
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <div className="login">
      <div className="login-detail">
        <div className="header-logo">
          <div className="head">
            <Logo style={{ height: "24px", width: "24px" }} />
            <h1>Care Tracker</h1>
          </div>
          <OrangeButton
            text="Dummy logins"
            type={demo ? "orange-button disabled" : "orange-button"}
            click={() => setDemo(true)}
            disabled={demo}
          />
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
                  number?.length < 13
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
      {demo && (
        <div className="demo-dialog">
          <div className="close-icon">
            <CloseOutlined onClick={() => setDemo(false)} />
          </div>
          {demoCredentials.map((item) => {
            const { title, number, code, id } = item;
            return (
              <div className="dummy" key={id}>
                <p>{title}</p> <p>{number}</p> <p>{code}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Login;
