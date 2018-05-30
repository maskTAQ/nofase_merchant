import { computeSize } from "src/common";
export default {
  container: {
    flex: 1,
    padding: computeSize(10),
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9"
  },
  content: {
    paddingLeft: computeSize(15),
    backgroundColor: "#fff"
  },
  title: {
    fontSize: computeSize(12),
    lineHeight: computeSize(60),
    color: "#333"
  },
  item: {
    flexDirection: "row",
    width: "60%",
    height: computeSize(20),
    alignItems: "center",
    justifyContent: "space-between"
  },
  itemLabel: {
    fontSize: computeSize(14),
    color: "#999"
  },
  itemValue: {
    fontSize: computeSize(14),
    color: "#999"
  },
  wdTitle: {
    fontSize: computeSize(12),
    color: "#333",
    lineHeight: computeSize(40)
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: computeSize(40),
    borderBottomWidth: 1,
    borderColor: "#000"
  },
  inputLabel: {
    fontSize: computeSize(20),
    color: "#000"
  },
  input: {
    flex: 1
  },
  banlance: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    lineHeight: computeSize(24),
    color: "#999"
  },
  contentBottom: {
    paddingTop: computeSize(40),
    paddingLeft: "10%",
    paddingRight: "10%",
    alignItems: "center"
  },
  button: {
    width: "100%",
    height: computeSize(34),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: computeSize(6),
    backgroundColor: "#3a9bfc"
  },
  buttonText: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#fff"
  },
  explain: {
    fontSize: computeSize(12),
    lineHeight: computeSize(30),
    color: "#999"
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: computeSize(10),
    backgroundColor: "#f9f9f9"
  },
  navItemText: {
    fontSize: computeSize(12),
    color: "#3a9bfc"
  },
  navBorder: {
    marginLeft: computeSize(2),
    marginRight: computeSize(2),
    width: 1,
    height: "100%",
    backgroundColor: "#3a9bfc"
  }
};
