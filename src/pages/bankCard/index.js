import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import styles from "./style";
import { Page, Input, Button, Picker } from "src/components";
//import { Tip } from "src/common";

@connect()
export default class BankCard extends Component {
  state = {
    name: "",
    ip: "",
    weeks: [
      { label: "周一", value: "1" },
      { label: "周二", value: "2" },
      { label: "周三", value: "3" },
      { label: "周四", value: "4" },
      { label: "周五", value: "5" },
      { label: "周六", value: "6" },
      { label: "周日", value: "0" }
    ],
    isPickerVisible: false
  };
  render() {
    const { name, weeks, isPickerVisible } = this.state;
    return (
      <Page title="银行卡认证信息">
        <View style={styles.container}>
          <View style={styles.from}>
            <View style={styles.formItem}>
              <Text style={styles.laberText}>法人姓名</Text>
              <Input
                value={name}
                style={styles.formItemInput}
                placeholder="请输入姓名"
                placeholderTextColor="#999999"
              />
            </View>
            <View style={styles.formItem}>
              <Text style={styles.laberText}>法人身份证</Text>
              <Input
                value={name}
                style={styles.formItemInput}
                placeholder="请输入身份证"
                placeholderTextColor="#999999"
              />
            </View>
            <View style={styles.formItem}>
              <Text style={styles.laberText}>所有行</Text>
              <Button
                onPress={() => {
                  this.setState({
                    isPickerVisible: true
                  });
                }}
                style={styles.formItemInput}
              />
              <Picker
                data={weeks}
                visible={isPickerVisible}
                onRequestClose={() => {
                  this.setState({
                    isPickerVisible: false
                  });
                }}
                onValueSelect={item => {
                  const { selectedWeekType } = this.store;
                  const { label, value } = item;
                  this.setState({
                    isPickerVisible: false,
                    [selectedWeekType]: label,
                    [`${selectedWeekType}Value`]: value
                  });
                }}
              />
            </View>
            <View style={styles.formItem}>
              <Text style={styles.laberText}>卡号</Text>
              <Input
                value={name}
                style={styles.formItemInput}
                placeholder="请输入卡号"
                placeholderTextColor="#999999"
              />
            </View>
            <View style={styles.formItem}>
              <Text style={styles.laberText}>绑定法人手机号码</Text>
              <Input
                value={name}
                style={styles.formItemInput}
                placeholder="请输入卡号"
                placeholderTextColor="#999999"
              />
            </View>
          </View>
          <Button style={styles.save} textStyle={styles.saveText}>
            保存
          </Button>
        </View>
      </Page>
    );
  }
}
