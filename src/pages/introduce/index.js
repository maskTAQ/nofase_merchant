import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
//import PropTypes from "prop-types";

import { Page } from "src/components";
import styles from "./style";
export default class Introduce extends Component {
  static defaultProps = {};
  static propTypes = {};
  state = {
    value: ""
  };
  onChangeText = v => {
    this.setState({
      value: v
    });
  };
  render() {
    const { value } = this.state;
    return (
      <Page
        title="编辑介绍/留言"
        RightComponent={<Button style={styles.save}>保存</Button>}
      >
        <View style={styles.container}>
          <TextInput
            value={value}
            onChangeText={this.onChangeText}
            autoFocus={true}
            maxLength={500}
            multilin={true}
            placeholder="请输入介绍/留言"
          />
        </View>
        <View style={styles.length}>{value.length}/500</View>
      </Page>
    );
  }
}
