import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import PropTypes from "prop-types";

import { Page, Button } from "src/components";
import styles from "./style";
import action from "src/action";

export default class Transacion extends Component {
  static propTypes = {
    navigation: PropTypes.object
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
      ["今日消费", "25.5", 0],
      "border",
      ["当前押金", "60.00", 1]
    ];
    return (
      <View style={styles.container}>
        <View style={styles.bgContainer}>
          <Image source={require("./img/u3.png")} style={styles.bjimgs} />
        </View>
        <Page
          title="交易管理"
          // LeftComponent={
          //   <Button onPress={this.back}>
          //     <Icon size={20} source={require("./img/u326.png")} />
          //   </Button>
          // }
          LeftComponent={null}
          headerStyle={{ backgroundColor: "#fff" }}
          titleStyle={{ color: "#1ba0ea" }}
        >
          <Text style={styles.balanceValue}>123</Text>
          <Text style={styles.balanceLabel}>(余额)</Text>
          <View style={styles.containers}>
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
        </Page>
      </View>
    );
  }
}
