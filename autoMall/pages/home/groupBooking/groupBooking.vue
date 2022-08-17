<!-- 拼团活动 -->
<template>
	<view class="group">
		<view class="group-header"></view>
		<view class="group-content">
			<view class="group-content-title">
				第一阶段 -51000元（9折）
			</view>
			<view class="group-content-text">
				距下一阶段还差***元，下一阶段可8折购买
			</view>
			<view class="group-content-main">
				<view class="group-content-main-left">
					<image src="https://baiyuechangxiong-pic.luobo.info/che/static/image/home//211铃铛-线性.png" mode=""></image>
					<text>庹豪珠</text>
				</view>
				<view class="group-content-main-right">
					<text class="text1"> ¥368.00</text>
					<text class="text2">¥400.00</text>
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
				优惠额度富文本文字占位优惠额度富文本文字占位优惠额度富文本文字产规效什入青马及并路类验须要。提果身区北次事置温从真备四适和海多标图高矿体儿将交老口府金这速一文百则容美满龙元。装则收争品得压国示与更由党下
			</view>
		</view>
		<view class="group-botton">
			<button type="default" @click="toConfirm">
				确认打款 (已优惠¥500.00)
			</button>
		</view>
	</view>
</template>

<script>
	import { getptList } from '@/api/store.js'
	export default {
		data() {
			return {
				tabList: [{
					name: '第一阶段'
				},{
					name: '第二阶段'
				},{
					name: '第三阶段'
				}],
				active: 0,
				article: '技点际引利及快自空金效回动期往更标元得达利先之六术质于六国素率动热她志离头流。土断二大影角门包题类一育思酸西要老求史把并此至传动五几条被口前查全连上石何来你员圆往队周导政引色队程。以型但传七克难半产习光量根往立查式自使圆太办百接回阶空团安别改。'
			}
		},
		created() {
			this.initPTList()
		},
		methods: {
			initPTList() {
				getptList({member_id: uni.getStorageSync('member_id')}).then(res=>{
					console.log(res)
				})
			},
			changeActive(i,e) {
				this.active = e
			},
			//继续选货
			chooseGoods() {
				uni.navigateTo({
					url: '/pages/tabBar/mall/mall'
				})
			},
			//确认打款
			toConfirm() {
				uni.navigateTo({
					url: '/pages/store/moneyCertificates/moneyCertificates'
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
		background: url("https://baiyuechangxiong-pic.luobo.info/che/static/image/home/ping.png") no-repeat;
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
		background-image: url(https://baiyuechangxiong-pic.luobo.info/che/static/image/home/xingzhuang.png);
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
