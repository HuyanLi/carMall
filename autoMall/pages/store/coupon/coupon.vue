<!-- 优惠券 -->
<template>
	<view class="coupon">
		<view class="coupon-que">
			<image src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mall/went.png" mode=""></image>
			<text>如何使用</text>
		</view>
		<view class="coupon-content">
			<view class="coupon-content-image" @click="choosecoupon(item,index)" v-for="(item,index) in couList" :key='index'>
				<view v-if="item.type === '1'" class="coupon-content-image-title">
					<text class="money"><text style="font-size: 28rpx;">￥</text>{{item.reduce_price}}</text>
					<text class="info">全场满{{item.full_price}}减{{item.reduce_price}}</text>
				</view>
				<view v-if="item.type === '1'" class="coupon-content-image-text">
					<text class="info">全场满{{item.full_price}}减{{item.reduce_price}}</text>
					<text class="date">{{item.endtime_text}}</text>
				</view>
				<view v-if="item.type === '2'" class="coupon-content-image-title">
					<text class="zhe">{{item.discount}}折</text>
				</view>
				<view v-if="item.type === '2'" class="coupon-content-image-text">
					<text class="info">全场满{{item.full_price}}打{{item.reduce_price}}折</text>
					<text class="date">{{item.endtime_text}}</text>
				</view>
				<view class="coupon-content-image-type">
					<text>{{item.type_name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import{ myCoupon } from '@/api/store.js'
	export default {
		data() {
			return {
				couList: [],
			}
		},
		created() {
			this.initcoupon()
		},
		methods: {
			async initcoupon() {
				let query = {
					member_id: uni.getStorageSync('member_id'),
					page: 1,
					status: 1,
					coupon_type: 2,
					
				}
				await myCoupon(query).then(res=>{
					this.couList = res.data.rows
				})
			},
			choosecoupon(e,i) {
				var pages = getCurrentPages();
				var prepage = pages[pages.length - 2]; //上一个页面
				prepage.$vm.coupon = JSON.stringify(e);
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
			background-image: url(https://baiyuechangxiong-pic.luobo.info/che/static/image/mall/hcoupon.png);
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
