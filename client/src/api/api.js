import axios from 'axios'
import instance from './index'
import { config } from 'shelljs';
// const url="http://localhost:3000";
// export const login=(username,password)=>{
//     const params = new URLSearchParams();
//     params.append("username", username);
//     params.append("password", password);
//     return axios.post(`${url}/login`,params)
// };
// export const register=(username,password)=>{
//     const params = new URLSearchParams();
//     params.append("username", username);
//     params.append("password", password);
//     return axios.post(`${url}/register`,params)
// };
// export const user=()=>{return axios.get(`${url}/user`)}
export const login=(data)=> instance.post('/user/login',data);
export const register=(data)=> instance.post('/user/register',data);
export const history=()=> instance.get('/message/history');
export const upload=(data,config)=> instance.post('/upload',data,config);
export const uploadImg=(data,config)=> instance.post('/uploadImg',data,config);