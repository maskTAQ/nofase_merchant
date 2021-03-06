import React, { Component } from "react";
import { View, Alert, ScrollView, Modal, Text } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { connect } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";

import action from "src/action";
import api from "src/api";
import { Tip } from "src/common";
import { computeSize } from "src/common";
import { Page, Button, Table, Input } from "src/components";
import styles from "./style";

class SelectTimeModal extends Component {
  static defaultProps = {
    isVisible: false
  };
  static propTypes = {
    requestChangeTime: PropTypes.func,
    rowData: PropTypes.object,
    rowIndex: PropTypes.number,
    isVisible: PropTypes.bool,
    close: PropTypes.func
  };
  state = {
    isDateTimePickerVisible: false,
    dateTimePickerType: "none" //STime end ETime,
  };
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    const time = moment(date).format("HH:mm");
    const { requestChangeTime, rowIndex } = this.props;
    const { dateTimePickerType } = this.state;
    requestChangeTime(time, rowIndex, dateTimePickerType);

    return this._hideDateTimePicker();
  };
  render() {
    const { isDateTimePickerVisible } = this.state;
    const { isVisible, rowData, close } = this.props;

    const { STime, ETime } = rowData || {};
    return (
      <Modal
        animationType="fade"
        onRequestClose={() => {}}
        transparent={true}
        visible={isVisible}
      >
        <View style={{ flex: 1 }} />
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>选择时间区</Text>
          <View style={styles.inputGroup}>
            <Button
              onPress={() => {
                this.setState({
                  isDateTimePickerVisible: true,
                  dateTimePickerType: "STime"
                });
              }}
              style={styles.startTimeButton}
              textStyle={{ color: "#289fe4" }}
            >
              {STime || "--/--"}
            </Button>
            <Text>至</Text>
            <Button
              onPress={() => {
                this.setState({
                  isDateTimePickerVisible: true,
                  dateTimePickerType: "ETime"
                });
              }}
              style={styles.endTimeButton}
              textStyle={{ color: "#289fe4" }}
            >
              {ETime || "--/--"}
            </Button>
          </View>
          <View style={styles.buttonGroup}>
            <Button
              onPress={close}
              style={styles.cancel}
              textStyle={styles.cancelText}
            >
              取消
            </Button>
            <Button
              onPress={close}
              style={styles.complete}
              textStyle={styles.completelText}
            >
              完成
            </Button>
          </View>
        </View>
        <DateTimePicker
          is24Hour={true}
          mode="time"
          isVisible={isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          cancelTextIOS="取消"
          confirmTextIOS="确定"
          titleIOS="选择时间"
        />
      </Modal>
    );
  }
}
@connect(state => {
  const { newStoreInfo, auth: { StoreId } } = state;
  return { newStoreInfo, StoreId };
})
export default class Timetable extends Component {
  static defaultProps = {};
  static propTypes = {
    navigation: PropTypes.object,
    newStoreInfo: PropTypes.object,
    StoreId: PropTypes.number
  };
  state = {
    dataSource: [
      // {
      //   STime: '',
      //   ETime: '',
      //   Week0: "",
      //   Week1: "",
      //   Week2: "",
      //   Week3: "",
      //   Week4: "",
      //   Week5: "",
      //   Week6: "",
      //   deleteButton: ""
      // }
    ],
    currentActiveRow: null,
    currentActiveRowIndex: NaN,
    isTimeChoosePanelVisible: false
  };
  componentWillMount() {
    const { StoreId } = this.props;
    this.getCurriculum(StoreId);
  }
  getCurriculum(StoreId) {
    api
      .getCurriculum({ StoreId })
      .then(res => {
        const dataSource = res
          .sort((prev, next) => prev.Id - next.Id)
          .map(item => {
            item.deleteButton = item.StoreId;
            return item;
          });
        this.setState({
          dataSource
        });
      })
      .catch(e => {
        console.log(e);
        Tip.fail("初始化课程表信息失败");
      });
  }
  store = {
    columns: [
      {
        title: "时间",
        dataIndex: "STime",
        render: (row, value, fiedIndex, index) => {
          const { STime, ETime } = row;
          let label = "";

          switch (true) {
            case !!STime && !!ETime:
              label = STime + "至" + ETime;
              break;
            case !!STime:
              label = STime + "至" + "?";
              break;
            case !!ETime:
              label = "?" + "至" + ETime;
              break;
            default:
              label = "?至?";
              break;
          }
          const c = label.split("至");
          c.splice(1, 0, "——");

          return (
            <Button
              onPress={() => this.selectTimeRange(row, index)}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {c.map((item, i) => {
                return (
                  <Text
                    key={i}
                    style={[
                      {
                        fontSize: item === "——" ? 6 : computeSize(10),
                        color: "#1a97df"
                      }
                    ]}
                  >
                    {item}
                  </Text>
                );
              })}
            </Button>
          );
        }
      },
      {
        title: "周一",
        ...this.createCommonValueByDataIndex("Week1")
      },
      {
        title: "周二",
        ...this.createCommonValueByDataIndex("Week2")
      },
      {
        title: "周三",
        ...this.createCommonValueByDataIndex("Week3")
      },
      {
        title: "周四",
        ...this.createCommonValueByDataIndex("Week4")
      },
      {
        title: "周五",
        ...this.createCommonValueByDataIndex("Week5")
      },
      {
        title: "周六",
        ...this.createCommonValueByDataIndex("Week6")
      },
      {
        title: "周日",
        ...this.createCommonValueByDataIndex("Week0")
      },
      {
        title: "删除",
        dataIndex: "deleteButton",
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
          <View style={{ width: "100%", height: "100%" }}>
            <Input
              value={value}
              onChangeText={v => this.handleValueChange(v, rowIndex, dataIndex)}
              style={styles.input}
              clearButtonMode="never"
            />
          </View>
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
      STime: "",
      ETime: "",
      Week0: "",
      Week1: "",
      Week2: "",
      Week3: "",
      Week4: "",
      Week5: "",
      Week6: "",
      deleteButton: ""
    });

    this.setState({
      dataSource: nextDataSource
    });
  };

  selectTimeRange = (row, i) => {
    this.setState({
      isTimeChoosePanelVisible: true,
      currentActiveRow: row,
      currentActiveRowIndex: i
    });
  };
  save = () => {
    const { dataSource } = this.state;
    const { StoreId } = this.props;
    api
      .saveCurriculum({ CurrJson: JSON.stringify(dataSource), StoreId })
      .then(res => {
        return this.props.navigation.dispatch(action.navigate.back());
      })
      .catch(e => {
        console.log(e);
        Tip.fail("保存失败");
      });
  };
  render() {
    const { columns } = this.store;
    const {
      dataSource,
      isTimeChoosePanelVisible,
      currentActiveRow,
      currentActiveRowIndex
    } = this.state;
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

        <SelectTimeModal
          isVisible={!!isTimeChoosePanelVisible}
          rowData={currentActiveRow}
          rowIndex={currentActiveRowIndex}
          close={() => {
            this.setState({
              isTimeChoosePanelVisible: false
            });
          }}
          requestChangeTime={(value, index, type) => {
            const data = Object.assign([], this.state.dataSource);
            data[index][type] = value;
            this.setState({
              dataSource: data
            });
          }}
        />
        <SelectTimeModal />
      </Page>
    );
  }
}
