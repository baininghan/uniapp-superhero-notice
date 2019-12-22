<template>
	<view class="page">
		<view class="search-block">
			<view class="search-icon-wapper">
				<image src="../../static/icos/search.png" class="search-icon"></image>
			</view>
			<input 
				placeholder="搜索预告片" 
				maxlength="10" 
				class="search-text" 
				confirm-type="search"
				@confirm="searchMe"
			/>
		</view>
		
		<view class="page-block movie-list">
			<view class="movie-wapper">
				<image :src="cover" class="poster" @click="showMovieDetail"></image>
			</view>
			<view class="movie-wapper">
				<image :src="cover" class="poster" @click="showMovieDetail"></image>
			</view>
			<view class="movie-wapper">
				<image :src="cover" class="poster" @click="showMovieDetail"></image>
			</view>
			<view class="movie-wapper">
				<image :src="cover" class="poster" @click="showMovieDetail"></image>
			</view>
			<view class="movie-wapper">
				<image :src="cover" class="poster" @click="showMovieDetail"></image>
			</view>
			<view class="movie-wapper">
				<image :src="cover" class="poster" @click="showMovieDetail"></image>
			</view>
			<view class="movie-wapper">
				<image :src="cover" class="poster" @click="showMovieDetail"></image>
			</view>
			<view class="movie-wapper">
				<image :src="cover" class="poster" @click="showMovieDetail"></image>
			</view>
			<view class="movie-wapper">
				<image :src="cover" class="poster" @click="showMovieDetail"></image>
			</view>
			<view class="movie-wapper">
				<image :src="cover" class="poster" @click="showMovieDetail"></image>
			</view>
			<view class="movie-wapper">
				<image :src="cover" class="poster" @click="showMovieDetail"></image>
			</view>
			<view class="movie-wapper">
				<image :src="cover" class="poster" @click="showMovieDetail"></image>
			</view>
			<view class="movie-wapper">
				<image :src="cover" class="poster" @click="showMovieDetail"></image>
			</view>
			<view class="movie-wapper">
				<image :src="cover" class="poster" @click="showMovieDetail"></image>
			</view>
			<view class="movie-wapper">
				<image :src="cover" class="poster" @click="showMovieDetail"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				movieList: [],
				keywords: "",
				page: 1,
				totalPage: 1,
				limit: 15,
				cover: this.onlineImageUrl
			}
		},
		onReachBottom() {
			var page = this.page + 1;
			if(page > this.totalPage) {
				return;
			}
			this.queryMovie(this.keywords, page, this.limit)
		},
		methods: {
			queryMovie(keywords, page, limit) {
				uni.showLoading({
					title: "调用后台接口，查询分页"
				});
				setTimeout(function(){
					uni.hideLoading();
				}.bind(this), 3000);
				
				
				// 将查询结果拼接
				// this.movieList = this.movieList.concat(result.data);
			},
			searchMe(e) {
				var value = e.detail.value;
				this.keywords = value;
				this.movieList = [];
				this.queryMovie(value, 1, this.limit);
			},
			showMovieDetail(e) {
				var movieInfo = {
					title: '毒液：致命守护者',
					time: '2018 / 美国 / 科幻 / 超级英雄',
					eName: '原名：Avengers',
					duration: '影片时长：150分钟',
					online: '上映时间：2018-05-11',
					score: 9.1,
					priseCounts: 8763,
					content: 'CW发布今年交叉事件“无限地球危机”终极预告，多重宇宙遭遇反物质波威胁，大家需要找到分散在全宇宙的七个英雄才能阻止它，《超人前传》版超人、《超人归来》版超人和蝙蝠侠均将登场，美国时间12月8日本周日开播'
				};
				uni.navigateTo({
					url: "../movie/movie?movieInfo=" + JSON.stringify(movieInfo)
				});
			}
		}
	}
</script>

<style>
	@import url("search.css");
</style>
