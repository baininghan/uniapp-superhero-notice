<template>
	<view class="page">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="carousel">
			<swiper-item>
				<image src="../../static/carousel/batmanvssuperman.png" class="carousel"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/carousel/spiderman.png" class="carousel"></image>
			</swiper-item>
		</swiper>
		
		<!-- 热门超英 start -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/icos/hot.png" class="hot-icon"></image>
				<view class="hot-title">
					热门超英
				</view>
			</view>
		</view>
		
		<scroll-view scroll-x="true" class="page-block hot">
			<view class="single-poster" v-for="(item, index) in 5" :key="index">
				<view class="poster-wapper">
					<image src="../../static/poster/civilwar.jpg" class="poster"></image>
					<view class="movie-name">
						复仇者联盟3：最终之战
					</view>
					<star innerScore="9.1" showScore="1"></star>
				</view>
			</view>
		</scroll-view>
		<!-- 热门超英 end -->
		
		<!-- 热门预告 start -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/icos/108x108.png" class="hot-icon"></image>
				<view class="hot-title">
					热门预告
				</view>
			</view>
		</view>
		<view class="page-block hot-movie">
			<video id="video1" :data-playIndex="1" @play="meIsPlay" :src="videoUrl" class="hot-movie-single" poster="../../static/carousel/spiderman.png"></video>
			<video id="video2" :data-playIndex="2" @play="meIsPlay" :src="videoUrl" class="hot-movie-single" poster="../../static/carousel/spiderman.png"></video>
			<video id="video3" :data-playIndex="3" @play="meIsPlay" :src="videoUrl" class="hot-movie-single" poster="../../static/carousel/spiderman.png"></video>
			<video id="video4" :data-playIndex="4" @play="meIsPlay" :src="videoUrl" class="hot-movie-single" poster="../../static/carousel/spiderman.png"></video>
		</view>
		<!-- 热门预告 end -->
		
		<!-- 猜你喜欢 start -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/icos/guess-u-like.png" class="hot-icon"></image>
				<view class="hot-title">
					猜你喜欢
				</view>
			</view>
		</view>
		
		<view class="page-block guess-u-like">
			<view class="single-like-movie" v-for="(item, gIndex) in 4" :key="item">
				<image src="../../static/poster/civilwar.jpg" class="like-movie"></image>
				<view class="movie-desc">
					<view class="movie-title">
						复仇者联盟3
					</view>
					<star innerScore="9.1" showScore="0"></star>
					<view class="movie-info">
						2019 / 美国 / 科幻 动作
					</view>
					<view class="movie-info">
						本·阿弗莱克 / 亨利·卡维尔 / 艾米·亚当斯 / 盖尔·加朵
					</view>
				</view>
				<view class="movie-oper" :data-gIndex="gIndex" @click="praiseMe">
					<image src="../../static/icos/praise.png" class="praise-icon"></image>
					<view class="praise-me">
						赞一下
					</view>
					<view :animation="animationDataArr[gIndex]" class="praise-me animation-opacity">
						+1
					</view>
				</view>
			</view>
		</view>
		<!-- 猜你喜欢 end -->
	</view>
</template>

<script>
	import star from "../../components/star.vue";
	
	export default {
		data() {
			return {
				corouselList: [],
				animationData: {},// 点赞动画数据
				animationDataArr: [
					{},{},{},{},{}
				],
				videoUrl: this.onlineVideoUrl
			}
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		},
		onLoad() {
			// this.loadImage();
			
			// #ifdef APP-PLUS || MP-WEIXIN
			this.animation = uni.createAnimation();
			// #endif
			
		},
		onUnload() {
			this.animationData = {};
			this.animationDataArr = [
				{}, {}, {}, {}, {}
			];
		},
		onHide() {
			// #ifdef APP-PLUS || MP-WEIXIN
			if(this.videoContext) {
				this.videoContext.pause();
			}
			// #endif
		},
		onShow() {
			// #ifdef APP-PLUS || MP-WEIXIN
			if(this.videoContext) {
				this.videoContext.play();
			}
			// #endif
		},
		methods: {
			meIsPlay(e) {
				// 播放一个视频的时候，需要暂停其他正在播放的视频
				// #ifdef APP-PLUS || MP-WEIXIN
				var me = this;
				var videoId = "";
				if(e) {
					videoId = e.currentTarget.dataset.playindex;
					me.videoContext = uni.createVideoContext('video' + videoId);
				}
				for (var i = 0; i < 4; i++) {
					if(i != videoId) {
						uni.createVideoContext('video' + i).pause();
					}
				}
				// #endif
			},
			loadImage() {
				uni.request({
					url: this.serverUrl + "/carousel/list",
					method: "POST",
					success: (res) => {
						this.corouselList = res.data.data;
					}
				})
			},
			praiseMe(e){
				// #ifdef APP-PLUS || MP-WEIXIN
				var gIndex = e.currentTarget.dataset.gindex;

				// 构建动画数据，并且通过step来表示这组动画的完成
				this.animation.translateY(-60).opacity(1).step({
					duration: 400
				});
				
				// 导出动画数据到view组件，实现组件的动画效果
				// this.animationData = this.animation.export();
				this.animationData = this.animation;
				this.animationDataArr[gIndex] = this.animationData.export();
				
				// 还原动画
				setTimeout(function() {
					this.animation.translateY(0).opacity(0).step({
						duration: 0
					});
					this.animationData = this.animation;
					this.animationDataArr[gIndex] = this.animationData.export();
				}.bind(this), 800)
				// #endif
			}
			
		},
		components: {
			star
		}
	}
</script>

<style>
	@import url("index.css");
</style>
