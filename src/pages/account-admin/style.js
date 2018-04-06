export default {
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "transparent"
  },
  bgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    backgroundColor: "#1a9be3"
  },
  bgImg: {
    width: "100%"
  },
  content: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 2,
    backgroundColor: "transparent"
  },
  title: {
    height: 60,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 40,
    color: "#1a9be3"
  },
  balanceValue: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",

    color: "#0399e7"
  },
  balanceLabel: {
    textAlign: "center",
    width: "100%",
    fontWeight: "bold",
    lineHeight: 26,
    fontSize: 14,
    color: "#0399e7"
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 60,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 6
  },
  tabItem: {
    position: "relative",
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  Itemmoney: {
    color: "#0399e7",
    fontSize: 20
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
  itemBottom: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bjimgs: {
    width: "100%",
    transform: [{ rotate: "180deg" }],
    backgroundColor: "#1a9be3"
  }
};
