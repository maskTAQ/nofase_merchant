import moment from "moment";
import Axios from "axios";
import { post } from "./base";

export default {
  token() {
    return Axios.request({
      url: "http://47.104.131.96:8000/",
      method: "get",
      timeout: 6000
    });
  },
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
    return post(
      "/Store/GetStoreBusInfo",
      {
        SDate: `${moment().format("YYYY-MM-DD")} 00:00:00`,
        EDate: `${moment().format("YYYY-MM-DD")} 23:59:59`
      },
      { loading }
    );
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
  getIncomeInfo(params) {
    return post("/Store/GetStoreUserPayList", params, { loading: false });
  },
  //提现列表
  getWithdrawalsInfo(params) {
    return post("/Store/GetWithdrawalsList", params, { loading: false });
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
  },
  //扫描二维码 http://101.200.196.202:8888/User/ScanUserQR
  scanUserQR({ UserId, StoreId, CardId }) {
    return post("/User/ScanUserQR", { UserId, StoreId, CardId });
  },
  //完成订单
  completeOrder({ OrderId }) {
    return post("/User/SettlementOrder", { OrderId });
  }
};
