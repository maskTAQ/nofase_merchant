import { StackNavigator } from "react-navigation";

import {
  Login,
  BindUser,
  Register,
  TranSaction,
  CurrentUser,
  BusinessStatistics
} from "src/pages";

import { TimeSlideChoose } from "src/components";
export const RouteConfigs = {
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  },
  BindUser: {
    screen: BindUser
  },
  TranSaction: {
    screen: TranSaction //交易
  },
  CurrentUser:{
    screen:CurrentUser
  },
  BusinessStatistics:{
    screen:BusinessStatistics
  }
};

export default StackNavigator(RouteConfigs, {
  headerMode: "none",
  navigationOptions: {
    gesturesEnabled: false
  }
});
