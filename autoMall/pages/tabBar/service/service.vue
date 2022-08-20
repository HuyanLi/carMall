<template>
	<view class="service">
		<view class="service-content">
			<view class="">
				<text>常见问题</text>
			</view>
			<rich-text :nodes="content"></rich-text>
		</view>
		<button type="default" @click="toShare">在线客服</button>
		<!-- tabBar -->
		<tab-bar :current="currentTabIndex" :tabbar='tabbar' :approve='approve' backgroundColor="#fbfbfb" color="#999" tintColor="#42b983" @click="tabClick"></tab-bar>
	</view>
</template>

<script>
	import { getQuestion } from '@/api/service.js'
	export default {
		data() {
			return {
				currentTabIndex: 2,
				content: '',
				tabbar: uni.getStorageSync('tabbar')
			}
		},
		onLoad() {
			var data = '<p><img src="https://public.haotiku.com/haotiku/videos/20220216/1644974733576.png" alt="" width="571" height="337" /></p><p>应用内集成的第三方SDK以及插件：<br />1.cn.jpush.android: 用来给用户推送应用内资讯信息以及消息通知。<br />2.com.alipay：用于app内会员支付信息费<br />3.com.umeng.commonsdk：用于微信 qq等第三方登录授权以及分享。<br />4.com.amap.api：高德地图用于发布职位定位，已经用户入职导航。</p>';
			data = data.replace(/\<img/g, "<img style='width: 100%;'")
			this.content= data;
		},
		created() {
			this.initQuestion()
		},
		methods: {
			initQuestion() {
				getQuestion().then(res=>{
					if(res.code === "1") {
						
					}
				})
			},
			toShare() {
				wx.openCustomerServiceChat({
					extInfo: {
						url: 'https://work.weixin.qq.com/...'//客服地址链接
					},
					corpId: '企业ID',//必须和你小程序上的一致
					success(res) {
						console.log(res, 1)
					},
					fail(res) {
						console.log(res, 2)
					},
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.service {
	padding-bottom: 100rpx;
	// padding-top: 124rpx;
	position: relative;
	width: 750rpx;
	&-content {
		padding: 30rpx;
		// height: 1132rpx;
		background: #FFFFFF;
		text {
			color: #424242;
			display: inline-block;
			margin: 0 0 30rpx 0;
			font-weight: 600;
			font-size: 28rpx;
		}
	}
	button {
		width: 690rpx;
		height: 90rpx;
		line-height: 90rpx;
		background-color: #202425;
		border-radius: 8rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		font-size: 24rpx;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		margin: 40rpx auto 30rpx;
		position: fixed;
		bottom: 100rpx;
		left: 30rpx;
	}
}
</style>
