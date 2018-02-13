import { StackNavigator } from "react-navigation";

import {
  Login,
  BindUser,
  Register,
  TranSaction,
  CurrentUser,
  BusinessStatistics,
  AccountAdmin,
  Detail,
  WithdrawDeposit,
  StoreManage,
  BusinessHours,
  DeviceManage,
  Timetable,
  Home,
  Feedback,
  QRScan,
  QRScanTiming
} from "src/pages";

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
  CurrentUser: {
    screen: CurrentUser
  },
  BusinessStatistics: {
    screen: BusinessStatistics
  },
  AccountAdmin: {
    screen: AccountAdmin
  },
  Detail: {
    screen: Detail
  },
  WithdrawDeposit: {
    screen: WithdrawDeposit
  },
  StoreManage: {
    screen: StoreManage
  },
  BusinessHours: {
    screen: BusinessHours
  },
  DeviceManage: {
    screen: DeviceManage
  },
  Timetable: {
    screen: Timetable
  },
  Home: {
    screen: Home
  },
  Feedback: {
    screen: Feedback
  },
  QRScan: {
    screen: QRScan
  },
  QRScanTiming: {
    screen: QRScanTiming
  }
};

export default StackNavigator(RouteConfigs, {
  headerMode: "none",
  navigationOptions: {
    gesturesEnabled: false
  }
});
