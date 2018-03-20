import React, { Component } from "react";
import { View, FlatList, Text, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Page, Button, Icon, Alert, Input } from "src/components";
import action from "src/action";
import api from "src/api";
import { Tip } from "src/common";
import styles from "./style";

class ModifMobile extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    close: PropTypes.func,
    CsTel: PropTypes.string,
    StoreId: PropTypes.number,
    dispatch: PropTypes.func
  };
  state = {
    mobile: ""
  };
  componentWillMount() {
    this.setState({
      mobile: this.props.CsTel || ""
    });
  }
  componentWillReceiveProps(nextProps) {
    const { CsTel } = this.props;
    const { CsTel: nextCsTel } = nextProps;
    if (CsTel !== nextCsTel && nextCsTel) {
      this.setState({
        mobile: nextCsTel
      });
    }
  }
  changeValue(value, type) {
    this.setState({
      [type]: value
    });
  }
  modif = () => {
    const { mobile } = this.state;
    api
      .updateStore({ CsTel: mobile, StoreId: this.props.StoreId })
      .then(res => {
        this.props.dispatch({
          type: "storeInfo",
          payload: {
            CsTel: mobile
          }
        });
        this.props.close();
      })
      .catch(e => {
        console.log(e);
        this.props.close();
        Tip.fail("修改失败");
      });
  };
  render() {
    const { isVisible, close } = this.props;
    const { mobile } = this.state;
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
              placeholder="新客服号码"
              placeholderTextColor={styles.modalItemInput.color}
            />
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
  const { storeInfo, auth: { StoreId } } = state;
  return { storeInfo, StoreId };
})
export default class StoreManage extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object,
    storeInfo: PropTypes.object,
    dispatch: PropTypes.func,
    StoreId: PropTypes.number
  };
  state = {
    isModifMobileVisible: false
    // storeInfo: {
    //   StoreName: "-",
    //   Address: "-",
    //   PeopleNum: "-",
    //   Charge: "-",
    //   BusinessTimes: "-",
    //   BusinessWeeks: "",
    //   CsTel: "-"
    // }
  };
  componentWillMount() {
    this.getStoreInfo();
  }
  getStoreInfo() {
    return this.props
      .dispatch({
        type: "storeInfo",
        api: () => {
          return api.getStoreInfo();
        },
        promise: true
      })
      .then(data => {
        console.log(data);
        this.setState({
          storeInfo: data
        });
      })
      .catch(e => {
        Tip.loading("getStoreInfo:error");
        console.log("getStoreInfo:error", e);
      });
  }
  renderItem(item, isReadonly) {
    const icon = require("./img/u57.png");
    const { label, value, onPress } = item;
    return (
      <Button onPress={onPress} style={styles.item}>
        <View style={styles.itemLabel}>
          <Text style={styles.itemLabelText}>{label}</Text>
          {isReadonly ? (
            <Icon size={20} source={icon} style={styles.itemIcon} />
          ) : null}
        </View>
        <Text style={styles.itemValue}>{value}</Text>
      </Button>
    );
  }
  renderTop() {
    const { StoreName, Address, PeopleNum, Charge } = this.props.storeInfo;
    const readonlyData = [
      { label: "店名", value: StoreName },
      { label: "位置", value: Address },
      { label: "容纳人数", value: `${PeopleNum}人` },
      { label: "收费标准", value: `${Charge}/小时` }
    ];
    return (
      <View style={styles.list}>
        <FlatList
          data={readonlyData}
          keyExtractor={item => item.label}
          ItemSeparatorComponent={() => <View style={styles.itemBorder} />}
          renderItem={({ item }) => this.renderItem(item, true)}
        />
      </View>
    );
  }
  renderBottom() {
    const { BusinessTimes, BusinessWeeks, CsTel } = this.props.storeInfo;
    const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const editable = [
      {
        label: "店铺图库",
        value: "查看",
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "ImgStore" })
          );
        }
      },
      {
        label: "营业时间",
        value: BusinessWeeks
          ? `${weeks[BusinessWeeks[0]]}至${
              weeks[BusinessWeeks[BusinessWeeks.length - 1]]
            } ${BusinessTimes}`
          : "-1",
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "BusinessHours" })
          );
        }
      },
      {
        label: "设备管理",
        value: "查看",
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "DeviceManage" })
          );
        }
      },
      {
        label: "课程表",
        value: "查看",
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "Timetable" })
          );
        }
      },
      {
        label: "客服电话",
        value: CsTel,
        onPress: () => {
          this.setState({
            isModifMobileVisible: true
          });
        }
      },
      {
        label: "商家介绍/留言",
        value: "查看",
        onPress: () => {
          this.props.navigation.dispatch(
            action.navigate.go({ routeName: "Introduce" })
          );
        }
      }
    ];
    return (
      <View style={[styles.list, { marginTop: 10 }]}>
        <FlatList
          data={editable}
          keyExtractor={item => item.label}
          ItemSeparatorComponent={() => <View style={styles.itemBorder} />}
          renderItem={({ item }) => this.renderItem(item, false)}
        />
      </View>
    );
  }
  render() {
    const { isModifMobileVisible } = this.state;
    const { storeInfo, StoreId } = this.props;
    return (
      <Page title="店铺管理" LeftComponent={<View />}>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.content}>
              {this.renderTop()}
              {this.renderBottom()}
            </View>
            <View style={styles.nav}>
              <Button textStyle={styles.navItemText}>某某健身</Button>
              <View style={styles.navBorder} />
              <Button textStyle={styles.navItemText}>常见问题</Button>
            </View>
          </ScrollView>
          <ModifMobile
            close={() => {
              this.setState({
                isModifMobileVisible: false
              });
            }}
            dispatch={this.props.dispatch}
            CsTel={storeInfo.CsTel}
            StoreId={StoreId}
            isVisible={isModifMobileVisible}
          />
        </View>
      </Page>
    );
  }
}
