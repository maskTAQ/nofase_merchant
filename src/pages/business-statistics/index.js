import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Page, Button, Icon, DataView } from "src/components";
import api from "src/api";
import styles from "./style";
const portraitSource = require("./img/logo.png");

@connect(state => {
  const { storeBusInfoByDate, storeUserListByDate } = state;
  return { storeBusInfoByDate, storeUserListByDate };
})
export default class BusinessStatistics extends Component {
  static propTypes = {
    storeBusInfoByDate: PropTypes.object,
    navigation: PropTypes.object,
    storeUserListByDate: PropTypes.array,
    dispatch: PropTypes.func
  };
  state = {
    activeIndex: 0,
    isDateTimePickerVisible: false,
    startTime: "开始时间",
    startTimeDate: null,
    endTime: "结束时间",
    endTimeDate: null,
    storeBusInfoByDate: {}
  };

  store = {
    currentSelectedTimtType: "",
    //当前查询的时间参数
    params: {},
    dates: [
      {
        SDate: `${moment(new Date("1997")).format("YYYY-MM-DD")} 00:00:00`,
        EDate: `${moment().format("YYYY-MM-DD")} 23:59:59`
      },
      {
        SDate: `${moment().format("YYYY-MM-DD")} 00:00:00`,
        EDate: `${moment().format("YYYY-MM-DD")} 23:59:59`
      },
      {
        SDate: `${moment()
          .subtract({ hours: 24 })
          .format("YYYY-MM-DD")} 00:00:00`,
        EDate: `${moment().format("YYYY-MM-DD")} 23:59:59`
      },
      {
        SDate: `${moment()
          .subtract({ hours: 24 * 3 })
          .format("YYYY-MM-DD")} 00:00:00`,
        EDate: `${moment().format("YYYY-MM-DD")} 23:59:59`
      },
      {
        SDate: `${moment()
          .subtract({ hours: 24 * 10 })
          .format("YYYY-MM-DD")} 00:00:00`,
        EDate: `${moment().format("YYYY-MM-DD")} 23:59:59`
      },
      {
        SDate: `${moment()
          .startOf("month")
          .format("YYYY-MM-DD")} 00:00:00`,
        EDate: `${moment().format("YYYY-MM-DD")} 23:59:59`
      }
    ]
  };
  getData = () => {
    const { activeIndex } = this.state;
    const { dates } = this.store;
    const params = isNaN(activeIndex) ? this.store.params : dates[activeIndex];

    api.getStoreBusInfoByDate(params).then(res => {
      this.setState({
        storeBusInfoByDate: res
      });
    });
    return api.getStoreUserListByDate(params).then(res => {
      const result = res.sort((prev, next) => {
        const getTimestamp = s => /\/Date\(([0-9]+)\)/.exec(s)[1];
        return getTimestamp(next.LastInDate) - getTimestamp(prev.LastInDate);
      });
      return result;
    });
  };

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    const time = moment(date).format("YYYY-MM-DD");
    const { currentSelectedTimtType } = this.store;
    const { startTimeDate, endTimeDate } = this.state;

    if (currentSelectedTimtType === "start") {
      this.setState({
        startTime: time,
        startTimeDate: date
      });
      if (endTimeDate) {
        this.store.params = {
          SDate: `${moment(date).format("YYYY-MM-DD")} 00:00:00`,
          EDate: `${moment(endTimeDate).format("YYYY-MM-DD")} 23:59:59`
        };
        this.setState({ activeIndex: NaN }, () => {
          this.dataRef.triggerRefresh();
        });
      }
    } else {
      this.setState({
        endTime: time,
        endTimeDate: date
      });
      if (startTimeDate) {
        this.store.params = {
          SDate: `${moment(startTimeDate).format("YYYY-MM-DD")} 00:00:00`,
          EDate: `${moment(date).format("YYYY-MM-DD")} 23:59:59`
        };
        this.setState({ activeIndex: NaN }, () => {
          this.dataRef.triggerRefresh();
        });
      }
    }

