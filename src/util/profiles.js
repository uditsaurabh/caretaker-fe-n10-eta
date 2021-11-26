import secureAxios from "../services/http";

export const getProfileData = (token) => {
  return secureAxios
    .post("get_profile_list", { access_token: token })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
