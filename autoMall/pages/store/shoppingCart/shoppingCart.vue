<!-- 购物车 -->
<template>
	<view class="shoppingCart">
		<view v-if="!isEmptyCart" class="shopDelete" @click="deleteShop('delete')">
			<text>删除</text>
		</view>
		<view class="shopListM">
			<!-- 空购物车 -->
			<view v-if="isEmptyCart" class="empty">
				<!-- <image class="img-size-xl" src="https://baiyuechangxiong-pic.luobo.info/che/static/cart/empty-cart.png" mode="aspectFit"></image> -->
				<text>购物车是空的</text>
			</view>
			<!-- 非空购物车 -->
			<view v-if="!isEmptyCart" class="shopItem" v-for="(item, index) in goodsList" :key="index">
				<view class="shopcheckbox">
					<checkbox-group @change="chooseShop(item,index)">
						<label>
							<checkbox :value="item.goods.price" :checked="item.checked" color="#203885" style="transform:scale(0.7)" />
						</label>
					</checkbox-group>
					<!-- <view v-if="!item.checked" class="choose"></view>
					<image v-else class="chooseImage" src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mall/choose.png"></image> -->
				</view>
				<view class="shopLists">
					<image class="shopImage" :src="item.goods.image" mode=""></image>
					<view class="shopInfo">
						<text class="shopTitle">{{item.goods.title}}</text>
						<view class="shopTag" >
							<uni-tag class="tag" :text="item.sku_price.goods_sku_text" />
						</view>
						<view class="moneyInfo">
							<view class="">
								<text class="shopMoney">{{item.goods.price}}</text>
								<text class="shopOriginMoney">{{item.goods.original_price}}</text>
							</view>
							<view class="number-box">
								<uni-number-box :min="0" :value="item.goods_num"  @change="deleteShop('edit',item, $event)"></uni-number-box>
							</view>
						</view>
					</view>
				</view>
			</view>
				
		</view>
		<!-- 领券结算 -->
		<view class="shopPay" v-if="!isEmptyCart">
			<view class="shopCart">
				<view class="chooseAll">
					<!-- <checkbox :checked="allChecked" value="1111" />
					<text class="font-size-base">全选</text> -->
					<checkbox-group name="" @change="checkedAll" class="check">
						<label>
							<checkbox :value="1111" :checked="allChecked" style="transform:scale(0.7)" color="#203885" /><text class="font-size-base">全选</text>
						</label>
					</checkbox-group>
				</view>
				<view class="moneyCount">
					<text class="zonghe">合计</text>
					<text class='money'>￥{{totalPrice}}</text>
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
	import { shopList, addShopCart, editShopCart,addCollageCart } from '@/api/store.js'
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
				goodsList: [],
				tabTitle: '太空灰;256GB',
				allChecked: false,
				deleteIds:[],
				goodsActiveList: [],
				chooseList: [],
				gods: []
			}
		},
		computed: {
			totalPrice() {
				let totalPrice = 0
				this.goodsList.map(item => {
					item.checked ? totalPrice += Number(item.goods.price)*Number(item.goods_num) : totalPrice += 0
				})
				return totalPrice
			}
		},
		created() {
			console.log(this.$store.state)
			this.initGoosList()
		},
		methods: {
			//购物车列表
			async initGoosList() {
				let query = {
					member_id: uni.getStorageSync("member_id"),
					page: 1
				} 
				let data = await shopList(query)
				if(data.code === 1) {
					data.data.rows.forEach(item=>{
						item.checked = false
					})
					this.goodsList = data.data.rows
					if(this.goodsList.length === 0) {
						this.isEmptyCart = true
					}
				}
			},
			//修改商品数量
			onNumberBoxChange(v,e) {
				console.log(v,e)
			},
			//删除商品
			deleteShop(type,e,i) {
				let query;
				if(type === 'delete') {
					query = {
						member_id: uni.getStorageSync('member_id'),
						act: 'delete',
						cart_list: this.deleteIds.join(','),
						value: ''
					}
				}else {
					query = {
						member_id: uni.getStorageSync('member_id'),
						act: 'change',
						cart_list: e.id,
						value: i
					}
				}
				editShopCart(query).then(res=>{
					uni.showToast({
					    title: res.msg,
					    icon: 'none',
					    duration: 2000
					});
					this.initGoosList()
				})
			},
			//领券结算
			toPay() {
				uni.navigateTo({
					url: '/pages/store/confirmOrder/confirmOrder?goodsData=' + JSON.stringify(this.goodsActiveList) + '&goods=' + JSON.stringify(this.gods)
				})
			},
			chooseShop(e,i) {
				this.gods = []
				e.checked = !e.checked
				if (!e.checked) {
					this.allChecked = false
				} else {
					console.log(e)
					this.gods.push({
						image: e.goods.image,
						price: e.goods.price,
						skuText: e.sku_price.goods_sku_text,
						number: e.goods_num,
						title: e.goods.title
					})
					console.log(this.gods)
					// 判断每一个商品是否是被选择的状态
					const cartList = this.goodsList.every(item => {
						return item.checked === true
					})
					this.goodsActiveList = []
					this.deleteIds = []
					let goodsIndex = i
					this.deleteIds.push(e.goods.id)
					this.goodsActiveList.push({goods_id: e.goods_id, goods_sku_price_id:e.sku_price.id, num:e.goods_num})
					if (cartList) {
						this.allChecked = true
					} else {
						this.allChecked = false
					}
				}
			},
			//全选
			checkedAll(e) {
				this.allChecked = !this.allChecked
				if (this.allChecked) {
					this.goodsList.map(item => {
						item.checked = true
					}) 
				} else {
					this.goodsList.map(item => {
						item.checked = false
					})
				}
			},
			//拼团活动
			toActivity() {
				// console.log(this.goodsActiveList,87878)
				let query = {
					member_id: uni.getStorageSync('member_id'),
					goods_list: JSON.stringify(this.goodsActiveList),
					address_id: 2
				}
				addCollageCart(query).then(res=>{
					uni.showToast({
					    title: res.msg,
					    icon: 'none',
					    duration: 2000
					});
					uni.navigateTo({
						url: '/pages/home/groupBooking/groupBooking'
					})
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.shoppingCart {
	width: 750rpx;
	height: 100%;
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
	.shopListM {
		width: 750rpx;
		background: #FFFFFF;
		.empty {
			text-align: center;
			position: absolute;
			left: 40%;
			top: 35%;
		}
		.shopItem {
			// width: 750rpx;
			// height: 230rpx;
			padding: 24rpx 30rpx 15rpx;
			display: flex;
			align-items: center;
			// flex-direction: column;
			// justify-content: center;
			::v-deep .shopcheckbox {
				// border: 1rpx solid #A9A9A9;
				// border-radius: 16rpx;
				radio-group label, checkbox-group label {
					padding-right: 0rpx;
				}
				.choose {
					width: 32rpx;
					height: 32rpx;
					border: 1px solid #A9A9A9;
					border-radius: 50%;
				}
				.chooseImage {
					width: 32rpx;
					height: 32rpx;
				}
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
			.shopLists {
				display: flex;
				flex-direction: row;
				.shopImage {
						width: 139rpx;
						height: 139rpx;
					}
					.shopInfo {
						margin: 0rpx 0rpx 20rpx 20rpx;
						.shopTitle {
							width: 370rpx;
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
							width: 475rpx;
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
				justify-content: space-around;
				.btn {
					// width: 155rpx;
					// width: 48%;
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
