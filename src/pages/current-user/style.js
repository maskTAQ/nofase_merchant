import { computeSize } from "src/common";
export default {
  container: {
    flex: 1,
    backgroundColor: "#e3e3e3"
  },
  statusBar: {
    height: computeSize(20),
    paddingTop: computeSize(18)
  },
  header: {
    position: "relative"
  },
  headerContent: {
    paddingLeft: computeSize(12),
    paddingRight: computeSize(12)
  },
  headerBG: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%"
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  headerTime: {
    fontSize: computeSize(14),
    color: "#fff",
    fontWeight: "bold",
    lineHeight: computeSize(30)
  },
  turnoverLabel: {
    fontSize: computeSize(15),
    fontWeight: "bold",
    color: "#fff"
  },
  turnoverValueWrapper: {
    height: computeSize(52),
    paddingTop: computeSize(10),
    alignItems: "center"
  },
  turnoverValue: {
    fontSize: computeSize(34),
    fontWeight: "bold",
    color: "#fff"
  },
  headerList: {
    flexDirection: "row",
    paddingTop: computeSize(10),
    paddingBottom: computeSize(10)
  },
  headerListItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headerListItemLabel: {
    fontSize: computeSize(13),
    lineHeight: computeSize(30),
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff"
  },
  headerListItemValue: {
    fontSize: computeSize(18),
    fontWeight: "bold",
    textAlign: "center",
    color: "#e47b2c"
  },
  choose: {
    height: computeSize(40),
    margin: computeSize(4),
    marginBottom: 0,
    backgroundColor: "#fff"
  },
  chooseContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  chooseLabelWrapper: {
    width: computeSize(80),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  chooseBorder: {
    height: "80%",
    width: computeSize(2),
    backgroundColor: "#f9f9f9"
  },
  chooseInputContainer: {
    flex: 1,
    paddingTop: computeSize(6),
    paddingLeft: computeSize(10),
    paddingRight: computeSize(10),
    paddingBottom: computeSize(6)
  },
  chooseInputContent: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
    // borderRadius: computeSize(8),
    // borderWidth: 1.computeSize(5),
    // borderColor: "#23cdfd"
  },
  chooseLabel: {
    color: "#4ca1a6"
  },
  chooseInput: {
    flex: 1,
    paddingLeft: computeSize(30)
  },
  chooseInputBorder: {
    width: 1,
    height: "80%",
    backgroundColor: "#f9f9f9"
  },
  chooseInputIcon: {
    padding: computeSize(6)
  },
  listContainer: {
    flex: 1,
    margin: computeSize(4),
    backgroundColor: "#fff"
  },
  item: {
    //height: computeSize(66),
    flexDirection: "row",
    padding: computeSize(6),
    paddingLeft: computeSize(12),
    paddingRight: computeSize(12),
    backgroundColor: "#f4f4f4"
  },
  itemSeparator: {
    height: computeSize(4)
  },
  portraitWrapper: {
    borderRadius: computeSize(56),
    overflow: "hidden"
  },
  portrait: {
    width: computeSize(56),
    height: computeSize(56)
  },
  itemContent: {
    flex: 1,
    paddingLeft: computeSize(15)
  },
  itemContentTop: {
    flexDirection: "row",
    alignItems: "center"
  },
  itemContentTopLeft: {
    flex: 1
  },
  itemTitle: {
    flexDirection: "row",
    height: computeSize(20),
    alignItems: "center"
  },

  itemName: {
    fontSize: computeSize(14),
    fontWeight: "bold",

    color: "#686868"
  },
  warn: {
    marginLeft: computeSize(4),
    width: computeSize(50),
    height: computeSize(16),

    borderRadius: computeSize(6),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fa4145"
  },
  warnText: {
    fontWeight: "bold",

    fontSize: computeSize(10),
    color: "#fff"
  },
  itemId: {
    fontSize: computeSize(12),
    lineHeight: computeSize(20),
    color: "#9f9f9f"
  },
  stopButton: {
    width: computeSize(100),
    height: computeSize(25),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: computeSize(6),
    backgroundColor: "#f1b248"
  },
  stopButtonText: {
    color: "#fff"
  },
  itemDetail: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  itemDetailText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  itemStartTime: {
    fontSize: computeSize(12),
    color: "#9f9f9f"
  },
  itemDuration: {
    fontSize: computeSize(12),
    color: "#9f9f9f"
  }
};
