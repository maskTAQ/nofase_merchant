import { computeSize } from "src/common";
export default {
  container: {
    flex: 1
  },
  modalContainer: {
    padding: computeSize(10)
  },
  modalContent: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: computeSize(6),
    backgroundColor: "#fff"
  },
  modalIconWrapper: {
    height: computeSize(100),
    alignItems: "center",
    justifyContent: "center"
  },
  modalIcon: {
    width: computeSize(60),
    height: computeSize(60)
  },
  modalLabel: {
    fontSize: computeSize(14),
    textAlign: "center",
    fontWeight: "bold",
    color: "#999"
  },
  modalButtonGroup: {
    padding: computeSize(15),
    flexDirection: "row"
  },
  modalButton: {
    flex: 1,
    height: computeSize(48),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: computeSize(6),
    borderWidth: 1,
    borderColor: "#289ee3",
    backgroundColor: "#fff"
  },
  modalConfirmButton: {
    backgroundColor: "#289ee3"
  },
  modalButtonText: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#289ee3"
  },
  modalConfirmButtonText: {
    color: "#fff"
  }
};
