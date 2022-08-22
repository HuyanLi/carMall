<template>
	<view class="info">
		<view class="info-list">
			<!-- <view class="info-item">
				<text class="info-item-title">头像</text>
				<view class="info-item-content right">
					<image class="img" src="https://carshop.duoka361.cn/images/static/image/home/shihuo.png"/>
				</view>
			</view> -->
			<view class="user">
				<view class="info-img">
					<image @tap="handleInfoView" class="img" src="https://carshop.duoka361.cn/images/static/image/home/shihuo.png">
				</view>
				<view class="info-content">
					<view>
						<text class="info-name">Latte今天喝拿铁</text>
						<image class="info-title" src="https://carshop.duoka361.cn/images/static/image/mine/tuanzhang.png">
					</view>
					<view class="info-invit-code">邀请码：S4SDF7</view>
				</view>
			</view>
			
			<view class="info-item">
				<text class="info-item-title">姓名</text>
				<input class="info-item-content ipt" v-model="userName" type="text" readonly />
			</view>
			<view class="info-item">
				<text class="info-item-title">企业名称</text>
				<input class="info-item-content ipt" v-model="tel" type="number" readonly />
			</view>
			<view class="info-item">
				<text class="info-item-title">用户身份</text>
				<input @tap="handleAddress" class="info-item-content ipt" readonly v-model="address" type="text">
			</view>
			<view class="info-item">
				<text class="info-item-title">所在地</text>
				<input class="info-item-content ipt" v-model="company" type="text" readonly />
			</view>
			<view class="info-item">
				<text class="info-item-title">职业</text>
				<input class="info-item-content ipt" v-model="company" type="text" readonly />
			</view>
			<view class="mt35">
				<text>营业执照</text>
			</view>
			<img class="license" src="https://carshop.duoka361.cn/images/static/image/home/shihuo.png"/>
		</view>
		
	</view>
</template>

<script>
	import { addressList } from '@/components/address.js'
	export default {
		data() {
			return {
				userInfo: uni.getStorageSync('userInfo'),
				pickerVisible: false,
				tel: '13112345678',
				userName: '张三',
				address: '重庆重庆市渝中区郭守敬大道831号',
				company: '北京多咖科技有限公司',
				addressList,
			}
		},
		methods: {
			
 		}
	}
</script>

<style lang="scss" scoped>
	.mt35 {
		margin-top: 35rpx;
	}
	.license {
		display: block;
		width: 224rpx;
		height: 224rpx;
		margin-top: 27rpx;
	}
	.user {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.info {
		width: 100%;
		&-img {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			border: 5rpx solid #ffffff;
			overflow: hidden;
			.img {
				width: 100%;
				height: 100%;
			}
		}
		&-content {
			flex: 1;
			margin-left: 15rpx;
		}
		&-name {
			font-weight: 500;
			font-size: 36rpx;
		}
		&-title {
			width: 107rpx;
			height: 35rpx;
			margin-left: 17rpx;
		}
		&-list {
			width: 100%;
			background: #ffffff;
			padding: 33rpx;
			box-sizing: border-box;
		}
		&-item {
			border-bottom: 1px solid #f6f6f6;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 33rpx 0;
			&-title {
				font-weight: 400;
				font-size: 28rpx;
				color: #000000;
				width: 120rpx;
			}
			&-content .img {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}
			.jt {
				width: 22rpx;
				height: 40rpx;
			}
			&-content {
				align-items: center;
				text-align: right;
				color: #999999;
			}
			&-content.ipt {
				flex: 1;
			}
		}
		.right {
			position: relative;
			padding-right: 30rpx;
		}
		.right::after {
			content: "";
			position: absolute;
			box-sizing: border-box;
			top: 50%;
			right: 10rpx;
			width: 14rpx;
			height: 14rpx;
			border-top: 2px solid #999999;
			border-right: 2px solid #999999;
			transform: rotate(45deg) translate3d(0, -50%, 0);
		}
	}
</style>
