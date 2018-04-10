import React, { Component } from "react";
import { View, Text, Image, ScrollView, BackHandler } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import { Page, Button, Icon } from "src/components";
import api from "src/api";
import { Tip } from "src/common";
import action from "src/action";
import styles from "./style"; //Charge

@connect(state => {
  const { storeInfo: { Charge } } = state;
  return { Charge };
})
export default class QRScanTiming extends Component {
  static defaultProps = {
    startTime: "08:27",
    endTime: "10:21",
    OrderType: 0 //0 未开始 1开始 2结束
  };
  static propTypes = {
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    OrderType: PropTypes.number,
    navigation: PropTypes.object,
    Charge: PropTypes.number
  };
  state = {
    //计时
    tickts: "",
    OrderType: ""
  };
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBack);
    this.propsToState();
  }
  componentWillReceiveProps(nextProps) {
    this.propsToState(nextProps);
  }
  componentWillUnmount() {
    BackHandler.addEventListener("removeEventListener", this.handleBack);
    clearInterval(this.ticktTimer);
  }
  handleBack = () => {
    const { onReturnPage } = this.props.navigation.state.params;
    onReturnPage();
    return false;
  };
  propsToState(props) {
    const nextProps = props || this.props;
    const { params } = nextProps.navigation.state;
    const { OrderType } = params;
    const {
      OrderType: prevOrderType,
      STimeStamp,
      TimeStamp
    } = this.props.navigation.state.params;
    if (OrderType !== prevOrderType || !props) {
      if (OrderType === 1) {
        this.tickts(false, TimeStamp);
      } else {
        this.tickts(true, STimeStamp);
      }
      console.log(params);
      this.setState({
        ...params
      });
    }
  }
  ticktTimer = NaN;
  tickts = (isEnd, STimeStamp) => {
    const pad = s => {
      if (String(s).length === 1) {
        return "0" + s;
      } else {
        return s;
      }
    };
    const m = () => {
      const t = Date.now() / 1000 - STimeStamp;
      const d = Math.floor(t / (24 * 3600));
      const h = Math.floor((t - 24 * 3600 * d) / 3600);
      const m = Math.floor((t - 24 * 3600 * d - h * 3600) / 60);
      const s = Math.floor(t - 24 * 3600 * d - h * 3600 - m * 60);
      this.setState({
        tickts: pad(h) + ":" + pad(m) + ":" + pad(s)
      });
    };
    if (isEnd) {
      clearInterval(this.ticktTimer);
      m();
    } else {
      clearInterval(this.ticktTimer);
      m();
      this.ticktTimer = setInterval(() => {
        m();
      }, 1000);
    }
  };
  stopOrder = () => {
    const { OrderId } = this.state;
    api
      .completeOrder({ OrderId })
      .then(res => {
        Tip.success("结束订单成功");
        setTimeout(() => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "Home" })
          );
        }, 1500);
      })
      .catch(e => {
        console.log(e);
      });
  };
  renderHeader() {
    const { OrderType, STimeStamp, TimeStamp, ETimeStamp } = this.state;
    const SDate = moment((TimeStamp || STimeStamp) * 1000).format("HH:mm"),
      EDate = moment(ETimeStamp * 1000).format("HH:mm");
    const { tickts } = this.state;
    const noTimeStr = "--/--";
    const data = [[noTimeStr, noTimeStr], [SDate, noTimeStr], [SDate, EDate]];

    return (
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <View style={styles.headerItemWrapper}>
            <View style={styles.headerItem}>
              <Text style={styles.headerItemLabel}>开始时间</Text>
              <Text style={styles.headerItemValue}>{data[OrderType][0]}</Text>
            </View>
          </View>
          <Icon size={30} source={require("./img/u17.png")} />
          <View style={styles.headerItemWrapper}>
            <View style={styles.headerItem}>
              <Text style={styles.headerItemLabel}>结束时间</Text>
              <Text style={styles.headerItemValue}>{data[OrderType][1]}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.timeCount}>使用时长:{tickts}</Text>
        <View style={styles.itemBorder}>
          <Image
            source={require("./img/u14_line.png")}
            style={styles.itemBorderIcon}
          />
        </View>
      </View>
    );
  }
  renderCommon(data) {
    return (
      <View style={styles.tWrapper}>
        <View style={styles.t}>
          <View style={styles.tItem}>
            <Text style={styles.tItemLabel}>{data[0][0]}</Text>
            <View style={styles.tItemValueWrapper}>
              <Text style={styles.tItemValue}>{data[0][1]}</Text>
            </View>
          </View>
          <View style={[styles.tItem, { alignItems: "flex-end" }]}>
            <Text style={styles.tItemLabel}>{data[1][0]}</Text>
            <View style={styles.tItemValueWrapper}>
              <Text style={styles.tItemValue}>{data[1][1]}</Text>
            </View>
          </View>
        </View>
        <View style={styles.itemBorder}>
          <Image
            source={require("./img/u14_line.png")}
            style={styles.itemBorderIcon}
          />
        </View>
      </View>
    );
  }
  renderContent() {
    const { OrderType, Money, SaleAmont } = this.state;
    const { Charge } = this.props;
    switch (String(OrderType)) {
      case "1":
        return (
          <View style={styles.content}>
            <ScrollView>
              {this.renderHeader()}
              {this.renderCommon([
                ["Per hour", "每一小时"],
                ["Cost", `￥:${Charge}元`]
              ])}
              <Button
                onPress={this.stopOrder}
                style={styles.end}
                textStyle={styles.endText}
              >
                结束
              </Button>
            </ScrollView>
          </View>
        );
      default:
        return (
          <View style={styles.content}>
            <ScrollView>
              {this.renderHeader()}
              {this.renderCommon([
                ["Per hour", "每一小时"],
                ["Cost", `￥:${Charge}元`]
              ])}
              {this.renderCommon([
                ["Charge", "收费"],
                ["Price", `￥:${Money}元`]
              ])}
              {this.renderCommon([
                ["Discount", "优惠"],
                ["Price", `￥:${SaleAmont}元`]
              ])}
              <View style={styles.starScore}>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.starScoreExpend}>
                    支出:{Money - SaleAmont}元
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        );
    }
  }
  render() {
    const { NickName, UserId, Photo } = this.state;
    return (
      <Page
        title="扫码计时"
        onPress={() => {
          const { onReturnPage } = this.props.navigation.state.params;
          onReturnPage();
        }}
      >
        <View style={styles.container}>
          <View style={styles.userInfoContainer}>
            <View style={styles.portraitWrapper}>
              <Icon
                size={80}
                source={Photo ? { uri: Photo } : require("./img/u196.png")}
              />
            </View>
            <View style={styles.userInfoContent}>
              <Text style={styles.username}>{NickName}</Text>
              <Text style={styles.userId}>ID:{UserId}</Text>
            </View>
          </View>
          {this.renderContent()}
          <View style={styles.chunk} />
        </View>
      </Page>
    );
  }
}
