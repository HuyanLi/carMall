<template>
	<view class="sendout">
		<view class="bg">
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
		<view class="fms">
			<view class="title"><text>*</text>快递公司</view>
			<view class="input"><input type="text" placeholder="请输入快递公司名称"/></view>
			<view class="title"><text>*</text>快递单号</view>
			<view class="input"><input type="text" placeholder="请输入快递单号"/></view>
		</view>
		<view class="btn">
			<view class="gray">取消</view>
			<view class="black">确认发货</view>
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
				},{
					img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png',//图片
					name: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',//名称
					tags: '太空银;256GB',//标签
					price: '368.00',//单价
					amount: '1',//数量
				},{
					img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png',//图片
					name: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',//名称
					tags: '太空银;256GB',//标签
					price: '368.00',//单价
					amount: '1',//数量
				}]
			}
		},
		methods: {
			
		},
		onLaunch() {
			this.$toast('111')
		}
	}
</script>

<style lang="scss" scoped>
.sendout {
	box-sizing: border-box;
	padding-bottom: 130rpx;
}
.btn {
	position: fixed;
	left: 0;
	bottom: 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 23rpx 30rpx;
	width: 100%;
	background: #ffffff;
	box-sizing: border-box;
	view {
		width: 330rpx;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		border-radius: 8rpx;
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
.fms {
	width: 100%;
	background: #ffffff;
	border-radius: 16rpx;
	padding: 30rpx;
	box-sizing: border-box;
	margin-top: 20rpx;
	text {
		color: #FF6B33;
	}
	.title {
		font-weight: 600;
		font-size: 28rpx;
		color: #373737;
	}
	.input input{
		width: 690rpx;
		height: 80rpx;
		background: #F6F6F6;
		border-radius: 8rpx;
		margin: 20rpx 0;
		padding: 28rpx 20rpx;
		box-sizing: border-box;
	}
}
.order {
	margin: 0 auto;
	background: #FFFFFF;
	border-radius: 16rpx;
	box-sizing: border-box;
	padding: 30rpx;
	width: 90%;
}
.order-content {
	box-sizing: border-box;
	margin-top: 30rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	&:nth-of-type(1) {
		margin-top: 0;
	}
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
.bg {
	box-sizing: border-box;
	margin: 0 auto;
	overflow: hidden;
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
		margin: 20rpx auto;
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
}
</style>
