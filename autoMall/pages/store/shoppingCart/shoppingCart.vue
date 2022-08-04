<!-- 购物车 -->
<template>
	<view class="shoppingCart">
		<view class="shopDelete" @click="deleteShop">
			<text>删除</text>
		</view>
		<view class="shopList">
			<!-- 空购物车 -->
			<view v-if="isEmptyCart" class="bg-color-white border-bottom-left-radius-xl border-bottom-right-radius-xl padding-lg">
				<view class="row-center-center">
					<image class="img-size-xl" src="/static/cart/empty-cart.png" mode="aspectFit"></image>
					<text class="font-size-lg text-color-greyblack">购物车是空的</text>
				</view>
			</view>
			<!-- 非空购物车 -->
			<view v-if="!isEmptyCart" class="shopItem" v-for="(item, index) in goodsList" :key="index">
				<view class="shopcheckbox" @click="chooseShop(item,index)">
					<checkbox class="interestthreecheckbox" :checked="item.checked" />
				</view>
				<image class="shopImage" :src="item.imgSrc" mode=""></image>
				<view class="shopInfo">
					<text class="shopTitle">{{item.title}}</text>
					<view class="shopTag">
						<uni-tag class="tag" :text="tabTitle" />
					</view>
					<view class="moneyInfo">
						<view class="">
							<text class="shopMoney">{{item.money}}</text>
							<text class="shopOriginMoney">{{item.originMoney}}</text>
						</view>
						<!-- <xg-money camel :size="UNI_FONT_SIZE_XL" :money="product.price"></xg-money> -->
						<view class="number-box">
							<uni-number-box :min="1" :value="item.count"  @change="onNumberBoxChange(product, $event)"></uni-number-box>
						</view>
					</view>
				</view>
			</view>
				
		</view>
		<!-- 领券结算 -->
		<view class="shopPay">
			<view class="shopCart">
				<view class="chooseAll" @click="checkedAll">
					<checkbox :checked="allChecked" />
					<text class="font-size-base">全选</text>
				</view>
				<view class="moneyCount">
					<text class="zonghe">合计</text>
					<text class='money'>￥368.00</text>
				</view>
				<view class="btnList">
					<button class="btn btn1" @click="toPay">领券结算</button>
					<button class="btn btn2" @click='toActivity'>拼团</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import{uniNumberBox,uniTag,uniGoodsNav} from '@dcloudio/uni-ui'
	export default {
		components: {
			uniNumberBox,
			uniTag,
			uniGoodsNav
		},
		data() {
			return {
				isEmptyCart: false,
				goodsList: [{
					imgSrc: require('../../../static/image/home/banner1.png'),
					title: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',
					type: '太空灰;256GB',
					money: '￥368.00',
					originMoney: '¥1642',
					count: '1',
					checked: false,
				},{
					imgSrc: require('../../../static/image/home/banner1.png'),
					title: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',
					type: '太空灰;256GB',
					money: '￥368.00',
					originMoney: '¥1642',
					count: '1',
					checked: false,
				},{
					imgSrc: require('../../../static/image/home/banner1.png'),
					title: '冲锋GP7617.3英寸11代i7游戏笔记本电脑256GB',
					type: '太空灰;256GB',
					money: '￥368.00',
					originMoney: '¥1642',
					count: '1',
					checked: false,
				}],
				tabTitle: '太空灰;256GB',
				allChecked: false
			}
		},
		methods: {
			//删除商品
			deleteShop() {
				
			},
			//领券结算
			toPay() {
				uni.navigateTo({
					url: '../confirmOrder/confirmOrder'
				})
			},
			chooseShop(e,i) {
				this.goodsList.forEach((item,index)=>{
					if(index === i) {
						item.checked = false
					}
				})
				this.allChecked = false
			},
			//全选
			checkedAll() {
				console.log(this.allChecked,111)
				if(this.allChecked === true) {
					this.goodsList.forEach((item,index)=>{
						item.checked = true
					})
					this.allChecked = true
				}else {
					this.goodsList.forEach((item,index)=>{
						item.checked = false
					})
					this.allChecked = false
				}
				console.log(this.allChecked,2222)
			},
			//拼团活动
			toActivity() {
				uni.navigateTo({
					url: '../groupActivity/groupActivity'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.shoppingCart {
	width: 750rpx;
	// padding: 0 30rpx;
	.shopDelete {
		height: 90rpx;
		line-height: 90rpx;
		padding: 0 30rpx;
		text-align: right;
		text {
			font-family: PingFangSC-Regular;
			font-weight: 400;
			font-size: 30rpx;
			color: #7D0016;
		}
	}
	.shopList {
		width: 750rpx;
		background: #FFFFFF;
		.shopItem {
			width: 750rpx;
			// height: 230rpx;
			padding: 24rpx 30rpx 15rpx;
			display: flex;
			align-items: center;
			// flex-direction: column;
			// justify-content: center;
			.shopcheckbox {
				
				border: 1rpx solid #A9A9A9;
				border-radius: 16rpx;
				.interestthreecheckbox .wx-checkbox-input {
					border-radius: 50%;
					width: 32rpx;
					height: 32rpx;
				}
				.interestthreecheckbox .wx-checkbox-input.wx-checkbox-input-checked{
				  background: lightblue;
				  border: 1rpx solid lightblue;
				}
				.interestthreecheckbox .wx-checkbox-input.wx-checkbox-input-checked::before{
				  width: 40rpx;/* 选中后对勾大小 */
				  height: 40rpx;/* 选中后对勾大小 */
				  font-size:80rpx; /* 对勾大小30rpx */
				  color:blue; /* 对勾颜色 白色 */
				}

			}
			.shopImage {
				width: 139rpx;
				height: 139rpx;
			}
			
			.shopInfo {
				margin: 25rpx 30rpx 20rpx 20rpx;
				width: 65%;
				.shopTitle {
					width: 367rpx;
					display: inline-block;
				}
				.shopTag {
					width: 210rpx;
					height: 48rpx;
					border-radius: 8rpx;
					margin: 15rpx 0 ;
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
					.shopOriginMoney {
						font-family: PingFangSC-Regular;
						font-weight: 400;
						font-size: 22rpx;
						color: #B1B1B1;
						text-decoration: line-through;
						margin-left: 5rpx;
					}
					.number-box {
						float: right;
					}
				}
			}
		}
	}
	.shopPay {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 750rpx;
		height: 98rpx;
		background: #FFFFFF;
		.goods-carts {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			position: fixed;
			left: 0;
			right: 0;
			/* #ifdef H5 */
			left: var(--window-left);
			right: var(--window-right);
			/* #endif */
			bottom: 0;
			.uni-tab__cart-box {
			    flex: 1;
			    height: 55px;
			    background-color: #fff;
			    z-index: 900;
			}
		}
		.shopCart {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: baseline;
			padding: 10rpx 30rpx;
			.chooseAll {
				text {
					font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: 24rpx;
					color: #888888;
				}
			}
			.moneyCount {
				.zonghe {
					font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: 24rpx;
					color: #B1B1B1;
				}
				.money {
					font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: 30rpx;
					color: #ED1C24;
				}
			}
			.btnList {
				width: 55%;
				display: flex;
				justify-content: space-between;
				.btn {
					// width: 155rpx;
					width: 48%;
					height: 78rpx;
					display: inline-block;
					margin: 0;
				}
				.btn1 {
					background: #EDEDED;
					color: #202425;
				}
				.btn2 {
					background: #202425;
					color: #fff;
				}
			}
		}
	}
}
</style>
