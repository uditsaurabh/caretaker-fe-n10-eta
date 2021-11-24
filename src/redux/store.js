import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducer from "./token";
import userReducer from "./userReducer";

const store = createStore(
  combineReducers({ reducer, userReducer }),
  composeWithDevTools(applyMiddleware(logger, thunk))
);
export default store;
