import { message } from "antd";

export const toTitleCase = (s) => {
  return s?.charAt(0)?.toUpperCase() + s?.substr(1)?.toLowerCase();
};

export const bloodGroup = [
  { value: "A+", label: "A+" },
  { value: "B+", label: "B+" },
  { value: "AB+", label: "AB+" },
  { value: "A-", label: "A-" },
  { value: "B-", label: "B-" },
  { value: "AB-", label: "AB-" },
];

export const gender = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export const defaultImage =
  "https://cvbay.com/wp-content/uploads/2017/03/dummy-image.jpg";

export const test = [
  { name: "RBC count", value: "rbc", normalValue: "4.5 - 5.5 millions/cumm" },
  { name: "WBC count", value: "wbc", normalValue: "4000 - 10000 cells/cumm" },
  { name: "Haemoglobin", value: "hm", normalValue: "13.0 - 17.0 g/dL" },
];

export const showMessage = (type) => {
  message.success({
    content: type,
    duration: 3,
    className: "custom-class",
    style: {
      display: "flex",
      position: "fixed",
      left: "45%",
      top: "5vh",
      padding: "4px 8px",
      borderRadius: "4px",
      gap: "5px",
    },
  });
};

export const warnMessage = (type) => {
  message.warning({
    content: type,
    duration: 3,
    className: "custom-class",
    style: {
      display: "flex",
      position: "fixed",
      left: "45%",
      top: "5vh",
      padding: "4px 8px",
      borderRadius: "4px",
      gap: "5px",
    },
  });
};

export const demoCredentials = [
  { title: "Login as", number: "Mobile", code: "OTP", id: 0 },
  { title: "User", number: "9999999999", code: "111111", id: 1 },
  { title: "Doctor", number: "8888888888", code: "222222", id: 2 },
  { title: "Admin", number: "7777777777", code: "333333", id: 3 },
];
