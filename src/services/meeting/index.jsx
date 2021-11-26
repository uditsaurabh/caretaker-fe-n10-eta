import React, { useEffect, useState } from "react";
import { DyteMeeting } from "dyte-client";
// import { useSelector } from "react-redux";
// import axios from "src/service/Axios";
// import { useQuery, useRouting } from "src/util/hooks";

const Meeting = () => {
  const query = useQuery();
  const roomName = query.get("roomName");
  const meetingId = query.get("meetingId");
  const referrer = query.get("referrer");
  const { user } = useSelector((state) => state.user);
  const { name, picture, email } = user;
  const [authToken, setAuthToken] = useState();
  const router = useRouting();
  const clientId = process.env.REACT_APP_ORG_ID;
  useEffect(() => {
    axios
      .post("/participant", {
        meetingData: {
          userDetails: { name, picture },
          clientSpecificId: email,
          roleName: "host",
        },
        meetingId,
      })
      .then((res) => {
        const { data } = res;
        if (data.success) {
          setAuthToken(data.authToken);
        } else {
          // setError("Could not authenticate user!");
        }
      })
      .catch((_error) => {});
  }, []);

  const meetingConfig = {
    authToken,
    roomName,
    showSetupScreen: true,
  };

  return (
    <>
      {authToken && (
        <DyteMeeting
          onInit={(meeting) => {
            meeting.on(meeting.Events.meetingEnded, () => {
              router.navigate(referrer, true, true);
            });
          }}
          clientId={clientId}
          meetingConfig={meetingConfig}
        />
      )}
    </>
  );
};

export default Meeting;
