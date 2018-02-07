import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
//import PropTypes from "prop-types";

import { Page, Button } from "src/components";
import styles from "./style";
export default class DeviceManage extends Component {
  static defaultProps = {};
  static propTypes = {};
  state = {};
  renderItem(item) {
    const { label, value } = item;
    return (
      <View style={styles.item} key={label}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemLabel}>{label}</Text>
        </View>
        <View style={styles.itemRight}>
          <Text style={styles.itemValue}>{value}</Text>
        </View>
      </View>
    );
  }
  render() {
    const data = [
      { label: "淋浴", value: "" },
      { label: "储物", value: "" },
      { label: "有氧器材", value: "11" },
      { label: "力量器材", value: "12" },
      { label: "康体设备", value: "13" }
    ];
    return (
      <Page title="设备管理">
        <View style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={(row, i) => i}
            ItemSeparatorComponent={() => <View style={styles.itemBorder} />}
            renderItem={({ item }) => this.renderItem(item)}
          />
          <Button
            onPress={this.saveRow}
            style={styles.saveButton}
            textStyle={styles.saveButtonText}
          >
            保存
          </Button>
        </View>
      </Page>
    );
  }
}
