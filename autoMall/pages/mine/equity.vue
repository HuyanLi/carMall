<!-- 我的权益 -->
<template>
	<view class="equity">
		<view class="detailBox">
			<!-- <text>商品详情</text> -->
			<rich-text class="richBox" :nodes="content"></rich-text>
		</view>
	</view>
</template>

<script>
	import { registerGift } from '@/api/home.js'
	export default {
		data() {
			return {
				content: ''
			}
		},
		onLoad() {
			//图片
			this.initRegisterGift()
		},
		methods: {
			async initRegisterGift() {
				let data = await registerGift()
				this.content = data.data.member_note
			},
		}
	}
</script>

<style lang="scss" scoped>
.equity {
	width: 100%;
	height: 100%;
	.detailBox {
		padding: 25rpx 30rpx 100rpx;
		background: #FFFFFF;
		height: 800rpx;
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
