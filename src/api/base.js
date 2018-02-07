import Axios from "axios";
import { Tip } from "src/commons";

import { baseURL } from "src/config";

/**
 * 请求拦截器
 * */
Axios.interceptors.request.use(
  config => {
    //在发送请求之前做某事
    // console.log("这里是拦截器");
    // console.log("config", config);
    return Storage.get("Token")
      .then(data => {
        if (data) {
          config.headers["token"] = data;
        }
        config.headers["Content-Type"] = "application/json";
        config.headers["timestamp"] = Date.parse(new Date());
        config.headers["version"] = "1.0.0";
        return config;
      })
      .catch(e => {
        config.headers["Content-Type"] = "application/json";
        config.headers["timestamp"] = Date.parse(new Date());
        config.headers["version"] = "1.0.0";
        return config;
      });
  },
  error => {
    //请求错误时做些事
    return Promise.reject(error);
  }
);

const requestWrapper = (url, param = {}) => {
  return Axios.request({
    baseURL: baseURL,
    url,
    method: "post",
    timeout: 5000,
    data: param
  });
};
const post = ({ url, params = {}, loading = true, handleCatch = true }) => {
  loading && Tip.loading();
  return requestWrapper(url, params)
    .then(res => {
      loading && Tip.dismiss();
      return Promise.resolve(res);
    })
    .catch(e => {
      loading && Tip.dismiss();
      if (handleCatch) {
        return Tip.fail(String(e));
      }
      return Promise.reject(e);
    });
};
export { post };
