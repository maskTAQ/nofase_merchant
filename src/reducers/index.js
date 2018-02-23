import { combineReducers } from "redux";

import actionMap from "src/action";
import tabNav from "./tabNav";
import nav from "./nav";

function auth(state = {}, action) {
  const { type } = action;
  switch (type) {
    case "Login":
      return { ...state, isLogin: true };
    case "Logout":
      return { ...state, isLogin: false };
    default:
      return state;
  }
}
function storeBusInfo(state = {}, action) {
  const { type, payload } = action;
  if (type === actionMap.GETSTOREBUSINFO) {
    return { ...state, ...payload };
  }
  return state;
}
function storeUserList(state = {}, action) {
  const { type, payload } = action;
  if (type === actionMap.GETSTOREUSERLIST) {
    return { ...state, ...payload };
  }
  return state;
}
const appReducer = combineReducers({
  auth,
  nav,
  tabNav,
  storeBusInfo,
  storeUserList
});
export default appReducer;
