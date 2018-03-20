import React, { Component } from "react";
import { View, TextInput, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import action from "src/action";
import api from "src/api";
import { Tip } from "src/common";
import { Page, Button } from "src/components";
import styles from "./style";

@connect(state => {
  const { storeInfo, auth: { StoreId } } = state;
  return { storeInfo, StoreId };
})
export default class Introduce extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object,
    storeInfo: PropTypes.object,
    StoreId: PropTypes.number,
    dispatch: PropTypes.func
  };
  state = {
    value: ""
  };
  componentWillMount() {
    console.log(this.props.storeInfo.StoreRemarks);
    this.setState({
      value: this.props.storeInfo.StoreRemarks || ""
    });
  }
  onChangeText = v => {
    this.setState({
      value: v
    });
  };
  save = () => {
    const { value } = this.state;
    api
      .updateStore({
        StoreRemarks: value,
        StoreId: this.props.StoreId
      })
      .then(res => {
        Tip.success("更新商家介绍/留言成功");
        this.props.dispatch({
          type: "storeInfo",
          payload: {
            StoreRemarks: value
          }
        });
        setTimeout(() => {
          this.props.navigation.dispatch(action.navigate.back());
        }, 1500);
      })
      .catch(e => {
        Tip.fail("更新商家介绍/留言失败" + e);
        console.log(e);
      });
  };
  render() {
    const { value } = this.state;
    return (
      <Page
        title="编辑介绍/留言"
        RightComponent={
          <Button onPress={this.save} textStyle={styles.saveLabel}>
            保存
          </Button>
        }
      >
        <View style={styles.container}>
          <TextInput
            style={styles.area}
            value={value}
            onChangeText={this.onChangeText}
            autoFocus={true}
            maxLength={500}
            multiline={true}
            placeholder="请输入介绍/留言"
          />
          <View style={styles.length}>
            <Text style={styles.lengthText}>{value.length}/500</Text>
          </View>
        </View>
      </Page>
    );
  }
}
