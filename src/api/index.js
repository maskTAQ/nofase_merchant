import { post } from "./base";

export default {
  login({ username, password }) {
    return post("/login", { username, password });
  },

  register({ NickName, Tel, ExCode }) {
    return post("/User/UserReg", { NickName, Tel, ExCode });
  },
  sendCode(Tel) {
    return post("/User/GetExCode", { Tel });
  }
};
