<!-- 商品详情 -->
<template>
	<view class="brandDetail">
		<view class="myContainer">
			<view class="uni-margin-wrap">
				<swiper class="swiper image-container" circular :indicator-dots="indicatorDots" :interval="interval" :duration="duration">
					<swiper-item v-for="(item, index) in imgList" :key="index">
						<view class="item" :class="currentIndex == index ? 'item-img' : 'item-img-side'">
							<image :src="item.bannerUrl" mode=""></image>
						</view>
					</swiper-item>
				</swiper>
			</view>	
		</view>
		<view class="title">
			<text>MICHELIN轮胎 性能三合一 都市畅行更放心</text>
		</view>
		<view class="detailBox">
			<text>商品详情</text>
			<rich-text class="richBox" :nodes="content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0,
				imgList: [{
					bannerUrl: require('../../../static/image/home/banner1.png')
				},
				{
					bannerUrl: require('../../../static/image/home/banner1.png')
				},
				{
					bannerUrl: require('../../../static/image/home/banner1.png')
				},
				{
					bannerUrl: require('../../../static/image/home/banner1.png')
				}
				],
				goodsIndex: 0,
				indicatorDots: true,
				autoplay: false,
				interval: 2000,
				duration: 500,
				tabbarHeights: '100',
				content: ''
			}
		},
		onLoad(){
			var data = '<p><img src="https://public.haotiku.com/haotiku/videos/20220216/1644974733576.png" alt="" width="571" height="337" /></p><p>应用内集成的第三方SDK以及插件：<br />1.cn.jpush.android: 用来给用户推送应用内资讯信息以及消息通知。<br />2.com.alipay：用于app内会员支付信息费<br />3.com.umeng.commonsdk：用于微信 qq等第三方登录授权以及分享。<br />4.com.amap.api：高德地图用于发布职位定位，已经用户入职导航。</p>';
			data = data.replace(/\<img/g, "<img style='width: 100%;'")
			this.content= data;
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.brandDetail {
	// padding-bottom: 150rpx;
	.myContainer {
		width: 750rpx;
		display: flex;
		justify-content: center;
		border-radius:7rpx;
		position: relative;
		overflow: hidden;
		// margin-top: 16rpx;
		// 轮播图
		.image-container {
			width: 750rpx;
			// height: 747rpx;
			.item {
				position: relative;
				overflow: hidden;
				image{
					display: block;
					width: 100%;
					height: 100%;
				}
			}
			.item-img {
				width: 100%;
				height: 100%;
				margin: 0 auto;
			}
			.swiper-item {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.item-img-side {
				width: 100%;
				height: 100%;
				// animation: to-mini .2s;
				margin: 15rpx auto;
			}
		}
		
	}
	.title {
		// width: 750rpx;
		// height: 94rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		text {
			font-family: PingFangSC-Regular;
			font-weight: 400;
			font-size: 30rpx;
			color: #333333;
		}
	}
	.detailBox {
		padding: 25rpx 30rpx 100rpx;
		background: #FFFFFF;
		text {
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			font-size: 28rpx;
			color: #424242;
			display: block;
		}
		.richBox {
			padding: 20rpx 30rpx;
			width: 690rpx;
			height: 505rpx;
			// border: 1rpx solid #979797;
		}
	}
}
</style>
