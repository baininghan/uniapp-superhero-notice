<template name="star">
	<view class="movie-score-wapper">		
		<image 
			v-for="yellow in yellowStar" 
			src="../static/icos/star-yellow.png" 
			class="star-icon"></image>
		<image v-for="gray in grayStar" 
			src="../static/icos/star-gray.png" 
			class="star-icon"></image>
		<view class="movie-score" v-if="showScore==1">
			{{innerScore}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "star",
		data() {
			return {
				yellowStar: 0,
				grayStar: 5
			};
		},
		props: {
			innerScore: 0,	/* 分数值 */
			showScore: 0	/* 是否显示分数，0：不显示；1-显示 */
		},
		created() {
			this.yellowStar = parseInt(this.innerScore / 2);
			this.grayStar = 5 - this.yellowStar;
		}
	}
</script>

<style>
	.movie-score-wapper {
		display: flex;
		flex-direction: row;
	}

	.star-icon {
		width: 20upx;
		height: 20upx;
		margin-top: 6upx;
	}

	.movie-score {
		font-size: 12px;
		color: gray;
		margin-left: 8upx;
	}
</style>
