import React, { Component } from "react";
import { View, Image, Text, Switch } from "react-native";
import PropTypes from "prop-types";

import { Page, Button } from "src/components";
import styles from "./style";
import action from "src/action";
export default class Setting extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object
  };
  state = {};
  renderHeader() {
    return (
      <View style={styles.header}>
        <Image style={styles.portrait} source={require("./img/u71.png")} />
        <View style={styles.headerRight}>
          <Text style={styles.storeName}>优思健身工作室（前海店）</Text>
          <Text style={styles.storeInfo}>ID:SBFAS151 法人：王晓东</Text>
          <Text style={styles.storeAddr}>
            深南大道与前海教会处振业星海商业广场3101A
          </Text>
        </View>
      </View>
    );
  }
  renderList() {
    const data = [
      { label: "提醒", rightComponent: <Switch /> },
      { type: "border" },
      {
        label: "手机绑定  150****1526",
        rightComponent: <Button textStyle={styles.itemValue}>更改</Button>
      },
      { type: "border" },
      {
        label: "客服反馈",
        rightComponent: null,
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "Feedback" })
          );
        }
      }
    ];
    return (
      <View style={styles.list}>
        {data.map((item, i) => {
          const { label, rightComponent, onPress, type } = item;
          if (type === "border") {
            return <View style={styles.itemBorder} key={type + i} />;
          }
          if (onPress) {
            return (
              <Button onPress={onPress} style={styles.item} key={label}>
                <Text style={styles.itemLabel}>{label}</Text>
                {rightComponent}
              </Button>
            );
          }
          return (
            <View style={styles.item} key={label}>
              <Text style={styles.itemLabel}>{label}</Text>
              {rightComponent}
            </View>
          );
        })}
      </View>
    );
  }
  render() {
    return (
      <Page title="设置" LeftComponent={<View />}>
        <View style={styles.container}>
          <View>
            {this.renderHeader()}
            {this.renderList()}
          </View>
          <Button style={styles.logout} textStyle={styles.logoutText}>
            退出
          </Button>
        </View>
      </Page>
    );
  }
}
