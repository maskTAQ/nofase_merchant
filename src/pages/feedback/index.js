import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
//import PropTypes from "prop-types";

import { Page, Button, Icon } from "src/components";
import styles from "./style";
export default class Feedback extends Component {
  static defaultProps = {};
  static propTypes = {};
  store = {
    data: [
      { q: "商家提现分成规则", a: "----" },
      { q: "如何修改绑定银行卡信息", a: "----" },
      { q: "如何提高账户的安全性", a: "----" },
      { q: "收款后域名提示内容", a: "----" },
      { q: "查看剩余额度", a: "----" },
      { q: "关于用户余额不足的提示", a: "----" }
    ]
  };
  showModal(a) {
    console.log("====================================");
    console.log(a);
    console.log("====================================");
  }
  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>Hi,掌柜</Text>
        <Text style={styles.subtitle}>已为您定制以下内容</Text>
      </View>
    );
  }
  renderItem(item) {
    const { q, a } = item;
    return (
      <Button onPress={() => this.showModal(a)} style={styles.item} key={q}>
        <Text style={styles.itemLabel}>{q}</Text>
      </Button>
    );
  }
  renderList() {
    const { data } = this.store;
    return (
      <View style={styles.list}>
        <View style={styles.listTitleWrapper}>
          <Text style={styles.listTitle}>猜你想问</Text>
        </View>
        <FlatList
          data={data}
          extraData={this.state}
          keyExtractor={item => item.q}
          renderItem={({ item }) => this.renderItem(item)}
        />
      </View>
    );
  }
  render() {
    return (
      <Page title="客户反馈">
        <View style={styles.container}>
          {this.renderHeader()}
          {this.renderList()}
          <Button style={styles.feedback} textStyle={styles.feedbackText}>
            我要反馈
          </Button>
          <View style={styles.contact}>
            <View style={styles.contactItem}>
              <View style={styles.contactItemLabel}>
                <Text style={styles.contactItemLabelText}>总站客服:</Text>
              </View>
              <Button style={styles.call}>
                <Text style={styles.callText}>4008-650-152</Text>
                <Icon size={20} source={require("./img/u204.png")} />
              </Button>
            </View>
            <View style={styles.contactItem}>
              <View style={styles.contactItemLabel}>
                <Text style={styles.contactItemLabelText}>
                  广东省-深圳市-罗湖区
                </Text>
                <Text style={styles.contactItemLabelText}>分站客服:</Text>
              </View>
              <Button style={styles.call}>
                <Text style={styles.callText}>150489218870</Text>
                <Icon size={20} source={require("./img/u204.png")} />
              </Button>
            </View>
          </View>
        </View>
      </Page>
    );
  }
}
