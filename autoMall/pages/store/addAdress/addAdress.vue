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
		<uni-data-picker ref="picker" placeholder="请选择" popup-title="请选择所在地区" :localdata="addressAreaList" v-model="area"
			@change="onchange">
			<text class="word13" v-if="!area.length">点击选择</text>
			<text class="word13" v-else>{{ area[0] }}，{{ area[1] }}，{{ area[2] }}</text>
			<text class="icon">&#xe70d;</text>
		</uni-data-picker>
	</view>
</template>

<script>
	// import { addressList } from '@/components/address.js'
	import { getCity } from '@/api/store.js'
	export default {
		data() {
			return {
				tel: '',
				userName: '',
				address: '',
				detailAddress: '',
				switchState: false,
				pickerVisible: false,
				addressList: [],
				multiIndex: [0,0,0],
				newCategotyDataList:[[],[],[]],
			    categoryArr: {},
			    select:"请选择地区",
				id:'',
				tempClasses : '',
				addres: [],
				addressAreaList: []
			}
		},
		created() {
			this.initCity('init')
		},
		methods: {
			initCity(e,i) {
				getCity().then(res=>{
					res.data.forEach(item=>{
						item.value = item.id
						item.text = item.name
					})
					let { provinceData, cityData, areaData } = res.data;
					// let provinceData = res.data
					// let cityData;
					// let areaData;
					console.log(provinceData)
					provinceData.forEach((item, index) => {
						this.addressAreaList.push({ ...item, children: [] });
						this.addressAreaList[index].children.push(...cityData[index]);
						this.addressAreaList[index].children.forEach((item1, index1) => {
							item1['children'] = [];
							item1.children.push(...areaData[index][index1]);
						});
					});
				})
				
			},
			switch1Change: function (e) {
				this.switchState = e.detail.value;
			},
			handleAddress() {
				this.pickerVisible = true
				this.$nextTick(() => {
					this.$refs.picker.show()
				})
			},
			onnodeclick(e) {
				console.log(e);
				this.id = e.id
				this.initCity('e')
			},
			onpopupopened(e) {
				console.log('popupopened');
			},
			onpopupclosed(e) {
				console.log(e)
				// this.pickerVisible = false
				console.log('popupclosed');
				this.$refs.picker.close()
			},
			onchange(val) {
				console.log(val,222)
				getCity({parent_id: val.detail.value[0].value}).then(res=>{
					// let { provinceData, cityData, areaData } = res.data;
					let provinceData = res.data
					let cityData;
					let areaData;
					console.log(provinceData)
					provinceData.forEach((item, index) => {
						this.addressAreaList.push({ ...item, children: [] });
						this.addressAreaList[index].children.push(...cityData[index]);
						this.addressAreaList[index].children.forEach((item1, index1) => {
							item1['children'] = [];
							item1.children.push(...areaData[index][index1]);
						});
					});
				})
				
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
				let query = {
					member_id: uni.getStorageSync('member_id'),
					province_name: '',
					city_name: '',
					area_name: '',
					address: _this.detailAddress,
					province_id: '',
					city_id: '',
					area_id: '',
					is_default: _this.switchState
				}
				addressList(query).then(res=>{
					uni.showToast({
					    title: '新增成功',
					    icon: 'none',
					    duration: 2000
					});
					uni.navigateBack({
						delta:1,//返回层数，2则上上页
					})
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
