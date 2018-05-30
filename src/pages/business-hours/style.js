import { computeSize } from "src/common";
const color = "#1b9ee7";

export default {
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  },
  header: {
    height: computeSize(50),
    flexDirection: "row",
    paddingLeft: computeSize(10),
    paddingRight: computeSize(10),
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  headerLabel: {
    fontSize: computeSize(16),
    color: "#666666"
  },
  notif: {
    height: computeSize(20),
    paddingLeft: computeSize(15),
    justifyContent: "center",
    backgroundColor: "#f8b84a"
  },
  notifText: {
    fontSize: computeSize(12),
    color: "#fff"
  },
  center: {
    marginTop: computeSize(10),
    padding: computeSize(10),
    paddingTop: 0,
    backgroundColor: "#fff"
  },
  centerTitle: {
    fontSize: computeSize(16),
    lineHeight: computeSize(60),
    color: "#666666"
  },
  chooseDayWrapper: {
    height: computeSize(30),
    marginBottom: computeSize(15),
    flexDirection: "row"
  },
  chooseDayButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: computeSize(6),
    backgroundColor: color
  },
  chooseDayButtonText: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#fff"
  },
  zhi: {
    width: computeSize(20),
    lineHeight: computeSize(30),
    color: "#333",
    textAlign: "center"
  },
  chooseTimeButton: {
    height: computeSize(30),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: color,
    borderRadius: computeSize(6)
  },
  chooseTimeButtonText: {
    fontSize: computeSize(12),
    color: color
  },
  timeZhi: {
    lineHeight: computeSize(30),
    textAlign: "center",
    fontSize: computeSize(12),
    color: "#333"
  },
  bottom: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  saveButton: {
    width: "80%",
    height: computeSize(40),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: computeSize(6),
    backgroundColor: color
  },
  saveButtonText: {
    fontSize: computeSize(16),
    fontWeight: "bold",
    color: "#fff"
  },
  info: {
    fontSize: computeSize(12),
    lineHeight: computeSize(20),
    fontWeight: "bold",
    color: "#999"
  },

  switchWrapper: {
    width: computeSize(60),
    height: computeSize(30),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: computeSize(3),
    paddingRight: computeSize(3),
    borderRadius: computeSize(6),
    backgroundColor: "#1b9ee7"
  },
  switchPoint: {
    width: computeSize(28),
    height: computeSize(24),
    borderRadius: computeSize(4),
    backgroundColor: "#fff"
  },
  switchLabel: {
    flex: 1,
    textAlign: "center",
    lineHeight: computeSize(30),
    fontSize: computeSize(16),
    fontWeight: "bold",
    color: "#fff"
  }
};
