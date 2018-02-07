import React, { Component } from "react";
import { View, Alert, ScrollView } from "react-native";
//import PropTypes from "prop-types";

import { Page, Button, Table, Input } from "src/components";
import styles from "./style";

export default class Timetable extends Component {
  static defaultProps = {};
  static propTypes = {};
  state = {
    dataSource: [
      {
        a: "选择时间区",
        b: "",
        c: "",
        d: "",
        e: "",
        f: "",
        i: "",
        j: "",
        k: ""
      },
      {
        a: "选择时间区",
        b: "",
        c: "",
        d: "",
        e: "",
        f: "",
        i: "",
        j: "",
        k: ""
      },
      {
        a: "选择时间区",
        b: "",
        c: "",
        d: "",
        e: "",
        f: "",
        i: "",
        j: "",
        k: ""
      },
      {
        a: "选择时间区",
        b: "",
        c: "",
        d: "",
        e: "",
        f: "",
        i: "",
        j: "",
        k: ""
      },
      {
        a: "选择时间区",
        b: "",
        c: "",
        d: "",
        e: "",
        f: "",
        i: "",
        j: "",
        k: ""
      },
      {
        a: "选择时间区",
        b: "",
        c: "",
        d: "",
        e: "",
        f: "",
        i: "",
        j: "",
        k: ""
      },
      {
        a: "选择时间区",
        b: "",
        c: "",
        d: "",
        e: "",
        f: "",
        i: "",
        j: "",
        k: ""
      },
      {
        a: "选择时间区",
        b: "",
        c: "",
        d: "",
        e: "",
        f: "",
        i: "",
        j: "",
        k: ""
      }
    ]
  };

  store = {
    columns: [
      {
        title: "时间",
        dataIndex: "a",
        render(row, value, index) {
          return <Button textStyle={styles.selectTime}>{value}</Button>;
        }
      },
      {
        title: "周一",
        ...this.createCommonValueByDataIndex("b")
      },
      {
        title: "周二",
        ...this.createCommonValueByDataIndex("c")
      },
      {
        title: "周三",
        ...this.createCommonValueByDataIndex("d")
      },
      {
        title: "周四",
        ...this.createCommonValueByDataIndex("e")
      },
      {
        title: "周五",
        ...this.createCommonValueByDataIndex("f")
      },
      {
        title: "周六",
        ...this.createCommonValueByDataIndex("i")
      },
      {
        title: "周日",
        ...this.createCommonValueByDataIndex("j")
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
          console.log(nextDataSource);

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
      a: "选择时间区",
      b: "",
      c: "",
      d: "",
      e: "",
      f: "",
      i: "",
      j: "",
      k: ""
    });

    this.setState({
      dataSource: nextDataSource
    });
  };
  render() {
    const { columns } = this.store;
    const { dataSource } = this.state;
    return (
      <Page title="课程表">
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
      </Page>
    );
  }
}
