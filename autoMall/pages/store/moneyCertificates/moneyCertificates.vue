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
				<text class="couLft">{{couponInfo}}</text>
				<text class="couRig">-￥{{couponMoney}}</text>
			</view>
			<view class="payMoney">
				<text class="text">需支付：¥<text class="money">{{money}}</text></text>
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
						<image class="del" @click="del(index)" src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mall/close.png" mode=""></image>
						<image class="Img3" :src="item" mode=""></image>
					</view>
					<view class="sc2" v-if="imgList.length < 3" @click="upload"><image class="sc3" src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mall/upload.png" mode=""></image></view>
				</view>
			</view>

		</view>
		<!-- 按钮 -->
		<button class="bottomBtn" type="default" @click="payment('/pages/store/completePay/completePay')">我已打款</button>
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
					imgSrc: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/banner1.png',
					title: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',
					type: '太空灰;256GB',
					money: '￥368.00',
					count: '1',
				}],
				couponInfo: '满100减10元优惠券',
				couponMoney: '10',
				money: '159.00',
				imgList:[],
				info: null
			}
		},
		onLoad(e) {
			this.info = JSON.parse(e.info)
		},
		methods: {
			//我已打款
			payment(url) {
				//完成支付
				uni.navigateTo({
					url: url
				})
			},
			// 点击上传图片
			upload() {
				uni.chooseImage({
					count: 3, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					loop: true,
					success: res => {
						console.log(res);
						if (res.tempFilePaths.length != 0) {
							this.imgList.push(res.tempFilePaths[0]);
						}
					console.log(JSON.stringify(res.tempFilePaths));
						var tempFilePaths = res.tempFilePaths;
	 
						console.log(tempFilePaths);
						console.log(tempFilePaths[0]);
						uni.uploadFile({
							url: 'http://douzhuoqianshouba.xieenguoji.com/api/ajax/upload',
							filePath: tempFilePaths[0],
							name: 'file',
							success: uploadFileRes => {
								console.log('上传图片', JSON.parse(uploadFileRes.data));
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
