import React, { useEffect } from "react";
import { DyteMeeting } from "dyte-client";
import createroom from "services/createRoom";

const DoctorDashboard = () => {
  useEffect(() => {
    createroom
      .post("/meeting", {
        title: "Consultation",
        presetName: "careTracker",
      })
      .then((res) => console.log(res));
  }, []);

  return (
    <>
      {/* <DyteMeeting
        onInit={(meeting) => {
          meeting.on(meeting.Events.meetingEnded, () => {
            router.navigate(referrer, true, true);
          });
        }}
        clientId={clientId}
        meetingConfig={meetingConfig}
      /> */}
      <div>
        <h1>I'am Dashboard</h1>
      </div>
    </>
  );
};

export default DoctorDashboard;
