import React, { Component } from "react";
import { View, Image, Text, Switch, AsyncStorage } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Page, Button, Alert, Icon, Input } from "src/components";
import styles from "./style";
import action from "src/action";
import api from "src/api";

class ModifMobile extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    close: PropTypes.func
  };
  state = {
    mobile: "",
    code: ""
  };
  changeValue(value, type) {
    this.setState({
      [type]: value
    });
  }
  modif = () => {
    api
      .modifStoreInfo({ StoreTel: this.state.mobile })
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  };
  render() {
    const { isVisible, close } = this.props;
    const { mobile, code } = this.state;
    return (
      <Alert isVisible={isVisible} close={close}>
        <View style={styles.modalContianer}>
          <View style={styles.modalItemWrapper}>
            <Icon size={24} source={require("./img/u16.png")} />
            <Input
              value={mobile}
              onChangeText={v => {
                this.changeValue(v, "mobile");
              }}
              style={styles.modalItemInput}
              placeholder="新手机号码"
              placeholderTextColor={styles.modalItemInput.color}
            />
          </View>
          <View style={[styles.modalItemWrapper, { marginTop: 10 }]}>
            <Icon size={24} source={require("./img/u36.png")} />
            <Input
              value={code}
              onChangeText={v => {
                this.changeValue(v, "code");
              }}
              style={styles.modalItemInput}
              placeholder="验证码"
              placeholderTextColor={styles.modalItemInput.color}
            />
            <Button style={styles.codeButotn} textStyle={styles.codeButotnText}>
              验证码
            </Button>
          </View>
          <Button
            onPress={this.modif}
            style={styles.sumbit}
            textStyle={styles.sumbitText}
          >
            完成
          </Button>
        </View>
      </Alert>
    );
  }
}

@connect(state => {
  const { storeInfo } = state;
  return { storeInfo };
})
export default class Setting extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object,
    storeInfo: PropTypes.object
  };
  state = {
    isModifMobileVisible: false,
    storeInfo: { StoreName: "-", Id: "-", LegalName: "-", Location: "-" }
  };
  logout = () => {
    AsyncStorage.removeItem("mobile");
    this.props.navigation.dispatch(action.navigate.go({ routeName: "Login" }));
  };
  renderHeader() {
    const { StoreName, Id, LegalName, Location } = this.props.storeInfo;
    console.log(this.props.storeInfo, 99988);
    return (
      <View style={styles.header}>
        <Image style={styles.portrait} source={require("./img/u71.png")} />
        <View style={styles.headerRight}>
          <Text style={styles.storeName}>{StoreName}</Text>
          <Text style={styles.storeInfo}>
            ID:{Id} 法人：{LegalName}
          </Text>
          <Text style={styles.storeAddr}>{Location}</Text>
        </View>
      </View>
    );
  }
  renderList() {
    const { LegTel } = this.props.storeInfo;
    const data = [
      { label: "提醒", rightComponent: <Switch /> },
      { type: "border" },
      {
        label: `手机绑定  ${LegTel}`,
        rightComponent: (
          <Button
            onPress={() => {
              this.setState({
                isModifMobileVisible: true
              });
            }}
            textStyle={styles.itemValue}
          >
            更改
          </Button>
        )
      },
      { type: "border" },
      {
        label: "客服反馈",
        rightComponent: null,
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "Feedback" })
          );
        }
      }
    ];
    return (
      <View style={styles.list}>
        {data.map((item, i) => {
          const { label, rightComponent, onPress, type } = item;
          if (type === "border") {
            return <View style={styles.itemBorder} key={type + i} />;
          }
          if (onPress) {
            return (
              <Button onPress={onPress} style={styles.item} key={label}>
                <Text style={styles.itemLabel}>{label}</Text>
                {rightComponent}
              </Button>
            );
          }
          return (
            <View style={styles.item} key={label}>
              <Text style={styles.itemLabel}>{label}</Text>
              {rightComponent}
            </View>
          );
        })}
      </View>
    );
  }
  render() {
    const { isModifMobileVisible } = this.state;
    return (
      <Page title="设置" LeftComponent={<View />}>
        <View style={styles.container}>
          <View>
            {this.renderHeader()}
            {this.renderList()}
          </View>
          <Button
            onPress={this.logout}
            style={styles.logout}
            textStyle={styles.logoutText}
          >
            退出
          </Button>
        </View>
        <ModifMobile
          close={() => {
            this.setState({
              isModifMobileVisible: false
            });
          }}
          isVisible={isModifMobileVisible}
        />
      </Page>
    );
  }
}
