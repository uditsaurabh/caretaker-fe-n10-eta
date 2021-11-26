import { DELETE_PROFILE, SET_PROFILE } from "./userConstants";
import produce from "immer";

const initialState = {
  userProfiles: [],
};

const userReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case DELETE_PROFILE:
        draft.userProfiles = action.payload;
        return;
      case SET_PROFILE:
        draft.userProfiles = action.payload;
        return;
      default:
        return;
    }
  });
};

export default userReducer;
