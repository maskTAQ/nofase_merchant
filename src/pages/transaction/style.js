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
    backgroundColor: "rgb(3,159,238)"
  },
  balanceWrapper: {
    padding: 6
  },
  balanceLabel: {
    textAlign: "center",
    fontSize: 14,
    color: "#0399e7"
  },
  balanceValue: {
    textAlign: "center",
    fontWeight: "bold",
    //lineHeight: 35,
    fontSize: 30,
    color: "#0399e7"
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 10
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

    lineHeight: 30,
    fontSize: 20
  },
  itemmoneyLabel: {
    color: "#0399e7",
    fontWeight: "bold",
    fontSize: 12
  },
  tabItemBorder: {
    width: 1,
    height: "80%",
    backgroundColor: "#0399e7"
  },
  tabItemActiveBorder: {
    position: "absolute",
    width: "50%",
    height: 3,
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
    padding: 10,
    paddingBottom: 0
  },
  item: {
    justifyContent: "center",
    backgroundColor: "#fff",
    height: 80,
    padding: 10,
    borderRadius: 10
  },
  itemText: {
    color: "#0399e7",
    fontWeight: "bold",
    fontSize: 16
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
