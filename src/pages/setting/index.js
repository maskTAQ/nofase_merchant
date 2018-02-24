import React, { Component } from "react";
import { View, Image, Text, Switch } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Page, Button } from "src/components";
import styles from "./style";
import action from "src/action";

@connect(state => {
  const { storeInfo } = state;
  return { storeInfo };
})
export default class Setting extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object,
    storeInfo: PropTypes.object
  };
  state = {
    storeInfo: { StoreName: "-", Id: "-", LegalName: "-", Location: "-" }
  };
  componentWillReceiveProps(nextProps) {
    this.updateData(nextProps);
  }
  updateData(props) {
    const { status, data } = props.storeInfo;
    if (status === "success") {
      console.log(data);
      this.setState({
        storeInfo: data
      });
      return;
    }
  }
  renderHeader() {
    const { StoreName, Id, LegalName, Location } = this.state.storeInfo;
    return (
      <View style={styles.header}>
        <Image style={styles.portrait} source={require("./img/u71.png")} />
        <View style={styles.headerRight}>
          <Text style={styles.storeName}>{StoreName}</Text>
          <Text style={styles.storeInfo}>
            ID:{Id} 法人：{LegalName}
          </Text>
          <Text style={styles.storeAddr}>{Location}</Text>
        </View>
      </View>
    );
  }
  renderList() {
    const { LegTel } = this.state.storeInfo;
    const data = [
      { label: "提醒", rightComponent: <Switch /> },
      { type: "border" },
      {
        label: `手机绑定  ${LegTel}`,
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
