<template>
	<footer id="footer">
		<div class="guide_item" @click="goto('/home')" :class="{on:'/home'===$route.path}">
			<span class="item_icon">
				<i class="iconfont icon-tubiao15"></i>
			</span>
			<span class="guide_msg">消息</span>
		</div>
		<div class="guide_item" @click="goto('/friendList')" :class="{on:'/friendList'===$route.path}">
			<span class="item_icon">
				<i class="iconfont icon-linkman-contacts_ico"></i>
			</span>
			<span class="guide_msg">好友</span>
		</div>
		<div class="guide_item" @click="goto('/search')" :class="{on:'/search'===$route.path}">
			<span class="item_icon">
				<i class="iconfont icon-dongtai"></i>
			</span>
			<span class="guide_msg">搜索</span>
		</div>
		<div class="guide_item" @click="goto('/mypage')" :class="{on:'/mypage'===$route.path}">
			<span class="item_icon">
				<i class="iconfont icon-wode"></i>
			</span>
			<span class="guide_msg">我的</span>
		</div>
	</footer>
</template>

<script>
	export default{
		methods:{
			goto(path){
				this.$router.replace(path);
			}
		}
	}
</script>

<style lang="less">
	#footer{
		position: fixed;
		bottom: 0px;
		border-top: 1px solid #e4e4e4;
		width: 100%;
		background: white;
		display: flex;
		height: 3rem;
		.guide_item{
			display: flex;
			flex: 1;
			flex-direction: column;
			text-align: center;
			.iconfont{
				font-size: 1.5rem;
			}
			.guide_msg{
				font-size: 0.8rem;
			}
			&.on{
				color: #42B983;
			}
		}
	}	
</style>
