<!-- 拼团活动 -->
<template>
	<view class="groupA">
		<view class="box">
			<rich-text :nodes="content"></rich-text>
			<button type="default" @click="toShare">去签约</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ''
			}
		},
		onLoad(){
			var data = '<p><img src="https://public.haotiku.com/haotiku/videos/20220216/1644974733576.png" alt="" width="571" height="337" /></p><p>应用内集成的第三方SDK以及插件：<br />1.cn.jpush.android: 用来给用户推送应用内资讯信息以及消息通知。<br />2.com.alipay：用于app内会员支付信息费<br />3.com.umeng.commonsdk：用于微信 qq等第三方登录授权以及分享。<br />4.com.amap.api：高德地图用于发布职位定位，已经用户入职导航。</p>';
			data = data.replace(/\<img/g, "<img style='width: 100%;'")
			this.content= data;
		},
		methods: {
			toShare() {
				uni.navigateTo({
					url: '/pages/store/confirmOrder/confirmOrder'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.groupA {
	margin: 0 auto;
	width: 750rpx;
	.box {
		margin: 0 auto;
		width: 100%;
		button {
			position: fixed;
			bottom: 30rpx;
			left: 30rpx;
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
		}
	}
}
</style>
