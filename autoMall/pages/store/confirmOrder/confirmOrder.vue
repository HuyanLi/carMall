<!-- 确认订单 -->
<template>
	<view class="order">
		<!-- 收货地址 -->
		<view class="orderAdress" @click="toAddress">
			<view class="orderArea">
				<text>{{area}}</text>
			</view>
			<view class="detailAddress">
				<text>{{addres}}</text>
				<image src="../../../static/image/mall/to.png"></image>
			</view>
			<view class="adressPerson">
				<text class="text1">{{person.name}}</text>
				<text class="text2">{{person.sex}}</text>
				<text class="text3">{{person.number}}</text>
			</view>
		</view>
		<!-- 选购商品 -->
		<view class="chooseGoods">
			<view class="chooseItem" v-for="(item,index) in goodsList" :key='index'>
				<image class="goodsImage" :src="item.imgSrc"></image>
				<view class="goodsInfo">
					<text class="shopTitle">{{item.title}}</text>
					<view class="shopTag">
						<uni-tag class="tag" :text="item.type" />
					</view>
					<view class="moneyInfo">
						<view class="">
							<text class="shopMoney">{{item.money}}</text>
						</view>
						<view class="number-box">
							<text>X {{item.count}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 金额 -->
		<view class="goodsMoney">
			<view class="goodsCoupon">
				<text class="textS">优惠金额</text>
				<view class="money" @click="toCoupon">
					<text class="testMon">{{coupon}}</text>
					<image src="../../../static/image/mall/to.png" mode=""></image>
				</view>
			</view>
			<view class="yunfei">
				<text class="textS">运费</text>
				<text class="testMon yfMon">{{freight}}</text>
			</view>
			<view class="total">
				<text class="totalNum">共{{goodsnum}}件</text>
				<text class="totalMoney">小计：</text>
				<text class="testMon">¥</text>
				<text class="testMon money2">{{total}}</text>
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
				},
				goodsList: [{
					imgSrc: require('../../../static/image/home/banner1.png'),
					title: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',
					type: '太空灰;256GB',
					money: '￥368.00',
					count: '1',
				},{
					imgSrc: require('../../../static/image/home/banner1.png'),
					title: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',
					type: '太空灰;256GB',
					money: '￥368.00',
					count: '1',
				},{
					imgSrc: require('../../../static/image/home/banner1.png'),
					title: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',
					type: '太空灰;256GB',
					money: '￥368.00',
					count: '1',
				}],
				coupon: '-￥15.00',
				freight: '￥10.00',
				goodsnum: '2',
				total: '159.00'
			}
		},
		methods: {
			toAddress() {
				uni.navigateTo({
					url: '../shipAddress/shipAddress'
				})
			},
			//优惠金额
			toCoupon() {
				uni.navigateTo({
					url: '../coupon/coupon'
				})
			}
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
		background: #FFFFFF;
		padding-top: 40rpx;
		border-radius: 16rpx;
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		border: 1px solid;
		border-image:url(../../../static/image/mall/group.png) 27 round; 
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
				display: inline-block;
				float: left;
				font-family: PingFangSC-Medium;
				font-weight: 500;
				font-size: 36rpx;
				color: #333333;
				width: 95%;
			}
			image {
				width: 32rpx;
				height: 43rpx;
				float: right;
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
			.text2 {
				margin: 0 20rpx;
			}
		}
	}
	.chooseGoods {
		margin: 30rpx 30rpx 20rpx;
		// height: 456rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 30rpx 25rpx;
		.chooseItem {
			display: flex;
			flex-direction: row;
			margin-bottom: 20rpx;
			.goodsImage {
				width: 180rpx;
				height: 180rpx;
			}
			.goodsInfo {
				margin: 0 0 0 20rpx;
				// width: 69%;
				width: 445rpx;
				.shopTitle {
					display: inline-block;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: 26rpx;
					color: #333333;
				}
				.shopTag {
					width: 210rpx;
					height: 48rpx;
					border-radius: 8rpx;
					margin: 10rpx 0 ;
					.tag {
						.uni-tag {
							background-color: #F3F3F3 !important;
							font-size: 24rpx;
							color: #757575;
							font-family: PingFangSC-Regular;
							font-weight: 400;
						}
					}
				}
				.moneyInfo {
					// width: 76rpx;
					width: 100%;
					height: 44rpx;
					// background: #F6F6F6;
					border-radius: 4rpx;
					display: flex;
					justify-content: space-between;
					flex-direction: row;
					align-items: center;
					.shopMoney {
						font-family: PingFangSC-Regular;
						font-weight: 400;
						font-size: 30rpx;
						color: #ED1C24;
					}
					.number-box {
						float: right;
						text {
							font-family: PingFangSC-Regular;
							font-weight: 400;
							font-size: 24rpx;
							color: #757575;
						}
					}
				}
				
			}
		
		}
	}
	.goodsMoney {
		width: 690rpx;
		margin: 0 auto 20rpx;
		// height: 252px;
		background: #FFFFFF;
		border-radius: 16rpx;
		overflow: hidden;
		.textS {
			font-family: PingFangSC-Regular;
			font-weight: 400;
			font-size: 26rpx;
			color: #333333;
		}
		.testMon {
			font-family: PingFangSC-Regular;
			font-weight: 400;
			font-size: 26rpx;
			color: #FF0000;
		}
		.goodsCoupon {
			padding: 30rpx 30rpx 35rpx;
			.money {
				float: right;
				display: inline-block;
				image {
					width: 12rpx;
					height: 20rpx;
					margin-left: 20rpx;
				}
			}
			
		}
		.yunfei {
			padding: 30rpx;
			.yfMon {
				float: right;
			}
		}
		.total {
			padding: 30rpx;
			float: right;
			.totalNum{
				font-size: 22rpx;
				color: #999999;
				margin-right: 20rpx;
			}
			.totalMoney {
				font-size: 26rpx;
				color: #333333;
			}
			.money2 {
				font-size: 36rpx;
			}
		}
	}
}
</style>
