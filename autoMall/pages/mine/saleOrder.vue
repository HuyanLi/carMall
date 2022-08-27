<template>
	<view class="sale-order">
		<view class="sale-order-content" v-for="(item, index) in orders" :key="index">
			<view class="sale-order-content-header" >
				<view class="sale-order-content-header-left">
					<img :src="item.user.head_img" />
					<text>{{item.user.nickname}}</text>
				</view>
				<view class="sale-order-content-header-right">
					订单编号：{{item.order_sn}}
				</view>
			</view>
			<view class="sale-order-content-wrapper" v-for="(v,k) in item.order_item" :key='k'>
				<img class="sale-order-content-wrapper-img" :src="v.goods_image" />
				<view class="sale-order-content-wrapper-msg">
					<view class="sale-order-content-wrapper-title">{{v.goods_title}}</view>
					<view class="sale-order-content-wrapper-price">
						<text>¥{{v.goods_price}}</text>
						<text>x{{v.goods_num}}</text>
					</view>
				</view>
			</view>
			<view class="sale-order-content-footer">
				<view class="sale-order-content-footer-totalprice">
					订单总金额：<text>{{item.pay_fee}}</text>
				</view>
				<view class="sale-order-content-footer-commission">
					佣金：<text>{{item.commission_price}}</text>
				</view>
			</view>
		</view>
		<view class="empty">
			暂无数据
		</view>
	</view>
</template>

<script>
	import { getFXlist } from '@/api/mine.js'
	export default {
		data() {
			return {
				orders: []
			}
		},
		created() {
			this.initList()
		},
		methods: {
			initList() {
				let query = {
					member_id: uni.getStorageSync('member_id'),
					page: 1
				}
				getFXlist(query).then(res=>{
					if(res.code === 1) {
						this.orders = res.data.rows
					}
					
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
.sale-order {
	box-sizing: border-box;
	padding: 0 30rpx;
	.empty {
		height: 715rpx;
		text-align: center;
		padding-top: 50%;
	}
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
