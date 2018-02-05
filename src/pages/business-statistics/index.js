import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import PropTypes from "prop-types";

import { Page, Button, Icon } from "src/components";
import styles from "./style";
export default class BusinessStatistics extends Component {
    static defaultProps = {

    };
    static propTypes = {

    };
    state = {
        activeIndex: 0
    };
    renderChooseDay() {
        const { activeIndex } = this.state;
        const days = ['所有', '当日', '上一日', '三日', '十日', '本月'];
        return (
            <View style={styles.chooseDay}>
                {
                    days.map(day => {
                        return (
                            <Button style={styles.dayItem} textStyle={styles.dayItemText} key={day}>
                                {day}
                            </Button>
                        )
                    })
                }
            </View>
        )
    }
    renderChooseTime() {
        return (
            <View style={styles.chooseTime}>
                <Text style={styles.chooseTimeLabel}>自定义时间区:</Text>
                <View style={styles.inputWrapper}>
                    <Text>2017-11-15 至 2017-12-15</Text>
                </View>
                <Button style={styles.chooseTimeButton}>
                    <Icon size={24} source={require('./img/u33.png')} />
                </Button>
            </View>
        )
    }
    renderHeader() {
        return (
            <View style={styles.header}>
                {this.renderChooseDay()}
                {this.renderChooseTime()}
            </View>
        )
    }
    renderDetail() {
        const data = [
            { label: '营业额', value: '3220,90' },
            { label: '消费人次', value: '311' },
            { label: '在线时长', value: '1313,3' },
            { label: '平均消费', value: '32.1' },
        ];
        return (
            <View style={styles.detail}>
                <Text style={styles.detailTitle}>2017-12-21至2017-12-20 </Text>
                <View style={styles.detailItemRow}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailItemLabel}>营业额:</Text>
                        <Text style={styles.detailItemValue}>313元</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailItemLabel}>消费人次:</Text>
                        <Text style={styles.detailItemValue}>215人次</Text>
                    </View>
                </View>
                <View style={styles.detailItemRow}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailItemLabel}>在线时长:</Text>
                        <Text style={styles.detailItemValue}>313。3</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailItemLabel}>平均消费:</Text>
                        <Text style={styles.detailItemValue}>32.4元/人</Text>
                    </View>
                </View>
            </View>
        )
    }
    renderItem(item) {
        const { portraitSource, name, id, startTime, duration } = item;
        return (
            <View style={styles.item}>
                <Image style={styles.portrait} source={portraitSource} />
                <View style={styles.itemContent}>
                    <View style={styles.itemContentItem}>
                        <Text style={styles.itemTitle}>{name}</Text>
                        <Text style={styles.itemText}>消费:24.5元</Text>
                    </View>
                    <View style={styles.itemContentItem}>
                        <Text style={styles.itemText}>ID:GYM_Y676556</Text>
                        <Text style={styles.itemText}>在线时长3:21</Text>
                    </View>
                    <View style={styles.itemContentItem}>
                        <Text style={styles.itemText}>最后到店时间：2017-12-11 15:30</Text>
                    </View>
                </View>
            </View>
        )
    }
    renderList() {
        const icon = require('../current-user/img/u45.png');
        const data = [
            { portraitSource: icon, name: '奋斗的小鸟', id: 'ID:GYM_Y676556', startTime: '开始时间：17/14:30', duration: '00:12' },
            { portraitSource: icon, name: '奋斗的小鸟2', id: 'ID:GYM_Y676556', startTime: '开始时间：17/14:30', duration: '00:12' },
            { portraitSource: icon, name: '奋斗的小鸟3', id: 'ID:GYM_Y676556', startTime: '开始时间：17/14:30', duration: '00:12' },
            { portraitSource: icon, name: '奋斗的小鸟4', id: 'ID:GYM_Y676556', startTime: '开始时间：17/14:30', duration: '00:12' },
            { portraitSource: icon, name: '奋斗的小鸟5', id: 'ID:GYM_Y676556', startTime: '开始时间：17/14:30', duration: '00:12' },
            { portraitSource: icon, name: '奋斗的小鸟6', id: 'ID:GYM_Y676556', startTime: '开始时间：17/14:30', duration: '00:12' },
            { portraitSource: icon, name: '奋斗的小鸟7', id: 'ID:GYM_Y676556', startTime: '开始时间：17/14:30', duration: '00:12' },
            { portraitSource: icon, name: '奋斗的小鸟8', id: 'ID:GYM_Y676556', startTime: '开始时间：17/14:30', duration: '00:12' },
        ];

        return (
            <View style={styles.listContainer}>
                <FlatList
                    data={data}
                    ItemSeparatorComponent={() => (<View style={{ height: 1, backgroundColor: '#333', }}></View>)}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={item => item.name + item.startTime}
                    style={{flex:1,}}
                />
            </View>
        )
    }
    render() {
        return (
            <Page title="营业统计">
                <View style={styles.container}>
                    {this.renderHeader()}
                    {this.renderDetail()}
                    {this.renderList()}
                </View>
            </Page>
        )
    }
}
