import { post } from "./base";

export default {
  login({ Tel, ExCode }) {
    console.log(Tel, ExCode, 9999);
    return post("/User/UserLogin", { Tel, ExCode });
  },

  register({ NickName, Tel, ExCode }) {
    return post("/User/UserReg", { NickName, Tel, ExCode });
  },
  sendCode(Tel) {
    return post("/User/GetExCode", { Tel });
  }
};
