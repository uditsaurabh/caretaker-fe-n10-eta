import secureAxios from "../services/http";
import { DELETE_PROFILE, SET_PROFILE } from "./userConstants";

export const deleteProfile = (access_token, profile_id) => {
  return (dispatch) => {
    secureAxios
      .post("/delete_profile", { access_token, profile_id })
      .then((response) => {
        // dispatch(deleteProfiles(response.data));
        dispatch(setProfiles(response.data.data));
      })
      .catch((err) => {
        throw err;
      });
  };
};

export const getProfiles = (access_token) => {
  return (dispatch) => {
    secureAxios
      .post("/get_profile_list", { access_token })
      .then((response) => {
        dispatch(setProfiles(response.data.data));
      })
      .catch((err) => {
        throw err;
      });
  };
};

export const deleteProfiles = (obj) => {
  return {
    type: DELETE_PROFILE,
    payload: obj,
  };
};

export const setProfiles = (obj) => {
  return {
    type: SET_PROFILE,
    payload: obj,
  };
};
