import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { computeSize } from "src/common";
import { Button } from "src/components";
import styles from "./style";

import action from "src/action";

@connect(state => {
  const { storeInfo, storeBusInfo } = state;
  return { storeInfo, storeBusInfo };
})
export default class AccountAdmin extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    storeInfo: PropTypes.object,
    storeBusInfo: PropTypes.object
  };
  state = {};
  back = () => {
    this.props.navigation.dispatch(action.navigate.back());
  };
  renderItem(row) {
    const { type, onPress } = row;
    return (
      <Button onPress={onPress}>
        <View style={styles.item}>
          <Text style={{ color: "#0399e7", fontSize: computeSize(15) }}>
            {type}
          </Text>
        </View>
      </Button>
    );
  }
  renderList() {
    const data = [
      {
        type: "营收明细",
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "Detail" })
          );
        }
      },
      {
        type: "提现  (免手续费，次日到账)",
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "WithdrawDeposit" })
          );
        }
      }
    ];
    return (
      <FlatList
        style={styles.list}
        keyExtractor={(item, index) => index}
        data={data}
        renderItem={({ item }) => this.renderItem(item)}
      />
    );
  }
  render() {
    const { StoreMoney = 0 } = this.props.storeInfo;
    const { Amont } = this.props.storeBusInfo;
    return (
      <View style={styles.container}>
        <View style={styles.bgContainer}>
          <Image
            source={require("./img/u3.png")}
            style={styles.bgImg}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.content}>
          <View style={styles.title}>
            <Text style={styles.titleText}>账户管理</Text>
          </View>
          <View style={styles.balanceValueWrapper}>
            <Text style={styles.balanceValue}>{StoreMoney.toFixed(2)}</Text>
          </View>
          <View style={styles.balanceLabelWrapper}>
            <Text style={styles.balanceLabel}>(余额)</Text>
          </View>
          <View style={styles.incomeWrapper}>
            <View style={styles.incomeBox}>
              <Text style={styles.incomeLabel}>今日营收</Text>
              <Text style={styles.incomeValue}>{Amont}</Text>
            </View>
          </View>
          {this.renderList()}
        </View>
      </View>
    );
  }
}
