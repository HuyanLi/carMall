<template>
	<view class="wallet">
		<view class="wallet-header">
			<view class="wallet-header-left">
				<view class="wallet-header-left-title">钱包余额</view>
				<view class="wallet-header-left-balance">¥<text>500.00</text></view>
			</view>
			<view class="wallet-header-right right" @tap="handlePart('/pages/mine/cashout')">提现</view>
		</view>
		<view class="wallet-part">
			<view class="wallet-part-left" @tap="handlePart('/pages/mine/saleRelation')">
				<img src="../../static/image/mine/fenxiaoguanxi.png">
				<text>分销关系</text>
			</view>
			<view class="wallet-part-right" @tap="handlePart('/pages/mine/saleOrder')">
				<img src="../../static/image/mine/fenxiaodingdan.png">
				<text>分销订单</text>
			</view>
		</view>
		<view class="wallet-select">
			<view class="wallet-select-left">共{{bills.length}}笔</view>
			<view class="wallet-select-right" @tap="openCalendar">
				<text>{{date}}</text>
				<img src="../../static/image/mine/down.png" class="img" />
			</view>
		</view>
		
		<view class="wallet-bill">
			<view class="wallet-bill-item" v-for="(item, index) in bills" :key="index">
				<view class="wallet-bill-item-content">
					<view class="title">{{item.title}}</view>
					<view class="account" :class="item.accountType == 'in' ? 'color333333' : 'color7D0016'">{{item.account}}</view>
				</view>
				<view class="wallet-bill-item-content">
					<view class="order">订单编号：{{item.order}}</view>
					<view class="date">{{item.date}}</view>
				</view>
			</view>
		</view>
		<uni-calendar ref="calendar" class="uni-calendar--hook" :insert="false" @confirm="confirmCalendar" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				date: '2022-12-10',
				bills: [{
					title: '收入(获取途径)',
					account: '-10.00',
					order: 'MCYP202918394',
					date: '2022.05.09 20:10',
					accountType: 'out'
				},{
					title: '收入(获取途径)',
					account: '+10.00',
					order: 'MCYP202918394',
					date: '2022.05.09 20:10',
					accountType: 'in'
				},{
					title: '收入(获取途径)',
					account: '+10.00',
					order: 'MCYP202918394',
					date: '2022.05.09 20:10',
					accountType: 'in'
				},{
					title: '收入(获取途径)',
					account: '+10.00',
					order: 'MCYP202918394',
					date: '2022.05.09 20:10',
					accountType: 'in'
				},{
					title: '收入(获取途径)',
					account: '-10.00',
					order: 'MCYP202918394',
					date: '2022.05.09 20:10',
					accountType: 'out'
				}]
			}
		},
		methods: {
			confirmCalendar(val) {
				console.log(val)
				this.date = val.fulldate
			},
			openCalendar() {
				this.$refs.calendar.open()
			},
			handlePart(url) {
				uni.navigateTo({url})
			}
		}
	}
</script>

<style lang="scss" scoped>
.wallet {
	background: #f6f6f6;
	&-header {
		height: 340rpx;
		background: url("../../static/image/mine/background-blue.png") no-repeat;
		transform: translate3d(0,-3rpx,0);
		background-size: cover;
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
		width: 90%;
		margin: 0 auto;
		background: #ffffff;
		border-radius: 16rpx 16rpx 0 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 123rpx;
		transform:  translate3d(0, -50%, 0);
		img {
			width: 42rpx;
			height: 42rpx;
		}
		&-left,&-right {
			flex: 1;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}
		&-left {
			border-right: 1px solid #d7d7d7;
		}
	}
	&-select {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 52rpx;
		width: 90%;
		margin: 0 auto;
		&-right {
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 29rpx;
			padding: 10rpx 20rpx;
			height: 58rpx;
			font-size: 28rpx;
			.img {
				width: 20rpx !important;
				height:20rpx !important;
				margin-left: 5rpx;
			}
		}
	}
	
	&-bill {
		width: 90%;
		margin: 27rpx auto;
		background: #ffffff;
		border-radius: 16px;
		padding: 0 30rpx;
		box-sizing: border-box;
		&-item {
			box-sizing: border-box;
			border-bottom: 1px solid #CFCFCF;
			padding: 30rpx 0;
		}
		&-item-content {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}
		.title {
			font-weight: 400;
			font-size: 26rpx;
			color: #000000;
		}
		.account {
			font-weight: 600;
			font-size: 32rpx;
		}
		
		.order,.date {
			font-weight: 400;
			font-size: 22rpx;
			color: #999999;
			margin-top: 13rpx;
		}
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

.color333333 {
	color: #333333
}

.color7D0016 {
	color: #7D0016;
}
</style>
