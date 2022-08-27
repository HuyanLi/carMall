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
					<text class="info">{{info.pay_bank_code}}</text>
				</view>
				<view class="payAcount">
					<text class="infoTitle">开户行</text>
					<text class="info">{{info.pay_bank_name}}</text>
				</view>
				<view class="payAcount">
					<text class="infoTitle">名称</text>
					<text class="info">{{info.company_name}}</text>
				</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="chooseGoods">
			<view class="chooseT">
				<text>订单信息</text>
			</view>
			<view class="chooseItem" v-if="goodsData === null">
				未找到该订单
			</view>
			<view class="chooseItem" v-else v-for="(item,index) in goodsData.order_item" :key='index'>
				<image class="goodsImage" :src="item.goods_image"></image>
				<view class="goodsInfo">
					<text class="shopTitle">{{item.goods_title}}</text>
					<view class="shopTag">
						<uni-tag class="tag" :text="item.goods_sku_text" />
					</view>
					<view class="moneyInfo">
						<view class="">
							<text class="shopMoney">{{item.goods_price}}</text>
						</view>
						<view class="number-box">
							<text>X {{item.goods_num}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="godsCoup" v-if="goodsData.coupon_name === ''">
				<text class="couLft">暂无优惠券</text>
			</view>
			<view class="godsCoup" v-else>
				<text class="couLft">{{goodsData.total_amount}}</text>
				<text class="couRig" v-if="goodsData !== null">-￥{{goodsData.coupon_fee}}</text>
			</view>
			<view class="payMoney" v-if="goodsData !== null">
				<text class="text">需支付：¥<text class="money">{{goodsData.pay_fee}}</text></text>
			</view>
		</view>
		<!-- 打款凭证 -->
		<view class="moneyProf">
			<view class="chooseT">
				<text class="imText">*</text>
				<text>订单信息</text>
			</view>
			<view class="uPImg">
				<!-- 上传图片 -->
				<view class="shangchuan">
					<view class="sc2" v-for="(item, index) in imgList" :key="index">
						<image class="del" @click="del(index)" src="https://carshop.duoka361.cn/images/static/image/mall/close.png" mode=""></image>
						<image class="Img3" :src="item" mode=""></image>
					</view>
					<view class="sc2" v-if="imgList.length < 3" @click="upload"><image class="sc3" src="https://carshop.duoka361.cn/images/static/image/mall/upload.png" mode=""></image></view>
				</view>
			</view>

		</view>
		<!-- 按钮 -->
		<button class="bottomBtn" type="default" @click="payment('/pages/store/completePay/completePay')">我已打款</button>
	</view>
</template>

<script>
	import { commitPay, getBankInfo } from '@/api/store.js'
	import { getOrderInfo } from '@/api/mine.js'
	export default {
		data() {
			return {
				payForType: '线下支付',
				account: '',
				bank:'',
				company:'',
				goodsList: [],
				couponInfo: '',
				couponMoney: '',
				money: '',
				imgList:[],
				info: null,
				orderId: '',
				goodsData: null
			}
		},
		onLoad(e) {
			console.log(e)
			this.orderId = e.orderId
			this.orderDetail()
			this.initBank()
		},
		methods: {
			//回显
			orderDetail() {
				let query = {
					order_id: this.orderId
				}
				getOrderInfo(query).then(res=>{
					console.log(res.data)
					if(res.code === 1) {
						this.goodsData = res.data
					}
				})
			},
			//付款账户
			initBank() {
				getBankInfo().then(res=>{
					this.info = res.data
				})
			},
			//我已打款
			payment(url) {
				if(this.goodsData === null) {
					uni.showToast({
						duration: 2000,
						title: '未找到该订单'
					})
					return
				}else {
					if(this.imgList.length === 0) {
						uni.showToast({
							title:'请上传凭证',
						})
					}else {
						let query = {
							member_id: uni.getStorageSync('member_id'),
							order_id: this.orderId,
							pay_voucher_images: this.imgList
						}
						commitPay(query).then(res=>{
							uni.showToast({
								title: res.msg,
							})
							//完成支付
							uni.navigateTo({
								url: url+'?price=' + this.goodsData.pay_fee
							})
						})
					}
				}
			},
			// 点击上传图片
			upload() {
				uni.chooseImage({
					count: 3, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					loop: true,
					success: res => {
						if (res.tempFilePaths.length != 0) {
							res.tempFilePaths.forEach(item=>{
								this.imgList.push(item)
							})
						}
						var tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: 'https://carshop.duoka361.cn/index.php/api/common/upload',
							filePath: tempFilePaths[0],
							name: 'file',
							success: uploadFileRes => {
								console.log('上传图片', JSON.parse(uploadFileRes.data));
								let data = JSON.parse(uploadFileRes.data)
								if(data.code === "1") {
									this.imgList.push(data.data.fullurl)
								}
							},
							fail(err) {
								console.log(err);
							}
						});
					}
				});
			},
	 
		  // 删除图片
			del(index) {
				this.imgList.splice(index, 1);
				console.log(this.imgList);
			},
		}
	}
</script>

<style lang="scss" scoped>
.moneyC {
	width: 750rpx;
	margin: 0 auto 150rpx;
	.payFor {
		width: 690rpx;
		// height: 328rpx;
		background: #FFFFFF;
		border-radius: 16rpx 16rpx 0 0;
		margin: 30rpx auto 20rpx;
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
		overflow: hidden;
		.chooseT {
			font-weight: 600;
			font-size: 30rpx;
			margin-bottom: 30rpx;
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
					margin: 10rpx 0;
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
		.godsCoup{
			margin: 35rpx auto;
			.couLft {
				font-size: 26rpx;
				color: #333333;
			}
			.couRig {
				font-size: 26rpx;
				color: #FF0000;
				float: right;
			}
		}
		.payMoney {
			float: right;
			.text {
				font-size: 26rpx;
				color: #333333;
			}
			.money {
				font-size: 36rpx;
				color: #FF0000;
			}
		}
	}
	.moneyProf {
		margin: 30rpx 30rpx 20rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 35rpx 30rpx;
		overflow: hidden;
		.chooseT {
			font-weight: 600;
			font-size: 30rpx;
			margin-bottom: 30rpx;
			.imText {
				color: #FF6B33;
				font-size: 28rpx;
				margin-right: 10rpx;
			}
		}
		.shangchuan {
			// width: 90%;
			height: 200rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			.sc2 {
				width: 30%;
				height: 90%;
				border-radius: 10rpx;
				background-color: #dadfef;
				text-align: center;
				line-height: 240rpx;
				margin: 0 10rpx;
				position: relative;
				// background-color: #4CD964;
			}
			.Img3 {
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
			}
			.del {
				width: 32rpx;
				height: 32rpx;
				position: absolute;
				z-index: 1000;
				top: 0rpx;
				right: 0;
			}
			.sc3 {
				width: 196rpx;
				height: 196rpx;
				border-radius: 10rpx;
			}
		}
	}
	.bottomBtn {
		width: 690rpx;
		height: 90rpx;
		background: #202425;
		border-radius: 8rpx;
		position: fixed;
		bottom: 30rpx;
		left: 30rpx;
		color: #fff;
	}
}
</style>
