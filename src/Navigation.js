import { StackNavigator } from "react-navigation";

import {
  Login,
  BindUser,
  Register,
  TranSaction,
  CurrentUser
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
  }
};

export default StackNavigator(RouteConfigs, {
  headerMode: "none",
  navigationOptions: {
    gesturesEnabled: false
  }
});
