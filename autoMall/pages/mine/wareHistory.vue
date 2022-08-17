<template>
	<view class="warehistory">
		<view class="warehistory-title">
			<view>当前库存/时间</view>
			<view class="warehistory-title-right" @tap="handleFilter"><img src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/filter@2x.png" /><text>历史筛选</text></view>
		</view>
		<view class="warehouse-content">
			<view class="warehouse-content-item" v-for="(item,index) in data" :key="index">
				<img :src="item.img" />
				<view class="warehouse-content-item-info">
					<view class="warehouse-content-item-info-title">{{item.title}}</view>
					<view class="warehouse-content-item-info-storage">当前库存:{{item.storage}}</view>
					<view class="warehouse-content-item-info-price">
						¥{{item.price}}
					</view>
				</view>
			</view>
		</view>
		<uni-popup class="pop" ref="popup" background-color="#fff">
			<view class="popup-content">
				<view class="filter-title">选择修改历史 <img src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/bacha.png" @tap="handleClosePop"/></view>
				<view class="filter-item" v-for="(item, index) in filter" :key="index" @tap="handleChoose(index)">
					<img :src="item.selected ? 'https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/duigou.png' : 'https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/empty.png'"/>
					<text>{{item.time}}</text>
				</view>
				
				<view class="save">
					<view>确认选择</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				filter: [{
					time: '库存修改 2022-05-10 08:00',
					selected: false
				},{
					time: '库存修改 2022-05-10 08:00',
					selected: false
				},{
					time: '库存修改 2022-05-10 08:00',
					selected: false
				},{
					time: '库存修改 2022-05-10 08:00',
					selected: false
				},{
					time: '库存修改 2022-05-10 08:00',
					selected: false
				},{
					time: '库存修改 2022-05-10 08:00',
					selected: false
				},{
					time: '库存修改 2022-05-10 08:00',
					selected: false
				},{
					time: '库存修改 2022-05-10 08:00',
					selected: false
				},{
					time: '库存修改 2022-05-10 08:00',
					selected: false
				},{
					time: '库存修改 2022-05-10 08:00',
					selected: false
				},{
					time: '库存修改 2022-05-10 08:00',
					selected: false
				},{
					time: '库存修改 2022-05-10 08:00',
					selected: false
				},{
					time: '库存修改 2022-05-10 08:00',
					selected: false
				},{
					time: '库存修改 2022-05-10 08:00',
					selected: false
				},{
					time: '库存修改 2022-05-10 08:00',
					selected: false
				},{
					time: '库存修改 2022-05-10 08:00',
					selected: false
				}],
				data: [{
					img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png',
					title: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',
					storage: '1000',
					price: '368'
				},{
					img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png',
					title: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',
					storage: '1000',
					price: '368'
				},{
					img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png',
					title: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',
					storage: '1000',
					price: '368'
				},{
					img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png',
					title: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',
					storage: '1000',
					price: '368'
				},{
					img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png',
					title: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',
					storage: '1000',
					price: '368'
				}]
			}
		},
		methods: {
			handleFilter() {
				this.$refs.popup.open('bottom')
				// this.$nextTick(() => {
				// 	this.setRadius()
				// })
			},
			handleClosePop() {
				this.$refs.popup.close('bottom')
			},
			handleChoose(index) {
				this.filter.forEach((item) => {
					item.selected = false
				})
				this.filter[index].selected = true
			},
			// setRadius() {
			// 	document.getElementsByName('content')[0].style.borderRadius = '15px 15px 0 0'
			// 	document.getElementsByName('content')[0].style.overflow = 'hidden'
			// }
		},
	}
</script>

<style lang="scss" scoped>
// ::v-deep .vue-ref {
// 	border-radius: 30rpx 30rpx 0 0;
// 	overflow: hidden;
// }
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

.popup-content {
	padding-top: 45rpx;
	max-height: 875rpx;
	overflow-y: scroll;
	position: relative;
	box-sizing: border-box;
	padding-bottom: 118rpx;
}
.filter-title {
	width: 100%;
	text-align: center;
	font-weight: 600;
	font-size: 26rpx;
	color: #424242;
	position: relative;
	
	img {
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		top: 0;
		right: 30rpx;
	}
}
.filter-item {
	img {
		width: 36rpx;
		height: 36rpx;
	}
	text {
		margin-left: 22rpx;
	}
	margin: 38rpx 30rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	font-weight: 400;
	font-size: 26rpx;
	color: #666666;
}

.warehistory {
	&-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-weight: 400;
		font-size: 28rpx;
		color: #333333;
		box-sizing: border-box;
		padding: 35rpx 30rpx 25rpx;
		&-right {
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		img {
			width: 33rpx;
			height: 33rpx;
			margin-right: 15rpx;
		}
	}
}
.warehouse-content {
		background: #FFFFFF;
		border-radius: 16rpx;
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
</style>
