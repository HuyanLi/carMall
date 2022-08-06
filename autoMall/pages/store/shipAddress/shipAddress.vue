<!-- 收货地址 -->
<template>
	<view class="shippingAddress">
		<view class="empty" v-if="addressList.length === 0">
			<image src="../../../static/image/mall/empty.png" mode=""></image>
			<text class="empty-text1">当前地址为空,</text>
			<text class="empty-text2" @click="addAddress('/pages/store/addAdress/addAdress')">去添加</text>
		</view>
		<view v-if="addressList.length !== 0" class="addressContent" v-for="(item,index) in addressList" :key="index">
			<view class="addItem">
				<view class="peoinfo" @click="activeAdress(item,index)">
					<text class="fontS fontN">{{item.name}}</text>
					<text class="fontS fontNum">{{item.number}}</text>
					<view v-if='item.default' class="defaultBtn">
						<text>默认</text>
					</view>
				</view>
				<view class="addressInfo">
					<text>{{item.addres}}</text>
					<image @tap="addAddress('/pages/store/addAdress/addAdress',item)" src="../../../static/image/mall/edit.png" mode=""></image>
				</view>
				<view class="delet">
					<view class="oprtLft" @click="setMr(item)">
						<image v-if="item.default == true" src="https://baiyuechangxiong-pic.luobo.info/static/mr.png" mode=""></image>
						<image v-else src="https://baiyuechangxiong-pic.luobo.info/static/wmr.png" mode=""></image>
						<text>默认地址</text>
					</view>
					<text class="oprtRgt" @click="deleteAddress">删除</text>
				</view>
			</view>
		</view>
		<view v-if="addressList.length !== 0" class="btmBTtn">
			<button type="default" @click="addAddress('/pages/store/addAdress/addAdress')">添加新地址</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressList: [],
			}
		},
		onShow(e) {
			console.log(e)
			let pages = getCurrentPages();
			console.log(pages,5555555)
			let currPage = pages[pages.length-1];
			if(currPage.data.address==undefined || currPage.data.detailAddress==''){
				
			}else{
				this.addressList = currPage.data.address
				// this.address_id = currPage.data.detailAddress
			}
		},
		methods: {
			
			setMr(e) {
				console.log(e)
				uni.showToast({
				    title: '设置成功',
				    icon: 'none',
				    duration: 2000
				});
			},
			//选择地址
			activeAdress(ids,e){
				console.log(22222222223333,ids)
				var pages = getCurrentPages();
				var prepage = pages[pages.length - 2]; //上一个页面
				prepage.$vm.person = {
					name: ids.name,
					number: ids.number,
					addres: ids.detailAdress,
					sex: '先生',
					area: ids.addres
				}
				console.log(111111111,prepage.$vm.person)
				uni.navigateBack({
					delta: 1
				})
			},
			deleteAddress() {
				uni.showToast({
				    title: '删除成功',
				    icon: 'none',
				    duration: 2000
				});
			},
			addAddress(src,item) {
				if(item) {
					console.log(111111111)
					uni.navigateTo({
						url: src + '?adsId=' + item
					})
				}else {
					console.log(222222222)
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
	padding: 20rpx 30rpx;
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
		// height: 200rpx;
		// padding: 30rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		.addItem {
			padding: 30rpx;
			margin-bottom: 20rpx;
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
