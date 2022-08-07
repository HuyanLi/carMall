<template>
	<view class="order">
		<view class="order-state">
			<view class="order-state-item" :class="index === activeIndex ? 'active' : ''" @tap="handleStateTap(index)" v-for="(item, index) in orderState" :key="index">{{item.title}}</view>
		</view>
		<view class="order-swiper-wrap">
			<swiper class="swiper" duration="500" :current="current" @change="handleSwipeChange">
				<swiper-item>
					<view class="swiper-item">
						<view class="order-item" @tap="handleOrderDetail(item)" v-for="(item, index) in allOrder" :key="index">
							<view class="order-title">
								<text class="order-title-number">订单号 {{item.orderNumber}}</text>
								<text class="order-title-state">{{item.orderStateName}}</text>
							</view>
							
							<view class="order-content" v-if="i.visible" v-for="(i, idx) in item.commodities" :key="idx">
								<image class="img" src="https://via.placeholder.com/100x100" />
								<view class="order-content-info">
									<view class="order-content-info-name">{{i.name}}</view>
									<text class="order-content-info-tag">{{i.tags}}</text>
									<view class="order-content-info-total">
										<text class="order-content-info-price">¥{{i.price}}</text>
										<text class="order-content-info-amount">X{{i.amount}}</text>
									</view>
								</view>
							</view>
							<view class="show-all" v-if="item.commodities.length > 2" v-show="item.show" @tap="handleShowAll(item)">
								显示剩余{{item.commodities.length - 2}}种商品
							</view>
							<view class="total-all">
								共{{item.commodities.length}}件商品，总金额
								<text class="order-content-info-price">¥{{item.totalPrice}}</text>
							</view>
							
						</view>
						
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						
						
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				activeIndex: 0,
				orderState: [{title: '全部'},{title: '待打款'},{title: '待发货'},{title: '待收货'},{title: '已完成'}],
				allOrder: [{
					orderNumber: '8479104811',
					orderStateName: '待打款',
					totalPrice: '368.00',//总价
					totalAmount: '1',//总数
					show: true,
					commodities: [{
						img: 'https://via.placeholder.com',//图片
						name: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',//名称
						tags: '太空银;256GB',//标签
						price: '368.00',//单价
						amount: '1',//数量
						visible: true
					},{
						img: 'https://via.placeholder.com',//图片
						name: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',//名称
						tags: '太空银;256GB',//标签
						price: '368.00',//单价
						amount: '1',//数量
						visible: true
					},{
						img: 'https://via.placeholder.com',//图片
						name: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',//名称
						tags: '太空银;256GB',//标签
						price: '368.00',//单价
						amount: '1',//数量
						visible: false
					}]
				},{
					orderNumber: '8479104811',
					orderStateName: '待打款',
					totalPrice: '368.00',//总价
					totalAmount: '1',//总数
					commodities: [{
						img: 'https://via.placeholder.com',//图片
						name: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',//名称
						tags: '太空银;256GB',//标签
						price: '368.00',//单价
						amount: '1',//数量
						visible: true
					}]
				},{
					orderNumber: '8479104811',
					orderStateName: '待打款',
					totalPrice: '368.00',//总价
					totalAmount: '1',//总数
					commodities: [{
						img: 'https://via.placeholder.com',//图片
						name: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',//名称
						tags: '太空银;256GB',//标签
						price: '368.00',//单价
						amount: '1',//数量
						visible: true
					}]
				},{
					orderNumber: '8479104811',
					orderStateName: '待打款',
					totalPrice: '368.00',//总价
					totalAmount: '1',//总数
					commodities: [{
						img: 'https://via.placeholder.com',//图片
						name: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',//名称
						tags: '太空银;256GB',//标签
						price: '368.00',//单价
						amount: '1',//数量
						visible: true
					}]
				},{
					orderNumber: '8479104811',
					orderStateName: '待打款',
					totalPrice: '368.00',//总价
					totalAmount: '1',//总数
					commodities: [{
						img: 'https://via.placeholder.com',//图片
						name: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',//名称
						tags: '太空银;256GB',//标签
						price: '368.00',//单价
						amount: '1',//数量
						visible: true
					}]
				}],
				
			}
		},
		methods: {
			handleStateTap(index) {
				this.activeIndex = index
				this.current = index
			},
			handleSwipeChange(e) {
				this.activeIndex = e.detail.current
			},
			handleShowAll(item) {
				item.commodities.forEach(i => {
					i.visible = true
				})
				item.show = false
			},
			handleOrderDetail(item) {
				uni.navigateTo({
					url: `/pages/mine/orderDetail?id=${item.orderNumber}`,
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order {
		height: 100%;
		width: 100%;
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		&-swiper-wrap {
			box-sizing: border-box;
			padding: 0 30rpx;
			flex: 1;
		}
		&-state {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			height: 83rpx;
			line-height: 83rpx;
			box-sizing: border-box;
			background: #ffffff;
			&-item {
				flex: 1;
				text-align: center;
				font-weight: 400;
				font-size: 26rpx;
				color: #4C4C4C;
				height: 100%;
			}
			
			.active {
				font-weight: 600;
				font-size: 32rpx;
				color: #333333;
				position: relative;
				&:after {
					content: '';
					display: block;
					width: 40rpx;
					height: 6rpx;
					background: #333333;
					border-radius: 3rpx;
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translate3d(-50%, 0, 0);
				}
			}
		}
		
	}
	
	.swiper {
		height: 100%;
		swiper-item {
			overflow-y: scroll;
			&::-webkit-scrollbar{display:none}
		}
	}
	.order-item {
		box-sizing: border-box;
		padding: 30rpx 20rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		margin-top: 20rpx;
		height: auto;
		.order-title {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			height: 37rpx;
			&-number {
				font-weight: 400;
				font-size: 24rpx;
				color: #333333;
			}
			&-state {
				font-weight: 400;
				font-size: 26rpx;
				color: #FF6B33;
			}
		}
	}
	.order-content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 30rpx;
		.img {
			display: block;
			width: 180rpx;
			height: 180rpx;
		}
		
		&-info {
			margin-left: 21rpx;
			font-weight: 400;
			&-name{
				font-size: 26rpx;
				color: #333333;
			}
			&-tag{
				background: #F3F3F3;
				border-radius: 8rpx;
				box-sizing: border-box;
				padding: 4rpx 15rpx;
				font-size: 22rpx;
				color: #757575;
				margin: 13rpx 0 17rpx;
			}
			
			&-total {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
			}
			
			&-price{
				font-size: 28rpx;
				color: #ED1C24;
			}
			&-amount {
				font-size: 24rpx;
				color: #757575;
			}
		}
	}
	
	.show-all {
		color: #999999;
		margin-left: 25rpx;
		margin-top: 38rpx;
	}
	
	.total-all {
		text-align: right;
		font-size: 24rpx;
		color: #333333;
		font-weight: 400;
	}
</style>
