import axios from 'axios'
import { config, error } from 'shelljs'
import {Message} from 'element-ui'
let loading=null;
let instance=axios.create({
    timeout: 5000,
    baseURL: process.env.BASE_URL
})
instance.interceptors.request.use(config=>{
    return config;
},error=>{
    return Promise.reject(error);
})
instance.interceptors.response.use(response => {
    if (response.status === 200) {
      return response;
    }
    return Promise.reject(response);
  }, error => {
    if (!error.response) {
        Message.error('网络连接失败');
        return Promise.resolve('net');
    }
    else{
        Message.error(error.response.data.msg);
        return Promise.resolve('error');
    }
  });
export default instance;
