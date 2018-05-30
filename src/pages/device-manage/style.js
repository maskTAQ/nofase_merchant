import { computeSize } from "src/common";
const color = "#1b9ee7";
export default {
  container: {
    flex: 1,
    paddingLeft: computeSize(10),
    paddingRight: computeSize(10),
    backgroundColor: "#fff"
  },
  item: {
    flexDirection: "row",
    height: computeSize(46),
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemLabel: {
    fontSize: computeSize(14),
    color: "#666666"
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center"
  },
  itemValue: {
    width: computeSize(50),
    fontSize: computeSize(13),
    color: "#333333"
  },
  itemBorder: {
    height: 1,
    backgroundColor: "#d7d7d7"
  },
  saveButton: {
    marginLeft: computeSize(10),
    marginRight: computeSize(10),
    marginBottom: computeSize(20),
    //width: "90%",
    height: computeSize(40),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: computeSize(6),
    backgroundColor: color
  },
  saveButtonText: {
    fontSize: computeSize(16),
    fontWeight: "bold",
    color: "#fff"
  }
};
