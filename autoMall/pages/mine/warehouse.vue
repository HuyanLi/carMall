<template>
	<view class="warehouse">
		<view class="bg">
			<view class="warehouse-title">
				<text class="left">我的仓库</text>
				<text class="right" @tap="handleHistory">库存记录</text>
			</view>
			<view class="warehouse-small">
				<text>商品总数(件)</text>
				<text>总计金额(元)</text>
			</view>
			<view class="warehouse-big">
				<text>500</text>
				<text>2350.00</text>
			</view>
		</view>
		<view class="warehouse-content">
			<view class="warehouse-content-item" v-for="(item,index) in data" :key="index">
				<img :src="item.img" />
				<view class="warehouse-content-item-info">
					<view class="warehouse-content-item-info-title">{{item.title}}</view>
					<view class="warehouse-content-item-info-storage">当前库存:{{item.storage}}</view>
					<view class="warehouse-content-item-info-price">
						¥{{item.price}}
						<text class="out" @tap="handleOut">出库</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="save">
			<view>保存修改</view>
		</view>
		
		<uni-popup class="pop" ref="popup" background-color="#fff">
			<view class="popup-content">
				<view class="pop-title">商品出库</view>
				<view class="pop-name">冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB</view>
				<view class="pop-number">当前库存: 1000</view>
				<input class="pop-ipt" type="number" placeholder="请输入出库数量"/>
				<view class="pop-btn">
					<view class="pop-cancel" @tap="handleCancelPop">取消</view>
					<view class="pop-confirm">确认出库</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { warehouse } from '@/api/mine.js'
	export default {
		data() {
			return {
				data: [{
					img: 'https://baiyuechangxiong-pic.luobo.info/che/staticuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png',
					title: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',
					storage: '1000',
					price: '368'
				},{
					img: 'https://baiyuechangxiong-pic.luobo.info/che/staticuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png',
					title: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',
					storage: '1000',
					price: '368'
				},{
					img: 'https://baiyuechangxiong-pic.luobo.info/che/staticuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png',
					title: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',
					storage: '1000',
					price: '368'
				},{
					img: 'https://baiyuechangxiong-pic.luobo.info/che/staticuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png',
					title: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',
					storage: '1000',
					price: '368'
				},{
					img: 'https://baiyuechangxiong-pic.luobo.info/che/staticuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png',
					title: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',
					storage: '1000',
					price: '368'
				}]
			}
		},
		created() {
			this.initwareList()
		},
		methods: {
			async initwareList() {
				let query = {
					member_id: uni.getStorageSync('member_id'),
					keyword: '',
					page: 1
				}
				await warehouse(query).then(res=>{
					console.log(res)
				})
			},
			handleHistory () {
				uni.navigateTo({
					url: '/pages/mine/wareHistory'
				})
			},
			handleOut() {
				this.$refs.popup.open('center')
			},
			handleCancelPop() {
				this.$refs.popup.close('center')
			}
		}
	}
</script>

<style lang="scss" scoped>
.pop {
	.popup-content {
		padding: 34rpx 52rpx 41rpx 44rpx;
		box-sizing: border-box;
	}
	
	&-title {
		text-align: center;
		font-weight: 600;
		font-size: 26rpx;
		color: #424242;
	}
	&-name {
		margin-top: 28rpx;
		font-weight: 400;
		font-size: 26rpx;
		color: #333333;
	}
	&-number {
		margin-top: 11rpx;
		font-weight: 400;
		font-size: 24rpx;
		color: #757575;
	}
	&-ipt {
		width: 100%;
		height: 80rpx;
		background: #F6F6F6;
		border-radius: 8rpx;
		font-weight: 400;
		font-size: 26rpx;
		color: #C7C7C7;
		box-sizing: border-box;
		padding-left: 28rpx;
		margin-top: 20rpx;
	}
	&-btn {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 48rpx;
		font-size: 26rpx;
		view {
			flex: 1;
			text-align: center;
		}
	}
	&-cancel {
		color: #8A8A8A;
	}
	&-confirm {
		color: #134488;
	}
}
.popup-content {
	width: 538rpx;
	height: 443rpx;
	background: #FFFFFF;
	border-radius: 16rpx;
}
.save {
	width: 100%;
	height: 129rpx;
	position: fixed;
	left: 0;
	bottom: 0;
	padding: 18rpx 30rpx;
	box-sizing: border-box;
	background: #ffffff;
	view {
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		font-weight: 400;
		font-size: 28rpx;
		color: #FFFFFF;
		background: #202425;
		border-radius: 8rpx;
	}
}
.warehouse {
	position: relative;
	box-sizing: border-box;
	padding-bottom: 150rpx;
	&-content {
		background: #FFFFFF;
		border-radius: 16rpx;
		transform: translate3d(0, -60rpx, 0);
		box-sizing: border-box;
		padding: 39rpx 30rpx 0;
		&-item {
			margin-bottom: 52rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			img {
				width: 180rpx;
				height: 180rpx;
			}
			&-info {
				flex: 1;
				margin-left: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 180rpx;
				position: relative;
				&-title {
					font-weight: 400;
					font-size: 26rpx;
					color: #333333;
				}
				&-storage {
					font-weight: 400;
					font-size: 24rpx;
					color: #757575;
				}
				&-price {
					font-weight: 400;
					font-size: 28rpx;
					color: #a82222;
				}
				.out {
					width: 147rpx;
					height: 54rpx;
					background: #202425;
					border-radius: 4rpx;
					color: #ffffff;
					text-align: center;
					line-height: 54rpx;
					display: inline-block;
					position: absolute;
					right: 0;
					bottom: 0;
					font-size: 24rpx;
				}
			}
		}
	}
	&-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-right: 20rpx;
	}
	&-small {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-weight: 400;
		font-size: 24rpx;
		margin-right: 220rpx;
		margin-top: 52rpx;
	}
	&-big {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-weight: 500;
		font-size: 57rpx;
		margin-right: 140rpx;
	}
	.bg {
		height: 350rpx;
		background: #003488;
		transform: translate3d(0,-3rpx,0);
		box-sizing: border-box;
		padding: 40rpx 30rpx;
		color: #ffffff;
		.left {
			font-weight: 600;
			font-size: 30rpx;
		}
		.right {
			position: relative;
		}
		.right::after {
			content: "";
			position: absolute;
			box-sizing: content-box;
			top: 50%;
			right: -15rpx;
			width: 14rpx;
			height: 14rpx;
			border-top: 1px solid #ffffff;
			border-right: 1px solid #ffffff;
			transform: rotate(45deg) translate3d(0, -50%, 0);
		}
	}
}

</style>
