import { AsyncStorage } from "react-native";
import { combineReducers } from "redux";

import actionMap from "src/action";
import tabNav from "./tabNav";
import nav from "./nav";

const appReducer = combineReducers({
  auth: (state = {}, action) => {
    const { type, payload } = action;
    if (type === actionMap.LOGIN) {
      return { ...state, isLogin: true, ...payload };
    }
    if (type === actionMap.LOGOUT) {
      AsyncStorage.removeItem("mobile");
      return { ...state, isLogin: false, ...payload };
    }
    return state;
  },
  nav,
  tabNav,
  storeInfo(state = {}, action) {
    const { type, payload } = action;
    if (type === "storeInfo") {
      return { ...state, ...payload };
    }
    return state;
  },
  storeBusInfo(state = {}, action) {
    const { type, payload } = action;
    if (type === "storeBusInfo") {
      return { ...state, ...payload };
    }
    return state;
  },
  storeUserList(state = [], action) {
    const { type, payload } = action;
    if (type === "storeUserList") {
      return payload || state;
    }
    return state;
  },
  storeBusInfoByDate(state = {}, action) {
    const { type, payload } = action;
    if (type === "storeBusInfoByDate") {
      return { ...state, ...payload };
    }
    return state;
  },
  storeUserListByDate(state = [], action) {
    const { type, payload } = action;
    if (type === "storeUserListByDate") {
      return payload || state;
    }
    return state;
  }
});
export default appReducer;
