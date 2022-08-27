<!-- 收货地址 -->
<template>
	<view class="shippingAddress">
		<view class="empty" v-if="addressList.length === 0">
			<image src="https://carshop.duoka361.cn/images/static/image/mall/empty.png" mode=""></image>
			<text class="empty-text1">当前地址为空</text>
			<text class="empty-text2" @click="addAddress('/pages/store/addAdress/addAdress')">去添加</text>
		</view>
		<view v-if="addressList.length > 0" class="addressContent" >
			<view class="addItem" v-for="(item,index) in addressList" @click="activeAdress(item,index)" :key="index">
				<view class="peoinfo" >
					<text class="fontS fontN">{{item.consignee}}</text>
					<text class="fontS fontNum">{{item.phone}}</text>
					<view v-if='item.is_default === "1"' class="defaultBtn">
						<text>默认</text>
					</view>
				</view>
				<view class="addressInfo">
					<text>{{item.province_name}}{{item.city_name}}{{item.area_name}}</text>
					<image @tap="addAddress('/pages/store/addAdress/addAdress',item)" src="https://carshop.duoka361.cn/images/static/image/mall/edit.png" mode=""></image>
				</view>
				<view class="delet">
					<view class="oprtLft" @click="setMr(item)">
						<radio :checked='item.checked' color="#203885"></radio>
						<!-- <image v-if="item.default == true" src="https://baiyuechangxiong-pic.luobo.info/static/mr.png" mode=""></image>
						<image v-else src="https://baiyuechangxiong-pic.luobo.info/static/wmr.png" mode=""></image> -->
						<!-- <checkbox-group>
							<label>
								<checkbox :checked="item.checked" color="#203885" style="transform:scale(0.7)" /><text>默认地址</text>
							</label>
						</checkbox-group> -->
					</view>
					<text class="oprtRgt" @click="deleteAddress(item.id)">删除</text>
				</view>
			</view>
		</view>
		<view v-if="addressList.length !== 0" class="btmBTtn">
			<button type="default" @click="addAddress('/pages/store/addAdress/addAdress')">添加新地址</button>
		</view>
	</view>
</template>

<script>
	import { getAddress, addAddress, deleteAddress, setDefault } from '@/api/store.js'
	export default {
		data() {
			return {
				addressList: [],
			}
		},
		onShow() {
			this.addressList = []
			this.initAddress()
		},
		methods: {
			initAddress() {
				getAddress({member_id: uni.getStorageSync('member_id')}).then(res=>{
					res.data.forEach(item=>{
						if(item.is_default === '0') {
							item.checked = false
						}else {
							item.checked = true
						}
					})
					this.addressList = res.data
				})
			},
			setMr(e) {
				if(e.is_default === '0') {
					e.is_default = '1'
				}else {
					e.is_default = '0'
				}
				let query = {
					is_default: e.is_default,
					id: e.id
				}
				setDefault(query).then(res=>{
					uni.showToast({
					    title: '设置成功',
					    icon: 'none',
					    duration: 2000
					});
					this.initAddress()
				})	
			},
			//选择地址
			activeAdress(ids,e){
				console.log(ids,e)
				var pages = getCurrentPages();
				var prepage = pages[pages.length - 2]; //上一个页面
				prepage.$vm.person = {
					name: ids.consignee,
					number: ids.phone,
					addres: ids.address,
					area: ids.province_name + ids.city_name + ids.area_name,
					id: ids.id
				}
				console.log(ids,'ids')
				uni.navigateBack({
					delta: 1
				})
			},
			deleteAddress(e) {
				let query = {
					id: e
				}
				deleteAddress(query).then(res=> {
					uni.showToast({
					    title: '删除成功',
					    icon: 'none',
					    duration: 2000
					});
					this.initAddress()
				})
			},
			addAddress(src,item) {
				console.log(item)
				if(item) {
					uni.navigateTo({
						url: '/pages/store/addAdress/addAdress?adsId=' + JSON.stringify(item)
					})
				}else {
					uni.navigateTo({
						url: src
					})
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.shippingAddress {
	width: 750rpx;
    height: 90%;
	.empty {
		width: 690rpx;
		text-align: center;
		image {
			margin: 180rpx auto 80rpx;
			width: 288rpx;
			height: 187rpx;
			opacity: 0.7;
			display: block;
		}
		&-text1 {
			font-size: 28rpx;
			color: #333;
		}
		&-text2 {
			font-size: 28rpx;
			color: #7D0016;
			border-bottom: 1rpx solid #7D0016;
		}
	}
	.addressContent {
		width: 690rpx;
		height: 100%;
		padding: 20rpx 30rpx;
		// height: 200rpx;
		// padding: 30rpx;
		overflow-y: auto;
		.addItem {
			background: #FFFFFF;
			border-radius: 8rpx;
			margin-bottom: 20rpx;
			padding: 30rpx;
			.peoinfo {
				.fontS {
					color: #333333;
				}
				.fontN {
					font-size: 32rpx;
				}
				.fontNum {
					font-size: 30rpx;
					margin: 0 30rpx 0 50rpx;
				}
				.defaultBtn {
					width: 72rpx;
					height: 35rpx;
					background: #134488;
					border-radius: 15rpx;
					display: inline-block;
					text-align: center;
					line-height: 35rpx;
					display: inline-block;
					font-size: 20rpx;
					color: #FFFFFF;
				}
			}
			.addressInfo {
				margin: 15rpx 0;
				text {
					font-size: 26rpx;
					color: #333333;
				}
				image {
					width: 30rpx;
					height: 30rpx;
					margin-left: 30rpx;
					float: right;
				}
			}
			.delet {
				overflow: hidden;
				.oprtLft{
					float: left;
					line-height: 48rpx;
					image{
						display: inline-block;
						width: 28rpx;
						height: 28rpx;
						vertical-align: middle;
					}
					text{
						font-size: 24rpx;
						color: #999999;
						margin-left: 20rpx;
					}
				}
				.oprtRgt{
					float: right;
					width: 132rpx;
					height: 48rpx;
					line-height: 48rpx;
					border-radius: 30rpx;
					// border: 2rpx solid #003BB9;
					font-size: 26rpx;
					color: #666666;
					text-align: right;
				}
			}
		}
	}
	.btmBTtn {
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
}
</style>
