import { TabNavigator } from "react-navigation";

import { Tabbar } from "src/components";
import { CurrentUser, AccountAdmin, StoreManage, Setting } from "src/pages";

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
