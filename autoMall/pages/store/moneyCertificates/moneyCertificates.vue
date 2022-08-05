<!-- 打款凭证 -->
<template>
	<view class="moneyC">
		<!-- 付款方式 -->
		<view class="payFor">
			<view class="payType">
				<text>支付方式： </text>
				<text>{{payForType}}</text>
			</view>
			<text class="payTitle">线下打款帐号信息</text>
			<view class="payInfo">
				<view class="payAcount">
					<text class="infoTitle">帐号</text>
					<text class="info">{{account}}</text>
				</view>
				<view class="payAcount">
					<text class="infoTitle">开户行</text>
					<text class="info">{{bank}}</text>
				</view>
				<view class="payAcount">
					<text class="infoTitle">名称</text>
					<text class="info">{{company}}</text>
				</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="chooseGoods">
			<view class="chooseT">
				<text>订单信息</text>
			</view>
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
			<view class="godsCoup">
				
			</view>
		</view>
		<!-- 打款凭证 -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payForType: '线下支付',
				account: '110 9307 9091 0206 ',
				bank:'招商银行股份有限公司北京常营支行',
				company:'北京多咖科技有限公司',
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
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.moneyC {
	width: 750rpx;
	margin: 0 auto;
	.payFor {
		width: 690rpx;
		// height: 328rpx;
		background: #FFFFFF;
		border-radius: 16rpx 16rpx 0 0;
		margin: 0 auto 20rpx;
		.payType {
			background: #2B2F36;
			border-radius: 16rpx 16rpx 0 0;
			padding: 30rpx;
			text {
				font-family: PingFangSC-Regular;
				font-weight: 400;
				font-size: 26rpx;
				color: #FFFFFF;
			}
		}
		.payTitle {
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			font-size: 30rpx;
			color: #000000;
			padding: 20rpx 30rpx 13rpx;
			display: inline-block;
		}
		.payInfo {
			padding: 0rpx 30rpx 25rpx;
			.payAcount {
				margin: 13rpx 0 0rpx;
				.infoTitle {
					width: 130rpx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: 26rpx;
					display: inline-block;
				}
				.info {
					font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: 26rpx;
					color: #000000;
				}
			}
			
		}
		
	}
	.chooseGoods {
		margin: 30rpx 30rpx 20rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 35rpx 30rpx;
		.chooseT {
			font-weight: 600;
			font-size: 30rpx;
		}
		.chooseItem {
			display: flex;
			flex-direction: row;
			margin-bottom: 20rpx;
			width: 100%;
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
	.godsCoup{
		
	}
}
</style>
