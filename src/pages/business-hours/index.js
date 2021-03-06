import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";

import action from "src/action";
import api from "src/api";
import { Tip } from "src/common";
import { Page, Button, Picker } from "src/components";
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

@connect(state => {
  const { storeInfo, auth: { StoreId } } = state;
  return { storeInfo, StoreId };
})
export default class BusinessHours extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object,
    storeInfo: PropTypes.object,
    dispatch: PropTypes.func,
    StoreId: PropTypes.number
  };
  state = {
    isPickerVisible: false,
    startWeek: "周一",
    startWeekValue: "1",
    endWeek: "周日",
    endWeekValue: "5",
    isDateTimePickerVisible: false,
    startTime: "开始时间",
    startTimeData: null,
    endTime: "结束时间",
    endTimeData: null,
    Flag: 1 //1营业 2未营业
  };
  componentWillMount() {
    const { Flag, BusinessTimes } = this.props.storeInfo;
    const BusinessWeeks = this.props.storeInfo.BusinessWeeks || "1,0";
    console.log(BusinessWeeks);
    const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const time = BusinessTimes
      ? BusinessTimes.split("-")
      : ["开始时间", "结束时间"];
    this.setState({
      Flag,
      startTime: time[0],
      endTime: time[1],
      startWeekValue: BusinessWeeks[0],
      startWeek: weeks[BusinessWeeks[0]],
      endWeekValue: BusinessWeeks[BusinessWeeks.length - 1],
      endWeek: weeks[BusinessWeeks[BusinessWeeks.length - 1]]
    });
  }
  store = {
    weeks: [
      { label: "周一", value: "1" },
      { label: "周二", value: "2" },
      { label: "周三", value: "3" },
      { label: "周四", value: "4" },
      { label: "周五", value: "5" },
      { label: "周六", value: "6" },
      { label: "周日", value: "0" }
    ],
    selectedWeekType: "",
    currentSelectedTimtType: ""
  };

  showWeekPickerModal = type => {
    this.store.selectedWeekType = type;
    this.setState({
      isPickerVisible: true
    });
  };
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    const time = moment(date).format("HH:mm");
    const { currentSelectedTimtType } = this.store;
    if (currentSelectedTimtType === "start") {
      this.setState({
        startTime: time,
        startTimeData: date
      });
    } else {
      this.setState({
        endTime: time,
        endTimeData: date
      });
    }
    this._hideDateTimePicker();
  };
  selectTime(type) {
    this.store.currentSelectedTimtType = type;
    this.setState({ isDateTimePickerVisible: true });
  }
  isCloseChange = v => {
    this.setState({
      Flag: v ? 1 : 2
    });
  };
  computWeekRangeStr() {
    //let { startWeekValue } = this.state;
    const { startWeekValue, endWeekValue } = this.state;
    return `${startWeekValue},${endWeekValue}`;
    // const l = endWeekValue - startWeekValue + 1;
    // const a = new Array(l);

    // a.fill(0);
    // const BusinessWeeks = a
    //   .map(item => {
    //     return startWeekValue++;
    //   })
    //   .join(",");
    // return BusinessWeeks;
  }
  save = () => {
    const { Flag, startTime, endTime } = this.state;
    const isHasInitTime = startTime.includes(":") && endTime.includes(":");

    if (!isHasInitTime) {
      Tip.fail("请输入时间");
    } else {
      api
        .updateStore({
          BusinessWeeks: this.computWeekRangeStr(),
          BusinessTimes: startTime + "-" + endTime,
          Flag,
          StoreId: this.props.StoreId
        })
        .then(res => {
          Tip.success("更新营业时间成功");
          this.props.dispatch({
            type: "storeInfo",
            payload: {
              BusinessWeeks: this.computWeekRangeStr(),
              BusinessTimes: startTime + "-" + endTime,
              Flag
            }
          });
          setTimeout(() => {
            this.props.navigation.dispatch(action.navigate.back());
          }, 1500);
        })
        .catch(e => {
          Tip.fail("更新营业时间失败" + e);
          console.log(e);
        });
    }
  };
  renderHeader() {
    const { Flag } = this.state;
    return (
      <View style={styles.header}>
        <Text style={styles.headerLabel}>
          店铺营业状态：{Flag === 1 ? "营业中" : "未营业"}
        </Text>
        <Switch value={Flag === 1} onValueChange={this.isCloseChange} />
      </View>
    );
  }
  renderPicker() {
    const { startWeek, endWeek } = this.state;
    return (
      <View style={styles.chooseDayWrapper}>
        <Button
          onPress={() => this.showWeekPickerModal("startWeek")}
          style={styles.chooseDayButton}
          textStyle={styles.chooseDayButtonText}
        >
          {startWeek}
        </Button>
        <Text style={styles.zhi}>至</Text>
        <Button
          onPress={() => this.showWeekPickerModal("endWeek")}
          style={styles.chooseDayButton}
          textStyle={styles.chooseDayButtonText}
        >
          {endWeek}
        </Button>
      </View>
    );
  }
  renderCenter() {
    const { startTime, endTime } = this.state;
    return (
      <View style={styles.center}>
        <Text style={styles.centerTitle}>营业时间</Text>
        {this.renderPicker()}
        <Button
          onPress={() => this.selectTime("start")}
          style={styles.chooseTimeButton}
          textStyle={styles.chooseTimeButtonText}
        >
          {startTime}
        </Button>
        <Text style={styles.timeZhi}>至</Text>
        <Button
          onPress={() => this.selectTime("end")}
          style={styles.chooseTimeButton}
          textStyle={styles.chooseTimeButtonText}
        >
          {endTime}
        </Button>
      </View>
    );
  }
  renderButton() {
    return (
      <View style={styles.bottom}>
        <Button
          onPress={this.save}
          style={styles.saveButton}
          textStyle={styles.saveButtonText}
        >
          保存
        </Button>
      </View>
    );
  }
  render() {
    const { isPickerVisible } = this.state;
    const { weeks } = this.store;
    return (
      <Page title="营业时间">
        <View style={styles.container}>
          <View style={styles.notif}>
            <ScrollView horizontal={true} style={{ flex: 1 }}>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={styles.notifText}>
                  请慎重调整营业时间及状态,营业时间外所有计费将关闭!
                </Text>
              </View>
            </ScrollView>
          </View>

          {this.renderHeader()}
          {this.renderCenter()}
          {this.renderButton()}
          <Picker
            data={weeks}
            visible={isPickerVisible}
            onRequestClose={() => {
              this.setState({
                isPickerVisible: false
              });
            }}
            onValueSelect={item => {
              const { selectedWeekType } = this.store;
              const { label, value } = item;

              this.setState({
                isPickerVisible: false,
                [selectedWeekType]: label,
                [`${selectedWeekType}Value`]: value
              });
            }}
          />
          <DateTimePicker
            is24Hour={true}
            mode="time"
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
            cancelTextIOS="取消"
            confirmTextIOS="确定"
            titleIOS="选择时间"
          />
        </View>
      </Page>
    );
  }
}
