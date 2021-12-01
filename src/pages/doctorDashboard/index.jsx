import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DyteMeeting } from "dyte-client";
import createroom from "services/createRoom";
import OrangeButton from "common/button";
import CommonCard from "common/card";
import "./index.scss";

const DoctorDashboard = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { phone_number, user_name } = user?.data || "";
  const [meetingId, setMeetingId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    createroom
      .post("/meeting", {
        title: "Consultation",
        presetName: "careTracker",
      })
      .then((res) => {
        const { id, roomName } = res?.data?.data?.meeting;
        setMeetingId(id);
        setRoomName(roomName);
      });
  }, []); //eslint-disable-line

  const joinCall = () => {
    if (meetingId) {
      createroom
        .post(`/meetings/${meetingId}/participant`, {
          userDetails: {
            name: user_name,
          },
          clientSpecificId: phone_number,
          roleName: "host",
        })
        .then((res) => {
          const { data } = res;
          if (data.success) {
            const { authToken } = data.data.authResponse;
            setAuthToken(authToken);
          }
        })
        .catch((_error) => {});
    }
  };

  return (
    <div className="meeting-room">
      <CommonCard>
        {authToken && phone_number && (
          <DyteMeeting
            onInit={() => {}}
            clientId="12345"
            meetingConfig={{
              authToken,
              roomName,
            }}
          />
        )}
        <div className="call-button">
          <OrangeButton
            text="Start online consultation"
            type="orange-button"
            click={joinCall}
          />
        </div>
      </CommonCard>
    </div>
  );
};

export default DoctorDashboard;
