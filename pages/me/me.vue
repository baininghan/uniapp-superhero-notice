<template>
	<view class="page page-fill">
		
		<view class="header">
			<view v-if="userIsLogin">
				<image :src="globalUser.faceImage" class="face"></image>
			</view>
			<view v-else>
				<image src="http://122.152.205.72:88/group1/M00/00/05/CpoxxFw_-5-AFyVyAABLIH8xBTw233.png" class="face"></image>
			</view>
			
			<view class="info-wapper" v-if="userIsLogin">
				<view class="nickname">
					{{globalUser.username}}
				</view>
				<view class="nav-info">
					ID: {{globalUser.userid}}
				</view>
			</view>
			<view v-else>
				<navigator url="../registLogin/registLogin">
					<view class="nickname regist-login">
						注册/登录
					</view>
				</navigator>
				
			</view>
			
			<view class="set-wapper" v-if="userIsLogin" @click="toUserInfoPage">
				<image src="../../static/icos/settings.png" class="settings"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userIsLogin: false,
				globalUser:{
					username: '',
					userid: '',
					faceImage: ''
				}
			}
		},
		onLoad() {
			this.checkLogin();
		},
		onShow() {
			this.checkLogin();
		},
		methods: {
			checkLogin() {
				uni.getStorage({
					key: 'globalUser',
					success: (res) => {
						this.globalUser.username = res.data.username;
						this.globalUser.userid = new Date().getMilliseconds();
						this.globalUser.faceImage = '../../static/icos/default-face.png';
						this.userIsLogin = true;
					},
					fail: (error) => {
						this.userIsLogin = false;
					}
				});
			},
			toUserInfoPage() {
				uni.navigateTo({
					url: "../meInfo/meInfo?globalUser=" + JSON.stringify(this.globalUser)
				})
			}
		}
	}
</script>

<style>
	@import url("me.css");
</style>
