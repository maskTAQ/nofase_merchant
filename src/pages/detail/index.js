import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import PropTypes from "prop-types";
import moment from "moment";

import { computeSize } from "src/common";
import api from "src/api";
import { Page, DataView, Icon } from "src/components";
import styles from "./style";

const portraitImg = (
  <Image style={styles.portrait} source={require("./img/logo.png")} />
);
console.log("ScrollableTabView", ScrollableTabView);
export default class Detail extends Component {
  static defaultProps = {};
  static propTypes = {
    incomeInfo: PropTypes.object,
    withdrawalsInfo: PropTypes.object,
    storeInfo: PropTypes.object
  };
  state = {
    activeIndex: 0
  };
  getIncomeInfo(PageIndex) {
    return api.getIncomeInfo({ PageIndex, PageNum: 20 }).then(res => {
      const result = res.sort((prev, next) => {
        const getTimestamp = s => /\/Date\(([0-9]+)\)/.exec(s)[1];
        return getTimestamp(prev.EDate) - getTimestamp(next.EDate);
      });
      return result;
    });
  }
  getWithdrawalsInfo(PageIndex) {
    return api.getWithdrawalsInfo({ PageIndex, PageNum: 20 }).then(res => {
      const result = res.sort((prev, next) => {
        const getTimestamp = s => /\/Date\(([0-9]+)\)/.exec(s)[1];
        return getTimestamp(next.WDate) - getTimestamp(prev.WDate);
      });
      return result;
    });
  }
  renderIncomeInfoItem(item) {
    const { NickName, UserCode, SaleAmont, EDate, UserPhoto } = item;
    const timestamp = +/\/Date\(([0-9]+)\)/.exec(EDate)[1];
    return (
      <View style={styles.item}>
        <View style={styles.portraitWrapper}>
          {UserPhoto ? (
            <Icon size={computeSize(56)} source={{ uri: UserPhoto }} />
          ) : (
            portraitImg
          )}
        </View>
        <View style={styles.itemContent}>
          <View style={styles.itemContentRow}>
            <Text style={styles.itemName}>用户昵称:{NickName}</Text>
          </View>
          <View style={styles.itemContentRow}>
            <Text style={styles.itemId}>ID:{UserCode}</Text>
            <Text style={styles.itemIncome}>+{SaleAmont}</Text>
          </View>
          <View style={styles.itemContentRow}>
            <Text style={styles.itemTime}>
              {moment(timestamp).format("YYYY/MM/DD HH:ss")}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  renderWithdrawalsInfoItem(item) {
    const { BankName, CardNo, Flag, WDate, StoreMoney, WAmont } = item;
    const timestamp = +/\/Date\(([0-9]+)\)/.exec(WDate)[1];
    const map = ["关闭", "处理中", "已提现", "提现失败"];
    return (
      <View style={styles.withdrawItem}>
        <View style={styles.itemGroup}>
          <Text style={[styles.itemText, styles.incomeTitle]}>
            {BankName} {CardNo}
          </Text>
        </View>
        <View
          style={[
            styles.itemGroup,
            { flexDirection: "row", justifyContent: "space-between" }
          ]}
        >
          <Text style={styles.itemText}>当前余额:{StoreMoney}元</Text>
          <Text style={[styles.itemText, { color: "#008000" }]}>
            -{WAmont}元
          </Text>
        </View>
        <View style={styles.itemGroup}>
          <Text style={styles.itemText}>
            时间:{moment(timestamp).format("YYYY/MM/DD HH:ss")}
          </Text>
          <Text
            style={[
              styles.itemText,
              {
                color: Flag === 2 ? "#008000" : "#fc6722",
                marginLeft: computeSize(6)
              }
            ]}
          >
            {map[Flag]}
          </Text>
        </View>
      </View>
    );
  }
  render() {
    const tabProps = {
      tabBarUnderlineStyle: {
        height: computeSize(2),
        backgroundColor: "#1a99e2"
      },
      tabBarBackgroundColor: "#fff",
      tabBarActiveTextColor: "#1a99e2"
    };
    return (
      <Page title="明细">
        <View style={styles.container}>
          <ScrollableTabView {...tabProps} style={styles.tab}>
            <DataView
              tabLabel="收入"
              style={styles.listContainer}
              getData={this.getIncomeInfo}
              ListEmptyComponent={<Text>暂时没有数据哦</Text>}
              ItemSeparatorComponent={() => <View style={styles.itemBorder} />}
              renderItem={({ item }) => this.renderIncomeInfoItem(item)}
            />
            <DataView
              tabLabel="提现"
              style={styles.listContainer}
              getData={this.getWithdrawalsInfo}
              ListEmptyComponent={<Text>暂时没有数据哦</Text>}
              ItemSeparatorComponent={() => <View style={styles.itemBorder} />}
              renderItem={({ item }) => this.renderWithdrawalsInfoItem(item)}
            />
          </ScrollableTabView>
        </View>
      </Page>
    );
  }
}
