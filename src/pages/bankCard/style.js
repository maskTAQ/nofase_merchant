import { computeSize } from "src/common";
export default {
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  from: {
    alignItems: "center",
    width: "80%"
  },
  formItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    width: "100%",
    borderColor: "#999999"
  },
  laberText: {
    fontSize: computeSize(16),
    width: computeSize(100),
    color: "#333333"
  },
  formItemInput: {
    height: computeSize(55),
    flex: 1,
    paddingLeft: computeSize(15)
  },
  save: {
    marginTop: computeSize(20),
    backgroundColor: "#019af4",
    height: computeSize(45),
    width: "50%",
    borderRadius: computeSize(5),
    alignItems: "center",
    justifyContent: "center"
  },
  saveText: {
    fontSize: computeSize(17),
    color: "#fff"
  }
};
