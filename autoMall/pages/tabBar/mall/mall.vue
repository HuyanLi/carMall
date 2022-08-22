<template>
	<view class="body-view">
		<!-- 头部 -->
		<scroll-view class="top-menu-view" scroll-x="true" :scroll-left="scrollLeft">
			<block v-for="(menuTab,index) in menuTabs" :key="index">
				<view class="menu-topic-view" v-bind:id="'tabNum'+index" @click="swichMenu(menuTab,index)">
					<view class="uni-flex uni-column" :class="[currentTab==index ? 'menu-topic-act' : 'menu-topic']">
						<image :src="menuTab.image" mode=""></image>
						<view class="menu-topic-txt">{{menuTab.name}}</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<view class="uni-flex uni-row chooseBox">
			<view class="text uni-flex" style="align-items:center;">
				<text class="choseText">当前品牌 : <text class="chooseType">{{this.type}}</text></text>
			</view>
			<view class="text uni-flex detail" @click="toDetail"
				style="-webkit-flex: 1;flex: 1;-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;">
				<text class="choseText">品牌详情 </text>
				<image src="https://carshop.duoka361.cn/images/static/image/mall/to.png"></image>
			</view>
		</view>
		<!-- 显示区域 -->
		<view :current="currentTab"  class="goodsList" >
			<view  @click="toGoodsDetail(item)" v-for="(item,index) in goodsList" :key='index' class="goodsItem">
				<view class="text">
					<image :src="item.image"></image>
				</view>
				<view class="text fontText">{{item.title}}</view>
				<view v-if="isApprove" class="text money">￥{{item.price}}</view>
				<view v-else class="needApprove">
					认证审核后可查看详情
				</view>
				
			</view>
		</view>
		<!-- 悬浮按钮 -->
		<view class="tryGoods">
			<view class="shihuoLogo" @click="toshoppingCart">
				<image src="https://carshop.duoka361.cn/images/static/image/mall/gwc.png" ></image>
			</view>
		</view>
		<!-- tabBar -->
		<tab-bar :current="currentTabIndex" :tabbar='tabbar'  backgroundColor="#fbfbfb" color="#999" tintColor="#42b983" @click="tabClick"></tab-bar>
	</view>
</template>

<script>
	import { bransList, goodsList } from '@/api/store.js'
 	export default {
		data() {
			return {
				approve: true,
				currentTabIndex: 1,
				scrollLeft: 0,
				isClickChange: false,
				currentTab: 0,
				type: '',
				goodsList: [],
				// Tab分类标题
				menuTabs: [],
				//品牌id
				brandId: '',
				// Tab切换内容
				swiperDateList: [],
				// 接口列表模拟数据
				list: [],
				userInfo: null,
				tabbar: uni.getStorageSync('tabbar'),
				goodsType: '1',
				//是否认证
				isApprove: false
			}
		},
		onLoad(e) {
			//1：未认证 2：已认证
			if(uni.getStorageSync('userInfo').is_authentication === 1) {
				this.isApprove = false
			}else if(uni.getStorageSync('userInfo').is_authentication === 2){
				this.isApprove = true
			}
			//初始化数据
			for (var i = 0; i < this.swiperDateList.length; i++) {
				this.getDateList(i);
			}
			this.menuTabs.forEach((v, i) => {
				if (i === 0) {
					this.type = v.name
				}
			})
			//品牌
			this.initBrandList()
			//试货
			if(e.type === 'sh') {
				this.goodsType = '2'
				//商品列表
				this.initGoods()
			}else{
				//签约等于普通
				this.goodsType = '1'
				//商品列表
				this.initGoods()
			}
		},
		methods: {
			async initBrandList() {
				let data = await bransList()
				this.menuTabs = data.data.rows
				this.menuTabs.forEach((item,index)=>{
					if(index === 0) {
						this.brandId = item.id
					}
				})
			},
			async initGoods() {
				let query = {
					brand_id: this.brandId,
					type: this.goodsType,
					page: 1
				}
				let data = await goodsList(query)
				this.goodsList = data.data.rows
			},
			swichMenu: async function(current,index) { //点击其中一个 menu
				console.log(current,index,'i')
				this.currentTab = index
				this.brandId = current.id
				this.initGoods()
			},
			// 购物车
			toshoppingCart() {
				uni.navigateTo({
					url: '/pages/store/shoppingCart/shoppingCart'
				})
			},
			//品牌详情
			toDetail() {
				uni.navigateTo({
					url: '/pages/store/brandDetail/brandDetail?brandId=' + this.brandId
				})
			},
			//商品詳情
			toGoodsDetail(item) {
				uni.navigateTo({
					url: '/pages/store/goodsDetail/goodsDetail?id=' + item.id
				})
			},
			swiperChange: async function(e) {
				console.log(e,999)
				let index = e.target.current;
				this.setScrollLeft(index);
				this.currentTab = index;
			},
			setScrollLeft: async function(tabIndex) {
				let leftWidthSum = 0;
				for (var i = 0; i <= tabIndex; i++) {
					let nowElement = await this.getWidth('tabNum' + i);
					leftWidthSum = leftWidthSum + nowElement.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth;
				this.scrollLeft = leftWidthSum > winWidth ? (leftWidthSum - winWidth) : 0
			},
			getWidth: function(id) { //得到元素的宽高
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select("#" + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				})
			},
			loadMore: function(tabIndex) {
				console.log('正在加载更多数据。。。')
			},
			getDateList: function(tabIndex) {
				debugger
				for (var i = 0; i < 1; i++) {
					var entity = this.menuTabs[tabIndex].name + (this.swiperDateList[tabIndex].length);
					this.swiperDateList[tabIndex].push(entity);
				}
			},

		},
	}
