import { Dimensions } from "react-native";
import { computeSize } from "src/common";
const { height } = Dimensions.get("window");
export default {
  container: {
    flex: 1,
    paddingTop: computeSize(80),
    height,
    position: "relative",
    alignItems: "center",
    backgroundColor: "#1a98e0"
  },
  bg: {
    position: "absolute",
    width: "100%",
    left: 0,
    right: 0,
    bottom: 0
  },
  logo: {
    alignItems: "center"
  },
  logoWrapper: {
    borderRadius: computeSize(60),
    overflow: "hidden"
  },
  logoLabel: {
    color: "#fff",
    fontSize: computeSize(18),
    lineHeight: computeSize(30),
    fontWeight: "bold"
  },
  form: {
    marginTop: computeSize(40),
    width: "100%",
    paddingLeft: computeSize(20),
    paddingRight: computeSize(20)
  },
  formItem: {
    marginTop: computeSize(12),
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: computeSize(34),
    borderBottomWidth: 1,
    borderColor: "#fff"
  },
  formItemImg: {
    marginLeft: computeSize(12),
    marginRight: computeSize(12),
    width: computeSize(20),
    height: computeSize(20)
  },
  formItemInput: {
    flex: 1,
    color: "#fff",
    fontSize: computeSize(14)
  },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: computeSize(36),
    marginTop: computeSize(23),
    borderRadius: computeSize(25)
  },
  loginText: {
    fontSize: computeSize(14),
    color: "#1a98e0"
  },
  code: {
    width: computeSize(70),
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  codeText: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#1a98e0"
  },
  register: {
    alignItems: "flex-end",
    height: computeSize(70),
    justifyContent: "center"
  },
  registerText: {
    fontSize: computeSize(14),
    fontWeight: "bold",
    color: "#fff"
  },
  relevancechar: {
    position: "absolute",
    bottom: computeSize(30),
    alignItems: "center"
  },
  relevanceText: {
    color: "#ccc",
    height: computeSize(35),
    fontSize: computeSize(16),
    fontWeight: "bold",
    justifyContent: "center"
  },
  charImg: {
    height: computeSize(40),
    width: computeSize(40)
  }
};
