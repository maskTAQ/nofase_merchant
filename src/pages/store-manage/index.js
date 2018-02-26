import React, { Component } from "react";
import { View, FlatList, Text, ScrollView, Linking } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Page, Button, Icon } from "src/components";
import action from "src/action";
import styles from "./style";

@connect(state => {
  const { storeInfo } = state;
  return { storeInfo };
})
export default class StoreManage extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object,
    storeInfo: PropTypes.object
  };
  state = {
    storeInfo: {
      StoreName: "-",
      Location: "-",
      PeopleNum: "-",
      Charge: "-",
      BusinessTimes: "-",
      BusinessWeeks: "",
      CsTel: "-"
    }
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

  renderItem(item, isReadonly) {
    const icon = require("./img/u57.png");
    const { label, value, onPress } = item;
    return (
      <Button onPress={onPress} style={styles.item}>
        <View style={styles.itemLabel}>
          <Text style={styles.itemLabelText}>{label}</Text>
          {isReadonly ? (
            <Icon size={20} source={icon} style={styles.itemIcon} />
          ) : null}
        </View>
        <Text style={styles.itemValue}>{value}</Text>
      </Button>
    );
  }
  renderTop() {
    const { StoreName, Location, PeopleNum, Charge } = this.state.storeInfo;
    const readonlyData = [
      { label: "店名", value: StoreName },
      { label: "位置", value: Location },
      { label: "容纳人数", value: `${PeopleNum}人` },
      { label: "收费标准", value: `${Charge}/小时` }
    ];
    return (
      <View style={styles.list}>
        <FlatList
          data={readonlyData}
          keyExtractor={item => item.label}
          ItemSeparatorComponent={() => <View style={styles.itemBorder} />}
          renderItem={({ item }) => this.renderItem(item, true)}
        />
      </View>
    );
  }
  renderBottom() {
    const { BusinessTimes, BusinessWeeks, CsTel } = this.state.storeInfo;
    const weeks = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    const editable = [
      { label: "店铺图库", value: "", onPress: () => {} },
      {
        label: "营业时间",
        value: BusinessWeeks
          ? `${weeks[BusinessWeeks[0]]}至${
              weeks[BusinessWeeks[BusinessWeeks.length - 1]]
            } ${BusinessTimes}`
          : "-",
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "BusinessHours" })
          );
        }
      },
      {
        label: "设备管理",
        value: "",
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "DeviceManage" })
          );
        }
      },
      {
        label: "课程表",
        value: "",
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "Timetable" })
          );
        }
      },
      {
        label: "客服电话",
        value: CsTel,
        onPress: () => {
          return Linking.openURL(`tel:${CsTel}`)
            .then(supported => {
              console.log(supported);
            })
            .catch(err => {
              console.error("An error occurred", err);
            });
        }
      },
      { label: "商家介绍/留言", value: "", onPress: () => {} }
    ];
    return (
      <View style={[styles.list, { marginTop: 10 }]}>
        <FlatList
          data={editable}
          keyExtractor={item => item.label}
          ItemSeparatorComponent={() => <View style={styles.itemBorder} />}
          renderItem={({ item }) => this.renderItem(item, false)}
        />
      </View>
    );
  }
  render() {
    return (
      <Page title="店铺管理" LeftComponent={<View />}>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.content}>
              {this.renderTop()}
              {this.renderBottom()}
            </View>
            <View style={styles.nav}>
              <Button textStyle={styles.navItemText}>某某健身</Button>
              <View style={styles.navBorder} />
              <Button textStyle={styles.navItemText}>常见问题</Button>
            </View>
          </ScrollView>
        </View>
      </Page>
    );
  }
}
