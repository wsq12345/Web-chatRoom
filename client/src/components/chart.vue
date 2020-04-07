<template>
    <div>
        <div class="content" v-for="item in items" :key="item.index" v-show="$store.state.charting==item.chart">
            <ul class="output">
                <li v-for="message in item.messages" :key="message.index">
                    <div class="username">{{message.username}}</div>
                    <span class="msg" v-html="message.msg"></span>
                    <div class="time">{{message.date}}</div>
                </li>
            </ul>
            <!-- <textarea v-model="text" class="input" autofocus
            @keydown.enter.exact="sendMessage()"
            @keydown.ctrl.enter="addNewLine()">
            </textarea> -->
            <emoji class="emoji" v-if="item.emoji_show" @addEmoji="addEmoji"></emoji>
            <!-- <div v-html="text" class="input" contenteditable="true" @input="changeText($event)"
            @keydown.enter.exact="sendMessage()"
            @keydown.ctrl.enter="addNewLine()">
            </div> -->
            <divInput class="input" v-model="item.text" @send="sendMessage"></divInput>
            <div class="control">
                <el-button type="success" class="el-btn" @click="emoji()">表情</el-button>
                <el-button type="success" class="el-btn">图片</el-button>
                <el-button type="success" class="el-btn" @click="sendMessage()">发送</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import divInput from './divInput'
import emoji from './emoji'
import {history} from '../api/api'
export default {
    data(){
        return{
            // text: '',
            // emoji_show: false,
            items:[  //记录聊天人及信息
                {chart:'群聊',messages:[],text: '',emoji_show: false},
                {chart:'test',messages:[],text: '',emoji_show: false}
            ]
        }
    },
    methods:{
        conWebSocket(){
            let vm = this;
            if(window.WebSocket){
                vm.socket = new WebSocket('ws://localhost:4000');
                let socket = vm.socket;
                socket.onopen = function(e){
                    console.log("连接服务器成功");
                }
                socket.onclose = function(e){
                    console.log("服务器关闭");
                }
                socket.onerror = function(){
                    console.log("连接出错");
                }
                // 接收服务器的消息
                socket.onmessage = function(e){
                    let message = JSON.parse(e.data);
                    vm.items[0].messages.push(message);
                } 
            }
        },
        sendMessage(e){
            // if(window.event){
            //     window.event.returnValue=false;
            // }else{
            //     e.preventDefault();
            // }
            if(!this.items[0].text){
                return this.$message({
                    message:'内容为空',
                    type:'error'
                });
            }
            this.post();
            // this.items[0].messages.push({username:'wsq',msg:this.items[0].text})
            this.items[0].text='';
                  
        },
        post(){
            let vm=this
            this.socket.send(JSON.stringify({
                username:vm.$store.getters.getUsername,
                msg:vm.items[0].text
            }))
        },
        emoji(){
            this.items[0].emoji_show=this.items[0].emoji_show==true?false:true;
        },
        addEmoji(data){
            this.items[0].text+=data;
            this.emoji();
        },
        async gethistory(){
            let data=await history();
            for(let i=0;i<data.data.length;i++){
                let message={};
                let date=data.data[i].date.slice(0,10)+' '+data.data[i].date.slice(11,19);
                message={username:data.data[i].username,msg:data.data[i].msg,date};
                this.items[0].messages.push(message);
            }     
        }
    },
    mounted(){
        this.conWebSocket();
        this.gethistory();
    },
    components:{
        emoji,
        divInput
    }
}
</script>

<style lang="less" scoped>
    .content{
        height: calc(~"100vh - 40px");
        width: calc(~"100vw - 220px");
        float: right;
       .output{
            border-bottom: 2px solid #e4e4e4; 
            height: calc(~"100vh - 176px");
            overflow: auto; 
            .username{
                background: gainsboro;
                width: 50px;
                height: 50px;
                line-height: 50px;
                border-radius: 50%; 
                color: red;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .msg{
                display: inline-block;
                position: relative;
                background: aqua;  
                max-width: calc(~"100vw - 320px");;
                top: -30px;
                left: 60px;
                border-radius: 10px; 
                padding: 5px;
                white-space: pre-wrap;  //换行输出
            }
            .time{
                text-align: center;
                opacity: 0.4;
            }
        } 
        .emoji{
            position: absolute;
            top: calc(~"100vh - 406px");
        }
        .input{
            height: 84px;
            width: 100%;
            border: none;
            resize: none;
            outline: none;
            border-bottom: 1px solid #e4e4e4;
        }
        .control{
            float: right;
        }
    }
</style>