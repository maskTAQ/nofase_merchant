import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Page, Button, Icon } from "src/components";
import { EventHub } from "src/common";
import styles from "./style";

@connect(state => {
  const { storeBusInfoByDate, storeUserListByDate } = state;
  return { storeBusInfoByDate, storeUserListByDate };
})
export default class BusinessStatistics extends Component {
  static propTypes = {
    storeBusInfoByDate: PropTypes.object,
    navigation: PropTypes.object,
    storeUserListByDate: PropTypes.object
  };
  state = {
    activeIndex: 0,
    isDateTimePickerVisible: false,
    startTime: "请选择开始时间",
    startTimeDate: null,
    endTime: "请选择结束时间",
    endTimeDate: null,
    storeBusInfoByDate: {
      Amont: "-",
      InPeople: "-",
      TimeLongs: "-",
      AveAmont: "-"
    }
  };

  componentWillMount() {
    const { activeIndex } = this.state;
    const { dates } = this.store;
    EventHub.emit(
      "dispatch",
      "getStoreBusInfoByDate",
      "storeBusInfoByDate",
      dates[activeIndex]
    );
    EventHub.emit(
      "dispatch",
      "getStoreUserListByDate",
      "storeUserListByDate",
      dates[activeIndex]
    );
  }
  componentWillReceiveProps(nextProps) {
    this.updateStoreData(nextProps);
    this.updateStoreUserListData(nextProps);
  }
  updateStoreData(props) {
    const { status, data } = props.storeBusInfoByDate;
    if (
      status === "success" &&
      this.props.storeBusInfoByDate.status !== "success"
    ) {
      this.setState({
        storeBusInfoByDate: { ...eval("(" + data + ")") }
      });
      return;
    }
  }
  updateStoreUserListData(props) {
    const { status, data } = props.storeUserListByDate;
    if (
      status === "success" &&
      this.props.storeUserListByDate.status !== "success"
    ) {
      this.setState({
        storeUserListByDate: data
      });
      return;
    }
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
        this.setState({ activeIndex: NaN });
        EventHub.emit(
          "dispatch",
          "getStoreBusInfoByDate",
          "storeBusInfoByDate",
          {
            SDate: `${moment(date).format("YYYY-MM-DD")} 00:00:00`,
            EDate: `${moment(endTimeDate).format("YYYY-MM-DD")} 23:59:59`
          }
        );
        EventHub.emit(
          "dispatch",
          "getStoreUserListByDate",
          "storeUserListByDate",
          {
            SDate: `${moment(date).format("YYYY-MM-DD")} 00:00:00`,
            EDate: `${moment(endTimeDate).format("YYYY-MM-DD")} 23:59:59`
          }
        );
      }
    } else {
      this.setState({
        endTime: time,
        endTimeDate: date
      });
      if (startTimeDate) {
        this.setState({ activeIndex: NaN });
        EventHub.emit(
          "dispatch",
          "getStoreBusInfoByDate",
          "storeBusInfoByDate",
          {
            SDate: `${moment(startTimeDate).format("YYYY-MM-DD")} 00:00:00`,
            EDate: `${moment(date).format("YYYY-MM-DD")} 23:59:59`
          }
        );
        EventHub.emit(
          "dispatch",
          "getStoreUserListByDate",
          "storeUserListByDate",
          {
            SDate: `${moment(startTimeDate).format("YYYY-MM-DD")} 00:00:00`,
            EDate: `${moment(date).format("YYYY-MM-DD")} 23:59:59`
          }
        );
      }
    }

    this._hideDateTimePicker();
  };
  selectDateType(i) {
    const { dates } = this.store;
    this.setState({ activeIndex: i, startTimeDate: null, endTimeDate: null });
    EventHub.emit(
      "dispatch",
      "getStoreBusInfoByDate",
      "storeBusInfoByDate",
      dates[i]
    );
    EventHub.emit(
      "dispatch",
      "getStoreUserListByDate",
      "storeUserListByDate",
      dates[i]
    );
  }
  selectTime(type) {
    this.store.currentSelectedTimtType = type;
    this.setState({ isDateTimePickerVisible: true });
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
    } = this.state.storeBusInfoByDate;
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
            <Text style={styles.detailItemValue}>{AveAmont}元/人</Text>
          </View>
        </View>
      </View>
    );
  }
  renderItem(item) {
    const { portraitSource, name, id, duration } = item;
    return (
      <View style={styles.item}>
        <Image style={styles.portrait} source={portraitSource} />
        <View style={styles.itemContent}>
          <View style={styles.itemContentItem}>
            <Text style={styles.itemTitle}>{name}</Text>
            <Text style={styles.itemText}>消费:24.5元</Text>
          </View>
          <View style={styles.itemContentItem}>
            <Text style={styles.itemText}>{id}</Text>
            <Text style={styles.itemText}>在线时长{duration}</Text>
          </View>
          <View style={styles.itemContentItem}>
            <Text style={styles.itemText}>最后到店时间：2017-12-11 15:30</Text>
          </View>
        </View>
      </View>
    );
  }
  renderList() {
    const icon = require("../current-user/img/u45.png");
    const data = [
      {
        portraitSource: icon,
        name: "奋斗的小鸟",
        id: "ID:GYM_Y676556",
        startTime: "开始时间：17/14:30",
        duration: "00:12"
      },
      {
        portraitSource: icon,
        name: "奋斗的小鸟2",
        id: "ID:GYM_Y676556",
        startTime: "开始时间：17/14:30",
        duration: "00:12"
      },
      {
        portraitSource: icon,
        name: "奋斗的小鸟3",
        id: "ID:GYM_Y676556",
        startTime: "开始时间：17/14:30",
        duration: "00:12"
      },
      {
        portraitSource: icon,
        name: "奋斗的小鸟4",
        id: "ID:GYM_Y676556",
        startTime: "开始时间：17/14:30",
        duration: "00:12"
      },
      {
        portraitSource: icon,
        name: "奋斗的小鸟5",
        id: "ID:GYM_Y676556",
        startTime: "开始时间：17/14:30",
        duration: "00:12"
      },
      {
        portraitSource: icon,
        name: "奋斗的小鸟6",
        id: "ID:GYM_Y676556",
        startTime: "开始时间：17/14:30",
        duration: "00:12"
      },
      {
        portraitSource: icon,
        name: "奋斗的小鸟7",
        id: "ID:GYM_Y676556",
        startTime: "开始时间：17/14:30",
        duration: "00:12"
      },
      {
        portraitSource: icon,
        name: "奋斗的小鸟8",
        id: "ID:GYM_Y676556",
        startTime: "开始时间：17/14:30",
        duration: "00:12"
      }
    ];

    return (
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: "#ccc" }} />
          )}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item.name + item.startTime}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
  render() {
    const { storeUserListByDate } = this.props;
    console.log(storeUserListByDate);
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
