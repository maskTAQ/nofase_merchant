import React, { Component } from "react";
import { View, Text, Image, AsyncStorage, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styles from "./style";
import { Input, Button, CodeButton, Icon } from "src/components";
import action from "src/action";
import api from "src/api";
//import { Tip } from "src/common";
const logoSource = require("src/images/login/logo.png");
@connect()
export default class Login extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };
  state = {
    phone: "",
    code: ""
  };
  componentWillMount() {
    // AsyncStorage.getItem("mobile", (e, m) => {
    //   if (!e && m) {
    //     this.setState({
    //       phone: m
    //     });
    //   }
    // });
  }
  handleValueChange(type, value) {
    this.setState({
      [type]: value
    });
  }
  login = () => {
    const { phone, code } = this.state;
    // if (!this.codeRef.isGetCode) {
    //   return Tip.fail("请先获取验证码");
    // }

    return api
      .login({ Tel: phone, ExCode: code })
      .then(res => {
        AsyncStorage.setItem("mobile", phone);
        this.props.navigation.dispatch(action.login(res));
        this.props.navigation.dispatch(
          action.navigate.go({ routeName: "Home" })
        );
      })
      .catch(e => {
        console.log(e);
      });
  };
  register = () => {
    this.props.navigation.dispatch(
      action.navigate.go({ routeName: "Register" })
    );
  };
  render() {
    const { phone, code } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle="light-content"
        />
        <View style={styles.logo}>
          <View style={styles.logoWrapper}>
            <Icon source={logoSource} size={90} />
          </View>
          <Text style={styles.logoLabel}>没脸运动</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.formItem}>
            <Image
              source={require("src/images/login/username.png")}
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
              source={require("src/images/login/password.png")}
              style={styles.formItemImg}
            />
            <Input
              value={code}
              onChangeText={v => {
                this.handleValueChange("code", v);
              }}
              style={styles.formItemInput}
              placeholder="密码"
              placeholderTextColor="#fff"
            />
            <CodeButton
              ref={e => (this.codeRef = e)}
              phone={phone}
              loading={false}
            >
              验证码
            </CodeButton>
          </View>
          <Button
            disabled={!phone || !code}
            onPress={this.login}
            style={styles.loginButton}
            textStyle={styles.loginText}
          >
            登录
          </Button>
        </View>
      </View>
    );
  }
}
