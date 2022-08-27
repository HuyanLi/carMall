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
			<view class="info-item" @tap="handleAddress">
				<text class="info-item-title">选择地区</text>
				<input @blur="consigneeRegionInput" class="info-item-content ipt right" placeholder="请选择地区" v-model="address" type="text">
			</view>
			<view class="info-item">
				<text class="info-item-title">详细地址</text>
				<input class="info-item-content ipt" v-model="detailAddress" placeholder="如道路、门牌号、小区、楼栋号、单元、室等" type="text">
			</view>
		</view>
		<view class="info-default">
			<text class="info-default-title" v-model="defaultAdd">是否为默认地址</text>
			<switch class="info-default-switch"  :checked="switchState" color="#1F2425" @change="switch1Change" />
		</view>
		<view class="info-btn">
			<button type="default" @click="saveAddress">保存</button>
		</view>
		<uni-popup ref="pupop" type="bottom">
			<view class="popup">
				<view class="picker-btn">
					<view class="left" @click="cancel">取消</view>
					<view class="right" @click="confirm">确定</view>
				</view>
				<picker-view :indicator-style="indicatorStyle" :value="valueArr" @change="bindChange">
					<picker-view-column>
						<view class="item" v-for="(item,index) in province" :key="index">{{item.name}}</view>
					</picker-view-column>
					<picker-view-column v-if="province[valueArr[0]]">
						<view class="item" v-for="(item,index) in province[valueArr[0]].children" :key="index">{{item.name}}</view>
					</picker-view-column>
					<picker-view-column v-if="province[valueArr[0]]">
						<view class="item" v-for="(item,index) in province[valueArr[0]].children[valueArr[1]].children" :key="index">{{item.name}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	// import { addressList } from '@/components/address.js'
	import { getCity, addAddress, editAddress } from '@/api/store.js'
	export default {
		data() {
			return {
				tel: '',
				userName: '',
				address: '',
				detailAddress: '',
				switchState: 0,
				addressList: [],
			    categoryArr: {},
			    select:"请选择地区",
				id:'',
				valueArr: [0, 0, 0], // 用于判断当前滑动的是哪一列
				province: [], // 数据列表
				city: [],
				area: [],
				province_name: '',
				city_name: '',
				area_name: '',
				addInfo: {},
				change: false
			}
		},
		onLoad(e) {
			if(e.adsId) {
				this.addInfo = JSON.parse(e.adsId)
				this.userName = this.addInfo.consignee
				this.tel = this.addInfo.phone
				this.detailAddress = this.addInfo.address
				this.address = this.addInfo.province_name + this.addInfo.city_name + this.addInfo.area_name
				if(this.addInfo.is_default === '1') {
					this.switchState = 1
				}else {
					this.switchState = 0
				}
			}
			
		},
		created() {
			this.initCity()
		},
		methods: {
			initCity() {
				getCity().then(res=>{
					this.province = res.data
					this.loadCity(this.province[0].id)
				})
			},
			consigneeRegionInput() {
				
			},
			loadCity(pid) {
				const query = {
					parent_id: pid
				}
				getCity(query).then(res =>{
					this.city = res.data;
					// this.area = res.data;
					if (this.province[this.valueArr[0]].children === undefined) {
						this.$set(this.province[this.valueArr[0]], 'children', [])
						res.data.forEach(item => {
							this.province[this.valueArr[0]].children.push(item)
							this.valueArr.push(item.id)
						})
						console.log(this.valueArr)
						this.loadArea(this.province[this.valueArr[0]].children[this.valueArr[1]].id)
					}
				})
			},
			loadArea(pid) {
				const query = {
					parent_id: pid
				}
				getCity(query).then(res => {
					this.area = res.data;
					if (this.province[this.valueArr[0]].children[this.valueArr[1]].children === undefined) {
						this.$set(this.province[this.valueArr[0]].children[this.valueArr[1]], 'children', [])
						res.data.forEach(item => {
							this.province[this.valueArr[0]].children[this.valueArr[1]].children.push(item)
						})
					}
				})
			},
			bindChange(e) {
				const val = e.detail.value;
				if (this.valueArr[0] !== val[0]) {
					this.province_name = this.province[val[0]].name
					this.province_id = this.province[val[0]].id
					this.loadCity(this.province[val[0]].id)
				} else if (this.valueArr[1] !== val[1]) {
					this.city_name = this.province[val[0]].children[val[1]].name
					this.city_id = this.province[val[0]].children[val[1]].id
					this.loadArea(this.province[val[0]].children[val[1]].id)
				}
				this.valueArr = val
			},
			confirm(e) {
				this.province_name = this.province[this.valueArr[0]].name
				this.province_id = this.province[this.valueArr[0]].id
				this.city_name = this.province[this.valueArr[0]].children[this.valueArr[1]].name
				this.city_id = this.province[this.valueArr[0]].children[this.valueArr[1]].id
				this.area_name = this.province[this.valueArr[0]].children[this.valueArr[1]].children[this.valueArr[2]].name
				this.area_id = this.province[this.valueArr[0]].children[this.valueArr[1]].children[this.valueArr[2]].id
				this.address = this.province_name + this.city_name + this.area_name
				this.$refs.pupop.close()
			},
			cancel() {
				this.$refs.pupop.close()
			},
			switch1Change: function (e) {
				this.change = true
				console.log(e)
				// this.switchState = e.detail.value;
				if(e.detail.value === true) {
					this.switchState = 1
				}else {
					this.switchState = 0
				}
			},
			handleAddress() {
				let that = this
				this.$refs.pupop.open('bottom')
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
				let query;
				if(_this.addInfo.id !== undefined) {
					if(_this.change === false) {
						query = {
							member_id: uni.getStorageSync('member_id'),
							address: _this.detailAddress,
							province_name: _this.province_name,
							city_name: _this.addInfo.city_name,
							area_name: _this.addInfo.area_name,
							province_id: _this.addInfo.province_id,
							city_id: _this.city_id,
							area_id: _this.area_id,
							id: _this.addInfo.id,
							is_default: _this.switchState,
							consignee: _this.userName,
							phone: _this.tel,
						}
					}else {
						query = {
							member_id: uni.getStorageSync('member_id'),
							province_name: _this.province_name,
							city_name: _this.city_name,
							area_name: _this.area_name,
							province_id: _this.province_id,
							city_id: _this.city_id,
							area_id: _this.area_id,
							is_default: _this.switchState,
							consignee: _this.userName,
							phone: _this.tel,
							address: _this.detailAddress,
							id: _this.addInfo.id
						}
					}
					editAddress(query).then(res=>{
						uni.showToast({
						    title: res.msg,
						    icon: 'none',
						});
						setTimeout(()=>{
							uni.navigateBack({
								delta:1,//返回层数，2则上上页
							})
						},500)
					})
				}else {
					query = {
							member_id: uni.getStorageSync('member_id'),
							province_name: _this.province_name,
							city_name: _this.city_name,
							area_name: _this.area_name,
							province_id: _this.province_id,
							city_id: _this.city_id,
							area_id: _this.area_id,
							is_default: _this.switchState,
							consignee: _this.userName,
							phone: _this.tel,
							address: _this.detailAddress
						}
					addAddress(query).then(res=>{
						uni.showToast({
						    title: '新增成功',
						    icon: 'none',
						});
						setTimeout(()=>{
							uni.navigateBack({
								delta:1,//返回层数，2则上上页
							})
						},500)
					})
				}
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
	.popup {
		height: fit-content;
		width: 100%;
		background: #fff;
	}
	
	.picker-btn {
		display: flex;
		height: 100upx;
		width: 100%;
		line-height: 100upx;
		background: #fff;
		font-size: 34upx;
		z-index: 1;
		border-bottom: 1rpx solid #f8f8f8;
	
		.left {
			flex: 1;
			color: #0076FF;
			padding-left: 40upx;
			box-sizing: border-box;
		}
	
		.right {
			flex: 1;
			text-align: right;
			padding-right: 40upx;
			color: #FE4533;
			box-sizing: border-box;
		}
	}
	
	picker-view {
		width: 100%;
		height: 500rpx;
		display: relative;
	}
	.item {
		line-height: 100rpx;
		text-align: center;
	}
}
</style>
