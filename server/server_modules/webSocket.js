const ws = require('nodejs-websocket');
const moment = require('moment');
const { messageModel } = require('../models/messages')
let conns={};
function boardcast(obj) {
	server.connections.forEach(conn=> {
		conn.sendText(JSON.stringify(obj));
		// console.log(JSON.stringify(obj))
	})
}

const server=ws.createServer((conn)=>{
	conn.on("text", async (obj)=> {
		obj = JSON.parse(obj);
		let data={
			username: obj.username,
			msg: obj.msg,
			date: moment().format('YYYY-MM-DD HH:mm:ss')
		}
		await messageModel.create(data);
		boardcast(data);
	});
	conn.on("close", function (code,reason){
		console.log("关闭连接");
	})
	conn.on("error", function (code, reason) {
		console.log("异常关闭");
	});
}).listen(4000);

module.exports = server;