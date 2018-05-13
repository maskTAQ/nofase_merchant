import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import AppReducer from "src/reducers";
import AppNavigator from "src/Navigation";
import TabNavigator from "src/TabNavigation";

const initialNav = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams("Home")
);
const initialTabNav = TabNavigator.router.getStateForAction(
  TabNavigator.router.getActionForPathAndParams("CurrentUser")
);
const asyncDispetch = store => next => action => {
  const { type, api, promise } = action;
  if (promise) {
    next({ type, status: "loading" });
    return api()
      .then(res => {
        store.dispatch({ type, status: "success", payload: res });
        return Promise.resolve(res);
      })
      .catch(e => {
        store.dispatch({ type, status: "error", errData: e });
        return Promise.resolve(e);
      });
  }
  return next(action);
};
const initStore = {
  nav: initialNav,
  tabNav: initialTabNav,
  auth: {
    isLogin: false,
    username: "",
    mobile: ""
  },
  storeInfo: {},
  storeBusInfo: {},
  storeUserList: [],
  storeBusInfoByDate: {},
  storeUserListByDate: []
};
export default createStore(
  AppReducer,
  initStore,
  applyMiddleware(thunk, asyncDispetch)
);
