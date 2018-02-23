import AppNavigator from "src/Navigation";
import TabNavigator from "src/TabNavigation";

const initialNav = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams("Home")
);
const initialTabNav = TabNavigator.router.getStateForAction(
  TabNavigator.router.getActionForPathAndParams("CurrentUser")
);
export default {
  nav: initialNav,
  tabNav: initialTabNav,
  auth: {
    isLogin: false,
    username: "",
    mobile: ""
  },
  storeBusInfo: {
    status: "init",
    data: null
  },
  storeUserList: {
    status: "init",
    data: null
  }
};
