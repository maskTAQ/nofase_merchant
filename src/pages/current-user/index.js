import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import { Header, Button } from "src/components";
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
                <Header title="" LeftComponent={null} style={styles.header.backgroundColor} />
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.headerTime}></Text>
                        <Text style={styles.turnoverLabel}></Text>
                    </View>
                    <View>
                        <Button>
                            <Icon size={20} socuce={require('')} />
                        </Button>
                    </View>
                </View>
                <View style={styles.turnoverValue}></View>
                <View style={styles.headerList}>
                    {
                        data.map(item => {
                            const { label, value } = item;
                            return (
                                <View style={styles.headerListItem}>
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
                <Button style={styles.chooseLabelWrapper}>
                    <Text style={styles.chooseLabel}>时长</Text>
                    <Icon size={14} source={require()} />
                </Button>
                <View style={stylesc.chooseBorder}></View>
                <View style={styles.chooseInputWrapper}>
                    <Input style={styles.chooseInput} placeholder="名称/ID搜索在线用户" />
                    <View style={stylesc.chooseInputBorder}></View>
                    <Icon size={14} source={require()} />
                </View>
            </View>
        )
    }
    renderItem(item) {
        const { portraitSource, name, id, startTime, duration } = item;
        return (
            <View style={styles.item}>
                <Iamge style={styles.portrait} />
                <View style={styles.itemContent}>
                    <View style={styles.itemContentTop}>
                        <View style={styles.itemContentTop}>
                            <Text style={styles.itemName}>{name}</Text>
                            <Text style={styles.itemId}>{id}</Text>
                        </View>
                        <Button style={styless.stopButton}></Button>
                    </View>
                    <View style={styles.itemDetail}>
                        <Text style={styles.itemStartTime}>{startTime}</Text>
                        <Text style={styles.itemDuration}>{duration}</Text>
                    </View>
                </View>
            </View>
        )
    }
    renderList() {
        const data = [
            { portraitSource: require(), name: '', id: '', startTime: '', duration: '' }
        ];

        return (
            <FlatList
                data={[{ key: 'a' }, { key: 'b' }]}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={({ item }) => item.id + item.startTime}
                style={styles.listContianer} />
        )
    }
    render() {
        return (
            <View style={styles.contianer}>
                {this.renderHeader()}
                {this.renderChoose()}
                {this.renderList()}
            </View>
        )
    }
}
