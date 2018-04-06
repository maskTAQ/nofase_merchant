import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Page, Button, Icon } from "src/components";
import api from "src/api";
import { Tip } from "src/common";
import styles from "./style";

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
    startTime: "请选择开始时间",
    startTimeDate: null,
    endTime: "请选择结束时间",
    endTimeDate: null,
    refreshing: false
  };

  componentWillMount() {
    this.getData();
  }
  store = {
    //保存自定义时间区的时间参数
    params: {}
  };
  onRefresh = () => {
    const { activeIndex } = this.state;
    const { dates } = this.store;
    const params = isNaN(activeIndex) ? this.store.params : dates[activeIndex];
    this.setState({ refreshing: true });
    Promise.all(
      this.getStoreBusInfoByDate(params, false),
      this.getStoreUserListByDate(params, false)
    ).then(res => {
      this.setState({ refreshing: false });
    });
  };
  getData = (p, isLoading) => {
    const { activeIndex } = this.state;
    const { dates } = this.store;
    const params = p || dates[activeIndex];
    this.getStoreBusInfoByDate(params, isLoading);
    this.getStoreUserListByDate(params, isLoading);
  };
  getStoreBusInfoByDate(params, isLoading) {
    return this.props
      .dispatch({
        type: "storeBusInfoByDate",
        api: () => {
          return api.getStoreBusInfoByDate(params, isLoading);
        },
        promise: true
      })
      .catch(e => {
        Tip.loading("getStoreBusInfoByDate:error");
        console.log("getStoreBusInfoByDate:error", e);
      });
  }
  getStoreUserListByDate(params, isLoading) {
    return this.props
      .dispatch({
        type: "storeUserListByDate",
        api: () => {
          return api.getStoreUserListByDate(params, isLoading);
        },
        promise: true
      })
      .catch(e => {
        Tip.loading("getStoreUserListByDate:error");
        console.log("getStoreUserListByDate:error", e);
      });
  }
  store = {
    currentSelectedTimtType: "",
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
          this.getData(this.store.params);
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
          this.getData(this.store.params);
        });
      }
    }

    this._hideDateTimePicker();
  };
  selectDateType(i) {
    this.setState(
      { activeIndex: i, startTimeDate: null, endTimeDate: null },
      () => {
        this.getData();
      }
    );
  }
  selectTime(type) {
    this.store.currentSelectedTimtType = type;
    this.setState({ isDateTimePickerVisible: true });
  }
  getDateByMinute(minute) {
    const pad = s => String(s).padStart("2", "0");
    const t = minute * 60;
    const d = Math.floor(t / (24 * 3600));
    const h = Math.floor((t - 24 * 3600 * d) / 3600);
    const m = Math.floor((t - 24 * 3600 * d - h * 3600) / 60);
    const s = Math.floor(t - 24 * 3600 * d - h * 3600 - m * 60);
    return pad(h) + ":" + pad(m) + ":" + pad(s);
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
    const {
      InPeople,
      TimeLongs,
      Amont,
      AveAmont
    } = this.props.storeBusInfoByDate;
    return (
      <View style={styles.detail}>
        <Text style={styles.detailTitle}>2017-12-21至2017-12-20 </Text>
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
            <Text style={styles.detailItemValue}>{TimeLongs}h</Text>
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
  renderItem(item) {
    const portraitSource = require("../current-user/img/u45.png");
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
    console.log(UserPhoto, "1212");
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
              在线时长{TimeLong ? this.getDateByMinute(TimeLong) : "00:00:00"}
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
  }
  renderList() {
    const { storeUserListByDate } = this.props;
    const { refreshing } = this.state;
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={storeUserListByDate}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: "#ccc" }} />
          )}
          onRefresh={this.onRefresh}
          refreshing={refreshing}
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
