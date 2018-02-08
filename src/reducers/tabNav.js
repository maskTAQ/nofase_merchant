import { NavigationActions } from "react-navigation";

import TabNavigator from "src/TabNavigation";
import actionMap from "src/action";
const tabNav = (state, action) => {
  const { type } = action;
  switch (type) {
    case actionMap.NAVIGATE_GO: {
      return TabNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: action.payload.routeName,
          params: action.payload.params || {}
        }),
        state
      );
    }
    default:
      return state || {};
  }
};
export default tabNav;
