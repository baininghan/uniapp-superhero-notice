<template>
	<view class="black">
		<image 
			:src="cover" 
			mode="widthFix"
			@longpress="showActionSheet"
			class="cover"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cover: 'http://122.152.205.72:88/superhero/MARVEL/Venom/cover.jpg'
			}
		},
		onLoad() {
			// 通过api修改导航栏的属性
			uni.setNavigationBarColor({
				frontColor: "#ffffff",
				backgroundColor: "#000000"
			});
		},
		methods: {
			showActionSheet() {
				var me = this;
				uni.showActionSheet({
					itemList: ["保存图片"],
					success(res) {
						var tapIndex = res.tapIndex;
						console.log(tapIndex);
						if(0 == tapIndex) {
							uni.showLoading({
								title: '正在保存图片'
							});
							uni.downloadFile({
								url: me.cover,
								success(result) {
									var tempFilePath = result.tempFilePath;
									
									uni.saveImageToPhotosAlbum({
										filePath: tempFilePath,
										success() {
											uni.showToast({
												title: "保存成功",
												duration: 2000,
											})
										}
									})
								},
								complete() {
									uni.hideLoading();
								}
							})
						}
					}
				})
			},
			downloadFile() {
				uni.downloadFile({
					url: "",
					success() {
						
					}
				});
			}
		}
	}
</script>

<style>
	.black {
		background-color: #000000;
		width: 100%;
		height: 100%;
		
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: fixed;
	}
	.cover {
		align-self: center;
	}
</style>
