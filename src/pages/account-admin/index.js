import React, { Component } from "react";
import { View } from "react-native";
//import PropTypes from "prop-types";

import { Page } from "src/components";
import styles from "./style";
export default class AccountAdmin extends Component {
  static defaultProps = {};
  static propTypes = {};
  state = {};
  render() {
    return (
      <Page title="交易管理">
        <View style={styles.contianer} />
      </Page>
    );
  }
}
