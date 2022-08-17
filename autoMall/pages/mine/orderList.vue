<template>
	<view class="order">
		<img @tap="handleStorage" src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/viewStorage.png" alt="" class="float" />
		<view class="order-state">
			<view class="order-state-item" :class="index === activeIndex ? 'active' : ''" @tap="handleStateTap(index)" v-for="(item, index) in orderState" :key="index">{{item.title}}</view>
		</view>
		<view class="order-swiper-wrap">
			
			<swiper v-for="(i, idx) in orderState" :key="idx" class="swiper" duration="500" :current="current" @change="handleSwipeChange">
				<swiper-item>
					<view class="swiper-item">
						<view class="order-item" @tap="handleOrderDetail(item)" v-for="(item, index) in allOrder" :key="index">
							<view class="order-header" v-if="isSale">
								<view class="order-header-info">
									<img src="https://baiyuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png" class="order-header-info-pic" />
									<view class="order-header-info-name">张三</view>
									<img src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/tuanzhang.png" class="order-header-info-tag" />
								</view>
								<img class="order-header-img" src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/tel.png" />
								<!-- <text class="order-title-number">订单号 {{item.orderNumber}}</text>
								<text class="order-title-state">{{item.orderStateName}}</text> -->
							</view>
							<view class="order-title">
								<text class="order-title-number">订单号 {{item.orderNumber}}</text>
								<text class="order-title-state">{{item.orderStateName}}</text>
							</view>
							
							<view class="order-content" v-if="i.visible" v-for="(i, idx) in item.commodities" :key="idx">
								<image class="img" src="https://baiyuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png" />
								<view class="order-content-info">
									<view class="order-content-info-name">{{i.name}}</view>
									<text class="order-content-info-tag">{{i.tags}}</text>
									<view class="order-content-info-total">
										<text class="order-content-info-price">¥{{i.price}}</text>
										<text class="order-content-info-amount">X{{i.amount}}</text>
									</view>
								</view>
							</view>
							<view class="show-all" v-if="item.commodities.length > 2" v-show="item.show" @tap.stop="handleShowAll(item)">
								显示剩余{{item.commodities.length - 2}}种商品
							</view>
							<view class="total-all">
								共{{item.commodities.length}}件商品，总金额
								<text class="order-content-info-price">¥{{item.totalPrice}}</text>
							</view>
							<view class="order-item-btn">
								<view class="gray">
									{{isSale ? '用户详情' : '取消订单'}}
								</view>
								<view class="gray">
									{{isSale ? '订单详情' : '联系客服'}}
								</view>
								<view @tap.stop="handleBlack" class="black">
									{{isSale ? '去发货' : '去打款'}}
								</view>
							</view>
						</view>
						
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
				isSale: true,
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
						img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png',//图片
						name: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',//名称
						tags: '太空银;256GB',//标签
						price: '368.00',//单价
						amount: '1',//数量
						visible: true
					},{
						img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png',//图片
						name: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',//名称
						tags: '太空银;256GB',//标签
						price: '368.00',//单价
						amount: '1',//数量
						visible: true
					},{
						img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png',//图片
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
						img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png',//图片
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
						img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png',//图片
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
						img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png',//图片
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
						img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png',//图片
						name: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',//名称
						tags: '太空银;256GB',//标签
						price: '368.00',//单价
						amount: '1',//数量
						visible: true
					}]
				}],
				
			}
		},
		onLoad(opt) {
			this.current = this.activeIndex = Number(opt.activeIndex)
		},
		methods: {
			pay() {
				// TODO:
				console.log('付款')
			},
			handleBlack() {
				this.isSale ? uni.navigateTo({
					url: '/pages/mine/sendout'
				}) : this.pay()
			},
			handleStorage() {
				uni.navigateTo({
					url: "/pages/mine/wareHistory"
				})
			},
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
			},
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
		position: relative;
		&-header {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 25rpx 22rpx;
			border-bottom: 1px solid #E1E1E1;
			margin-bottom: 20rpx;
			&-info {
				display: flex;
				flex-direction: row;
				align-items: center;
				&-pic {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
				}
				&-name {
					font-weight: 600;
					font-size: 28rpx;
					color: #333333;
					margin: 0 24rpx 0 18rpx;
				}
				&-tag {
					width: 107rpx;
					height: 35rpx;
				}
			}
			&-img {
				width: 42rpx;
				height: 42rpx;
			}
		}
		.float {
			width: 80rpx;
			height: 80rpx;
			position: absolute;
			right: 30rpx;
			bottom: 300rpx;
			display: block;
			z-index: 8000;
		}
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
		
		&-btn {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding-left: 160rpx;
			box-sizing: border-box;
			margin-top: 30rpx;
			view {
				width: 160rpx;
				height: 54rpx;
				line-height: 54rpx;
				text-align: center;
				margin-left: 10rpx;
				border-radius: 4rpx;
			}
			
			.gray {
				color: #202425;
				background: #ededed;
			}
			
			.black {
				color: #ffffff;
				background: #202425;
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
			flex: 1;
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
