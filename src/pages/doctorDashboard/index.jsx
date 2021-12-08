import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DyteMeeting } from "dyte-client";
import { getUser } from "redux/userActions";
import secureAxios from "services/http";
import createroom from "services/createRoom";
import OrangeButton from "common/button";
import CommonCard from "common/card";
import "./index.scss";

const DoctorDashboard = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.userReducer);
  const { phone_number, user_name, _id } = user?.data || "";
  const [meetingId, setMeetingId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [authToken, setAuthToken] = useState("");
  console.log(meetingId, roomName, _id);

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
        .catch((error) => {
          throw error;
        });
    }
  };

  const sendDetails = (meetId, room) => {
    const payload = {
      access_token: token,
      doctor_id: _id,
      meetingId: meetId,
      roomName: room,
    };
    secureAxios
      .post("/doctor_meeting_details", payload)
      .then((res) => {
        // console.log(res);
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    dispatch(getUser(token));
    createroom
      .post("/meeting", {
        title: "Consultation",
        presetName: "careTracker",
      })
      .then((res) => {
        const { id, roomName } = res?.data?.data?.meeting;
        setMeetingId(id);
        setRoomName(roomName);
        sendDetails(id, roomName);
      });
  }, []); //eslint-disable-line

  return (
    <div className="meeting-room">
      <CommonCard>
        {authToken && phone_number && (
          <DyteMeeting
            onInit={() => {}}
            clientId={phone_number}
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
