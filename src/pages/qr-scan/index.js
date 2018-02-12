import React, { Component } from "react";
import { Text, View, Image } from "react-native";

import QRScannerView from "./base";
import { Page, Alert, Button } from "src/components";
import styles from "./style";

const Modal = status => {
  let iconSource, label;
  const singleButotn = status !== 1 || status !== 2;
  switch (String(status)) {
    case "1":
      iconSource = require("./img/u91.png");
      label = "扫码成功 开始计费";
      break;
    case "2":
      iconSource = require("./img/u73.png");
      label = "扫码成功 开始扣费";
      break;
    default:
      iconSource = require("./img/u30.png");
      label = "扫码失败 请重试!";
      break;
  }
  return (
    <Alert style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.modalIconWrapper}>
          <Image source={iconSource} style={styles.modalIcon} />
        </View>
        <Text style={styles.modalLabel}>{label}</Text>
        {singleButotn ? (
          <View style={styles.modalButtonGroup}>
            <Button
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
              style={[styles.modalButton, styles.modalConfirmButton]}
              textStyle={[
                styles.modalButtonText,
                styles.modalConfirmButtonText
              ]}
            >
              扣费
            </Button>
            <View style={{ width: 10 }} />
            <Button
              style={styles.modalButton}
              textStyle={styles.modalButtonText}
            >
              扣费
            </Button>
          </View>
        )}
      </View>
    </Alert>
  );
};
export default class QRScan extends Component {
  state = {
    status: 0, //0 扫码中 1开始计费 2结束计费(扣费) 3开始计费失败 4 结束结束失败
    cameraVisible: false
  };
  barcodeReceived(e) {
    console.log("Type: " + e.type + "\nData: " + e.data);
  }

  render() {
    const { cameraVisible } = this.state;
    return (
      <Page title="扫码计时">
        <View style={styles.container}>
          <View style={{ height: 400, backgroundColor: "#289ee3" }}>
            {cameraVisible ? (
              <QRScannerView
                onScanResultReceived={this.barcodeReceived.bind(this)}
                renderTopBarView={() => null}
                renderBottomMenuView={() => null}
                maskColor="#289ee3"
                scanBarColor="#1a99e1"
                hintText=""
              />
            ) : null}
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#289ee3",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "#fff" }}>请对准用户扫码页面</Text>
          </View>
          <Modal status={2} />
        </View>
      </Page>
    );
  }
}
