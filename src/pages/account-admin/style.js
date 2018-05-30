import { computeSize } from "src/common";
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
    zIndex: computeSize(2),
    backgroundColor: "transparent"
  },
  title: {
    height: computeSize(60),
    paddingTop: computeSize(20),
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    fontSize: computeSize(16),
    fontWeight: "bold",
    lineHeight: computeSize(40),
    color: "#1a9be3"
  },
  balanceValueWrapper: {
    height: computeSize(40),
    justifyContent: "flex-end",
    alignItems: "center"
  },
  balanceValue: {
    fontSize: computeSize(22),
    color: "#0399e7"
  },
  balanceLabelWrapper: {
    height: computeSize(40),
    alignItems: "center"
  },
  balanceLabel: {
    fontWeight: "bold",
    fontSize: computeSize(14),
    color: "#0399e7"
  },
  incomeWrapper: {
    height: computeSize(60),
    paddingLeft: computeSize(22),
    paddingRight: computeSize(22)
  },
  incomeBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: computeSize(17),
    paddingRight: computeSize(17),
    borderRadius: computeSize(4),
    backgroundColor: "#fff"
  },
  incomeLabel: {
    fontSize: computeSize(16),
    color: "#1a9be3"
  },
  incomeValue: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#1a9be3"
  },
  list: {
    flex: 1,
    paddingLeft: computeSize(12),
    paddingRight: 12
  },
  item: {
    marginTop: computeSize(20),
    height: computeSize(70),
    borderRadius: computeSize(6),
    justifyContent: "center",
    paddingLeft: computeSize(12),
    backgroundColor: "#fff"
  }
};
