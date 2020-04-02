<template>
    <div contenteditable="true" id="div_input"
         v-html="innerText" @keydown.enter.exact="send"
         @blur="changeText($event)"></div>
</template>
<script>
// import Bus from '../utils/bus'
    export default {
        props: ['value'],
        data(){
            return {
                innerText:this.value
            }
        },
        methods:{
            changeText($event){  //失去焦点获取输入
                this.innerText = $event.target.innerHTML;
                this.$emit('input',this.innerText);
                // this.$nextTick(()=>{
                //     this.po_Last($event.target)
                // })
            },
            // po_Last(obj) {
            //     if (window.getSelection) {//ie11 10 9 ff safari
            //         obj.focus(); //解决ff不获取焦点无法定位问题
            //         var range = window.getSelection();//创建range
            //         range.selectAllChildren(obj);//range 选择obj下所有子内容
            //         range.collapseToEnd();//光标移至最后
            //     }
            //     else if (document.selection) {//ie10 9 8 7 6 5
            //         var range = document.selection.createRange();//创建选择对象
            //         //var range = document.body.createTextRange();
            //         range.moveToElementText(obj);//range定位到obj
            //         range.collapse(false);//光标移至最后
            //         range.select();
            //     }
            // },
            loseBlur(){ //手动失去焦点获取数据
                return new Promise((resolve,reject)=>{
                    document.getElementById('div_input').blur();
                    setTimeout(()=>{
                        resolve(this.innerText);
                    },5)
                })
            },
            async send(){
                let data=await this.loseBlur();
                this.$emit('send',data);        
            }
        },
        watch:{
            value(val){
                this.innerText=val;
            }
        }
    }
</script>

<style lang="less" scoped>
    #div_input{
        overflow: auto;
    }
</style>