import axios from 'axios';
import router from '../router/index';
axios.defaults.timeout = 8000;
// axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
axios.interceptors.request.use(function (config) {
  //  http req 拦截器
  if (!config.headers.Authorization && localStorage.getItem('vuetoken')) {
    config.headers.Authorization = `Bearer ${localStorage.vuetoken}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
// http res 拦截器
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});
export default axios;
