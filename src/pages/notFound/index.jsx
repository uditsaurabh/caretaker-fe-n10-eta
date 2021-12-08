import React from "react";
import Lottie from "react-lottie";
import PageNotFound from "assets/404/4339-not-found";
import CommonCard from "common/card";
import "./index.scss";

const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: PageNotFound,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="not-found">
      <CommonCard>
        <Lottie options={defaultOptions} height={400} width={500} />
      </CommonCard>
    </div>
  );
};

export default NotFound;
