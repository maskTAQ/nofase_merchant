import { Dimensions } from "react-native";
import { computeSize } from "src/common";
const { width, height } = Dimensions.get("window");
export default {
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9"
  },
  header: {
    padding: computeSize(15),
    backgroundColor: "#1b9de6"
  },
  title: {
    fontSize: computeSize(20),
    paddingBottom: computeSize(10),
    fontWeight: "bold",
    color: "#fff"
  },
  subtitle: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#fff"
  },
  list: {
    backgroundColor: "#f4f4f4"
  },
  listTitleWrapper: {
    height: computeSize(40),
    marginTop: computeSize(5),
    marginBottom: computeSize(5),
    justifyContent: "center",
    paddingLeft: computeSize(15),
    backgroundColor: "#fff"
  },
  listTitle: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#333"
  },
  listContent: {
    // paddingLeft:computeSize(12),
    // paddingRight:computeSize(12),
  },
  item: {
    height: computeSize(40),
    justifyContent: "center",
    paddingLeft: computeSize(15),
    backgroundColor: "#fff"
  },
  itemSeparatorBox: {
    height: 1,
    paddingLeft: computeSize(15),
    paddingRight: computeSize(15),
    backgroundColor: "#fff"
  },
  itemSeparator: {
    flex: 1,
    backgroundColor: "#aaa"
  },
  itemLabel: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#999"
  },
  feedback: {
    marginTop: computeSize(10),
    marginBottom: computeSize(10),
    height: computeSize(40),
    paddingLeft: computeSize(10),
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  feedbackText: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#333"
  },
  contact: {
    backgroundColor: "#fff"
  },
  contactItem: {
    padding: computeSize(15),
    flexDirection: "row"
  },
  contactItemLabel: {
    flex: 1
  },
  contactItemLabelText: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#999"
  },
  call: {
    flexDirection: "row",
    alignItems: "center"
  },
  callText: {
    marginRight: computeSize(10),
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#039DEC"
  },

  //modal
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  modalContent: {
    padding: computeSize(10),
    paddingTop: 0,
    borderWidth: 1,
    borderColor: "#fff",
    // borderTopLeftRadius: computeSize(6),
    // borderTopRightRadius: computeSize(6),
    backgroundColor: "#fff"
  },
  modalHeader: {
    height: computeSize(40),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  modalTitle: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#868686"
  },
  modalLine: {
    height: 1,
    backgroundColor: "#aaa"
  },
  modalDetailsWrapper: {
    height: height - 182
    //padding: computeSize(10),
    //paddingTop: 15
  },
  modalDetails: {
    lineHeight: computeSize(20),
    color: "#999"
  },
  modalImg: {
    width: "100%",
    height: width * 0.4,
    marginTop: computeSize(10),
    marginBottom: computeSize(10)
  }
};
