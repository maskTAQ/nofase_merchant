import { post } from "./base";

export default {
  login({ Tel, ExCode }) {
    return post("/Store/StoreLogin", { Tel, ExCode });
  },

  register({ NickName, Tel, ExCode }) {
    return post("/User/UserReg", { NickName, Tel, ExCode });
  },
  sendCode(Tel) {
    return post("/User/GetExCode", { Tel }, { loading: false });
  },
  getStoreBusInfo() {
    return post("/Store/GetStoreBusInfo");
  },
  getStoreUserList() {
    return post("/Store/GetStoreUserList");
  }
};
