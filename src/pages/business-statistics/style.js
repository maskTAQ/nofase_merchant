import { mainColor, normalColor, activeColor } from 'src/color';
export default {
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    chooseDay: {
        flexDirection: 'row',
        paddingTop: 12,
        paddingBottom: 12,
        justifyContent: 'space-around',
    },
    dayItem: {
        height: 22,
        paddingLeft: 8,
        paddingRight: 8,
        justifyContent: 'center',
        borderRadius: 6,
        backgroundColor: '#1e9ce4',
    },
    dayItemText: {
        fontSize: 14,
        color: '#fff',
    },
    chooseTime: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chooseTimeLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#039AE7'
    },
    inputWrapper: {
        flex: 1,
        margin: 6,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#039AE7',
    },
    inputValue: {
        fontSize: 12,
        color: normalColor
    },
    chooseTimeButton: {
        padding: 10
    },
    detail: {
        paddingTop: 6,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        backgroundColor: '#f9f9f9',
    },
    detailTitle: {
        lineHeight: 20,
        fontSize: 12,
        color: normalColor,
    },
    detailItem: {
        width: '50%',
        height: 20,
        flexDirection: 'row',

    },
    detailItemRow: {
        flexDirection: 'row',
        height: 20,
        alignItems: 'center',
    },
    detailItem: {
        flex: 1,
        flexDirection: 'row',
    },
    detailItemLabel: {
        fontSize: 12,
        color: normalColor
    },
    detailItemValue: {
        fontSize: 12,
        fontWeight: 'bold',

        color: '#FF6600'
    },
    listContainer: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 15,
       
    },
    item: {
        height: 66,
        flexDirection: 'row',
        
        alignItems: 'center',
    },
    portrait: {
        width: 56,
        height: 56,
    },

    itemContent: {
        flex: 1,
        paddingLeft: 5,
    },
    itemContentItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: mainColor
    },
    itemText: {
        fontSize: 12,
        color: normalColor
    }
}