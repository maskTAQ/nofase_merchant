import { combineReducers } from "redux";

import actionMap from "src/action";
import tabNav from "./tabNav";
import nav from "./nav";
import { CreateReduxField } from "src/common";
function auth(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case actionMap.LOGIN:
      return { ...state, isLogin: true, data: payload };
    case "Logout":
      return { ...state, isLogin: false };
    default:
      return state;
  }
}

const appReducer = combineReducers({
  auth,
  nav,
  tabNav,
  ...CreateReduxField().reducers()
});
export default appReducer;
