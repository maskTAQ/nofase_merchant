import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import PropTypes from "prop-types";

import { Header, Button, Icon, Input } from "src/components";
import styles from "./style";
export default class CurrentUser extends Component {
    static defaultProps = {

    };
    static propTypes = {

    };
    state = {

    };
    renderHeader() {
        const data = [
            { label: '到店用户', value: '150/人' },
            { label: '消费时长', value: '2.5h' },
            { label: '平均消费', value: '32.5元' },
            { label: '当前在线', value: '19人' }
        ];
        return (
            <View style={styles.header}>
                <Header title="" LeftComponent={<View />} style={{ height: 40, backgroundColor: styles.header.backgroundColor }} />
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.headerTime}>2017 12-20</Text>
                        <Text style={styles.turnoverLabel}>今日营业额：</Text>
                    </View>
                    <View style={styles.calendarWrapper}>
                        <Button>
                            <Icon size={30} source={require('./img/u85.png')} />
                        </Button>
                    </View>
                </View>
                <Text style={styles.turnoverValue}>￥1400.00</Text>
                <View style={styles.headerList}>
                    {
                        data.map(item => {
                            const { label, value } = item;
                            return (
                                <View style={styles.headerListItem} key={label}>
                                    <Text style={styles.headerListItemLabel}>{label}</Text>
                                    <Text style={styles.headerListItemValue}>{value}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
    renderChoose() {
        return (
            <View style={styles.choose}>
                <View style={styles.chooseContent}>
                    <Button style={styles.chooseLabelWrapper}>
                        <Text style={styles.chooseLabel}>时长</Text>
                        <Icon size={14} source={require('./img/u41.png')} />
                    </Button>
                    <View style={styles.chooseBorder}></View>
                    <View style={styles.chooseInputContainer}>
                        <View style={styles.chooseInputContent}>
                            <Input style={styles.chooseInput} placeholder="名称/ID搜索在线用户" />
                            <View style={styles.chooseInputBorder}></View>
                            <Button>
                            <Icon size={20} source={require('./img/u36.png')} style={styles.chooseInputIcon} />
                            </Button>
                        </View>
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
                    <View style={styles.itemContentTop}>
                        <View style={styles.itemContentTopLeft}>
                            <View style={styles.itemTitle}>
                                <Text style={styles.itemName}>{name}</Text>
                                <View style={styles.warn}>
                                <Text style={styles.warnText}>余额不足</Text>
                                </View>
                            </View>
                            <Text style={styles.itemId}>{id}</Text>
                        </View>
                        <Button style={styles.stopButton} textStyle={styles.stopButtonText}>停止</Button>
                    </View>
                    <View style={styles.itemDetail}>
                        <Text style={styles.itemStartTime}>{startTime}</Text>
                        <Text style={styles.itemDuration}><Text style={styles.itemStartTime}>使用时长</Text>:{duration}</Text>
                    </View>
                </View>
            </View>
        )
    }
    renderList() {
        const data = [
            { portraitSource: require('./img/u45.png'), name: '奋斗的小鸟', id: 'ID:GYM_Y676556', startTime: '开始时间：17/14:30', duration: '00:12' },
            { portraitSource: require('./img/u45.png'), name: '奋斗的小鸟2', id: 'ID:GYM_Y676556', startTime: '开始时间：17/14:30', duration: '00:12' },
            { portraitSource: require('./img/u45.png'), name: '奋斗的小鸟3', id: 'ID:GYM_Y676556', startTime: '开始时间：17/14:30', duration: '00:12' },
            { portraitSource: require('./img/u45.png'), name: '奋斗的小鸟4', id: 'ID:GYM_Y676556', startTime: '开始时间：17/14:30', duration: '00:12' },
            { portraitSource: require('./img/u45.png'), name: '奋斗的小鸟5', id: 'ID:GYM_Y676556', startTime: '开始时间：17/14:30', duration: '00:12' },
            { portraitSource: require('./img/u45.png'), name: '奋斗的小鸟6', id: 'ID:GYM_Y676556', startTime: '开始时间：17/14:30', duration: '00:12' },
            { portraitSource: require('./img/u45.png'), name: '奋斗的小鸟7', id: 'ID:GYM_Y676556', startTime: '开始时间：17/14:30', duration: '00:12' },
            { portraitSource: require('./img/u45.png'), name: '奋斗的小鸟8', id: 'ID:GYM_Y676556', startTime: '开始时间：17/14:30', duration: '00:12' },
        ];

        return (
            <FlatList
                data={data}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={item => item.name + item.startTime}
                style={styles.listContainer}
            />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                {this.renderChoose()}
                {this.renderList()}
            </View>
        )
    }
}
