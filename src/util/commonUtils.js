import secureAxios from "services/http";

export const commonUtil = (url, payload) => {
  return secureAxios
    .post(url, payload)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
