<!-- 签约协议 -->
<template>
	<view class="signAggrement">
		<view class="box">
			<view class="img">
				<image :src="img" mode=""></image>
			</view>
			<view class="sign sign1">
				<text class="title">签约流程</text>
				<rich-text :nodes="content"></rich-text>
			</view>
			<view class="sign">
				<text class="title">签约权益</text>
				<rich-text :nodes="process"></rich-text>
			</view>
			<view class="btn">
				<!-- <button class="btn1" @click="addCart('购物车')">加入购物车</button> -->
				<button class="btn2" type="default" @click="toService">联系客服</button>
				<button class="btn1" type="default" @click="toQY">开始签约</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { getBankInfo } from '@/api/mine.js'
	import { getQY } from '@/api/home.js'
	export default {
		data() {
			return {
				img:'',
				//权益
				content: '',
				//流程
				process: ''
			};
		},
		onShow(){
			this.initContent()
		},
		methods:{ 
			initContent() {
				getQY().then(res=>{
					this.content = res.data.legal_right
					this.process = res.data.signing_process
					this.img = res.data.signing_image
				})
			},
			toService() {
				uni.navigateTo({
					url: '/pages/tabBar/service/service'
				})
			},
			toQY() {
				uni.navigateTo({
					url: '/pages/tabBar/mall/mall'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.signAggrement {
	// margin: 0 auto;
	width: 750rpx;
	height: 100%;
	.box {
		margin-bottom: 140rpx;
		.img {
			width: 690rpx;
			margin: 20rpx auto;
			image {
				width: 688rpx;
				height: 458rpx;
			}
		}
		.sign1 {
			margin-bottom: 20rpx !important;
		}
		.sign {
			width: 690rpx;
			margin: 0 auto;
			height: 385rpx;
			padding: 30rpx 30rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			.title {
				font-weight: 600;
				font-size: 30rpx;
				color: #000000;
				margin-bottom: 20rpx;
				display: inline-block;
			}
		}
		.btn {
			width: 100%;
			background: #F6F6F6;
			position: fixed;
			bottom: 0rpx;
			left: 0rpx;
			padding: 30rpx 0;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			button {
				width: 45%;
				height: 90rpx;
				line-height: 90rpx;
				border-radius: 8rpx;
				font-size: 24rpx;
				text-align: center;
			}
			.btn1 {
				background-color: #202425;
				color: #FFFFFF;
			}
			.btn2 {
				background-color: #eeeeee;
				color: #333;
			}
		}
	}
}
</style>
