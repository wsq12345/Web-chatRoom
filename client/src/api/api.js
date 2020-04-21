import axios from 'axios'
import instance from './index'
import { config } from 'shelljs';

export const login=(data)=> instance.post('/user/login',data);//登录
export const register=(data)=> instance.post('/user/register',data);//注册
export const getUserInfo=(data)=> instance.post('/user/getUserInfo',data);
export const history=(data)=> instance.post('/message/history',data);//获取历史记录
export const upload=(data,config)=> instance.post('/file/upload',data,config);//上传文件
export const uploadImg=(data,config)=> instance.post('/file/uploadImg',data,config);//发送图片
export const searchFriend=(data)=> instance.post('/friend/searchFriend',data);//搜索朋友
export const addFriend=(data)=> instance.post('/friend/addFriend',data);//添加朋友
export const friendRequest=(data)=> instance.post('friend/friendRequest',data)//获取好友请求
export const delFriend=(data)=> instance.post('/friend/delFriend',data);//删除朋友
export const getFriendList=(data)=> instance.post('/friend/getFriendList',data)//获取好友列表
export const avatar=(data)=> instance.post('/file/avatar',data,config);