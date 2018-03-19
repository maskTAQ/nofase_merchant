import { combineReducers } from "redux";

import actionMap from "src/action";
import tabNav from "./tabNav";
import nav from "./nav";
import { CreateReduxField } from "src/common";

const appReducer = combineReducers({
  auth: (state = {}, action) => {
    const { type, payload } = action;
    if (type === actionMap.LOGIN) {
      return { ...state, isLogin: true, ...payload };
    }
    return state;
  },
  nav,
  tabNav,
  ...CreateReduxField().reducers()
});
export default appReducer;
