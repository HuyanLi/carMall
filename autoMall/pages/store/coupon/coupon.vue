<!-- 优惠券 -->
<template>
	<view class="coupon">
		<view class="coupon-que">
			<image src="../../../static/image/mall/went.png" mode=""></image>
			<text>如何使用</text>
		</view>
		<view class="coupon-content">
			<view class="coupon-content-image" @click="choosecoupon(item)" v-for="(item,index) in couList" :key='index'>
				<view v-if="item.money" class="coupon-content-image-title">
					<text class="money"><text style="font-size: 28rpx;">￥</text>{{item.money}}</text>
					<text class="info">{{item.info}}</text>
				</view>
				<view v-if="item.zhe" class="coupon-content-image-title">
					<text class="zhe">{{item.zhe}}折</text>
				</view>
				<view class="coupon-content-image-text">
					<text class="info">{{item.info}}</text>
					<text class="date">{{item.date}}</text>
				</view>
				<view class="coupon-content-image-type">
					<text>{{item.type}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				couList: [{
					money: 5,
					info: '全场满50减5',
					date: '2022-03-01 至2022-03-31',
					type: '满减券'
				},{
					zhe: '8',
					info: '全场8折',
					date: '2022-03-01 至2022-03-31',
					type: '折扣券'
				},{
					money: 5,
					info: '全场满50减5',
					date: '2022-03-01 至2022-03-31',
					type: '满减券'
				},{
					money: 5,
					info: '全场满50减5',
					date: '2022-03-01 至2022-03-31',
					type: '满减券'
				}],
			}
		},
		methods: {
			choosecoupon(e) {
				var pages = getCurrentPages();
				var prepage = pages[pages.length - 2]; //上一个页面
				prepage.$vm.coupon = e.money;
				uni.showToast({
				    title: '选择成功',
				    icon: 'none',
				    duration: 2000
				});
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.coupon {
	width: 750rpx;
	&-que {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		padding: 20rpx 30rpx;
		image {
			width: 30rpx;
			height: 30rpx;
			margin-right: 10rpx;
		}
		text {
			font-size: 24rpx;
			color: #333333;
		}
	}
	&-content{
		width: 100%;
		padding: 0 30rpx 20rpx;
		&-image {
			width: 690rpx;
			height: 190rpx;
			background-image: url(../../../static/image/mall/hcoupon.png);
			background-repeat: no-repeat;
			background-size: 690rpx 190rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin-bottom: 20rpx;
			&-title {
				width: 200rpx;
				color: #fff;
				text-align: center;
				.money {
					font-size: 60rpx;
					display: block;
				}
				.info {
					display: block;
					font-size: 28rpx;
					color: #fff;
				}
				.zhe {
					font-size: 60rpx;
					color: #FFFFFF;
				}
			}
			&-text {
				color: #333333;
				width: 455rpx;
				padding: 0px 25rpx;
				.info {
					display: block;
					margin-bottom: 25rpx;
					font-size: 28rpx;
					color: #333333;
				}
				.date {
					font-size: 24rpx;
					color: #8BA4C8;
				}
			}
			&-type {
				width: 45rpx;
				font-size: 24rpx;
				color: #003488;
			}
		}
	}
}
</style>
