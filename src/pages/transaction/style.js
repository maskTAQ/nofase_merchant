import { computeSize } from "src/common";
export default {
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "red"
  },
  content: {
    flex: 1,
    backgroundColor: "transparent"
  },
  bgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(3,computeSize(159),238)"
  },
  balanceWrapper: {
    padding: computeSize(6)
  },
  balanceLabel: {
    textAlign: "center",
    fontSize: computeSize(14),
    color: "#0399e7"
  },
  balanceValue: {
    textAlign: "center",
    fontWeight: "bold",
    //lineHeight: computeSize(35),
    fontSize: computeSize(30),
    color: "#0399e7"
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: computeSize(60),
    marginLeft: computeSize(10),
    marginRight: computeSize(10),
    paddingLeft: computeSize(40),
    paddingRight: computeSize(40),
    borderRadius: computeSize(10)
  },
  tabItem: {
    position: "relative",
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  itemmoneyValue: {
    color: "#0399e7",
    fontWeight: "bold",

    lineHeight: computeSize(30),
    fontSize: computeSize(20)
  },
  itemmoneyLabel: {
    color: "#0399e7",
    fontWeight: "bold",
    fontSize: computeSize(12)
  },
  tabItemBorder: {
    width: 1,
    height: "80%",
    backgroundColor: "#0399e7"
  },
  tabItemActiveBorder: {
    position: "absolute",
    width: "50%",
    height: computeSize(3),
    backgroundColor: "#0a9ae4",
    bottom: 0
  },
  bjImg: {
    width: "100%",
    height: "100%",
    flex: 1
  },
  list: {
    flex: 1,
    padding: computeSize(10),
    paddingBottom: 0
  },
  item: {
    justifyContent: "center",
    backgroundColor: "#fff",
    height: computeSize(80),
    padding: computeSize(10),
    borderRadius: computeSize(10)
  },
  itemText: {
    color: "#0399e7",
    fontWeight: "bold",
    fontSize: computeSize(16)
  },
  itemBottom: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bjimgs: {
    width: "100%",
    transform: [{ rotate: "180deg" }]
  }
};
