<template>
	<view class="wallet">
		<view class="wallet-header">
			<view class="wallet-header-left">
				<view class="wallet-header-left-title">钱包余额</view>
				<view class="wallet-header-left-balance">¥<text>500.00</text></view>
			</view>
			<view class="wallet-header-right right">提现</view>
		</view>
		<view class="wallet-part">
			<view class="wallet-part-left">
				<img src="../../static/image/mine/fenxiaodingdan.png">
				<text>分销订单</text>
			</view>
			<view class="wallet-part-right">
				<img src="../../static/image/mine/fenxiaoguanxi.png">
				<text>分销关系</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.wallet {
	background: #f6f6f6;
	&-header {
		height: 340rpx;
		background: #003488;
		color: #ffffff;
		
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 70rpx 0 43rpx;
		&-right {
			position: relative;
			font-weight: 500;
			font-size: 30rpx;
			line-height: 340rpx;
			box-sizing: border-box;
		}
		&-left {
			margin-top: 82rpx;
			font-weight: 400;
		}
		&-left-balance text {
			font-weight: 500;
			font-size: 68rpx;
			margin-top:20rpx;
		}
	}
	&-part {
		width: 95%;
		margin: 0 auto;
	}
}
.right::after {
			content: "";
			position: absolute;
			box-sizing: border-box;
			top: 50%;
			right: -10rpx;
			width: 22rpx;
			height: 22rpx;
			border-top: 1px solid #ffffff;
			border-right: 1px solid #ffffff;
			transform: rotate(45deg) translate3d(0, -70%, 0);
			box-sizing: border-box;
		}
</style>
