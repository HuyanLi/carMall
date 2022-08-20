<template>
	<view class="info">
		<view class="info-list">
			<view class="info-item">
				<text class="info-item-title">头像</text>
				<view class="info-item-content right">
					<image class="img" :src="userInfo.head_img"/>
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
				<input @tap="handleAddress" class="info-item-content ipt right" readonly v-model="address" type="text">
			</view>
			<view class="info-item">
				<text class="info-item-title">公司信息</text>
				<input class="info-item-content ipt" v-model="company" type="text">
			</view>
		</view>
		<uni-data-picker v-if="pickerVisible" ref="picker" placeholder="请选择" popup-title="请选择所在地区" :localdata="addressList" v-model="address"
			@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
		</uni-data-picker>
	</view>
</template>

<script>
	import { addressList } from '@/components/address.js'
	export default {
		data() {
			return {
				pickerVisible: false,
				userInfo: uni.getStorageSync('userInfo'),
				tel: uni.getStorageSync('userInfo').mobile,
				userName: uni.getStorageSync('userInfo').name,
				address: uni.getStorageSync('userInfo').province_name + uni.getStorageSync('userInfo').city_name + uni.getStorageSync('userInfo').area_name,
				company: uni.getStorageSync('userInfo').company_name,
				addressList,
			}
		},
		methods: {
			handleAddress() {
				this.pickerVisible = true
				this.$nextTick(() => {
					this.$refs.picker.show()
				})
			},
			onnodeclick(e) {
				console.log(e);
			},
			onpopupopened(e) {
				console.log('popupopened');
			},
			onpopupclosed(e) {
				this.pickerVisible = false
				console.log('popupclosed');
			},
			onchange(e) {
				console.log('onchange:', e);
				let address = ''
				e.detail.value.forEach(i => {
					address+=i.text
				})
				this.address = address
			}
 		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .selected-item-active{
		color: #7D0016;
		border: none;
	}
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
