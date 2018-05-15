import { AsyncStorage } from "react-native";
const uniqueLoginWebsocket = (StoreId, logout, close) => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket("wss://vmslq.cn/StoreStateHandler.ashx");
    ws.onopen = () => {
      console.log(StoreId, "发送");
      ws.send(String(StoreId)); // 注册服务
      console.log("uniqueLoginWebsocket连接成功");
      resolve(ws);
    };
    ws.onerror = e => {
      console.log(e);
      resolve("wensocket连接失败：" + String(e));
    };
    ws.onmessage = e => {
      console.log;
      if (e.data === "False") {
        AsyncStorage.removeItem("mobile");
        logout();
      }
    };
  });
};

export default {
  uniqueLoginWebsocket
};
