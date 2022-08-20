<!-- 完成支付 -->
<template>
	<view class="compPay">
		<image class="compPay-img" src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mall/success.png"></image>
		<view class="compPay-title">
			提交成功
		</view>
		<view class="compPay-money">
			¥{{price}}
		</view>
		<view class="compPay-text">
			<text>您的订单已提交成功</text>
			<text>后台将会在24小时内处理您的订单并发货</text>
		</view>
		<button type="default" class="btn1" @click="goShop">继续逛逛</button>
		<button type="default" class="btn2" @click="tomyOrder">我的订单</button>
		<button type="default" class="btn2" @click="toContract">联系客服</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				price: '',
			}
		},
		onLoad(e) {
			this.price = e.price
		},
		methods: {
			goShop() {
				uni.navigateTo({
					url: '/pages/tabBar/mall/mall'
				})
			},
			tomyOrder() {
				uni.navigateTo({
					url: '/pages/mine/orderList'
				})
			},
			toContract() {
				uni.navigateTo({
					url: '/pages/tabBar/service/service'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.compPay {
	width: 750rpx;
	text-align: center;
	&-img {
		width: 57rpx;
		height: 57rpx;
		margin: 25% auto 15rpx;
	}
	&-title {
		font-size: 32rpx;
		color: #09BB07;
	}
	&-money {
		font-size: 55rpx;
		color: #000000;
		margin: 65rpx auto 70rpx;
	}
	&-text {
		font-size: 24rpx;
		color: #999999;
		text {
			display: block;
			margin-bottom: 15rpx;
		}
	}
	button {
		width: 348rpx;
		height: 70rpx;
		border-radius: 4rpx;
		font-size: 26rpx;
	}
	.btn1 {
		background: #202425;
		color: #fff;
		margin: 200rpx auto 47rpx;
	}
	.btn2 {
		background: #EDEDED;
		color: #202425;
		margin: 0 auto 47rpx;
	}
}
</style>
