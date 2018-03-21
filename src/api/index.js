import { post } from "./base";

export default {
  login({ Tel, ExCode }) {
    return post("/Store/StoreLoginTest", { Tel, ExCode });
  },
  rememberLogin({ Tel }) {
    return post("/Store/StoreLoginTest", { Tel });
  },
  register({ NickName, Tel, ExCode }) {
    return post("/User/UserReg", { NickName, Tel, ExCode });
  },
  sendCode(Tel, loading) {
    return post("/User/GetExCode", { Tel }, { loading });
  },
  //验证验证码
  verifyCode(Tel, ExCode) {
    return post("/User/ExTelCode", { Tel, ExCode });
  },
  getStoreBusInfo(loading) {
    return post("/Store/GetStoreBusInfo", {}, { loading });
  },
  getStoreUserList(loading) {
    return post("/Store/GetStoreUserList", {}, { loading });
  },
  //获取商家今日营业信息
  getStoreBusInfoByDate({ SDate, EDate }, loading) {
    return post("/Store/GetStoreBusInfoByDate", { SDate, EDate }, { loading });
  },
  //获取用户消费记录(日期查询)
  getStoreUserListByDate({ SDate, EDate }, loading) {
    return post("/Store/GetStoreUserListByDate", { SDate, EDate }, { loading });
  },
  getStoreInfo() {
    return post("/Store/GetStoreInfo");
  },
  bindBank({ BankName, CardNo }) {
    return post("/Store/BindBank", { BankName, CardNo });
  },
  setStoreState(params) {
    return post("/Store/SetStoreState", params);
  },
  getCurriculumList() {
    return post("/Store/GetCurriculumList");
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
    return post("/Store/SaveStore", params);
  },
  //获取银行卡信息接口
  getBankInfo() {
    return post("/Store/GetBankInfo");
  },
  //申请提现
  applyForWithdrawals(WAmont) {
    return post("/Store/SaveWithdrawals", { WAmont });
  },
  //获取课程表
  getCurriculum({ StoreId }) {
    return post("/Store/GetCurriculumList", { StoreId });
  },
  //保存课程表
  saveCurriculum({ CurrJson, StoreId }) {
    return post("/Store/SaveCurriculum", { CurrJson, StoreId });
  },
  //更新店铺
  updateStore(params) {
    return post("/Store/EditStore", params);
  },
  //获取设备信息
  getStoreEquip(params) {
    return post("/Store/GetStoreEqui", params);
  },
  //保存设备信息
  saveStoreEquip(params) {
    return post("/Store/SaveStoreEquip", params);
  }
};
