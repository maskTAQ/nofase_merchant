import React, { Component } from "react";
import { View, Text, ScrollView, Modal } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
//import { connect } from "react-redux";
import moment from "moment";
//import PropTypes from "prop-types";

import api from "src/api";
import { Tip } from "src/common";
import { Page, Button, Table, Input, Alert } from "src/components";
import styles from "./style";

const SelectTimeModal = props => {
  return (
    <Modal
      animationType="fade"
      onRequestClose={() => {}}
      transparent={true}
      visible={true}
    >
      <View style={{ flex: 1 }} />
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>选择时间区</Text>
        <View style={styles.inputGroup}>
          <Button style={styles.starttime}>--/--</Button>
          <Text>至</Text>
          <Button style={styles.endtime}>--/--</Button>
        </View>
        <View style={styles.buttonGroup}>
          <Button style={styles.cancel} textStyle={styles.cancelText}>
            取消
          </Button>
          <Button style={styles.complete} textStyle={styles.completelText}>
            完成
          </Button>
        </View>
      </View>
    </Modal>
  );
};
export default class Timetable extends Component {
  static defaultProps = {};
  static propTypes = {};
  state = {
    dataSource: [
      {
        timeRange: "选择时间区",
        Week0: "",
        Week1: "",
        Week2: "",
        Week3: "",
        Week4: "",
        Week5: "",
        Week6: "",
        k: ""
      }
    ],
    dateTimePickerType: "none", //start end none,
    dateTimePickerIndex: NaN
  };
  componentWillMount() {
    api
      .getCurriculumList()
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  }
  store = {
    columns: [
      {
        title: "时间",
        dataIndex: "timeRange",
        render: (row, value, index) => {
          return (
            <Button
              onPress={() => this.selectTimeRange(index)}
              textStyle={styles.selectTime}
            >
              {value}
            </Button>
          );
        }
      },
      {
        title: "周一",
        ...this.createCommonValueByDataIndex("Week0")
      },
      {
        title: "周二",
        ...this.createCommonValueByDataIndex("Week1")
      },
      {
        title: "周三",
        ...this.createCommonValueByDataIndex("Week2")
      },
      {
        title: "周四",
        ...this.createCommonValueByDataIndex("Week3")
      },
      {
        title: "周五",
        ...this.createCommonValueByDataIndex("Week4")
      },
      {
        title: "周六",
        ...this.createCommonValueByDataIndex("Week5")
      },
      {
        title: "周日",
        ...this.createCommonValueByDataIndex("Week6")
      },
      {
        title: "删除",
        dataIndex: "k",
        render: (row, value, i, index) => {
          return (
            <Button
              onPress={() => this.deleteRow(index)}
              style={styles.deleteButton}
              textStyle={styles.deleteText}
            >
              删除
            </Button>
          );
        }
      }
    ]
  };
  deleteRow(i) {
    Alert.alert("警告!", `确定删除第${i + 1}行的课程数据吗?`, [
      {
        text: "取消"
      },
      {
        text: "确定",
        onPress: () => {
          const nextDataSource = Object.assign([], this.state.dataSource);
          nextDataSource.splice(i, 1);
          this.setState({
            dataSource: nextDataSource
          });
        }
      }
    ]);
  }
  createCommonValueByDataIndex(dataIndex) {
    return {
      dataIndex,
      render: (row, value, columnsIndex, rowIndex) => {
        return (
          <Input
            value={value}
            onChangeText={v => this.handleValueChange(v, rowIndex, dataIndex)}
            style={styles.input}
            clearButtonMode="never"
          />
        );
      }
    };
  }
  handleValueChange(v, i, k) {
    const nextDataSource = Object.assign([], this.state.dataSource);
    nextDataSource[i][k] = v;

    this.setState({
      dataSource: nextDataSource
    });
  }

  addRow = () => {
    const nextDataSource = Object.assign([], this.state.dataSource);
    nextDataSource.push({
      timeRange: "选择时间区",
      Week0: "",
      Week1: "",
      Week2: "",
      Week3: "",
      Week4: "",
      Week5: "",
      Week6: "",
      k: ""
    });

    this.setState({
      dataSource: nextDataSource
    });
  };
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    const time = moment(date).format("HH:mm");
    const { dataSource } = this.state;
    const { dateTimePickerIndex, dateTimePickerType } = this.state;
    if (dateTimePickerType === "start") {
      console.log(dataSource, dateTimePickerIndex);
      dataSource[dateTimePickerIndex].timeRange = time;

      this.setState({
        dataSource,
        dateTimePickerType: "end"
      });
      return Tip.success("选择起始时间成功");
    } else {
      dataSource[dateTimePickerIndex].timeRange += `-${time}`;
      this.setState({
        dataSource,
        dateTimePickerType: "none",
        dateTimePickerIndex: NaN
      });
      //Tip.success("选择结束时间成功");
    }

    return this._hideDateTimePicker();
  };
  selectTimeRange = i => {
    this.setState({
      isDateTimePickerVisible: true,
      dateTimePickerType: "start",
      dateTimePickerIndex: i
    });
  };
  save = () => {
    const { dataSource } = this.state;
    console.log(dataSource);
    api
      .saveCurriculum({ data: dataSource })
      .then(res => {
        Tip.success("保存成功");
      })
      .catch(e => {
        Tip.fail("保存失败");
      });
  };
  render() {
    const { columns } = this.store;
    const { dataSource } = this.state;
    return (
      <Page
        title="课程表"
        RightComponent={
          <Button
            onPress={this.save}
            textStyle={{ color: "#fff", fontWeight: "bold" }}
          >
            保存
          </Button>
        }
      >
        <View style={styles.container}>
          <ScrollView style={{ flex: 1 }}>
            <Table
              columns={columns}
              dataSource={dataSource}
              style={{
                th: { paddingLeft: 0, alignItems: "center" },
                td: { paddingLeft: 0 }
              }}
            />
            <Button
              onPress={this.addRow}
              style={styles.addButton}
              textStyle={styles.addButtonText}
            >
              添加一组
            </Button>
          </ScrollView>
        </View>
        <DateTimePicker
          is24Hour={true}
          mode="time"
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
        <SelectTimeModal />
      </Page>
    );
  }
}
