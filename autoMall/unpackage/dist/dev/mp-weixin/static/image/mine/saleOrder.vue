<template>
	<view class="sale-order">
		<view class="sale-order-content" v-for="(item, index) in orders" :key="index">
			<view class="sale-order-content-header">
				<view class="sale-order-content-header-left">
					<img :src="item.headerImg" />
					<text>{{item.name}}</text>
				</view>
				<view class="sale-order-content-header-right">
					订单编号：{{item.orderNumber}}
				</view>
			</view>
			<view class="sale-order-content-wrapper">
				<img class="sale-order-content-wrapper-img" :src="item.orderImg" />
				<view class="sale-order-content-wrapper-msg">
					<view class="sale-order-content-wrapper-title">{{item.orderTitle}}</view>
					<view class="sale-order-content-wrapper-price">
						<text>¥{{item.price}}</text>
						<text>x{{item.count}}</text>
					</view>
				</view>
			</view>
			<view class="sale-order-content-footer">
				<view class="sale-order-content-footer-totalprice">
					订单总金额：<text>{{item.totalPrice}}</text>
				</view>
				<view class="sale-order-content-footer-commission">
					佣金：<text>{{item.commission}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orders: [{
					headerImg: 'https://via.placeholder.com/42x42',
					name: 'Gerald Bryan',
					orderNumber: '0395325792',
					orderImg: 'https://via.placeholder.com/42x42',
					orderTitle: 'MICHELIN轮胎 性能三合一 都市畅行',
					price: '368',
					count: '1',
					totalPrice: '368.00',
					commission: '20.00'
				},{
					headerImg: 'https://via.placeholder.com/42x42',
					name: 'Gerald Bryan',
					orderNumber: '0395325792',
					orderImg: 'https://via.placeholder.com/42x42',
					orderTitle: 'MICHELIN轮胎 性能三合一 都市畅行',
					price: '368',
					count: '1',
					totalPrice: '368.00',
					commission: '20.00'
				},{
					headerImg: 'https://via.placeholder.com/42x42',
					name: 'Gerald Bryan',
					orderNumber: '0395325792',
					orderImg: 'https://via.placeholder.com/42x42',
					orderTitle: 'MICHELIN轮胎 性能三合一 都市畅行',
					price: '368',
					count: '1',
					totalPrice: '368.00',
					commission: '20.00'
				}]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.sale-order {
	box-sizing: border-box;
	padding: 0 30rpx;
	&-content {
		background: #f6f6f6;
		margin-top: 20rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		height: 312rpx;
		padding: 23rpx 26rpx;
		box-sizing: border-box;
			&-header {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #DDDDDD;
				box-sizing: border-box;
				padding-bottom: 20rpx;
				font-size: 24rpx;
				&-left {
					display: flex;
					flex-direction: row;
					align-items: center;
					img {
						width: 46rpx;
						height: 46rpx;
						border-radius: 50%;
					}
					text {
						font-weight: Bold;
						color: #000000;
						margin-left: 10rpx;
					}
				}
				&-right {
					font-weight: 400;
					color: #999999;
				}
			}
			&-wrapper {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #DDDDDD;
				box-sizing: border-box;
				padding: 20rpx 0;
				img {
					width: 100rpx;
					height: 100rpx;
				}
				&-msg {
					font-size: 28rpx;
					color: #333333;
				}
				&-price {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
				}
			}
			&-footer {
				box-sizing: border-box;
				padding-left: 195rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin-top: 15rpx;
				text {
					color: #A82222;
				}
			}
	}
}
</style>