    this._hideDateTimePicker();
  };
  selectDateType(i) {
    this.setState(
      { activeIndex: i, startTimeDate: null, endTimeDate: null },
      () => {
        this.dataRef.triggerRefresh();
      }
    );
  }
  selectTime(type) {
    this.store.currentSelectedTimtType = type;
    this.setState({ isDateTimePickerVisible: true });
  }
  getDateByMinute(minute) {
    // const pad = s => {
    //   if (String(s).length === 1) {
    //     return "0" + s;
    //   } else {
    //     return s;
    //   }
    // };
    const t = minute * 60;
    const d = Math.floor(t / (24 * 3600));
    const h = Math.floor((t - 24 * 3600 * d) / 3600);
    const m = Math.floor((t - 24 * 3600 * d - h * 3600) / 60);
    //const s = Math.floor(t - 24 * 3600 * d - h * 3600 - m * 60);
    return `${h}小时${m}分钟`;
  }
  renderChooseDay() {
    const { activeIndex } = this.state;
    const days = ["所有", "当日", "上一日", "三日", "十日", "本月"];
    return (
      <View style={styles.chooseDay}>
        {days.map((day, i) => {
          const isActive = activeIndex === i;
          return (
            <Button
              onPress={() => this.selectDateType(i)}
              style={[styles.dayItem, isActive ? styles.dayActiveItem : null]}
              textStyle={[
                styles.dayItemText,
                isActive ? styles.dayActiveItemText : null
              ]}
              key={day}
            >
              {day}
            </Button>
          );
        })}
      </View>
    );
  }
  renderChooseTime() {
    const { startTime, endTime } = this.state;
    return (
      <View style={styles.chooseTime}>
        <Text style={styles.chooseTimeLabel}>自定义时间区:</Text>
        <View style={styles.inputWrapper}>
          <Button
            onPress={() => this.selectTime("start")}
            style={styles.inputButton}
            textStyle={styles.inputText}
          >
            {startTime}
          </Button>
          <Text style={styles.zhi}>至</Text>
          <Button
            onPress={() => this.selectTime("end")}
            style={styles.inputButton}
            textStyle={styles.inputText}
          >
            {endTime}
          </Button>
        </View>
        <View style={styles.chooseTimeButton}>
          <Icon size={24} source={require("./img/u33.png")} />
        </View>
      </View>
    );
  }
  renderHeader() {
    return (
      <View style={styles.header}>
        {this.renderChooseDay()}
        {this.renderChooseTime()}
      </View>
    );
  }
  renderDetail() {
    const { activeIndex, startTime, endTime } = this.state;
    const { dates } = this.store;
    const date = isNaN(activeIndex)
      ? { SDate: startTime, EDate: endTime }
      : dates[activeIndex];
    const {
      InPeople,
      TimeLongs,
      Amont,
      AveAmont
    } = this.state.storeBusInfoByDate;
    return (
      <View style={styles.detail}>
        <Text style={styles.detailTitle}>
          {date.SDate}至{date.EDate}{" "}
        </Text>
        <View style={styles.detailItemRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemLabel}>营业额:</Text>
            <Text style={styles.detailItemValue}>{Amont}元</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemLabel}>消费人次:</Text>
            <Text style={styles.detailItemValue}>{InPeople}人次</Text>
          </View>
        </View>
        <View style={styles.detailItemRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemLabel}>在线时长:</Text>
            <Text style={styles.detailItemValue}>
              {this.getDateByMinute(TimeLongs)}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemLabel}>平均消费:</Text>
            <Text style={styles.detailItemValue}>
              {(+AveAmont).toFixed(2)}元/人
            </Text>
          </View>
        </View>
      </View>
    );
  }
  renderItem = item => {
    const {
      NickName,
      PayMoney,
      UserId,
      TimeLong,
      LastInDate,
      UserPhoto
    } = item;
    const getTimestamp = s => /\/Date\(([0-9]+)\)/.exec(s)[1];
    const date = new Date(+getTimestamp(LastInDate));
    return (
      <View style={styles.item}>
        <Image
          style={styles.portrait}
          source={UserPhoto ? { uri: UserPhoto } : portraitSource}
        />
        <View style={styles.itemContent}>
          <View style={styles.itemContentItem}>
            <Text style={styles.itemTitle}>{NickName}</Text>
            <Text style={styles.itemText}>消费:{PayMoney}元</Text>
          </View>
          <View style={styles.itemContentItem}>
            <Text style={styles.itemText}>ID:{UserId}</Text>
            <Text style={styles.itemText}>
              在线时长{TimeLong ? this.getDateByMinute(TimeLong) : "0分钟"}
            </Text>
          </View>
          <View style={styles.itemContentItem}>
            <Text style={styles.itemText}>
              最后到店时间：{moment(date).format("YYYY/MM/DD HH:mm")}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  renderList() {
    return (
      <View style={styles.listContainer}>
        <DataView
          getData={this.getData}
          ref={e => (this.dataRef = e)}
          isPulldownLoadMore={false}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: "#ccc" }} />
          )}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={(item, i) => i}
          style={{ flex: 1 }}
          ListEmptyComponent={
            <Text style={styles.noData}>暂时没有数据哦!</Text>
          }
        />
      </View>
    );
  }
  render() {
    return (
      <Page title="营业统计">
        <View style={styles.container}>
          {this.renderHeader()}
          {this.renderDetail()}
          {this.renderList()}
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
        </View>
      </Page>
    );
  }
}
