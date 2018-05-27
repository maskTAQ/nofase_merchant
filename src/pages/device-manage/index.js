import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Page, Button, Input, Icon } from "src/components";
import api from "src/api";
import action from "src/action";
import { Tip } from "src/common";
import styles from "./style";

const CheckBox = ({ checked, onChangeChecked }) => (
  <TouchableOpacity
    onPress={() => {
      onChangeChecked(!checked);
    }}
    style={styles.checkbox}
  >
    <Icon
      size={20}
      source={
        checked ? require("./img/dl_xz.png") : require("./img/dl_wxz.png")
      }
    />
  </TouchableOpacity>
);
CheckBox.propTypes = {
  checked: PropTypes.bool,
  onChangeChecked: PropTypes.func
};

@connect(state => {
  const { auth: { StoreId } } = state;
  return { StoreId };
})
export default class DeviceManage extends Component {
  static defaultProps = {};
  static propTypes = {
    StoreId: PropTypes.number,
    navigation: PropTypes.object
  };
  state = {
    data: [
      { label: "淋浴", value: "", key: "Bath", checked: true },
      { label: "储物", value: "", key: "Storage", checked: true },
      {
        label: "有氧器材",
        value: "11",
        key: "IsAerobic",
        valueKey: "Aerobic",
        checked: true
      },
      {
        label: "力量器材",
        value: "12",
        key: "IsPower",
        valueKey: "Power",
        checked: true
      },
      {
        label: "康体设备",
        value: "13",
        key: "IsHealthCare",
        valueKey: "HealthCare",
        checked: true
      }
    ]
  };
  componentWillMount() {
    this.getStoreEquip();
  }
  getStoreEquip() {
    const { StoreId } = this.props;
    api
      .getStoreEquip({ StoreId })
      .then(res => {
        this.loadInitValue(res);
      })
      .catch(e => {
        Tip.fail("初始化设备信息失败");
      });
  }
  loadInitValue(deviceInfo) {
    const nextData = Object.assign([], this.state.data);
    for (const item in deviceInfo) {
      for (let i = 0; i < nextData.length; i++) {
        if (nextData[i].key === item) {
          nextData[i].checked = Boolean(deviceInfo[item]);
        }
        if (nextData[i].valueKey === item) {
          nextData[i].value = String(deviceInfo[item]);
        }
      }
    }
    this.setState({
      data: nextData
    });
  }
  handleValueChange(v, i, key) {
    const nextData = Object.assign([], this.state.data);
    nextData[i][key] = v;
    this.setState({
      data: nextData
    });
  }
  save = () => {
    const { StoreId } = this.props;
    const { data } = this.state;
    const result = { StoreId };
    data.forEach(item => {
      const { key, checked, value, valueKey } = item;
      result[key] = +checked;
      if (valueKey) {
        result[valueKey] = +value || 0;
      }
    });

    api
      .saveStoreEquip(result)
      .then(res => {
        Tip.success("保存设备信息成功");
        setTimeout(() => {
          return this.props.navigation.dispatch(action.navigate.back());
        }, 1500);
      })
      .catch(e => {
        Tip.fail("保存设备失败信息" + e);
        console.log("保存设备失败", e);
      });
  };

  renderItem = (item, i) => {
    const { label, value, checked } = item;
    return (
      <View style={styles.item} key={label}>
        <View style={styles.itemLeft}>
          <Text style={styles.itemLabel}>{label}</Text>
        </View>
        <View style={styles.itemRight}>
          <Input
            value={value}
            onChangeText={v => this.handleValueChange(v, i, "value")}
            style={styles.itemValue}
            clearButtonMode="never"
          />
          <CheckBox
            checked={checked}
            onChangeChecked={v => this.handleValueChange(v, i, "checked")}
          />
        </View>
      </View>
    );
  };
  render() {
    const { data } = this.state;
    return (
      <Page title="设备管理">
        <View style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={(row, i) => i}
            ItemSeparatorComponent={() => <View style={styles.itemBorder} />}
            renderItem={({ item, index }) => this.renderItem(item, index)}
          />
          <Button
            onPress={this.save}
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
