import { computeSize } from "src/common";
export default {
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#efefef"
  },
  title: {
    height: computeSize(60),
    paddingTop: computeSize(20),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1b9ce4"
  },
  titleText: {
    fontSize: computeSize(16),
    fontWeight: "bold",
    lineHeight: computeSize(40),
    color: "#fff"
  },
  list: {},
  item: {
    height: computeSize(50),
    paddingLeft: computeSize(15),
    paddingRight: computeSize(15),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  itemBorder: {
    height: computeSize(5),
    backgroundColor: "#efefef"
  },
  itemLabel: {
    flexDirection: "row",
    alignItems: "center"
  },
  itemLabelText: {
    fontSize: computeSize(14),
    color: "#666666"
  },
  itemIcon: {
    justifyContent: "center",
    alignItems: "center"
  },
  itemValue: {
    fontSize: computeSize(14),
    color: "#666"
  },
  nav: {
    marginTop: computeSize(10),
    marginBottom: computeSize(30),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  navItemText: {
    fontSize: computeSize(14),
    color: "#3a9bfc"
  },
  navBorder: {
    marginLeft: computeSize(2),
    marginRight: computeSize(2),
    width: 1,
    height: "100%",
    backgroundColor: "#3a9bfc"
  },

  //modal
  modalContianer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: computeSize(8),
    padding: computeSize(10),

    borderColor: "#157ffb",
    backgroundColor: "#fff"
  },
  modalItemWrapper: {
    height: computeSize(36),
    alignItems: "center",

    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#1681fb"
  },
  modalItemInput: {
    flex: 1,
    height: "100%",
    paddingLeft: computeSize(15),
    color: "#1b9cfe"
  },
  codeButotn: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1b9cfe"
  },
  codeButotnText: {
    paddingLeft: computeSize(15),
    paddingRight: computeSize(15),
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#fff"
  },
  sumbit: {
    height: computeSize(40),
    justifyContent: "center",
    alignItems: "center",
    marginTop: computeSize(30),
    borderRadius: computeSize(8),
    backgroundColor: "#1a9af7"
  },
  sumbitText: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#fff"
  }
};
