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
				<!-- <input disabled="disabled" v-model="address" @blur="consigneeRegionInput" placeholder="请选择省市区" placeholder-style="color:#CCCCCC;" type="text" /> -->
				<!-- <input class="info-item-content ipt right" v-model="address" type="text"> -->
				<input @tap="handleAddress" class="info-item-content ipt right" readonly v-model="address" type="text">
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
		<uni-data-picker v-if="pickerVisible" ref="picker" placeholder="请选择" popup-title="请选择所在地区" :localdata="dataTree" v-model="address"
			@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
		</uni-data-picker>
		<!-- <simple-address ref="mySimpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address> -->
	</view>
</template>

<script>
	// import simpleAddress from '@/components/simple-address/simple-address.vue'
	export default {
		// components:{
		// 	simpleAddress
		// },
		data() {
			return {
				tel: '',
				userName: '',
				address: '重庆重庆市渝中区',
				detailAddress: '',
				addressValue: [],
				// addressName: [],
				switchState: false,
				// cityPickerValueDefault: [0,0,0],
				pickerVisible: false,
				dataTree: [{
					text: "河北省",
					value: "1-0",
					children: [{
						text: "石家庄市",
						value: "1-1",
						children: [{
							text: "长安区",
							value: '1-1-1'
						},{
							text: "雨花区",
							value: '1-1-2'
						},{
							text: "桥东区",
							value: '1-1-3'
						},{
							text: "桥南区",
							value: '1-1-4'
						}]
					},
					{
						text: "保定市",
						value: "1-2"
					}]
				},
				{
					text: "山西省",
					value: "2-0",
					children: [{
						text: "太原市",
						value: "2-1"
					},
					{
						text: "大同市",
						value: "2-2"
					}]
				},
				{
					text: "辽宁省",
					value: "3-0",
					children: [{
						text: "沈阳市",
						value: "3-1"
					},
					{
						text: "朝阳市",
						value: "3-2"
					}]
				}]
			}
		},
		methods: {
			// handleAddress() {
			// 	this.pickerVisible = true
			// 	this.$nextTick(() => {
			// 		this.$refs.picker.show()
			// 	})
			// },
			// selects: function() {
			// 	this.$refs.mySimpleAddress.open();
			// },
			// onConfirm(e) {
			// 	// console.log(e)
			// 	this.address = e.label;
			// 	this.addressValue = e.value;
			// 	this.addressName = e.labelArr;
			// },
			// switch1Change: function (e) {
			// 	this.switchState = e.detail.value;
			// },
			// consigneeRegionInput() {
				
			// },
			// switch1Change() {
			// 	this.switchState = !this.switchState
			// },
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
