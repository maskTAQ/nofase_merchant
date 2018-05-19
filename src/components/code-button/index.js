import React, { Component } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import PropTypes from "prop-types";

import { Button } from "src/components";
import { Tip as T } from "src/common";
import api from "src/api";

const Tip = {
  fail(type, s) {
    if (type === "default") {
      T.fail(s);
    } else {
      Alert.alert("提示", s, [{ text: "确定", onPress: () => {} }]);
    }
  }
};
const styles = {
  codeButton: {
    width: 85,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  codeButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1a98e0"
  },
  loading: {
    width: 85
  }
};
export default class CodeButton extends Component {
  static propTypes = {
    phone: PropTypes.string,
    loading: PropTypes.bool,
    type: PropTypes.string,
    time: PropTypes.number
  };
  static defaultProps = {
    type: "default" //在Modal下Tip显示不出来 被Modal盖住了
  };
  state = {
    isRequestSmscode: false,
    isCan: true,
    prevTimetInterval: 61
  };

  componentWillUnmount() {
    //清除定时器
    clearInterval(this.intervalId);
  }
  1 = false;
  timer = () => {
    const { time } = this.props;
    let count = time || 60;
    this.intervalId = null;
    return () => {
      return new Promise((resolve, reject) => {
        this.setState({
          isCan: false,
          prevTimetInterval: count
        });
        this.intervalId = setInterval(() => {
          if (count === 0) {
            clearInterval(this.intervalId);
            resolve("can get");
          }
          this.setState({
            isCan: false,
            prevTimetInterval: --count
          });
        }, 1000);
      });
    };
  };
  reset = () => {
    clearInterval(this.intervalId);
    this.isGetCode = false;
    this.setState({
      isCan: true,
      prevTimetInterval: 61
    });
  };
  getCode = () => {
    const { isCan } = this.state;
    const { phone, loading, type } = this.props;
    if (isCan && /^1[3|4|5|8|7][0-9]\d{4,8}$/.test(phone)) {
      this.setState({ isRequestSmscode: true });
      api
        .sendCode(phone, loading)
        .then(response => {
          this.setState({ isRequestSmscode: false });
          const timer = this.timer();
          timer().then(() => {
            this.setState({
              isCan: true,
              prevTimetInterval: 61
            });
          });
          if (type === "default") {
            T.success("验证码发送成功，请注意查收");
          }

          this.isGetCode = true;
        })
        .catch(e => {
          this.setState({ isRequestSmscode: false });
          Tip.fail(type, `验证码发送失败:${e}`);
        });
    } else {
      if (!/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone)) {
        Tip.fail(type, "请输入正确的手机号");
      } else if (!phone) {
        Tip.fail(type, "请输入手机号");
      }
    }
  };
  render() {
    const { isCan, prevTimetInterval, isRequestSmscode } = this.state;
    if (isRequestSmscode) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      );
    }

    return (
      <Button
        style={styles.codeButton}
        textStyle={styles.codeButtonText}
        onPress={this.getCode}
      >
        {isCan ? "获取验证码" : prevTimetInterval + "s"}
      </Button>
    );
  }
}
