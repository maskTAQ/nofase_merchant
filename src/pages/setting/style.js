import { computeSize } from "src/common";
export default {
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2"
  },
  header: {
    marginTop: computeSize(5),
    flexDirection: "row",
    padding: computeSize(5),
    marginBottom: computeSize(10),
    backgroundColor: "#fff"
  },
  title: {
    height: computeSize(60),
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
  portrait: {
    marginRight: computeSize(10),
    width: computeSize(80),
    height: computeSize(80),
    borderRadius: computeSize(6)
  },
  headerRight: {
    flex: 1,
    paddingLeft: computeSize(10)
  },
  storeName: {
    fontSize: computeSize(15),
    lineHeight: computeSize(21),
    color: "#666"
  },
  storeInfo: {
    fontSize: computeSize(12),
    lineHeight: computeSize(21),
    color: "#666"
  },
  storeAddr: {
    fontSize: computeSize(14),
    color: "#999",
    lineHeight: computeSize(20)
  },
  list: {
    backgroundColor: "#fff",
    paddingLeft: computeSize(12),
    paddingRight: computeSize(12)
  },
  item: {
    height: computeSize(50),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: computeSize(10),
    paddingRight: computeSize(10)
  },
  itemBorder: {
    height: 1,
    backgroundColor: "#ccc"
  },
  itemLabel: {
    fontSize: computeSize(14),
    color: "#333"
  },
  itemValue: {
    fontSize: computeSize(14),
    color: "#039BE9"
  },
  logout: {
    marginLeft: "5%",
    marginBottom: computeSize(40),
    width: "90%",
    height: computeSize(40),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: computeSize(6),
    backgroundColor: "#039BE9"
  },
  logoutText: {
    fontSize: computeSize(16),
    fontWeight: "bold",
    color: "#fff"
  },

  //modal
  modalContianer: {
    borderWidth: 1,
    borderRadius: computeSize(8),
    padding: computeSize(20),
    paddingLeft: computeSize(25),
    paddingRight: computeSize(25),
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
