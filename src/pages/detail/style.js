import { computeSize } from "src/common";
export default {
  container: {
    flex: 1,
    paddingTop: computeSize(5),
    backgroundColor: "#eee"
  },

  listContainer: {
    flex: 1
    //paddingTop: 5
  },
  item: {
    height: computeSize(70),
    flexDirection: "row",
    padding: computeSize(12),
    paddingTop: computeSize(6),
    paddingBottom: computeSize(6),
    alignItems: "center",
    backgroundColor: "#fff"
  },
  withdrawItem: {
    height: computeSize(80),
    padding: computeSize(12),
    backgroundColor: "#fff"
  },
  itemBorder: {
    height: 5
  },
  itemGroup: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  incomeTitle: {
    fontSize: computeSize(14),
    color: "#7c7c7c"
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
    paddingLeft: 10
  },
  itemContentRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemName: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#333"
  },
  itemId: {
    fontSize: computeSize(12),
    fontWeight: "bold",
    color: "#999"
  },
  itemText: {
    fontSize: computeSize(12),
    fontWeight: "bold",
    color: "#999"
  },
  itemExpend: {
    color: "#f9be61"
  },
  itemIncome: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#fc6722"
  },
  itemTime: {
    fontSize: computeSize(12),
    fontWeight: "bold",
    color: "#999"
  }
};
