import React, { Component } from "react";
import { View, Text, Switch, AsyncStorage, Alert } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  Button,
  Icon,
  Input,
  CodeButton,
  Alert as AlertModal
} from "src/components";
import styles from "./style";
import action from "src/action";
import api from "src/api";
import { Tip } from "src/common";

const logo = require("./img/logo.png");
class ModifMobile extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    close: PropTypes.func,
    StoreId: PropTypes.number,
    verifySetp: PropTypes.number,
    oldMobile: PropTypes.string,
    requestVerifySetpChange: PropTypes.func,
    logout: PropTypes.func
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
  verify = () => {
    const { verifySetp, oldMobile, requestVerifySetpChange } = this.props;
    const { mobile, code } = this.state;
    if (verifySetp === 0) {
      api
        .verifyCode(oldMobile, code)
        .then(res => {
          Alert.alert("提示", "旧手机验证成功，请输入新手机号", [
            { text: "确定", onPress: () => {} }
          ]);
          requestVerifySetpChange(1);
        })
        .catch(e => {
          Alert.alert("提示", "旧手机验证失败:" + e, [
            { text: "确定", onPress: () => {} }
          ]);
        });
    }
    if (verifySetp === 1) {
      if (mobile === oldMobile) {
        Alert.alert("提示", "新旧手机号不能相同", [
          { text: "确定", onPress: () => {} }
        ]);
      } else {
        api
          .verifyCode(mobile, code)
          .then(res => {
            Alert.alert("提示", "新手机验证成功，请点击完成保存", [
              { text: "确定", onPress: () => {} }
            ]);
            requestVerifySetpChange(2);
          })
          .catch(e => {
            Alert.alert("提示", "新手机验证失败:" + e, [
              { text: "确定", onPress: () => {} }
            ]);
          });
      }
    }

    if (verifySetp === 2) {
      this.modif();
    }
  };
  modif = () => {
    const { StoreId, logout } = this.props;
    api
      .modifStoreInfo({ StoreId, LegTel: this.state.mobile })
      .then(res => {
        logout();
      })
      .catch(e => {
        Alert.alert("提示", "修改失败:" + e, [
          { text: "确定", onPress: () => {} }
        ]);
      });
  };
  render() {
    const { isVisible, close, verifySetp, oldMobile } = this.props;
    const { mobile, code } = this.state;
    const currentMobile = verifySetp === 0 ? oldMobile : mobile;
    let buttonLabel = "验证旧手机";
    if (verifySetp === 1) {
      buttonLabel = "验证新手机";
    }
    if (verifySetp === 2) {
      buttonLabel = "修改手机号";
    }

    return (
      <AlertModal isVisible={isVisible} close={close}>
        <View style={styles.modalContianer}>
          <View style={styles.modalItemWrapper}>
            <Icon size={24} source={require("./img/u16.png")} />
            <Input
              value={currentMobile}
              onChangeText={v => {
                this.changeValue(v, "mobile");
              }}
              editable={verifySetp === 1}
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
            <CodeButton phone={currentMobile} type="modal" time={10}>
              验证码
            </CodeButton>
          </View>
          <Button
            onPress={this.verify}
            style={styles.sumbit}
            textStyle={styles.sumbitText}
          >
            {buttonLabel}
          </Button>
        </View>
      </AlertModal>
    );
  }
}

@connect(state => {
  const { storeInfo, auth: { StoreId } } = state;
  return { storeInfo, StoreId };
})
export default class Setting extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object,
    storeInfo: PropTypes.object,
    StoreId: PropTypes.number
  };
  state = {
    isModifMobileVisible: false,
    storeInfo: { StoreName: "-", Id: "-", LegalName: "-", Location: "-" },
    verifySetp: 0, //0 未验证 1验证完当前手机号 2验证完绑定手机号
    //是否开启提醒
    isRemind: false
  };
  componentWillMount = async () => {
    const isRemind = await this.getRemind();
    this.setState({
      isRemind
    });
  };
  logout = () => {
    //AsyncStorage.removeItem("mobile");
    this.props.navigation.dispatch(action.logout());
    this.props.navigation.dispatch(action.navigate.go({ routeName: "Login" }));
  };
  getRemind = async () => {
    const asyncGetRemind = () => {
      return new Promise((resolve, reject) => {
        AsyncStorage.getItem("isRemind", (e, result) => {
          if (e) {
            resolve(false);
          } else {
            if (result && result === "1") {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        });
      });
    };

    const result = await asyncGetRemind();

    return result;
  };
  setRemind = () => {
    const { isRemind } = this.state;
    Tip.loading();
    AsyncStorage.setItem("isRemind", !isRemind ? "1" : "0", (e, result) => {
      if (e) {
        Tip.fail("设置失败");
      } else {
        setTimeout(() => {
          this.setState({
            isRemind: !isRemind
          });
          Tip.dismiss();
        }, 1500);
      }
    });
  };
  renderHeader() {
    const {
      StoreName,
      Id,
      LegalName,
      Address,
      storeAddrDes,
      StoreImg
    } = this.props.storeInfo;
    return (
      <View style={styles.header}>
        {StoreImg ? (
          <Icon size={60} source={{ uri: StoreImg }} />
        ) : (
          <Icon size={60} source={logo} />
        )}
        <View style={styles.headerRight}>
          <Text style={styles.storeName}>店铺名:{StoreName}</Text>
          <Text style={styles.storeInfo}>
            ID:{Id} 负责人：{LegalName || "暂不存在负责人"}
          </Text>
          <Text style={styles.storeAddr}>
            {Address}
            {storeAddrDes}
          </Text>
        </View>
      </View>
    );
  }
  renderList() {
    const { LegTel } = this.props.storeInfo;
    const { isRemind } = this.state;
    const data = [
      {
        label: "提醒",
        rightComponent: (
          <Switch value={isRemind} onValueChange={this.setRemind} />
        )
      },
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
    const { isModifMobileVisible, verifySetp } = this.state;
    const { LegTel } = this.props.storeInfo;
    console.log(this.props);
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.title}>
            <Text style={styles.titleText}>设置</Text>
          </View>
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
        <ModifMobile
          close={() => {
            this.setState({
              isModifMobileVisible: false
            });
          }}
          requestVerifySetpChange={v => {
            this.setState({
              verifySetp: v
            });
          }}
          StoreId={this.props.StoreId}
          oldMobile={LegTel}
          isVisible={isModifMobileVisible}
          verifySetp={verifySetp}
          logout={this.logout}
        />
      </View>
    );
  }
}
