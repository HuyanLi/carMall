<template>
		<view class="uni-tabbar">
			<view class="uni-tabbar__item" v-for="(item,index) in tabbar" :key="index" @tap="changeTab(item)">
				<view class="uni-tabbar__bd">
					<view class="uni-tabbar__icon">
						<image v-if="index == current" class="icon-img" :src="item.selectedIconPath" mode="aspectFit"></image>
						<image v-else class="icon-img" mode="aspectFit" :src="item.iconPath"></image>
					</view>
				</view>
				<view class="uni-tabbar__label" :class="{'active': index == current}">
					{{item.text}}
				</view>
			</view>
		</view>
</template>
<script>
	export default {
		props: {
			current: Number,
			tabbar: Array,
		},
		data() {
			return {
				// page: '',
				showPage: false,
				containerHeight: 400,
				//公共的tabbar
				// tabBar: [{
				// 		"pagePath": "pages/tabBar/home/home",
				// 		"iconPath": "https://baiyuechangxiong-pic.luobo.info/che/static/image/home/home1.png",
				// 		"selectedIconPath": "https://baiyuechangxiong-pic.luobo.info/che/static/image/home/home.png",
				// 		"text": "首页"
				// 	},{
				// 		"pagePath": "pages/tabBar/mall/mall",
				// 		"iconPath": "https://baiyuechangxiong-pic.luobo.info/che/static/image/home/mall.png",
				// 		"selectedIconPath": "https://baiyuechangxiong-pic.luobo.info/che/static/image/home/mall1.png",
				// 		"text": "品牌专区"
				// 	}
				// 	// ,{
				// 	// 	"pagePath": "pages/tabBar/service/service",
				// 	// 	"iconPath": "https://baiyuechangxiong-pic.luobo.info/che/static/image/home/service.png",
				// 	// 	"selectedIconPath": "https://baiyuechangxiong-pic.luobo.info/che/static/image/home/serviceActive.png",
				// 	// 	"text": "客服"
				// 	// },{
				// 	// 	"pagePath": "pages/tabBar/mine/mine",
				// 	// 	"iconPath": "https://baiyuechangxiong-pic.luobo.info/che/static/image/home/mine.png",
				// 	// 	"selectedIconPath": "https://baiyuechangxiong-pic.luobo.info/che/static/image/home/mineActive.png",
				// 	// 	"text": "我的"
				// 	// }
				// ]
			};
		},
		watch: {
			pagePath: {
				handler(pagePath) {
				},
				immediate: true
			},
			tabbar: {
				handler(newd,old) {
					if(newd!==old) {
						console.log(newd,old,'tabbar')
					}
				},
				immediate: true
			}
		},
		mounted() {
			// 根据自己的业务需求判断条件为true，替换即可,根据权限设置的tabbar	
			//第三个参数为插入项,第一个参数为第一项位置，第二个参数为要删除几个。
			// this.userInfo = this.$store.state.user.userInfo
			
		},
		methods: {
			changeTab(item) {
				this.page = item.pagePath;
				uni.reLaunch({
					url: '/' + this.page,
				});
			},
		}
	}
</script>
<style lang="scss" scoped>
	.uni-tabbar {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		height: 100rpx;
		padding: 16rpx 0;
		box-sizing: border-box;
		border-top: solid 1rpx #ccc;
		background-color: #fff;
		box-shadow: 0px 0px 17rpx 1rpx rgba(206, 206, 206, 0.32);
		.uni-tabbar__item {
			display: block;
			line-height: 24rpx;
			font-size: 20rpx;
			text-align: center;
			flex: 1;
		}
		.uni-tabbar__icon {
			height: 24px;
			line-height: 24px;
			text-align: center;
			display: inline-block;
		}
		.icon {
			display: inline-block;
		}
		.uni-tabbar__label {
			font-family: PingFangSC-Regular;
			font-weight: 400;
			font-size: 22rpx;
			color: #C9CCDB;
			&.active {
			  color: #202425;
			}
		}
		.icon-img {
			height: 24px;
			width: 24px;
		}
	}
</style>