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
  balanceValueWrapper: {
    height: 40,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  balanceValue: {
    fontSize: 22,
    color: "#0399e7"
  },
  balanceLabelWrapper: {
    height: 40,
    alignItems: "center"
  },
  balanceLabel: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#0399e7"
  },
  incomeWrapper: {
    height: 60,
    paddingLeft: 22,
    paddingRight: 22
  },
  incomeBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 17,
    paddingRight: 17,
    borderRadius: 4,
    backgroundColor: "#fff"
  },
  incomeLabel: {
    fontSize: 16,
    color: "#1a9be3"
  },
  incomeValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1a9be3"
  },
  list: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12
  },
  item: {
    marginTop: 20,
    height: 70,
    borderRadius: 6,
    justifyContent: "center",
    paddingLeft: 12,
    backgroundColor: "#fff"
  }
};
