import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import logger from "redux-logger";
import thunk from "redux-thunk";
import userReducer from "./userReducer";

const store = createStore(
  combineReducers({ userReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
