<!-- 确认订单 -->
<template>
	<view class="order">
		<!-- 收货地址 -->
		<view class="orderAdress" @click="toAddress" v-if="showAddress">
			<view class="orderArea">
				<text>{{person.area}}</text>
			</view>
			<view class="detailAddress">
				<text>{{person.addres}}</text>
				<image src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mall/to.png"></image>
			</view>
			<view class="adressPerson">
				<text class="text1">{{person.name}}</text>
				<text class="text3">{{person.number}}</text>
			</view>
		</view>
		<view class="orderAdress" @click="toAddress" v-else>
			<view class="detailAddress">
				<text>请添加收货地址</text>
				<image src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mall/to.png"></image>
			</view>
		</view>
		<!-- 选购商品 -->
		<view class="chooseGoods">
			<view class="chooseItem" v-for="(item,index) in goodsList" :key='index'>
				<image class="goodsImage" :src="item.goods.image"></image>
				<view class="goodsInfo">
					<text class="shopTitle">{{item.goods.title}}</text>
					<text class="shopTag">{{item.sku_price.goods_sku_text}}</text>
					<view class="moneyInfo">
						<view class="">
							<text class="shopMoney">{{item.sku_price.price}}</text>
						</view>
						<view class="number-box">
							<text>X {{item.goods_num}}</text>
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
					<text class="testMon" v-if="showChoose">请选择优惠券</text>
					<text class="testMon" v-else>-￥{{coupon}}</text>
					<image src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mall/to.png" mode=""></image>
				</view>
			</view>
			<view class="total">
				<text class="totalNum">共{{goodsnum}}件</text>
				<text class="totalMoney">小计：</text>
				<text class="testMon" >¥</text>
				<text class="testMon money2">{{originTotal}}</text>
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
	import { getOrderPrice, getBankInfo, getDefault, addOrder} from '@/api/store.js'
	export default {
		data() {
			return {
				person: {},
				showAddress: false,
				goodsList: [],
				coupon: '',
				goodsnum: '',
				total: '',
				originTotal: '',
				payForType: '线下支付',
				bankInfo: null,
				account: '',
				bank:'',
				company:'',
				user: '',
				addId: '',
				couId: '',
				comitGoods: '',
				coupData: {},
				confromData: [],
				showChoose: true
			}
		},
		onLoad(e) {
			this.goodsList = JSON.parse(e.goodsData)
			this.goodsList.forEach(item=>{
				this.goodsnum = item.goods_num
				this.confromData.push({
					goods_id: item.goods_id,
					goods_sku_price_id: item.sku_price_id,
					num: item.goods_num
				})
			})
			this.user = uni.getStorageSync('userInfo')
		},
		onShow() {
			this.initDefault()
			this.initBankInfo()
			this.initconfrom()
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1]; //当前页面
			//地址
			if(currPage.data.person) {
				console.log(currPage.data.person,'person')
				let data = currPage.data.person;
				//地址
				this.person.area = data.area;
				this.person.addres = data.addres;
				this.person.name = data.name;
				this.person.number = data.number;
				this.addId = data.id
			}
			//优惠券
			let list = currPage.data.coupon
			console.log(list,'list')
			if(list === 0) {
				this.showChoose = true
			}else if(list !== '') {
				this.coupData = JSON.parse(list)
				this.coupon = JSON.parse(list).reduce_price
				this.couId = JSON.parse(list).id
				this.initconfrom()
				this.showChoose = false
			}
		},
		methods: {
			initDefault() {
				getDefault({member_id: uni.getStorageSync('member_id')}).then(res=>{
					if(res.code === 0) {
						this.showAddress = false
					}else {
						this.showAddress = true
						this.person.area = res.data.province_name +res.data.city_name + res.data.area_name
						this.person.name = res.data.consignee
						this.person.number = res.data.phone
						this.person.addres = res.data.address
						this.addId = res.data.id
					}
				})
			},
			//计算金额
			initconfrom(){
				let data = {
					member_id: uni.getStorageSync('member_id'),
					goods_list: JSON.stringify(this.confromData),
					is_cart: 2,
					coupon_id: this.couId
				}
				getOrderPrice(data).then(res=>{
					if(res.code === 0) {
						uni.showToast({
							title: res.msg,
							duration: 2000
						})
						this.couId = ''
						this.coupData = {}
					}else {
						this.originTotal = res.data.total_amount
						this.total = res.data.pay_fee
						this.coupon = res.data.coupon_fee
						this.company = res.data.goods_num
						this.needQY = res.data.is_signing
					}
				})
			},
			initBankInfo() {
				getBankInfo().then(res=>{
					this.bankInfo = res.data
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
				if(this.couId ===undefined) {
					this.couId = ''
				}
				let query = {
					member_id: uni.getStorageSync('member_id'),
					goods_list: JSON.stringify(this.confromData),
					address_id: this.addId,
					is_cart: 2,
					remark: '',
					coupon_id: this.couId
				}
				addOrder(query).then(res=>{
					this.orderId = res.data.order_id
					if(this.needQY === '1') {
						//不需要签约
						uni.navigateTo({
							url: '/pages/store/moneyCertificates/moneyCertificates?info='+ JSON.stringify(this.bankInfo) + '&goods=' + JSON.stringify(this.goodsList) + '&coupon=' + 
							JSON.stringify(this.coupData) + '&price=' + this.originTotal + '&orderId='+ res.data.order_id
						})
					}else {
						//需要签约
						//是否签约
						if( this.user.signing_image === null) {
							//1：未签约   签约协议
							
							uni.navigateTo({
								url: '/pages/store/signAgreement/signAgreement?info='+ JSON.stringify(this.bankInfo)
							})
						}else {
							//2：已签约  提交打款凭证
							uni.navigateTo({
								url: '/pages/store/moneyCertificates/moneyCertificates?info='+ JSON.stringify(this.bankInfo) + '&goods=' + JSON.stringify(this.goodsList) + '&coupon=' + 
								JSON.stringify(this.coupData) + '&price=' + this.originTotal + '&orderId='+ res.data.order_id
							})
						}
					}
					
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
			.text3 {
				margin-left: 20rpx;
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
		justify-content: space-between;
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
