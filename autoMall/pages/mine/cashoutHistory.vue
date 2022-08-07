<template>
	<view class="cashout-history">
		<view class="cashout-history-header">
			<view class="cashout-history-header-title">总提现金额</view>
			<view class="cashout-history-header-val">
				¥<text>500.00</text>
			</view>
		</view>
		<view class="cashout-history-content">
			<view class="cashout-history-content-item" v-for="(item,index) in history" :key="index">
				<view>
					<text class="font28">{{item.title}}</text>
					<text class="font32">{{item.price}}</text>
				</view>
				<view class="font24">
					<text>{{item.orderNumber}}</text>
					<text>{{item.date}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				history: [{
					title: '订单转微信',
					price: '300.00',
					orderNumber: 'MCYP784948',
					date: '2022-04-12 10:13'
				},{
					title: '订单转微信',
					price: '300.00',
					orderNumber: 'MCYP784948',
					date: '2022-04-12 10:13'
				},{
					title: '订单转微信',
					price: '300.00',
					orderNumber: 'MCYP784948',
					date: '2022-04-12 10:13'
				},{
					title: '订单转微信',
					price: '300.00',
					orderNumber: 'MCYP784948',
					date: '2022-04-12 10:13'
				},{
					title: '订单转微信',
					price: '300.00',
					orderNumber: 'MCYP784948',
					date: '2022-04-12 10:13'
				},{
					title: '订单转微信',
					price: '300.00',
					orderNumber: 'MCYP784948',
					date: '2022-04-12 10:13'
				},{
					title: '订单转微信',
					price: '300.00',
					orderNumber: 'MCYP784948',
					date: '2022-04-12 10:13'
				},{
					title: '订单转微信',
					price: '300.00',
					orderNumber: 'MCYP784948',
					date: '2022-04-12 10:13'
				},{
					title: '订单转微信',
					price: '300.00',
					orderNumber: 'MCYP784948',
					date: '2022-04-12 10:13'
				},{
					title: '订单转微信',
					price: '300.00',
					orderNumber: 'MCYP784948',
					date: '2022-04-12 10:13'
				}]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.font28 {
	font-weight: 400;
	font-size: 28rpx;
	color: #333333;
}
.font32 {
	font-weight: 600;
	font-size: 32rpx;
	color: #333333;
}
.font24 {
	font-weight: 400;
	font-size: 24rpx;
	color: #999999;
}
.cashout-history {
	background: #f6f6f6;
	&-header {
		height: 340rpx;
		background: url("../../static/image/mine/background-blue.png") no-repeat;
		transform: translate3d(0,-3rpx,0);
		background-size: cover;
		color: #ffffff;
		box-sizing: border-box;
		padding-top: 83rpx;
		padding-left: 30rpx;
		font-weight: 400;
		font-size: 26rpx;
		&-val {
			margin-top: 20rpx;
			margin-left: 10rpx;
			text {
				font-weight: 500;
				font-size: 68rpx;
			}
		}
	}
	&-content {
		width: 90%;
		margin: 0 auto;
		background: #FFFFFF;
		border-radius: 16rpx;
		transform: translate3d(0, -80rpx, 0);
		box-sizing: border-box;
		padding: 20rpx 30rpx;
		&-item {
			margin-top: 30rpx;
			border-bottom: 1px solid #dddddd;
			padding-bottom: 30rpx;
			>view {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
			}
		}
	}
}

</style>
