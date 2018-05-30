import { computeSize } from "src/common";
export default {
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4"
  },
  chooseDay: {
    marginTop: computeSize(5),
    flexDirection: "row",
    padding: computeSize(5),
    justifyContent: "space-around",
    backgroundColor: "#fff"
  },
  dayItem: {
    height: computeSize(22),
    paddingLeft: computeSize(8),
    paddingRight: computeSize(8),
    justifyContent: "center",
    borderRadius: computeSize(6),
    backgroundColor: "#1e9ce4"
  },
  dayItemText: {
    fontSize: computeSize(14),
    color: "#fff"
  },
  dayActiveItem: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#1e9ce4"
  },
  dayActiveItemText: {
    color: "#1e9ce4"
  },
  chooseTime: {
    marginTop: computeSize(5),
    flexDirection: "row",
    paddingLeft: computeSize(5),
    paddingRight: computeSize(5),
    alignItems: "center",
    backgroundColor: "#fff"
  },
  chooseTimeLabel: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#039AE7"
  },
  inputWrapper: {
    flex: 1,
    margin: computeSize(6),
    height: computeSize(25),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: computeSize(6),
    borderWidth: 1,
    borderColor: "#039AE7"
  },
  inputButton: {
    flex: 1,
    alignItems: "center"
  },
  inputText: {
    fontSize: computeSize(12),
    color: "#999"
  },
  zhi: {
    fontSize: computeSize(12),
    color: "#999"
  },
  chooseTimeButton: {
    // padding: 10
  },
  detail: {
    marginTop: computeSize(5),
    paddingTop: computeSize(6),
    paddingLeft: computeSize(10),
    paddingRight: computeSize(10),
    paddingBottom: computeSize(10),
    backgroundColor: "#fff"
  },
  detailTitle: {
    lineHeight: computeSize(20),
    fontSize: computeSize(12),
    color: "#999"
  },
  detailItemRow: {
    flexDirection: "row",
    height: computeSize(20),
    alignItems: "center"
  },
  detailItem: {
    flex: 1,
    flexDirection: "row"
  },
  detailItemLabel: {
    width: computeSize(60),
    fontSize: computeSize(12),
    color: "#999"
  },
  detailItemValue: {
    fontSize: computeSize(12),
    fontWeight: "bold",
    color: "#f8b84a"
  },
  listContainer: {
    flex: 1,
    paddingTop: 5
  },
  item: {
    // height: computeSize(66),
    paddingLeft: computeSize(12),
    paddingRight: computeSize(12),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  portraitWrapper: {
    width: computeSize(56),
    height: computeSize(56),
    borderRadius: computeSize(56),
    overflow: "hidden"
  },
  portrait: {
    width: computeSize(56),
    height: computeSize(56)
  },

  itemContent: {
    flex: 1,
    paddingLeft: computeSize(15),
    paddingTop: computeSize(4),
    paddingBottom: computeSize(4)
  },
  itemContentItem: {
    flex: 1,
    flexDirection: "row",
    height: computeSize(20),
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemTitle: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#333"
  },
  itemText: {
    fontSize: computeSize(12),
    color: "#999"
  },
  noData: {
    paddingLeft: computeSize(15),
    color: "#333"
  }
};
