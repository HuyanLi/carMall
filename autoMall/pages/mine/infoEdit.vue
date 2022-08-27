<template>
	<view class="info">
		<view class="info-list">
			<view class="info-item">
				<text class="info-item-title">头像</text>
				<view class="info-item-content right" @tap.stop='editImg'>
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
		<view class="bottom-btn">
			<button type="default" @tap.stop="saveInfo">保存</button>
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
	import { getCity } from '@/api/store.js'
	import { editUser } from '@/api/mine.js'
	export default {
		data() {
			return {
				pickerVisible: false,
				userInfo: uni.getStorageSync('userInfo'),
				tel: uni.getStorageSync('userInfo').mobile,
				userName: uni.getStorageSync('userInfo').realname,
				address: '北京北京市昌平区',
				company: uni.getStorageSync('userInfo').company_name,
				select:"请选择地区",
				id:'',
				valueArr: [0, 0, 0], // 用于判断当前滑动的是哪一列
				province: [], // 数据列表
				city: [],
				area: [],
				province_name: '',
				city_name: '',
				area_name: '',
			}
		},
		created() {
			this.address = uni.getStorageSync('userInfo').province_name + uni.getStorageSync('userInfo').city_name + uni.getStorageSync('userInfo').area_name,
			this.initCity()
		},
		methods: {
			editImg() {
				
			},
			saveInfo() {
				let query = {
					member_id: uni.getStorageSync('member_id'),
					mobile: this.tel,
					realname: this.userName,
					company_name: this.company,
					province_name: this.province_name,
					city_name: this.city_name,
					area_name: this.area_name
				}
				editUser(query).then(res=>{
					uni.showToast({
						title: res.msg,
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta: 1
						})
					},500)
				})
			},
			handleAddress() {
				let that = this
				that.$refs.pupop.open()
			},
			initCity() {
				getCity().then(res=>{
					this.province = res.data
					this.loadCity(this.province[0].id)
				})
				
			},
			loadCity(pid) {
				const query = {
					parent_id: pid
				}
				getCity(query).then(res =>{
					this.city = res.data;
					if (this.province[this.valueArr[0]].children === undefined) {
						this.$set(this.province[this.valueArr[0]], 'children', [])
						res.data.forEach(item => {
							this.province[this.valueArr[0]].children.push(item)
						})
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
					this.city_name = this.province[val[0]].children[val[1]].name,
					this.loadArea(this.province[val[0]].children[val[1]].id)
					this.city_id = this.province[val[0]].children[val[1]].id
				}
				this.valueArr = val
			},
			confirm(e) {
				this.area.forEach((item,index)=>{
					if(this.valueArr[2] === index) {
						this.area_name = item.name
					}
				})
				this.address = this.province_name + this.city_name + this.area_name
				this.$refs.pupop.close()
			},
			cancel() {
				this.$refs.pupop.close()
			},
			
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
		.popup {
			height: fit-content;
			width: 100%;
			background: #fff;
			bottom: 0;
			position: fixed;
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
		.bottom-btn {
			position: fixed;
			bottom: 0;
			left: 0;
			margin: 0 auto;
			width: 750rpx;
			height: 129rpx;
			background: #FFFFFF;
			button {
				width: 690rpx;
				height: 88rpx;
				background: #202425;
				border-radius: 8px;
				color: #fff;
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
