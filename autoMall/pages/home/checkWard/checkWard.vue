<!-- 查看奖励 -->
<template>
	<view class="checkWard">
		<image class="checkWard-img" src="https://carshop.duoka361.cn/images/static/image/home/rrr.png" mode=""></image>
		<view class="checkWard-text">
			<rich-text :nodes="content"></rich-text>
		</view>
		<view class="checkWard-btn">
			<button type="default" @click="toBack">返回</button>
		</view>
	</view>
</template>

<script>
	import { registerGift } from '@/api/home.js'
	export default {
		data() {
			return {
				content: ""
			}
		},
		onShow() {
			this.initContent()
		},
		methods: {
			toBack() {
				uni.navigateBack({
					delta:1
				})
			},
			initContent() {
				registerGift().then(res=>{
					this.content = res.data.test_report_reward_note
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.checkWard {
	background-color: #F8F8F8;
	overflow-y: auto;
	&-img {
		width: 750rpx;
		height: 406rpx;
	}
	&-text {
		padding: 30rpx;
		background: #FFFFFF;
		margin-bottom: 160rpx !important;
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
