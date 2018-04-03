import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import api from "src/api";
import { Header, Button, Icon, Input } from "src/components";
import { Tip } from "src/common";
import action from "src/action";
import styles from "./style";

@connect(state => {
  const { storeBusInfo, storeUserList } = state;
  return { storeBusInfo, storeUserList };
})
export default class CurrentUser extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object,
    storeBusInfo: PropTypes.object,
    storeUserList: PropTypes.array,
    dispatch: PropTypes.func
  };
  state = {
    searchValue: "",
    refreshing: false,
    //是否是正序
    isPositiveSequence: true
  };
  componentWillMount() {
    // this.getStoreBusInfo();
    // this.getStoreUserList();
    this.onRefresh();
  }
  getStoreBusInfo(isLoading) {
    return this.props
      .dispatch({
        type: "storeBusInfo",
        api: () => {
          return api.getStoreBusInfo(isLoading);
        },
        promise: true
      })
      .catch(e => {
        Tip.loading("getStoreBusInfo:error");
        console.log("getStoreBusInfo:error", e);
      });
  }
  getStoreUserList(isLoading) {
    return this.props
      .dispatch({
        type: "storeUserList",
        api: () => {
          return api.getStoreUserList(isLoading);
        },
        promise: true
      })
      .catch(e => {
        Tip.loading("getStoreUserList:error");
        console.log("getStoreUserList:error", e);
      });
  }
  go(routeName) {
    this.props.navigation.dispatch(action.navigate.go({ routeName }));
  }
  onRefresh = () => {
    this.setState({ refreshing: true });
    Promise.all(this.getStoreBusInfo(false), this.getStoreUserList(false)).then(
      res => {
        this.setState({ refreshing: false });
      }
    );
  };
  renderHeader() {
    const {
      InPeople = 0,
      TimeLongs = 0,
      AveAmont = 0,
      nowInPeople = 0,
      Amont
    } = this.props.storeBusInfo;
    const data = [
      { label: "到店用户", value: `${InPeople}/人` },
      { label: "消费时长", value: `${TimeLongs}/h` },
      { label: "平均消费", value: `${AveAmont}/元` },
      { label: "当前在线", value: `${nowInPeople}/人` }
    ];
    return (
      <View style={styles.header}>
        <View style={styles.headerBG}>
          <Image
            style={{ flex: 1, width: "100%" }}
            source={require("./img/u2.png")}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.headerContent}>
          <Header
            title=""
            LeftComponent={<View />}
            style={{ height: 40, backgroundColor: "transparent" }}
          />
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerTime}>
                {moment().format("YYYY/MM/DD")}
              </Text>
              <Text style={styles.turnoverLabel}>今日营业额：</Text>
            </View>
            <View style={styles.calendarWrapper}>
              <Button onPress={() => this.go("BusinessStatistics")}>
                <Icon size={30} source={require("./img/u85.png")} />
              </Button>
            </View>
          </View>
          <Text style={styles.turnoverValue}>￥{Amont}</Text>
          <View style={styles.headerList}>
            {data.map((item, i) => {
              const { label, value } = item;
              return (
                <View
                  style={[
                    styles.headerListItem,
                    i === 0 ? { alignItems: "flex-start" } : null
                  ]}
                  key={label}
                >
                  <Text style={styles.headerListItemLabel}>{label}</Text>
                  <Text style={styles.headerListItemValue}>{value}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  }
  renderChoose() {
    const { searchValue } = this.state;
    return (
      <View style={styles.choose}>
        <View style={styles.chooseContent}>
          <Button
            onPress={() => {
              this.setState({
                isPositiveSequence: !this.state.isPositiveSequence
              });
            }}
            style={styles.chooseLabelWrapper}
          >
            <Text style={styles.chooseLabel}>时长</Text>
            <Icon size={14} source={require("./img/u41.png")} />
          </Button>
          <View style={styles.chooseBorder} />
          <View style={styles.chooseInputContainer}>
            <View style={styles.chooseInputContent}>
              <Input
                value={searchValue}
                onChangeText={v => this.setState({ searchValue: v })}
                style={styles.chooseInput}
                placeholder="名称/ID搜索在线用户"
              />
              <View style={styles.chooseInputBorder} />
              <Button>
                <Icon
                  size={20}
                  source={require("./img/u36.png")}
                  style={styles.chooseInputIcon}
                />
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
  renderItem(item) {
    const { NickName, UserId, SDate, TimeLong } = item;
    const portraitSource = require("./img/u45.png");
    const getTimestamp = s => /\/Date\(([0-9]+)\)/.exec(s)[1];
    const date = new Date(+getTimestamp(SDate));
    return (
      <View style={styles.item}>
        <Image style={styles.portrait} source={portraitSource} />
        <View style={styles.itemContent}>
          <View style={styles.itemContentTop}>
            <View style={styles.itemContentTopLeft}>
              <View style={styles.itemTitle}>
                <Text style={styles.itemName}>{NickName}</Text>
                <View style={styles.warn}>
                  <Text style={styles.warnText}>余额不足</Text>
                </View>
              </View>
              <Text style={styles.itemId}>ID:{UserId}</Text>
            </View>
            <Button style={styles.stopButton} textStyle={styles.stopButtonText}>
              停止
            </Button>
          </View>
          <View style={styles.itemDetail}>
            <Text style={styles.itemStartTime}>
              开始时间:{moment(date).format("YYYY/MM/DD HH:mm")}
            </Text>
            <Text style={styles.itemDuration}>
              <Text style={styles.itemStartTime}>使用时长</Text>:{TimeLong || 0}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  getTimestamp(s) {
    return +/\/Date\(([0-9]+)\)/.exec(s)[1];
  }
  renderList() {
    const { storeUserList = [] } = this.props;
    const { searchValue, refreshing, isPositiveSequence } = this.state;
    const data = storeUserList
      .filter(item => {
        if (!searchValue) {
          return true;
        }
        const { NickName, UserId } = item;

        return (
          NickName.includes(searchValue) || String(UserId).includes(searchValue)
        );
      })
      .sort((prev, next) => {
        if (isPositiveSequence) {
          return this.getTimestamp(prev.SDate) - this.getTimestamp(next.SDate);
        } else {
          return this.getTimestamp(next.SDate) - this.getTimestamp(prev.SDate);
        }
      });
    return (
      <FlatList
        data={data}
        onRefresh={this.onRefresh}
        refreshing={refreshing}
        renderItem={({ item }) => this.renderItem(item)}
        keyExtractor={(item, i) => item.UserId + i}
        style={styles.listContainer}
      />
    );
  }
  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderChoose()}
        {this.renderList()}
      </View>
    );
  }
}
