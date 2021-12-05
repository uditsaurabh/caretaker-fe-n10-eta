import {
  SET_PROFILE,
  USER_DETAIL,
  LOAD_INIT,
  LOAD_DONE,
  GET_DOCTOR,
  GET_DISEASE,
  REQ_DISEASE,
  LOADED_PROFILES,
  LOAD_PROFILES,
  SET_TOKEN,
  SET_DASHBOARD,
} from "./userConstants";
import produce from "immer";

const initialState = {
  token: localStorage.getItem("user"),
  loading: false,
  user: {},
  userProfiles: [],
  doctor: [],
  disease: [],
  reqDisease: [],
  dashboard: {},
};

const userReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_PROFILE:
        draft.userProfiles = action.payload;
        return;
      case USER_DETAIL:
        draft.user = action.payload;
        return;
      case LOAD_INIT:
        draft.loading = true;
        return;
      case LOAD_DONE:
        draft.loading = false;
        return;
      case GET_DOCTOR:
        draft.doctor = action.payload;
        return;
      case GET_DISEASE:
        draft.disease = action.payload;
        return;
      case REQ_DISEASE:
        draft.reqDisease = action.payload;
        return;
      case LOAD_PROFILES:
        draft.loading = true;
        return;
      case LOADED_PROFILES:
        draft.loading = false;
        return;
      case SET_TOKEN:
        draft.token = action.payload;
        return;
      case SET_DASHBOARD:
        draft.dashboard = action.payload;
        break;
      default:
        return;
    }
  });
};

export default userReducer;