</script>
<style lang="scss" scoped>
	/* Tab切换 */
	.body-view {
		// padding-bottom: 120rpx;
		// height: 100%;
		width: 100%;
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		align-items: flex-start;
		justify-content: center;
	}

	.top-menu-view {
		display: flex;
		white-space: nowrap;
		width: 100%;
		background-color: #FFFFFF;
		// height: 86upx;
		border-top: 1px solid #d8dbe6;
		border-bottom: 1px solid #d8dbe6;
	}

	.top-menu-view .menu-topic-view {
		display: inline-block;
		white-space: nowrap;
		// height:86upx ;
		position: relative;

		image {
			width: 135rpx;
			height: 135rpx;
			margin: 20rpx auto;
		}
	}

	.top-menu-view .menu-topic-view .menu-topic {
		margin-left: 30rpx;
		margin-right: 10rpx;
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.top-menu-view .menu-topic-view .menu-topic:first-child {
		margin-left: 30upx;
	}

	.top-menu-view .menu-topic-view:last-child .menu-topic {
		margin-right: 80upx;
	}

	.top-menu-view .menu-topic-view .menu-topic .menu-topic-txt {
		// font-size: 30upx;
		color: #7c8089;
		margin-bottom: 30rpx;
	}

	.top-menu-view .menu-topic-view .menu-topic .menu-topic-bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
	}

	.top-menu-view .menu-topic-view .menu-topic .menu-topic-bottom .menu-topic-bottom-color {
		width: 40upx;
		height: 4upx;
	}

	.top-menu-view .menu-topic-view .menu-topic-act {
		margin-left: 30upx;
		margin-right: 10upx;
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		font-size: 24rpx;
		color: #757575;
	}

	.top-menu-view .menu-topic-view:last-child .menu-topic-act {
		margin-right: 30rpx;
	}

	.top-menu-view .menu-topic-view .menu-topic-act .menu-topic-txt {
		font-family: PingFangSC-Regular;
		font-weight: 400;
		font-size: 28rpx;
		color: #000000;
	}

	.top-menu-view .menu-topic-view .menu-topic-act .menu-topic-bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.top-menu-view .menu-topic-view .menu-topic-act .menu-topic-bottom .menu-topic-bottom-color {
		width: 40upx;
		height: 6upx;
		background: #3d7eff;
	}

	.swiper-box-list {
		flex: 1;
		width: 100%;
		height: auto;
		// margin-bottom: 120rpx;
		// background-color: #FFFFFF;
	}
	.swiper-topic-list {
		height: 100%;
		width: 100%;
		padding-bottom: 120rpx;
	}
	.chooseBox {
		width: 750rpx;
		background: #FFFFFF;
		padding: 35rpx 30rpx;
		.chooseText {
			font-family: PingFangSC-Regular;
			font-weight: 400;
			font-size: 24rpx;
			color: #333333;
		}

		.chooseType {
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			font-size: 28rpx;
			color: #333333;
			margin-left: 20rpx;
		}

		.detail {
			margin-right: -330rpx;

			.choseText {
				// margin-right: 30rpx;
			}

			image {
				width: 20rpx;
				height: 20rpx;
				margin-left: 10rpx;
			}
		}
	}
	.tryGoods {
		.shihuoLogo {
			position: fixed;
			right: 20rpx;
			bottom: 300rpx;
			image {
				width: 80px;
				height: 80px;
			}
		}
	}
	.goodsList {
		width: 690rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 20rpx 30rpx;
		.goodsItem {
			width: 49%;
			display: flex;
			flex-direction: column;
			background-color: #fff;
			margin-bottom: 20rpx;
			.needApprove {
				font-weight: 400;
				font-size: 22rpx;
				color: #C31B23;
				margin: 20rpx 22rpx 36rpx 17rpx;
			}
			.text {
				width: 300rpx;
				margin: 20rpx auto 30rpx;
			}
			image {
				width: 300rpx;
				height: 300rpx;
				// margin: 20rpx 20rpx 30rpx;
			}
			.fontText {
				font-family: PingFangSC-Regular;
				font-weight: 400;
				font-size: 26rpx;
				color: #231F20;
				line-height: 36rpx;
				margin: 0 0 0 20rpx;
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
				font-size: 30rpx;
				color: #ED1C24;
				text-align: justify;
				margin-left: 20rpx;
			}
		}
	}
</style>
