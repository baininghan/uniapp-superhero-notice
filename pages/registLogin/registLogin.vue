<template>
	<view class="body">
		
		<form @submit="formSubmit">
			
			<view class="face-wapper">
				<image src="../../static/icos/default-face.png" class="face"></image>
			</view>
			
			<view class="info-wapper">
				<label class="words-lbl">账号</label>
				<input name="username" type="text" class="input" placeholder="请输入用户名" placeholder-class="graywords" />
			</view>
			<view class="info-wapper" style="margin-top: 40upx;">
				<label class="words-lbl">密码</label>
				<input name="password" type="text" class="input" password="true" placeholder="请输入密码" placeholder-class="graywords" />
			</view>
			
			<button type="primary" form-type="submit" style="margin-top: 60upx; width: 90%;">注册/登录</button>
		</form>
		
		<!-- 第三方登录H5不支持，所以隐藏掉 -->
		<!-- #ifndef H5 -->
		<view class="third-wapper">
			
			<view class="third-line">
				<view class="single-line">
					<view class="line"></view>
				</view>
				
				<view class="third-words">第三方账号登录</view>
				
				<view class="single-line">
					<view class="line"></view>
				</view>
			</view>
			
			<view class="third-icos-wapper">
				<!-- 5+app 用qq/微信/微博 登录 小程序用微信小程序登录 h5不支持 -->
				<!-- #ifdef APP-PLUS -->
					<image src="../../static/icos/weixin.png" data-logintype="weixin" @click="appOAuthLogin" class="third-ico"></image>
					<image src="../../static/icos/QQ.png" data-logintype="qq" @click="appOAuthLogin" class="third-ico" style="margin-left: 80upx;"></image>
					<image src="../../static/icos/weibo.png" data-logintype="sinaweibo" @click="appOAuthLogin" class="third-ico" style="margin-left: 80upx;"></image>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
					<button open-type='getUserInfo' @getuserinfo="wxLogin" class="third-btn-ico">
					</button>
				<!-- #endif -->
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			formSubmit(e){
				var me = this;
				var username = e.detail.value.username;
				var password = e.detail.value.password;
				
				var globalUser = {};
				globalUser.username = username;
				globalUser.userid = new Date().getTime();
				globalUser.sex = '1';
				globalUser.birthday = '1999-10-01';
				globalUser.nickname = '凡辛';
				globalUser.faceImage = '../../static/icos/left-gray-arrow.png';
				
				uni.setStorageSync("globalUser", e.detail.value);
				
				uni.showLoading({
					title: '注册/登录成功',
					success: () => {
						uni.navigateBack({
							animationDuration: 1000
						})
					}
				})
			}
		}
	}
</script>

<style>
	@import url("registLogin.css");
</style>
