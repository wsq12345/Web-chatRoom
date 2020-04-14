<template>
	<div id="login">
		<div class="form-container" v-if="login">
			<h2>用户登录</h2>
			<el-form label-position="top" :model="formData1" :rules="rules" ref="formData1">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="formData1.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="formData1.password" type="password"></el-input>
				</el-form-item>
				<el-button class="login-btn" type="success" @click="submitForm('formData1')" :loading="loading">登录</el-button>
				<el-button class="login-btn" type="success" @click="login=false,formData1={}">注册</el-button>
			</el-form>
		</div>
		<div class="form-container" v-if="!login">
			<h2>用户注册</h2>
			<el-form label-position="top" :model="formData2" :rules="rules" ref="formData2">
				<el-form-item label="用户名" prop="username1">
					<el-input v-model="formData2.username1"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password1">
					<el-input v-model="formData2.password1" type="password"></el-input>
				</el-form-item>
				<el-form-item label="再输一遍密码" prop="password2">
					<el-input v-model="formData2.password2" type="password"></el-input>
				</el-form-item>
				<el-button class="login-btn" type="success" @click="register('formData2')">注册</el-button>
				<el-button class="login-btn" type="success" @click="login=true,formData2={}">返回</el-button>
			</el-form>
		</div>
	</div>
</template>

<script>
  import { login,register } from '../api/api';
  //import NProgress from 'nprogress'
  export default {
			name: "login",
			data() {
				return {
					loading: false,
					login:true,
					formData1:{
						username:"",
						password:"",
					},
					formData2:{
						username1:"",
						password1:"",
						password2:""
					},
					rules:{
						username:[
							{required:true,message:'请输入用户名',trigger:'blur'},
							{min:3,max:10,message:'用户名长度需在3-10个字符之间',trigger:'blur'}
						],
						password:[
							{required:true,message:'请输入密码',trigger:'blur'},
							{min:6,message:'密码长度至少6个字符',trigger:'blur'}
						],
						username1:[
							{required:true,message:'请输入用户名',trigger:'blur'},
							{min:3,max:10,message:'用户名长度需在3-10个字符之间',trigger:'blur'}
						],
						password1:[
							{required:true,message:'请输入密码',trigger:'blur'},
							{min:6,message:'密码长度至少6个字符',trigger:'blur'}
						],
						password2:[
							{required:true,message:'请输入密码',trigger:'blur'},
							{min:6,message:'密码长度至少6个字符',trigger:'blur'}
						],
					}
				}
			},
			methods:{
				submitForm(FormData){
					this.$refs[FormData].validate(async (valid)=>{
						if(valid){
							this.loading=true;
							const params = new URLSearchParams();
						    params.append("username", this.formData1.username);
						    params.append("password", this.formData1.password);
							let log=await login(params);
							if(log=='error' ||log=='net'){
								this.loading=false;
								this.formData1={};
							}
							else{
								this.$message.success('登录成功');
								sessionStorage.setItem('user',this.formData1.username);//保存登录信息
								this.$router.replace('/chatRoom');
							}							
						}
						else{
							return false;
						}
					})
				},
				register(FormData){
					this.$refs[FormData].validate(async (valid)=>{
						if(valid){
							if(this.formData2.password1!=this.formData2.password2){
								return this.$message.error('2次输入密码不一样');
							}
							const params = new URLSearchParams();
						    params.append("username", this.formData2.username1);
							params.append("password", this.formData2.password1);
							let log=await register(params);
							if(log!='error'){
								this.$message.success('注册成功');
							}
							this.formData2={};
						}
						else{
							return false;
						}
					})
				}
			}
  }

</script>

<style lang="less" scoped>
		#login{
			height: 100vh;
			background: url(../assets/bg1.jpg) no-repeat;
			background-size: cover;
			display: flex;
			justify-content: center;
			align-items: center;
			.form-container{
				background: #1F2D3D;
				width: 500px;
				text-align: center;
				padding: 40px;
				border-radius: 20px;
				box-sizing: border-box;
				.login-btn{
					width: 100px;
				}
			}
		}
</style>