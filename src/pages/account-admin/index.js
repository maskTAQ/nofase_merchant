import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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
          <Text style={{ color: "#0399e7", fontSize: 15 }}>{type}</Text>
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
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item, index) => index}
        data={data}
        renderItem={({ item }) => this.renderItem(item)}
      />
    );
  }
  render() {
    const tabMap = [
      ["今日营收", this.props.storeBusInfo.Amont, 0],
      "border",
      ["店铺押金", "--.--", 1]
    ];
    const { StoreMoney = 0 } = this.props.storeInfo;
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
          <Text style={styles.balanceValue}>{StoreMoney}</Text>
          <Text style={styles.balanceLabel}>(余额)</Text>
          <View style={styles.tabContainer}>
            {tabMap.map(tab => {
              if (tab === "border") {
                return <View style={styles.tabItemBorder} key="border" />;
              }
              const [label, money] = tab;
              return (
                <View style={styles.tabItem} key={label}>
                  <Text style={styles.Itemmoney}>{money}</Text>

                  <Text style={{ color: "#0399e7" }}>{label}</Text>
                </View>
              );
            })}
          </View>
          {this.renderList()}
        </View>
      </View>
    );
  }
}
