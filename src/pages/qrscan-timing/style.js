import { computeSize } from "src/common";
const mainColor = "#1a9bfc";
export default {
  container: {
    flex: 1,
    padding: computeSize(30),
    paddingBottom: computeSize(50),
    backgroundColor: "#1b9de6"
  },
  userInfoContainer: {
    flexDirection: "row",
    position: "relative",
    height: computeSize(60),
    paddingLeft: computeSize(40),
    marginBottom: computeSize(15)
  },
  portraitWrapper: {
    position: "absolute",
    top: -computeSize(20),
    left: 0,
    width: computeSize(80),
    height: computeSize(80),
    zIndex: computeSize(9),
    borderRadius: computeSize(80),
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  userInfoContent: {
    flex: 1,
    paddingLeft: computeSize(50),
    borderRadius: computeSize(6),
    backgroundColor: "#fff"
  },
  username: {
    fontSize: computeSize(14),
    lineHeight: computeSize(30),
    color: "#333"
  },
  userId: {
    fontSize: computeSize(14),
    lineHeight: computeSize(20),
    color: "#999"
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12
  },
  chunk: {
    marginLeft: computeSize(12),
    marginRight: computeSize(12),
    height: computeSize(18),
    borderBottomLeftRadius: computeSize(10),
    borderBottomRightRadius: computeSize(10),
    backgroundColor: "#8dcffc"
  },
  headerWrapper: {
    paddingTop: computeSize(50),
    padding: computeSize(20),
    paddingBottom: 0
  },
  header: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerItemWrapper: {
    flex: 1,
    paddingLeft: computeSize(20)
  },
  headerItemLabel: {
    fontSize: computeSize(18),
    fontWeight: "bold",
    color: mainColor
  },
  headerItemValue: {
    fontSize: computeSize(18),
    color: mainColor
  },
  timeCount: {
    marginTop: computeSize(10),
    marginBottom: computeSize(10),
    paddingLeft: computeSize(20),
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: mainColor
  },
  tWrapper: {
    padding: computeSize(20),
    paddingTop: computeSize(10),
    paddingBottom: computeSize(15)
  },
  t: {
    flexDirection: "row",
    paddingLeft: computeSize(20),
    paddingRight: computeSize(20)
  },
  tItem: {
    flex: 1
  },
  tItemLabel: {
    fontSize: computeSize(18),
    fontWeight: "bold",
    color: mainColor
  },
  tItemValueWrapper: {
    height: computeSize(40),
    justifyContent: "center"
  },
  tItemValue: {
    fontSize: computeSize(18),
    fontWeight: "bold",
    color: mainColor
  },
  end: {
    marginLeft: computeSize(25),
    marginRight: computeSize(25),
    borderRadius: computeSize(6),
    height: computeSize(40),
    backgroundColor: mainColor,
    justifyContent: "center",
    alignItems: "center"
  },
  endText: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#fff"
  },
  starScore: {
    padding: computeSize(40),
    paddingTop: 0,
    paddingBottom: 0
  },
  starScoreTitle: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: mainColor
  },
  starScoreBox: {
    height: computeSize(40),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  submit: {
    paddingLeft: computeSize(10),
    paddingRight: computeSize(10),
    height: computeSize(22),
    borderRadius: computeSize(6),
    justifyContent: "center",
    backgroundColor: mainColor
  },
  submitText: {
    fontSize: computeSize(12),
    fontWeight: "bold",
    color: "#fff"
  },
  starScoreEvaluate: {
    fontSize: computeSize(12),
    fontWeight: "bold",
    color: mainColor
  },
  starScoreExpend: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: mainColor
  },
  QR: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  QRImg: {
    width: "60%"
  },
  itemBorder: {
    paddingLeft: computeSize(6),
    paddingRight: computeSize(6)
  },
  itemBorderIcon: {
    width: "100%"
  }
};
