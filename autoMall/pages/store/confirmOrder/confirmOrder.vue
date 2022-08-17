<!-- 确认订单 -->
<template>
	<view class="order">
		<!-- 收货地址 -->
		<view class="orderAdress" @click="toAddress">
			<view class="orderArea">
				<text>{{person.area}}</text>
			</view>
			<view class="detailAddress">
				<text>{{person.addres}}</text>
				<image src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mall/to.png"></image>
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
					<text class="shopTag">{{item.type}}</text>
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
					<text class="testMon">-￥{{coupon}}</text>
					<image src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mall/to.png" mode=""></image>
				</view>
			</view>
			<view class="total">
				<text class="totalNum">共{{goodsnum}}件</text>
				<text class="totalMoney">小计：</text>
				<text class="testMon">¥</text>
				<text class="testMon money2">{{total}}</text>
			</view>
		</view>
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
		<!-- 确认打款 -->
		<view class="confirmMoney">
			<text class="goodN">共{{goodsnum}}件</text>
			<view class="confirmPay">
				<text style="font-size: 26rpx;color: #333333;">实付</text>
				<text style="font-size: 24rpx;color: #FF0000;">￥</text>
				<text style="font-size: 36rpx;color: #FF0000;">{{total}}</text>
			</view>
			<view class="confirmBtn">
				<button class="confirmB" type="default" @click="toConfirm">确认打款</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { getOrderPrice, getBankInfo, } from '@/api/store.js'
	export default {
		data() {
			return {
				person: {
					area: '北京市朝阳区',
					addres:'动漫大厦五号楼3单元1101',
					name: '账单',
					number: '18210646937',
					sex: '先生'
				},
				goodsList: [{
					imgSrc: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/banner1.png',
					title: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',
					type: '太空灰;256GB',
					money: '￥368.00',
					count: '1',
				},{
					imgSrc: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/banner1.png',
					title: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',
					type: '太空灰;256GB',
					money: '￥368.00',
					count: '1',
				},{
					imgSrc: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/banner1.png',
					title: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',
					type: '太空灰;256GB',
					money: '￥368.00',
					count: '1',
				}],
				coupon: '15.00',
				freight: '￥10.00',
				goodsnum: '2',
				total: '159.00',
				payForType: '线下支付',
				account: '110 9307 9091 0206 ',
				bank:'招商银行股份有限公司北京常营支行',
				company:'北京多咖科技有限公司'
			}
		},
		onLoad(e) {
			console.log(e)
			let data = e.goodsData
			this.initconfrom(data)
			this.initBankInfo()
		},
		methods: {
			initconfrom(e){
				let data = {
					member_id: uni.getStorageSync('member_id'),
					goods_list: e,
					address_id: 2,
					is_cart: 2,
					type: 'other'
				}
				getOrderPrice(data).then(res=>{
					console.log(res)
					this.total = res.data.pay_fee
					this.coupon = res.data.coupon_fee
					this.company = res.data.goods_num
				})
			},
			initBankInfo() {
				getBankInfo().then(res=>{
					this.account = res.data.pay_bank_code
					this.bank = res.data.pay_bank_name
					this.account = res.data.company_name
				})
			},
			toAddress() {
				uni.navigateTo({
					url: '/pages/store/shipAddress/shipAddress'
				})
			},
			//优惠金额
			toCoupon() {
				uni.navigateTo({
					url: '/pages/store/coupon/coupon'
				})
			},
			//确认打款
			toConfirm() {
				//是否签约 1：未签约 2：已签约
				if(this.$store.state.user.userInfo.is_signing === '1') {
					//签约协议
					uni.navigateTo({
						url: '/pages/store/signAgreement/signAgreement'
					})
				}else {
					uni.navigateTo({
						url: '/pages/store/signAgreement/signAgreement'
					})
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.order {
	width: 750rpx;
	height: 590rpx;
	background-image: linear-gradient(1deg, rgba(255,255,255,0.00) 0%, #003488 43%);
	padding: 40rpx 0 ;
	.orderAdress {
		margin: 0 30rpx;
		background: #FFFFFF;
		padding-top: 40rpx;
		border-radius: 16rpx;
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		border: 1px solid;
		border-image:url(https://baiyuechangxiong-pic.luobo.info/che/static/image/mall/group.png) 27 round; 
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
					display: inline-block;
					padding: 0 20rpx;
					height: 48rpx;
					border-radius: 8rpx;
					margin: 10rpx 0 ;
					background: #F3F3F3;
					border-radius: 8rpx;
					text-align: center;
					line-height: 48rpx;
					font-size: 22rpx;
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
		.total {
			padding: 0 30rpx 30rpx;
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
	.payFor {
		width: 690rpx;
		// height: 328rpx;
		background: #FFFFFF;
		border-radius: 16rpx 16rpx 0 0;
		margin: 0 auto 120rpx;
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
	.confirmMoney {
		width: 750rpx;
		height: 100rpx;
		line-height: 100rpx;
		background: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 0rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: baseline;
		.goodN {
			// line-height: 100rpx;
			// margin-left: 30rpx;
			font-size: 24rpx;
			color: #818181;
		}
		.confirmPay {
			display: inline-block;
			// line-height: 100rpx;
			// float: left;
			margin-left: 230rpx;
		}
		.confirmBtn {                     
			display: inline-block;
			margin: 10rpx 0rpx 10rpx 20rpx;
			// margin-right: 20rpx;
			// float: right;
			.confirmB {
				width: 200rpx;
				// height: 78rpx;
				background: #202425;
				border-radius: 4rpx;
				font-size: 26rpx;
				color: #FFFFFF;
			}
		}
	}
}
</style>
