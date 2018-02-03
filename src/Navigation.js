import { StackNavigator } from "react-navigation";

import {
  Login,
  BindUser,
  Register,
  TranSaction,
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
  Recharge: {
    screen: Recharge //充值
  },
  TranSaction: {
    screen: TranSaction //交易
  },
};

export default StackNavigator(RouteConfigs, {
  headerMode: "none",
  navigationOptions: {
    gesturesEnabled: false
  }
});
