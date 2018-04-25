import React from "react";
import PropTypes from "prop-types";
import { View, StatusBar, Text } from "react-native";
import { connect } from "react-redux";
import TabNavigation from "src/TabNavigation";
import { addNavigationHelpers } from "react-navigation";

import { WebSocket } from "src/common";
import { Alert, Icon, Button } from "src/components";
import action from "src/action";

const LogoutModal = ({ logout, isVisible }) => {
  const styles = {
    container: {
      padding: 6,
      borderWidth: 1,
      borderColor: "#1a98e0",
      borderRadius: 6,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.4)"
    },
    detail: {
      lineHeight: 30,
      color: "#000"
    },
    button: {
      width: "100%",
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 6,
      backgroundColor: "#1a98e0"
    }
  };
  return (
    <Alert isVisible={isVisible}>
      <View style={styles.container}>
        <Icon size={30} source={require("./img/error.png")} />
        <Text style={styles.detail}>此账号在别处登录!</Text>
        <Button
          onPress={logout}
          style={styles.button}
          textStyle={{ color: "#fff" }}
        >
          退出登录
        </Button>
      </View>
    </Alert>
  );
};
LogoutModal.propTypes = {
  logout: PropTypes.func,
  isVisible: PropTypes.bool
};
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
  state = {
    logoutModalVisible: false
  };
  componentWillMount() {
    WebSocket.uniqueLoginWebsocket(this.props.StoreId, () => {
      this.setState({
        logoutModalVisible: true
      });
    }).catch(e => {});
  }
  logout = () => {
    this.setState(
      {
        logoutModalVisible: false
      },
      () => {
        this.props.dispatch(action.logout());
        this.props.navigation.dispatch(
          action.navigate.go({ routeName: "Login" })
        );
      }
    );
  };
  render() {
    const { logoutModalVisible } = this.state;
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
        <LogoutModal logout={this.logout} isVisible={logoutModalVisible} />
      </View>
    );
  }
}

Home.propTypes = {
  tabNavigate: PropTypes.object,
  dispatch: PropTypes.func
};

export default Home;
