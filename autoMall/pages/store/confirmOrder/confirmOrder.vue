<!-- 确认订单 -->
<template>
	<view class="order">
		<view class="orderAdress" @click="toAddress">
			<view class="orderArea">
				<text>{{area}}</text>
			</view>
			<view class="detailAddress">
				<text>{{addres}}</text>
				<!-- <image src="" mode=""></image> -->
			</view>
			<view class="adressPerson">
				<text>{{person.name}}</text>
				<text>{{person.sex}}</text>
				<text>{{person.number}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				area: '北京市朝阳区',
				addres:'动漫大厦五号楼3单元1101',
				person: {
					name: '账单',
					number: '18210646937',
					sex: '先生'
				}
			}
		},
		methods: {
			toAddress() {
				uni.navigateTo({
					url: '../shipAddress/shipAddress'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.order {
	width: 750rpx;
	height: 590rpx;
	background-image: linear-gradient(1deg, rgba(255,255,255,0.00) 0%, #003488 43%);
	padding: 40rpx 0;
	.orderAdress {
		margin: 0 30rpx;
		// width: 690rpx;
		// height: 201rpx;
		background: #FFFFFF;
		padding-top: 40rpx;
		border-radius: 16rpx;
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		.orderArea {
			font-family: PingFangSC-Light;
			font-weight: 300;
			font-size: 24rpx;
			color: #666666;
			line-height: 36rpx;
			height: 36rpx;
		}
		.detailAddress {
			margin: 10rpx 0;
			text {
				font-family: PingFangSC-Medium;
				font-weight: 500;
				font-size: 36rpx;
				color: #333333;
			}
		}
		.adressPerson {
			text {
				font-family: PingFangSC-Light;
				font-weight: 300;
				font-size: 24rpx;
				color: #666666;
				line-height: 36rpx;
			}
		}
	}
}
</style>
