<!-- 商品详情 -->
<template>
	<view class="goodsDetail">
		<!-- 头部 -->
		<view class="myContainer">
			<view class="uni-margin-wrap">
				<swiper class="swiper image-container" circular :indicator-dots="indicatorDots" :interval="interval" :duration="duration">
					<swiper-item v-for="(item, index) in imgList" :key="index">
						<view class="item" :class="currentIndex == index ? 'item-img' : 'item-img-side'">
							<image :src="item.bannerUrl" mode=""></image>
						</view>
					</swiper-item>
				</swiper>
			</view>	
		</view>
		<view class="goodsInfo">
			<view class="money">
				<text>￥368.00</text>
			</view>
			<view class="title">
				<text>MICHELIN轮胎 性能三合一 都市畅行更放心</text>
			</view>
		</view>
		<!-- 规格 -->
		<view class="specification">
			<view class="uni-row spec">
				<view class="text title" style="text-align: left;">
					规格
				</view>
				<view class="" @click="toChoose">
					<view class="text content1" >
						<image src="../../../static/image/mall/jt.png" mode=""></image>
					</view>
					<view class="text content">
						{{chooseStyle}}
					</view>
				</view>
			</view>
			<view class="uni-row spec">
				<view class="text title" style="text-align: left;">
					优惠券
				</view>
				<view class="" @click="toCoup">
					<view class="text content1" >
						<image src="../../../static/image/mall/jt.png" mode=""></image>
					</view>
					<view class="text content">
						{{coupTitle}}
					</view>
				</view>
			</view>
		</view>
		<!-- 相关推荐 -->
		<view class="tuijian">
			<view class="title">
				<text>相关推荐</text>
			</view>
			<view class="goodsTJ">
				<view class="goodsList" @click="totjDetail()">
					<view class="uni-flex uni-column goodsItem" v-for="(item,index) in goodsList"
						:key='index'>
						<view class="text">
							<image :src="item.imgSrc"></image>
						</view>
						<view class="text fontText" style="-webkit-flex: 1;flex: 1;">{{item.text}}</view>
						<view class="text money" style="-webkit-flex: 1;flex: 1;">￥{{item.money}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="goodInfo">
			<view class="title">
				<text>商品详情</text>
			</view>
			<view class="box">
				<rich-text :nodes="content"></rich-text>
			</view>
		</view>
		<!-- 购物车 -->
		<view class="shoppCar">
			<view class="icon" @click="addCart('收藏')">
				<template v-if="isShow">
					<view>
						<image src="../../../static/image/mall/already.png"></image>
					</view>
				</template>
				<template v-else>
					<view>
						<image src="../../../static/image/mall/collect.png"></image>
					</view>
				</template>
				<view class="text">
					收藏
				</view>
			</view>
			<view class="icon" @click="goShop">
				<image src="../../../static/image/mall/shopCar.png"></image>
				<view class="text">
					购物车
				</view>
			</view>
			<view class="btn">
				<button class="btn1" @click="addCart('购物车')">加入购物车</button>
				<button class="btn2" @click="buyGroup">拼团</button>
			</view>
		</view>
		<!-- 规格 -->
			<uni-popup ref="popup" type="bottom">
				<view class="pops" :style="{bottom: -bottomHight+'rpx',}">
					<view class="buyMsg">
						<image class="buyMsgLft" :src="shopDetail.productMainImg" mode=""></image>
						<view class="buyMsgRgt">
							<view class="buyMsgRgtTop">￥<text class="prcMid">{{ shopDetail.productPrice?shopDetail.productPrice.toString().split('.')[0]:'0' }}</text>.{{ shopDetail.productPrice&&shopDetail.productPrice.toString().split('.')[1]?shopDetail.productPrice.toString().split('.')[1]:'00' }}</view>
							<view class="buyMsgRgtBtm">{{ shopDetail.productName }}</view>
						</view>
					</view>
					<view class="bugSpec">
						<view class="buyTitle">
							<text>款式</text>
						</view>
						<view class="specList" v-for="(e,i) in styleList" :key='i' :class="{btna:choosecTab == i}" @click="changecTab(e,i)">
							<span type="default" >{{e.year}}</span>
						</view>
					</view>
					<view class="bugSpec">
						<view class="buyTitle">
							<text>颜色</text>
						</view>
						<view class="specList" v-for="(e,i) in colorList" :key='i' :class="{btna:chooseTab == i}" @click="changeTab(e,i)">
							<span type="default" >{{e.year}}</span>
						</view>
					</view>
					<view class="buyNum">
						<view class="numTit">数量</view>
						<view class="numBtn">
							<uni-number-box class="item" :value="numberValue" @change="change" />
						</view>
					</view>
					<view class="buyBtn" @click="buyCart">确定</view>
				</view>
			</uni-popup>
		<!-- 优惠券 -->
		<uni-popup ref='coup' type="bottom">
			<view class="couppops" :style="{bottom: -bottomHight+'rpx',}">
				<view class="title">
					<text>选择优惠券</text>
				</view>
				<view class="couponsImage" v-for="(item,index) in couList" :key='index'>
					<image src="../../../static/image/mall/detailC.png" mode=""></image>
					<view class="couponsInfo">
						<view class="copMoney" v-if="item.money">
							<view class="money"> <text style="font-size: 28rpx;">￥</text> {{item.money}}</view>
							<view class="useCop">{{item.info}}</view>
						</view>
						<view class="copZKMoney" v-if="item.zhe">
							<view class="zhekou">{{item.zhe}}折</view>
						</view>
						<view class="coupDate" v-if="item.money">
							<view>{{item.info}}</view>
							<view>{{item.date}}</view>
						</view>
						<view class="coupzkDate" v-if="item.zhe">
							<view>{{item.info}}</view>
							<view>{{item.date}}</view>
						</view>
						<view class="couChoose" @click="changeRadio(item,index)">
							<view class="radio" :class="{chooseRadio:chooseR == index}"></view>
						</view>
					</view>
				</view>
				<view class="coupBtn">
					<button type="default" @click="chooseCoup">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {uniPopup,uniNumberBox,uniPopupMessage} from '@dcloudio/uni-ui'
	export default {
		components: {
			uniPopup,
			uniNumberBox,
			uniPopupMessage
		},
		data() {
			return {
				msgType: 'success',
				messageText: '加入购物车成功',
				chooseR: 0,
				style: '',
				color: '',
				coupTitle: '暂无优惠券',
				chooseStyle: '选择',
				chooseTab: 0,
				choosecTab: 0,
				radio1: 0,
				couList: [{
					money: 5,
					info: '全场满50减5',
					date: '2022-03-01 至2022-03-31',
				},{
					zhe: '8',
					info: '全场8折',
					date: '2022-03-01 至2022-03-31',
				},{
					money: 5,
					info: '全场满50减5',
					date: '2022-03-01 至2022-03-31',
				},{
					money: 5,
					info: '全场满50减5',
					date: '2022-03-01 至2022-03-31',
				}],
				sex: [],
				nvueWidth: '670',
				numberValue: 0,
				styleList: [{
					year: '2019',
				},{
					year: '2020',
				},{
					year: '2021',
				},{
					year: '2022',
				}],
				colorList: [{
					year: '太空银',
				},{
					year: '深邃黑',
				},{
					year: '深空灰',
				}],
				currentIndex: 0,
				imgList: [{
					bannerUrl: require('../../../static/image/home/banner1.png')
				},
				{
					bannerUrl: require('../../../static/image/home/banner1.png')
				},
				{
					bannerUrl: require('../../../static/image/home/banner1.png')
				},
				{
					bannerUrl: require('../../../static/image/home/banner1.png')
				}
				],
				indicatorDots: true,
				autoplay: false,
				interval: 2000,
				duration: 500,
				tabbarHeights: '100',
				money: '368.00',
				type: 'MICHELIN轮胎 性能三合一 都市畅行更放心',
				goodsList: [{
					imgSrc: '../../../static/image/home/banner1.png',
					text: '米家行车记录仪 GPS卫星全球定位 高清画面驱蚊器翁王企鹅驱蚊器王企鹅热污染',
					money: '2538.00'
				}, {
					imgSrc: '../../../static/image/home/banner1.png',
					text: '米家行车记录仪 GPS卫星全球定位 高清画面',
					money: '2538.00'
				}, {
					imgSrc: '../../../static/image/home/banner1.png',
					text: '米家行车记录仪 GPS卫星全球定位 高清画面地方',
					money: '111.00'
				}, {
					imgSrc: '../../../static/image/home/banner1.png',
					text: '米家行车记录仪 GPS卫星全球定位 高清画面让人',
					money: '222.00'
				}, {
					imgSrc: '../../../static/image/home/banner1.png',
					text: '米家行车记录仪 GPS卫星全球定位 高清画面驱蚊器',
					money: '33.00'
				},{
					imgSrc: '../../../static/image/home/banner1.png',
					text: '米家行车记录仪 GPS卫星全球定位 高清画面驱蚊器',
					money: '33.00'
				}],
				content: '',
				isShow: true,
				shopDetail: {
					productMainImg: require('../../../static/image/home/banner1.png'),
					productName: '选择药品规格',
					productPrice: '368'
				},
				bottomHight: 0
			}
		},
		onLoad() {
			this.money = '368.00'
			this.type = 'MICHELIN轮胎 性能三合一 都市畅行更放心'
			var data = '<p><img src="https://public.haotiku.com/haotiku/videos/20220216/1644974733576.png" alt="" width="571" height="337" /></p><p>应用内集成的第三方SDK以及插件：<br />1.cn.jpush.android: 用来给用户推送应用内资讯信息以及消息通知。<br />2.com.alipay：用于app内会员支付信息费<br />3.com.umeng.commonsdk：用于微信 qq等第三方登录授权以及分享。<br />4.com.amap.api：高德地图用于发布职位定位，已经用户入职导航。</p>';
			data = data.replace(/\<img/g, "<img style='width: 100%;'")
			this.content = data;
		},
		methods: {
			toChoose() {
				this.$refs.popup.open();
			},
			toCoup() {
				this.$refs.coup.open();
			},
			changeTab(e,i) {
				this.chooseTab = i
				this.style = e.year
			},
			changecTab(e,i) {
				this.choosecTab = i
				this.color = e.year
			},
			//推荐详情
			totjDetail() {
				uni.navigateTo({
					url: ''
				})
			},
			//购物车
			goShop() {
				uni.navigateTo({
					url: '/pages/store/shoppingCart/shoppingCart'
				})
			},
			change(e) {
				console.log(e)
			},
			buyCart() {
				this.$refs.popup.close();
				this.chooseStyle = '已选:' + this.style + '/'+ this.color
			},
			buyTrue() {
				
			},
			changeRadio(e,i) {
				console.log(e,i)
				this.chooseR = i
				this.coupTitle = e.info
			},
			//优惠券确定按钮
			chooseCoup() {
				this.$refs.coup.close()
			},
			//加入购物车
			addCart(e){
				if (e === '收藏') {
					console.log(this.isShow)
					if(this.isShow == true) {
						uni.showToast({
						    title: '收藏成功',
						    icon: 'none',
						    duration: 2000
						});
						this.isShow = !this.isShow
					}else if(this.isShow == false){
						console.log(this.isShow)
						uni.showToast({
						    title: '取消收藏',
						    icon: 'none',
						    duration: 2000
						});
						this.isShow = !this.isShow
					}
					// this.isShow = !this.isShow
					// this.messageText = `收藏成功`
				}else {
					uni.showToast({
					    title: '加入购物车成功',
					    icon: 'none',
					    duration: 2000
					});
					// this.messageText = `加入购物车成功`
					// this.$refs.message.open()
					
				}
			},
			//拼团
			buyGroup() {
				uni.navigateTo({
					url: '/pages/store/groupActivity/groupActivity'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.goodsDetail {
	.myContainer {
		width: 750rpx;
		display: flex;
		justify-content: center;
		border-radius:7rpx;
		position: relative;
		overflow: hidden;
		// margin-top: 16rpx;
		// 轮播图
		.image-container {
			width: 750rpx;
			height: 747rpx;
			.item {
				position: relative;
				overflow: hidden;
				image{
					display: block;
					width: 100%;
					height: 100%;
				}
			}
			.item-img {
				width: 100%;
				height: 100%;
				margin: 0 auto;
			}
			.swiper-item {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.item-img-side {
				width: 100%;
				height: 100%;
				// animation: to-mini .2s;
				margin: 15rpx auto;
			}
		}
		
	}
	.goodsInfo {
		width: 690rpx;
		height: 149rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		margin: 20rpx auto;
		// padding: 20rpx;
		.money {
			font-family: PingFangSC-Regular;
			font-weight: 400;
			font-size: 30rpx;
			color: #ED1C24;
			text-align: justify;
			padding: 20rpx;
		}
		.title {
			font-family: PingFangSC-Regular;
			font-weight: 400;
			font-size: 30rpx;
			color: #333333;
			line-height: 36rpx;
			padding: 0 20rpx;
		}
	}
	.specification {
		width: 690rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		margin: 20rpx auto;
		padding: 40rpx 0rpx 20rpx;
		.spec {
			height: 60rpx;
			line-height: 60rpx;
			padding: 0 20rpx;
			margin-bottom: 20rpx;
			.title {
				font-family: PingFangSC-Semibold;
				font-weight: 600;
				font-size: 28rpx;
				color: #424242;
				display: inline-block;
				float: left;
			}
			.content {
				font-family: PingFangSC-Regular;
				font-weight: 400;
				font-size: 24rpx;
				color: #333333;
				display: inline-block;
				float: right;
				// margin: 20rpx auto;
				// image {
				// 	width: 40rpx;
				// 	height: 40rpx;
				// 	margin-top: 10rpx;
				// }
			}
			.content1 {
				display: inline-block;
				float: right;
				image {
					width: 40rpx;
					height: 40rpx;
					margin-top: 10rpx;
				}
			}
		}
	}
	.tuijian {
		width: 690rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		margin: 0rpx auto 30rpx;
		.title {
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			font-size: 28rpx;
			color: #424242;
			padding: 40rpx 0 15rpx 20rpx;
		}
		.goodsTJ {
			display: flex;
			flex-direction:column;
			flex-wrap: wrap;
			justify-content:space-around;
			.goodsList {
				border-radius: 16rpx;
				margin: -10rpx 20rpx 20rpx;
				.goodsItem {
					width: 30%;
					margin: 10rpx 20rpx 10rpx 0;
					float: left;
					image {
						width: 185rpx;
						height: 185rpx;
						margin: 20rpx 20rpx 18rpx;
					}
					.fontText {
						font-family: PingFangSC-Regular;
						font-weight: 400;
						font-size: 24rpx;
						color: #231F20;
						line-height: 36rpx;
						margin: 0 0 10rpx 20rpx;
						//文本超出部分以...形式展示
						text-overflow: -o-ellipsis-lastline;
						//整体超出部分隐藏
						overflow: hidden;
						//文本超出部分以...形式展示，同第一行样式代码
						text-overflow: ellipsis;
						//display 块级元素展示
						display: -webkit-box;
						//设置文本行数为2行
						-webkit-line-clamp: 2;
						//设置文本行数为2行
						line-clamp: 2;
						//从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
						-webkit-box-orient: vertical;
					}
					.money {
						font-family: PingFangSC-Regular;
						font-weight: 400;
						font-size: 28rpx;
						color: #ED1C24;
						text-align: justify;
						margin-left: 20rpx;
					}
				}
			}
			
		}
	}
	.goodInfo {
		text-align: center;
		.title {
			font-family: PingFangSC-Regular;
			font-weight: 400;
			font-size: 22rpx;
			color: #9E9E9E;
			margin-bottom: 15rpx;
		}
		.box {
			margin-bottom: 120rpx;
		}
	}
	.shoppCar {
		position: fixed;
		width: 750rpx;
		height: 98rpx;
		background: #FFFFFF;
		bottom: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		.icon {
			display: flex;
			flex-direction: column;
			width: 15%;
			text-align: center;
			image {
				width: 42rpx;
				height: 42rpx;
				margin: 0 auto;
			}
		}
		.btn {
			width: 70%;
			display: flex;
			flex-direction: row;
			button {
				width: 214rpx;
				height: 78rpx;
				display: inline-block;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				font-size: 26rpx;
				line-height: 78rpx;
			}
			.btn1 {
				background-color: #EDEDED;
				color: #202425;
			}
			.btn2 {
				background-color: #202425;
				color: #FFFFFF;
			}
		}

	}
	.pops{
			width: 100%;
			height: 912rpx;
			background: white;
			overflow: hidden;
			border-radius: 24rpx 24rpx 0 0;
			position: fixed;
			overflow-y: auto;
			bottom: 0;
			.buyMsg{
				width: 670rpx;
				height: 200rpx;
				padding: 32rpx 0 30rpx 0;
				margin: 0 auto;
				overflow: hidden;
				// border-bottom: 2rpx solid #E6E6E6;
				.buyMsgLft{
					display: block;
					width: 225rpx;
					height: 225rpx;
					border-radius: 5px;
					float: left;
				}
				.buyMsgRgt{
					float: right;
					width: 425rpx;
					color: #333333;
					margin-top: 20%;
					.buyMsgRgtTop{
						width: 100%;
						font-size: 34rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						word-wrap: normal;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						font-size: 38rpx;
						color: #ED1C24;
						margin-bottom: 15rpx;
						// margin-bottom: 45rpx;
					}
					.buyMsgRgtMid{
						width: 100%;
						height: 80rpx;
						line-height: 40rpx;
						font-size: 38rpx;
						color: #ED1C24;
						margin: 5rpx 0 12rpx 0;
						text{
							overflow: hidden;
							display:-webkit-box;         
							-webkit-box-orient:vertical;
							-webkit-line-clamp:2; 
							text-overflow: ellipsis;
						}
					}
					.buyMsgRgtBtm{
						width: 100%;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						font-size: 24rpx;
						color: #757575;
					}
				}
				
			}
			.bugSpec {
				padding: 52rpx 40rpx 0;
				margin: 0 auto;
				.buyTitle {
					font-family: PingFangSC-Semibold;
					font-weight: 600;
					font-size: 26rpx;
					color: #3A3A3A;
					margin-bottom: 30rpx;
					padding: 10rpx 21rpx;
				}
				.specList {
					display: inline-block;
					margin-right: 20rpx;
					padding: 10rpx 21rpx;
					background: #F3F3F3;
					border-radius: 4rpx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: 26rpx;
					color: #565656;
					width: 100rpx;
					height: 57rpx;
					line-height: 57rpx;
					text-align: center;
				}
				.btna {
					background: #003488;
					color: #FFFFFF;
				}
			}
			.buyNum{
				width: 670rpx;
				margin: 50rpx auto 0;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				.numTit{
					font-family: PingFangSC-Semibold;
					font-weight: 600;
					font-size: 26rpx;
					color: #4C4C4C;
					margin: 30rpx 0 28rpx 20rpx;
				}
				.numBtn{
					.item{
						float: right;
					}
				}
			}
			.buyBtn{
				line-height: 98rpx;
				text-align: center;
				margin: 0 auto;
				// margin-top: 60rpx;
				font-size: 34rpx;
				color: #FFFFFF;
				width: 750rpx;
				height: 98rpx;
				background: #202425;
			}
			
		}
	
}
	.couppops {
		border-radius: 30rpx 30rpx 0 0;
		margin: 0 auto;
		width: 100%;
		// height: 912rpx;
		background: white;
		overflow: hidden;
		position: fixed;
		overflow-y: auto;
		bottom: 0;
		.title {
			margin: 50rpx auto;
			background: #FFFFFF;
			text-align: center;
			
		}
		.couponsImage {
			width: 690rpx;
			height: 190rpx;
			background: #FFFFFF;
			margin: 20rpx auto;
			position: relative;
			image {
				width: 100%;
				height: 100%;
			}	
			.couponsInfo {
				position: absolute;
				top: 0;
				left: 0;
				text-align: center;
				.copMoney {
					position: relative;
					top: 30rpx;
					display: inline-block;
					width: 190rpx;
					height: 190rpx;
					// background: #003488;
					text {
						display: inline-block;
					}
					.money {
						font-family: PingFangSC-Regular;
						font-weight: 400;
						font-size: 60rpx;
						color: #FFFFFF;
					}
					.useCop {
						font-family: PingFangSC-Regular;
						font-weight: 400;
						font-size: 24rpx;
						color: #FFFFFF;
					}
				}
				.copZKMoney {
					position: relative;
					top: 50rpx;
					display: inline-block;
					width: 190rpx;
					height: 190rpx;
					// background: #003488;
					text {
						display: inline-block;
					}
					.zhekou {
						font-family: PingFangSC-Regular;
						font-weight: 400;
						font-size: 60rpx;
						color: #FFFFFF;
					}
				}
				.coupDate {
					display: inline-block;
					width: 450rpx;
					height: 190rpx;
					text-align: left;
					position: relative;
					top: 20rpx;
					left: 35rpx;
					// margin: 20rpx 20rpx;
				}
				.coupzkDate {
					display: inline-block;
					width: 450rpx;
					height: 190rpx;
					text-align: left;
					position: relative;
					top: 50rpx;
					left: 35rpx;
				}
				.couChoose {
					display: inline-block;
					width: 50rpx;
					height: 190rpx;
					text-align: left;
					position: absolute;
					top: 70rpx;
					right: -15rpx;
					// margin-left: 260rpx;
					// margin-top: 30rpx;
					.radio {
						width: 32rpx;
						height: 32rpx;
						background: #FFFFFF;
						border: 1rpx solid #969696;
						border-radius: 18rpx;
					}
					.chooseRadio {
						background: #1A2285;
						border: 1rpx solid #969696;
						border-radius: 18rpx;
					}
				}
			}
		}
		.coupBtn {
			button {
				width: 750rpx;
				height: 98rpx;
				background-color: #202425;
				line-height: 98rpx;
				font-weight: 400;
				font-size: 26rpx;
				color: #FFFFFF;
			}
			
		}
	}
</style>
