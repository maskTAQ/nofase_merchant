import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import styles from "./style";
import { Button } from "src/components";

export default class Tabbar extends Component {
  static defaultProps = {};
  static propTypes = {
    navigationState: PropTypes.object
  };
  state = {};
  store = {
    routeInfo: {
      CurrentUser: {
        label: "当前用户"
      },
      StoreManage: {
        label: "商家管理"
      },
      AccountAdmin: {
        label: "账户管理"
      },
      Setting: {
        label: "设置"
      }
    }
  };
  render() {
    const { routes } = this.props.navigationState;
    const verifyRoutes = Object.assign([], routes);
    verifyRoutes.splice(2, 0, "scanQR");
    const { routeInfo } = this.store;
    return (
      <View style={styles.tabBarWrapper}>
        <View style={styles.tabBar}>
          {verifyRoutes.map(item => {
            if (item === "scanQR") {
              return (
                <View style={styles.tabBarScanQRWrapper} key={item}>
                  <Button style={styles.tabBarScanQR} />
                </View>
              );
            }
            const { routeName } = item;
            return (
              <Button style={styles.tabBarItem} key={routeName}>
                <Text style={styles.tabBarItemLabel}>
                  {routeInfo[routeName].label}
                </Text>
              </Button>
            );
          })}
        </View>
      </View>
    );
  }
}
