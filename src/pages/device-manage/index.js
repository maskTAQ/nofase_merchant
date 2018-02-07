import React, { Component } from "react";
import { View } from "react-native";
//import PropTypes from "prop-types";

import { Page } from "src/components";
import styles from "./style";
export default class DeviceManage extends Component {
  static defaultProps = {};
  static propTypes = {};
  state = {};
  render() {
    return (
      <Page title="设备管理">
        <View style={styles.container} />
      </Page>
    );
  }
}
