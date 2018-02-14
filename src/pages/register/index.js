import React, { Component } from "react";
import { View, Text, Image } from "react-native";

import styles from "../login/style";
import { Input, Button, CodeButton } from "src/components";
import api from "src/api";
export default class Register extends Component {
  state = {
    username: "user",
    phone: "13696526122",
    code: "123456"
  };
  handleValueChange(type, value) {
    this.setState({
      [type]: value
    });
  }
  register = () => {
    const { username, phone, code } = this.state;
    api
      .register({ NickName: username, Tel: phone, ExCode: code })
      .then(res => {
        console.log(res);
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
            <CodeButton phone={phone}>验证码</CodeButton>
          </View>
          <Button
            onPress={this.register}
            style={styles.loginButton}
            textStyle={styles.loginText}
          >
            完成注册
          </Button>
        </View>
      </View>
    );
  }
}
