<template>
	<view class="info">
		<view class="info-list">
			<view class="info-item">
				<text class="info-item-title">头像</text>
				<view class="info-item-content right">
					<image class="img" src="https://via.placeholder.com/100x100"/>
				</view>
			</view>
			<view class="info-item">
				<text class="info-item-title">用户名</text>
				<input class="info-item-content ipt" v-model="userName" type="text">
			</view>
			<view class="info-item">
				<text class="info-item-title">手机号</text>
				<input class="info-item-content ipt" v-model="tel" type="number">
			</view>
			<view class="info-item">
				<text class="info-item-title">地址</text>
				<input class="info-item-content ipt right" v-model="address" type="text">
			</view>
			<view class="info-item">
				<text class="info-item-title">公司信息</text>
				<input class="info-item-content ipt" v-model="company" type="text">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tel: '13112345678',
				userName: '张三',
				address: '重庆重庆市渝中区郭守敬大道831号',
				company: '北京多咖科技有限公司'
			}
		},
		methods: {
			
 		}
	}
</script>

<style lang="scss" scoped>
	.info {
		width: 100%;
		&-list {
			width: 100%;
			background: #ffffff;
			padding: 0 33rpx;
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
