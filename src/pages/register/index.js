import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";

import styles from "../login/style";
import { Input, Button, CodeButton } from "src/components";
import api from "src/api";
import { Tip } from "src/common";
import action from "src/action";

export default class Register extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };
  state = {
    username: "user",
    phone: "",
    code: ""
  };
  handleValueChange(type, value) {
    this.setState({
      [type]: value
    });
  }
  register = () => {
    const { username, phone, code } = this.state;
    if (!this.codeRef.isGetCode) {
      return Tip.fail("请先获取验证码");
    }
    return api
      .register({ NickName: username, Tel: phone, ExCode: code })
      .then(res => {
        this.props.navigation.dispatch(
          action.navigate.go({ routeName: "Login" })
        );
      })
      .catch(e => {
        console.log(e);
      });
  };
  render() {
    const { username, code, phone } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            source={require("src/images/login/logo.png")}
            style={styles.logoImg}
          />
          <Text style={styles.logoLabel}>GYM</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.formItem}>
            <Image
              source={require("src/images/login/username.png")}
              style={styles.formItemImg}
            />
            <Input
              value={username}
              onChangeText={v => {
                this.handleValueChange("username", v);
              }}
              style={styles.formItemInput}
              placeholder="用户名"
              placeholderTextColor="#fff"
            />
          </View>
          <View style={styles.formItem}>
            <Image
              source={require("src/images/login/phone.png")}
              style={styles.formItemImg}
            />
            <Input
              value={phone}
              onChangeText={v => {
                this.handleValueChange("phone", v);
              }}
              style={styles.formItemInput}
              placeholder="手机号"
              placeholderTextColor="#fff"
            />
          </View>
          <View style={styles.formItem}>
            <Image
              source={require("src/images/login/code.png")}
              style={styles.formItemImg}
            />
            <Input
              value={code}
              onChangeText={v => {
                this.handleValueChange("code", v);
              }}
              style={styles.formItemInput}
              placeholder="验证码"
              placeholderTextColor="#fff"
            />
            <CodeButton ref={e => (this.codeRef = e)} phone={phone}>
              验证码
            </CodeButton>
          </View>
          <Button
            onPress={this.register}
            style={styles.loginButton}
            textStyle={styles.loginText}
            disabled={!username || !phone || !code}
          >
            完成注册
          </Button>
        </View>
      </View>
    );
  }
}
