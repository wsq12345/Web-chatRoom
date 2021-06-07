const ws = require('nodejs-websocket');
const moment = require('moment');
const { messageModel } = require('../models/messages');
const { server_ip } = require('../config');

let users = []
let conns = {};
function boardcast(obj) { 
	if(obj.bridge && obj.bridge.length){
		obj.bridge.forEach(item=>{
			conns[item].sendText(JSON.stringify(obj));
		})
		return;
	}
	server.connections.forEach(conn=> {
		conn.sendText(JSON.stringify(obj));
		
	})
}

const server=ws.createServer((conn)=>{
	conn.on("text", async (obj)=> {
		obj = JSON.parse(obj);
		conns[''+obj.uid+''] = conn;
		if(obj.type==-1){ 
			let isuser = users.some(item=>{ 
				return item.uid === obj.uid; 
			})
			if(!isuser){
				users.push({
					username: obj.username,
					uid: obj.uid
				})
			}
			let data={
				username: obj.username,
				msg: '',
				date: moment().format('YYYY-MM-DD HH:mm:ss'),
				type: -1,
				uid: obj.uid,
				bridge: obj.bridge,
			}
			//await messageModel.create(data);
			boardcast(data);
		}else if(obj.type==1){
			let data={
				username: obj.username,
				msg: obj.msg,
				date: moment().format('YYYY-MM-DD HH:mm:ss'),
				type: 1,
				uid: obj.uid,
				friend: obj.friend,
				bridge: obj.bridge,
			}
			boardcast(data);
			await messageModel.create(data);
		}else if(obj.type==0){
			let data={
				username: obj.username,
				msg: obj.msg,
				date: moment().format('YYYY-MM-DD HH:mm:ss'),
				type: 0,
				bridge:[]
			}
			await messageModel.create(data);
			boardcast(data);
		}
		
	});
	conn.on("close", function (code,reason){
		//console.log("关闭连接");
	})
	conn.on("error", function (code, reason) {
		//console.log("异常关闭");
	});
}).listen(4000,server_ip);

module.exports = server;