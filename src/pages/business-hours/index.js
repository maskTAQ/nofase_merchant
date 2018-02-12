import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import { Page, Button } from "src/components";
import styles from "./style";

const Switch = ({ value, onValueChange = () => {} }) => {
  const label = value ? "off" : "on";
  let children;
  if (value) {
    children = [
      <View style={styles.switchPoint} key="0" />,
      <Text style={styles.switchLabel} key="1">
        {label}
      </Text>
    ];
  } else {
    children = [
      <Text style={styles.switchLabel} key="1">
        {label}
      </Text>,
      <View style={styles.switchPoint} key="0" />
    ];
  }
  return (
    <Button
      onPress={() => {
        onValueChange(!value);
      }}
      style={styles.switchWrapper}
    >
      {children}
    </Button>
  );
};
Switch.propTypes = {
  value: PropTypes.bool,
  onValueChange: PropTypes.func
};
export default class BusinessHours extends Component {
  static defaultProps = {};
  static propTypes = {};
  state = {
    activePickerIndex: 0,
    timesRange: [0, 6]
  };
  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerLabel}>店铺营业状态</Text>
        <Switch />
      </View>
    );
  }
  renderPicker() {
    const weeks = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    const { timesRange } = this.state;
    const renderData = Object.assign([], timesRange);
    renderData.splice(1, 0, "至");
    console.log(renderData);

    return (
      <View style={styles.chooseDayWrapper}>
        {renderData.map(i => {
          if (i === "至") {
            return (
              <Text style={styles.zhi} key={i}>
                至
              </Text>
            );
          }
          return (
            <Button
              style={styles.chooseDayButton}
              textStyle={styles.chooseDayButtonText}
              key={i}
            >
              {weeks[i]}
            </Button>
          );
        })}
      </View>
    );
  }
  renderCenter() {
    return (
      <View style={styles.center}>
        <Text style={styles.centerTitle}>营业时间</Text>
        {this.renderPicker()}
        <Button
          style={styles.chooseTimeButton}
          textStyle={styles.chooseTimeButtonText}
        >
          12:00
        </Button>
        <Text style={styles.timeZhi}>至</Text>
        <Button
          style={styles.chooseTimeButton}
          textStyle={styles.chooseTimeButtonText}
        >
          22:00
        </Button>
      </View>
    );
  }
  renderButton() {
    return (
      <View style={styles.bottom}>
        <Button style={styles.saveButton} textStyle={styles.saveButtonText}>
          保存
        </Button>
        <Text style={styles.info}>请您仔细填写，切勿随意更改</Text>
        <Text style={styles.info}>营业时间及营业状态直接影响店铺经营情况</Text>
      </View>
    );
  }
  render() {
    return (
      <Page title="营业时间">
        <View style={styles.container}>
          {this.renderHeader()}
          {this.renderCenter()}
          {this.renderButton()}
        </View>
      </Page>
    );
  }
}
