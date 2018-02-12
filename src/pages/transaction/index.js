import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import PropTypes from "prop-types";

import { Page, Button, Icon } from "src/components";
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
  renderItem(row, i) {
    const { type, onPress } = row;
    return (
      <Button onPress={onPress}>
        <View style={styles.item}>
          <Text style={styles.itemText}>
            {type}
            {i === 1 ? (
              <Text style={{ fontSize: 12 }}>(免手续费，次日到账)</Text>
            ) : null}
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
        type: "提现",
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
        renderItem={({ item, index }) => this.renderItem(item, index)}
      />
    );
  }
  render() {
    const tabMap = [
      ["今日营收", "25.5", 0],
      "border",
      ["当前押金", "60.00", 1]
    ];
    return (
      <View style={styles.container}>
        <View style={styles.bgContainer}>
          <Image
            resizeMode="stretch"
            source={require("./img/u3.png")}
            style={styles.bjimgs}
          />
        </View>
        <Page
          title="交易管理"
          LeftComponent={
            <Button onPress={this.back}>
              <Icon size={20} source={require("./img/u326.png")} />
            </Button>
          }
          headerStyle={{ backgroundColor: "#fff" }}
          barStyle="dark-content"
          titleStyle={{ color: "#1ba0ea" }}
        >
          <View style={styles.content}>
            <View style={styles.balanceWrapper}>
              <Text style={styles.balanceValue}>123</Text>
              <Text style={styles.balanceLabel}>(余额)</Text>
            </View>
            <View style={styles.tabContainer}>
              {tabMap.map(tab => {
                if (tab === "border") {
                  return <View style={styles.tabItemBorder} key="border" />;
                }
                const [label, money] = tab;
                return (
                  <View style={styles.tabItem} key={label}>
                    <Text style={styles.itemmoneyValue}>{money}</Text>

                    <Text style={styles.itemmoneyLabel}>{label}</Text>
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
