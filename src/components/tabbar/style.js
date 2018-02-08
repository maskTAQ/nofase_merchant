export default {
  tabBar: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#1b9be4"
  },
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  tabBarItemLabel: {
    fontSize: 14,
    color: "#fff"
  },
  tabBarScanQRWrapper: {
    position: "relative",
    width: 70,
    height: 50
  },
  tabBarScanQR: {
    position: "absolute",
    top: -20,
    bottom: 0,
    left: 0,
    borderRadius: 70,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "#1b9be4",
    backgroundColor: "#fff"
  }
};
