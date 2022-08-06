<!-- 新增地址 -->
<template>
	<view class="info">
		<view class="info-list">
			<view class="info-item">
				<text class="info-item-title">收货人</text>
				<input class="info-item-content ipt" placeholder="请输入姓名" v-model="userName" type="text">
			</view>
			<view class="info-item">
				<text class="info-item-title">手机号</text>
				<input class="info-item-content ipt" v-model="tel" placeholder="请输入手机号" type="number">
			</view>
			<view class="info-item">
				<text class="info-item-title">选择地区</text>
				<input class="info-item-content ipt right" v-model="address" type="text">
				<!-- <view class="info-item-content ipt">
					<input class="chooseA" disabled="disabled" v-model="address" @blur="consigneeRegionInput" placeholder="请选择" placeholder-style="color:#CCCCCC;" type="text" />
					<image class="toimg" src="../../../static/image/mall/jt.png" mode=""></image>
				</view> -->
			</view>
			<view class="info-item">
				<text class="info-item-title">详细地址</text>
				<input class="info-item-content ipt" v-model="detailAddress" placeholder="如道路、门牌号、小区、楼栋号、单元、室等" type="text">
			</view>
		</view>
		<view class="info-default">
			<text class="info-default-title" v-model="defaultAdd">是否为默认地址</text>
			<switch class="info-default-switch" :checked="switchState" color="#1F2425" @change="switch1Change" />
		</view>
		<view class="info-btn">
			<button type="default" @click="saveAddress">保存</button>
		</view>
		<simple-address ref="mySimpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
	</view>
</template>

<script>
	import simpleAddress from '@/components/simple-address/simple-address.vue'
	export default {
		components:{
			simpleAddress
		},
		data() {
			return {
				tel: '',
				userName: '',
				address: '是砍价的覅了圣诞节',
				detailAddress: '',
				addressValue: [],
				addressName: [],
				company: '',
				switchState: false,
				cityPickerValueDefault: [0,0,0],
			}
		},
		methods: {
			selects: function() {
				this.$refs.mySimpleAddress.open();
			},
			onConfirm(e) {
				// console.log(e)
				this.address = e.label;
				this.addressValue = e.value;
				this.addressName = e.labelArr;
			},
			switch1Change: function (e) {
				this.switchState = e.detail.value;
			},
			consigneeRegionInput() {
				
			},
			switch1Change() {
				this.switchState = !this.switchState
			},
			saveAddress() {
				let _this = this
				if(_this.userName == ""){
					uni.showToast({
					    title: '姓名不能为空',
					    icon: 'none',
					    duration: 2000
					});
					return false;
				}
				if(_this.tel == ""){
					uni.showToast({
					    title: '手机不能为空',
					    icon: 'none',
					    duration: 2000
					});
					return false;
				}
				if(!(/^1[3456789]\d{9}$/.test(_this.tel))){
					uni.showToast({
					    title: '请输入正确的手机号',
					    icon: 'none',
					    duration: 2000
					});
					return false;
				}
				if(_this.address == ""){
					uni.showToast({
					    title: '所在区域不能为空',
					    icon: 'none',
					    duration: 2000
					});
					return false;
				}
				if(_this.detailAddress == ""){
					uni.showToast({
					    title: '详细地址不能为空',
					    icon: 'none',
					    duration: 2000
					});
					return false;
				}
				var pages = getCurrentPages();
				var prepage = pages[pages.length - 2]; //上一个页面
				prepage.$vm.addressList.push({
					name: _this.userName,
					number: _this.tel,
					addres: _this.address,
					default: _this.switchState,
					detailAdress: _this.detailAddress
				});
				uni.showToast({
				    title: '新增成功',
				    icon: 'none',
				    duration: 2000
				});
				uni.navigateBack({
					delta:1,//返回层数，2则上上页
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.info {
	width: 100%;
	&-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 750rpx;
		// height: 129rpx;
		background: #FFFFFF;
		button {
			width: 690rpx;
			height: 88rpx;
			background: #202425;
			border-radius: 8rpx;
			color: #fff;
			margin: 20rpx auto;
		}
	}
	&-default {
		padding: 45rpx 33rpx;
		line-height: 70rpx;
		&-title {
			font-size: 28rpx;
			color: #333;
		}
		&-switch {
			float: right;
		}
	}
	&-list {
		width: 100%;
		background: #ffffff;
		padding: 0 33rpx;
		box-sizing: border-box;
		border: 1rpx solid #EEEEEE;
		margin: 20rpx auto 0;
	}
	&-item {
		border-bottom: 1rpx solid #f6f6f6;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 33rpx 0;
		&-title {
			font-weight: 400;
			font-size: 28rpx;
			color: #333;
			width: 150rpx;
		}
		.toimg {
			width: 40rpx;
			height: 40rpx;
		}
		&-content .img {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
		}
		.chooseA {
			display: inline-block;
			width: 90%;
		}
		.jt {
			width: 22rpx;
			height: 40rpx;
		}
		&-content {
			align-items: center;
			text-align: left;
			color: #333;
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
