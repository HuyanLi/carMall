<template>
	<view class="detail">
		<view class="bg">
			<view class="bg-content">
				<img src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/box.png" />
				<text>待收货</text>
			</view>
			<view class="address">
				<view>
					北京市朝阳区
				</view>
				<view class="right">
					动漫大厦五号楼3单元1101
				</view>
				<view>
					张海底
					<text>17524521452</text>
				</view>
				<view>
					<img src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/address.png" />
				</view>
			</view>
		</view>
		<view class="fms">
			<view class="fms-header">
				<text>顺丰快递</text>
				<text>已签收</text>
			</view>
			<view>您的订单已由本人签收，如有疑问您可以联系配送员。</view>
			<view class="fms-date">2021-03-15:10:10:02</view>
		</view>
		<view class="order">
			<view class="order-content" v-for="(i, idx) in commodities" :key="idx">
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
		</view>
		<view class="total">
			<view class="total-count">
				<text>商品金额</text>
				<text>￥736.00</text>
			</view>
			<view class="total-count">
				<text>优惠金额</text>
				<text>-￥15.00</text>
			</view>
			<view class="total-price">
				实付：
				<text>¥731.00</text>
			</view>
		</view>
		
		<view class="info">
			<view class="info-title">订单信息</view>
			<view class="info-content">
				<text>订单编号</text>
				<text>287615435412</text>
			</view>
			<view class="info-content">
				<text>支付方式</text>
				<text>线下打款</text>
			</view>
			<view class="info-content">
				<text>下单时间</text>
				<text>2021-03-15:10:10:02</text>
			</view>
			<view class="info-content">
				<text>支付时间</text>
				<text>2021-03-15:10:10:02</text>
			</view>
			<view class="info-content">
				<text>完成时间</text>
				<text>2021-03-15:10:10:02</text>
			</view>
		</view>
		<view class="button">
			<view class="gray">联系客服</view>
			<view class="gray">查看物流</view>
			<view class="black">确认收货</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.detail {
	position: relative;
	box-sizing: border-box;
	padding-bottom: 118rpx;
	.button {
		width: 100%;
		height: 98rpx;
		background: #ffffff;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
		padding-left: 210rpx;
		view {
			width: 160rpx;
			height: 70rpx;
			text-align: center;
			line-height: 70rpx;
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
	.info {
		width: 90%;
		margin: 20rpx auto;
		border-radius: 16rpx;
		background: #ffffff;
		box-sizing: border-box;
		padding: 30rpx;
		height: 395rpx;
		&-title {
			font-weight: 600;
			font-size: 32rpx;
			color: #333333;
			box-sizing: border-box;
			padding-bottom: 17rpx;
			border-bottom: 1px solid #efefef;
		}
		
		&-content {
			font-weight: 400;
			font-size: 26rpx;
			color: #333333;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin-top: 18rpx;
		}
	}
	.total {
		width: 90%;
		margin: 0 auto;
		height: 245rpx;
		border-radius: 16rpx;
		background: #ffffff;
		box-sizing: border-box;
		padding: 30rpx;
		font-weight: 400;
		font-size: 26rpx;
		color: #333333;
		&-count {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 24rpx;
		}
		&-price {
			font-weight: 400;
			font-size: 26rpx;
			text-align: right;
		}
		&-price text{
			font-size: 36rpx;
			color: #ff0000;
		}
	}
	.fms {
		background: #ffffff;
		border-radius: 16rpx;
		font-weight: 400;
		font-size: 24rpx;
		color: #333333;
		height: 171rpx;
		width: 90%;
		margin: 0 auto;
		box-sizing: border-box;
		padding: 25rpx 20rpx;
		transform: translate3d(0, -25rpx ,0);
		&-header {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			font-size: 26rpx;
			margin-bottom: 14rpx;
		}
		
		&-date {
			color: #999999;
		}
	}
	.bg {
		height: 432rpx;
		background: linear-gradient(0deg, #FFFFFF, #003488);
		transform: translate3d(0,-3rpx,0);
		box-sizing: border-box;
		padding-top: 60rpx;
		&-content {
			img {
				width: 48rpx;
				height: 48rpx;
			}
			text {
				margin-left: 24rpx;
			}
			font-weight: 600;
			font-size: 42rpx;
			color: #FFFFFF;
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-left: 30rpx;
		}
	}
	.address {
		background: #FFFFFF;
		border-radius: 16rpx;
		box-sizing: border-box;
		padding: 30rpx 30rpx 0;
		font-weight: 300;
		font-size: 24rpx;
		color: #666666;
		position: relative;
		height: 200rpx;
		width: 90%;
		margin: 60rpx auto;
		margin-bottom: 0;
		text {
			margin-left: 30rpx;
		}
		.right {
			font-weight: 500;
			font-size: 36rpx;
			color: #333333;
			margin: 13rpx 0;
			width: 100%;
		}
		.right::after {
			content: "";
			position: absolute;
			box-sizing: border-box;
			top: 50%;
			right: 30rpx;
			width: 22rpx;
			height: 22rpx;
			border-top: 2px solid #333333;
			border-right: 2px solid #333333;
			transform: rotate(45deg) translate3d(0, -50%, 0);
		}
		
		img {
			width: 100%;
			height: 6rpx;
			position: absolute;
			left: 0;
			bottom: 0;
		}
	}
	.order {
		width: 90%;
		margin: 20rpx auto;
		background: #ffffff;
		border-radius: 16rpx;
		overflow: hidden;
		box-sizing: border-box;
		padding: 0 24rpx 20rpx;
	}
	.order-content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 30rpx;
		background: #ffffff;
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
}
</style>
