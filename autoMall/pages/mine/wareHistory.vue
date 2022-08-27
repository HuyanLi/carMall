<template>
	<view class="warehistory">
		<view class="warehistory-title">
			<view>{{name}}</view>
			<view class="warehistory-title-right" @tap="handleFilter"><img src="https://carshop.duoka361.cn/images/static/image/mine/filter@2x.png" /><text>历史筛选</text></view>
		</view>
		<view class="warehouse-content">
			<view v-if="data.length == 0" class="empty" >
				暂无库存记录
			</view>
			<view v-else class="warehouse-content-item" v-for="(item,index) in data" :key="index">
				<img :src="item.goods_image" />
				<view class="warehouse-content-item-info">
					<view class="warehouse-content-item-info-title">{{item.goods_title}}</view>
					<view class="warehouse-content-item-info-storage">当前库存:{{item.after_num}}</view>
					<view class="warehouse-content-item-info-price">
						¥{{item.goods_price}}
					</view>
				</view>
			</view>
		</view>
		<uni-popup class="pop" ref="popup" background-color="#fff">
			<view class="popup-content">
				<view class="filter-title">选择修改历史 <img src="https://carshop.duoka361.cn/images/static/image/mine/bacha.png" @tap="handleClosePop"/></view>
				<view class="filter-item" v-for="(item, index) in filter" :key="index" @tap="handleChoose(item,index)">
					<img :src="item.selected ? 'https://carshop.duoka361.cn/images/static/image/mine/duigou.png' : 'https://chttps://carshop.duoka361.cn/images/empty.png'"/>
					<text>{{item.createtime}}</text>
				</view>
				<view class="save">
					<button type="default" @tap.stop='submitBtn(item)'>确认选择</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { goodsHistory, fliterHistory } from '@/api/mine.js'
	export default {
		data() {
			return {
				type: '',
				filter: [],
				data: [],
				chooseId: '',
				title: '',
				name: '当前库存'
			}
		},
		created() {
			this.initList()
			this.name = '当前库存'
		},
		methods: {
			initList() {
				let query = {
					member_id: uni.getStorageSync('member_id'),
					type: this.type,
					member_goods_time_id: this.chooseId,
					page: 1
				}
				goodsHistory(query).then(res=>{
					if(res.code === 1) {
						this.data = res.data.rows
						res.data.rows.forEach(item=>{
							item.selected = false
						})
						this.filter = res.data.rows
						
					}
 				})
			},
			handleFilter() {
				this.$refs.popup.open('bottom')
				this.initFilter()
			},
			//历史筛选
			initFilter(){
				let query = {
						member_id: uni.getStorageSync('member_id'),
						page: 1
					}
				fliterHistory(query).then(res=>{
					if(res.code === 1) {
						// this.data = res.data.rows
						res.data.rows.forEach(item=>{
							item.selected = false
						})
						this.filter = res.data.rows
					}
				})
				
			},
			handleClosePop() {
				this.$refs.popup.close('bottom')
			},
			handleChoose(item,index) {
				this.filter.forEach((index) => {
					item.selected = false
				})
				this.filter[index].selected = true
				this.title = item.createtime
				this.chooseId = item.id
			},
			submitBtn() {
				this.initList()
				this.name = this.title
				this.$refs.popup.close('bottom')
			}
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
	height: 100%;
	background-color: #f6f6f6;
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
.empty {
	height: 715rpx;
	background: #FFFFFF;
	text-align: center;
	margin-top: 20%;
}
.warehouse-content {
		background: #FFFFFF;
		border-radius: 16rpx;
		box-sizing: border-box;
		padding: 39rpx 30rpx 20rpx;
		&-item {
			margin-bottom: 20rpx;
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
