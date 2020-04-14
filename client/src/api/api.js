import axios from 'axios'
import instance from './index'
import { config } from 'shelljs';

export const login=(data)=> instance.post('/user/login',data);//登录
export const register=(data)=> instance.post('/user/register',data);//注册
export const history=()=> instance.get('/message/history');//获取历史记录
export const upload=(data,config)=> instance.post('/upload',data,config);//上传文件
export const uploadImg=(data,config)=> instance.post('/uploadImg',data,config);//发送图片
export const searchFriend=(data)=> instance.post('/friend/searchFriend',data);//搜索朋友
export const addFriend=(data)=> instance.post('/friend/addFriend',data);//添加朋友
export const delFriend=(data)=> instance.post('/friend/delFriend',data);//删除朋友