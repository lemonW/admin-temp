import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";

const showStatus = status => {
  let message = "";
  switch (status) {
    case 400:
      message = "400：请求错误";
      break;
    case 401:
      message = "401：未授权，请重新登录";
      break;
    case 403:
      message = "403：拒绝访问";
      break;
    case 404:
      message = "404：请求出错";
      break;
    case 408:
      message = "408：请求超时";
      break;
    case 500:
      message = "500：服务器错误";
      break;
    case 501:
      message = "501：服务未实现";
      break;
    case 502:
      message = "502：网络错误";
      break;
    case 503:
      message = "503：服务不可用";
      break;
    case 504:
      message = "504：网络超时";
      break;
    case 505:
      message = "505：HTTP版本不受支持";
      break;
    default:
      message = `连接出错，状态码 ${status}`;
  }
  return `${message}`;
};

const service = axios.create({
  baseURL: "/api",
  // headers: { "Content-Type": "application/x-www-form-urlencoded" },
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000,
});

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.token = getToken();
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.status !== 200) {
      Message({
        message: res.message || showStatus(res.status),
        type: "error",
        duration: 5 * 1000,
      });

      if (res.status === 401 || res.status === 50001) {
        store.commit("user/RESET_STATE");
        location.reload();
      }
      return Promise.reject(new Error(res.message || showStatus(res.status)));
    } else {
      return res;
    }
  },
  error => {
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);

export default service;
