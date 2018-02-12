import React, { Component } from "react";
import { Text, View } from "react-native";
import QRScannerView from "./base";
import { Page } from "src/components";

export default class QRScan extends Component {
  _renderTitleBar() {
    return (
      <Text
        style={{
          color: "white",
          textAlignVertical: "center",
          textAlign: "center",
          font: 20,
          padding: 12
        }}
      >
        Here is title bar
      </Text>
    );
  }

  _renderMenu() {
    return (
      <Text
        style={{
          color: "white",
          textAlignVertical: "center",
          textAlign: "center",
          font: 20,
          padding: 12
        }}
      >
        Here is bottom menu
      </Text>
    );
  }

  barcodeReceived(e) {
    console.log("Type: " + e.type + "\nData: " + e.data);
    console.log(e);
  }
  render() {
    return (
      <Page title="扫码计时">
        <View style={{ height: 400 }}>
          <QRScannerView
            onScanResultReceived={this.barcodeReceived.bind(this)}
            renderTopBarView={() => null}
            renderBottomMenuView={() => null}
            maskColor="#289ee3"
            scanBarColor="#1a99e1"
            hintText=""
          />
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
      </Page>
    );
  }
}
