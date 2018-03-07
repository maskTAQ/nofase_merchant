import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Page, Input, Button } from "src/components";
import { EventHub, Tip } from "src/common";
import styles from "./style";
import api from "src/api";

@connect(state => {
  const { bankInfo, storeInfo } = state;
  return { bankInfo, storeInfo };
})
export default class WithdrawDeposit extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object,
    bankInfo: PropTypes.object,
    storeInfo: PropTypes.object
  };
  state = {
    CardNo: "-",
    BankName: "-",
    LegalName: "-",
    LegTel: "-",
    StoreMoney: "-",
    WAmont: ""
  };
  componentWillMount() {
    EventHub.emit("dispatch", "getBankInfo", "bankInfo");
  }
  componentWillReceiveProps(nextProps) {
    this.updateData(nextProps);
    this.updateBanlance(nextProps);
  }
  updateData(props) {
    const { status, data } = props.bankInfo;

    if (status === "success") {
      this.setState(data);
    }
  }
  updateBanlance(props) {
    const { status, data } = props.storeInfo;

    if (status === "success") {
      this.setState({
        StoreMoney: data.StoreMoney
      });
    }
  }

  withdrawDeposit = () => {
    const { WAmont } = this.state;
    return api
      .applyForWithdrawals(WAmont)
      .then(res => {
        Tip.success("申请提现成功");
      })
      .catch(e => {
        Tip.fail(`申请提现失败:${e}`);
      });
  };

  render() {
    const {
      CardNo,
      BankName,
      LegalName,
      LegTel,
      StoreMoney,
      WAmont
    } = this.state;

    return (
      <Page title="提现">
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>银行卡信息</Text>
            <View style={styles.item}>
              <Text style={[styles.itemLabel, { color: "#3399FF" }]}>
                {BankName}
              </Text>
              <Text style={[styles.itemValue, { color: "#3399FF" }]}>
                {CardNo}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemLabel}>{LegalName}</Text>
              <Text style={styles.itemValue}>{LegTel}</Text>
            </View>
            <Text style={styles.wdTitle}>提现金额</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>￥</Text>
              <Input
                onChangeText={v => {
                  this.setState({
                    WAmont: v
                  });
                }}
                value={WAmont}
                style={styles.input}
              />
            </View>
            <Text style={styles.banlance}>当前余额{StoreMoney}元</Text>
            <View style={styles.contentBottom}>
              <Button
                onPress={this.withdrawDeposit}
                disabled={StoreMoney <= 0}
                style={styles.button}
                textStyle={styles.buttonText}
              >
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
