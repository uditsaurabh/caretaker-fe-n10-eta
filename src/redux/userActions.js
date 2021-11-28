import secureAxios from "../services/http";
import {
  SET_PROFILE,
  USER_DETAIL,
  LOAD_INIT,
  LOAD_DONE,
  GET_DOCTOR,
  GET_DISEASE,
  REQ_DISEASE,
  LOAD_PROFILES,
  LOADED_PROFILES,
  SET_TOKEN,
  SET_DASHBOARD,
} from "./userConstants";

export const login = (access_token) => {
  return (dispatch) => {
    secureAxios
      .post("/login", { access_token })
      .then((response) => {
        dispatch(setUser(response.data.data));
      })
      .catch((err) => {
        throw err;
      });
  };
};

export const getDoctor = () => {
  return (dispatch) => {
    dispatch(loadingInit());
    secureAxios
      .get("/get-doctors")
      .then((response) => {
        dispatch(setDoctor(response.data.data));
        dispatch(loadingDone());
      })
      .catch((err) => {
        dispatch(loadingDone());
        throw err;
      });
  };
};

export const getReqDisease = () => {
  return (dispatch) => {
    dispatch(loadingInit());
    secureAxios
      .get("/get-req-disease")
      .then((response) => {
        dispatch(setReqDisease(response.data.data));
        dispatch(loadingDone());
      })
      .catch((err) => {
        dispatch(loadingDone());
        throw err;
      });
  };
};

export const getDisease = () => {
  return (dispatch) => {
    secureAxios
      .get("/get-disease")
      .then((response) => {
        dispatch(setDiseaseList(response.data.data));
      })
      .catch((err) => {
        throw err;
      });
  };
};

export const getUser = (access_token) => {
  return (dispatch) => {
    dispatch(loadingInit());
    secureAxios
      .post("/getUser_details", { access_token })
      .then((response) => {
        dispatch(setUser(response.data));
        dispatch(loadingDone());
      })
      .catch((err) => {
        dispatch(loadingDone());
        throw err;
      });
  };
};

export const getDashboard = (access_token, test) => {
  return (dispatch) => {
    dispatch(profilesLoading());
    secureAxios
      .post("/get_dashboard_data", { access_token, test })
      .then((response) => {
        dispatch(setDashboard(response.data.data));
        dispatch(profilesLoaded());
      })
      .catch((err) => {
        throw err;
      });
  };
};

export const getProfiles = (access_token) => {
  return (dispatch) => {
    dispatch(profilesLoading());
    secureAxios
      .post("/get_profile_list", { access_token })
      .then((response) => {
        dispatch(setProfiles(response.data.data));
        dispatch(profilesLoaded());
      })
      .catch((err) => {
        throw err;
      });
  };
};

export const getToken = (token) => {
  return (dispatch) => {
    dispatch(setToken(token));
  };
};

export const setDashboard = (obj) => {
  return {
    type: SET_DASHBOARD,
    payload: obj,
  };
};

export const setToken = (obj) => {
  return {
    type: SET_TOKEN,
    payload: obj,
  };
};

export const setUser = (obj) => {
  return {
    type: USER_DETAIL,
    payload: obj,
  };
};

export const setDoctor = (obj) => {
  return {
    type: GET_DOCTOR,
    payload: obj,
  };
};

export const profilesLoading = () => {
  return {
    type: LOAD_PROFILES,
  };
};

export const profilesLoaded = () => {
  return {
    type: LOADED_PROFILES,
  };
};

export const setProfiles = (obj) => {
  return {
    type: SET_PROFILE,
    payload: obj,
  };
};

export const setReqDisease = (obj) => {
  return {
    type: REQ_DISEASE,
    payload: obj,
  };
};

export const setDiseaseList = (obj) => {
  return {
    type: GET_DISEASE,
    payload: obj,
  };
};

export const loadingInit = () => {
  return {
    type: LOAD_INIT,
  };
};

export const loadingDone = () => {
  return {
    type: LOAD_DONE,
  };
};
