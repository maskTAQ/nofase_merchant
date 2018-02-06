import React, { Component } from "react";
import { FlatList, View, Text, Image } from "react-native";
//import PropTypes from "prop-types";

import { Button } from "src/components";
import styles from "./style";
import Page from "../../components/page/index";
export default class Detail extends Component {
  static defaultProps = {};
  static propTypes = {};
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
  renderItem(item) {
    const { activeIndex } = this.state;
    if (activeIndex === 0) {
      const { portraitSource, name, id, income, time } = item;
      return (
        <View style={styles.item}>
          <Image style={styles.portrait} source={portraitSource} />
          <View style={styles.itemContent}>
            <View style={styles.itemContentRow}>
              <Text style={styles.itemName}>{name}</Text>
            </View>
            <View style={styles.itemContentRow}>
              <Text style={styles.itemId}>{id}</Text>
              <Text style={styles.itemIncome}>+{income}</Text>
            </View>
            <View style={styles.itemContentRow}>
              <Text style={styles.itemTime}>{time}</Text>
            </View>
          </View>
        </View>
      );
    }
    const { time, expend, balance } = item;
    return (
      <View style={styles.item}>
        <View style={styles.itemContent}>
          <View style={styles.itemContentRow}>
            <Text style={styles.itemText}>时间:{time}</Text>
          </View>
          <View style={styles.itemContentRow}>
            <Text style={styles.itemText}>余额剩余:{balance}</Text>
            <Text style={styles.itemExpend}>{expend}</Text>
          </View>
        </View>
      </View>
    );
  }
  renderList() {
    const { activeIndex } = this.state;
    const { data } = this.store;

    return (
      <FlatList
        data={data[activeIndex]}
        renderItem={({ item }) => this.renderItem(item)}
        keyExtractor={item => JSON.stringify(item)}
        ItemSeparatorComponent={() => <View style={styles.itemBorder} />}
        style={styles.listContainer}
      />
    );
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
