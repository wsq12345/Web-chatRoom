<template>
    <div class="upload">
        <div class="uploadBox">
            <div class="fileBox">
                <input type="file" id="myFile" class="inputfile" @change="handlerUpload($event)">
                <label for="myFile">
                    <i class="iconfont icon-shangchuan"></i>点击上传本地文件
                </label>
            </div>
            <ul class="files">
                <li v-for="file in files" :key="file.index">
                    <div class="fileInfo">
                        <span class="fileName filePart">
                            {{ file.name }}
                        </span>
                        <span class="fileSize filePart ml10">
                            {{file.size}}
                        </span>
                        <!--进度条-->
                        <div class="progress">
                            <span :style="{width:file.uploadPercentage,backgroundColor:file.uploadStatus==1 ||file.uploadStatus==2?'':'red'}"></span>
                        </div>
                        <div class="fileStatus">
                            <span v-if="file.uploadStatus == -1" class="uploadFail">出错啦，请重新上传或者删除</span>
                            <span v-if="file.uploadStatus == 2" class="uploadSuccess"> 已上传</span>
                            <span v-if="file.uploadStatus == 1" class="uploadSuccess"> 上传中...</span>
                            <span v-if="file.uploadStatus == -2" class="uploadFail">出错啦，文件大小超出限制</span>
                        </div>
                    </div>
                </li>
            </ul>
            <el-button size="small" type="primary" class="btn" @click="close()">close</el-button>
        </div>
        
    </div>
</template>

<script>
import {upload} from '../api/api'
export default {
    name: 'upload',
    data(){
        return{
            files:[],
            uploadSuccess: 0
        }
    },
    methods:{
        handlerUpload(e){
            //获取选定的文件
            let tFiles = e.target.files;
            let len = tFiles.length;
            for (var i = 0; i < len; i++) {
                //开始上传每一个文件
                var item = {
                    name: tFiles[i].name,
                    uploadPercentage: 1,
                    size: this.formatFileSize(tFiles[i].size, 0),
                    uploadStatus: 0
                }
                //console.log(item)
                this.files.push(item);
                //开始上传文件 新建一个formData
                let param = new FormData();
                param.append("name", "wiiiiiinney");
                //通过append向form对象添加数据
                param.append("file", tFiles[i]);
                //FormData私有类对象，访问不到，可以通过get判断值是否传进去
                //console.log(param.get("file"));
                //判断大小
                if (!this.checkFileSize(tFiles[i].size)) {
                    item.uploadStatus = -2;
                    return false;
                }
                //通过axios上传文件
                //配置
                let config = {
                    //添加请求头 
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    //添加上传进度监听事件 
                    onUploadProgress: e => {
                        var completeProgress = ((e.loaded / e.total * 100) | 0) + "%";
                        console.log(this.files)
                        item.uploadPercentage = completeProgress;
                    }
                };
                upload(param,config).then(response=>{
                    item.uploadStatus=2;
                    //console.log(response.data);
                    this.$emit('sendFile',response.data);
                }).catch(e=>{
                    item.uploadStatus=-1;
                })
            }
        },
        formatFileSize(fileSize, idx){
            var units = ["B", "KB", "MB", "GB"];
            idx = idx || 0;
            if (fileSize < 1024 || idx === units.length - 1) {
                return fileSize.toFixed(1) + units[idx];
            }
            return this.formatFileSize(fileSize / 1024, ++idx);
        },
        checkFileSize(fileSize){
            //100M
            const MAX_SIZE = 100 * 1024 * 1024;
            if (fileSize > MAX_SIZE) {
                return false;
            }
            return true;
        },
        close(){
            this.$emit('closeFile');
        }
    }
}
</script>

<style lang="less">
        .uploadBox {
            width: 300px;
            border: 1px solid #ccc;
            z-index: 999;
            background: whitesmoke;
        }

        .fileBox,
        .fileInfo {
            margin: 16px;
            height: 60px;
            line-height: 60px;
            border: 1px solid #ccc;
            padding-left: 16px;
            font-size: 16px;
        }

        .inputfile {
            width: 0.1px;
            height: 0.1px;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: -1;
        }

        /*E + F 毗邻元素选择器，匹配所有紧随E元素之后的同级元素F*/

        .inputfile+label {
            color: #3e97df;
            display: inline-block;
        }

        .inputfile:focus+label,
        .inputfile+label:hover {
            color: #0c89f0;
        }
        .files{
            max-height: 10rem;
            overflow: auto;
        }
        .filePart {
            line-height: 30px;
            overflow: hidden;
            float: left;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 12px;
            height: 30px;
        }

        .fileStatus {
            overflow: hidden;
            float: left;
            height: 20px;
            font-size: 10px;
            line-height: 20px;
        }

        .ml10 {
            margin-left: 10px;
        }

        .fileName {
            width: 150px;
        }

        .fileSize {
            width: 60px;
            text-align: center;
        }

        .uploadFail {
            color: #ff0800d3;
        }

        .uploadSuccess {
            color: #2c832c;
        }

        /*对应CSS*/

        .progress {
            position: relative;
            width: 80%;
            height: 8px;
            border: 1px solid #ccc;
            border-radius: 5px;
            overflow: hidden;
            /*注意这里*/
            box-shadow: 0 0 1px 0px #ddd inset;
        }

        .progress span {
            position: absolute;
            display: inline-block;
            width: 10%;
            height: 100%;
            background-color: #3e97df;
        }
        .btn{
            margin-left: 50%;
            transform: translateX(-50%);
        }
</style>