<template>
	<view class="page">
		<!-- 视频播放 start -->
		<view class="player">
			<video :src="videoUrl" 
				class="movie" 
				id="myVideo"
				controls></video>
		</view>
		<!-- 视频播放 end -->
		
		<!-- 影片基本信息 start -->
		<view class="movie-info">
			<image 
				:src="cover" 
				@click="proView"
				class="cover"></image>
			
			<view class="movie-desc">
				<view class="title">{{movieInfo.title}}</view>
				<view class="basic-info">{{movieInfo.time}}</view>
				<view class="basic-info">{{movieInfo.eName}}</view>
				<view class="basic-info">{{movieInfo.duration}}</view>
				<view class="basic-info">{{movieInfo.online}}</view>
				
				<view class="score-block">
					<view class="big-score">
						<view class="score-words">综合评分：</view>
						<view class="movie-score">{{movieInfo.score}}</view>
					</view>
					
					<view class="score-stars">
						<block v-if="movieInfo.score >= 0">
							<star :innerScore="movieInfo.score" showScore="0"></star>
						</block>
						
						<view class="prise-counts">
							{{movieInfo.priseCounts}} 人点赞
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 影片基本信息 end -->
		
		<line></line>
		
		<!-- 剧情介绍 start -->
		<view class="plots-block">
			<view class="plots-title">
				{{movieInfo.title}}
			</view>
			<view class="plots-desc">
				{{movieInfo.content}}
			</view>
		</view>
		<!-- 剧情介绍 end -->
		
		<!-- 演职人员及剧照 start -->
		
		<!-- 演职人员及剧照 end -->
	</view>
</template>

<script>
	import star from "../../components/star.vue";
	import lineComp from "../../components/line.vue";
	
	export default {
		data() {
			return {
				movieInfo: {},
				cover: this.onlineImageUrl,
				videoUrl: this.onlineVideoUrl
			}
		},
		onReady() {
			this.videoContext = uni.createVideoContext('myVideo');
		},
		onHide() {
			// 页面隐藏，视频暂停
			this.videoContext.pause();
		},
		onShow() {
			// 页面显示，视频播放
			if(this.videoContext) {
				this.videoContext.play();
			}
		},
		onLoad(params) {
			this.movieInfo = JSON.parse(params.movieInfo);
			
			// 通过api修改导航栏的属性
			uni.setNavigationBarColor({
				frontColor: "#ffffff",
				backgroundColor: "#000000"
			});
		},
		components: {
			star,lineComp
		},
		// 此函数仅支持小程序端的分享，分享到微信群或者微信好友
		onShareAppMessage(res) {
			return {
				title: '毒液：致命守护者',
				path: '/pages/movie/movie'
			}
		},
		// 监听导航栏的按钮
		onNavigationBarButtonTap(e) {
			var me = this;
			var index = e.index;
			uni.share({
				provider: "weixin",
				scene: "WXSenceTimeline",
				type: 0,
				href: "http://uniapp.dcloud.io/",
				title: "超级电影分享",
				summary: "超级英雄电影预告，赶紧跟我一起来体验！",
				imageUrl: me.cover,
				success: function (res) {
					console.log("success:" + JSON.stringify(res));
				},
				fail: function (err) {
					console.log("fail:" + JSON.stringify(err));
				}
			})
		},
		methods: {
			proView() {
				uni.navigateTo({
					url: "../cover/cover"
				})
			}
		}
	}
</script>

<style>
	@import url("movie.css");
</style>
