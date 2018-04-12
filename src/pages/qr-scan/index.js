import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import api from "src/api";
import action from "src/action";
import QRScannerView from "./base";
import { Tip } from "src/common";
import { Page, Alert, Button } from "src/components";
import styles from "./style";

const Modal = ({
  OrderType,
  orderStatus,
  isModalVisible,
  requestRetryScan,
  requestIntoOrderDetail,
  requestCancel,
  errorMessage
}) => {
  let iconSource, label;
  const singleButotn = orderStatus === "error";
  switch (true) {
    case OrderType === 1 && orderStatus === "success":
      iconSource = require("./img/u91.png");
      label = "扫码成功 开始计费";
      break;
    case OrderType === 1 && orderStatus === "error":
      iconSource = require("./img/u30.png");
      label = "扫码失败 请重试!";
      break;
    case OrderType === 2 && orderStatus === "success":
      iconSource = require("./img/u73.png");
      label = "扫码成功 结束扣费";
      break;
    case OrderType === 2 && orderStatus === "error":
      iconSource = require("./img/u30.png");
      label = "扫码失败 请重试!";
      break;
  }
  label = errorMessage ? errorMessage : label;
  return (
    <Alert style={styles.modalContainer} isVisible={isModalVisible}>
      <View style={styles.modalContent}>
        <View style={styles.modalIconWrapper}>
          <Image source={iconSource} style={styles.modalIcon} />
        </View>
        <Text style={styles.modalLabel}>{label}</Text>
        {singleButotn ? (
          <View style={styles.modalButtonGroup}>
            <Button
              onPress={requestRetryScan}
              style={[styles.modalButton, styles.modalConfirmButton]}
              textStyle={[
                styles.modalButtonText,
                styles.modalConfirmButtonText
              ]}
            >
              重试
            </Button>
          </View>
        ) : (
          <View style={styles.modalButtonGroup}>
            <Button
              onPress={requestIntoOrderDetail}
              style={[styles.modalButton, styles.modalConfirmButton]}
              textStyle={[
                styles.modalButtonText,
                styles.modalConfirmButtonText
              ]}
            >
              查看详情
            </Button>
            <View style={{ width: 10 }} />
            <Button
              onPress={requestCancel}
              style={styles.modalButton}
              textStyle={styles.modalButtonText}
            >
              取消
            </Button>
          </View>
        )}
      </View>
    </Alert>
  );
};
Modal.propTypes = {
  OrderType: PropTypes.number,
  isModalVisible: PropTypes.bool,
  requestRetryScan: PropTypes.func,
  requestIntoOrderDetail: PropTypes.func,
  requestCancel: PropTypes.func,
  orderStatus: PropTypes.string,
  errorMessage: PropTypes.string
};

@connect(state => {
  const { auth: { StoreId }, nav } = state;
  return { StoreId, nav };
})
export default class QRScan extends Component {
  static propTypes = {
    StoreId: PropTypes.number,
    navigation: PropTypes.object,
    nav: PropTypes.object
  };
  state = {
    OrderType: 1, //1开始计费 2结束计费(扣费)
    orderStatus: "success", //对应步骤的状态
    isCameraVisible: true,
    isModalVisible: false,
    //查看详情的订单信息
    currentOrderInfo: {}
  };

  componentWillReceiveProps(nextProps) {
    const { index, routes } = this.props.nav;
    const { nav } = nextProps;
    const prevRouteName = routes[index].routeName;
    const nextRouteName = nav.routes[nav.index].routeName;
    if (nextRouteName === "QRScan" && prevRouteName === "QRScanTiming") {
      this.setState({
        isCameraVisible: true
      });
    }
  }
  isScaning = false;
  barcodeReceived = e => {
    const data = e.data;
    let UserId = "";
    let CardId = "";
    try {
      UserId = JSON.parse(data).UserId;
      CardId = JSON.parse(data).CardId;
    } catch (e) {
      return Tip.fail("请扫描正确的用户二维码");
    }
    const { StoreId } = this.props;
    if (this.isScaning) {
      return "";
    }
    this.isScaning = true;
    return api
      .scanUserQR({ UserId, StoreId, CardId })
      .then(res => {
        console.log(res);
        this.isScaning = false;
        this.setState({
          isCameraVisible: false,
          isModalVisible: true,
          OrderType: res.OrderType,
          orderStatus: "success",
          currentOrderInfo: res
        });
      })
      .catch(e => {
        this.isScaning = false;
        this.setState({
          isCameraVisible: false,
          isModalVisible: true,
          OrderType: 1,
          orderStatus: "error",
          errorMessage: typeof e === "string" ? e : ""
        });
      });
  };
  retryScan = () => {
    this.setState({
      isCameraVisible: true,
      isModalVisible: false
    });
  };
  intoOrderDetail = () => {
    const { currentOrderInfo } = this.state;
    this.setState(
      {
        isModalVisible: false
      },
      () => {
        this.props.navigation.dispatch(
          action.navigate.go({
            routeName: "QRScanTiming",
            params: {
              ...currentOrderInfo
            }
          })
        );
      }
    );
  };
  cancel = () => {
    this.setState(
      {
        isModalVisible: false
      },
      () => {
        this.props.navigation.dispatch(action.navigate.back());
      }
    );
  };
  render() {
    const {
      isCameraVisible,
      isModalVisible,
      OrderType,
      orderStatus,
      errorMessage
    } = this.state;
    return (
      <Page title="扫码计时">
        <View style={styles.container}>
          <View style={{ height: 400, backgroundColor: "#289ee3" }}>
            {isCameraVisible && (
              <QRScannerView
                onScanResultReceived={this.barcodeReceived}
                renderTopBarView={() => null}
                renderBottomMenuView={() => null}
                maskColor="#289ee3"
                scanBarColor="#1a99e1"
                hintText=""
              />
            )}
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#289ee3",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {isCameraVisible && (
              <Button
                onPress={() => this.barcodeReceived({ data: '{"UserId":1}' })}
              >
                <Text style={{ color: "#fff" }}>请对准用户扫码页面</Text>
              </Button>
            )}
          </View>
          <Modal
            requestRetryScan={this.retryScan}
            requestIntoOrderDetail={this.intoOrderDetail}
            requestCancel={this.cancel}
            isModalVisible={isModalVisible}
            OrderType={OrderType}
            orderStatus={orderStatus}
            errorMessage={errorMessage}
          />
        </View>
      </Page>
    );
  }
}
