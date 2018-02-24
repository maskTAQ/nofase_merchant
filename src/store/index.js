import AppNavigator from "src/Navigation";
import TabNavigator from "src/TabNavigation";
import { CreateReduxField } from "src/common";

const initialNav = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams("StoreManage")
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
  ...CreateReduxField().store()
};
