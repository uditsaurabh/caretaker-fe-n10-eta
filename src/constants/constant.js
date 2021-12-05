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
  { name: "RBC count", value: "rbc" },
  { name: "WBC count", value: "wbc" },
  { name: "Haemoglobin", value: "hm" },
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
