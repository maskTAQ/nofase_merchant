import { TabNavigator } from "react-navigation";

import { Tabbar } from "src/components";
import { CurrentUser, AccountAdmin, StoreManage } from "src/pages";
import Setting from "src/pages/setting";
export default TabNavigator(
  {
    CurrentUser: {
      screen: CurrentUser
    },
    StoreManage: {
      screen: StoreManage
    },
    AccountAdmin: {
      screen: AccountAdmin
    },
    Setting: {
      screen: Setting
    }
  },
  {
    tabBarComponent: Tabbar
  }
);
