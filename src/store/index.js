import AppNavigator from "src/Navigation";
import TabNavigator from "src/TabNavigation";

const initialNav = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams("Feedback")
);
const initialTabNav = TabNavigator.router.getStateForAction(
  TabNavigator.router.getActionForPathAndParams("Setting")
);
export default {
  nav: initialNav,
  tabNav: initialTabNav,
  auth: {
    isLogin: false,
    username: "",
    mobile: ""
  }
};
