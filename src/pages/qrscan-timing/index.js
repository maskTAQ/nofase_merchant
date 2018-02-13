import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";

import { Page, Button, Icon } from "src/components";
import styles from "./style";
export default class QRScanTiming extends Component {
  static defaultProps = {
    startTime: "08:27",
    endTime: "10:21",
    step: 2 //0 未开始 1开始 2结束
  };
  static propTypes = {
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    step: PropTypes.number
  };
  state = {
    currentScore: 1
  };
  renderHeader() {
    const { step, startTime, endTime } = this.props;
    const noTimeStr = "--/--";
    const data = [
      [noTimeStr, noTimeStr],
      [startTime, noTimeStr],
      [startTime, endTime]
    ];

    return (
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <View style={styles.headerItemWrapper}>
            <View style={styles.headerItem}>
              <Text style={styles.headerItemLabel}>开始时间</Text>
              <Text style={styles.headerItemValue}>{data[step][0]}</Text>
            </View>
          </View>
          <Icon size={30} source={require("./img/u17.png")} />
          <View style={styles.headerItemWrapper}>
            <View style={styles.headerItem}>
              <Text style={styles.headerItemLabel}>结束时间</Text>
              <Text style={styles.headerItemValue}>{data[step][0]}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.timeCount}>使用时长:01:51</Text>
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
    const { step } = this.props;
    switch (String(step)) {
      case "0":
        return (
          <View style={styles.content}>
            {this.renderHeader()}
            {this.renderCommon([
              ["Per hour", "每一小时"],
              ["Cost", "￥:10.00元"]
            ])}
            <View style={styles.QR}>
              <Image source={require("./img/u12.png")} style={styles.QRImg} />
            </View>
          </View>
        );
      default:
        return (
          <View style={styles.content}>
            {this.renderHeader()}
            {this.renderCommon([
              ["Per hour", "每一小时"],
              ["Cost", "￥:10.00元"]
            ])}
            {this.renderCommon([["Charge", "收费"], ["Price", "￥:20.00元"]])}
            {this.renderCommon([["Discount", "优惠"], ["Price", "￥:8.00元"]])}
            <View style={styles.starScore}>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.starScoreExpend}>支出:12.00元</Text>
              </View>
            </View>
          </View>
        );
    }
  }
  render() {
    return (
      <Page
        title="扫码计时"
        RightComponent={
          <Button textStyle={{ color: "#fff", fontWeight: "bold" }}>
            记录
          </Button>
        }
      >
        <View style={styles.container}>
          <View style={styles.userInfoContainer}>
            <View style={styles.portraitWrapper}>
              <View style={styles.portrait} />
            </View>
            <View style={styles.userInfoContent}>
              <Text style={styles.username}>奋斗的小鸟</Text>
              <Text style={styles.userId}>ID:GYM_Y676556</Text>
            </View>
          </View>
          {this.renderContent()}
          <View style={styles.chunk} />
        </View>
      </Page>
    );
  }
}
