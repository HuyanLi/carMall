<!-- 查看奖励 -->
<template>
	<view class="checkWard">
		<image class="checkWard-img" src="https://baiyuechangxiong-pic.luobo.info/che/static/image/home/rrr.png" mode=""></image>
		<view class="checkWard-text">
			<rich-text :nodes="content"></rich-text>
		</view>
		<view class="checkWard-btn">
			<button type="default" @click="toBack">返回</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ""
			}
		},
		onLoad() {
			var data = '<p><img src="https://public.haotiku.com/haotiku/videos/20220216/1644974733576.png" alt="" width="571" height="337" /></p><p>应用内集成的第三方SDK以及插件：<br />1.cn.jpush.android: 用来给用户推送应用内资讯信息以及消息通知。<br />2.com.alipay：用于app内会员支付信息费<br />3.com.umeng.commonsdk：用于微信 qq等第三方登录授权以及分享。<br />4.com.amap.api：高德地图用于发布职位定位，已经用户入职导航。</p>';
			data = data.replace(/\<img/g, "<img style='width: 100%;'")
			this.content= data;
		},
		methods: {
			toBack() {
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.checkWard {
	margin-bottom: 160rpx;
	&-img {
		width: 750rpx;
		height: 406rpx;
	}
	&-text {
		padding: 30rpx;
	}
	&-btn {
		position: fixed;
		bottom: 0rpx;
		left: 0;
		width: 750rpx;
		height: 141rpx;
		background: #FFFFFF;
		box-shadow: 0 -1px 4px 0 rgba(234,234,234,0.50);
		button {
			margin: 30rpx auto;
			width: 690rpx;
			height: 90rpx;
			background: #202425;
			border-radius: 8rpx;
			color: #fff;
		}
	}
}
</style>
