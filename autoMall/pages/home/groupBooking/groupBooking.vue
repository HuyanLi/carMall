<!-- 拼团活动 -->
<template>
	<view class="group">
		<view class="group-header"></view>
		<view class="group-content">
			<view class="group-content-title">
				第一阶段 {{ptInfo.all_price}}元（{{ptInfo.now_discount}}折）
			</view>
			<view class="group-content-text">
				距下一阶段还差{{ptInfo.last_price}}元，下一阶段可{{ptInfo.next_discount}}折购买
			</view>
			<view class="group-content-main" v-for="(item,index) in ptInfo.member_list" :key='index'>
				<view class="group-content-main-left">
					<image :src="item.head_img" mode=""></image>
					<text>{{item.nickname}}</text>
				</view>
				<view class="group-content-main-right">
					<text class="text1"> ¥{{item.discount_price}}</text>
					<text class="text2">¥{{item.price}}</text>
				</view>
			</view>
			<button class="group-content-btn" type="default" @click="chooseGoods">继续选货</button>
		</view>
		<view class="group-sale">
			<view class="group-sale-title">
				优惠额度
			</view>
			<view class="group-sale-tablist">
				<view class="group-sale-tablist-item" @click="changeActive(item,index)" :class="active === index?'activeItem':''" v-for="(item,index) in tabList" :key='index'>
					{{item.name}}
				</view>
			</view>
			<view class="group-sale-article">
				<!-- {{note}} -->
				<rich-text :nodes="note"></rich-text>
			</view>
		</view>
		<view class="group-botton">
			<button type="default" @click="toConfirm">
				确认打款 (已优惠{{ptInfo.my_discount_price}})
			</button>
		</view>
	</view>
</template>

<script>
	import { getptList, getptStep, addptOrder } from '@/api/store.js'
	export default {
		data() {
			return {
				tabList: [{
					name: '第一阶段',
				},{
					name: '第二阶段',
				},{
					name: '第三阶段'
				}],
				active: 0,
				article: '七克难半产习光量根往立查式自使圆太办百接回阶空团安别改。',
				ptInfo: null,
				ptSetting: null,
				ptList: [],
				note: ''
			}
		},
		created() {
			this.initPTList()
			this.initStep()
		},
		methods: {
			initPTList() {
				getptList({member_id: uni.getStorageSync('member_id')}).then(res=>{
					if(res.code == 1) {
						this.ptInfo = res.data
						if(this.ptInfo.now_level > 0) {
							this.active = this.ptInfo.now_level - 1
						}else {
							this.active = 0
						}
					}else {
						uni.showToast({
							title: res.msg,
							duration: 2000
						})
					}
				})
			},
			//获取拼团设置
			initStep() {
				getptStep().then(res=>{
					if(res.code == 1) {
						this.ptList = res.data.shuoming
						this.ptList.forEach((item,index)=>{
							if(this.active === index) {
								this.note = item.note
							}
						})
					}
				})
			},
			changeActive(i,e) {
				this.active = e
				this.note = ''
				this.ptList.forEach((item,index)=>{
					if(e == index) {
						this.note = item.note
					}
				})
			},
			//继续选货
			chooseGoods() {
				uni.navigateTo({
					url: '/pages/tabBar/mall/mall'
				})
			},
			//确认打款
			toConfirm() {
				addptOrder({member_id: uni.getStorageSync('member_id')}).then(res=>{
					if(res.code == 1) {
						uni.navigateTo({
							url: '/pages/store/moneyCertificates/moneyCertificates?orderId=' + res.data.order_id
						})
					}else {
						uni.showToast({
							title: res.msg,
							duration: 2000
						})
					}
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.group {
	position: relative;
	box-sizing: border-box;
	padding-bottom: 118rpx;
	&-header {
		height: 510rpx;
		background: url("https://carshop.duoka361.cn/images/static/image/home/ping.png") no-repeat;
		transform: translate3d(0,-3rpx,0);
		background-size: cover;
		color: #ffffff;
		box-sizing: border-box;
		padding-top: 83rpx;
		padding-left: 30rpx;
		font-weight: 400;
		font-size: 26rpx;
	}
	&-content {
		width: 90%;
		margin: 0 auto;
		background: #FFFFFF;
		border-radius: 16rpx;
		transform: translate3d(0, -200rpx, 0);
		box-sizing: border-box;
		padding: 40rpx;
		&-title {
			font-weight: 600;
			font-size: 32rpx;
			color: #333333;
			margin-bottom: 13rpx;
		}
		&-text {
			font-size: 24rpx;
			color: #FF6B33;
			margin-bottom: 40rpx;
		}
		&-main {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			&-left {
				display: flex;
				align-items: center;
				image {
					width: 63rpx;
					height: 63rpx;
				}
				text {
					font-size: 24rpx;
					color: #000000;
					margin-left: 20rpx;
				}
			}
			&-right {
				.text1 {
					font-size: 32rpx;
					color: #ED1C24;
				}
				.text2 {
					margin-left: 11rpx;
					font-size: 24rpx;
					color: #999999;
					text-decoration: line-through;
				}
			}
		}
		&-btn {
			width: 404rpx;
			height: 86rpx;
			line-height: 86rpx;
			background: #003488;
			border-radius: 43rpx;
			font-size: 28rpx;
			color: #FFFFFF;
			margin-top: 40rpx;
		}
	}
	&-sale {
		padding: 40rpx;
		margin: 0 auto;
		box-sizing: border-box;
		transform: translate3d(0, -200rpx, 0);
		&-title {
			font-weight: 600;
			font-size: 28rpx;
			color: #333333;
		}
		&-tablist {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-top: 20rpx;
			&-item {
				width: 200rpx;
				height: 85rpx;
				text-align: center;
				line-height: 85rpx;
				font-weight: 400;
				font-size: 26rpx;
				color: #999999;
			}
		}
		&-article {
			background-color: #fff;
			padding: 30rpx;
			margin-top: 10rpx;
			font-size: 26rpx;
			color: #666666;
		}
	}
	.activeItem {
		width: 200rpx;
		height: 85rpx;
		text-align: center;
		line-height: 70rpx;
		font-weight: 600;
		font-size: 28rpx;
		color: #FFFFFF;
		display: inline-block;
		background-image: url(https://carshop.duoka361.cn/images/static/image/home/xingzhuang.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	&-botton {
		position: fixed;
		left: 0rpx;
		bottom: 0rpx;
		background: #fff;
		height: 130rpx;
		width: 750rpx;
		button {
			width: 690rpx;
			height: 88rpx;
			color: #fff;
			background: #202425;
			border-radius: 8rpx;
			margin: 30rpx;
		}
	}
}
</style>
