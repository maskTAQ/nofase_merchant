import React from "react";
import PropTypes from "prop-types";
import { View, StatusBar, Alert } from "react-native";
import { connect } from "react-redux";
import TabNavigation from "src/TabNavigation";
import { addNavigationHelpers } from "react-navigation";

import { WebSocket } from "src/common";
import action from "src/action";
console.disableYellowBox = true;
@connect(state => {
  const { tabNav, auth: { StoreId } } = state;
  return { tabNav, StoreId };
})
class Home extends React.Component {
  static propTypes = {
    tabNav: PropTypes.object,
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    StoreId: PropTypes.number
  };
  state = {};
  componentWillMount() {
    WebSocket.uniqueLoginWebsocket(this.props.StoreId, () => {
      Alert.alert("提示", "账号在其他地方登陆", [
        {
          text: "退出",
          onPress: () => {
            this.props.navigation.dispatch(
              action.navigate.go({ routeName: "Login" })
            );
          }
        }
      ]);
    }).catch(e => {});
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={"transparent"}
          translucent={true}
          hidden={false}
          barStyle="light-content"
        />
        <TabNavigation
          navigation={{
            ...addNavigationHelpers({
              dispatch: this.props.dispatch,
              state: this.props.tabNav
            })
          }}
        />
      </View>
    );
  }
}

Home.propTypes = {
  tabNavigate: PropTypes.object,
  dispatch: PropTypes.func
};

export default Home;
