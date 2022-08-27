<!-- 商品详情 -->
<template>
	<view class="goodsDetail">
		<!-- 头部 -->
		<view class="myContainer">
			<view class="uni-margin-wrap">
				<swiper class="swiper image-container" circular :indicator-dots="indicatorDots" :interval="interval" :duration="duration">
					<swiper-item v-for="(item, index) in imgList" :key="index">
						<view class="item" :class="currentIndex == index ? 'item-img' : 'item-img-side'">
							<image :src="item" mode=""></image>
						</view>
					</swiper-item>
				</swiper>
			</view>	
		</view>
		<view class="goodsInfo">
			<view class="money">
				<text>￥{{price}}</text>
			</view>
			<view class="title">
				<text>{{title}}</text>
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
						<image src="https://carshop.duoka361.cn/images/static/image/mall/jt.png" mode=""></image>
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
						<image src="https://carshop.duoka361.cn/images/static/image/mall/jt.png" mode=""></image>
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
				<view class="goodsList">
					<view class="uni-flex uni-column goodsItem" @click="totjDetail(item)" v-for="(item,index) in goodsList"
						:key='index'>
						<view class="text">
							<image :src="item.image"></image>
						</view>
						<view class="text fontText" style="-webkit-flex: 1;flex: 1;">{{item.title}}</view>
						<view class="text money" style="-webkit-flex: 1;flex: 1;">￥{{item.price}}</view>
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
			<view class="icon" @click="goShop">
				<image src="https://carshop.duoka361.cn/images/static/image/mall/shopCar.png"></image>
				<view class="text">
					购物车
				</view>
			</view>
			<view class="btn">
				<button  class="btn1" @click="addCart('购物车')">加入购物车</button>
				<button v-if="user.level_id == 1" class="btn2" @click="addCart('购物车')">立即购买</button>
				<button v-else class="btn2" @click="buyGroup">拼团</button>
			</view>
		</view>
		<!-- 规格 -->
			<uni-popup ref="popup" type="bottom">
				<view class="pops" :style="{bottom: -bottomHight+'rpx',}">
					<view class="buyMsg">
						<image class="buyMsgLft" :src="shopDetail.productMainImg" mode=""></image>
						<view class="buyMsgRgt">
							<view class="buyMsgRgtTop">￥<text class="prcMid">{{ shopDetail.productPrice }}</text></view>
							<view class="buyMsgRgtBtm">{{ shopDetail.productName }}</view>
						</view>
					</view>
					<scroll-view scroll-y="true" >
						<view class="" v-for="(item,index) in skuList" :key='index' >
							<view class="bugSpec">
								<view class="buyTitle">
									<text>{{item.name}}</text>
								</view>
								<view class="specList" v-for="(e,i) in item.child" :key='i'  @click="changecTab(index,i)">
									<view :class="[getItem(e,index)]" class="gdS">
										<view>{{ e.name }}</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
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
				<view v-if="couList.length == 0" class="empty">
					暂无优惠券
				</view>
				<view class="couponsImage" v-for="(item,index) in couList" :key='index' @click="changeRadio(item,index)">
					<image src="https://carshop.duoka361.cn/images/static/image/mall/detailC.png" mode=""></image>
					<view class="couponsInfo">
						<view class="copMoney">
							<view class="money"> <text style="font-size: 28rpx;">￥</text> {{item.reduce_price}}</view>
							<view class="useCop">{{item.coupon_type_name}}</view>
						</view>
						<view class="coupDate">
							<view>全场满{{item.full_price}}减{{item.reduce_price}}</view>
							<view>{{item.endtime_text}}</view>
						</view>
						<view class="couChoose">
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
	import { goodsDetail, addShopCart, myCoupon} from '@/api/store.js'
	import {uniPopup,uniNumberBox,uniPopupMessage} from '@dcloudio/uni-ui'
	export default {
		components: {
			uniPopup,
			uniNumberBox,
			uniPopupMessage
		},
		data() {
			return {
				goodsId: '',
				chooseR: 0,
				price:'',
				title: '',
				coupTitle: '请选择优惠券',
				chooseStyle: '选择',
				couList: [],
				numberValue: 1,
				skuList: [],
				process_attribute: [],
				selectSku: '',
				currentIndex: 0,
				imgList: [],
				indicatorDots: true,
				autoplay: false,
				interval: 2000,
				duration: 500,
				tabbarHeights: '100',
				money: '368.00',
				type: '',
				goodsList: [],
				content: '',
				isShow: true,
				shopDetail: {},
				bottomHight: 0,
				//商品类型
				goodsType: 1,
				sku_price_id: '',
				user: '',
				number: 1,
				couponData: null,
				ptgoods: [],
				queryData: null,
				conf: null,
				chooseData: []
			}
		},
		onLoad(option) {
			this.goodsId = option.id
			this.initgoods(this.goodsId)
			this.user = uni.getStorageSync('userInfo')
			console.log(this.user)
		},
		methods: {
			async initgoods(e) {
				let that = this
				let data = await goodsDetail({goods_id: e})
				that.imgList = data.data.images
				that.price = data.data.price
				that.title = data.data.title
				that.content = data.data.content
				that.shopDetail.productMainImg = data.data.image
				that.shopDetail.productPrice = data.data.price
				that.skuList = data.data.sku
				data.data.sku_price.forEach(item=>{
					that.sku_price_id = item.id
				})
				let skuText
				if(data.data.goods_sku_text) {
					skuText = data.data.goods_sku_text
				}else {
					skuText = ''
				}
				// 商品  确认订单传的数据
				that.ptgoods.push({
					image: data.data.image,
					title: data.data.title,
					goods_sku_text: skuText,
					price: data.data.price,
					goods_num: that.number,
					goods_id: data.data.id,
					goods_sku_price_id: that.sku_price_id
				})
				if(that.skuList.length == 0) {
					that.chooseStyle = '暂无规格'
				}else {
					that.chooseStyle = '规格'
				}
				that.goodsList = data.data.relevant_recommend_goods
				that.skuList.forEach(attr=>{
					let temp = {
							name: attr.name
						}
					temp.child = attr.child.map(item => {
						return {
							name: item.name,
							actived: false,
							disabled: false,
							id: item.id
						}
					})
					that.process_attribute.push(temp)
				})
				that.goodsType = data.data.type
				that.sku_price = data.data.sku_price
			},
			getItem(item,index) {
				var c;
				let selectArr = this.selectSku.split(',');
				if(selectArr.length - 1 >= index){
					if(Number(selectArr[index]) === item.id){
						c = 'choosebtna'
					}else{
						c = ''
					}
				}
				return c
			},
			//选择规格
			changecTab(key,key2) {
				let that = this;
				that.selectSku = ''
				if (!that.process_attribute[key].child[key2].disabled) {
					that.process_attribute[key].child.forEach((item, index) => {
						item.actived = index == key2 ? !item.actived : false
					})
				}
				this.chooseData = []
				that.process_attribute.forEach((item,index)=>{
					item.child.forEach(item=>{
						if(item.actived == true) {
							this.chooseData.push(item)
						}
					})
					let selectData = item.child.filter(e=>{
						return e.actived == true
					})
					if(selectData.length > 0) {
						if(that.process_attribute.length - 1 === index) {
							that.selectSku += selectData[0].id
						}else {
							that.selectSku += selectData[0].id + ','
						}
					}
				})
				that.getPrice()
			},
			getPrice() {
				let that = this;
				let data = that.sku_price.filter(res=>{
					console.log(res,'res')
					return res.goods_sku_ids === that.selectSku
				})
				if(data.length > 0) {
					that.shopDetail.productPrice = data[0].price
					that.chooseStyle = data[0].goods_sku_text
					that.sku_price_id = data[0].id
				}
			},
			//规格确定
			buyCart() {
				this.$refs.popup.close();
			},
			toChoose() {
				this.$refs.popup.open();
			},
			toCoup() {
				let query;
				if(this.goodsType === 1) {
					query = {
						member_id: uni.getStorageSync('member_id'),
						page: 1,
						status: 1,
						coupon_type: 2,
						price: this.shopDetail.productPrice
					}
				}else if(this.goodsType === 2){
					query = {
						member_id: uni.getStorageSync('member_id'),
						page: 1,
						status: 1,
						coupon_type: 1,
						price: this.shopDetail.productPrice
					}
				}else {
					query = {
						member_id: uni.getStorageSync('member_id'),
						page: 1,
						status: 1,
						coupon_type: '',
						price: this.shopDetail.productPrice
					}
				}
				myCoupon(query).then(res=>{
					res.data.rows.forEach((item,index)=>{
						item.checked = false
					})
					this.couList = res.data.rows
					console.log(this.couList)
				})
				this.$refs.coup.open();
			},
			
			//推荐详情
			totjDetail(item) {
				console.log(item)
				this.initgoods(item.id)
			},
			//购物车
			goShop() {
				if(this.couponData === null) {
					uni.navigateTo({
						url: '/pages/store/shoppingCart/shoppingCart'
					})
				}else if(this.couponData.id !== undefined) {
					uni.navigateTo({
						url: '/pages/store/shoppingCart/shoppingCart'
					})
				}
			},
			change(e) {
				console.log(e)
				this.number = e
				this.ptgoods[0].goods_num = e
			},
			changeRadio(e,i) {
				this.couponData = e
				this.chooseR = i
				this.coupTitle = '全场满'+ e.full_price + '减' + e.reduce_price
			},
			//优惠券确定按钮
			chooseCoup() {
				this.$refs.coup.close()
			},
			//加入购物车
			addCart(e){
				if(this.chooseData.length !== this.skuList.length) {
					uni.showToast({
					    title: '请选择规格',
					    icon: 'none',
					    duration: 2000
					});
				}else {
					this.queryData = {
						member_id: uni.getStorageSync('member_id'),
						goods_id: this.goodsId,
						sku_price_id: this.sku_price_id,
						goods_num: this.number
					}
					addShopCart(this.queryData).then(res=>{
						if(res.code === 0) {
							uni.showToast({
							    title: res.msg,
							    icon: 'none',
							    duration: 2000
							});
						}else {
							uni.showToast({
							    title: res.msg,
							    icon: 'none',
							    duration: 2000
							});
						}
					})
				}
			},
			//拼团
			buyGroup() {
				console.log('hgkjh')
				this.ptgoods[0].price = this.shopDetail.productPrice
				this.ptgoods[0].goods_sku_price_id = this.sku_price_id
				this.ptgoods[0].goods_sku_text = this.chooseStyle
				this.ptgoods[0].goods_num = this.number
				if(this.chooseData.length !== this.skuList.length) {
					uni.showToast({
					    title: '请选择规格',
					});
				}else{
					//签约后商品详情跳到拼团页
					if(this.user.is_signing == '2') {
						uni.navigateTo({
							url: '/pages/home/groupBooking/groupBooking?data=' 
							+ JSON.stringify(this.ptgoods) + '&allNum=' 
							+ this.ptgoods[0].goods_num + '&type=1' + '&cart=1'
						})
					}else {
						//认证后
						uni.navigateTo({
							url: '/pages/store/groupActivity/groupActivity?data='
							 + JSON.stringify(this.ptgoods) + '&allNum='
							  + this.ptgoods[0].goods_num + '&type=1'+ '&cart=1'
						})
					}
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.goodsDetail {
	margin-bottom: 150rpx;
	background-color: #f8f8f8;
	.myContainer {
		width: 750rpx;
		display: flex;
		justify-content: center;
		border-radius:7rpx;
		position: relative;
		overflow: hidden;
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
		padding-bottom: 20rpx;
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
		padding: 30rpx 0rpx 20rpx;
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
		margin-bottom: 140rpx;
		.title {
			font-family: PingFangSC-Regular;
			font-weight: 400;
			font-size: 22rpx;
			color: #9E9E9E;
			margin-bottom: 15rpx;
		}
		.box {
			margin-bottom: 120rpx;
			padding: 0 30rpx;
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
		justify-content: space-between;
		.icon {
			display: flex;
			flex-direction: column;
			width: 30%;
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
			// height: 912rpx;
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
				.item {
				        height: 30upx;
				        padding: 20upx;
				        border-style: solid;
				        border-width: 1upx;
				        border-color: #EEEEEE;
				        color: #333333;
				        font-size: 28upx;
				        text-align: center;
				        margin-left: 40upx;
				        box-sizing: content-box;
				    }
				    .item_select {
				        height: 30upx;
				        padding: 20upx;
				        border-style: solid;
				        border-width: 1upx;
				        border-color: red;
				        color: red;
				        font-size: 28upx;
				        text-align: center;
				        margin-left: 40upx;
				        box-sizing: content-box;
				    }
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
					background: #F3F3F3;
					// padding: 10rpx 21rpx;
					border-radius: 4rpx;
					// font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: 26rpx;
					// line-height: 57rpx;
					text-align: center;
				}
				.gdS {
					display: inline-block;
					// margin-right: 20rpx;
					// padding: 10rpx 21rpx;
					border-radius: 4rpx;
					// font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: 26rpx;
					padding: 20rpx 30rpx;
					// line-height: 57rpx;
					text-align: center;
				}
				.choosebtna {
					background: #003488;
					color: #FFFFFF;
				}
				.nochoosebtna {
					background: #F3F3F3;
					color: #333;
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
		height: 912rpx;
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
		.empty {
			text-align: center;
			margin-top: 30rpx;
		}
		.couponsImage {
			width: 690rpx;
			height: 190rpx;
			background: #FFFFFF;
			margin: 20rpx auto;
			image {
				width: 100%;
				height: 100%;
			}	
			.couponsInfo {
				text-align: center;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				// align-items: center;
				transform: translate(0px, -80px);
				.copMoney {
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
					// margin: 20rpx 20rpx;
					margin-left: 22rpx;
				}
				.coupzkDate {
					display: inline-block;
					width: 450rpx;
					height: 190rpx;
					text-align: left;
					margin-left: 22rpx;
				}
				.couChoose {
					display: inline-block;
					width: 50rpx;
					height: 190rpx;
					text-align: left;
					// margin-left: 260rpx;
					// margin-top: 30rpx;
					.radio {
						width: 32rpx;
						height: 32rpx;
						background: #FFFFFF;
						border: 1rpx solid #969696;
						border-radius: 18rpx;
						margin-top: 30rpx;
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
				position: fixed;
				bottom: 30rpx;
			}
			
		}
	}
</style>
