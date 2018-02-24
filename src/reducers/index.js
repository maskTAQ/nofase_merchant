import { combineReducers } from "redux";

import tabNav from "./tabNav";
import nav from "./nav";
import { CreateReduxField } from "src/common";
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

const appReducer = combineReducers({
  auth,
  nav,
  tabNav,
  ...CreateReduxField().reducers()
});
export default appReducer;
