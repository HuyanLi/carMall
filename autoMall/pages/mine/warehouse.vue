<template>
	<view class="warehouse">
		<view class="bg">
			<view class="warehouse-title">
				<text class="left">我的仓库</text>
				<text class="right">库存记录</text>
			</view>
			<view class="warehouse-small">
				<text>商品总数(件)</text>
				<text>总计金额(元)</text>
			</view>
			<view class="warehouse-big">
				<text>500</text>
				<text>2350.00</text>
			</view>
		</view>
		<view class="warehouse-content">
			
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
.warehouse {
	position: relative;
	&-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-right: 20rpx;
	}
	&-small {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-weight: 400;
		font-size: 24rpx;
		margin-right: 220rpx;
		margin-top: 52rpx;
	}
	&-big {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-weight: 500;
		font-size: 57rpx;
		margin-right: 140rpx;
	}
	.bg {
		height: 350rpx;
		background: #003488;
		transform: translate3d(0,-3rpx,0);
		box-sizing: border-box;
		padding: 40rpx 30rpx;
		color: #ffffff;
		.left {
			font-weight: 600;
			font-size: 30rpx;
		}
		.right {
			position: relative;
		}
		.right::after {
			content: "";
			position: absolute;
			box-sizing: content-box;
			top: 50%;
			right: -15rpx;
			width: 14rpx;
			height: 14rpx;
			border-top: 1px solid #ffffff;
			border-right: 1px solid #ffffff;
			transform: rotate(45deg) translate3d(0, -50%, 0);
		}
	}
}

</style>
