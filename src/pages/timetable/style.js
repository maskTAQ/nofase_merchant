import { computeSize } from "src/common";
const color = "#1b9ee7";
export default {
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2"
  },
  c: {
    //height:'50%'
  },
  selectTime: {
    fontSize: computeSize(12),
    color: "#1a97df"
  },
  input: {
    flex: 1,
    width: "100%",
    height: "100%",
    color: "#1a97df",
    fontSize: computeSize(12)
  },
  deleteButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  deleteText: {
    color: "red",
    fontSize: computeSize(12)
  },
  addButton: {
    marginLeft: computeSize(10),
    marginRight: computeSize(10),
    marginBottom: computeSize(20),
    //width: "90%",
    height: computeSize(40),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: computeSize(6),
    backgroundColor: color
  },
  addButtonText: {
    fontSize: computeSize(16),
    fontWeight: "bold",
    color: "#fff"
  },

  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: computeSize(20)
  },
  modalTitle: {
    fontSize: computeSize(16),
    paddingTop: computeSize(25)
  },
  inputGroup: {
    flexDirection: "row",
    height: computeSize(40),
    alignItems: "center",
    justifyContent: "center",
    marginTop: computeSize(20)
  },
  startTimeButton: {
    width: "40%",
    justifyContent: "center",
    borderRadius: computeSize(5),
    height: computeSize(40),
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#019af5",
    marginRight: computeSize(10)
  },
  endTimeButton: {
    width: "40%",
    justifyContent: "center",
    borderRadius: computeSize(5),
    height: computeSize(40),
    alignItems: "center",
    paddingRight: computeSize(70),
    borderWidth: 1,
    borderColor: "#019af5",
    marginLeft: computeSize(10)
  },
  buttonGroup: {
    flexDirection: "row",
    height: computeSize(45),
    width: "75%",
    borderWidth: 1,
    borderColor: "#019af5",
    borderRadius: computeSize(5),
    overflow: "hidden",
    marginTop: computeSize(15)
  },
  cancel: {
    width: "35%",
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  cancelText: {
    color: "#019af5"
  },
  completelText: {
    color: "#fff"
  },
  complete: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#019af5"
  }
};
