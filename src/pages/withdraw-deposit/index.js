import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Page, Input, Button } from "src/components";
import { EventHub } from "src/common";
import styles from "./style";

@connect(state => {
  const { bankInfo } = state;
  return { bankInfo };
})
export default class WithdrawDeposit extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object,
    bankInfo: PropTypes.object
  };
  state = {};
  componentWillMount() {
    EventHub.emit("dispatch", "getBankInfo", "bankInfo");
  }
  componentWillReceiveProps(nextProps) {
    this.updateData(nextProps);
  }
  updateData(props) {
    const { status, data } = props.bankInfo;
    if (status === "success" && this.props.bankInfo.status !== "success") {
      // this.setState({
      //   storeBusInfoByDate: { ...eval("(" + data + ")") }
      // });
      console.log(data);
      return;
    }
  }
  render() {
    return (
      <Page title="提现">
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>银行卡信息</Text>
            <View style={styles.item}>
              <Text style={[styles.itemLabel, { color: "#3399FF" }]}>
                工商银行
              </Text>
              <Text style={[styles.itemValue, { color: "#3399FF" }]}>
                1525623*****6292
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemLabel}>王东旭</Text>
              <Text style={styles.itemValue}>1525623*****6292</Text>
            </View>
            <Text style={styles.wdTitle}>提现金额</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>￥</Text>
              <Input style={styles.input} />
            </View>
            <Text style={styles.banlance}>当前余额523.2元</Text>
            <View style={styles.contentBottom}>
              <Button style={styles.button} textStyle={styles.buttonText}>
                提现
              </Button>
              <Text style={styles.explain}>今日提现0次 每天仅支持1次提现</Text>
            </View>
          </View>
          <View style={styles.nav}>
            <Button textStyle={styles.navItemText}>每日1提</Button>
            <View style={styles.navBorder} />
            <Button textStyle={styles.navItemText}>常见问题</Button>
          </View>
        </View>
      </Page>
    );
  }
}
