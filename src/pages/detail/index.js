import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

import api from "src/api";
import { Button, Page, DataView } from "src/components";
import styles from "./style";

const portraitImg = (
  <Image style={styles.portrait} source={require("./img/logo.png")} />
);
@connect(state => {
  const { incomeInfo, withdrawalsInfo } = state;
  return { incomeInfo, withdrawalsInfo };
})
export default class Detail extends Component {
  static defaultProps = {};
  static propTypes = {
    incomeInfo: PropTypes.object,
    withdrawalsInfo: PropTypes.object
  };
  state = {
    activeIndex: 0
  };
  store = {
    data: [
      [
        {
          portraitSource: require("../current-user/img/u45.png"),
          name: "奋斗的小鸟",
          id: "ID:GYM_Y676556",
          income: 13,
          time: "12-27 14:30"
        },
        {
          portraitSource: require("../current-user/img/u45.png"),
          name: "奋斗的小鸟2",
          id: "ID:GYM_Y676556",
          income: 13,
          time: "12-27 14:30"
        },
        {
          portraitSource: require("../current-user/img/u45.png"),
          name: "奋斗的小鸟3",
          id: "ID:GYM_Y676556",
          income: 13,
          time: "12-27 14:30"
        },
        {
          portraitSource: require("../current-user/img/u45.png"),
          name: "奋斗的小鸟4",
          id: "ID:GYM_Y676556",
          income: 13,
          time: "12-27 14:30"
        },
        {
          portraitSource: require("../current-user/img/u45.png"),
          name: "奋斗的小鸟5",
          id: "ID:GYM_Y676556",
          income: 13,
          time: "12-27 14:30"
        },
        {
          portraitSource: require("../current-user/img/u45.png"),
          name: "奋斗的小鸟6",
          id: "ID:GYM_Y676556",
          income: 13,
          time: "12-27 14:30"
        },
        {
          portraitSource: require("../current-user/img/u45.png"),
          name: "奋斗的小鸟7",
          id: "ID:GYM_Y676556",
          income: 13,
          time: "12-27 14:30"
        },
        {
          portraitSource: require("../current-user/img/u45.png"),
          name: "奋斗的小鸟8",
          id: "ID:GYM_Y676556",
          income: 13,
          time: "12-27 14:30"
        }
      ],
      [
        { time: "12-12 14:30", balance: "156.00", expend: "-45" },
        { time: "12-12 14:30", balance: "112.00", expend: "-45" },
        { time: "12-12 14:30", balance: "15613.00", expend: "-45" },
        { time: "12-12 14:30", balance: "1561.00", expend: "-45" }
      ]
    ]
  };
  getIncomeInfo(PageIndex) {
    return api.getIncomeInfo({ PageIndex, PageNum: 20 });
  }
  getWithdrawalsInfo(PageIndex) {
    return api.getWithdrawalsInfo({ PageIndex, PageNum: 20 }).then(res => {
      console.log(res);
      return res;
    });
  }
  changeTab(i) {
    const { activeIndex } = this.state;
    if (activeIndex !== i) {
      this.setState({
        activeIndex: i
      });
    }
  }
  renderTab() {
    const tab = ["收入", "提现"];
    const { activeIndex } = this.state;
    return (
      <View style={styles.tabContainer}>
        {tab.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <Button
              onPress={() => {
                this.changeTab(i);
              }}
              style={[styles.tabItem, isActive ? styles.tabActiveItem : null]}
              textStyle={[
                styles.tabItemText,
                isActive ? styles.tabActiveItemText : null
              ]}
              key={item}
            >
              {item}
            </Button>
          );
        })}
      </View>
    );
  }
  renderIncomeInfoItem(item) {
    const { NickName, UserId, Amont, EDate, PhotoUrl = "" } = item;
    const timestamp = +/\/Date\(([0-9]+)\)/.exec(EDate)[1];
    return (
      <View style={styles.item}>
        {PhotoUrl.includes("https") ? (
          <Image style={styles.portrait} source={{ uri: PhotoUrl }} />
        ) : (
          portraitImg
        )}
        <View style={styles.itemContent}>
          <View style={styles.itemContentRow}>
            <Text style={styles.itemName}>{NickName}</Text>
          </View>
          <View style={styles.itemContentRow}>
            <Text style={styles.itemId}>{UserId}</Text>
            <Text style={styles.itemIncome}>+{Amont}</Text>
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
    const { BankName, CardNo, WDate, PhotoUrl = "", WAmont } = item;
    const timestamp = +/\/Date\(([0-9]+)\)/.exec(WDate)[1];
    return (
      <View style={styles.item}>
        {PhotoUrl.includes("https") ? (
          <Image style={styles.portrait} source={{ uri: PhotoUrl }} />
        ) : (
          portraitImg
        )}
        <View style={styles.itemContent}>
          <View style={styles.itemContentRow}>
            <Text style={styles.itemName}>{BankName}</Text>
          </View>
          <View style={styles.itemContentRow}>
            <Text style={styles.itemId}>{CardNo}</Text>
            <Text style={styles.itemIncome}>+{WAmont}</Text>
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
  renderList() {
    const { activeIndex } = this.state;
    if (activeIndex === 0) {
      return (
        <DataView
          key="1"
          ref={e => (this.incomeInfoList = e)}
          style={styles.listContainer}
          getData={this.getIncomeInfo}
          ListEmptyComponent={<Text>暂时没有数据哦</Text>}
          ItemSeparatorComponent={() => <View style={styles.itemBorder} />}
          renderItem={({ item }) => this.renderIncomeInfoItem(item)}
        />
      );
    } else {
      return (
        <DataView
          key="2"
          ref={e => (this.withdrawalsInfo = e)}
          style={styles.listContainer}
          getData={this.getWithdrawalsInfo}
          ListEmptyComponent={<Text>暂时没有数据哦</Text>}
          ItemSeparatorComponent={() => <View style={styles.itemBorder} />}
          renderItem={({ item }) => this.renderWithdrawalsInfoItem(item)}
        />
      );
    }
  }
  render() {
    return (
      <Page title="明细">
        <View style={styles.container}>
          {this.renderTab()}
          {this.renderList()}
        </View>
      </Page>
    );
  }
}
