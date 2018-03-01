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
  },
  getStoreBusInfoByDate({ SDate, EDate }) {
    return post("/Store/GetStoreBusInfoByDate", { SDate, EDate });
  },
  getStoreUserListByDate({ SDate, EDate }) {
    return post("/Store/GetStoreUserListByDate", { SDate, EDate });
  },
  getStoreInfo() {
    return post("/Store/GetStoreInfo");
  },
  getBankInfo() {
    return post("/Store/GetBankInfo");
  },
  bindBank({ BankName, CardNo }) {
    return post("/Store/BindBank", { BankName, CardNo });
  },
  setStoreState(params) {
    return post("/Store/SetStoreState", params);
  },
  saveStoreEquip(params) {
    console.log(params);
    return post("/Store/SaveStoreEquip", params);
  },
  getCurriculumList() {
    return post("/Store/GetCurriculumList");
  },
  saveCurriculum(params) {
    return post("/Store/SaveCurriculum", { CurrJson: params });
  },
  //收入列表
  getIncomeInfo() {
    return post("/Store/GetStoreUserPayList");
  },
  //提现列表
  getWithdrawalsInfo() {
    return post("/Store/GetWithdrawalsList");
  },
  //修改商家信息
  modifStoreInfo(params) {
    return post("/Store/SaveStore", { params });
  }
};
