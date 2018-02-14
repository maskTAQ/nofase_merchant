import React, { Component } from "react";
import { View, FlatList, Text, ScrollView, Linking } from "react-native";
import PropTypes from "prop-types";

import { Page, Button, Icon } from "src/components";
import action from "src/action";
import styles from "./style";
export default class StoreManage extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object
  };
  store = {
    readonlyData: [
      { label: "店名", value: "优势健身工作室" },
      { label: "位置", value: "深圳市龙岗区南湾街道龙岗大厦255" },
      { label: "容纳人数", value: "45人" },
      { label: "收费标准", value: "15/小时" }
    ],
    editable: [
      { label: "店铺图库", value: "", onPress: () => {} },
      {
        label: "营业时间",
        value: "周一至周日 09:00022:30",
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
        value: "10477-5666666",
        onPress: () => {
          return Linking.openURL("tel:104775666666")
            .then(supported => {
              console.log(supported);
            })
            .catch(err => {
              console.error("An error occurred", err);
            });
        }
      },
      { label: "商家介绍/留言", value: "", onPress: () => {} }
    ]
  };
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
    const { readonlyData } = this.store;
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
    const { editable } = this.store;
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
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.content}>
              {this.renderTop()}
              {this.renderBottom()}
            </View>
            <View style={styles.nav}>
              <Button textStyle={styles.navItemText}>某某健身</Button>
              <View style={styles.navBorder} />
              <Button textStyle={styles.navItemText}>常见问题</Button>
            </View>
          </View>
        </ScrollView>
      </Page>
    );
  }
}
